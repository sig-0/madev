package app

import (
	"context"
	"fmt"
	"github.com/docker/docker/api/types"
	"github.com/madz-lab/madev/embed"
	ports2 "github.com/madz-lab/madev/framework/ports"
	"github.com/spf13/cobra"
	"io"
	"io/fs"
	"net/http"
	"os"

	"github.com/hashicorp/go-hclog"
	"github.com/madz-lab/madev/internal/ports"
)

const numOfNodes = 4

type Adapter struct {
	core      ports.ICorePort
	cmd       ports2.ICmdPort
	storage   ports2.IStoragePort
	logger    hclog.Logger
	ctx       context.Context
	docker    docker
	chainInfo chainInfo
	*RawJsonParameters
}

type docker struct {
	dockerReader      io.ReadCloser
	edgeImage         string
	outputWriter      io.Writer
	outputErrorWriter io.Writer

	Environment `json:"environment"`
}

type Environment struct {
	ContainerIDs `json:"container_ids"`
	NetworkID    string `json:"network_id"`
}

type ContainerIDs struct {
	Validators   []string `json:"validators"`
	Nginx        string   `json:"nginx"`
	Blockscout   string   `json:"blockscout"`
	BlockscoutDB string   `json:"blockscout_db"`
}

var ledgeVolumeBinds []string

const edgeNetworkName = "edge-network"

type chainInfo struct {
	chainID        string
	premineWallets string
}

func NewAdapter(coreInstance ports.ICorePort, cmdInstance ports2.ICmdPort, storageInstance ports2.IStoragePort) ports.IAppPort {
	return &Adapter{
		core:              coreInstance,
		cmd:               cmdInstance,
		storage:           storageInstance,
		RawJsonParameters: &RawJsonParameters{},
		ctx:               context.Background(),
		docker: docker{
			edgeImage: "0xpolygon/polygon-edge:0.5.1",
			//TODO: redirecting to console output but we probably want it to go somewhere else
			outputWriter:      os.Stdout,
			outputErrorWriter: os.Stderr,
		},
	}
}

func (a *Adapter) WithLogger(logger hclog.Logger) ports.IAppPort {
	a.logger = logger.Named("app")

	return a
}

func (a *Adapter) Run() error {
	// run on deploy/start/dep subcommand
	a.cmd.DeploySubCmd(func(cmd *cobra.Command, args []string) {
		// Parse input parameters
		a.parseFlagParameters()
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
	})

	// run on destroy/delete/rm subcommand
	a.cmd.DestroySubCmd(func(cmd *cobra.Command, args []string) {
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
	})

	a.cmd.ServeSubCmd(func(cmd *cobra.Command, args []string) {
		mux := http.NewServeMux()
		// strip folder name from embeded folder
		front, _ := fs.Sub(embed.EmbededFront, "build")

		mux.Handle("/", http.FileServer(http.FS(front)))
		mux.HandleFunc("/api/v1/deploy", a.deployHandler)
		mux.HandleFunc("/api/v1/destroy", a.destroyHandler)

		a.logger.Info("serving web gui at localhost:15000")
		err := http.ListenAndServe(":15000", mux)
		if err != nil {
			return
		}
	})

	// execute the main command
	if err := a.cmd.RootCmd().Execute(); err != nil {
		return fmt.Errorf("could not execute command: %w", err)
	}

	return nil
}

func (a *Adapter) deployBlockchainWithProxy() error {

	if err := a.runInitLedge(); err != nil {
		a.logger.Error("could not run chain initialization", "err", err.Error())

		return err
	}

	if err := a.runGenerateGenesis(); err != nil {
		a.logger.Error("could not run genesis initialization", "err", err.Error())

		return err
	}

	if err := a.runValidators(); err != nil {
		a.logger.Error("could not run Validators", "err", err.Error())

		return err
	}

	if err := a.runNginxProxy(); err != nil {
		a.logger.Error("could not run Nginx proxy", "err", err.Error())

		return err
	}

	return nil
}

func (a *Adapter) deployBlockscout() error {
	if err := a.runBlockscoutDatabase(); err != nil {
		a.logger.Error("could not run Blockscout database", "err", err.Error())

		return err
	}
	if err := a.runBlockscout(); err != nil {
		a.logger.Error("could not run Blockscout", "err", err.Error())

		return err
	}

	return nil
}

func (a *Adapter) close() {
	if a.docker.dockerReader != nil {
		a.docker.dockerReader.Close()
	}
}
