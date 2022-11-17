package cmd

import (
	"github.com/hashicorp/go-hclog"
	"github.com/madz-lab/madev/framework/ports"
	"github.com/spf13/cobra"
)

type Adapter struct {
	rootCmd *cobra.Command
	logger  hclog.Logger
}

func NewAdapter() ports.ICmdPort {
	// create main command
	adapter := &Adapter{
		rootCmd: &cobra.Command{
			Short: "Madev - a simple way to deploy your local Web3 environment",
			Long: `Madev saves time to Web3 developers as it quickly deploys Web3 environment.
The whole blockchain stack is deployed - EVM compatible blockchain and Blockscout - block explorer.
More tools to the stack will be added soon.`},
	}

	return adapter
}

func (a *Adapter) WithLogger(logger hclog.Logger) ports.ICmdPort {
	a.logger = logger.Named("cmd")

	return a
}

func (a *Adapter) RootCmd() *cobra.Command {
	return a.rootCmd
}

func (a *Adapter) DeploySubCmd(deploySubFunc func(cmd *cobra.Command, args []string)) {
	deployCmd.Run = deploySubFunc
	a.RootCmd().AddCommand(deployCmd)
}
