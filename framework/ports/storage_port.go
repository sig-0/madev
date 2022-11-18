package ports

type IStoragePort interface {
	StoreJson(interface{})
	ReadJson(dest interface{})
}
