include default.mk

default: .tested

.deps:
	go get github.com/gogo/protobuf/protoc-gen-gofast
	go get github.com/golang/protobuf/protoc-gen-go
	go get github.com/stretchr/testify
	touch $@

.tested: messages.pb.go

messages.pb.go: messages.proto
	PATH="$$(go env GOPATH)/bin:${PATH}" protoc --gofast_out=. $<

clean:
	rm -f messages.pb.go