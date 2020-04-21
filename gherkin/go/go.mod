module github.com/cucumber/gherkin-go/v13

require (
	github.com/aslakhellesoy/gox v1.0.100 // indirect
	github.com/cucumber/messages-go/v12 v12.0.0
	github.com/gogo/protobuf v1.3.1
	github.com/stretchr/testify v1.5.1
)

replace github.com/cucumber/messages-go/v12 => ../../messages/go

go 1.13
