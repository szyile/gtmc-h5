import Vue from 'vue'
import Router from 'vue-router'

const Home = () =>
    import('../components/pages/home') //首页入口

const HomeEasy = () =>
    import('../components/pages/home/easy.vue') // 简易版首页入口
const ShopList = () =>
    import('../components/pages/shop/list.vue') // 简易版首页入口
const UserAgreeMent = () =>
    import('../components/pages/userAgreeMent') //用户协议

//订单
const OrderAdd = () =>
    import('../components/pages/order/add') //创建订单
    const OrderAddNew = () =>
    import('../components/pages/order/addNew') //创建订单
const OrderEdit = () =>
    import('../components/pages/order/edit') //修改订单
const OrderList = () =>
    import('../components/pages/order/list') //订单列表
const MapOrder = () =>
    import('../components/pages/order/map-order') //地图订单详情
const MapOrderSuccess = () =>
    import('../components/pages/order/success-order') //已完成-地图订单详情
const OrderInfo = () =>
    import('../components/pages/order/info') //订单详情
const OrderStatus = () =>
    import('../components/pages/order/status') //订单状态详情


//城市选择
const CitySearch = () =>
    import('../components/pages/city/search') //地址搜索
const City = () =>
    import('../components/pages/city/city') //切换城市

//生成测试连接，模拟小程序入口用
const desUrlTest = () =>
    import('../components/pages/testurl/index') //模拟链接首页

Vue.use(Router)

export default new Router({
    routes: [{
        meta: {
            index: 1,
            name: '广汽丰田车友会',
            needLogin: false,
            keepAlive: false
        },
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        meta: {
            index: 1,
            name: '广汽丰田车友会',
            needLogin: false,
            keepAlive: false
        },
        path: '/easy',
        name: 'HomeEasy',
        component: HomeEasy
    },
    {
        meta: {
            index: 1,
            name: '选择门店',
            needLogin: false,
            keepAlive: false
        },
        path: '/shop',
        name: 'ShopList',
        component: ShopList
    },

    {
        meta: {
            index: 4,
            name: '创建订单',
            needLogin: false,
            keepAlive: true,
        },
        path: '/order-add',
        name: 'OrderAdd',
        component: OrderAdd
    },

    {
        meta: {
            index: 4,
            name: '创建订单',
            needLogin: false,
            keepAlive: true,
        },
        path: '/order-add-new',
        name: 'OrderAddNew',
        component: OrderAddNew
    },

    {
        meta: {
            index: 5,
            name: '订单列表',
            needLogin: false,
            keepAlive: false,
        },
        path: '/order-list',
        name: 'OrderList',
        component: OrderList
    },
    {
        meta: {
            index: 7,
            name: '进行中的订单',
            needLogin: false,
            keepAlive: false,
        },
        path: '/map-order',
        name: 'MapOrder',
        component: MapOrder
    },
    {
        meta: {
            index: 8,
            name: '订单详情',
            needLogin: false,
            keepAlive: false,
        },
        path: '/order-info',
        name: 'OrderInfo',
        component: OrderInfo
    },
    {
        meta: {
            index: 9,
            name: '订单状态详情',
            needLogin: false,
            keepAlive: false,
        },
        path: '/order-status',
        name: 'OrderStatus',
        component: OrderStatus
    },

    {
        meta: {
            index: 10,
            name: '已完成订单',
            needLogin: false,
            keepAlive: false,
        },
        path: '/success-order',
        name: 'MapOrderSuccess',
        component: MapOrderSuccess
    },
    {
        meta: {
            index: 11,
            name: '搜索地址',
            needLogin: false,
            keepAlive: false,
        },
        path: '/city-search',
        name: 'CitySearch',
        component: CitySearch
    },
    {
        meta: {
            index: 13,
            name: '城市列表',
            needLogin: false,
            keepAlive: false,
        },
        path: '/city-change',
        name: 'City',
        component: City
    },
    {
        meta: {
            index: 14,
            name: '修改订单',
            needLogin: false,
            keepAlive: false,
        },
        path: '/order-edit',
        name: 'OrderEdit',
        component: OrderEdit
    },
    {
        meta: {
            index: 20,
            name: '用户协议',
            needLogin: false,
            keepAlive: false
        },
        path: '/user-agreement',
        name: 'UserAgreeMent',
        component: UserAgreeMent
    },
    //测试链接，模拟小程序入口，内部人员使用
    {
        meta: {
            index: 20,
            name: '入口链接生成',
            needLogin: false,
            keepAlive: false
        },
        path: '/desUrlTest-index/testId=1',
        name: 'desUrlTest',
        component: desUrlTest
    },
    ]
})