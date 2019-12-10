module github.com/cucumber/json-formatter-go/v2

require (
	github.com/cucumber/cucumber-messages-go/v8 v8.0.0

	github.com/gogo/protobuf v1.3.1
	github.com/golang/protobuf v1.3.2 // indirect
	github.com/onsi/ginkgo v1.10.3
	github.com/onsi/gomega v1.7.1
	golang.org/x/net v0.0.0-20191209160850-c0dbc17a3553 // indirect
	golang.org/x/sys v0.0.0-20191210023423-ac6580df4449 // indirect
	golang.org/x/text v0.3.2 // indirect
)

replace github.com/cucumber/cucumber-messages-go/v7 => ../../cucumber-messages/go

go 1.13
