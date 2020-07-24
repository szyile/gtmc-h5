<template>
  <div id="mapOrder">
    <app-header :title="title">
      <span slot="left" class="left" @click="this.common.goBack"></span>
    </app-header>
    <!-- 地图背景 -->
    <div id="mapOrderContainer"></div>
    <!-- 用户刷新区域 -->
    <div id="resetArea">
      <!-- 刷新按钮 -->
      <div id="resetBtn" v-show='resetFlag' @click='resetEvents'></div>
      <div id="resetTime" v-show='!resetFlag'>
        <span>{{resetTime}}</span>
      </div>
    </div>
    <!-- 显示订单状态 -->
    <div id="showOrderarea" class="bgwhite pos-fx tx-l f15">
      <div @click="precisePositioning" id="dingweiBtn"></div>
      <div class="ml15 mr20 flex justify-content_flex-justify">
        <div>
          <div class="f20 fb mb15">已完成</div>
          <div class="mb20">{{carNumber}}</div>
          <div>
            实际里程
            <span class="orange">{{orderMileage}}</span>公里,
            实际金额
            <span class="orange">￥{{orderMoney}}</span>
          </div>
        </div>
        <div class="tx-c">
          <div class="driver-header">
            <img src="../../../../static/images/drive-header.png" alt v-show="!driverHeaderFlag" />
            <img :src="driverHeader" alt v-show="driverHeaderFlag" />
          </div>
          <div class="f13 blue mt5">{{driverName}}</div>
        </div>
      </div>
    </div>
    <!-- 显示订单对应 的按钮 -->
    <div id="showOrderBtns">
      <div class="flex justify-content_flex-justify">
        <div class="lis-btn flex flex-direction_column align-items_center" @click="callPhone(driverMob)">
          <img src="../../../../static/images/phone-icon.png" alt class="mt15" />
          <div>联系司机</div>
        </div>
        <div class="lis-btn flex flex-direction_column align-items_center" @click="callPhone(kefu)">
          <img src="../../../../static/images/kefu-icon.png" alt class="w26 mt15" />
          <div>联系客服</div>
        </div>
        <div class="lis-btn flex flex-direction_column align-items_center" @click="gotoOrderInfo">
          <img src="../../../../static/images/info-icon.png" alt class="mt15" />
          <div>订单详情</div>
        </div>
      </div>
    </div>
    <!-- 定制化toast -->
    <div id='toastDiv' v-show='showToastFlag'>
      <div id="toastMas"></div>
      <div id="toastArea">
        <div class="tx-c"><img src="../../../../static/images/loading.gif" alt=""></div>
        <div class="white f14 tx-c mt15">加载中</div>
      </div>
    </div>
  </div>
</template>
<script>
import { orderDetail,driverLineArr,urlDestr } from "../../../commonJs/api";
import AMap from "AMap";
import Header from "../../common/header";
var marker, lineArr = [];
// 全局变量
let timeOut = null;
let timeSel = null;
let resetTimeOver = null;//刷新倒计时
export default {
  data() {
    return {
      map: null,
      title: "",
      carNumber: "--", //车牌号
      orderMileage: "--", //实际里程
      orderMoney: "--", //实际金额
      driverHeader: "",//司机头像
      driverName: "",//司机姓名
      driverMob:'',//司机电话
      kefu: "400-7666-998",
      driverHeaderFlag: false,
      showToastFlag:false,
       resetFlag:true,//控制刷新
      resetTime:'',
      orderId:'',//存储orderId
    };
  },
  components: {
    "app-header": Header
  },
  methods: {
    setHeaderTitle() {
      this.title = this.$route.meta.name;
    },
    callPhone(tel) {
      window.location.href = "tel:" + tel;
    },
    //控制用户刷新操作
    resetEvents(){
      this.map.clearMap();
      this.resetFlag = !this.resetFlag
      this.timeover()
      this.driverLineArrs(this.orderId)
      this.initOrderData(this.orderId)
    },
    gotoOrderInfo() {
      // let orderId = this.$route.query.orderId;
      let orderId = this.orderId;
      this.$router.push({
        path: "/order-info",
        query: {
          orderId: orderId
        }
      });
    },
   
    //获
    //30s倒计时
    timeover(){
      let that = this;
      let times = 30;
      that.resetTime = times+'s'
      resetTimeOver = setInterval(()=>{
        if(times<=0){
          that.resetTime = '0s'
          clearInterval(resetTimeOver)
          that.resetFlag = true
        }
        times--;
        that.resetTime = times+'s'
      },1000)
    },
    //获取司机驾驶轨迹
    driverLineArrs(orderId){
      let that = this;
      let params={
        orderId:orderId
      }
      driverLineArr(params).then(res=>{
        if (res.header.code == "10000000") {
          if(res.body == null){
            that.$toast('未查询到司机的驾驶轨迹', 3000, 4);
            that.precisePositioning()
          }else{
            //调整数据格式
              let driverListArrData = res.body.locationList
              if(driverListArrData){
                let showArr = []
                if(driverListArrData.length){
                  for(let i = 0;i<driverListArrData.length;i++){
                    let nnn = Array.from(Object.values(driverListArrData[i])).reverse() 
                    let newData = nnn.slice(0,nnn.length-1)
                    showArr.push(newData)
                  }
                  lineArr=showArr;
                  that.showDriveLine()
                }
              }else{
                  that.$toast('未查询到司机的驾驶轨迹', 3000, 4);
                  that.precisePositioning()
              }
          }
        } else {
          that.precisePositioning()
          let msg = res.header.message;
          that.$toast(msg, 3000, 2,res.header.code);
        }
      })
    },
    //初始化订单详情
    initOrderData(orderId) {
      let that = this;
      let params = {
        orderId: orderId
      };
      orderDetail(params).then(res => {
          if (res.header.code == "10000000") {
              that.carNumber = res.body.carNum
              that.orderMileage = res.body.estimateMileage//实际里程
              that.orderMoney = res.body.estimateMoney//实际 金额
              that.driverName  = res.body.dirverName//司机姓名
              that.driverMob = res.body.driverMob//司机电话
              that.driverHeader=res.body.driverHeadUrl//司机头像
              if(res.body.driverHeadUrl && res.body.driverHeadUrl !='www.baidu.com'){
                that.driverHeaderFlag = true
              }else{
                that.driverHeaderFlag = false
              }
        } else {
          let msg = res.header.message;
          this.$toast(msg,3000,2)
        }
      });
    },
    //初始化地图
    initMap() {
      let that = this;
      // 创建地图实例
      var map = new AMap.Map("mapOrderContainer", {
        zoom: 15,
        resizeEnable: true
      });
      that.map = map;
    },
    //精确定位
    precisePositioning() {
      const self = this
      AMap.plugin('AMap.Geolocation', function () {
        var geolocation = new AMap.Geolocation({
            // 是否使用高精度定位，默认：true
            enableHighAccuracy: true, //是否使用高精度定位，默认:true
            timeout: 6000, //超过10秒后停止定位，默认：5s
            showCircle: false,
            showButton: false,
            showMarker:true
        })

        geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, 'complete', onComplete);
        AMap.event.addListener(geolocation, 'error', onError);

        function onComplete(data) {
            self.map.panTo(data.position)
            console.log('定位成功信息：', data);
        }

        function onError(data) {
            // 定位出错
            console.log('定位失败错误：', data);
        }
      })
    },
    //绘制驾驶轨迹
    showDriveLine(){
      let that = this;
        marker = new AMap.Marker({
          map: that.map,
          position: lineArr[0],
          icon: "https://webapi.amap.com/images/car.png",
          offset: new AMap.Pixel(-26, -13),
          autoRotation: true,
          angle:-90,
      });

      // 绘制轨迹
      var polyline = new AMap.Polyline({
          map: that.map,
          path: lineArr,
          showDir:true,
          strokeColor: "#28F",  //线颜色
          // strokeOpacity: 1,     //线透明度
          strokeWeight: 6,      //线宽
          // strokeStyle: "solid"  //线样式
      });
      
      var passedPolyline = new AMap.Polyline({
          map: that.map,
          strokeColor: "#AF5",  //线颜色
          strokeWeight: 6,      //线宽
      });
      marker.on('moving', function (e) {
          passedPolyline.setPath(e.passedPath);
      });
      that.map.setFitView();
      marker.moveAlong(lineArr, 1000);
    },
    //url解密
    urlDestrs(){
      let that = this,
          vinNo = that.$route.query.frameNum?that.$route.query.frameNum:'',
          applyNumber = that.$route.query.applyNumber?that.$route.query.applyNumber:"",
          telNo	 = that.$route.query.telNo,
          gtmcuid = that.$route.query.gtmcuid,
          orderId	 = that.$route.query.orderId,
          params={
            gtmcuid:gtmcuid,
            vin:vinNo,
            applyNumber:applyNumber,
            telNo:telNo,
            orderId:orderId
          }
      urlDestr(params).then(res=>{
        if(res.header.code == '10000000'){
          that.orderId = res.body.orderId
          setTimeout(() => {
            that.driverLineArrs(that.orderId)
            that.initOrderData(that.orderId)
          }, 500);
        }else{
          let msg = res.header.message
          that.$toast(msg,3000,2)
        }
      })
    },
  },
  created() {
    this.setHeaderTitle();
  },
  mounted() {
    let that = this;
    //判断是否是入口5
    if(that.$route.query.enterFign && that.$route.query.enterFign==5){
      console.log(window.location.href)
      that.urlDestrs()
    }else{
      that.orderId = that.$route.query.orderId
      setTimeout(() => {
        that.driverLineArrs(that.orderId)
        that.initOrderData(that.orderId)
      }, 500);
      
    }
    that.initMap()
  }
};
</script>
<style lang='less' scoped>
#mapOrderContainer{
  width: 100vw;
  height: 100vh;
}
#mapOrder {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
#showOrderarea {

  padding-top: 20px;
  padding-bottom: 20px;
  left: 0;
  right: 0;
  bottom: 130px;
  margin: auto;
  width: 335px;
  border-radius: 4px;
  z-index: 2;
  box-shadow: 0 2px 10px 0 #d8dbe1;
  .driver-header {
    width: 65px;
    height: 65px;
    border-radius: 50%;
    border: 1px solid #f1f3f7;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}
#showOrderBtns {
  position: fixed;
  bottom: 30px;
  width: 335px;
  margin-left: 20px;
  margin-right: 20px;
  font-size: 15px;
  color: #4cbffe;
  img {
    display: inline-block;
    width: 22px;
    height: 23px;
    margin-bottom: 7px;
  }
  .lis-btn {
    width: 78px;
    height: 78px;
    border-radius: 50%;
    background: #fff;
  }
}
.w26 {
  width: 26px !important;
}
#dingweiBtn{
  position: absolute;
  top: -80px;
  right: 0;
  width: 60px;
  height: 60px;
  background: url('../../../../static/images/position.png') no-repeat center center;
  background-size: cover;
}
#resetArea{
  position: fixed;
  right: 7px;
  top: 25px;
  #resetBtn{
    position: absolute;
    right: 0px;
    top: 0px;
    width: 52px;
    height: 52px;
    background: url('../../../../static/images/reset-icon.png') no-repeat center center;
    background-size: cover;
  }
  #resetTime{
    position: absolute;
    right: 0px;
    top: 0px;
    width: 52px;
    height: 52px;
    line-height: 52px;
    text-align: center;
    color:#4CBFFE;
    font-size: 14px;
    background: url('../../../../static/images/reset-icon-time.png') no-repeat center center;
    background-size: cover;
    span{
      position: relative;
      left: -1px;
    }
  }
}
</style>
