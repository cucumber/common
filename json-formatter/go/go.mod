module github.com/cucumber/json-formatter-go/v2

require (
	github.com/cucumber/messages-go/v9 v9.0.3

	github.com/gogo/protobuf v1.3.1
	github.com/golang/protobuf v1.3.2 // indirect
	github.com/onsi/ginkgo v1.11.0
	github.com/onsi/gomega v1.8.1
	golang.org/x/net v0.0.0-20191209160850-c0dbc17a3553 // indirect
	golang.org/x/sys v0.0.0-20200107162124-548cf772de50 // indirect
	golang.org/x/text v0.3.2 // indirect
	golang.org/x/xerrors v0.0.0-20191204190536-9bdfabe68543 // indirect
)

replace github.com/cucumber/messages-go/v9 => ../../messages/go

go 1.13
