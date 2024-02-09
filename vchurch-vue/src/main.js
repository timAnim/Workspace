// The Vue build version to load with the `import` command
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
Vue.use(VueResource);

import { Loading, Notification, Steps, Step, Button } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.prototype.$loading = Loading.service;
Vue.prototype.$notify = Notification;
Vue.use(Steps);
Vue.use(Step);
Vue.use(Button);


import vuex from 'vuex'
Vue.use(vuex);

var store = new vuex.Store({ //store对象
  state: {
    cur: 'input',
    inp: require('../static/js/example'),
   	worship: null,
    distPath:''
  },
  mutations: {
    setCur(state,cur) {
      state.cur = cur
    },
    setInp(state,inp) {
      state.inp = inp
    },
    setWorship(state,worship) {
      state.worship = worship
    },
    setDistPath(state,distPath) {
      state.distPath = distPath
    },
  },
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
