module github.com/cucumber/common/gherkin/go/v24

require (
	github.com/cucumber/common/messages/go/v19 v19.1.2
	github.com/stretchr/testify v1.8.0
)

require (
	github.com/davecgh/go-spew v1.1.1 // indirect
	github.com/gofrs/uuid v4.2.0+incompatible // indirect
	github.com/pmezard/go-difflib v1.0.0 // indirect
	gopkg.in/yaml.v3 v3.0.1 // indirect
)

replace github.com/cucumber/common/messages/go/v19 => ../../messages/go

go 1.19
