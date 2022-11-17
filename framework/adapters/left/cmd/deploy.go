package cmd

import (
	"github.com/spf13/cobra"
)

var deployCmd = &cobra.Command{
	Use:     "deploy",
	Aliases: []string{"dep"},
	Short:   "Deploys the environment",
}
