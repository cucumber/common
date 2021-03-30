module github.com/cucumber/demo-formatter-go

require (
	github.com/cucumber/messages-go/v15 v15.0.0
	github.com/gogo/protobuf v1.3.2
	github.com/stretchr/testify v1.7.0
)

replace github.com/cucumber/messages-go/v15 => ../../messages/go

go 1.13
