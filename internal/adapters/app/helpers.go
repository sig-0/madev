package app

import (
	"fmt"
	"io"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/pkg/stdcopy"
)

func (a *Adapter) runContainer(
	config *container.Config,
	host *container.HostConfig,
	containerName string,
	runInBackground bool) (container.ContainerCreateCreatedBody, error) {
	var err error

	// Pull the image
	a.docker.dockerReader, err = a.core.Docker().ImagePull(a.ctx, config.Image, types.ImagePullOptions{})
	if err != nil {
		return container.ContainerCreateCreatedBody{}, fmt.Errorf("could not pull image from image repo err=%w", err)
	}

	// Show pull logs if debug enabled
	if a.logger.IsDebug() {
		io.Copy(a.docker.outputWriter, a.docker.dockerReader)
	}

	// Create containers
	resp, err := a.core.Docker().ContainerCreate(a.ctx, config, host, nil, nil, containerName)
	if err != nil {
		return container.ContainerCreateCreatedBody{}, fmt.Errorf("could not create new container image err=%w", err)
	}

	// Start the containers
	if err := a.core.Docker().ContainerStart(a.ctx, resp.ID, types.ContainerStartOptions{}); err != nil {
		return container.ContainerCreateCreatedBody{}, fmt.Errorf("could not start container id=%s err=%w", resp.ID, err)
	}

	// Wait for containers to start
	if !runInBackground {
		statusCh, errCh := a.core.Docker().ContainerWait(a.ctx, resp.ID, container.WaitConditionNotRunning)
		select {
		case err := <-errCh:
			if err != nil {
				return container.ContainerCreateCreatedBody{}, fmt.Errorf("container start error err=%w", err)
			}
		case <-statusCh:
		}
	}

	return resp, nil
}

func (a *Adapter) getLogs(containerID string) error {
	var err error

	// Get the logs from container - should be optional
	a.docker.dockerReader, err = a.core.Docker().ContainerLogs(a.ctx, containerID, types.ContainerLogsOptions{ShowStdout: true, ShowStderr: true})
	if err != nil {
		return fmt.Errorf("could not get container logs id=%s err=%w", containerID, err)
	}

	stdcopy.StdCopy(a.docker.outputWriter, a.docker.outputErrorWriter, a.docker.dockerReader)

	return nil
}
