import axios from 'axios'
import md5 from 'js-md5';
import _this from '../main.js';


// http request拦截器 添加一个请求拦截器
axios.interceptors.request.use(function(config) {
    //获取请求参数
    let params = JSON.stringify(config.data);
    let token = localStorage.getItem('localToken') ? localStorage.getItem('localToken') : "";
    let appid = "PADS003";
    let appkey = 'FA2PeiRO4Yy81iQiwzCWA'
    let timeLong = new  Date().getTime();
    // 配置请求头
    config.headers['Content-Type'] = 'application/json';
    // axios.defaults.timeout = 5000;
    config.headers.token =  token;
    config.headers.appid =  appid;
    config.headers.timestamp = timeLong;
    if (token) {
        config.headers.sign = md5('appid='+appid+'&appkey='+appkey+'&timestamp='+timeLong+'&token='+token+params).toUpperCase()
    } else {
        config.headers.sign = md5('appid='+appid+'&appkey='+appkey+'&timestamp='+timeLong+params).toUpperCase()
    }

    console.log("info===============:url:"+config.url+";appid:"+appid+";appkey:"+appkey+";timestamp:"+timeLong+";token:"+token+";params:"+params+";sign:"+config.headers.sign);
    return config;
}, function(error) {
    return Promise.reject(error);
});



// 添加响应拦截器
axios.interceptors.response.use(function(response) {
    return response;
}, function(error) {
    console.log(error)
        // // 设置超时拦截
        // if (error.message.includes('timeout')) {
        //     return Promise.reject(error);
        // } else {
        // 正常请求
    let errStatus = error.response.status.toString();
    if (errStatus == 404) {
        _this.$toast('无法找到指定位置的资源', 2000, 2)
    }
    if (errStatus.substr(0, 1) == 5) {
        _this.$toast('服务器异常', 2000, 2, 1, errStatus)
    }
    if (errStatus.substr(0, 1) == 4 && errStatus != 404) {
        _this.$toast('访问异常', 2000, 2, 1, errStatus)
    }
    return Promise.reject(error);
    // }

});



//tips：axios未封装处理，较为繁琐，后续需要封装

// let baseUrl = 'https://test.icheyou.net/devapi';//开发环境的

// let baseUrl = 'https://iclub-padstest.gtmc.com.cn/api';//广丰测试

// let baseUrl ='https://iclub-pads.gtmc.com.cn/api'//正式

// let baseUrl = '/api-fetchcar'//本地
let baseUrl = process.env.SERV_ADDR

// let wechatBaseUrl = '/api-wechat'//模拟小程序链接
let wechatBaseUrl = process.env.SERV_WECHAT//模拟小程序链接
// let wechatBaseUrl = 'https://test.icheyou.net/osapi'//模拟小程序链接开发环境
//1、 城市列表
export const getCityLis = params => {
    return axios.post(baseUrl + '/v1.0/m/pads/order/city/list', params)
        .then(res => res.data)
};
//2、 检查工单状态
export const checkWork = params => {
    return axios.post(baseUrl + '/v1.0/m/pads/order/check-work', params)
        .then(res => res.data)
};
//3、 检查是否预约成功
export const checkReservation = params => {
    return axios.post(baseUrl + '/v1.0/m/pads/order/check-reservation', params)
        .then(res => res.data)
};
//4、 检查订单是否重复
export const checkRepeat = params => {
    return axios.post(baseUrl + '/v1.0/m/pads/order/check-repeat', params)
        .then(res => res.data)
};
//5、 订单费用估算
export const estimate = params => {
    return axios.post(baseUrl + '/v1.0/m/pads/didi/estimate', params)
        .then(res => res.data)
};
//6、 用户可用积分
export const availablePoint = params => {
    return axios.post(baseUrl + '/v1.0/m/pads/order/available-point', params)
        .then(res => res.data)
};
//7、 查询司机实时位置
export const driverPosition = params => {
    return axios.post(baseUrl + '/v1.0/m/pads/didi/driver-position', params)
        .then(res => res.data)
};
//8、 用户支付
export const pay = params => {
    return axios.post(baseUrl + '/v1.0/m/pads/order/pay', params)
        .then(res => res.data)
};
//9、 创建订单
export const addOrder = params => {
    return axios.post(baseUrl + '/v1.0/m/pads/order/add', params)
        .then(res => res.data)
};
//10、 取消订单
export const cancelOrder = params => {
    return axios.post(baseUrl + '/v1.0/m/pads/order/cancel', params)
        .then(res => res.data)
};
//11、 订单列表
export const orderPages = params => {
    return axios.post(baseUrl + '/v1.0/m/pads/order/page', params)
        .then(res => res.data)
};
//12、 订单详情
export const orderDetail = params => {
    return axios.post(baseUrl + '/v1.0/m/pads/order/detail', params)
        .then(res => res.data)
};
//13、 服务消耗积分
export const costPoint = params => {
    return axios.post(baseUrl + '/v1.0/m/pads/order/cost-point', params)
        .then(res => res.data)
};
//14、 进行中订单
export const processing = params => {
    return axios.post(baseUrl + '/v1.0/m/pads/order/processing', params)
        .then(res => res.data)
};
//15、 订单运输信息
export const statusDetail = params => {
    return axios.post(baseUrl + '/v1.0/m/pads/order/status/detail', params)
        .then(res => res.data)
};
//16、 获取广丰用户信息
export const getUserInfo = params => {
    return axios.post(baseUrl + '/v1.0/m/pads/customer/info', params)
        .then(res => res.data)
};
//17、 业务类型判断
export const checkServiceType = params => {
    return axios.post(baseUrl + '/v1.0/m/pads/order/check-serviceType', params)
        .then(res => res.data)
};

//18、 url解密   token不参与签名
export const urlDestr = params => {
    return axios.post(baseUrl + '/v1.0/m/pads/order/destr', params)
        .then(res => res.data)
};

//19、 实时费用
export const fee = params => {
    return axios.post(baseUrl + '/v1.0/m/pads/didi/fee', params)
        .then(res => res.data)
};

//20、 时间列表
export const timeList = params => {
    return axios.post(baseUrl + '/v1.0/m/pads/order/timelist', params)
        .then(res => res.data)
};

//21、 获取司机驾驶轨迹
export const driverLineArr = params => {
    return axios.post(baseUrl + '/v1.0/m/pads/order/driver/list', params)
        .then(res => res.data)
};

//22、 查询时间范围内最新一个订单
export const latestOrder = params => {
    return axios.post(baseUrl + '/v1.0/m/pads/order/latest', params)
        .then(res => res.data)
};
//22、 查询是否免单
export const activityAuth = params => {
    return axios.post(baseUrl + '/v1.0/m/pads/order/activityAuth', params)
        .then(res => res.data)
};
//23.模拟小程序取消回调
export const testNotice = params => {
    return axios.post(baseUrl + '/v1.0/m/pads/notice', params)
        .then(res => res.data)
};
//以下为模拟小程序的接口

//1、 通过手机号查询用户资料
export const testUserInfo = params => {
    return axios.post(wechatBaseUrl + '/v1.0/m/pads/os/info', params)
        .then(res => res.data)
};
//2、 生成预约单
export const testApply = params => {
    return axios.post(wechatBaseUrl + '/v1.0/m/pads/os/apply', params)
        .then(res => res.data)
};
//3、 加密接口
export const testEnstr = params => {
    return axios.post(wechatBaseUrl + '/v1.0/m/pads/os/enstr', params)
        .then(res => res.data)
};
//4、 预约单列表
export const testApplyList = params => {
    return axios.post(wechatBaseUrl + '/v1.0/m/pads/os/apply-list', params)
        .then(res => res.data)
};
//5、 预约单审核
export const applyAudit = params => {
  return axios.post(wechatBaseUrl + '/v1.0/m/pads/os/applyAudit', params)
    .then(res => res.data)
};
