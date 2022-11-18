package types

type FlagValues struct {
	*BlockchainFlags
}

type BlockchainFlags struct {
	ChainID       *string
	Premine       *string
	BlockGasLimit *string
}
