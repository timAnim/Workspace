(function(window) {
    String.prototype.temp = function(obj) { //填充数据
        return this.replace(/\$\w+\$/gi, function(matchs) {
            var returns = obj[matchs.replace(/\$/g, "")];
            return (returns + "") == "undefined" ? "" : returns;
        });
    };

    HTMLElement.prototype.addEvent = function(type, fn, capture) {
        if (window.addEventListener) {
            this.addEventListener(type, fn, capture || false);

        } else if (window.attachEvent) {
            this.attachEvent("on" + type, function(e) {
                fn.call(this, e);
            });
        }
    };
    var util = {
        render: function(data, template) {
            var str = '';
            data.forEach(item => {
                str += template.temp(item);
            })
            return str;
        },
        html: function(text) {
            var i, a = document.createElement("div"),
                b = document.createDocumentFragment();
            a.innerHTML = text;
            while (i = a.firstChild) { b.appendChild(i); }
            return b;
        },
        target: function(ev) {
            var target = ev.target || window.event;
            while (!target.id) {
                target = target.parentNode;
            }
            return target;
        },
        randId: function(n) {
            var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'b', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
                res = "";
            for (var i = 0; i < n; i++) {
                var id = Math.ceil(Math.random() * 35);
                res += chars[id];
            }
            return res;
        },
        getStyle(dom, prop) {
            if (window.getComputedStyle) {
                return window.getComputedStyle(dom, null)[prop];
            } else {
                return dom.currentStyle[prop];
            }
        }
    };
    window.util = util;
}(window));

(function(style) {
    var sheet = document.createElement('style');
    document.head.insertBefore(sheet, document.head.children[0]);
    sheet = document.styleSheets[0];

    function addCSS(sheet, selector, rules) {
        if (navigator.userAgent.indexOf("Firefox") > 0) {
            sheet.insertRule(selector + "{" + rules + "}", sheet.cssRules.length);
        } else if ("insertRule" in sheet) {
            try {
                sheet.insertRule(selector + "{" + rules + "}", sheet.rules.length);
            } catch (e) {
                sheet.insertRule(selector + "{" + rules + "}", sheet.cssRules.length);
            }
        } else if ("addRule" in sheet) {
            sheet.addRule(selector, rules, sheet.rules.length);
        }
    }

    for (var item in style) {
        addCSS(sheet, item, style[item])
    }
}({
    "*": "padding: 0; margin: 0; ",
    "button": "border:none; cursor:pointer",
    "html": "font-size:625%; height: 100%;",
    "body": "height: 100%; font-family: 'Microsoft YaHei'; font-size: 0.14rem;",
    ".lay-h": "width:100%; display: flex; flex-flow: row nowrap;",
    ".lay-v": 'height: 100%; display: flex; flex-flow: column nowrap;',
    ".float-nw": 'position: absolute; left: 0; top: 0;',
    ".float-se": 'position: absolute; bottom: 0; right: 0;',
    ".float-ne": 'position: absolute; top: 0; right: 0;',
    ".float-sw": 'position: absolute; bottom: 0;left: 0;',
    ".pd-xs": 'padding: 0.04rem;',
    ".pd-s": 'padding: 0.08rem;',
    ".pd-s-v": 'padding: 0.08rem 0;',
    ".pd-s-h": 'padding: 0 0.08rem;',
    ".pd-m": 'padding: 0.16rem;',
    ".pd-m-v": 'padding: 0.16rem 0;',
    ".pd-m-h": 'padding: 0 0.16rem;',
    ".bg-white": 'background-color: white',
    ".bg-black": 'background-color: black;',
    ".bg-mask": 'background-color: rgba(0,0,0,0.8); z-index:10;',
    ".bg-50": 'background-color: #fafafa',
    ".bg-100": 'background-color: #f5f5f5',
    ".bg-200": 'background-color: #eee',
    ".bg-400": 'background-color: #bdbdbd',
    ".bg-alert": 'background-color: #ff9800',
    ".cl-white": 'color: white;',
    ".cl-black": 'color: black;',
    ".cl-theme": 'color: #8bc34a;',
    ".cl-primary": 'color: #616161;',
    ".cl-secondary": 'color: #9e9e9e;',
    ".cl-light": 'color: #757575;',
    ".cl-disable": 'color: #bdbdbd;',
    ".cl-line": 'color: #e0e0e0;',
    ".cl-alert": 'color: #ff9800;',
    ".radius-s": 'border-radius: 0.02rem;',
    ".radius-m": 'border-radius: 0.04rem;',
    ".radius-l": 'border-radius: 0.20rem;',
    ".fs-xl": 'font-size: 0.25rem;',
    ".fs-l": 'font-size: 0.16rem;',
    ".fs-m": 'font-size: 0.14rem;',
    ".fs-s": 'font-size: 0.12rem;',
    ".fs-xs": 'font-size: 0.1rem;',
    ".sd-list>*": 'border-bottom: 1px solid rgba(1, 1, 1, 0.1);',
    ".sd-list>*:last-child": 'border-bottom: none;',
    ".sd-card": 'box-shadow: 0 0 1px #bdbdbd; overflow: hidden;',
    ".sd-cut": 'border: 1px solid #e0e0e0; overflow: hidden;',
    ".theme-mark": 'background-color: #8bc34a;color: white; fill:white;',
    ".theme-dark": 'background-color: #616161; color: white;',
    ".align-c": 'text-align: center;',
    ".align-l": 'text-align: left;',
    ".align-r": 'text-align: right;',
    ".align-v": 'display: table;',
    ".align-v>*": 'display: table-cell; vertical-align: middle;',
    ".wd-max": 'width: 100%;',
    ".wd-page": 'width: 7.67rem;',
    ".wd-xxl": 'width: 3.6rem;',
    ".wd-xl": 'width: 2rem;',
    ".wd-l": 'width: 1.2rem; display: inline-block;',
    ".wd-xs": 'width: 0.08rem; display: inline-block;',
    ".wd-s": 'width: 0.32rem; display: inline-block;',
    ".wd-m": 'width: 0.4rem; display: inline-block;',
    ".ht-xxs": 'height: 0.24rem; line-height: 0.24rem;',
    ".ht-xs": 'height: 0.28rem; line-height: 0.28rem;',
    ".ht-s": 'height: 0.32rem; line-height: 0.32rem;',
    ".ht-m": 'height: 0.4rem; line-height: 0.4rem;',
    ".ht-l": 'height: 0.48rem; line-height: 0.48rem;',
    ".ht-xl": 'height: 0.56rem;',
    ".ht-dialog": 'height: 2.8rem;',
    ".ht-max": 'height: 100%;',
}))