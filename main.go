package main

import (
	"github.com/hashicorp/go-hclog"
	"github.com/madz-lab/madev/internal/adapters/app"
	"github.com/madz-lab/madev/internal/adapters/core"
)

func main() {
	logger := hclog.New(&hclog.LoggerOptions{Name: "madev", Level: hclog.Info})

	appCore := core.NewAdapter().WithLogger(logger)
	defer appCore.Close()

	madev := app.NewAdapter(appCore).WithLogger(logger)
	defer madev.Close()

	blChainErr := madev.DeployBlockchainWithProxy()
	if blChainErr != nil {
		logger.Error("Could not deploy blockchain", "err", blChainErr.Error())
		return
	}

	blScoutErr := madev.DeployBlockscout()
	if blScoutErr != nil {
		logger.Error("Could not deploy blockscout", "err", blScoutErr.Error())
		return
	}
}
