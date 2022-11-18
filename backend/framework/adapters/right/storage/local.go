package storage

import (
	"encoding/json"
	"github.com/hashicorp/go-hclog"
	"github.com/madz-lab/madev/framework/ports"
	"os"
)

type Adapter struct {
	logger        hclog.Logger
	stateFileName string
}

func NewAdapter(logger hclog.Logger) ports.IStoragePort {
	return &Adapter{
		logger:        logger.Named("storage"),
		stateFileName: ".madev-state.json",
	}
}

func (a *Adapter) StoreJson(data interface{}) {
	marshaledData, err := json.Marshal(data)
	if err != nil {
		a.logger.Error("could not marshal provided data to json", "err", err.Error())
		return
	}

	err = os.WriteFile(a.stateFileName, marshaledData, 0644)
	if err != nil {
		a.logger.Error("could not write storage json file", "err", err.Error())
		return
	}
}

func (a *Adapter) ReadJson(dest interface{}) {
	jsonData, err := os.ReadFile(a.stateFileName)
	if err != nil {
		a.logger.Error("could not read json storage file", "err", err.Error())
		return
	}

	if err := json.Unmarshal(jsonData, dest); err != nil {
		a.logger.Error("could not unmarshal json data", "err", err.Error())
	}
}
