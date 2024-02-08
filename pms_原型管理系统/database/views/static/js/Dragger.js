//isM是否是移动设备 
//data初始化
//res 拖拽源
//enterObj 
//overObj 
//indi 
// let pd = window.pd
var Dragger = {
  origin: { x: 0, y: 0 },
  boundery: [0, 0, 0, 0],
  init: function(data) {
    this.onStart = data.onStart || function() { return };
    this.onDrag = data.onDrag || function() { return };
    this.onLeave = data.onLeave || function() { return };
    this.onMove = data.onMove || function() { return };
    this.onEnter = data.onEnter || function() { return };
    this.onDrop = data.onDrop || function() { return };
    this.onEnd = data.onEnd || function() { return };
    this.dropEles = [];
    this.outer = data.outer;
    var self = this
    for (var i = data.eles.length - 1; i >= 0; i--) {
      data.eles[i].setAttribute('draggable',true)
      this.dropEles.push(data.eles[i])
      data.eles[i].addEventListener('dragstart',self.dragStart)
      data.eles[i].addEventListener('drag',self.dragMove)
      data.eles[i].addEventListener('dragend',self.dragEnd)
    }
  },
  dragStart: function(ev) {
    Dragger.res = ev.target;
    Dragger.origin.x = ev.clientX;
    Dragger.origin.y = ev.clientY;
    Dragger.boundery = [
      Dragger.outer.getBoundingClientRect().top,
      Dragger.outer.getBoundingClientRect().right,
      Dragger.outer.getBoundingClientRect().bottom,
      Dragger.outer.getBoundingClientRect().left
    ];
    if (Dragger.res) Dragger.onStart(Dragger.res);
  },
  dragMove: function(ev) {
    ev.preventDefault();
    var boundL, boundT, boundR, boundB,
      posX = ev.clientX,
      posY = ev.clientY,
      isentered = false,
      isnew = false,
      dropEles = Dragger.dropEles;

    var top = Dragger.outer.scrollTop;
    var left = Dragger.outer.scrollLeft;
    if (posY <= (Dragger.boundery[0] + 10)) {
      top -= 10;
      Dragger.outer.scrollTop = +top;
    } else if (posY >= (Dragger.boundery[2] - 10)) {
      top += 10;
      Dragger.outer.scrollTop = +top;
    }

    if (posX <= (Dragger.boundery[3] + 10)) {
      left -= 10;
      Dragger.outer.scrollLeft = +left;
    } else if (posX >= (Dragger.boundery[1] - 10)) {
      left += 10;
      Dragger.outer.scrollLeft = +left;
    }

    for (var n = dropEles.length - 1; n >= 0; n--) {
      boundL = dropEles[n].getBoundingClientRect().left;
      boundT = dropEles[n].getBoundingClientRect().top;
      boundR = dropEles[n].getBoundingClientRect().right;
      boundB = dropEles[n].getBoundingClientRect().bottom;
      if (posX < boundR && posX > boundL && posY > boundT && posY < boundB) {
        isentered = true;
        Dragger.overObj = dropEles[n];
        if (Dragger.enterObj != Dragger.overObj) isnew = true;
      }
    }
    if (isentered) {
      if (isnew) {
        Dragger.onEnter(Dragger.overObj);
        if (Dragger.enterObj) {
          Dragger.onLeave(Dragger.enterObj);
        }
      }
      Dragger.enterObj = Dragger.overObj;
       Dragger.onMove(Dragger.overObj, ev);
    } else {
      if (Dragger.enterObj) {
        Dragger.onLeave(Dragger.enterObj);
      }
      Dragger.overObj = null;
    }
  },
  dragEnd: function(ev) {
    if (Dragger.enterObj) {
      Dragger.onDrop(Dragger.res, Dragger.enterObj);
    }
    if (Dragger.res) {
      Dragger.onEnd(Dragger.res);
    }
    Dragger.dragCancel();
  },
  dragCancel: function(ev) {
    Dragger.res = null;
    Dragger.overObj = Dragger.enterObj = null;
  },
};

export default Dragger