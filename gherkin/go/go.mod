module github.com/cucumber/gherkin-go/v11

require (
	github.com/cucumber/messages-go/v11 v11.0.1
	github.com/gogo/protobuf v1.3.1
	github.com/stretchr/testify v1.5.1
)

replace github.com/cucumber/messages-go/v11 => ../../messages/go

go 1.13
