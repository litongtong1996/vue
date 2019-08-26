// 入口文件
import Vue from 'vue'
// 导入路由的包
import VueRouter from 'vue-router'
// 安装路由
Vue.use(VueRouter)
// 注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)
// 每次进入网站先调用main，从本地读取购物车数据，放入store中
var car = JSON.parse(localStorage.getItem('car') || '[]')
var store = new Vuex.Store({
    state: {
        // this.$store.state.***
        car: car
        // 将购物车中的数据用数组存储起来,存储的是商品对象：{ID：商品的ID，count：商品的数量，price：商品的价格，selected：选中状态（true、false）}
    },
    mutations: {
        // this.$store.commit('方法的名称','按需传递唯一的参数')
        addToCar(state, goodsinfo) {
            // 点击加入购物车。把商品保存到store的car上
            // 分析：
            // 1.如果购物车中已经有这个商品了，则只需要更新数量就好了
            // 2.如果没有，则把商品数据push到car中

            // 假设在购物车中没有找到对应的商品
            var flag = false
            state.car.some(item => {
                if (item.id === goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count)
                    flag = true
                    return true
                }
            })
            // 如果循环flag认为false则直接push进去
            if (!flag) {
                state.car.push(goodsinfo)
            }
            // 当更新完car时，把car数组存储到本地localStorage
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsInfo(state, goodsinfo) {
            // 修改购物车中商品的数量值
            state.car.some(item => {
                if (item.id === goodsinfo.id) {
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            })
            // 当修改完数量，把最新的购物车数量保存到本地存储中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        removeFormCar(state, id) {
            // 根据ID从store中的购物车中删除对应的商品数据
            state.car.some((item, i) => {
                if (item.id === id) {
                    state.car.splice(i, 1)
                    return true
                }
            })
            // 将删除完毕的购物车数据保存到本地
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsSelected(state, info) {
            state.car.some(item => {
                if (item.id === info.id) {
                    item.selected = info.selected
                }
            })
            // 把最新的商品状态保存到store中去
            localStorage.setItem('car', JSON.stringify(state.car))
        }
    },
    getters: {
        // this.$store.getters.***
        // 相当于计算属性,也相当于过滤器
        getAllCount(state) {
            var c = 0
            state.car.forEach(item => {
                c += item.count
            })
            return c
        },
        getGoodsCount(state) {
            var o = {}
            // 把当前循环的这个商品的ID，作为对象的属性名，count值作为对象的属性值。
            state.car.forEach(item => {
                o[item.id] = item.count
            })
            return o
        },
        getGoodsSelected(state) {
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.selected
            })
            return o
        },
        getGoodsCountAndAmount(state) {
            var o = {
                count: 0, // 勾选的数量
                amount: 0 // 勾选的总价
            }
            state.car.forEach(item => {
                if (item.selected) {
                    o.count += item.count
                    o.amount += item.price * item.count
                }
            })
            return o
        }
    }
})
// 导入时间插件
import moment from 'moment'
// 定义全局过滤器
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
})
// 导入VueResource
import VueResource from 'vue-resource'
// 安装VueResource
Vue.use(VueResource)
// 设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005'
// 全局设置post时表单数据的组织格式
Vue.http.options.emulateJSON = true
// 导入mui的样式
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
// 按需导入mint-UI组件
// import {Header,Swipe,SwipeItem,Button,Lazyload} from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)
// Vue.use(Lazyload)
import MitUI from 'mint-ui'
Vue.use(MitUI)
import 'mint-ui/lib/style.css'
// 安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
// 导入自己的router路由模块
import router from './router.js'
// 导入APP根组件
import app from './App.vue'

var vm = new Vue({
    el: "#app",
    render: c => c(app),
    // 挂载对象到VM实例上
    router,
    // 挂载store状态管理器
    store
})