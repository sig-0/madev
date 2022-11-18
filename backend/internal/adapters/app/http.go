package app

import (
	"encoding/json"
	"github.com/docker/docker/api/types"
	"net/http"
	"os"
	"regexp"
	"strings"
)

type RawJsonParameters struct {
	PremineAccounts []string `json:"premine_accounts"`
}

func (a *Adapter) deployHandler(writer http.ResponseWriter, request *http.Request) {
	// get premine accounts from web request
	err := json.NewDecoder(request.Body).Decode(a.RawJsonParameters)
	if err != nil {
		writer.WriteHeader(http.StatusNotAcceptable)
		// return error to the user
		resp := make(map[string]string)
		resp["message"] = "could not decode provided parameters"
		resp["error"] = err.Error()
		err = json.NewEncoder(writer).Encode(resp)
		if err != nil {
			a.logger.Error("could not decode provided parameters", "err", err.Error())
			return
		}
	}
	// parse web json parameters
	a.parseJsonParameters()

	// deploy the blockchain with Nginx proxy
	blChainErr := a.deployBlockchainWithProxy()
	if blChainErr != nil {
		a.logger.Error("could not deploy blockchain", "err", blChainErr.Error())
		return
	}

	// deploy Blockscout and database as a backend
	blScoutErr := a.deployBlockscout()
	if blScoutErr != nil {
		a.logger.Error("could not deploy Blockscout", "err", blScoutErr.Error())
		return
	}

	defer a.close()

	// store container information
	a.storage.StoreJson(a.docker.Environment)
	var resp = make(map[string]string)
	resp["message"] = "deployment successful"
	writer.WriteHeader(http.StatusOK)
	json.NewEncoder(writer).Encode(resp)
}

func (a *Adapter) destroyHandler(writer http.ResponseWriter, request *http.Request) {
	a.logger.Info("cleaning the environment")
	// read data from storage
	a.storage.ReadJson(&a.docker.Environment)

	// remove validators
	a.logger.Info("purging validators")
	for _, cont := range a.docker.Validators {
		err := a.core.Docker().ContainerRemove(a.ctx, cont, types.ContainerRemoveOptions{
			// TODO: decide from flags if volume should be deleted and force delete
			RemoveVolumes: true,
			Force:         true,
		})
		if err != nil {
			a.logger.Error("could not delete validator container", "container_id", cont, "err", err.Error())
			return
		}
	}

	// remove nginx proxy
	a.logger.Info("purging nginx proxy")
	err := a.core.Docker().ContainerRemove(a.ctx, a.docker.Nginx, types.ContainerRemoveOptions{
		// TODO: decide from flags if volume should be deleted and force delete
		RemoveVolumes: true,
		Force:         true,
	})
	if err != nil {
		a.logger.Error("could not delete blockscout container", "container_id", a.docker.Nginx, "err", err.Error())
		return
	}

	// remove blockscout
	a.logger.Info("purging blockscout")
	err = a.core.Docker().ContainerRemove(a.ctx, a.docker.Blockscout, types.ContainerRemoveOptions{
		// TODO: decide from flags if volume should be deleted and force delete
		RemoveVolumes: true,
		Force:         true,
	})
	if err != nil {
		a.logger.Error("could not delete blockscout container", "container_id", a.docker.Blockscout, "err", err.Error())
		return
	}

	// remove blockscout database
	a.logger.Info("purging blockscout database")
	err = a.core.Docker().ContainerRemove(a.ctx, a.docker.BlockscoutDB, types.ContainerRemoveOptions{
		// TODO: decide from flags if volume should be deleted and force delete
		RemoveVolumes: true,
		Force:         true,
	})
	if err != nil {
		a.logger.Error("could not delete blockscout database container", "container_id", a.docker.BlockscoutDB, "err", err.Error())
		return
	}

	// remove network
	a.logger.Info("deleting network")
	err = a.core.Docker().NetworkRemove(a.ctx, a.docker.NetworkID)
	if err != nil {
		a.logger.Error("could not remove network", "id", a.docker.NetworkID, "err", err.Error())
		return
	}

	// reset state file
	a.storage.StoreJson("")
	a.logger.Info("environment destroyed")

	var resp = make(map[string]string)
	resp["message"] = "deployment removal successful"
	writer.WriteHeader(http.StatusOK)
	json.NewEncoder(writer).Encode(resp)
}

func (a *Adapter) indexHandler(writer http.ResponseWriter, request *http.Request) {
	writer.WriteHeader(http.StatusOK)
	writer.Header().Set("Content-Type", "application/json")

	resp := make(map[string]string)
	resp["message"] = "Work In Progress !"
	respEnc, err := json.Marshal(resp)
	if err != nil {
		a.logger.Error("could not marshal json response", "err", err.Error())
	}

	writer.Write(respEnc)
}

func (a *Adapter) logsHandler(writer http.ResponseWriter, request *http.Request) {
	var container types.Container

	nodeId := struct {
		Name string `json:"node_name"`
	}{}

	err := json.NewDecoder(request.Body).Decode(&nodeId)
	if err != nil {
		errorJsonResponse(writer, err)
		return
	}

	nodeList, err := a.core.Docker().ContainerList(a.ctx, types.ContainerListOptions{})
	if err != nil {
		a.logger.Error("could retrieve container list", "err", err.Error())
	}

	for _, node := range nodeList {
		for _, name := range node.Names {
			if name == "/"+nodeId.Name {
				container = node
			}
		}
	}
	logFile, err := os.Create(nodeId.Name)
	if err != nil {
		a.logger.Error("could not write log file", "err", err.Error())
	}
	defer logFile.Close()

	// write logs to file
	a.docker.outputWriter = logFile
	a.docker.outputErrorWriter = logFile

	err = a.getLogs(container.ID)
	if err != nil {
		a.logger.Error("could not get container id", "id", container.ID, "err", err.Error())
	}

	readLogFile, err := os.ReadFile(nodeId.Name)
	if err != nil {
		a.logger.Error("could not read log file", "err", err.Error())
		errorJsonResponse(writer, err)
		return
	}
	var resp []string

	rawStrArr := strings.Split(strings.ReplaceAll(string(readLogFile), "\r\n", "\n"), "\n")
	for _, str := range rawStrArr {
		match, _ := regexp.MatchString("websocket", str)
		if !match {
			resp = append(resp, str)
		}
	}
	arrayResp := struct {
		Logs    []string `json:"logs"`
		Success bool     `json:"success"`
	}{}

	arrayResp.Logs = resp
	arrayResp.Success = true
	writer.WriteHeader(http.StatusOK)
	json.NewEncoder(writer).Encode(arrayResp)

	a.logger.Info("logs successfully sent")
}

func errorJsonResponse(w http.ResponseWriter, err error) {
	errorResp := struct {
		Message string `json:"message"`
		Error   string `json:"error"`
	}{}
	errorResp.Message = "error occured, could not process request"
	errorResp.Error = err.Error()

	w.WriteHeader(http.StatusBadRequest)
	json.NewEncoder(w).Encode(errorResp)
}
