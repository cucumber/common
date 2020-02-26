module github.com/cucumber/json-formatter-go/v3

require (
	github.com/cucumber/messages-go/v10 v10.0.1

	github.com/gogo/protobuf v1.3.1
	github.com/golang/protobuf v1.3.3 // indirect
	github.com/onsi/ginkgo v1.12.0
	github.com/onsi/gomega v1.9.0
	golang.org/x/net v0.0.0-20200202094626-16171245cfb2 // indirect
	golang.org/x/sys v0.0.0-20200212091648-12a6c2dcc1e4 // indirect
	golang.org/x/text v0.3.2 // indirect
	golang.org/x/xerrors v0.0.0-20191204190536-9bdfabe68543 // indirect
)

replace github.com/cucumber/messages-go/v10 => ../../messages/go

go 1.13
