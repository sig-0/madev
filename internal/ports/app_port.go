package ports

import "github.com/hashicorp/go-hclog"

type IAppPort interface {
	// DeployBlockchainWithProxy deploys a new blockchain cluster with proxy
	DeployBlockchainWithProxy() error
	// DeployBlockscout deploys blockscout instance
	DeployBlockscout() error
	// WithLogger inputs new hclog logger instance
	WithLogger(logger hclog.Logger) IAppPort
	// Close closes all docker connections
	Close()
}
