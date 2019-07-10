include default.mk

.deps: .go-get

.go-get:
	go get github.com/gogo/protobuf/proto
	go get github.com/gogo/protobuf/protoc-gen-gogofaster
	go get github.com/stretchr/testify
	touch $@

.tested: v3/messages.pb.go

v3/messages.pb.go: messages.proto
	protoc \
		-I=. \
		-I=/usr/local/include \
		--gogofaster_out=Mgoogle/protobuf/timestamp.proto=github.com/gogo/protobuf/types:./v3 \
		$<

clean:
	rm -f v3/messages.pb.go .go-get
