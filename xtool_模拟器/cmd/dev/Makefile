HOST=192.168.30.193:8089

all: dns yum go vim term gobin vimcpp

dns:
	[ x`cat /etc/resolv.conf | grep "114.114.114.114" | tail -1 | awk '{print $$1}'` != x ] || echo 'nameserver 114.114.114.114' >> /etc/resolv.conf

yum:
	wget http://$(HOST)/develop/CentOS-Base.repo
	mv CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo
	yum makecache
	yum groupinstall -y "Development Tools"
	yum install -y autojump
	yum install -y git

vim:
	yum install -y bzip2
	wget http://$(HOST)/develop/vim_cfg.tar.gz
	tar -zxvf vim_cfg.tar.gz
	cd vim_cfg; sh install_vim.sh
	sed -i 's/"colorscheme jellybeans/colorscheme jellybeans/g' ~/.vimrc
	sed -i 's/colorscheme default/"colorscheme default/g' ~/.vimrc
	rm -rf vim_cfg*

vim8:
	wget http://$(HOST)/develop/vim8_cfg.tar.gz
	wget http://$(HOST)/develop/vim-8.1.2079.tar.gz
	tar -zxvf vim8_cfg.tar.gz
	-[ -d ~/.vim ] || rm -rf ~/.vim
	-[ -f ~/.vimrc ] || rm -rf ~/.vimrc
	rm -rf ~/.vim ~/.vimrc
	cp -rf vim8_cfg/.vim ~/
	cp -rf vim8_cfg/.vimrc ~/
	tar -zxvf vim-8.1.2079.tar.gz
	-yum install ncurses -y
	-yum install ncurses-devel -y
	-yum install lua -y
	-yum install lua-devel -y
	cd vim-8.1.2079; ./configure --prefix=/usr --with-features=huge --enable-rubyinterp --enable-pythoninterp --enable-luainterp --with-lua-prefix=/usr
	cd vim-8.1.2079; make
	rm -rf `which vim`
	cd vim-8.1.2079; make install
	rm -rf vim8_cfg* vim-8.1.2079*

vimcpp:
	yum install -y ctags
	wget http://$(HOST)/develop/omnicppcomplete-0.41.zip
	[ -d `vim --version | grep 'share/vim' | awk -F ':' '{print $$2}' | sed 's/"//g' | sed 's/ //g'`/vimfiles ] || mkdir -p `vim --version | grep 'share/vim' | awk -F ':' '{print $$2}' | sed 's/"//g' | sed 's/ //g'`/vimfiles
	unzip -o omnicppcomplete-0.41.zip -d `vim --version | grep 'share/vim' | awk -F ':' '{print $$2}' | sed 's/"//g' | sed 's/ //g'`/vimfiles
	rm -rf omnicppcomplete-0.41.zip*
	# 因ftp服务器貌似不支持未知格式的文件，加.sh后缀加以处理
	wget http://$(HOST)/develop/.vimrc
	mv .vimrc ~/
	#- mkdir ~/.ctags
	[ -d ~/.ctags ] || mkdir ~/.ctags
	ctags -R --sort=yes --c++-kinds=+p --fields=+iaS --extra=+q --language-force=C++ -f ~/.ctags/std /usr/include

term:
	echo 'if [ "$$TERM" == "xterm" ];then' >> ~/.bashrc
	echo '	export TERM=xterm-256color' >> ~/.bashrc
	echo 'fi' >> ~/.bashrc

go:
	wget http://$(HOST)/develop/go1.9.2.linux-amd64.tar.gz
	tar -zxvf go1.9.2.linux-amd64.tar.gz
	- rm -rf /usr/local/go
	mv go /usr/local
	#- mkdir ~/go
	[ -d ~/go ] || mkdir ~/go
	rm -rf go1.9.2.linux-amd64.tar.gz

go1.13:
	wget http://$(HOST)/develop/go1.13.linux-amd64.tar.gz
	tar -zxvf go1.13.linux-amd64.tar.gz
	- rm -rf /usr/local/go
	mv go /usr/local
	#- mkdir ~/go
	[ -d ~/go ] || mkdir ~/go
	rm -rf go1.13.linux-amd64.tar.gz

gobin-1.13:
	wget http://$(HOST)/develop/gobin-1.13.tar.gz
	tar -zxvf gobin-1.13.tar.gz -C $(GOPATH)
	rm -rf gobin*

goenv:
	[ x`cat /etc/profile | grep "^export GOROOT=" | tail -1 | awk '{print $$1}'` != x ] || echo 'export GOROOT=/usr/local/go' >> /etc/profile
	[ x`cat /etc/profile | grep "^export GOPATH=" | tail -1 | awk '{print $$1}'` != x ] || echo 'export GOPATH=~/go' >> /etc/profile
	[ x`cat /etc/profile | grep "^export GOBIN=" | tail -1 | awk '{print $$1}'` != x ] || echo 'export GOBIN=$$GOPATH/bin' >> /etc/profile
	[ x`cat /etc/profile | grep "PATH.*GOBIN" | tail -1 | awk '{print $$1}'` != x ] || echo 'export PATH=$$PATH:$$GOROOT/bin:$$GOBIN' >> /etc/profile

gobin: goenv
	wget http://$(HOST)/develop/gobin.tar.gz
	tar -zxvf gobin.tar.gz -C $(GOPATH)
	rm -rf gobin*

gcc-armv7l: armv7l-env
	# armv7l 交叉编译环境配置
	wget http://$(HOST)/develop/gcc-linaro-arm-linux-gnueabihf-4.9-2014.07_linux.tar.gz
	tar -xvf gcc-linaro-arm-linux-gnueabihf-4.9-2014.07_linux.tar.gz -C /usr/local/
	rm -rf gcc-linaro-arm-linux-gnueabihf-4.9-2014.07_linux.tar.gz

armv7l-env:
	[ x`cat /etc/profile | grep "^export ARMBIN=" | tail -1 | awk '{print $$1}'` != x ] || echo 'export ARMBIN=/usr/local/gcc-linaro-arm-linux-gnueabihf-4.9-2014.07_linux/bin' >> /etc/profile
	[ x`cat /etc/profile | grep "PATH.*ARMBIN" | tail -1 | awk '{print $$1}'` != x ] || echo 'export PATH=$$PATH:$$ARMBIN' >> /etc/profile

gcc-armv5l:
	# armv5l 交叉编译环境配置
	wget http://$(HOST)/develop/arm-linux-uclibc-4.8.5.tar.gz
	tar -xvf arm-linux-uclibc-4.8.5.tar.gz -C /usr/local/
	rm -rf arm-linux-uclibc-4.8.5.tar.gz

armv5l-env:
	[ x`cat /etc/profile | grep "^export COLLECT_GCC=" | tail -1 | awk '{print $$1}'` != x ] || echo 'export COLLECT_GCC=/usr/local/arm-linux-uclibc-4.8.5/usr/bin/arm-linux-gcc.br_real' >> /etc/profile
	[ x`cat /etc/profile | grep "^export COLLECT_LTO_WRAPPER=" | tail -1 | awk '{print $$1}'` != x ] || echo 'export COLLECT_LTO_WRAPPER=/usr/local/arm-linux-uclibc-4.8.5/usr/libexec/gcc/arm-nuvoton-linux-uclibcgnueabi/4.8.5/lto-wrapper' >> /etc/profile
	[ x`cat /etc/profile | grep "PATH.*arm-linux-uclibc" | tail -1 | awk '{print $$1}'` != x ] || echo 'export PATH=$$PATH:/usr/local/arm-linux-uclibc-4.8.5/usr/bin' >> /etc/profile

cmake:
	wget http://$(HOST)/develop/cmake-3.11.0-rc1-Linux-x86_64.tar.gz
	tar -xvf cmake-3.11.0-rc1-Linux-x86_64.tar.gz -C /usr/local/
	rm -rf cmake-3.11.0-rc1-Linux-x86_64.tar.gz
	[ x`cat /etc/profile | grep "PATH.*cmake" | tail -1 | awk '{print $$1}'` != x ] || echo 'export PATH=$$PATH:/usr/local/cmake-3.11.0-rc1-Linux-x86_64/bin' >> /etc/profile

gdb:
	wget http://$(HOST)/develop/gdb-8.3.tar.gz
	tar -zxvf gdb-8.3.tar.gz
	cd gdb-8.3; ./configure; cd -
	cd gdb-8.3; make; cd -
	cd gdb-8.3; make install; cd -
	rm -rf gdb-8.3*

vim-gdb:
	wget http://$(HOST)/develop/vimgdb-for-vim7.4.tar.gz
	wget http://$(HOST)/develop/vim-7.4.tar.gz
	tar -zxvf vimgdb-for-vim7.4.tar.gz
	tar -zxvf vim-7.4.tar.gz
	patch -p0 < vimgdb-for-vim7.4/vim74.patch
	cd vim74; ./configure --prefix=/usr --with-features=huge --enable-rubyinterp --enable-pythoninterp --enable-luainterp --enable-gdb --with-lua-prefix=/usr; cd -
	cd vim74; make; cd -
	cd vim74; make install; cd -
	cp -rf vimgdb-for-vim7.4/vimgdb_runtime/* ~/.vim/
	[ x`cat /etc/profile | grep "PATH.*/opt/bin" | tail -1 | awk '{print $$1}'` != x ] || echo 'export PATH=$$PATH:/opt/bin' >> /etc/profile
	rm -rf /usr/bin/vim
	ln -sf /opt/bin/vim /usr/bin/vim
	rm -rf vim-7.4* vim74 rm -rf vimgdb-for-vim7.4*

protoc-3.9.0:
	wget http://$(HOST)/develop/protoc-3.9.0-linux-x86_64.tar.gz
	tar -zxvf protoc-3.9.0-linux-x86_64.tar.gz -C /usr/local/
	\cp -rf /usr/local/protoc-3.9.0-linux-x86_64/include/* /usr/local/include/
	sed -i '/protoc/d' /etc/profile && echo 'export PATH=$$PATH:/usr/local/protoc-3.9.0-linux-x86_64/bin' >> /etc/profile
	rm -rf protoc-3.9.0-linux-x86_64*

protoc-3.7.0:
	wget http://$(HOST)/develop/protoc-3.7.0-linux-x86_64.tar.gz
	tar -zxvf protoc-3.7.0-linux-x86_64.tar.gz -C /usr/local/
	\cp -rf /usr/local/protoc-3.7.0-linux-x86_64/include/* /usr/local/include/
	sed -i '/protoc/d' /etc/profile && echo 'export PATH=$$PATH:/usr/local/protoc-3.7.0-linux-x86_64/bin' >> /etc/profile
	rm -rf protoc-3.7.0-linux-x86_64*
	yum install -y libatomic

clean:
	rm -rf vim-7.4* vim74 vimgdb-for-vim7.4*

