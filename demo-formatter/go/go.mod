module github.com/cucumber/demo-formatter-go

require (
	github.com/cucumber/messages-go/v10 v10.0.1
	github.com/gogo/protobuf v1.3.1
	github.com/stretchr/testify v1.4.0
)

replace github.com/cucumber/messages-go/v10 => ../../messages/go

go 1.13
