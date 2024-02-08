import Vue from "vue";
import App from "./App";

global.wxapp = 'http://10.27.7.58:3000'

import router from "./router";
Vue.use(router);

import vueResource from "vue-resource";
Vue.use(vueResource);

import pd from "../static/js/predev.js";
Vue.prototype.$pd = pd;

import "vue-awesome/icons";
import Icon from "vue-awesome/components/Icon";
Vue.component("icon", Icon);

import Navbar from "@/components/_common/nav-bar";
Vue.component("nav-bar", Navbar);

import Toast from "@/components/_common/toast";
Vue.component("toast", Toast);

import Confirm from "@/components/_common/confirm-dlg";
Vue.component("confirm-dlg", Confirm);

import Flyout from "@/components/_common/flyout";
Vue.component("flyout", Flyout);

import InputText from "@/components/_common/input-text";
Vue.component("input-text", InputText);

import InputDate from "@/components/_common/input-date";
Vue.component("input-date", InputDate);

import Search from "@/components/_common/search-bar";
Vue.component("search", Search);

import Presenter from "@/components/_common/presenter";
Vue.component("presenter", Presenter);

import Aside from "@/components/_common/aside-bar";
Vue.component("aside-bar", Aside);

import Headbar from "@/components/_common/head-bar";
Vue.component("head-bar", Headbar);

import Pagebar from "@/components/_common/page-bar";
Vue.component("page-bar", Pagebar);

import Upload from "@/components/_common/file-upload";
Vue.component("upload", Upload);

import Loading from "@/components/_common/loading";
Vue.component("loading", Loading);

import imgViewer from "@/components/_common/img-viewer";
Vue.component("img-viewer", imgViewer);

import AppLayout from "@/components/_common/app-layout";
Vue.component("app-layout", AppLayout);

import PageLayout from "@/components/_common/page-layout";
Vue.component("page-layout", PageLayout);

import Dropdown from "@/components/_common/dropdown";
Vue.component("dropdown", Dropdown);

import "@/assets/less/paratag.less";
import { Store } from "vuex";

Vue.config.productionTip = false;


Vue.http.interceptors.push(function(req, next) {
    const url = ""
    req.url = `${url}${req.url}`
    if (Store.token) {
        req.headers.set("token", `${Store.token}`)
    }

    next(res => {
        return res
    })
})


new Vue({
    el: "#app",
    router,
    template: "<App/>",
    components: {
        App
    }
});

// import io from 'socket.io-client'
// import notify from "@/assets/js/notify.js";
// console.log(process.env.WS_URL)
// // //连接socket后端服务器
// var socket = io.connect(process.env.WS_URL);
// socket.on('message', function(obj) {
//   notify.show('UED的工作平台', obj.code + '发生变更', null, obj.url)
// })