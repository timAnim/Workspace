HOST=192.168.30.193:8089

GOSRC=$(GOPATH)/src

go:
	# modbus
	[ -d modbus ] || mkdir modbus
	#protoc -I$(GOPATH)/pkg/mod/github.com/grpc-ecosystem/grpc-gateway@v1.14.8/third_party/googleapis/google/api
	protoc -I$(GOPATH)/pkg/mod/github.com/grpc-ecosystem/grpc-gateway\@v1.14.8/third_party/googleapis \
		--proto_path=.:$(GOSRC):/usr/include:/usr/local/include \
		--go_out=plugins=grpc:./modbus \
		--grpc-gateway_out=logtostderr=true:./modbus \
		--swagger_out=logtostderr=true:./modbus \
		"modbus.proto"
	protoc-go-inject-tag -input=./modbus/modbus.pb.go
	sed -i 's/,omitempty//g' ./modbus/modbus.pb.go
	# xtop
	go run scripts/includetxt.go


protoc:
	wget http://$(HOST)/develop/protoc-3.9.0-linux-x86_64.tar.gz
	tar -zxvf protoc-3.9.0-linux-x86_64.tar.gz -C /usr/local/
	\cp -rf /usr/local/protoc-3.9.0-linux-x86_64/include/* /usr/local/include/
	sed -i '/protoc/d' /etc/profile && echo 'export PATH=$$PATH:/usr/local/protoc-3.9.0-linux-x86_64/bin' >> /etc/profile
	rm -rf protoc-3.9.0-linux-x86_64*

pro-go:
	go get -d -u github.com/golang/protobuf/protoc-gen-go
	cd $(shell go env GOPATH)/src/github.com/golang/protobuf; git checkout v1.3.2
	go install github.com/golang/protobuf/protoc-gen-go

grpc-gateway:
	go get github.com/grpc-ecosystem/grpc-gateway/...

test:
	curl -X POST "http://127.0.0.1:8010/modbus/input/register" -H "Content-Type:application/json" -d '{"addr":"0001","field": "hex", "value": "1234"}' && echo ''
	curl -X POST "http://127.0.0.1:8010/modbus/input/register" -H "Content-Type:application/json" -d '{"addr":"0001","field": "ubint16", "value": "4660"}' && echo ''
	curl -X POST "http://127.0.0.1:8010/modbus/input/register" -H "Content-Type:application/json" -d '{"addr":"0001","field": "ulint16", "value": "13330"}' && echo ''
	curl -X POST "http://127.0.0.1:8010/modbus/input/register" -H "Content-Type:application/json" -d '{"addr":"0001","field": "sbint16", "value": "-1234"}' && echo ''
	curl -X POST "http://127.0.0.1:8010/modbus/input/register" -H "Content-Type:application/json" -d '{"addr":"0001","field": "slint16", "value": "-1234"}' && echo ''
	curl -X POST "http://127.0.0.1:8010/modbus/input/register" -H "Content-Type:application/json" -d '{"addr":"0001","field": "int16", "value": "1234"}' && echo ''
	curl -X POST "http://127.0.0.1:8010/modbus/input/range" -H "Content-Type:application/json" -d '{"addr":"0001","min": 10, "max": 100}' && echo ''
	curl -X POST "http://127.0.0.1:8010/modbus/input/ctrl" -H "Content-Type:application/json" -d '{"addr":"0001","random": true}' && echo ''
	curl -X POST "http://127.0.0.1:8010/modbus/dinput/register" -H "Content-Type:application/json" -d '{"addr":"0007-0000", "field": "hex", "value": "EF"}' && echo ''
	curl -X POST "http://127.0.0.1:8010/modbus/dinput/register" -H "Content-Type:application/json" -d '{"addr":"0015-0008", "field": "bit7", "value": "1"}' && echo ''
	curl -X POST "http://127.0.0.1:8010/modbus/dinput/register" -H "Content-Type:application/json" -d '{"addr":"000F-0008", "field": "bit7", "value": "1"}' && echo ''
	curl -X POST "http://127.0.0.1:8010/modbus/dinput/ctrl" -H "Content-Type:application/json" -d '{"addr":"0007-0000", "random": true}' && echo ''
	curl -X POST "http://127.0.0.1:8010/modbus/coil/register" -H "Content-Type:application/json" -d '{"addr":"0007-0000", "field": "hex", "value": "EF"}' && echo ''
	curl -X POST "http://127.0.0.1:8010/modbus/coil/register" -H "Content-Type:application/json" -d '{"addr":"0015-0008", "field": "bit7", "value": "1"}' && echo ''
	curl -X POST "http://127.0.0.1:8010/modbus/coil/register" -H "Content-Type:application/json" -d '{"addr":"000F-0008", "field": "bit7", "value": "1"}' && echo ''
	curl -X POST "http://127.0.0.1:8010/modbus/coil/ctrl" -H "Content-Type:application/json" -d '{"addr":"0007-0000", "random": true}' && echo ''

