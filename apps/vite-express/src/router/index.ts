import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { App } from 'vue'
import { IMyRouteItem } from './type'

export { useRoute, useRouter } from 'vue-router'

export const asyncRoutes: Array<IMyRouteItem> = []

export const constantRoutes: Array<IMyRouteItem> = []

const history = createWebHistory('/')

const router = createRouter({
    history,
    routes: constantRoutes as Array<RouteRecordRaw>,
  })
  
  export function setupRouter (app: App) {
    app.use(router)
  }
  
  export function destroyRouter () {
    history.destroy()
  }
  
  export default router