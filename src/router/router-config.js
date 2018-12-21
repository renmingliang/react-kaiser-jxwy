// 懒加载 -- SPA加载优化性能
import _import from './_import'

// 静态路由表
const routes = [
  {
    path: '/',
    exact: true,
    component: _import('home')
  },
  {
    path: '/upload',
    component: _import('upload')
  },
  {
    path: '/poster/:id',
    component: _import('poster')
  },
  {
    path: '/share/:id',
    component: _import('share')
  },
  {
    path: '/product',
    component: _import('product')
  },
  {
    path: '/login',
    component: _import('login')
  }
]

export default routes