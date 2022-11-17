package main

import (
	"github.com/hashicorp/go-hclog"
	"github.com/madz-lab/madev/internal/adapters/app"
	"github.com/madz-lab/madev/internal/adapters/core"
)

func main () {
	logger := hclog.New(&hclog.LoggerOptions{Name: "madev", Level: hclog.Debug})

	appCore := core.NewAdapter().WithLogger(logger)
	defer appCore.Close()

	madev := app.NewAdapter(appCore).WithLogger(logger)
	defer madev.Close()

	madev.DeployBlockchain()
}