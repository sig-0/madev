package app

import (
	"fmt"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/go-connections/nat"
)

func (a *Adapter) runValidators() error {
	// TODO: should go into its own place
	network, err := a.core.Docker().NetworkList(a.ctx, types.NetworkListOptions{})
	if err != nil {
		return fmt.Errorf("could not get the list of networks: %w", err)
	}

	if !ContainsNetwork(network, edgeNetworkName) {
		a.logger.Info("creating new network", "name", edgeNetworkName)

		_, err = a.core.Docker().NetworkCreate(a.ctx, edgeNetworkName, types.NetworkCreate{Driver: "bridge"})
		if err != nil {
			return fmt.Errorf("could not create new network: %w", err)
		}
	}

	for i := range [numOfNodes]int{} {
		a.logger.Info("deploying validator container", "name", fmt.Sprintf("node%d", i+1))
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
				NetworkMode: edgeNetworkName,
				RestartPolicy: container.RestartPolicy{
					Name:              "on-failure",
					MaximumRetryCount: 5,
				},
			}, fmt.Sprintf("node%d", i+1), false)
		if err != nil {
			return fmt.Errorf("could not deploy validator node%d: %w", i+1, err)
		}

		a.logger.Info("validator container deployed", "name", fmt.Sprintf("node%d", i+1))
	}

	return nil
}

func (a *Adapter) runNginxProxy() error {
	a.logger.Info("deploying edge-proxy")
	_, err := a.runContainer(
		&container.Config{
			Tty:   false,
			Image: "trapesys/polygon-edge-proxy",
			ExposedPorts: map[nat.Port]struct{}{
				"8080/tcp": {},
			},
		},
		&container.HostConfig{
			PortBindings: nat.PortMap{
				"8080/tcp": []nat.PortBinding{
					{HostPort: "10000/tcp"},
				},
			},
			NetworkMode: edgeNetworkName,
			RestartPolicy: container.RestartPolicy{
				Name:              "on-failure",
				MaximumRetryCount: 5,
			},
		}, "edge-proxy", false)
	if err != nil {
		return fmt.Errorf("could not deploy edge-proxy: %w", err)
	}

	a.logger.Info("deploying edge-proxy")
	return nil

}

func (a *Adapter) runInitLedge() error {
	a.logger.Info("initializing secrets")

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
		}, "chain-init", true)
	if err != nil {
		return fmt.Errorf("could not initialize secrets: %w", err)
	}

	a.logger.Info("secrets initialized")
	return nil
}

func (a *Adapter) runGenerateGenesis() error {
	a.logger.Info("creating genesis")

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
		}, "genesis-init", true)
	if err != nil {
		return fmt.Errorf("could not create genesis: %w", err)
	}
	a.logger.Info("genesis creation complete")

	return nil
}
