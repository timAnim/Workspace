import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// 公用组件
import Login from '@/components/_common/login'

import ProjectAdd from '@/components/project/add'
import ProjectDetail from '@/components/project/detail/index'
import ProjectEdit from '@/components/project/edit/index'
import ProjectList from '@/components/project/list'
import PlanAdd from '@/components/project/plan/add'

import Users from '@/components/user/list'
import UserUpdate from '@/components/user/update'

import Lab from '@/components/lab/index'
import Test from '@/components/lab/test'

import Instructs from '@/components/instruct/index'
import Palette from '@/components/instruct/palette/list'
import AddPalette from '@/components/instruct/palette/add'

import HtmlViewer from '@/components/_common/html-viewer'
import SVGViewer from '@/components/_common/svg-viewer'

import VR from '@/components/vr/stage'

import BlogUpdate from '@/components/component/blog/update'
import ComponentIndex from '@/components/component/index'
import ComponentAdd from '@/components/component/element/add'

import AboutIndex from '@/components/about/index'
import StartIndex from '@/components/start/index'

import Wxapp from '@/components/wxapp/visit-analysis'

import ProductList from '@/components/product/product-list'
import ProductDetail from '@/components/product/product-detail'
import ProductEdit from '@/components/product/product-edit'
import ProductAdd from '@/components/product/add-product'


import UrlViewer from '@/components/_common/url-viewer'

var routes = [{
  path: '/project/detail',
  name: '项目详情',
  component: ProjectDetail,
}, {
  path: '/login',
  name: '登录',
  component: Login,
}, {
  path: '/project/add',
  name: '添加项目',
  component: ProjectAdd,
}, {
  path: '/project/edit',
  name: '项目修改',
  component: ProjectEdit,
}, {
  path: '/project/detial',
  name: '迭代详情',
  component: ProjectDetail,
}, {
  path: '/plan/add',
  name: '添加计划',
  component: PlanAdd,
}, {
  path: '/staff/edit',
  name: '人员修改',
  component: UserUpdate,
},{
  path: '/product/detail',
  name: '产品详情',
  component: ProductDetail,
},{
  path: '/product/edit',
  name: '产品修改',
  component: ProductEdit,
}, {
  name: '迭代',
  path: '/project/list',
  component: ProjectList,
}, {
  name: '产品',
  path: '/prodcut/list',
  component: ProductList,
}, {
  name: '组件',
  path: '/components',
  component: ComponentIndex,
}, {
  name: '虚拟现实',
  path: '/vr',
  component: VR,
}, {
  name: '规范',
  path: '/instructs',
  component: Instructs,
}, {
  name: '色板',
  path: '/palettes',
  component: Palette,
}, {
  name: '实验室',
  path: '/lab',
  component: Lab,
}, {
  name: '联系我们',
  path: '/about',
  component: AboutIndex,
}, {
  name: '人员列表',
  path: '/user/list',
  component: Users,
}, {
  name: '添加交互',
  path: '/interacts/add',
  component: ComponentAdd,
}, {
  name: '编辑文章',
  path: '/blogs/update',
  component: BlogUpdate,
}, {
  name: '编辑色板',
  path: '/palettes/upadd',
  component: AddPalette,
}, {
  name: '测试',
  path: '/lab/test',
  component: Test,
}, {
  name: 'HTML查看器',
  path: '/html-viewer',
  component: HtmlViewer,
}, {
  name: 'SVG查看器',
  path: '/svg-viewer',
  component: SVGViewer,
}, {
  name: 'URL查看器',
  path: '/url-viewer',
  component: UrlViewer,
}, {
  name: '关于',
  path: '/start',
  component: StartIndex,
}, {
  name: '小程序分析',
  path: '/wxapp',
  component: Wxapp
}, {
  name: '产品列表',
  path: '/product/list',
  component: ProductList
}, {
  name: '添加产品',
  path: '/product/add',
  component: ProductAdd
}, {
  path: '*',
  redirect: '/product/list'
}]

var router = new Router({
  routes
})

export default router
