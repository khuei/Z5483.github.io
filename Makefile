.POSIX:

all: build

build:
	hexo generate --deploy
	rm -rf docs
	cp -rf public docs

test:
	hexo generate --deploy --watch &
	hexo server && fg

.PHONY: build test
