module github.com/cucumber/cucumber-demo-formatter-go

require (
	github.com/cucumber/cucumber-messages-go/v8 v8.0.0
	github.com/gogo/protobuf v1.3.1
	github.com/stretchr/testify v1.4.0
)

replace github.com/cucumber/cucumber-messages-go/v7 => ../../cucumber-messages/go

go 1.13
