// 入口文件
import Vue from 'vue'
// 导入路由的包
import VueRouter from 'vue-router'
// 安装路由
Vue.use(VueRouter)
// 导入VueResource
import VueResource from 'vue-resource'
// 安装VueResource
Vue.use(VueResource)
// 导入mui的样式
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
// 按需导入mint-UI组件
import {Header,Swipe, SwipeItem} from 'mint-ui'
Vue.component(Header.name,Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
// 导入自己的router路由模块
import router from './router.js'
// 导入APP根组件
import app from './App.vue'

var vm = new Vue({
    el: "#app",
    render: c => c(app),
    // 挂载对象到VM实例上
    router
})