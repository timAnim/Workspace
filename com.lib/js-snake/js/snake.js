(function(window) {
    var con = document.getElementById('container'),
        startBtn = document.getElementById('start-btn'),
        step = 20, // 格子大小
        col = 20,
        row = 20,
        height = step * row, // 高度 = 格子的大小 x 行数
        width = step * col,
        food = [], // 食物的坐标
        direct = 4, // 方向 : // 2 上 4 右 6 下 8 左
        snake = [
            [0, 0]
        ], // 蛇: x y 
        seed, //clearInterval
        speed = 200; // 速度 clearInterval 里面的time
        
    function init() {
        con.style.height = height + 'px';
        con.style.width = width + 'px';

        var frag = document.createDocumentFragment(),
            div,
            span;

        for (var r = 0; r < row; r++) {
            div = document.createElement('div');
            div.className = 'row';
            for (var c = 0; c < col; c++) {
                span = document.createElement('span');
                span.className = 'cell';
                span.id = c + '-' + r;
                div.appendChild(span);
            }
            frag.appendChild(div);
        }

        con.appendChild(frag);

        startBtn.onclick = function() {
            startBtn.style.display = 'none';
            refresh();
            moveSnake();
            genFood();
        }

        document.onkeydown = function(event) {
            var e = event || window.event;
            if (e && e.keyCode == 37 && direct !== 4) { // left
                direct = 8;
            } else if (e && e.keyCode == 38 && direct !== 6) { // up
                direct = 2;
            } else if (e && e.keyCode == 39 && direct !== 8) { // right
                direct = 4;
            } else if (e && e.keyCode == 40 && direct !== 2) { //down
                direct = 6;
            }
        };
    }

    function grow(end) {
        document.getElementById(food.join('-')).classList.remove('food');
        snake.push(end);
        speedUp()
        genFood();
    }

    function speedUp() {
        clearInterval(seed);
        speed -= 15;
        moveSnake();
    }

    function moveSnake() {
        seed = setInterval(() => {
            var end = JSON.parse(JSON.stringify(snake[snake.length - 1])); //拷贝最后一个,备用

            for (var i = snake.length - 1; i > 0; i--) {
                snake[i][0] = snake[i - 1][0];
                snake[i][1] = snake[i - 1][1];
            }

            switch (direct) {
                case 2:
                    snake[0][1]--;
                    break;
                case 4:
                    snake[0][0]++;
                    break;
                case 6:
                    snake[0][1]++;
                    break;
                case 8:
                    snake[0][0]--;
                    break;
            }
            if (snake[0][0] === food[0] && snake[0][1] === food[1]) {
                grow(end); // 撞到食物把备份放到最后
            }
            if (snake[0][0] < 0 || snake[0][1] < 0 || snake[0][0] > col || snake[0][1] > row) {
                return gameOver() // 出边界就挂
            }
            if (isBody(snake[0][0], snake[0][1]) > 1) {
                return gameOver() // 撞到自己身上就挂
            }
            render();
        }, speed);
    }

    function render() {
        var mark;
        for (var r = 0; r < row; r++) {
            for (var c = 0; c < col; c++) {
                mark = isBody(c, r) ? 'mark' : '';
                document.getElementById(c + '-' + r).setAttribute('mark', mark);
            }
        }
    }

    function refresh() {
        if (food.length) {
            document.getElementById(food.join('-')).classList.remove('food');
        }
        var cells = document.getElementsByClassName('cell');
        for (var i = cells.length - 1; i >= 0; i--) {
            cells[i].removeAttribute('mark');
        }
        direct = 4;
        snake = [
            [0, 0, 4] // 2 上 4 右 6 下 8 左
        ];
        speed = 200;
    }

    function gameOver() {
        clearInterval(seed);
        startBtn.style.display = 'block';
    }

    function isBody(c, r) {
        var flag = 0;
        for (var i = snake.length - 1; i >= 0; i--) {
            if (snake[i][0] === c && snake[i][1] === r) {
                flag++;
            }
        }
        return flag;
    }

    function genFood() {
        function getPos() {
            var x = Math.floor(Math.random() * col);
            var y = Math.floor(Math.random() * row);
            if (isBody(x, y)) { // 可能产生的食物在蛇身上
                getPos()
            }
            return [x, y];
        }
        food = getPos();
        document.getElementById(food.join('-')).classList.add('food');
    }

    init();

}(window))