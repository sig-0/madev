package app

import (
	"fmt"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/pkg/stdcopy"
	"io"
	"strings"
)

func ContainsNetwork(haystack []types.NetworkResource, needle string) bool {
	for _, item := range haystack {
		if item.Name == needle {
			return true
		}
	}
	return false
}

func (a *Adapter) runContainer(
	config *container.Config,
	host *container.HostConfig,
	containerName string,
	initContainer bool,
) (container.ContainerCreateCreatedBody, error) {
	var err error

	// Pull the image
	a.docker.dockerReader, err = a.core.Docker().ImagePull(a.ctx, config.Image, types.ImagePullOptions{})
	if err != nil {
		return container.ContainerCreateCreatedBody{}, fmt.Errorf("could not pull image from image repo err=%w", err)
	}
	// Output from Image Pull must be on, as the pull won't start
	io.Copy(a.docker.outputWriter, a.docker.dockerReader)

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
	if initContainer {
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
	a.docker.dockerReader, err = a.core.Docker().ContainerLogs(a.ctx, containerID, types.ContainerLogsOptions{ShowStdout: true, ShowStderr: true, Since: "5m"})
	if err != nil {
		return fmt.Errorf("could not get container logs id=%s err=%w", containerID, err)
	}

	stdcopy.StdCopy(a.docker.outputWriter, a.docker.outputErrorWriter, a.docker.dockerReader)

	return nil
}

func (a *Adapter) parseFlagParameters() {
	premine := a.cmd.Flags().Premine
	premineSplit := strings.Split(*premine, ",")
	parsedPremine := strings.Join(premineSplit, " ")

	a.chainInfo.premineWallets = parsedPremine
	a.logger.Info("premining accounts from flags", "accounts", a.chainInfo.premineWallets)
}

func (a *Adapter) parseJsonParameters() {
	premine := strings.Join(a.RawJsonParameters.PremineAccounts, " ")
	a.chainInfo.premineWallets = premine

	a.logger.Info("premining accoutnts from json", "accounts", a.chainInfo.premineWallets)
}
