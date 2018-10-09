include default.mk

.deps:
	# Can't use `go build` because we don't have any sources - they're generated!
	go get github.com/gogo/protobuf/protoc-gen-gogofaster
	go get github.com/gogo/protobuf/proto
	go get github.com/golang/protobuf/protoc-gen-go
	go get github.com/stretchr/testify
	touch $@

.tested: events.pb.go commands.pb.go

events.pb.go: events.proto
	protoc -I=. -I=$(GOPATH)/src -I=$(GOPATH)/src/github.com/gogo/protobuf/protobuf --gogofaster_out=\
	Mgoogle/protobuf/timestamp.proto=github.com/gogo/protobuf/types:. \
	$<

commands.pb.go: commands.proto
	protoc -I=. -I=$(GOPATH)/src -I=$(GOPATH)/src/github.com/gogo/protobuf/protobuf --gogofaster_out=\
	Mgoogle/protobuf/timestamp.proto=github.com/gogo/protobuf/types:. \
	$<

clean:
	rm -f *.pb.go
