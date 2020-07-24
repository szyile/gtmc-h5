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
    <div id="showOrderarea" class="bgwhite pos-fx tx-l f15" v-show="initHide">
      <div @click="precisePositioning" id="dingweiBtn"></div>
      <!-- 待接单显示30分钟倒计时 -->
      <div
        id="showWaitingTips"
        class="pos-abs flex justify-content_flex-justify f13 white"
        v-if="orderStatus == 30"
      >
        <div class="ml15">
          剩余
          <span>{{timeMove}}</span>
        </div>
        <div class="mr15">30分钟内未接单将自动取消</div>
      </div>
      <!-- 距离派单 -->
      <div
        class="showWaitingTips pos-abs flex justify-content_flex-justify f13 white"
        v-if="orderStatus == 20"
      >
        <div class="ml15">
          距离派单还有
          <span>{{receiveTime}}</span>
        </div>
        <!-- <div class="mr15">30分钟内未接单将自动取消</div> -->
      </div>

      <div class="ml15 mr20 flex justify-content_flex-justify">
        <div>
          <div class="f20 fb mb15" v-show="orderStatus == 10">待审核</div>
          <div class="f20 fb mb15" v-show="orderStatus == 20">待派单</div>
          <div class="f20 fb mb15" v-show="orderStatus == 30">待接单</div>
          <div class="f20 fb mb15" v-show="orderStatus == 40 || orderStatus == 41">待取车</div>
          <div class="f20 fb mb15" v-show="orderStatus == 50">待交车</div>
          <div class="f20 fb mb15" v-show="orderStatus == 60 || orderStatus == 61">待付款</div>
          <div class="f20 fb mb15" v-show="orderStatus == 70">已完成</div>
          <div class="mb20">{{carNumber}}</div>
          <!-- 待交车、显示距离终点信息 -->
          <div v-show="orderStatus == 50">
            距终点
            <span class="orange">{{estimateMileage}}</span> 公里，预计行驶
            <span class="orange">{{estimateTime}}</span> 分钟
          </div>
          <!-- 待取车 -->
          <div v-show="orderStatus == 40 || orderStatus == 41">
            预估
            <span class="orange">{{driverEta}}</span> 分钟到达取车点
          </div>
          <!-- 待接单、待审核、待派单显示 预估时间、预估里程-->
          <div v-show="orderStatus == 10 || orderStatus == 20 || orderStatus == 30">
            预估里程
            <span class="orange">{{estimateMileage}}</span> 公里，预估行驶
            <span class="orange">{{estimateTime}}</span> 分钟
          </div>
          <!-- 待付款 、已完成显示实际数据 -->
          <div v-show="orderStatus == 60 || orderStatus == 61 || orderStatus == 70">
            实际里程
            <span class="orange">{{actualMileage}}</span> 公里，实际金额
            <span class="orange">{{orderMoney}}</span>
          </div>
        </div>
        <div
          class="tx-c"
          v-show="
            orderStatus == 40 ||
            orderStatus == 41 ||
            orderStatus == 50 ||
            orderStatus == 60 ||
            orderStatus == 61

        "
        >
          <div class="driver-header">
            <img src="../../../../static/images/drive-header.png" alt v-show="!driverHeaderFlag" />
            <img :src="driverHeader" alt v-show="driverHeaderFlag" />
          </div>
          <div class="f13 blue mt5">{{driverName}}</div>
        </div>
      </div>
    </div>
    <!-- 显示订单对应 的按钮 -->
    <div id="showOrderBtns" v-show="initHide">
      <!--待审核、待派单 、待接单-->
      <div
        class="flex justify-content_flex-center"
        v-show=" orderStatus == 10 || orderStatus == 20 || orderStatus == 30"
      >
        <div class="lis-btn flex flex-direction_column align-items_center" @click="cancelOrder">
          <img src="../../../../static/images/cancel-icon.png" alt class="mt15" />
          <div>取消订单</div>
        </div>
        <div
          class="lis-btn flex flex-direction_column align-items_center ml70"
          @click="gotoOrderInfo(orderId)"
        >
          <img src="../../../../static/images/info-icon.png" alt class="mt15" />
          <div>订单详情</div>
        </div>
      </div>
      <!--待取车-->
      <div
        class="flex justify-content_flex-justify"
        v-show=" orderStatus == 40 || orderStatus == 41"
      >
        <div class="lis-btn flex flex-direction_column align-items_center" @click="cancelOrder">
          <img src="../../../../static/images/cancel-icon.png" alt class="mt15" />
          <div>取消订单</div>
        </div>
        <div
          class="lis-btn flex flex-direction_column align-items_center"
          @click="callPhone(driverTel)"
        >
          <img src="../../../../static/images/phone-icon.png" alt class="mt15" />
          <div>联系司机</div>
        </div>
        <div class="lis-btn flex flex-direction_column align-items_center" @click="callPhone(kefu)">
          <img src="../../../../static/images/kefu-icon.png" alt class="w26 mt15" />
          <div>联系客服</div>
        </div>

        <div
          class="lis-btn flex flex-direction_column align-items_center"
          @click="gotoOrderInfo(orderId)"
        >
          <img src="../../../../static/images/info-icon.png" alt class="mt15" />
          <div>订单详情</div>
        </div>
      </div>
      <!--待交车-->
      <div class="flex justify-content_flex-justify" v-show=" orderStatus == 50">
        <div
          class="lis-btn flex flex-direction_column align-items_center"
          @click="callPhone(driverTel)"
        >
          <img src="../../../../static/images/phone-icon.png" alt class="mt15" />
          <div>联系司机</div>
        </div>
        <div class="lis-btn flex flex-direction_column align-items_center" @click="callPhone(kefu)">
          <img src="../../../../static/images/kefu-icon.png" alt class="w26 mt15" />
          <div>联系客服</div>
        </div>

        <div
          class="lis-btn flex flex-direction_column align-items_center"
          @click="gotoOrderInfo(orderId)"
        >
          <img src="../../../../static/images/info-icon.png" alt class="mt15" />
          <div>订单详情</div>
        </div>
      </div>
      <!--待付款-->
      <div
        class="flex justify-content_flex-justify"
        v-show=" orderStatus == 60 || orderStatus == 61"
      >
        <div class="lis-btn flex flex-direction_column align-items_center" @click="callPhone(kefu)">
          <img src="../../../../static/images/kefu-icon.png" alt class="w26 mt15" />
          <div>联系客服</div>
        </div>
        <div
          class="lis-btn flex flex-direction_column align-items_center"
          @click="callPhone(driverTel)"
        >
          <img src="../../../../static/images/phone-icon.png" alt class="mt15" />
          <div>联系司机</div>
        </div>
        <div
          class="lis-btn flex flex-direction_column align-items_center"
          @click="gotoOrderInfo(orderId)"
        >
          <img src="../../../../static/images/info-icon.png" alt class="mt15" />
          <div>订单详情</div>
        </div>
        <div
          class="lis-btn flex flex-direction_column align-items_center"
          @click="gotoOrderInfo(orderId)"
        >
          <img src="../../../../static/images/pay-icon.png" alt class="mt15" />
          <div style="color:#FF981E">立即付款</div>
        </div>
      </div>
      <!-- 已完成 -->
      <div class="flex justify-content_flex-justify" v-show=" orderStatus == 70">
        <div class="lis-btn flex flex-direction_column align-items_center" @click="callPhone(driverMob)">
          <img src="../../../../static/images/phone-icon.png" alt class="mt15" />
          <div>联系司机</div>
        </div>
        <div class="lis-btn flex flex-direction_column align-items_center" @click="callPhone(kefu)">
          <img src="../../../../static/images/kefu-icon.png" alt class="w26 mt15" />
          <div>联系客服</div>
        </div>
        <div class="lis-btn flex flex-direction_column align-items_center" @click="gotoOrderInfo(orderId)">
          <img src="../../../../static/images/info-icon.png" alt class="mt15" />
          <div>订单详情</div>
        </div>
      </div>

    </div>
    <!-- 取消订单信息弹框 -->
    <div id="cancelThisOrder" v-show="cancelSHowFlag">
      <div id="cancelMask"></div>
      <div id="cancelInfo">
        <div class="f16 fb tx-c mt30 mb30">取消订单</div>
        <div class="ml15 mr15">
          <div class="cancel-title-tips flex justify-content_flex-start align-items_center">
            <!-- <img src="../../../../static/images/must-icon.png" alt style='opacity:0'/> -->
            <span class="f15 fb">取消原因</span>
          </div>
          <div
            class="flex justify-content_flex-start align-items_center mt15 mb30"
            id="cancelResultChange"
          >
            <div class="cancel-radio cancel-on flex justify-content_flex-start align-items_center">
              <div class="cancel-radio-bg mr5"></div>
              <div class="f13">个人原因</div>
            </div>
            <div class="cancel-radio flex justify-content_flex-start align-items_center ml30">
              <div class="cancel-radio-bg mr5"></div>
              <div class="f13">司机原因</div>
            </div>
          </div>
          <div class="cancel-title-tips flex justify-content_flex-start align-items_center">
            <!-- <img src="../../../../static/images/must-icon.png" alt style='opacity:0'/> -->
            <span class="f15 fb">取消说明</span>
          </div>
          <div class="pos-re">
            <textarea
              name
              id="cancelContent"
              cols="30"
              rows="10"
              placeholder="请您输入取消说明，我们将为您提供更好的服务"
              v-model="showTexArea"
              class="f13"
            ></textarea>
            <span class="pos-abs haveNum">{{haveNum}}/100</span>
          </div>
          <div
            class="f16 mask-cancel-btns flex justify-content_flex-justify align-items_center tx-c"
          >
            <div class="grey flex1" @click="hideCancelOrder">返回</div>
            <div
              class="flex1"
              style="border-left: 1px solid #E1E4EA;"
              @click="sureCancelOrder(orderId)"
            >提交</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 定制化toast -->
    <div id="toastDiv" v-show="showToastFlag">
      <div id="toastMas"></div>
      <div id="toastArea">
        <div class="tx-c">
          <img src="../../../../static/images/loading.gif" alt />
        </div>
        <div class="white f14 tx-c mt15">{{cancelStatusText}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { driverPosition, cancelOrder, processing,driverLineArr,fee,urlDestr,getUserInfo } from "../../../commonJs/api";
import AMap from "AMap";
import Header from "../../common/header";
import { async } from "q";
import router from "../../../router";
var marker, lineArr = [];
// 全局变量
let timeOut = null; //页面30s刷新
let timeSel = null; //待接单定时器
let timereceiveTime = null; //待派单定时器
let resetTimeOver = null;//刷新倒计时
export default {
  data() {
    return {
      initHide: false,
      map: null,
      title: "",
      timeMove: "--", //订单倒计时 页面重新进入还是30分钟？？？ 建议从接口获取
      cancelResultFlag: 0, //记录取消原因 0：个人原因  1：司机原因
      cancelSHowFlag: false, //控制取消弹框显示
      showTexArea: "", //取消说明
      // orderId:'',
      kefu: "400-7666-998",
      driverHeaderFlag: false,
      receiveTime: "--", // 距离派单时间 等待后台返回 暂时没有
      // 绘制司机的位置
      driverPositionLat: "", // 司机纬度
      driverPositionLng: "", // 司机经度
      driverEta: "", // 司机到达时间
      // 存储订单返回的信息
      orderStartLat: "", //起点纬度
      orderStartLng: "", //起点经度
      orderEndLat: "", //终点纬度
      orderEndLng: "", //终点经度
      carNumber: "", //车牌号
      orderStatus: "", //订单状态
      estimateTime: "", //预估时间
      estimateMileage: "", //预估里程
      orderId: "", //订单id
      driverHeader: "", //司机头像
      driverName: "", //司机姓名
      driverTel: "14752251277", //司机手机号
      showToastFlag: false,
      cancelStatusText:'取消订单中...',//取消文案
      actualMileage:'',//实际里程
      orderMoney:'',//实际金额
      resetFlag:true,//控制刷新
      resetTime:'',
      desFrameNum:'',//存储车架号
      haveNum:0,//已经输入的字数
    };
  },
  components: {
    "app-header": Header
  },
  watch:{
    //监听取消原因字数，最多100字，超出提示
    showTexArea(newV){
      if (newV.length > 100) {
        newV = newV.slice(0, 100)
        this.$nextTick(() => {
          this.showTexArea = newV
        })
      }
      this.haveNum = newV.length
    }
  },
  methods: {
    setHeaderTitle() {
      this.title = this.$route.meta.name;
    },
    callPhone(tel) {
      window.location.href = "tel:" + tel;
    },
    gotoOrderInfo(orderId) {
      this.$router.push({
        path: "/order-info",
        query: {
          orderId: orderId
        }
      });
    },
    // 取消订单
    cancelOrder() {
      this.cancelSHowFlag = true;
    },
    //隐藏取消订单弹框
    hideCancelOrder() {
      this.cancelSHowFlag = false;
    },
    // 确认取消
    sureCancelOrder(orderId,type) {
      this.showToastFlag = true;
      let that = this,
        params = {
          orderId: orderId,
          cancelType: type == 1?'2':that.cancelResultFlag.toString(),
          cancelReason: type == 1?'订单超时，无司机接单，自动取消':that.showTexArea,
          orderStatus: type == 1?80:81
        };
        //去除取消说明
        // if(!type){
        //   if (!that.showTexArea) {
        //     this.showToastFlag = false;
        //     that.$toast("请填写取消说明", 3000, 4);
        //     return;
        //   }
        // }

      cancelOrder(params).then(res => {
        if (res.header.code == "10000000") {
          that.showToastFlag = false;
          that.cancelSHowFlag = false;
          that.showTexArea = "";
            that.$toast("取消成功", 2000, 1);
            setTimeout(()=>{
              //返回小程序取送车订单页
              wx.miniProgram.reLaunch({url: '/pages/maintainFirst/maintainFirst'})
            },1000)
        } else {
          that.showToastFlag = false
          let msg = res.header.message;
          that.$toast(msg, 3000, 2,res.header.code);
        }
      });
    },
    // 取消原因选择
    cancelResultChange() {
      let that = this;
      $("#cancelResultChange .cancel-radio").each(function() {
        $(this).click(function() {
          that.cancelResultFlag = $(this).index();
          $(this)
            .addClass("cancel-on")
            .siblings()
            .removeClass("cancel-on");
        });
      });
    },
    //初始化地图
    initMap() {
      // 创建地图实例
      var map = new AMap.Map("mapOrderContainer", {
        zoom: 15,
        resizeEnable: true
      });
      this.map = map;
    },
    //渲染路线规划
    showRoadLine() {
      let that = this,
        // orderStatus == 40 || 41 || 50  起始点取司机的位置   终点就是订单的起点位置   50时终点就是订单的终点
        startLat =
          that.orderStatus == 40 ||
          that.orderStatus == 41 ||
          that.orderStatus == 50
            ? that.driverPositionLat
            : that.orderStartLat, //起点纬度
        startLng =
          that.orderStatus == 40 ||
          that.orderStatus == 41 ||
          that.orderStatus == 50
            ? that.driverPositionLng
            : that.orderStartLng, //起点经度
        endLat =
          that.orderStatus == 40 || that.orderStatus == 41
            ? that.orderStartLat
            : that.orderEndLat, //终点纬度
        endLng =
          that.orderStatus == 40 || that.orderStatus == 41
            ? that.orderStartLng
            : that.orderEndLng; //终点经度
      console.log('---------------------------------------------------------------')
      console.log("订单状态为40、41、50时起点为司机位置："+that.orderStatus)
     
      console.log('---------------------------------------------------------------')
      console.log("原来订单的起点纬度："+that.orderStartLat)
      console.log("原来订单的起点经度："+that.orderStartLng)
      console.log('---------------------------------------------------------------')
      console.log("原来订单的终点纬度："+that.orderEndLat)
      console.log("原来订单的终点经度："+that.orderEndLng)
      console.log('---------------------------------------------------------------')
      console.log("司机位置的纬度："+that.driverPositionLat)
      console.log("司机位置的经度："+that.driverPositionLng)
      console.log("路径规划的起点纬度："+startLat)
      console.log("路径规划的起点经度："+startLng)
      console.log('---------------------------------------------------------------')
      console.log("路径规划的终点纬度："+endLat)
      console.log("路径规划的终点经度："+endLng)
      console.log('---------------------------------------------------------------')
      //构造路线导航类
      AMap.plugin("AMap.Driving", function() {
        var driving = new AMap.Driving({
          map: that.map,
          policy: "AMap.DrivingPolicy.LEAST_FEE" //驾车策略---最经济模式
        });

        driving.search(
          new AMap.LngLat(startLng, startLat), //起点经纬度
          new AMap.LngLat(endLng, endLat), //终点经纬度
          function(status, result) {
            if (status === "complete") {
              // log.success('绘制驾车路线完成')
            } else {
              // log.error('获取驾车数据失败：' + result)
            }
          }
        );
      });
    },
    //精确定位
    precisePositioning() {
      const self = this;
      AMap.plugin("AMap.Geolocation", function() {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 6000, //超过10秒后停止定位，默认：5s
          showCircle: false,
          showButton: false,
          showMarker: true
        });

        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);

        function onComplete(data) {
          self.map.panTo(data.position);
          console.log("定位成功信息：", data);
        }

        function onError(data) {
          // 定位出错
          console.log("定位失败错误：", data);
        }
      });
    },
    //初始化司机实时位置
    driverPosition(orderId) {
      console.log("接收到的订单号：" + orderId);
      let that = this,
        params = {
          orderId: orderId
        };
      driverPosition(params).then(res => {
        if (res.header.code == "10000000") {
          if (res.body && res.body.positions && res.body.positions.length > 0) {
            that.driverPositionLat =
              res.body.positions[res.body.positions.length - 1].lat; //取最后的坐标
            that.driverPositionLng =
              res.body.positions[res.body.positions.length - 1].lng; //取最后的坐标
            that.driverEta = res.body.eta;
          } else {
            that.driverPositionLat = "";
            that.driverPositionLng = "";
            that.driverEta = "";
          }
          //获取司机位置成功开始绘制路线
          that.showRoadLine();
        } else {
          let msg = res.header.message;
          that.$toast(msg, 3000, 2,res.header.code);
        }
      });
    },
    // 查询用户进行中的订单
    processings(type,frameNums) {
      let that = this;
      let frameNum = that.$route.query.frameNum
        ? that.$route.query.frameNum
        : localStorage.getItem("localVinNo");
      let params = {
        frameNum: frameNum
      };
      if(type == 5){
        params.frameNum = frameNums
      }
      processing(params).then(res => {
        if (res.header.code == "10000000") {
          // 如果不存在进行中订单直接返回到小程序订单页
          if(res.body.isHave == 0) {
            setTimeout(()=>{
              alert('当前没有进行中的订单，点击确定返回')
              wx.miniProgram.reLaunch({url: '/pages/maintainFirst/maintainFirst'})
            },1000)
            return
          }
          //对订单数据赋值
          that.orderStartLat = res.body.startLat; //起点纬度
          that.orderStartLng = res.body.startLng; //起点经度
          that.orderEndLat = res.body.endLat; //终点纬度
          that.orderEndLng = res.body.endLng; //终点经度
          that.carNumber = res.body.carNum; //车牌号
          that.orderStatus = res.body.orderStatus; //订单状态
          that.estimateTime = res.body.estimateTime; //预估时间
          that.estimateMileage = res.body.estimateMileage; //预估里程
          that.orderId = res.body.orderId; //订单id
          that.driverHeader = res.body.driverHeadUrl; //司机头像
          that.driverName = res.body.driverName; //司机姓名
          that.driverTel = res.body.driverMob; //司机手机号

          let orderReceiveTime = res.body.assignTime; //距离待派单时间
          let orderLeftTime = parseInt(res.body.timeLeft / 1000); //待接单时间

          if (
            res.body.driverHeadUrl &&
            res.body.driverHeadUrl != "www.baidu.com"
          ) {
            that.driverHeaderFlag = true;
          } else {
            that.driverHeaderFlag = false;
          }

          //待派单显示倒计时
          if (res.body.orderStatus == 20) {
            that.receiveTime = "--";
            timereceiveTime = setInterval(() => {
              orderReceiveTime--;
              if (orderReceiveTime <= 0) {
                clearInterval(timereceiveTime);
                that.timeMove = '0'
                return
                //超时执行取消订单
              }
              that.receiveTime = that.common.timeStamp(orderReceiveTime);
            }, 1000);
          }

          // 待接单显示倒计时
          if (res.body.orderStatus == 30) {
            that.timeMove = "--";
            timeSel = setInterval(() => {
              orderLeftTime--;
              if (orderLeftTime <=0) {
                clearInterval(timeSel);
                that.timeMove = '0'
                // //超时执行取消订单
                // that.sureCancelOrder(res.body.orderId,1)
                return
              }
              that.timeMove = that.common.timeStamp(orderLeftTime);
            }, 1000);
          }
          //待审核、待接单、待派单不走司机位置接口
          if (
            res.body.orderStatus == 10 ||
            res.body.orderStatus == 20 ||
            res.body.orderStatus == 30
          ) {
            that.showRoadLine();
          } else {
            console.log("订单号：" + res.body.orderId);
            if(res.body.orderStatus == 60 || res.body.orderStatus == 61 || res.body.orderStatus == 70){
                //待付款、已完成走司机轨迹接口
                that.driverLineArrs(res.body.orderId)
                setTimeout(()=>{
                  //获取实际费用
                  that.feeMoney(res.body.orderId,2)
                },2000)
            }else{
              //待取车、待交车走司机位置接口
              //延迟5s查询司机位置
              setTimeout(()=>{
                that.driverPosition(res.body.orderId);
              },5000)
            }
          }
          that.initHide = true;
        } else {
          that.initHide = false;
          let msg = res.header.message;
          that.$toast(msg, 3000, 2,res.header.code);
        }
      });
    },
    //实时费用
    feeMoney(orderIds,type){
      let that = this,
          params={
            orderId:orderIds,
            type:type
          }
      fee(params).then(res=>{
        if(res.header.code == "10000000"){
          that.actualMileage=res.body.distance?res.body.distance:'--'//实际里程

          that.orderMoney = res.body.totalFee?'￥'+res.body.totalFee:'--'//实际金额
        }else {
          let msg = res.header.message;
          that.$toast(msg,3000,2,res.header.code)
        }
      })
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
            //调整数据格式   如果存在数据就显示轨迹，不存在 不渲染
            let driverListArrData =res.body.locationList
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
              that.precisePositioning()
              that.$toast('未查询到司机的驾驶轨迹', 3000, 4);
            }
          }
        } else {
          that.precisePositioning()
          let msg = res.header.message;
          that.$toast(msg, 3000, 2,res.header.code);
        }
      })
    },
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
    //控制用户刷新操作
    resetEvents(){
      this.resetFlag = !this.resetFlag
      this.timeover()
      if (timeSel) {
        clearInterval(timeSel);
      }
      if (timereceiveTime) {
        clearInterval(timereceiveTime);
      }
      if (
        this.orderStatus == 40 ||
        this.orderStatus == 41 ||
        this.orderStatus == 50 ||
        this.orderStatus == 60 ||
        this.orderStatus == 61
      ) {
        //清除地图所有覆盖物
        this.map.clearMap();
      }
      if(this.$route.query.enterFign && this.$route.query.enterFign == 5){
        this.urlDestrs()
      }else{
        //用户进行中订单
        this.processings();
      }
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
          strokeWeight: 6,      //线宽
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
          gtmcuid = that.$route.query.gtmcuid?that.$route.query.gtmcuid:'',
          vinNo = that.$route.query.frameNum?that.$route.query.frameNum:'',
          applyNumber = that.$route.query.applyNumber?that.$route.query.applyNumber:'',
          telNo	 = that.$route.query.telNo?that.$route.query.telNo:'',
          orderId	 = that.$route.query.orderId?that.$route.query.orderId:"",
          params={
            gtmcuid:gtmcuid,
            vin:vinNo,
            applyNumber:applyNumber,
            telNo:telNo,
            orderId:orderId
          }
      urlDestr(params).then(res=>{
        if(res.header.code == '10000000'){
          //获取车架号
          that.desFrameNum = res.body.vin
           let gtmcUid = res.body.gtmcuid
           that.getUserInfo(gtmcUid,that.$route.query.enterFign,res.body.vin)
        }else{
          let msg = res.header.message
          that.$toast(msg,3000,2,1,res.header.code)
        }
      })
    },
     // 查询广丰用户信息
    getUserInfo(gtmcUid,enterFign,frameNum){
      let that = this,
          params = {
            gtmcUid:gtmcUid,
            enterFign:enterFign,
            frameNum:frameNum
          }
      getUserInfo(params).then(res=>{
        if(res.header.code == '10000000'){
            localStorage.setItem('localToken',res.body.token)//用户token
            console.log("用户token："+localStorage.getItem('localToken'))
            that.processings(5,that.desFrameNum)
        }else{
          let msg = res.header.message
          that.$toast(msg,3000,2)
        }
      })
    }
  },
  mounted() {
    let that = this;
    // 只用于初始化显示地图背景
    that.initMap();

    //入口5进来进行解密操作
    if(this.$route.query.enterFign && this.$route.query.enterFign == 5){
      console.log(window.location.href)
      this.urlDestrs()
    }else{
      //用户进行中订单
      this.processings();
    }
    
    this.setHeaderTitle();
    //取消
    this.cancelResultChange();
    // 30秒刷新一次页面 定时器要销毁
    timeOut = setInterval(() => {
      if (timeSel) {
        clearInterval(timeSel);
      }
      if (timereceiveTime) {
        clearInterval(timereceiveTime);
      }
      if(that.orderStatus == 40 || that.orderStatus == 41 || that.orderStatus == 50 || that.orderStatus == 60 || that.orderStatus == 61){
        that.map.clearMap();
      }
      if(that.$route.query.enterFign && that.$route.query.enterFign == 5){
        that.urlDestrs()
      }else{
        //用户进行中订单
        that.processings();
      }
    }, 30000);
    //70-已完成 清除定时器
    if(that.orderStatus ==70){
      clearInterval(timeOut);
    }
  },
  beforeDestroy() {
    // 组件销毁清空定时器
    clearInterval(timeOut);
    clearInterval(timeSel);
    clearInterval(timereceiveTime);
    this.orderStatus = "";
  }
};
</script>
<style lang='less' scoped>
#mapOrderContainer {
  width: 100vw;
  height: 100vh;
}
#mapOrder {
  width: 100%;
  height: 100vh;
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
#showWaitingTips,
.showWaitingTips {
  top: -25px;
  width: 335px;
  height: 45px;
  line-height: 43px;
  background: url("../../../../static/images/waiting-tips.png") no-repeat top
    center;
  background-size: cover;
}
#cancelMask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;

  background: #000;
  opacity: 0.4;
  z-index: 2;
}
#cancelInfo {
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -157px;
  margin-top: -163px;
  width: 314px;
  height: 326px;
  background: #fff;
  overflow: hidden;
  z-index: 2;
  border-radius: 6px;
  // transition: all 1s;
  // -webkit-transition: all 1s;
  .cancel-title-tips img {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 5px;
  }
}
.cancel-radio .cancel-radio-bg {
  width: 15px; /*no*/
  height: 15px; /*no*/
  background: url("../../../../static/images/radio1.png") no-repeat center
    center;
  background-size: cover;
}
.cancel-radio.cancel-on .cancel-radio-bg {
  background: url("../../../../static/images/radio.png") no-repeat center center;
  background-size: cover;
}
#cancelContent {
  padding-left: 10px;
  padding-top: 5px;
  padding-right: 10px;
  margin-top: 15px;
  width: 100%;
  height: 70px;
  outline: 0;
  border-radius: 2px;
  border: 1px solid #e1e4ea;
  resize: none;
}
.mask-cancel-btns {
  position: absolute;
  left: 0px;
  bottom: 0px;
  width: 100%;
  height: 46px;
  border-top: 1px solid #e1e4ea;
  div {
    font-weight: bold;
    height: 46px;
    line-height: 46px;
  }
}
#dingweiBtn {
  position: absolute;
  top: -80px;
  right: 0;
  width: 60px;
  height: 60px;
  background: url("../../../../static/images/position.png") no-repeat center
    center;
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
.haveNum{
  bottom:8px;
  right: 3px;
  color: #bebcbc;
  font-size: 10px;
}
</style>
