import { createRouter, createWebHistory } from 'vue-router'
import routes from '../router/routes';


const routerHistory = createWebHistory()

const router = createRouter({
    history: routerHistory,
    routes: routes
  });

  router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
      if(localStorage.getItem('access_token') == null){
        next({
          name: 'login',
          params: { nextUrl : to.fullPath}
        })
      }else{
        next()
      }
    }else if(to.matched.some(record => record.meta.guest)){
      if(localStorage.getItem('access_token') == null){
        next()
      }
    }else{
      next({
        name: 'dashboard'
      })
    }
  })

export default router;