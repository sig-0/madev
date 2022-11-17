package main

import (
	"github.com/hashicorp/go-hclog"
	"github.com/madz-lab/madev/framework/adapters/left/cmd"
	"github.com/madz-lab/madev/internal/adapters/app"
	"github.com/madz-lab/madev/internal/adapters/core"
	"os"
)

func main() {
	// create logger
	logger := hclog.New(&hclog.LoggerOptions{Name: "madev", Level: hclog.Info})

	// create core port
	appCore := core.NewAdapter().WithLogger(logger)
	defer appCore.Close()

	// create cmd port
	cmdPort := cmd.NewAdapter().WithLogger(logger)

	// create main app and pass other ports to it
	madev := app.NewAdapter(appCore, cmdPort).WithLogger(logger)
	if err := madev.Run(); err != nil {
		logger.Error("Could not run app", "err", err.Error())
		os.Exit(1)
	}

	// TODO: add SIGTERM handler
}
