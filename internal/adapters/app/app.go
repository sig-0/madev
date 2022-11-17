package app

import (
	"context"
	"fmt"
	ports2 "github.com/madz-lab/madev/framework/ports"
	"github.com/spf13/cobra"
	"io"
	"os"

	"github.com/hashicorp/go-hclog"
	"github.com/madz-lab/madev/internal/ports"
)

const numOfNodes = 4

type Adapter struct {
	core   ports.ICorePort
	cmd    ports2.ICmdPort
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

func NewAdapter(coreInstance ports.ICorePort, cmdInstance ports2.ICmdPort) ports.IAppPort {
	return &Adapter{
		core: coreInstance,
		cmd:  cmdInstance,
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

func (a *Adapter) Run() error {
	// run on deploy subcommand
	a.cmd.DeploySubCmd(func(cmd *cobra.Command, args []string) {
		blChainErr := a.deployBlockchainWithProxy()
		if blChainErr != nil {
			a.logger.Error("could not deploy blockchain", "err", blChainErr.Error())
			return
		}

		blScoutErr := a.deployBlockscout()
		if blScoutErr != nil {
			a.logger.Error("could not deploy blockscout", "err", blScoutErr.Error())
			return
		}

		defer a.close()
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
		a.logger.Error("could not run validators", "err", err.Error())

		return err
	}

	if err := a.runNginxProxy(); err != nil {
		a.logger.Error("could not run nginx proxy", "err", err.Error())

		return err
	}

	return nil
}

func (a *Adapter) deployBlockscout() error {
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

func (a *Adapter) close() {
	if a.docker.dockerReader != nil {
		a.docker.dockerReader.Close()
	}
}
