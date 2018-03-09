(function(window) {
    function ImgViewer(url, imgs) {
        this.imgs = imgs;
        this.cur = this.getIndex(url);
        this.init()
        this.render()
    }

    ImgViewer.prototype.init = function() {
        var str =
            `<div id='img-outer' class="float-nw float-se bg-mask pd-s" style='overflow:hidden;transition: background 0.2s ease;'>
            <button class="float-ne bg-alert cl-white pd-s">close</button>
            <div id = 'img-viewer' class="ht-max"></div>
        </div>`;
        $(document.body).append(str);
        this.outer = $('#img-outer')[0];
        this.viewer = $('#img-viewer')[0];
        this.btn = $('#img-outer>button')[0];

        $(this.outer).on('swipeRight', ev => {
            if (this.pincher.scale === 1) {
                this.next.call(this)
            }
        })

        $(this.outer).on('swipeLeft', ev => {
            if (this.pincher.scale === 1) {
                this.prev.call(this)
            }
        })

        // 这里的所有this 都需要是pincher对象
        this.pincher = new Pincher({
            initScale: 1,
            outer: this.outer,
            onPanStart(ev) {
                this.disX = ev.touches[0].pageX - parseInt(this.img.style.left);
                this.disY = ev.touches[0].pageY - parseInt(this.img.style.top);
                this.initX = ev.touches[0].pageX;
                this.initY = ev.touches[0].pageY;
            },
            onPan(ev) {
                this.x = ev.touches[0].pageX;
                this.y = ev.touches[0].pageY;
                if (this.scale > 1) {
                    this.img.style.top = ev.touches[0].pageY - this.disY + 'px';
                    this.img.style.left = ev.touches[0].pageX - this.disX + 'px';
                }
            },
            onPanEnd(ev) {
                if (this.scale !== 1) {
                    return
                }
                if (Math.abs(this.y - this.initY) > Math.abs(this.x - this.initX)) {
                    return
                }
                if (Math.abs(this.x - this.initX) < 20) {
                    return
                }
                if (this.x > this.initX) {
                    $(this.outer).trigger('swipeRight')
                } else {
                    $(this.outer).trigger('swipeLeft')
                }
            },
            onPinchStart(list) {
                this.x0 = this.left + Math.abs(list[0].pageX + list[1].pageX) / 2;
                this.y0 = this.top + Math.abs(list[0].pageY + list[1].pageY) / 2;
            },
            onPinch(scale) {
                this.opt.zoom.call(this, scale);
            },
            onPinchEnd(ev) {
                this.initScale = this.scale;
            },
            onScroll(wheelDeltaY) {
                this.initScale = this.scale || 1;
                this.scale = wheelDeltaY > 0 ? this.scale + 0.1 : this.scale - 0.1;
                this.opt.zoom.call(this, this.scale);
            },
            zoom(scale) {
                if (scale >= 3 || scale < 1.1) {
                    if (scale >= 3) scale = 3;
                    else if (scale < 1.1) scale = 1;
                    x = this.x0 * (scale / this.initScale - 1);
                    y = this.y0 * (scale / this.initScale - 1);
                } else {
                    x = this.x0 * (scale - 1);
                    y = this.y0 * (scale - 1);
                }

                $(this.img).css({
                    left: this.img.left + x + 'px',
                    top: this.img.top + y + 'px',
                    transform: 'scale(' + scale + ')',
                })

                this.scale = scale

                if (scale === 1) {
                    this.img.style.left = this._left + 'px';
                    this.img.style.top = this._top + 'px';
                    this.img.style.transition = 'left,top 0.2s ease';
                    this.outer.style.background = 'rgba(0,0,0,0.8)';
                    setTimeout(t => {
                        this.img.style.transition = '';
                    }, 200)
                } else {
                    this.outer.style.background = 'rgba(0,0,0,1)';
                }
            },
        })

        $(this.btn).on('tap click', ev => {
            $(this.outer).fadeOut(100, ev => {
                $(this.outer).remove()
            });
        })
    }

    ImgViewer.prototype.next = function() {
        this.cur--;
        if (this.cur < 0) {
            return this.cur = 0;
        }
        this.render();
    }

    ImgViewer.prototype.prev = function() {
        this.cur++;
        if (this.cur > this.imgs.length - 1) {
            return this.cur = this.imgs.length - 1;
        }
        this.render();
    }

    ImgViewer.prototype.getIndex = function(url) {
        var index = false;
        this.imgs.forEach((img, i) => {
            if (img.url == url) {
                index = i
            }
        })
        return index;
    }


    ImgViewer.prototype.render = function() {
        $('#img-outer img').fadeOut(100);
        setTimeout(() => {
            $(this.viewer).html('');
            var str = `<img src='${this.imgs[this.cur].url}' style = "max-height:100%;max-width:100%;position:absolute;z-index:80;transform:scale(1);">`
            $(str).appendTo(this.viewer).on('load', ev => {
                var img = $('#img-outer img');
                var outer = $(this.outer);
                this.pincher.img = img[0];
                this.pincher._left = this.pincher.left = (outer.width() - img.width()) / 2;
                this.pincher._top = this.pincher.top = (outer.height() - img.height()) / 2;
                img.css({
                    left: this.pincher.left + 'px',
                    top: this.pincher.top + 'px',
                })
            }).fadeIn(100);
        }, 100)
    }

    window.ImgViewer = ImgViewer;
}(window))