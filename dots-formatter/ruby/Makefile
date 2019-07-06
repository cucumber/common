include default.mk

.deps: dots-formatter-go

dots-formatter-go:
	rm -rf dots-formatter-go
	ln -s "$$(pwd)/../../dots-formatter/go/dist" dots-formatter-go

clean:
	rm -rf dots-formatter-go
