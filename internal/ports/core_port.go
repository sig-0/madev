package ports

import (
	"github.com/docker/docker/client"
	"github.com/hashicorp/go-hclog"
)

type ICorePort interface {
	// WithLogger plugs in a new hclog logger
	WithLogger(logger hclog.Logger) ICorePort
	// Close closes all open clients
	Close()
	// Docker exposes docker instance
	Docker() *client.Client
}