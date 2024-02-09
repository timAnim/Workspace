// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
Vue.use(VueResource);

import vuex from 'vuex'
Vue.use(vuex);
var store = new vuex.Store({ //store对象
  state: {
    cur: 'input-panel',
    inp: require('../static/js/example'),
   	worship: {},
    distPath:''
  },
  mutations: {
    switchView(state,cur) {
      state.cur = cur
    },
    inpMu(state,inp) {
      state.inp = inp
    },
    worshipMu(state,worship) {
      state.worship = worship
    },
    distPathMu(state,distPath) {
      state.distPath = distPath
    },
  },
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
