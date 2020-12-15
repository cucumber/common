module github.com/cucumber/demo-formatter-go

require (
	github.com/cucumber/messages-go/v13 v13.2.1
	github.com/gogo/protobuf v1.3.1
	github.com/stretchr/testify v1.6.1
)

replace github.com/cucumber/messages-go/v13 => ../../messages/go

go 1.13
