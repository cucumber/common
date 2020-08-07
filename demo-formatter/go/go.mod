module github.com/cucumber/demo-formatter-go

require (
	github.com/aslakhellesoy/gox v1.0.100 // indirect
	github.com/cucumber/messages-go/v13 v13.0.0
	github.com/gogo/protobuf v1.3.1
	github.com/stretchr/testify v1.6.1
)

replace github.com/cucumber/messages-go/v13 => ../../messages/go

go 1.13
