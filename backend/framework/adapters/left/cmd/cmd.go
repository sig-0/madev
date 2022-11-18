package cmd

import (
	"github.com/hashicorp/go-hclog"
	"github.com/madz-lab/madev/framework/ports"
	"github.com/madz-lab/madev/framework/types"
	"github.com/spf13/cobra"
	"github.com/spf13/pflag"
)

var deployCmd = &cobra.Command{
	Use:     "deploy",
	Aliases: []string{"start", "run", "dep"},
	Short:   "Deploys the environment",
}

var destroyCmd = &cobra.Command{
	Use:     "destroy",
	Aliases: []string{"delete"},
	Short:   "Destroys the environment",
}

type Adapter struct {
	rootCmd *cobra.Command
	logger  hclog.Logger
	flags   types.FlagValues
}

func NewAdapter() ports.ICmdPort {
	// create main command
	adapter := &Adapter{
		flags: types.FlagValues{
			BlockchainFlags: &types.BlockchainFlags{
				ChainID:       new(string),
				Premine:       new(string),
				BlockGasLimit: new(string),
			},
		},
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
	deployCmd.Flags().StringVarP(a.flags.ChainID, "chain-id", "c", "100", "Chain id for the blockchain")
	deployCmd.Flags().StringVarP(a.flags.Premine, "premine", "", "", "Premine wallet and ammount")
	deployCmd.Flags().StringVarP(a.flags.BlockGasLimit, "gas-limit", "g", "", "Gas limit for blocks")

	deployCmd.Run = deploySubFunc
	a.RootCmd().AddCommand(deployCmd)
}

func (a *Adapter) DeploySubCmdFlags() *pflag.FlagSet {
	return deployCmd.Flags()
}

func (a *Adapter) DestroySubCmd(destroySubFunc func(cmd *cobra.Command, args []string)) {
	destroyCmd.Run = destroySubFunc
	a.RootCmd().AddCommand(destroyCmd)
}

func (a *Adapter) Flags() types.FlagValues {
	return a.flags
}
