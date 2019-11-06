module github.com/cucumber/gherkin-go/v8

require (
	github.com/cucumber/cucumber-messages-go/v6 v6.0.1
	github.com/gofrs/uuid v3.2.0+incompatible
	github.com/gogo/protobuf v1.3.1
)

replace github.com/cucumber/cucumber-messages-go/v6 => ../../cucumber-messages/go

go 1.13
