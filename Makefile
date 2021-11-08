.POSIX:

all: build

build:
	hexo generate --deploy
	rm -rf docs
	cp -rf public docs

.PHONY: build
