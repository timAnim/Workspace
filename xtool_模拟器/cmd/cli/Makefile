VERSION=`git tag | tail -1`
BUILD=`date +"%Y-%m-%d %H:%M:%S"`
TAGCOMMITSHA1=`git tag | tail -1 | xargs git rev-parse`
COMMITSHA1=`git rev-parse HEAD`
LDFLAGS=-ldflags "-s -w -X main.VERSION=${VERSION} -X 'main.BUILD=${BUILD}' -X main.TAGCOMMITSHA1=${TAGCOMMITSHA1} -X main.COMMITSHA1=${COMMITSHA1}"
PACKDIR=cli-${VERSION}

sqlite:
	rm -rf cli.rc cli.syso
	cat main.go | sed -e 's://@SQLITE@::g' > main.go.bak
	mv main.go.bak main.go
	#CGO_ENABLED=1 GOOS=linux GOARCH=amd64 go install $(LDFLAGS) --tags "sqlite_json"
	#git checkout cli.rc cli.syso


cli: linux win32 arm7
	rm -rf cli cli.exe
	mv release $(PACKDIR)
	tar -czvf $(PACKDIR).tar.gz $(PACKDIR)
	rm -rf $(PACKDIR)

install: prepare web go_install clean_web recover

go_install:
	CGO_ENABLED=1 GOOS=linux GOARCH=amd64 go install -mod=vendor $(LDFLAGS) --tags "sqlite_json"

mac: clean sqlite
	CGO_ENABLED=1 GOOS=darwin GOARCH=amd64 go build -mod=vendor $(LDFLAGS) --tags "sqlite_json"
	#upx cli
	mkdir -p release/mac
	mv cli release/mac

win64: recover clean
	CGO_ENABLED=0 GOOS=windows GOARCH=amd64 go build -mod=vendor $(LDFLAGS)
	#upx cli.exe
	mkdir -p release/win64
	mv cli.exe release/win64

win32: web recover clean
	CGO_ENABLED=0 GOOS=windows GOARCH=386 go build -mod=vendor $(LDFLAGS)
	#upx cli.exe
	mkdir -p release/win32
	mv cli.exe release/win32

linux: web clean sqlite
	CGO_ENABLED=1 GOOS=linux GOARCH=amd64 go build -mod=vendor $(LDFLAGS) --tags "sqlite_json"
	#upx cli
	mkdir -p release/linux
	mv cli release/linux

arm: clean
	CGO_ENABLED=1 GOOS=linux GOARCH=arm go build -mod=vendor $(LDFLAGS) --tags "sqlite_json"
	#upx cli
	mkdir -p release/arm
	mv cli release/arm

arm7: web clean
	GOOS=linux GOARCH=arm go build -mod=vendor $(LDFLAGS)
	#upx cli
	mkdir -p release/arm7
	mv cli release/arm7

clean:
	rm -rf cli cli.exe cli-*.tar.gz

web_build:
	rm -rf asset static templates
	cd web-cli;npm run build
	\cp -rf web-cli/dist/static ./
	mkdir templates
	\cp -rf web-cli/dist/index.html ./templates/index.tmpl

web:
	cat main.go | sed -e 's://@WEB@::g' > main.go.bak
	mv main.go.bak main.go

clean_web:
	rm -rf asset
	cat main.go | sed -e 's:_ "xtool/pkg/web"://@WEB@_ "xtool/pkg/web":g' > main.go.bak
	mv main.go.bak main.go

prepare:
	rm -rf cli.rc cli.syso
	cat main.go | sed -e 's://@SQLITE@::g' > main.go.bak
	mv main.go.bak main.go

recover:
	git checkout cli.rc cli.syso
	cat main.go | sed -e 's:_ "xtool/pkg/sqlite"://@SQLITE@_ "xtool/pkg/sqlite":g' > main.go.bak
	mv main.go.bak main.go

note:
	#获取自上次发版以来的提交记录
	git log $(VERSION)..HEAD --pretty=oneline

all: prepare web cli clean_web recover


swagger: web linux win32
	cp -rf ../../pkg/swagger/dist release
	cp -rf ../../pkg/protos/modbus/modbus.swagger.json release/dist/swagger.json
	mv release/linux/cli release/dist
	mv release/win32/cli.exe release/dist
	echo 'modbus_web 8011' > release/dist/proxy.cli
	echo 'http_proxy /modbus/ 127.0.0.1:8011' >> release/dist/proxy.cli
	echo 'file_server . :8010' >> release/dist/proxy.cli
	echo 'wait' >> release/dist/proxy.cli
	cd release; tar -czvf cli-doc.tar.gz dist
	mv release/cli-doc.tar.gz ./
	rm -rf release
	git checkout main.go
