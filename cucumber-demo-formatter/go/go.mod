module github.com/cucumber/cucumber-demo-formatter-go

require (
	github.com/aslakhellesoy/gox v1.0.100 // indirect
	github.com/cucumber/cucumber-messages-go/v6 v6.0.1
	github.com/gogo/protobuf v1.3.1
	github.com/stretchr/testify v1.4.0
)

replace github.com/cucumber/cucumber-messages-go/v6 => ../../cucumber-messages/go

go 1.13
