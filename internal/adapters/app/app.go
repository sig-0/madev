package app

import (
	"context"
	"fmt"
	"io"
	"os"

	"github.com/docker/docker/api/types"

	"github.com/docker/docker/api/types/container"
	"github.com/docker/go-connections/nat"
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

func (a *Adapter) DeployBlockchain() {

	if err := a.runInitLedge(); err != nil {
		a.logger.Error("could not run chain initialization", "err", err.Error())
		return
	}

	if err := a.runGenerateGenesis(); err != nil {
		a.logger.Error("could not run genesis initialization", "err", err.Error())
		return
	}

	if err := a.runValidators(); err != nil {
		a.logger.Error("could not run validators", "err", err.Error())
		return
	}

}

func (a *Adapter) Close() {
	if a.docker.dockerReader != nil {
		a.docker.dockerReader.Close()
	}
}

func (a *Adapter) runInitLedge() error {
	for i := range [numOfNodes]int{} {
		ledgeVolumeBinds = append(ledgeVolumeBinds, fmt.Sprintf("node%d:/node%d", i+1, i+1))
	}

	_, err := a.runContainer(
		&container.Config{
			Tty:   false,
			Image: "trapesys/polygon-ledge",
			Cmd:   []string{"-mode", "init", "-num-nodes", fmt.Sprintf("%d", numOfNodes)},
		},
		&container.HostConfig{
			Binds:      ledgeVolumeBinds,
			AutoRemove: true,
		}, "chain-init", false)
	if err != nil {
		return err
	}

	return nil
}

func (a *Adapter) runGenerateGenesis() error {
	ledgeVolumeBinds = append(ledgeVolumeBinds, "genesis:/genesis")
	_, err := a.runContainer(
		&container.Config{
			Tty:   false,
			Image: "trapesys/polygon-ledge",
			Cmd:   []string{"-mode", "genesis", "-num-nodes", fmt.Sprintf("%d", numOfNodes)},
		},
		&container.HostConfig{
			Binds:      ledgeVolumeBinds,
			AutoRemove: true,
		}, "genesis-init", false)
	if err != nil {
		return err
	}

	return nil
}

func (a *Adapter) runValidators() error {
	// TODO: check if network exists
	_, err := a.core.Docker().NetworkCreate(a.ctx, "edge-network", types.NetworkCreate{Driver: "bridge"})
	if err != nil {
		return fmt.Errorf("could not create network err=%w", err)
	}

	for i := range [numOfNodes]int{} {
		_, err := a.runContainer(
			&container.Config{
				Tty:   false,
				Image: "0xpolygon/polygon-edge:0.5.1",
				Cmd:   []string{"server", "--data-dir", "data", "--chain", "genesis/genesis.json", "--libp2p", "0.0.0.0:1478"},
			},
			&container.HostConfig{
				Binds: []string{
					fmt.Sprintf("node%d:/data", i+1),
					"genesis:/genesis",
				},
				PortBindings: nat.PortMap{
					"8545/tcp": []nat.PortBinding{
						{HostPort: fmt.Sprintf("%d0001/tcp", i+1)},
					},
				},
				NetworkMode: "edge-network",
			}, fmt.Sprintf("node%d", i+1), true)
		if err != nil {
			return err
		}
	}

	return nil
}
