  (function(window) {
    var cols = 9,
      rows = 9,
      mineSum = 9,
      martrix = [],
      timer = 0,
      seed = 0,
      flagNum = 0,
      container = document.getElementById('container'),
      flags = [],
      cells = [];

    // 放雷
    function initMine(cols, rows) {

      // 每个格子出现雷的概率 mineExist / cellExist
      function randomMine(mineExist, cellExist) {
        var rate = mineExist / cellExist;
        var ret = Math.random() < rate;
        return ret;
      }

      var mineExist = mineSum,
        cellSum = cols * rows,
        cellExist = cellSum;

      for (var c = cols - 1; c >= 0; c--) {
        martrix[c] = [];
        for (var r = rows - 1; r >= 0; r--) {
          if (!mineExist) {
            martrix[c][r] = false;
          } else {
            martrix[c][r] = randomMine(mineExist, cellExist);
            if (martrix[c][r]) {
              // 把正确答案存起来
              flags.push('martrix-' + c + '-' + r);
              mineExist--;
            }
          }
          cellExist--;
        }
      }

      document.getElementById('mine-sum').innerText = mineSum;
    }

    // 初始化格数字
    function initNum() {
      var neighbors;

      function countMine(_neighbors) {
        var count = 0;
        for (var i = _neighbors.length - 1; i >= 0; i--) {
          if (_neighbors[i] === true) {
            count++;
          }
        }
        return count;
      }

      for (var c = cols - 1; c >= 0; c--) {
        for (var r = rows - 1; r >= 0; r--) {
          neighbors = []; // 算之前先重置 
          if (martrix[c][r] === false) { //没有雷算数字
            // 放的顺序 左上开始 顺时针
            neighbors.push(checkExist(c - 1, r - 1));
            neighbors.push(checkExist(c, r - 1));
            neighbors.push(checkExist(c + 1, r - 1));
            neighbors.push(checkExist(c + 1, r));
            neighbors.push(checkExist(c + 1, r + 1));
            neighbors.push(checkExist(c, r + 1));
            neighbors.push(checkExist(c - 1, r + 1));
            neighbors.push(checkExist(c - 1, r));
            martrix[c][r] = countMine(neighbors);
          }
        }
      }
    }

    // 初始化方格
    function initCell() {
      var frag = document.createDocumentFragment();

      for (var r = 0; r < rows; r++) {
        var div = document.createElement('div');
        div.classList.add('row');
        for (var c = 0; c < cols; c++) {
          var span = document.createElement('span');
          span.classList.add('cell');
          span.id = 'martrix-' + c + '-' + r;
          div.appendChild(span);
        }
        frag.appendChild(div);
      }
      container.appendChild(frag);
      cells = document.getElementsByClassName('cell');
    }

    // 事件
    function initEvent() {
      var combineClick = { // 左右键同时按下的状况
          left: 0,
          right: 0,
        },
        stamp,
        gap;
      document.oncontextmenu = function() {
        return false;
      }

      container.addEventListener('mousedown', function(e) {

        stamp = Date.parse(new Date); // 记录时间
        gap = stamp - combineClick.last // 比较时间间隔

        // 记录左右键是不是点下去了
        if (e.button === 0) {
          combineClick.left = 1;
        } else if (e.button === 2) {
          combineClick.right = 1;
        }

        var combineLock = setTimeout(function() {
          if (combineClick.left * combineClick.right && gap < 150) {
            combineHdl(e);
          } else {
            clickHdl(e);
          }
          combineClick.left = 0;
          combineClick.right = 0;
          clearTimeout(combineLock);
        }, 150);

        combineClick.last = stamp;
      }, false);
    }

    // 计时器
    function initTimer() {
      var clock = document.getElementById('timer');
      clock.innerText = 0;
      timer = 0;
      seed = setInterval(function() {
        timer++;
        clock.innerText = timer;
      }, 1000)
    }

    // 全局点击事件
    function clickHdl(e) {
      var target = e.target;
      e.preventDefault();

      switch (target.id) {
        case 'start-btn':
        case 'restart-btn':
        case 'congratulate-btn':
          start(target.id);
          break;
        default:
          // 如果已经点开了，或者不是cell 就退出来
          if (target.classList.contains('opened') || !target.classList.contains('cell')) {
            return false
          }
          // 处理左键点击
          if (e.button === 0) {
            openCell(target);
            // 处理右键点击
          } else if (e.button == 2) {
            var state = target.getAttribute('state');
            if (!state) {
              flagNum++;
              target.setAttribute('state', 'flag');
              document.getElementById('flag-num').innerText = flagNum;
            } else if (state === 'flag') {

              target.setAttribute('state', 'query');
            } else {
              target.removeAttribute('state');
            }
          }
          checkFinal();
          return false;
      }
    }

    // 同按左右键 快捷操作
    function combineHdl(e) {
      //  1. 数字和旗子相等，打开所有没open的
      //  2. 数字和没开的格子相等，插旗子 
      e.preventDefault();
      var target = e.target;

      var c_r = target.id.split('-');
      var c = parseInt(c_r[1]);
      var r = parseInt(c_r[2]);
      var count = { //统计用的
        opened: [],
        closed: [],
        flag: [],
        sum: [],
      };

      // 返回格子周围的统计
      function checkState(c, r) {
        if (r >= 0 && c >= 0 && r < rows && c < cols) {
          var ele = document.getElementById('martrix-' + c + '-' + r);
          count.sum.push(ele);
          if (ele.classList.contains('opened')) {
            count.opened.push(ele);
          }
          if (ele.getAttribute('state') === 'flag') {
            count.flag.push(ele)
          }
          if (ele.getAttribute('state') === null) {
            count.closed.push(ele)
          }
          return true
        } else {
          return false;
        }
      }

      // 如果没点开了，就退出来
      if (!target.classList.contains('opened')) {
        return false
      }

      var neighbors = [];
      neighbors.push(checkState(c - 1, r - 1));
      neighbors.push(checkState(c, r - 1));
      neighbors.push(checkState(c + 1, r - 1));
      neighbors.push(checkState(c + 1, r));
      neighbors.push(checkState(c + 1, r + 1));
      neighbors.push(checkState(c, r + 1));
      neighbors.push(checkState(c - 1, r + 1));
      neighbors.push(checkState(c - 1, r));

      // 自动插旗
      var unopend = count.sum.length - count.opened.length;
      if (parseInt(target.getAttribute('state')) === unopend) {
        var arr = count.closed
        for (var i = arr.length - 1; i >= 0; i--) {
          arr[i].setAttribute('state', 'flag');
          flagNum++;
        }
      }

      // 自动打开
      if (parseInt(target.getAttribute('state')) === count.flag.length) {
        var arr = count.sum
        for (var i = arr.length - 1; i >= 0; i--) {
          openCell(arr[i]);
        }
      }

      checkFinal();
    }

    // 打开格子
    function openCell(target) {
      // 如果已经插旗，防止误触
      if (target.getAttribute('state') !== 'flag') {
        var c_r = target.id.split('-');
        target.classList.add('opened');
        target.setAttribute('state', martrix[c_r[1]][c_r[2]]);

        if (martrix[c_r[1]][c_r[2]] === true) {
          return gameOver();
        }

        // 如果是0 就递归下
        if (martrix[c_r[1]][c_r[2]] === 0) {
          spread(c_r[1], c_r[2]);
        }
      }
    }

    // 检验效格子
    function checkExist(c, r) {
      if (r >= 0 && c >= 0 && r < rows && c < cols) {
        return martrix[c][r];
      } else {
        return null;
      }
    }

    // 扩散 翻开0的时候
    function spread(x, y) {
      x = parseInt(x);
      y = parseInt(y);
      // 对于是0的周围进行遍历
      var neighbors = [], // 算之前先重置 
        ele,
        id;

      function checkExist(c, r) {
        if (r >= 0 && c >= 0 && r < rows && c < cols) {
          return {
            col: c,
            row: r,
            value: martrix[c][r]
          }
        } else {
          return null;
        }
      }
      // 相邻的放数组里
      neighbors.push(checkExist(x - 1, y - 1));
      neighbors.push(checkExist(x, y - 1));
      neighbors.push(checkExist(x + 1, y - 1));
      neighbors.push(checkExist(x + 1, y));
      neighbors.push(checkExist(x + 1, y + 1));
      neighbors.push(checkExist(x, y + 1));
      neighbors.push(checkExist(x - 1, y + 1));
      neighbors.push(checkExist(x - 1, y));

      // 对新打开的进行遍历
      for (var i = neighbors.length - 1; i >= 0; i--) {

        if (neighbors[i] !== null) { //如果不为空就处理
          // 找到cell
          id = 'martrix-' + neighbors[i].col + '-' + neighbors[i].row;
          ele = document.getElementById(id);

          // 如果方格没开开过，就处理cell
          if (!ele.classList.contains('opened')) {
            ele.classList.add('opened');
            ele.setAttribute('state', neighbors[i].value);

            // 如果新打开的这些里面还有0 则递归
            if (neighbors[i].value === 0) {
              spread(neighbors[i].col, neighbors[i].row);
            }
          }
        }
      }
    }

    // 开局
    function start(id) {
      document.getElementsByClassName('start')[0].style.display = 'none';
      document.getElementsByClassName('game-over')[0].style.display = 'none';
      document.getElementsByClassName('congratulate')[0].style.display = 'none';
      refresh();
      initMine(cols, rows);
      initNum();
      return false;
    }

    // 胜利
    function congratulate() {
      clearInterval(seed);
      document.getElementsByClassName('congratulate')[0].style.display = 'block';
    }

    // 死翘翘
    function gameOver() {
      clearInterval(seed);
      document.getElementsByClassName('game-over')[0].style.display = 'block';
    }

    // 重新开局
    function refresh() {
      martrix = [];
      flagNum = 0;
      initTimer();
      for (var r = 0; r < cells.length; r++) {
        cells[r].removeAttribute('state');
        cells[r].classList.remove('opened');
      }
      document.getElementById('flag-num').innerText = 0;
      document.getElementById('mine-sum').innerText = 0;
    }

    // 结束的条件 
    function checkFinal() {
      // 1 所有雷都插旗了，旗子的数量等于雷的数
      // 2 所有不是雷的都opend了
      // 3 没有插错的旗子

      var sum = cols * rows,
        notMine = sum - mineSum,
        opened = [],
        _flag = [];

      for (var i = cells.length - 1; i >= 0; i--) {
        if (cells[i].classList.contains('opened')) {
          opened.push(cells[i])
        }

        if (cells[i].getAttribute('state') === 'flag') {
          _flag.push(cells[i])
        }
      }

      if (opened.length === notMine || flagNum === mineSum) {
        if (failNum() === 0) { //如果旗子错了不能赢
          congratulate();
        }
      }
      // 检验旗子插错的数量
      function failNum() {
        var fails = 0;
        for (var i = _flag.length - 1; i >= 0; i--) {
          if (flags.indexOf(_flag[i].id) === -1) {
            fails++;
          }
        }
        return fails;
      }
    }

    initCell();
    initEvent();

  }(window))