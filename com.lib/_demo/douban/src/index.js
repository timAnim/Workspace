//防抖
function debounce(func, wait, immediate) {      
    var timer = null; 
    var debounced = function () {
        var _this = this;
        var argu = arguments;
        clearTimeout(timer);
        if(immediate) {
            if(!timer) func.apply(_this, argu);
            timer = setTimeout(function () {
                timer = null;
            }, wait) 
        }else {
            timer = setTimeout(function () {
                func.apply(_this, argu);
            }, wait)
        }
    }
    debounced.cancel = function () {
        clearTimeout(timer);
        timer = null;
    }
    return debounced;
}
$('#inp-query').on('input', function () {
    var value = this.value;
    $.ajax({
        type: 'GET',
        url: 'https://api.douban.com/v2/music/search',
        // url: 'http://localhost/web/douban/src/data/data.txt',
        data: 'q=' + value + '&count=7',
        dataType: 'jsonp',
        success: addData
    })
})
// 添加搜索到的音乐
function addData(data) {
    console.log(data);
    var data = data.musics;
    var str = '', 
        len = data.length;
    data.forEach(function (ele, index) {
        str += '<li>\
                    <a href="https://music.douban.com/subject/'+ele.id+'/">\
                        <img src="'+ele.image+'" width="40">\
                        <div>\
                            <em>'+ele.title+'</em>\
                            <p>'+ ele.author[0].name+'</p>\
                        </div>\
                    </a>\
                </li>';
    })
    $('#search_suggest ul').html(str);
}