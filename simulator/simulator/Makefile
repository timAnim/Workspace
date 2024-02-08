all:
	cp -f simulator.nginx.conf /usr/local/nginx/conf/ke/
	/usr/local/nginx/sbin/nginx -s reload
	cp -f ./simulator.xbrother /etc/monit.d/
	monit restart 
	monit start simulator
#	echo $(shell realpath $(shell pwd))/node-v14.21.3-linux-x64/bin/
