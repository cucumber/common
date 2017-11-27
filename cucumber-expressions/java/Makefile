default: .built
.PHONY: default

.built: pom.xml
	mvn install
	touch $@

clean:
	rm -rf target
.PHONY: clean
