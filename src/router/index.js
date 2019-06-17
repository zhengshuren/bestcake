import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: '/',
      redirect: 'index',
      component: resolve => require(['@/components/home'], resolve),
      children: [{
        path: 'index',
        name: 'index',
        meta: {
          title: '首页'
        },
        component: resolve => require(['@/components/main/index'], resolve)
      },
      {
        path: 'class',
        name: 'class',
        meta: {
          title: '分类'
        },
        component: resolve => require(['@/components/main/class'], resolve)
      },
      {
        path: 'user',
        name: 'user',
        meta: {
          title: '我的'
        },
        component: resolve => require(['@/components/main/user'], resolve)
       },
      {
          path: 'carts',
          name: 'carts',
          meta: {
            title: '购物车'
          },
          component: resolve => require(['@/components/main/carts'], resolve)
      },
      {
        path: 'show',
        name: 'show',
        meta: {
          title: '商品详情'
        },
        component: resolve => require(['@/components/main/show'], resolve)
      },
      {
        path: 'login',
        name: 'login',
        meta: {
          title: '登录'
        },
        component: resolve => require(['@/components/main/login'], resolve)
      },
      {
        path: 'comments',
        name: 'comments',
        meta: {
          title: '商品评论'
        },
        component: resolve => require(['@/components/main/comments'], resolve)
      },
      {
        path: 'info',
        name: 'info',
        meta: {
          title: '个人中心'
        },
        component: resolve => require(['@/components/main/info'], resolve),
      }]
  }]
})
// router.beforeEach((to, from, next) => {
//   // console.log(from)
//   // console.log(to)
//   // console.log(location.search)
//   if (to.path === '/') {
//     if (location.search.indexOf('u') !== -1) {
//       next('test')
//     } else if (location.search.indexOf('u') === -1) {
//       next('news')
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })
// router.afterEach((to, from) => {
//   // console.log('跳转之后')
// })
export default router
