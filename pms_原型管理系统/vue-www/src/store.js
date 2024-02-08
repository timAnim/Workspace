import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

var store = new Vuex.Store({
  state: {
    navs: [],
    curNav: '',
    curPalette: 0,
    projStage: 'develop',
    projEdit: 'update',
    productSort:'进行中',
    aside: 'on',
    boudery: [],
    itemFrom: {},
    arrFrom: [],
    itemTo: {},
    indexFrom: 0,
    tend: "",
    presetPanel: false,
    isadmin: false,
    uid: null,
    token: null,
    headurl: null,
    ptpreset: null,
    toast: {
      seen: false,
      msg: '操作成功',
    },
    confirm: {
      seen: false,
      msg: '操作成功',
      res: false,
      out: res => {
        return res
      }
    },
  },
  mutations: {
    setProjStage(state, stage) {
      state.projStage = stage
    },
    setProjEdit(state, val) {
      state.projEdit = val
    },
    setProductSort(state, val) {
      state.productSort = val
    },
    setCur(state, id) {
      state.curNav = id
    },
    setNavs(state, navs) {
      state.navs = navs
    },
    setAside(state, id) {
      state.aside = id
    },
    setItemFrom(state, itemFrom) {
      state.itemFrom = itemFrom
    },
    setArrFrom(state, arrFrom) {
      state.arrFrom = arrFrom
    },
    setItemTo(state, itemTo) {
      state.itemTo = itemTo
    },
    setIndexFrom(state, indexFrom) {
      state.indexFrom = indexFrom
    },
    setTend(state, tend) {
      state.tend = tend
    },
    toast(state, msg) {
      state.toast.seen = true
      state.toast.msg = msg
      setTimeout(t => {
        state.toast.seen = false
      }, 3000)
    },
    setConfirm(state, confirm) {
      state.confirm.seen = confirm.seen
      state.confirm.msg = confirm.msg
      state.confirm.res = confirm.res
      state.confirm.out = confirm.out
    },
    setIsadmin(state, admin) {
      state.isadmin = admin
    },
    setUid(state, uid) {
      state.uid = uid
    },
    setToken(state, token) {
      state.token = token
    },
    setHeadurl(state, headurl) {
      state.headurl = headurl
    },
    setPtpreset(state, ptpreset) {
      state.ptpreset = ptpreset
    },
    showPreset(state, show) {
      state.presetPanel = show
    }
  },
  actions: {}
});

export default store
