package ports

import "github.com/hashicorp/go-hclog"

type IAppPort interface {
	// DeployBlockchain deploys a new blockchain cluster
	DeployBlockchain()
	// WithLogger inputs new hclog logger instance
	WithLogger(logger hclog.Logger) IAppPort
	// Close closes all docker connections
	Close()
}