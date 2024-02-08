GOSRC=$(GOPATH)/src
PROTO_LIST=xdevice

all:
	@for v in `echo $(PROTO_LIST) | cut -d' ' -f 1-`;\
	do\
		echo "make $$v.proto ...";\
		protoc --proto_path=.:$(GOSRC):/usr/include:/usr/local/include --go_out=plugins=grpc:. "$$v.proto";\
	done

py:
	for v in `echo $(PROTO_LIST) | cut -d' ' -f 1-`;\
	do\
		echo "make $$v.proto ...";\
		python -m grpc.tools.protoc --proto_path=.:$(PYTHONPATH) --python_out=. --grpc_python_out=. "$$v.proto";\
		echo "#!/usr/bin/evn python" > __init__.py;\
		echo "# -*- encoding: utf-8 -*-" >> __init__.py;\
		cat __init__.py ./"$$v"_pb2.py > ./"$$v"_pb2.py.new;\
		mv ./"$$v"_pb2.py.new ./"$$v"_pb2.py;\
	done


