import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import input from '@/components/input'
import parsed from '@/components/parsed'
import output from '@/components/output'
import monthly from '@/components/monthly'
import article from '@/components/article'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'index',
    component: index,
    redirect: '/input',
    children: [{
      path: '/input',
      name: 'input',
      component: input,
    }, {
      path: '/parsed',
      name: 'parsed',
      component: parsed,
    }, {
      path: '/output',
      name: 'output',
      component: output,
    },]
  }, {
    path: '/monthly',
    name: '月刊生成',
    component: monthly,
    redirect: '/article',
    children: [{
      path: '/article',
      name: '月刊生成',
      component: article,
    }]
  }
  ]
})
