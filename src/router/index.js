import * as VueRouter from 'vue-router'
import TodoApp from '../components/TodoApp.vue'
const routes = [
  { path: '/', component:TodoApp, name:'all'},
  { path: '/active', component:TodoApp, name:'active'},
  { path: '/completed', component:TodoApp, name:'completed'}
]

export default VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
})