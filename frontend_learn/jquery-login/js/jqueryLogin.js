    var lock = false;
    $('#login-dlg').on('click', function(e) {
        if (!lock) {
            var dlg =
                '<div class="mask">\
              <div class="dialog">\
              <header>\
                  <img src="./img/loginlogo.png"><span class="h2">用户名密码登录</span>\
              </header>\
              <form class="content" action="#">\
                  <input class="input" type="text" name="username" placeholder="手机/邮箱/用户名">\
                  <input class="input" type="password" name="password" placeholder="密码">\
                  <p style="margin-bottom: 0.08rem;">\
                      <input type="checkbox" name="autologin">\
                      <label for="autologin">下次自动登录</label>\
                  </p>\
                  <button class="login-btn" type="submit">登录</button>\
                  <p>\
                      <a href="javascript:void(0)">忘记密码?</a>\
                      <a href="javascript:void(0)">短信快捷登录</a>\
                  </p>\
              </form>\
              <footer>\
                  <span>扫码登录</span>\
                  <span class="split"></span>\
                  <span><i class="fa fa-qq"></i></span>\
                  <span><i class="fa fa-weibo"></i></span>\
                  <span>立即注册</span>\
              </footer>\
              <button id="close-btn"><i class="fa fa-times"></i></button>\
            </div>\
          </div>';
            $(dlg).appendTo($('body')).fadeIn();
            $('#close-btn').on('click', function(e) {
                $('.mask').fadeOut();
            })
            lock = true;
        } else {
            $('.mask').fadeIn();
        }
    })