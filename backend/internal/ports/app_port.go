package ports

import (
	"github.com/hashicorp/go-hclog"
)

type IAppPort interface {
	// WithLogger inputs new hclog logger instance
	WithLogger(logger hclog.Logger) IAppPort
	// Run main app loop
	Run() error
}
