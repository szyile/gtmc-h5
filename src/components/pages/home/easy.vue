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
      <!-- <div
        id="showMyOrder"
        class="f15 bgwhite mg-auto fb"
        v-show="showMyOrder"
        @click="gotoMapOrder"
      >当前有进行中的订单，点击查看</div> -->
      <!-- 切换tab -->
      <div id="tabs" class="tabs">
        <div @click="precisePositioning" id="dingweiBtn"></div>
        <div class="tab-item flex justify-content_flex-start f15">
          <div
            :class="['tab-item-btn', 'pos-re', showTabIndex == 0 ?'active':'']"
            @click="showTabIndex=0"
          >
            <div class="tab-btn">上门取车</div>
            <div class="tab-mask pos-abs"></div>
          </div>
          <div
            :class="['tab-item-btn', 'pos-re', showTabIndex == 1 ?'active':'']"
            @click="showTabIndex=1"
          >
            <div class="tab-btn">送车上门</div>
            <div class="tab-mask pos-abs"></div>
          </div>
        </div>
        <!-- 取车时显示 -->
        <div class="showAddress pos-re" v-show="showTabIndex == 0">
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
              <div class="address-input" @click="gotoShop"> 
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
        <div class="showAddress pos-re" v-show="showTabIndex == 1">
          <div class="pos-abs order-btn" @click="gotoOrderList"></div>
          <div class="address-input-out">
            <div class="flex justify-content_flex-start align-items_center">
              <div class="address-input-img"></div>
              <div class="address-input" @click="gotoShop">
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
      <!-- 未绑定门店提示 -->
      <div id="dingweiErr" v-show="isShowBind">
        <div id="mask"></div>
        <div id="showErrTips" class="ov-h">
          <div class="f16 mt30 mb20">提示</div>
          <div class="f13 mb30 test">您还没有绑定专属门店，请先绑定专属门店。</div>
          <div id="dingweiErrBtn" class="fb f16">
            <div class="bbt l" @click="isShowBind=false">取消</div>
            <div class="bbt r" @click="isShowBind=false">去绑定</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      ss: "",
      dealerName: "", //接口返回的门店名称
      showNextBtn: false,
      orderId: "",
      //记录入口预约单时间
      enterFignTime: "",
      vinNo: "",
      thisDelearCode: "", //存储门店代码
      showTabIndex: 0, //控制取车tab
      showEnterFign: "", //测试用入口类型
      showApplyNumber: "", //测试用预约单号
      activityAuth: "", //记录是否免单 true（1） 参与   false（0） 不参与
      isShowBind: true // 是否显示未绑定门店的弹框
    };
  },
  components: {},
  created() {
    // this.urlDestrs();
  },
  mounted() {
    this.initMap();
    if (localStorage.getItem("chooseAddress") != 1) {
      this.precisePositioning();
    }
  },
  methods: {
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
    // 当前进行中的订单
    gotoMapOrder() {
      this.$router.push("/map-order");
    },
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
    gotoShop(){
      this.$router.push({
        path: "/shop",
        query: { lan: '',lat:'' }
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
    gotoNext() {
      let typeId = this.$route.query.typeId ? this.$route.query.typeId : 0;
      let saveTypeId = localStorage.getItem("saveTypeId");

      this.$router.push({
        path: "/order-add-new",
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
    }
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
    height: 237px;
    .tab-item {
      height: 36px;
      display: flex;
      flex-direction: row;
      padding-left: 12px;
      .tab-item-btn {
        width: 108px;
        height: 100%;
        line-height: 36px;
        background: #fff;
        color: #333;
        background-size: cover;
        display: block;
        &.active {
          color: #fff;
          background: url("../../../../static/images/home-tab-bg.png") no-repeat
            top center;
          background-size: cover;
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
    display: flex;
    flex-direction: row;
    align-items: center;
    .bbt {
      flex: 1;
      text-align: center;
      height: 45px;
      line-height: 45px;
    }
    .r{
        color: #4CBFFE;
        border-left: 1px solid #e1e4ea;
    }
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