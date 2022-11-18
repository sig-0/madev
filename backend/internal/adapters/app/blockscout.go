package app

import (
	"fmt"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/go-connections/nat"
	"time"
)

func (a *Adapter) runBlockscout() error {
	a.logger.Info("deploying blockscout")
	contInfo, err := a.runContainer(
		&container.Config{
			Tty:   false,
			Image: "blockscout/blockscout:4.1.8",
			Cmd:   []string{"bash", "-c", "bin/blockscout eval \"Elixir.Explorer.ReleaseTasks.create_and_migrate()\" && bin/blockscout start"},
			Env: []string{
				"COIN=EDGE",
				"COIN_NAME=EDGECoin",
				"PORT=4000",
				"LOGO=/images/blockscout_logo.svg",
				"LOGO_FOOTER=/images/blockscout_logo.svg",
				"ETHEREUM_JSONRPC_HTTP_URL=http://edge-proxy:9090",
				"ETHEREUM_JSONRPC_TRACE_URL=http://edge-proxy:9090",
				"ETHEREUM_JSONRPC_WS_URL=ws://edge-proxy:9090/ws",
				"CHAIN_ID=100",
				"SECRET_KEY_BASE=VTIB3uHDNbvrY0+60ZWgUoUBKDn9ppLR8MI4CpRz4/qLyEFs54ktJfaNT6Z221No",
				"DATABASE_URL=postgresql://postgres:changeme@Blockscout-database:5432/blockscout",
				"ECTO_USE_SSL=false",
				"MIX_ENV=prod",
				"DISABLE_EXCHANGE_RATES=true",
				"FETCH_REWARD_WAY=manual",
				"INDEXER_DISABLE_BLOCK_REWARD_FETCHER=true",
				"INDEXER_DISABLE_INTERNAL_TRANSACTIONS_FETCHER=true",
				"INDEXER_DISABLE_CATALOGED_TOKEN_UPDATER_FETCHER=true",
				"INDEXER_EMPTY_BLOCKS_SANITIZER_BATCH_SIZE=true",
				"INDEXER_DISABLE_PENDING_TRANSACTIONS_FETCHER=true",
			},
			ExposedPorts: map[nat.Port]struct{}{
				"4000/tcp": {},
			},
		},
		&container.HostConfig{
			PortBindings: nat.PortMap{
				"4000/tcp": []nat.PortBinding{
					{HostPort: "10001/tcp"},
				},
			},
			NetworkMode: edgeNetworkName,
			RestartPolicy: container.RestartPolicy{
				Name:              "on-failure",
				MaximumRetryCount: 5,
			},
		}, "blockscout", false)
	if err != nil {
		return fmt.Errorf("could not deploy Blockscout: %w", err)
	}

	// store container information
	a.docker.ContainerIDs.Blockscout = contInfo.ID

	a.logger.Info("deploying blockscout")

	return nil
}

func (a *Adapter) runBlockscoutDatabase() error {
	a.logger.Info("deploying blockscout database")

	contInfo, err := a.runContainer(
		&container.Config{
			Tty:   false,
			Image: "postgres:14.5-alpine",
			Cmd:   []string{"postgres", "-c", "max_connections=500"},
			Env: []string{
				"POSTGRES_USER=postgres",
				"POSTGRES_PASSWORD=changeme",
				"PGDATA=/data/postgres",
				"POSTGRES_DB=blockscout",
			},
			Healthcheck: &container.HealthConfig{
				Test:     []string{"CMD-SHELL", "pg_isready"},
				Interval: 10 * time.Second,
				Timeout:  5 * time.Second,
				Retries:  5,
			},
		},
		&container.HostConfig{
			NetworkMode: edgeNetworkName,
			RestartPolicy: container.RestartPolicy{
				Name:              "on-failure",
				MaximumRetryCount: 5,
			},
			Binds: []string{
				"blockscout-db-data:/data/postgres",
			},
		}, "blockscout-database", false)
	if err != nil {
		return fmt.Errorf("could not deploy Blockscout database: %w", err)
	}

	// store container information
	a.docker.ContainerIDs.BlockscoutDB = contInfo.ID
	a.logger.Info("blockscout database deployed")

	return nil
}
