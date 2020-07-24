<template>
  <div id="home">
    <div id="content">
      <!-- 地图背景 -->
      <div id="container"></div>

      <!-- 调试用信息 -->
      <!-- <div id="showEnterFign" class="tx-l">
      <p>入口类型enterFign：{{showEnterFign}}</p>
      <p>预约单号：{{showApplyNumber}}</p>
      </div>-->

      <!-- 存在进行中的订单则显示 -->
      <div
        id="showMyOrder"
        class="f15 bgwhite mg-auto fb"
        v-show="showMyOrder"
        @click="gotoMapOrder"
      >当前有进行中的订单，点击查看</div>
      <!-- 切换tab -->
      <div id="tabs" class="tabs">
        <div @click="precisePositioning" id="dingweiBtn"></div>
        <div class="tab-item flex justify-content_flex-start f15">
          <div class="tab-item-btn active pos-re" id="tab-item-btn1" v-show="showTab1">
            <div class="tab-btn">上门取车</div>
            <div class="tab-mask pos-abs" v-show="tabMask"></div>
          </div>
          <div class="tab-item-btn pos-re" id="tab-item-btn2" v-show="showTab2">
            <div class="tab-btn">送车上门</div>
            <div class="tab-mask pos-abs" v-show="tabMask2"></div>
          </div>
        </div>
        <!-- 取车时显示 -->
        <div class="showAddress pos-re" v-show="showGetCarInput">
          <div class="pos-abs order-btn" @click="gotoOrderList"></div>
          <div class="address-input-out">
            <div class="flex justify-content_flex-start align-items_center">
              <div class="address-input-img"></div>
              <div class="address-input" @click="gotoCity">
                <span class="qidian">起点</span>
                <input
                  type="text"
                  v-model="userSelectAddress"
                  :data-lat="userSelectAddressLat"
                  :data-lng="userSelectAddressLng"
                  class="ov-e"
                  readonly
                />
              </div>
            </div>
            <div class="flex justify-content_flex-start align-items_center mt20">
              <div class="address-input-img address-input-img2"></div>
              <div class="address-input">
                <span class="zhongdian">终点</span>
                <input type="text" placeholder="门店地址" readonly v-model="dealerName" />
              </div>
            </div>
          </div>
          <div class="submit-btn-out">
            <div class="submit-btn-mask" v-show="showNextBtn"></div>
            <div class="pos-abs submit-btn white f20" @click="gotoOrderAdd">下一步</div>
          </div>
        </div>
        <!-- 送车时显示 -->
        <div class="showAddress pos-re" v-show="showSendCarInput">
          <div class="pos-abs order-btn" @click="gotoOrderList"></div>
          <div class="address-input-out">
            <div class="flex justify-content_flex-start align-items_center">
              <div class="address-input-img"></div>
              <div class="address-input">
                <span class="qidian">起点</span>
                <input type="text" placeholder="门店地址" readonly v-model="dealerName" />
              </div>
            </div>
            <div class="flex justify-content_flex-start align-items_center mt20">
              <div class="address-input-img address-input-img2"></div>
              <div class="address-input" @click="gotoCity">
                <span class="zhongdian">终点</span>
                <input
                  type="text"
                  v-model="userSelectAddress"
                  :data-lat="userSelectAddressLat"
                  :data-lng="userSelectAddressLng"
                  class="ov-e"
                  readonly
                />
              </div>
            </div>
          </div>
          <div class="submit-btn-out">
            <div class="submit-btn-mask" v-show="showNextBtn"></div>
            <div class="pos-abs submit-btn white f20" @click="gotoOrderAdd">下一步</div>
          </div>
          <!-- <div class="pos-abs submit-btn white f20" @click="gotoOrderAdd">下一步</div> -->
        </div>
      </div>
      <!-- 定位失败提示 -->
      <div id="dingweiErr" v-show="dingweiErrFlag">
        <div id="mask"></div>
        <div id="showErrTips" class="ov-h">
          <div class="f16 mt30 mb20">提示</div>
          <div class="f13 mb30 test">不能获取您的位置信息，请检查GPS与网络设置。</div>
          <div id="dingweiErrBtn" class="fb f16" @click="dingweiErrFlag = !dingweiErrFlag">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/*
 *  https://test.icheyou.net/h5-fetchcar/#/?enterFign=1&arNo=车牌号&carName=车型&vin=车架号&custTel=电话&applyNumber=预约单号
 *
 *
 * https://iclub-padstest.gtmc.com.cn:8081/h5-pads/#/?aid=10000275&applyNumber=1551858665582174868&custTel=15602268226&dealerCode=44A10&gtmcuid=939252&carName=%25E7%25AC%25AC7%25E4%25BB%25A3%25E5%2587%25AF%25E7%25BE%258E%25E7%2591%259E&carNo=%25E6%2588%2591%25E7%259A%2584%25E7%2588%25B1%25E8%25BD%25A6&vin=LVGBM51K4FG583700&enterFign=1
 *
 *
 *
 *   小程序入口： 取车  enterFign：1    送车不可以点击
 *               送车  enterFign：2    需要判断取送车哪个可用
 *               取送车  enterFign：3    需要判断取送车哪个可用
 *               代驾取车服务  enterFign：4
 *
 */
import axios from "axios";
import AMap from "AMap";
import {
  getUserInfo,
  processing,
  checkServiceType,
  urlDestr,
  estimate,
  latestOrder,
  activityAuth
} from "../../../commonJs/api";
export default {
  data() {
    return {
      map: null,
      enterFign: 0, //记录入口
      showMyOrder: false, //记录是否显示进行中的订单
      showTabSatus: 0, //记录切换选项卡状态     0：上门取车    1：送车上门
      userSelectAddress: "", //记录用户可以选择的地址信息
      userSelectAddressLat: "", //记录用户可以选择的地址经度
      userSelectAddressLng: "", //记录用户可以选择的地址纬度
      dingweiErrFlag: false, //定位失败开关
      newCenter: null,
      saveTypeId: localStorage.getItem("saveTypeId"),
      tabMask: false, //控制取车tab是否可以点击
      tabMask2: true, //控制送车tab是否可以点击 true:不可点击  false：可以点击
      ss: "",
      dealerName: "", //接口返回的门店名称
      showNextBtn: false,
      orderId: "",
      showGetCarInput: false,
      showSendCarInput: false,
      //记录入口预约单时间
      enterFignTime: "",
      vinNo: "",
      thisDelearCode: "", //存储门店代码
      showTab1: false, //控制取车tab
      showTab2: false, //控制送车tab
      showEnterFign: "", //测试用入口类型
      showApplyNumber: "", //测试用预约单号
      activityAuth: "" //记录是否免单 true（1） 参与   false（0） 不参与
    };
  },
  components: {},
  methods: {
    gotoMapOrder() {
      this.$router.push("/map-order");
    },
    // tab选项卡切换
    checkTabEvents() {
      let that = this;
      $("#tab-item-btn2 .tab-btn").click(function() {
        //送车
        if (
          $(this)
            .parent()
            .hasClass("active")
        ) {
          return;
        }
        $("#tab-item-btn1").removeClass("active");
        $(this)
          .parent()
          .addClass("active");

        that.showSendCarInput = true;
        that.showGetCarInput = false;
        that.tabMask2 = false;
        that.tabMask1 = false;
        localStorage.setItem("saveTypeId", 2);
      });

      $("#tab-item-btn1 .tab-btn").click(function() {
        //取车
        if (
          $(this)
            .parent()
            .hasClass("active")
        ) {
          return;
        }
        $("#tab-item-btn2").removeClass("active");
        $(this)
          .parent()
          .addClass("active");
        that.showGetCarInput = true;
        that.showSendCarInput = false;
        that.tabMask2 = false;
        that.tabMask1 = false;
        localStorage.setItem("saveTypeId", 1);
      });
    },
    //

    // 跳转到订单列表
    gotoOrderList() {
      this.$router.push("/order-list");
    },
    //跳转到城市选择
    gotoCity() {
      this.$router.push({
        path: "/city-search",
        query: { serchAddress: this.userSelectAddress }
      });
    },
    //订单费用估算
    estimates(callback) {
      let that = this;
      let customerTel = localStorage.getItem("localTelNo"), //this.getCarTel
        slat = localStorage.getItem("saveUserSelectAddressLat"), //this.$route.query.selectAddressLat,
        slng = localStorage.getItem("saveUserSelectAddressLng"), //this.$route.query.selectAddressLng,
        elat = localStorage.getItem("localDealerLatitude"), //this.$route.query.iclubStoreLat,
        elng = localStorage.getItem("localDealerLongitude"), //this.$route.query.iclubStoreLng,
        role = 1,
        params = {
          customerTel: customerTel,
          slat: slat,
          slng: slng,
          elat: elat,
          elng: elng,
          role: role
        };
      estimate(params).then(res => {
        if (res.header.code == "10000000") {
          //that.mileage= res.body.mileage
          if (callback) {
            callback(res);
          }
        } else {
          let msg = res.header.message;
          that.$toast(msg, 3000, 2, 1, res.header.code);
        }
      });
    },
    gotoNext() {
      let typeId = this.$route.query.typeId ? this.$route.query.typeId : 0;
      let saveTypeId = localStorage.getItem("saveTypeId");

      this.$router.push({
        path: "/order-add",
        query: {
          getOrSend: saveTypeId, //标记取车还是送车 1 取车  2 送车
          selectAddress: localStorage.getItem("saveUserSelectAddress"),
          selectAddressLat: localStorage.getItem("saveUserSelectAddressLat"),
          selectAddressLng: localStorage.getItem("saveUserSelectAddressLng"),
          iclubStore: localStorage.getItem("localDealerName"),
          iclubStoreLat: localStorage.getItem("localDealerLatitude"),
          iclubStoreLng: localStorage.getItem("localDealerLongitude"),
          applyTime: this.enterFignTime,
          //时间戳格式（临时）
          // applyTime:this.$route.query.applyTime?this.common.timestampToTime(Number(this.$route.query.applyTime)):'0',
          applyNumber: localStorage.getItem("localApplyNumber")
            ? localStorage.getItem("localApplyNumber")
            : "",
          // dealerCode:this.$route.query.dealerCode,
          dealerCode: this.thisDelearCode,

          //入口类型
          enterStatus: this.$route.query.enterFign,
          //是否免单
          activityAuth: this.activityAuth
        }
      });
    },
    //跳转到创建订单
    gotoOrderAdd() {
      let that = this;
      this.estimates(res => {
        let mileage = res.body.mileage;
        let showMessage = "";
        /*       that.showGetCarInput = true;
         that.showSendCarInput = false; */
        if (Number(mileage || 0) > 80 * 1000) {
          // 大于80公里

          if (that.showGetCarInput) {
            //取车服务
            showMessage = `抱歉，本次行程预估超过80公里，请您到预约保养首页更换专属服务店`;
            this.$createDialog({
              type: "alert",
              title: "提示",
              content: showMessage,
              confirmBtn: {
                text: "关闭",
                active: true,
                disabled: false,
                href: "javascript:;"
              },
              /*           cancelBtn: {
            text: '取消',
            active: false,
            disabled: false,
            href: 'javascript:;'
          }, */
              onConfirm: () => {
                /*               //TODO 跳转专属门店变更选择H5页面   这个页面是哪个？
              location.href='https://iclubst.gtmc.com.cn/page/SC0505.html' */
              },
              onCancel: () => {}
            }).show();
          } else {
            // 送车服务
            showMessage = `抱歉，本次行程预估超过80公里，请您选择更近的送达地点`;
            this.$createDialog({
              type: "alert",
              title: "提示",
              content: showMessage,
              confirmBtn: {
                text: "关闭",
                active: true,
                disabled: false,
                href: "javascript:;"
              },
              onConfirm: () => {},
              onCancel: () => {}
            }).show();
          }
        } else {
          //不超过80公里  直接跳转
          that.gotoNext();
        }
      });
    },
    //初始化地图
    initMap() {
      let that = this;
      // 创建地图实例
      let thisLat = localStorage.getItem("saveUserSelectAddressLat");
      let thisLng = localStorage.getItem("saveUserSelectAddressLng");
      if (thisLat && thisLng) {
        var map = new AMap.Map("container", {
          zoom: 15,
          resizeEnable: true,
          center: [thisLng, thisLat]
        });
      } else {
        var map = new AMap.Map("container", {
          zoom: 15,
          resizeEnable: true
        });
      }
      // 地图拖拽选点
      AMapUI.loadUI(["misc/PositionPicker"], function(PositionPicker) {
        var positionPicker = new PositionPicker({
          mode: "dragMap", //设定为拖拽地图模式，可选'dragMap'、'dragMarker'，默认为'dragMap'
          map: map //依赖地图对象
        });
        //TODO:事件绑定、结果处理等
        positionPicker.on("success", function(positionResult) {
          console.log("11111111", positionResult);
          localStorage.setItem(
            "saveUserSelectNearestRoad",
            positionResult.regeocode.pois[0].address
          );
          localStorage.setItem(
            "saveUserSelectAddress",
            positionResult.regeocode.pois[0].name
          );
          that.userSelectAddress = localStorage.getItem(
            "saveUserSelectAddress"
          );
          console.log("定位起点", that.userSelectAddress);

          localStorage.setItem(
            "saveUserSelectAddressLat",
            positionResult.position.lat
          );
          localStorage.setItem(
            "saveUserSelectAddressLng",
            positionResult.position.lng
          );
          that.userSelectAddressLat = localStorage.getItem(
            "saveUserSelectAddressLat"
          );
          that.userSelectAddressLng = localStorage.getItem(
            "saveUserSelectAddressLng"
          );
        });
        positionPicker.on("fail", function(positionResult) {
          that.userSelectAddress = "此位置不可选择，请重新选择";
          that.userSelectAddressLat = "";
          that.userSelectAddressLng = "";
        });
        positionPicker.start();
      });

      this.map = map;
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
    //初始化入口是取车还是送车  enterFign ：  1取车   2需要判断显示  3 需要判断显示   传递的参数需要解码
    initTypeStatus(vinNo) {
      let that = this;
      let enterFign = this.$route.query.enterFign,
        vin = vinNo;
      //初始化存储 入口类型
      localStorage.setItem("saveTypeId", enterFign);

      if (enterFign == 1) {
        //送车不可以点击
        that.showTab1 = true;
        that.showGetCarInput = true;
        that.tabMask2 = true;
        that.enterFignTime = decodeURIComponent(
          this.$route.query.applyTime
        ).substr(0, 16);
      } else {
        //2、3入口走接口判断是取车还是送车
        that.checkServiceTypes(vinNo);
      }
    },
    //url解密
    urlDestrs() {
      let that = this,
        gtmcuid = that.$route.query.gtmcuid,
        vinNo = that.$route.query.vinNo,
        applyNumber = that.$route.query.applyNumber
          ? that.$route.query.applyNumber
          : "",
        telNo = that.$route.query.telNo,
        orderId = that.$route.query.orderId ? that.$route.query.orderId : "",
        params = {
          gtmcuid: gtmcuid,
          vin: vinNo,
          applyNumber: applyNumber,
          telNo: telNo,
          orderId: orderId
        };
      urlDestr(params).then(res => {
        if (res.header.code == "10000000") {
          console.log("解密返回值：" + JSON.stringify(res.body));
          //本地存储车架号，查询进行中的订单以及创建订单页面显示车辆列表
          that.vinNo = res.body.vin;
          localStorage.setItem("localVinNo", res.body.vin); //车架号
          localStorage.setItem(
            "localCarNum",
            decodeURI(that.$route.query.carNum)
          ); //车牌号
          let vehicleList = [
            {
              registerNo: decodeURI(that.$route.query.carNum),
              vinNo: res.body.vin
            }
          ];
          localStorage.setItem("localCarLis", JSON.stringify(vehicleList)); //车辆列表
          localStorage.setItem("localGtmcuid", res.body.gtmcuid);
          if (res.body.applyNumber) {
            localStorage.setItem("localApplyNumber", res.body.applyNumber);
          } else {
            localStorage.setItem("localApplyNumber", "");
          }

          //测试用预约单号
          that.showApplyNumber = res.body.applyNumber;
          if (that.$route.query.enterFign == 1) {
            if (!res.body.applyNumber) {
              alert("预约单号错误");
              return;
            }
          }
          localStorage.setItem("gtmcuid", res.body.gtmcuid);
          let gtmcUid = res.body.gtmcuid;
          let vin = res.body.vin;
          that.getUserInfo(gtmcUid, that.$route.query.enterFign, res.body.vin);
        } else {
          let msg = res.header.message;
          that.$toast(msg, 3000, 2);
        }
      });
    },
    // 查询广丰用户信息
    getUserInfo(gtmcUid, enterFign, frameNum) {
      let that = this,
        params = {
          gtmcUid: gtmcUid,
          enterFign: enterFign,
          frameNum: frameNum
        };
      getUserInfo(params).then(res => {
        if (res.header.code == "10000000") {
          //本地存储用户信息
          localStorage.setItem("localUserId", res.body.userId);
          localStorage.setItem("localTelNo", res.body.telNo);
          localStorage.setItem("localName", res.body.name);
          localStorage.setItem("localDealerCode", res.body.dealerCode); //绑定专属店CD
          localStorage.setItem("localDealerName", res.body.dealerName); //门店名称
          localStorage.setItem("localDealerRel", res.body.dealerRel); //门店联系人电话
          localStorage.setItem("localDealerAddress", res.body.dealerAddress); //门店地址
          localStorage.setItem(
            "localDealerLongitude",
            res.body.dealerLongitude
          ); //门店经度
          localStorage.setItem("localDealerLatitude", res.body.dealerLatitude); //门店纬度
          localStorage.setItem(
            "localDealerServicePhone",
            res.body.dealerServicePhone
          ); //门店电话
          localStorage.setItem("localToken", res.body.token); //用户token
          // localStorage.setItem('localCarLis',JSON.stringify(res.body.vehicleList))//车辆列表
          that.dealerName = res.body.dealerName;
          console.log("用户token：" + localStorage.getItem("localToken"));
          //判断用户是否可以免单
          that.activityAuths(res.body.telNo);
          that.initTypeStatus(frameNum);
          that.processings(frameNum);
        } else {
          let msg = res.header.message;
          that.$toast(msg, 3000, 2);
        }
      });
    },
    // 查询用户进行中的订单
    processings(frameNum) {
      let that = this;
      let params = {
        frameNum: frameNum
      };
      processing(params).then(res => {
        if (res.header.code == "10000000") {
          //入口一的预约时间在此判断，入口二在业务类型接口判断
          // 如果 applyTime小于当前时间
          if (that.$route.query.enterFign == 1) {
            if (
              new Date(that.enterFignTime.replace(/-/g, "/")).getTime() <
              new Date().getTime()
            ) {
              setTimeout(() => {
                alert(
                  "抱歉，您的保养预约单已经过期，请先取消原保养预约单，重新下单"
                );
              }, 1000);
              setTimeout(() => {
                wx.miniProgram.navigateTo({
                  url: "/pages/maintainFirst/maintainFirst"
                });
              }, 1000);
              return;
            }
          }

          if (res.body.isHave == 1) {
            that.showMyOrder = true;
            //根据标记跳转
            if (localStorage.getItem("hashFlag") == 1) {
              //跳转
              setTimeout(() => {
                that.gotoMapOrder();
              }, 2000);
            }
          } else {
            that.showMyOrder = false;
            that.showMyOrder = false;
          }
        } else {
          let msg = res.header.message;
          that.$toast(msg, 3000, 2);
        }
      });
    },
    // 业务类型判断
    checkServiceTypes(vinNo) {
      let that = this,
        params = {
          applyNumber: localStorage.getItem("localApplyNumber")
            ? localStorage.getItem("localApplyNumber")
            : "", //预约单号
          applyTime: "", //预约时间	yyyy-MM-dd HH:mm:ss
          custTel: localStorage.getItem("localTelNo"), //手机号
          dealerCode: localStorage.getItem("localDealerCode"), //销售门店代码
          dealerName: localStorage.getItem("localDealerName"), //销售门店名称
          gtmcuid: localStorage.getItem("localGtmcuid"), //统一id
          carModel: that.$route.query.carModel
            ? decodeURI(that.$route.query.carModel)
            : "", //车型名称
          carNum: that.$route.query.carNum
            ? decodeURI(that.$route.query.carNum)
            : "", //车牌号
          vinNo: vinNo, //车架号
          enterFign: that.$route.query.enterFign, //入库类型
          serviceType:
            that.$route.query.enterFign == 3 ? 2 : that.$route.query.serviceType //业务类型
        };
      checkServiceType(params).then(res => {
        if (res.header.code == "10000000") {
          localStorage.setItem("localApplyNumber", res.body.applyNumber);
          // 如果 applyTime小于当前时间
          if (res.body.applyTime) {
            if (
              new Date(res.body.applyTime.replace(/-/g, "/")).getTime() <
              new Date().getTime()
            ) {
              setTimeout(() => {
                alert(
                  "抱歉，您的保养预约单已经过期，请先取消原保养预约单，重新下单"
                );
              }, 1000);
              setTimeout(() => {
                wx.miniProgram.navigateTo({
                  url: "/pages/maintainFirst/maintainFirst"
                });
              }, 1000);
            }
          }

          let takeCarFlag = res.body.takeCarFlag; //上门取车标识	0能 1不能
          let sendCarFlag = res.body.sendCarFlag; //送车上门标识 0能 1不能
          if (takeCarFlag == 0 && sendCarFlag == 0) {
            //取送车都可以
            that.showTab1 = true;
            that.showTab2 = true;
            that.showGetCarInput = true;
            that.showSendCarInput = false;
            that.tabMask2 = false;
            that.tabMask = false;
            $("#tab-item-btn1").addClass("active");
            $("#tab-item-btn2").removeClass("active");
          }
          if (takeCarFlag == 0 && sendCarFlag == 1) {
            //只能取车
            that.showTab1 = true;
            that.showGetCarInput = true;
            that.showSendCarInput = false;
            that.tabMask2 = true;
            that.tabMask = true;
            $("#tab-item-btn1").addClass("active");
            $("#tab-item-btn2").removeClass("active");
            localStorage.setItem("saveTypeId", 1);
            that.enterFignTime = res.body.applyTime.substr(0, 16);
          }
          if (takeCarFlag == 1 && sendCarFlag == 0) {
            //只能送车
            that.showTab2 = true;
            that.showGetCarInput = false;
            that.showSendCarInput = true;
            that.tabMask = true;
            that.tabMask2 = true;
            $("#tab-item-btn2").addClass("active");
            $("#tab-item-btn1").removeClass("active");
            localStorage.setItem("saveTypeId", 2);
          }
          if (takeCarFlag == 1 && sendCarFlag == 1) {
            //不能取车不能送车
            that.showTab1 = true;
            that.showNextBtn = true;
            that.tabMask = true; //控制取车tab是否可以点击
            that.tabMask2 = true; //控制送车tab是否可以点击
            that.showGetCarInput = true;
            that.showSendCarInput = false;
            $("#tab-item-btn1").addClass("active");
            $("#tab-item-btn2").removeClass("active");
            setTimeout(() => {
              if (that.$route.query.enterFign == 3) {
                alert(
                  "抱歉，没有查询到您的车辆30天内工单，暂时不能提供送车服务。"
                );
              } else if (that.$route.query.enterFign == 2) {
                alert(
                  "抱歉，没有查询到您的车辆30天内待保养预约单，暂时不能提供取车服务。"
                );
              } else {
                alert("您不能进行取送车服务。");
              }
            }, 1000);
            setTimeout(() => {
              wx.miniProgram.navigateTo({
                url: "/pages/maintainFirst/maintainFirst"
              });
            }, 1000);
          }
        } else {
          that.showNextBtn = true;
          that.tabMask = true; //控制取车tab是否可以点击
          that.tabMask2 = true; //控制送车tab是否可以点击
          if (that.$route.query.serviceType == 2) {
            //入口2进来 无法取送车时  默认显示送车
            that.showGetCarInput = false;
            that.showSendCarInput = true;
            $("#tab-item-btn2").addClass("active");
            $("#tab-item-btn1").removeClass("active");
          }
          if (that.$route.query.serviceType == 1) {
            //入口3进来 无法取送车时  默认显示取车
            that.showGetCarInput = true;
            that.showSendCarInput = false;
            $("#tab-item-btn1").addClass("active");
            $("#tab-item-btn2").removeClass("active");
          }
          let msg = res.header.message;
          that.$toast(msg, 3000, 2);
        }
      });
    },
    getLatestOrder() {
      let that = this;
      let createTime = decodeURIComponent3(this.$route.query.createTime);
      let param = {
        startTime: "",
        endTime: "",
        vinNo: ""
      };
      latestOrder(param).then(res => {
        if (res.header.code == "10000000") {
          let orderId = res.body.orderId;
          if (orderId) {
            that.$router.push({
              path: "/order-info",
              query: {
                orderId: orderId
              }
            });
          } else {
          }
        } else {
          let msg = res.header.message;
          that.$toast(msg, 3000, 2);
        }
      });
    },
    activityAuths(customerTel) {
      let params = {
        customerTel: customerTel
      };
      activityAuth(params).then(res => {
        if (res.header.code == "10000000") {
          console.log(res.body.list.length);
          if (res.body.list.length > 0) {
            localStorage.setItem(
              "activityAuthLis",
              JSON.stringify(res.body.list)
            );
            this.activityAuth = 1; //免单
          } else {
            localStorage.setItem("activityAuthLis", "");
            this.activityAuth = 0; //不免单
          }
        } else {
          let msg = res.header.message;
          this.$toast(msg, 3000, 2);
        }
      });
    }
  },
  created() {
    // this.urlDestrs();
  },
  mounted() {
    let urlDealerCode = this.$route.query.dealerCode;
    if (urlDealerCode instanceof Array) {
      //数组
      this.thisDelearCode = urlDealerCode[0];
    } else {
      this.thisDelearCode = urlDealerCode;
    }
    console.log(urlDealerCode);
    // this.initTypeStatus();
    this.urlDestrs();
    //  this.checkServiceTypes();
    this.checkTabEvents();

    this.initMap();
    if (localStorage.getItem("chooseAddress") != 1) {
      this.precisePositioning();
    }
    console.log(window.location.href);
    this.showEnterFign = this.$route.query.enterFign;
  },
  beforeRouteEnter(to, from, next) {
    if (from.path == "/") {
      localStorage.setItem("hashFlag", 1);
    } else {
      //不跳转
      localStorage.setItem("hashFlag", 0);
    }
    next();
  },
  // 离开当前路由，清除信息
  beforeRouteLeave(to, from, next) {
    // localStorage.removeItem("saveUserSelectAddress");
    // localStorage.removeItem("saveUserSelectAddressLat");
    // localStorage.removeItem("saveUserSelectAddressLng");
    //记录用户选择地址
    localStorage.removeItem("chooseAddress");
    next();
  }
};
</script>
<style lang='less' scoped>
#container {
  width: 100vw;
  height: 100vh;
}
#content {
  height: 100vw;
  height: 100vh;
  overflow: hidden;
  #showMyOrder {
    position: fixed;
    top: 20px;
    left: 0;
    right: 0;
    margin: auto;
    width: 260px;
    height: 36px;
    line-height: 36px;
    border-radius: 24px;
  }
  #tabs {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 18px;
    margin: auto;
    width: 335px;
    height: 237px;
    .tab-item {
      height: 36px;
      .tab-item-btn {
        margin-left: 12px;
        width: 108px;
        height: 100%;
        line-height: 36px;
        color: #fff;
        background: url("../../../../static/images/home-tab-bg.png") no-repeat
          top center;
        background-size: cover;
        opacity: 0.6;
        display: none;
        &.active {
          opacity: 1;
          display: block;
        }
      }
    }
    .showAddress {
      position: relative;
      top: -6px;
      height: 167px;
      background: url("../../../../static/images/home-tab-bg2.png") no-repeat
        top center;
      background-size: cover;
      .order-btn {
        right: -2px;
        top: -30px;
        width: 80px;
        height: 80px;
        background: url("../../../../static/images/home-order-btn.png")
          no-repeat top center;
        background-size: cover;
      }
      .address-input-out {
        position: absolute;
        left: 0;
        right: 0;
        top: 35px;
        width: 300px;
        margin: auto;
        .address-input-img {
          margin-right: 10px;
          width: 21px;
          height: 20px;
          background: url("../../../../static/images/address.png") no-repeat top
            center;
          background-size: cover;
        }
        .address-input-img.address-input-img2 {
          background: url("../../../../static/images/address2.png") no-repeat
            top center;
          background-size: cover;
        }
        .address-input {
          border-bottom: 1px solid #e3e5eb;
          input {
            padding: 0;
            display: inline-block;
            width: 230px;
            height: 25px;
            border-radius: 0;
            outline: none;
            border: 0;
            font-size: 15px;
            background: transparent;
          }
        }
      }
      .submit-btn {
        right: 0;
        left: 0;
        bottom: -30px;
        margin: auto;
        width: 289px;
        height: 66px;
        line-height: 66px;
        background: url("../../../../static/images/submit-btn.png") no-repeat
          top center;
        background-size: cover;
      }
    }
  }
}
#mask,
#dingweiErr {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10000;
}
#mask {
  background: #000;
  opacity: 0.4;
}
#showErrTips {
  position: fixed;
  left: 0;
  right: 0;
  top: 50%;
  margin: auto;
  margin-top: -78px;
  width: 316px;
  height: 156px;
  border-radius: 6px;
  background: #fff;
  z-index: 10001;
  .test {
    margin-left: 10px;
    margin-right: 10px;
    line-height: 20px;
  }
  #dingweiErrBtn {
    height: 45px;
    line-height: 45px;
    border-top: 1px solid #e1e4ea;
  }
}
.tab-mask {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.submit-btn-out {
  .submit-btn-mask {
    position: absolute;
    right: 0;
    left: 0;
    bottom: -0.8rem;
    margin: auto;
    width: 289px;
    height: 66px;
    z-index: 2;
    border-radius: 30px;
    background: #fff;
    opacity: 0.3;
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
.qidian,
.zhongdian {
  display: inline-block;
  font-size: 10px;
  color: #d5d5d5;
}
//测试用
#showEnterFign {
  position: absolute;
  left: 0;
  top: 0;
  font-size: 13px;
  z-index: 9999;
  background: #fff;
  padding: 10px;
}
</style>
<style>
.cube-popup-content {
  background-color: #fff !important;
}
</style>
