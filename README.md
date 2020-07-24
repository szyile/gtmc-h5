# iclub

> A Vue.js project

## Build Setup

``` bash
# install dependencies
cnpm/npm install

# serve with hot reload at localhost:8080  本地开发环境
cnpm/npm run dev

# build for testMy with minification  我们的测试环境
cnpm/npm run testMy

# build for testGtmc with minification  广丰测试环境
cnpm/npm run testGtmc

# build for production with minification  广丰正式环境
cnpm/npm run build

# build for production and view the bundle analyzer report
cnpm/npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


取送车项目说明：（本地开发接口为开发环境地址，打包需要更换，后期增加环境打包配置）
1、接口模块分配：
    -----订单模块（BFF）
    -----模拟小程序入口模块（OS）
2、文件说明：
    /src/commonJs/api.js---------配置axios请求
    /src/commonJs/index.js---------配置公共方法

    /src/components/common/err-------404页面，未添加至页面
    /src/components/common/header-------公共头部，微信浏览器运行不显示，其他浏览器运行显示
    /src/components/common/toast---------封装的toast组件，共4种状态

    /src/components/pages/city---------城市、门店搜索，点击首页的起点或者终点输入框可进，门店为高德poi搜索
    /src/components/pages/home---------取送车首页调用接口（地址栏解密urlDestr、获取用户信息（静默登录）getUserInfo、用户进行中订单processing、业务类型判断checkServiceType（入口二和入口三执行该接口）、预估里程接口estimate（超过80公里无法进入下一步）、免单活动activityAuth）

    关于免单接口--------activityAuth：页面首页已增加，直接搜索，然后在跳转下一步时将能否免单的字段带到创建订单页面，在创建订单页面，如果可以免单，则将底部价格部分的将用xx积分抵扣字段改为将用0积分抵扣，不能免单则正常显示即可


    /src/components/pages/order-------订单
    /src/components/pages/order/add--------创建订单（用户消耗积分costPoint、预估费用接口estimate、用户可用积分availablePoint、创建定点杆addOrder、预约时间timeList）

    <!-- 10-待审核 20-待派单 30-待接单 40、41-待取车 50-待交车 60、61-待付款 70-已完成 80、81-已关闭 -->

    /src/components/pages/order/info--------订单详情（详情orderDetail、取消订单cancelOrder、支付pay、实时费用fee、地址解密urlDestr、用户登录信息getUserInfo、入口四和入口五可以直接到该页面，具体可问测试，共8种状态）

    /src/components/pages/order/list--------订单列表（列表orderPages，上拉加载下拉刷新插件为mescroll）

    /src/components/pages/order/map-order--------地图订单详情（根据订单状态，地图显示不同的轨迹，具体可咨询测试，司机实时位置driverPosition、取消订单cancelOrder、进行中订单processing、司机驾驶轨迹driverLineArr、实时费用fee、地址解密urlDestr、用户登录信息getUserInfo）-----入口五可以直接进来

    /src/components/pages/order/status--------订单状态详情（状态详情statusDetail、消耗积分costPoint）

    /src/components/pages/order/success-order--------地图订单详情-已完成状态单独处理（详情orderDetail、驾驶轨迹driverLineArr、地址解密urlDestr）

小程序模拟：（开发环境）

    /src/components/pages/testurl--------模拟小程序入口（查询用户信息testUserInfo、创建预约单testApply、参数加密testEnstr、预约单列表testApplyList、模拟对预约单的回调testNotice）

    备注：模拟对预约单的回调testNotice   需要和后端具体调试  目前后端没有完成，无法联调





    暂时先这样大概的说明下各个文件以及对应的接口，具体的需求逻辑 测试都很清楚可以具体交流，有不熟悉的不清楚的可以找我