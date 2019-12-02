module github.com/cucumber/json-formatter-go/v2

require (
	github.com/cucumber/cucumber-messages-go/v7 v7.0.0

	github.com/gogo/protobuf v1.3.1
	github.com/onsi/ginkgo v1.10.3
	github.com/onsi/gomega v1.7.1
	golang.org/x/sys v0.0.0-20191127021746-63cb32ae39b2 // indirect
)

replace github.com/cucumber/cucumber-messages-go/v7 => ../../cucumber-messages/go

go 1.13
