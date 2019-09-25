module github.com/cucumber/json-formatter-go

require (
	github.com/aslakhellesoy/gox v1.0.100 // indirect
	github.com/cucumber/cucumber-messages-go/v5 v5.0.1
	github.com/gogo/protobuf v1.3.0
	github.com/stretchr/testify v1.4.0
)

replace github.com/cucumber/cucumber-messages-go/v5 => ../../cucumber-messages/go

go 1.13
