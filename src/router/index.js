import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    name: 'Home',
    meta: { title: '首页' },
    children: [{
      path: 'home',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/province',
    name: 'Zenkoku',
    meta: { title: '全国' },
    children: [
      {
        path: 'popular',
        name: '热门城市天气',
        component: () => import('@/views/zenkoku/components/PopularCities'),
        meta: { title: '热门城市天气' }
      },
      {
        path: 'provinces',
        name: '各省天气详情',
        component: () => import('@/views/zenkoku/components/Kakusyo'),
        meta: { title: '各省天气详情' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

