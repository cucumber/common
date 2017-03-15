
MAKEFILES=$(wildcard */Makefile)

all: $(patsubst %/Makefile,%/.compared,$(MAKEFILES))
.PHONY: all

%/.compared: % gherkin-languages.json gherkin.berp
	cd $< && make

clean: $(patsubst %/Makefile,clean-%,$(MAKEFILES))
.PHONY: clean
clean-%: %
	cd $< && make clean

add-remotes: $(patsubst %/Makefile,add-remote-%,$(MAKEFILES))
.PHONY: add-remotes
add-remote-%: %
	git remote -v | grep -E 'gherkin-$<\s' 2>/dev/null >/dev/null || \
	git remote add gherkin-$< git@github.com:cucumber/gherkin-$<.git

push-subtrees: $(patsubst %/Makefile,push-subtree-%,$(MAKEFILES))
.PHONY: push-subtrees
push-subtree-%: % add-remote-%
	git subtree push --prefix=$< gherkin-$< master

pull-subtrees: $(patsubst %/Makefile,pull-subtree-%,$(MAKEFILES))
.PHONY: pull-subtrees
pull-subtree-%: % add-remote-%
	git subtree pull --prefix=$< gherkin-$< master

format-gherkin-languages: gherkin-languages.json.tmp
	diff -q gherkin-languages.json.tmp gherkin-languages.json || mv gherkin-languages.json.tmp gherkin-languages.json
.PHONY: format-gherkin-languages

gherkin-languages.json.tmp:
	cat gherkin-languages.json | jq "." --sort-keys > gherkin-languages.json.tmp
.INTERMEDIATE: gherkin-languages.json.tmp
