package main

import (
	"fmt"
	"github.com/hashicorp/go-hclog"
	"github.com/madz-lab/madev/framework/adapters/left/cmd"
	"github.com/madz-lab/madev/framework/adapters/right/storage"
	"github.com/madz-lab/madev/internal/adapters/app"
	"github.com/madz-lab/madev/internal/adapters/core"
	"os"
	"os/signal"
	"syscall"
)

func main() {
	// create logger
	logger := hclog.New(&hclog.LoggerOptions{Name: "madev", Level: hclog.Info})
	// handle signals
	done := make(chan os.Signal, 2)
	signal.Notify(done, os.Interrupt, syscall.SIGINT, syscall.SIGTERM)
	go func() {
		sig := <-done
		switch sig {
		case os.Interrupt, syscall.SIGTERM, syscall.SIGINT:
			fmt.Println("Shutting down server...")
			os.Exit(0)
		}
	}()

	// create core driver
	appCore := core.NewAdapter().WithLogger(logger)
	defer appCore.Close()

	// create cmd driver
	cmdDriver := cmd.NewAdapter().WithLogger(logger)
	// create storage driver
	storageDriver := storage.NewAdapter(logger)
	// create main app and pass other ports to it
	madev := app.NewAdapter(appCore, cmdDriver, storageDriver).WithLogger(logger)

	// run the main application
	if err := madev.Run(); err != nil {
		logger.Error("Could not run app", "err", err.Error())
		os.Exit(1)
	}
}
