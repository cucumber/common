module github.com/cucumber/gherkin-go/v9

require (
	github.com/aslakhellesoy/gox v1.0.100 // indirect
	github.com/cucumber/messages-go/v8 v8.0.0
	github.com/gogo/protobuf v1.3.1
	github.com/stretchr/testify v1.4.0
)

replace github.com/cucumber/messages-go/v8 => ../../messages/go

go 1.13
