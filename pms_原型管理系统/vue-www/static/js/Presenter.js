
import pd from 'predev'
import Scroller from 'Scroller'

class Presenter {
    constructor(init) {
        this.options = getOptions(init);
        this.container = this.getContainer();
        if (!this.container) return;
        this.scroller = new Scroller(this.container.parentNode);
        var page = {
            data: this.options.data,
            checked: this.options.checked,
        };
        this.next(page);
        this.outer = pd.id(this.options.id);
        this.setChecked(this.options.checked);
        var self = this;
        pd.ontap(function(name) {
            self.target = this;
            self.options.tapHandler.call(self, name);
        }, self.outer);
    }

    show() {
        pd.log.in(this.options.id);
        this.scroller.refresh();
    }

    toggle() { //只是aside可以用
        if (this.options.type !== 'aside') return;
        var state = this.outer.getAttribute('default');
        state = (state == 'false') ? true : false;
        sessionStorage.asideState = state;
        this.outer.setAttribute('default', state);
        this.scroller.refresh();
    };
    setChecked(checkId) {
        if (!checkId) return;
        if (pd.isArray(checkId)) {
            for (var i = checkId.length - 1; i >= 0; i--) {
                pd.find('label', checkId[i]).setAttribute('checked', true);
            }
        } else if (this.options.type == 'aside' ||
            this.options.type == 'radio-radio') {
            if (!checkId) return;
            pd.id(checkId).setAttribute('checked', true);
        } else {
            pd.find('label', checkId).setAttribute('checked', true);
        }
    };
    setData(data) {
        var tpl = '';
        var div = document.createElement('div');
        div.classList.add('shade-as-list');
        switch (this.options.type) {
            case 'radio':
                tpl = pd.compose(data, itemTpl.radio);
                break;
            case 'check':
                tpl = pd.compose(data, itemTpl.check);
                break;
            case 'check-check':
                tpl = pd.compose(data, itemTpl.multiCheck);
                div.classList.add('in-right');
                break;
            case 'radio-radio':
                tpl = pd.compose(data, itemTpl.multiRadio);
                div.classList.add('in-right');
                break;
            case 'input':
                tpl = pd.compose(data, itemTpl.input);
                break;
            case 'menu':
            case 'aside':
                tpl = pd.compose(data, itemTpl.href);
                break;
            case 'login':
                tpl = pd.compose(data, itemTpl.login);
                break;
            case 'confirm':
                tpl = pd.toHTML('');
                break;
            case 'flyout':
                tpl = this.options.template
                break;
        };
        if (this.options.type == 'confirm') return;
        div.appendChild(tpl);
        this.container.innerHTML = div.outerHTML;
        this.scroller.refresh();
        return;
    }

    previous() { //多级菜单可用
        if (this.pages.length > 1) this.pages.pop();
        else {
            pd.toast('没有更多了');
            return;
        }
        var curPage = this.pages[this.pages.length - 1];
        this.setData(curPage.data);
        this.setChecked(curPage.checked);
    }

    next(page) { //多级菜单可用
        if (!pd.isArray(this.pages)) this.pages = [];
        this.pages.push(page);
        this.setData(page.data);
        this.setChecked(page.checked);
        if (this.options.type.split('multi').length != 1) return;
        if (!pd.id('_back')) return;
        pd.id('_back').innerHTML = '';
    }

    getContainer() {
        var outer;
        var options = this.options;
        switch (options.type) {
            case 'check':
            case 'radio':
            case 'check-check':
            case 'radio-radio':
            case 'input':
            case 'flyout':
                outer = dialogTpl.common;
                document.body.appendChild(pd.compose(options, outer));
                break;
            case 'login':
            case 'menu':
                outer = dialogTpl.menu;
                document.body.appendChild(pd.compose(options, outer));
                break;
            case 'confirm':
                outer = dialogTpl.confirm;
                document.body.appendChild(pd.compose(options, outer));
                break;
            case 'aside':
                outer = dialogTpl.aside;
                pd.find('main').appendChild(pd.compose(options, outer));
                pd.id(options.id).setAttribute('default', sessionStorage.asideState);
                break;
            default:
                return;
        }
        return pd.find('section', options.id);
    }
}

var itemTpl = {
        check: `<li id='$id$'>
                <em>$name$</em>
                <pre>$description$</pre>
                <label type='switch' checked='$checked$' evnt='check'>
                    <svg version='1.1' viewBox='0 0 1408 1792' class='fa-icon'>
                        <path d='M1120 256h-832q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113v-832q0-66-47-113t-113-47zM1408 416v832q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h832q119 0 203.5 84.5t84.5 203.5z'></path>
                    </svg>
                    <svg version='1.1' viewBox='0 0 1664 1792' class='fa-icon'>
                        <path d='M1408 930v318q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h832q63 0 117 25 15 7 18 23 3 17-9 29l-49 49q-10 10-23 10-3 0-9-2-23-6-45-6h-832q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113v-254q0-13 9-22l64-64q10-10 23-10 6 0 12 3 20 8 20 29zM1639 441l-814 814q-24 24-57 24t-57-24l-430-430q-24-24-24-57t24-57l110-110q24-24 57-24t57 24l263 263 647-647q24-24 57-24t57 24l110 110q24 24 24 57t-24 57z'></path>
                    </svg>
                </label>
            </li>`,
        multiCheck: `<li id='$id$' class='blink-wave' evnt='next'>
                <label type='switch' checked='$checked$' evnt='check'>
                    <svg version='1.1' viewBox='0 0 1408 1792' class='fa-icon'>
                        <path d='M1120 256h-832q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113v-832q0-66-47-113t-113-47zM1408 416v832q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h832q119 0 203.5 84.5t84.5 203.5z'></path>
                    </svg>
                    <svg version='1.1' viewBox='0 0 1664 1792' class='fa-icon'>
                        <path d='M1408 930v318q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h832q63 0 117 25 15 7 18 23 3 17-9 29l-49 49q-10 10-23 10-3 0-9-2-23-6-45-6h-832q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113v-254q0-13 9-22l64-64q10-10 23-10 6 0 12 3 20 8 20 29zM1639 441l-814 814q-24 24-57 24t-57-24l-430-430q-24-24-24-57t24-57l110-110q24-24 57-24t57 24l263 263 647-647q24-24 57-24t57 24l110 110q24 24 24 57t-24 57z'></path>
                    </svg>
                </label>
                <em>$name$</em>
                <label>
                    <svg version='1.1' viewBox='0 0 640 1792' class='fa-icon'>
                        <path d='M595 960q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z'></path>
                    </svg>
                </label>
            </li>`,
        radio: `<li id='$id$'>
                <em>$name$</em>
                <pre>$description$</pre>
                <label type='switch' class='blink-wave' checked='$checked$' evnt='radio'>
                    <svg version='1.1' viewBox='0 0 1536 1792' class='fa-icon'><path d='M768 352q-148 0-273 73t-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273-73-273-198-198-273-73zM1536 896q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z'></path></svg>
                    <svg version='1.1' viewBox='0 0 1536 1792' class='fa-icon'><path d='M1024 896q0 106-75 181t-181 75-181-75-75-181 75-181 181-75 181 75 75 181zM768 352q-148 0-273 73t-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273-73-273-198-198-273-73zM1536 896q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z'></path></svg>
                </label>
            </li>`,
        multiRadio: `<li id='$id$' evnt='next' class='blink-wave'>
                <label type='switch' checked='$checked$' evnt='radio'>
                    <svg version='1.1' viewBox='0 0 1536 1792' class='fa-icon'><path d='M768 352q-148 0-273 73t-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273-73-273-198-198-273-73zM1536 896q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z'></path></svg>
                    <svg version='1.1' viewBox='0 0 1536 1792' class='fa-icon'><path d='M1024 896q0 106-75 181t-181 75-181-75-75-181 75-181 181-75 181 75 75 181zM768 352q-148 0-273 73t-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273-73-273-198-198-273-73zM1536 896q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z'></path></svg>
                </label>
                <em>$name$</em>
                <label>
                    <svg version='1.1' viewBox='0 0 640 1792' class='fa-icon'>
                        <path d='M595 960q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z'></path>
                    </svg>
                </label>
            </li>`,
        input: `<li type='input'>
                <input value='$value$' placeholder='$placeholder$'>
                <button type='icon' evnt='clear'>
                    <svg version="1.1" viewBox="0 0 1536 1792" class="fa-icon">
                        <path d="M1149 1122q0-26-19-45l-181-181 181-181q19-19 19-45 0-27-19-46l-90-90q-19-19-46-19-26 0-45 19l-181 181-181-181q-19-19-45-19-27 0-46 19l-90 90q-19 19-19 46 0 26 19 45l181 181-181 181q-19 19-19 45 0 27 19 46l90 90q19 19 46 19 26 0 45-19l181-181 181 181q19 19 45 19 27 0 46-19l90-90q19-19 19-46zM1536 896q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"></path>
                    </svg>
                </button>
            </li>`,
        href: `<li id='$id$' evnt='href' class='blink-wave' checked='$checked$'>
                <em>$name$</em><pre>$secondary$</pre>
                <label>
                    <svg version='1.1' viewBox='0 0 640 1792' class='fa-icon'>
                        <path d='M595 960q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z'></path>
                    </svg>
                </label>
            </li>`,
    },
    dialogTpl = {
        common: `<mask evnt='mask' id='$id$' clean='$clean$'>
                <dialog out='out-top' evnt='prevent'>
                    <header><li>
                        <label evnt='previous' id='_back'>
                            <svg version="1.1" viewBox="0 0 1280 1792" class="fa-icon"><path d="M1171 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path></svg>
                        </label>
                        <h1>$title$</h1>
                    </li></header>
                    <content>
                        <section class='shade-as-list'></section>
                    </content>
                    <footer><li>
                        <button type='half' evnt='mask'>取消</button><button type='half' evnt='submit'>确认</button>
                    </li></footer>
                </dialog>
            </mask>`,
        aside: `<aside id='$id$' out='out-left' class='in-left' evnt='prevent'>
                <header><li><em>系统列表</em></li></header>
                <content><section></section></content>
            </aside>`,
        menu: `<mask evnt='mask' id='$id$' clean='$clean$'>
                <dialog out='out-top' evnt='prevent'>
                    <header><li>
                        <h1>$title$</h1>
                        <button type='icon' evnt='mask'>取消</button>
                    </li></header>
                    <content>
                        <section class='shade-as-list'></section>
                    </content>
                </dialog>
            </mask>`,
        confirm: `<mask evnt='mask' id='$id$' clean='$clean$'>
                <dialog out='out-top' evnt='prevent' class='confirm'>
                <content><section>
                    <dl>
                        <dt><h1>$title$</h1></dt>
                        <dd><button res='fasle' type='neg' evnt='confirm'>取消</button></dd>
                        <dd><button res='true' type='neg' evnt='confirm'>确认</button></dd>
                    </dl>
                </section></content>
                </dialog>
            </mask>`,
    },
    getOptions = function(init) {
        var _default = {
            title: '请选择',
            checked: '',
            data: {},
            clean: true,
            tapHandler: tapHandler,
            onOut: function() {
                return
            },
            onNext: function() {
                return
            },
        };
        Object.assign(_default, init);
        _default.id = pd.randId(4);
        return _default;
    },
    tapHandler = function(name) {
        var res = null,
            target = this.target,
            options = this.options;
        switch (name) {
            case 'check':
                var flag = (target.getAttribute('checked') == 'true') ? false : true;
                target.setAttribute('checked', flag);
                break;
            case 'radio':
                var list = target.parentNode.parentNode;
                list = pd.findAll('label', list);
                for (var i = list.length - 1; i >= 0; i--) {
                    list[i].setAttribute('checked', false);
                }
                var flag = (target.getAttribute('checked') == 'true') ? false : true;
                target.setAttribute('checked', flag);
                if (options.type != 'radio-radio') break;
                var res = getSelection(this.outer);
                this.pages[this.pages.length - 1].checked = res.idArr;
                setTimeout(function() {
                    options.onNext(res.idArr[0]);
                }, 200);
                break;
            case 'clear':
                var input = pd.find('input', target.parentNode);
                input.value = '';
                break;
            case 'submit':
                if (options.type == 'radio' || options.type == 'check') {
                    var res = getSelection(this.outer);
                } else if (options.type == 'input') {
                    var res = pd.find('input', options.id).value;
                }
                options.onOut(res);
                pd.log.pop();
                break;
            case 'confirm':
                res = (target.getAttribute('res') == 'true') ? true : false;
                options.onOut(res);
                pd.log.pop();
                break;
            case 'href':
                res = target.id;
                options.onOut(res);
                pd.log.pop();
                break;
            case 'mask':
                pd.log.pop();
                break;
            case 'next':
                if (pd.find('label', target).getAttribute('checked') == 'true') return;
                var res = getSelection(this.outer);
                this.pages[this.pages.length - 1].checked = res.idArr;
                this.next(this.pages[this.pages.length - 1]);
                this.options.onNext(target.id);
                break;
            case 'previous':
                this.previous();
                break;
            default:
                return;
        }
    },
    getSelection = function(outer) {
        var labels = pd.findAll('label', outer);
        var txtArr = [],
            idArr = [],
            id, em;
        for (var i = labels.length - 1; i >= 0; i--) {
            if (labels[i].getAttribute('checked') == 'true') {
                id = labels[i].parentNode.id;
                em = pd.find('em', labels[i].parentNode).innerHTML;
                idArr.push(id);
                txtArr.push(em);
            };
        }
        return { idArr: idArr, txtArr: txtArr };
    };

export default Presenter
