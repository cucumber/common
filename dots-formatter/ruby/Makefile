include default.mk

.deps: executables

executables:
	rm -rf executables
	ln -s "$$(pwd)/../../dots-formatter/go/dist" executables

clean:
	rm -rf dots-formatter-go
