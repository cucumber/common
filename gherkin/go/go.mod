module github.com/cucumber/common/gherkin/go/v19

require (
	github.com/cucumber/common/messages/go/v16 v16.0.0-20210616143200-16b27f1a25b2
	github.com/stretchr/testify v1.7.0
)

replace github.com/cucumber/common/messages/go/v16 => ../../messages/go

go 1.13
