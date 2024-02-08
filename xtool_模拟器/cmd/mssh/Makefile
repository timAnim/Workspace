VERSION=`git tag | tail -1`
BUILD=`date +"%Y-%m-%d %H:%M:%S"`
TAGCOMMITSHA1=`git tag | tail -1 | xargs git rev-parse`
COMMITSHA1=`git rev-parse HEAD`
LDFLAGS=-ldflags "-s -w -X main.VERSION=${VERSION} -X 'main.BUILD=${BUILD}' -X main.TAGCOMMITSHA1=${TAGCOMMITSHA1} -X main.COMMITSHA1=${COMMITSHA1}"
PRODUCT=mssh
PACKDIR=$(PRODUCT)-${VERSION}



$(PRODUCT): linux win32
	rm -rf $(PRODUCT) $(PRODUCT).exe
	mv release $(PACKDIR)
	tar -czvf $(PACKDIR).tar.gz $(PACKDIR)
	rm -rf $(PACKDIR)

install: go_install

go_install:
	CGO_ENABLED=1 GOOS=linux GOARCH=amd64 go install $(LDFLAGS)

mac: clean
	CGO_ENABLED=1 GOOS=darwin GOARCH=amd64 go build $(LDFLAGS)
	upx $(PRODUCT)
	mkdir -p release/mac
	mv $(PRODUCT) release/mac

win64: clean
	CGO_ENABLED=0 GOOS=windows GOARCH=amd64 go build $(LDFLAGS)
	upx $(PRODUCT).exe
	mkdir -p release/win64
	mv $(PRODUCT).exe release/win64

win32: clean
	CGO_ENABLED=0 GOOS=windows GOARCH=386 go build $(LDFLAGS)
	upx $(PRODUCT).exe
	mkdir -p release/win32
	mv $(PRODUCT).exe release/win32

linux: clean
	CGO_ENABLED=1 GOOS=linux GOARCH=amd64 go build $(LDFLAGS)
	upx $(PRODUCT)
	mkdir -p release/linux
	mv $(PRODUCT) release/linux

arm: clean
	CGO_ENABLED=0 GOOS=linux GOARCH=arm go build $(LDFLAGS)
	upx $(PRODUCT)
	mkdir -p release/arm
	mv $(PRODUCT) release/arm

clean:
	rm -rf release $(PRODUCT) $(PRODUCT).exe $(PRODUCT)-*.tar.gz


note:
	#获取自上次发版以来的提交记录
	git log $(VERSION)..HEAD --pretty=oneline


