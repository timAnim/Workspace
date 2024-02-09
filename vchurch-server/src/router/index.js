import Vue from 'vue'
import Router from 'vue-router'
import genPPT from '@/components/gen-ppt/index'
import input from '@/components/gen-ppt/input'
import parsed from '@/components/gen-ppt/parsed'
import output from '@/components/gen-ppt/output'
import genMonthly from '@/components/gen-monthly/monthly'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: '威盛工具',
    redirect: '/gen-ppt/input',
  }, {
    path: '/gen-ppt',
    name: 'ppt生成工具',
    component: genPPT,
    redirect: '/gen-ppt/input',
    children: [{
      path: '/gen-ppt/input',
      name: '文本',
      component: input,
    }, {
      path: '/gen-ppt/parsed',
      name: '解析',
      component: parsed,
    }, {
      path: '/gen-ppt/output',
      name: '导出',
      component: output,
    },]
  }, {
    path: '/gen-monthly',
    name: '月刊生成',
    redirect: '/gen-monthly/article',
    children: [{
      path: '/gen-monthly/article',
      name: '月刊生成',
      component: genMonthly,
    }]
  }
  ]
})
