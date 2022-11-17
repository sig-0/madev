package core

import (
	"log"

	"github.com/docker/docker/client"
	"github.com/hashicorp/go-hclog"
	"github.com/madz-lab/madev/internal/ports"
)

type Adapter struct {
	logger hclog.Logger
	docker *client.Client
}

// NewAdapter plugs into Core port
func NewAdapter() ports.ICorePort {

	dockerClient, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		log.Fatalln("Could not create docker client, err=", err.Error())
	}

	return &Adapter{
		docker: dockerClient,
	}
}

func (a *Adapter) WithLogger(logger hclog.Logger) ports.ICorePort {
	a.logger = logger.Named("core")
	
	return a
}

func (a *Adapter) Close() {
	a.docker.Close()
}

func (a *Adapter) Docker() *client.Client {
	return a.docker
}
