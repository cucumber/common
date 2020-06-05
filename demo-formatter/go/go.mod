module github.com/cucumber/demo-formatter-go

require (
	github.com/cucumber/messages-go/v12 v12.1.1
	github.com/gogo/protobuf v1.3.1
	github.com/stretchr/testify v1.5.1
)

replace github.com/cucumber/messages-go/v12 => ../../messages/go

go 1.13
