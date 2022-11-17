package app

import (
	"context"
	"io"
	"os"

	"github.com/hashicorp/go-hclog"
	"github.com/madz-lab/madev/internal/ports"
)

const numOfNodes = 4

type Adapter struct {
	core   ports.ICorePort
	logger hclog.Logger
	ctx    context.Context
	docker docker
}

type docker struct {
	dockerReader      io.ReadCloser
	edgeImage         string
	outputWriter      io.Writer
	outputErrorWriter io.Writer
}

var ledgeVolumeBinds []string

const edgeNetworkName = "edge-nework"

func NewAdapter(coreInstance ports.ICorePort) ports.IAppPort {
	return &Adapter{
		core: coreInstance,
		ctx:  context.Background(),
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

func (a *Adapter) DeployBlockchainWithProxy() error {

	if err := a.runInitLedge(); err != nil {
		a.logger.Error("could not run chain initialization", "err", err.Error())

		return err
	}

	if err := a.runGenerateGenesis(); err != nil {
		a.logger.Error("could not run genesis initialization", "err", err.Error())

		return err
	}

	if err := a.runValidators(); err != nil {
		a.logger.Error("could not run validators", "err", err.Error())

		return err
	}

	if err := a.runNginxProxy(); err != nil {
		a.logger.Error("could not run nginx proxy", "err", err.Error())

		return err
	}

	return nil
}

func (a *Adapter) DeployBlockscout() error {
	if err := a.runBlockscoutDatabase(); err != nil {
		a.logger.Error("could not run blockscout database", "err", err.Error())

		return err
	}
	if err := a.runBlockscout(); err != nil {
		a.logger.Error("could not run blockscout", "err", err.Error())

		return err
	}

	return nil
}

func (a *Adapter) Close() {
	if a.docker.dockerReader != nil {
		a.docker.dockerReader.Close()
	}
}
