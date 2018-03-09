/*
	tools 是工具类 不需要传参数
	div 是 要挪动的 对象
*/

function move() {
  if (!arguments.length) {
    return false;
  }
  div = arguments[0];
  div.style.left = 0;
  
  var seed = setInterval(function() {
    div.style.left = parseInt(div.style.left) + 50 + 'px';
    if (parseInt(div.style.left) > 500) {
      clearInterval(seed);
    }
  }, 50)
}