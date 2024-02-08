(function(window) {

    function Carrousel(opt) {
        this.index = 0;
        this.timer = null;
        this.paused = false;
        this.ended = false; // 判断是不是最后一张, 避免停留时间是双倍
        this.imgs = opt.imgs;
        this.outer = opt.outer;
        this.id = new Date().valueOf() + '';
        this.speed = 3000;

        // 定义样式,可用于用户重写
        this.indicatorStyle = {
            height: '1.6em',
            textAlign: 'center',
            background: 'rgba(0,0,0,0.3)',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: '0.2em',
            borderRadius: '1em',
            position: 'absolute',
            opacity: '0.4',
            transition: 'opacity 0.5s ease',
        };

        this.titleStyle = {
            padding: '0.5em',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), transparent)',
            color: 'white',
        };

        this.dotStyle = {
            height: '1em',
            width: '1em',
            display: 'inline-block',
            borderRadius: '1em',
            background: '#e0e0e0',
            margin: '0.3em',
            cursor: 'pointer',
        };

        this.refresh = () => {
            this.width = this.outer.clientWidth;
            this.height = this.outer.clientHeight;
            util.css(this.inner, {
                height: this.height + 'px',
                width: this.imgs.length * this.width + 'px',
            })
            var lis = this.inner.getElementsByTagName('li');
            for (var i = lis.length - 1; i >= 0; i--) {
                util.css(lis[i], {
                    width: this.width + 'px',
                })
            }
        }


        this.init();
        this.move(true);
    }

    var util = {
            css(el, opt) {
                for (var prop in opt) {
                    el.style[prop] = opt[prop];
                }
            },
            oBtn(opt) {
                var btn = document.createElement('button');
                btn.id = opt.id;
                btn.innerHTML = opt.innerHTML;
                this.css(btn, {
                    background: 'rgba(0,0,0,0.3)',
                    height: '2em',
                    lineHeight: '2em',
                    width: '2em',
                    display: 'inline-block',
                    position: 'absolute',
                    border: 'none',
                    outline: 'none',
                    cursor: 'pointer',
                    color: 'white',
                    opacity: '0.4',
                    transition: 'opacity 0.5s ease',
                })
                this.css(btn, opt.style);
                btn.onmouseenter = function() {
                    this.style.opacity = '1';
                }
                btn.onmouseleave = function() {
                    this.style.opacity = '0.4';
                }
                return btn;
            }
        },
        icon = {
            left: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" style = "transform:scale(0.625) translateY(-15%)"><path fill="currentColor" d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z" class=""></path></svg>',
            right: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" style = "transform:scale(0.625) translateY(-15%)"><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" class=""></path></svg>',
            pause: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 514 514"><path fill="white" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm-16 328c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160zm112 0c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160z"></path></svg>',
            play: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 514 514"><path fill="white" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z"></path></svg>',
        },
        dots;

    Carrousel.prototype.init = function() {
        this.imgs.push(this.imgs[0]);
        this.width = this.outer.clientWidth;
        this.height = this.outer.clientHeight;

        var tmp;

        // outer 的样式
        util.css(this.outer, {
            overflow: 'hidden',
            position: 'relative',
            borderRadius: '4px',
        })

        // ul(inner) 的样式
        tmp = document.createElement('ul');
        tmp.id = this.id;
        util.css(tmp, {
            top: 0,
            left: 0,
            margin: 0,
            padding: 0,
            position: 'absolute',
            transition: 'left 0.2s ease',
            width: this.imgs.length * this.width + 'px',
        })
        this.outer.appendChild(tmp);
        this.inner = document.getElementById(this.id);

        // li 的样式
        var title;
        this.imgs.forEach(img => {
            tmp = document.createElement('li');
            title = document.createElement('div');
            title.innerHTML = img.title;
            util.css(title, this.titleStyle);
            util.css(tmp, {
                listStyle: 'none',
                width: this.width + 'px',
                height: this.height + 'px',
                background: 'url(' + img.url + ')',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'inline-block',
            });
            tmp.appendChild(title);
            this.inner.appendChild(tmp);

        })

        // 前一页按钮
        this.outer.appendChild(util.oBtn({
            id: 'prev-btn',
            innerHTML: icon.left,
            style: {
                top: '50%',
                left: 0,
                marginTop: '-1em',
                borderRadius: '0 1em 1em 0',
            }
        }));

        // 后一页按钮
        this.outer.appendChild(util.oBtn({
            id: 'next-btn',
            innerHTML: icon.right,
            style: {
                top: '50%',
                right: 0,
                marginTop: '-1em',
                borderRadius: '1em 0 0 1em',
            }
        }));

        // 指示器
        tmp = document.createElement('div');
        util.css(tmp, this.indicatorStyle);
        tmp.id = 'indicator';
        tmp.addEventListener('mouseenter', function() {
            this.style.opacity = '1';
        })
        tmp.addEventListener('mouseleave', function() {
            this.style.opacity = '0.4';
        })

        var span;
        for (var i = 0; i < this.imgs.length; i++) {
            span = document.createElement('span');
            util.css(span, this.dotStyle);
            span.id = 'dot-' + i;
            if (i === 0) {
                util.css(span, {
                    cursor: 'pointer',
                    height: '1.6em',
                    width: '1.6em',
                    margin: ' 0 0.3em 0 0',
                    display: 'inline-block',
                    background: '',
                })
                span.id = 'pause-btn';
                span.innerHTML = icon.pause;
            }
            tmp.appendChild(span);
        }
        this.outer.appendChild(tmp);
        dots = document.getElementById('indicator').getElementsByTagName('span');

        // 窗体大小改变时需要重置
        window.addEventListener('resize', this.refresh);

        // 点击事件监听
        this.outer.addEventListener('click', ev => {
            this.clickHdl.call(this, ev)
        });
    }

    Carrousel.prototype.clickHdl = function(ev) {
        var target = ev.target;
        while (!target.id) {
            target = target.parentNode;
        }
        switch (target.id) {
            case 'pause-btn':
                this.paused = !this.paused;
                if (!this.paused) {
                    this.play();
                    target.innerHTML = icon.pause;
                } else {
                    target.innerHTML = icon.play;
                    clearInterval(this.timer);
                }
                break;
            case 'prev-btn':
                this.prev();
                break;
            case 'next-btn':
                this.next();
                break;
            default:
                var arr = target.id.split('-');
                this.index = parseInt(arr[1] ? arr[1] - 1 : this.index);
                this.move(true)
                return;
        }
    }

    Carrousel.prototype.next = function() {
        this.index++;
        if (this.index >= this.imgs.length) {
            this.index = 0;
            return this.move(false);
        };
        this.move(true);
    }

    Carrousel.prototype.prev = function() {
        this.index--;
        if (this.index < 0) {
            // 先移到第一张(不带动画)
            this.index = this.imgs.length - 1;
            this.move(false);

            // 再移到图片列表的末尾(带动画)
            setTimeout(() => {
                this.index = this.imgs.length - 2;
                this.move(true);
            }, 50)
        } else {
            this.move(true);
        }
    }

    Carrousel.prototype.move = function(anim) {
        this.ended = !anim; // 如果没有动画 说明是最后一张
        this.inner.style.transition = anim ? 'left 0.2s ease' : 'none';
        this.inner.style.left = -(this.index * this.width) + 'px';
        for (var i = dots.length - 1; i >= 1; i--) {
            dots[i].style.background = '#e0e0e0';
        }
        var cur = document.getElementById('dot-' + (this.index + 1));
        if (this.index + 1 === 5) cur = document.getElementById('dot-1');
        cur.style.background = '#ff5700';
        this.play();
    }

    Carrousel.prototype.play = function(isNext) {
        // 如果用户点击了暂停按钮 则不播放了
        if (this.paused) {
            return clearInterval(this.timer);
        }
        isNext = isNext || true; // 默认下一张, 用户如果点击前一张 则回退
        clearInterval(this.timer);
        var _this = this;
        this.timer = setInterval(function() {
            if (isNext) {
                _this.next()
            } else {
                _this.prev()
            }
        }, this.ended ? 0 : this.speed); // 如果是最后一张就不停留
    }

    window.Carrousel = Carrousel;
}(window))