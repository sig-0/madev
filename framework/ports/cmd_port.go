package ports

import (
	"github.com/hashicorp/go-hclog"
	"github.com/spf13/cobra"
)

type ICmdPort interface {
	WithLogger(logger hclog.Logger) ICmdPort
	// RootCmd returns the root command instance
	RootCmd() *cobra.Command
	// DeploySubCmd arms deploySubCmd with Run function from another module
	DeploySubCmd(func(cmd *cobra.Command, args []string))
}
