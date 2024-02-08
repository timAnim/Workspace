 (function(window) {
     function Pincher(opt) {
         this.outer = opt.outer;
         this.scale = this.initScale = opt.initScale;
         this.opt = opt;
         this.init();
     }

     Pincher.prototype = {
         init() {
             this.outer.addEvent('click', ev => {
                 this.onTap.call(this, ev)
             });

             this.outer.addEvent('wheel', ev => {
                 this.onScroll.call(this, ev)
             });

             this.outer.addEvent('mousewheel', ev => {
                 this.onScroll.call(this, ev)
             });

             this.outer.addEvent('DOMMouseScroll', ev => {
                 this.onScroll.call(this, ev)
             });

             this.outer.addEvent('touchstart', ev => {
                 this.dispatcher.call(this, ev)
             });

             this.outer.addEvent('touchmove', ev => {
                 if (this.isPinch) {
                     this.onPinch.call(this, ev)
                 } else if (this.isPan) {
                     this.onPan.call(this, ev)
                 }
             });

             this.outer.addEvent('touchend', ev => {
                 if (this.isPinch) {
                     this.isPinch = false;
                     this.onPinchEnd.call(this, ev)
                 } else if (this.isPan) {
                     this.isPan = false;
                     this.onPanEnd.call(this, ev)
                 }
             });
         },
         dispatcher(ev) {
             this.list = ev.touchList || ev.touches;

             if (this.list && this.list.length === 2) {
                 this.initDistance = this.getDistance(this.list[0], this.list[1]);

                 this.isPinch = true;
                 if (this.opt.onPinchStart) {
                     this.opt.onPinchStart.call(this, this.list);
                 }

             } else if (this.list && this.list.length === 1) {
                 this.isPan = true;
                 if (this.opt.onPanStart) {
                     this.opt.onPanStart.call(this, ev)
                 }
             }
         },
         onPan(ev) {
             if (this.opt.onPan) {
                 this.opt.onPan.call(this, ev);
             }
         },
         onPanEnd(ev) {
             if (this.opt.onPanEnd) {
                 this.opt.onPanEnd.call(this, ev);
             }
         },
         onPinch(ev) {
             this.list = ev.touchList || ev.touches;
             this.distance = this.getDistance(this.list[0], this.list[1]);
             this.scale = this.distance / this.initDistance * this.initScale;

             if (this.opt.onPinch) {
                 this.opt.onPinch.call(this, this.scale)
             }
         },
         onPinchEnd(ev) {
             this.initScale = this.scale

             if (this.opt.onPinchEnd) {
                 this.opt.onPinchEnd.call(this, ev)
             }
         },
         onScroll(ev) {
             if ('deltaY' in ev) {
                 if (ev.deltaMode === 1) {
                     wheelDeltaY = -ev.deltaY * 20;
                 } else {
                     wheelDeltaY = -ev.deltaY;
                 }
             } else if ('wheelDeltaY' in ev) {
                 wheelDeltaY = ev.wheelDeltaY / 120 * 20;
             } else if ('wheelDelta' in ev) {
                 wheelDeltaY = ev.wheelDelta / 120 * 20;
             } else if ('detail' in ev) {
                 wheelDeltaY = -ev.detail / 3 * 20;
             } else {
                 return;
             }
             if (this.opt.onScroll) {
                 this.opt.onScroll.call(this, wheelDeltaY, ev);
             }
         },
         onTap: function(ev) {
             if (this.opt.onTap) this.opt.onTap(ev);
         },
         getDistance: (a, b) => {
             var x = Math.pow((a.clientX - b.clientX), 2);
             var y = Math.pow((a.clientY - b.clientY), 2);
             return Math.sqrt(x, y);
         },
     }

     window.Pincher = Pincher
 }(window))