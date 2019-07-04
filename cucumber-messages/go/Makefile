include default.mk

.tested: v3/messages.pb.go

v3/messages.pb.go: messages.proto
	-protoc -I=. -I=$(GOPATH)/src -I=$(GOPATH)/src/github.com/gogo/protobuf/protobuf --gogofaster_out=\
	Mgoogle/protobuf/timestamp.proto=github.com/gogo/protobuf/types:./v3 \
	$<

clean:
	rm -f v3/messages.pb.go
