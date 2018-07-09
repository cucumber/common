include default.mk

default: bin/cucumber-dots

.deps:
	go get github.com/fatih/color
	go get github.com/gogo/protobuf/io
	go get github.com/stretchr/testify
	go get github.com/cucumber/cucumber-messages-go
	touch $@

bin/cucumber-dots: .deps $(GO_SOURCE_FILES)
	go build -o $@ ./cli

clean:
	rm -rf bin/cucumber-dots
