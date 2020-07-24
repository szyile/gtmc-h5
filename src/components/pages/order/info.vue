<template>
  <div id="info" class="tx-l">
    <app-header :title="title">
      <span slot="left" class="left" @click="this.common.goBack"></span>
    </app-header>
    <div class="scroll-list-wrap">
      <cube-scroll ref="scroll">
        <div
          class="info-title"
          v-show="
        orderStatus ==10 ||
        orderStatus ==20 ||
        orderStatus ==30 ||
        orderStatus ==40 ||
        orderStatus ==41 ||
        orderStatus ==50 ||
        orderStatus ==60 ||
        orderStatus ==61 ||
        orderStatus ==70
        "
        >
          <!-- 待审核 -->
          <div class="status-img" v-show="orderStatus ==10">
            <img src="../../../../static/images/have-purchase.png" alt/>
          </div>
          <!-- 待派单 -->
          <div class="status-img" v-show="orderStatus ==20">
            <img src="../../../../static/images/have-deliver.png" alt/>
          </div>
          <!-- 待接单 -->
          <div class="status-img" v-show="orderStatus ==30">
            <img src="../../../../static/images/have-deliver1.png" alt/>
          </div>
          <!-- 待取车 -->
          <div class="status-img" v-show="orderStatus ==40 || orderStatus ==41">
            <img src="../../../../static/images/have-getCar.png" alt/>
          </div>
          <!-- 待付款 -->
          <div class="status-img" v-show="orderStatus ==60 || orderStatus ==61">
            <img src="../../../../static/images/have-payment.png" alt/>
          </div>
          <!-- 待交车 -->
          <div class="status-img" v-show="orderStatus ==50">
            <img src="../../../../static/images/have-return.png" alt/>
          </div>
          <!-- 已完成 -->
          <div class="status-img" v-show="orderStatus ==70">
            <img src="../../../../static/images/order-end.png" alt/>
          </div>
        </div>
        <!-- 已关闭 -->
        <div id="closed" v-show="orderStatus == 80||orderStatus == 81">
          <img src="../../../../static/images/closed-bg.png" alt/>
          <div class="f13 blue">订单&nbsp;&nbsp;已关闭</div>
        </div>
        <div class="show-info-area">
          <!-- 地址信息 -->
          <div class="lis-item">
            <div class="lis-item-title f13 white">地址信息</div>
            <div class="lis-item-info">
              <div class="flex justify-content_flex-start pos-re">
                <div class="icon-address-car">
                  <img src="../../../../static/images/quche-icon.png" alt/>
                  <!-- <img src="../../../../static/images/songda-icon.png" alt v-show='serviceType == 2'/> -->
                </div>
                <div class="ml20 flex1 pb10" style="border-bottom:1px solid #E4E8F0">
                  <div class="f15 show-user-info ov-e">
                    <span>{{startMan}}</span>
                    <span>{{startManTel}}</span>
                  </div>
                  <div
                    class="f13 grey mt10 show-info-address ov-e"
                  >{{startPoiName}} {{startPoiAddress}}
                  </div>
                </div>
                <div class="grey-next ml10" v-show='serviceType == 2'>
                  <img src="../../../../static/images/phone-icon3.png" alt/>
                </div>
                <div class="address2-call pos-abs" @click="callPhone(startManTel)" v-show='serviceType == 2'></div>
              </div>


              <div class="flex justify-content_flex-start mt20 pos-re">
                <div class="icon-address-car">
                  <!-- <img src="../../../../static/images/quche-icon.png" alt v-show='serviceType == 2'/> -->
                  <img src="../../../../static/images/songda-icon.png" alt/>
                </div>
                <div class="ml20 flex1">
                  <div class="f15 show-user-info ov-e">
                    <span>{{endMan}}</span>
                    <span>{{endManTel}}</span>
                  </div>
                  <div
                    class="f13 grey mt10 show-info-address ov-e flex1"
                  >{{endPoiName}} {{endPoiAddress}}
                  </div>
                </div>
                <div class="grey-next ml10" v-show='serviceType == 1'>
                  <img src="../../../../static/images/phone-icon3.png" alt/>
                </div>
                <!-- 取车时显示 -->
                <div class="address2-call pos-abs" @click="callPhone(endManTel)" v-show='serviceType == 1'></div>
              </div>
              <!-- 运输信息 -->
              <div class="flex justify-content_flex-end">
                <div id="yunshuBtn" class="mr15" @click="gotoAddressStatus">运输信息</div>
              </div>

            </div>
          </div>
          <!-- 订单信息 -->
          <div class="lis-item mt20" :class="orderStatus ==40?'mb30':(orderStatus ==41?'mb30':'')">
            <div class="lis-item-title f13 white">订单信息</div>
            <div class="lis-item-info" :style="orderStatus == -1?'padding-bottom:0':''">
              <div
                class="ml15 lis-item-info-area"
                :class="orderStatus == 80?'cancelClass':(orderStatus == 81?'cancelClass':'mb15')"
              >
                <div class="flex justify-content_flex-start align-items_center">
                  <div class="f15 show-name">车牌号：</div>
                  <div class="f13 grey">{{carNum}}</div>
                </div>
                <div class="flex justify-content_flex-start align-items_center mt10">
                  <div class="f15 show-name">车架号：</div>
                  <div class="f13 grey">{{frameNum}}</div>
                </div>
                <div class="flex justify-content_flex-start align-items_center mt10">
                  <div class="f15 show-name">订单编号：</div>
                  <div class="f13 grey">{{orderId}}</div>
                </div>
                <!-- 已取消 -->
                <div>
                  <div class="flex justify-content_flex-start align-items_center mt10" v-show='createTime'>
                    <div class="f15 show-name">下单时间：</div>
                    <div class="f13 grey">{{createTime}}</div>
                  </div>

                  <div class="flex justify-content_flex-start align-items_center mt10" v-show='assignOrderTime'>
                    <div class="f15 show-name">派单时间：</div>
                    <div class="f13 grey">{{assignOrderTime}}</div>
                  </div>
                  <div class="flex justify-content_flex-start align-items_center mt10" v-show='confirmTime'>
                    <div class="f15 show-name">接单时间：</div>
                    <div class="f13 grey">{{confirmTime}}</div>
                  </div>
                  <div class="flex justify-content_flex-start align-items_center mt10" v-show='takeCarTime'>
                    <div class="f15 show-name">取车时间：</div>
                    <div class="f13 grey">{{takeCarTime}}</div>
                  </div>
                  <div class="flex justify-content_flex-start align-items_center mt10" v-show='returnCarTime'>
                    <div class="f15 show-name">交车时间：</div>
                    <div class="f13 grey">{{returnCarTime}}</div>
                  </div>
                  <div class="flex justify-content_flex-start align-items_center mt10" v-show='payTime'>
                    <div class="f15 show-name">付款时间：</div>
                    <div class="f13 grey">{{payTime}}</div>
                  </div>
                </div>
              </div>
              <!-- 里程相关 -->
              <div
                class="lis-item-info-other flex justify-content_flex-justify align-items_center mt10 tx-c"
                v-show="
                  orderStatus ==10 ||
                  orderStatus ==20 ||
                  orderStatus ==30 ||
                  orderStatus ==40 ||
                  orderStatus ==41 ||
                  orderStatus ==50 ||
                  orderStatus ==60 ||
                  orderStatus ==61 ||
                  orderStatus ==70
                "
              >
                <div>
                  <div class="f15">预估里程</div>
                  <div class="f13 grey mt10">{{estimateMileage}}</div>
                </div>
                <div>
                  <div class="f15">预估时长</div>
                  <div class="f13 grey mt10">{{estimateTime }}</div>
                </div>
                <div>
                  <div class="f15">预估金额</div>
                  <div class="f13 grey mt10">{{estimateMoney}}</div>
                </div>
              </div>
              <!-- 待交车时显示实际情况 -->
              <div
                class="lis-item-info-other flex justify-content_flex-justify align-items_center tx-c"
                style="margin-top:15px"
                v-show="
                  orderStatus == 50 ||
                  orderStatus == 60 ||
                  orderStatus == 61 ||
                  orderStatus == 70
                  "
              >
                <div>
                  <div class="f15">实际里程</div>
                  <div class="f13 grey mt10">{{actualMileage}}KM</div>
                </div>
                <div>
                  <div class="f15">实际时长</div>
                  <div class="f13 grey mt10">{{actualTime}}分钟</div>
                </div>
                <div>
                  <div class="f15">实际金额</div>
                  <div class="f13 grey mt10">{{totalMoney}}</div>
                </div>
              </div>
            </div>
          </div>
          <!-- 已关闭订单显示交易信息 -->
          <div class="lis-item mt20"
               v-show='orderStatus == 80 || orderStatus == 81'
          >
            <div class="lis-item-title f13 white">交易信息</div>
            <div class="lis-item-info">
              <div
                class="lis-item-info-other flex justify-content_flex-justify align-items_center mt10 tx-c"
              >
                <div>
                  <div class="f15">预估里程</div>
                  <div class="f13 grey mt10">{{estimateMileage}}</div>
                </div>
                <div>
                  <div class="f15">预估时长</div>
                  <div class="f13 grey mt10">{{estimateTime }}</div>
                </div>
                <div>
                  <div class="f15">预估金额</div>
                  <div class="f13 grey mt10">{{estimateMoney}}</div>
                </div>
                <!--
                                <div>
                                  <div class="f15">实际金额</div>
                                  <div class="f13 grey mt10">{{orderMoney}}</div>
                                </div> -->
              </div>
              <!-- <div
                class="lis-item-info-other flex justify-content_flex-justify align-items_center tx-c"
                style="margin-top:15px"
              >
                <div>
                  <div class="f15">付款金额</div>
                  <div class="f13 grey mt10">{{payMoney}}积分</div>
                </div>
                <div>
                  <div class="f15">支付方式</div>
                  <div class="f13 grey mt10">{{payPath}}</div>
                </div>
                <div style="opacity:0">
                  <div class="f15">实际金额</div>
                </div>
              </div> -->
            </div>
          </div>

          <!-- 已支付----------显示支付信息 -->
          <div class="lis-item mt20 mb30" v-show="orderStatus == 60 || orderStatus == 61 || orderStatus == 70">
            <div class="lis-item-title f13 white">支付信息</div>
            <div class="lis-item-info">
              <div
                class="lis-item-info-other flex justify-content_flex-justify align-items_center mt10 tx-c"
              >
                <div>
                  <div class="f15">免单抵扣</div>
                  <div class="f13 grey mt10">{{eventOffer}}</div>
                </div>
                <div>
                  <div class="f15">积分抵扣</div>
                  <div class="f13 grey mt10">{{score}}</div>
                </div>
                <div>
                  <div class="f15">实际付款</div>
                  <div class="f13 grey mt10">{{payMoney}}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 待交车状态 -->
          <div v-show="orderStatus == 50">
            <div class="lis-item mt20 mb30">
              <div class="lis-item-title f13 white">支付方式</div>
              <div class="lis-item-info flex justify-content_flex-start align-items_center">
                <img src="../../../../static/images/ji.png" alt class="ml15 ji mr10"/>
                <div>
                  <div class="f15">
                    可用
                    <span class="orange">{{passScore}} 积分</span>抵用
                    <span class="orange">{{estimateMoney}}元</span>
                  </div>
                  <div class="f13 grey mt5 mb5">您当前有{{userScore}}积分</div>
                  <div class="f15">应付金额￥0</div>
                </div>
                <div
                  id="selectRadio"
                  class="ml150 flex1 flex justify-content_flex-end align-items_center tx-r active"
                >
                  <span class="mr15"></span>
                </div>
              </div>
            </div>
          </div>

          <!-- 操作按钮区    订单状态不为取消时显示-->
          <div
            id="btns"
            class="mb60"
            v-show="
            orderStatus ==10 ||
            orderStatus ==20 ||
            orderStatus ==30 ||
            orderStatus ==40 ||
            orderStatus ==41 ||
            orderStatus ==50 ||
            orderStatus ==60 ||
            orderStatus ==61 ||
            orderStatus ==70
          "
          >
            <!-- 待审核 -->
            <div
              id="deliverAndgetCar"
              class="mg-auto flex justify-content_flex-center align-items_center f13"
              :class="orderStatus ==10?'mt30':''"
              v-show="orderStatus == 10"
            >
              <div
                class="flex1 flex flex-direction_column justify-content_flex-center align-items_center"
                @click="cancelOrder"
              >
                <img src="../../../../static/images/cancel-icon.png" alt/>
                <div class="mt5">取消订单</div>
                <div class="btn-line"></div>
              </div>
              <div
                class="flex1 flex flex-direction_column justify-content_flex-center align-items_center"
                @click="callPhone(kefu)"
              >
                <img src="../../../../static/images/kefu-icon.png" alt/>
                <div class="mt5">联系客服</div>
              </div>
            </div>

            <!-- 待付款 -->
            <div
              id="deliverAndgetCar"
              class="mg-auto flex justify-content_flex-center align-items_center f13 blue pos-re"
              v-show="orderStatus == 60 || orderStatus == 61"
            >
              <div id="fengeLine" v-show='driverMob'></div>
              <div
                class="flex1 flex justify-content_flex-center align-items_center"
                @click="callPhone(kefu)"
              >
                <img src="../../../../static/images/new-kefu.png" alt/>
                <div>联系客服</div>
              </div>
              <div
                class="flex1 flex justify-content_flex-center align-items_center"
                @click="callPhone(driverMob)"
                v-show="driverMob == '' ? false : true"
              >
                <img src="../../../../static/images/new-user.png" alt/>
                <div>联系司机</div>
              </div>
            </div>
            <!-- 已完成 -->
            <div
              id="deliverAndgetCar"
              class="mg-auto flex justify-content_flex-center align-items_center f13"
              v-show="orderStatus == 70"
            >
              <div
                class="flex1 flex flex-direction_column justify-content_flex-center align-items_center"
                @click="callPhone(driverMob)"
                v-show="driverMob == '' ? false : true"
              >
                <img src="../../../../static/images/phone-icon.png" alt/>
                <div class="mt5">联系司机</div>
                <div class="btn-line"></div>
              </div>
              <div
                class="flex1 flex flex-direction_column justify-content_flex-center align-items_center"
                @click="callPhone(kefu)"
              >
                <img src="../../../../static/images/kefu-icon.png" alt/>
                <div class="mt5">联系客服</div>
              </div>

            </div>
            <!-- 待派单、待接单 -->
            <div
              id="deliverAndgetCar"
              class="mg-auto flex justify-content_flex-justify align-items_center f13"
              :class="orderStatus ==20?'mt30':(orderStatus == 30?'mt30':'')"
              v-show="orderStatus == 20 || orderStatus == 30"
            >
              <div
                class="flex1 flex flex-direction_column justify-content_flex-center align-items_center"
                @click="cancelOrder"
              >
                <img src="../../../../static/images/cancel-icon.png" alt/>
                <div class="mt5">取消订单</div>
                <div class="btn-line"></div>
              </div>
              <div
                class="flex1 flex flex-direction_column justify-content_flex-center align-items_center"
                @click="callPhone(kefu)"
              >
                <img src="../../../../static/images/kefu-icon.png" alt/>
                <div class="mt5">联系客服</div>
                <div class="btn-line" v-show="driverMob == '' ? false : true"></div>
              </div>
              <div
                class="flex1 flex flex-direction_column justify-content_flex-center align-items_center"
                @click="callPhone(driverMob)"
                v-show="driverMob == '' ? false : true"
              >
                <img src="../../../../static/images/phone-icon.png" alt/>
                <div class="mt5">联系司机</div>
              </div>
            </div>
            <!-- 待取车 -->
            <div
              id="deliverAndgetCar"
              class="mg-auto flex justify-content_flex-center align-items_center f13 mt30"
              v-show="orderStatus == 40 || orderStatus == 41"
            >
              <div
                class="flex1 flex flex-direction_column justify-content_flex-center align-items_center"
                @click="cancelOrder"
              >
                <img src="../../../../static/images/new-cancel-icon.png" alt/>
                <div class="mt5">取消订单</div>
                <div class="btn-line"></div>
              </div>
              <div
                class="flex1 flex flex-direction_column justify-content_flex-center align-items_center"
                @click="callPhone(driverMob)"
                v-show="driverMob == '' ? false : true"
              >
                <img src="../../../../static/images/phone-icon.png" alt/>
                <div class="mt5">联系司机</div>
                <div class="btn-line"></div>
              </div>
              <div
                class="flex1 flex flex-direction_column justify-content_flex-center align-items_center"
                @click="callPhone(kefu)"
              >
                <img src="../../../../static/images/kefu-icon.png" alt/>
                <div class="mt5">联系客服</div>
              </div>
            </div>
            <!-- 待交车 -->
            <div
              id="deliverAndgetCar"
              class="mg-auto flex justify-content_flex-center align-items_center f13"
              v-show="
                orderStatus == 50
              "
            >
              <div
                class="flex1 flex flex-direction_column justify-content_flex-center align-items_center"
                @click="callPhone(driverMob)"
                v-show="driverMob == '' ? false : true"
              >
                <img src="../../../../static/images/phone-icon.png" alt/>
                <div class="mt5">联系司机</div>
                <div class="btn-line"></div>
              </div>
              <div
                class="flex1 flex flex-direction_column justify-content_flex-center align-items_center"
                @click="callPhone(kefu)"
              >
                <img src="../../../../static/images/kefu-icon.png" alt/>
                <div class="mt5">联系客服</div>
              </div>
            </div>
          </div>
          <!--待付款 单独处理 -->
          <div class="flex1 flex justify-content_flex-center align-items_center" id='nowPayBtn'
               v-show="orderStatus == 60 || orderStatus == 61" @click="nowPay">立即付款
          </div>
          <!-- 防止部分机型 显示问题 -->
          <div id="other-div"></div>
        </div>
      </cube-scroll>
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
            <div class="flex1" style="border-left: 1px solid #E1E4EA;" @click="sureCancelOrder">提交</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 定制化toast -->
    <div id='toastDiv' v-show='showToastFlag'>
      <div id="toastMas"></div>
      <div id="toastArea">
        <div class="tx-c"><img src="../../../../static/images/loading.gif" alt=""></div>
        <div class="white f14 tx-c mt15">{{toastText}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  import {orderDetail, cancelOrder, pay, fee, urlDestr, getUserInfo, availablePoint} from "../../../commonJs/api";
  import Header from "../../common/header";

  export default {
    data() {
      return {
        title: "",
        cancelResultFlag: 1, //记录取消原因 1：个人原因  2：司机原因
        cancelSHowFlag: false, //控制取消弹框显示
        showTexArea: "", //取消说明
        orderStatus: "", //记录订单状态
        startMan: "", //起点联系人
        startManTel: "", //起点联系人电话
        startPoiName: "", //起点名称
        startPoiAddress: "", //起点地址
        endMan: "", //终点联系人
        endManTel: "", //终点联系人电话
        endPoiName: "", //终点名称
        endPoiAddress: "", //终点地址
        carNum: "", //车辆编号
        frameNum: "", //车架编号
        orderId: "", //订单编号
        estimateMileage: "", //预估里程
        estimateTime: "", //预估时长
        estimateMoney: "", //预估费用
        createTime: "", //下单时间
        orderMoney: "", //实际金额(暂时不用)
        totalMoney: "",//订单总金额
        payMoney: "",//订单实际付款金额
        payPath: "", //支付方式
        payTime: "", //付款时间
        confirmTime: '',//接单时间
        takeCarTime: "", //取车时间
        returnCarTime: "", //还车时间
        assignOrderTime: "", //派单时间
        driverMob: "", //司机电话
        kefu: "400-7666-998", //客服电话
        score: "", //积分抵扣
        eventOffer: '',//免单抵扣
        // payMoney: this.score ? this.score.replace('￥', '') : '--',
        couponMoney: '',//优惠券金额
        driverShow: false, // 是否显示
        actualMileage: '',//实际里程
        actualTime: '',//实际时间
        userScore: '',//用户可用积分   score+接口返回的可用积分
        passScore: '',//可抵用的积分
        descOrderId: '',//存储解密后的订单号
        showToastFlag: false,
        toastText: '加载中',
        serviceType: '',//记录是取车还是送车的详情    1：取车  2：送车
        haveNum: 0,//已经输入的字数
      };
    },
    components: {
      "app-header": Header
    },
    watch: {
      //监听取消原因字数，最多100字，超出提示
      showTexArea(newV) {
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
      // 取消原因选择
      cancelResultChange() {
        let that = this;
        $("#cancelResultChange .cancel-radio").each(function () {
          $(this).click(function () {
            that.cancelResultFlag = $(this).index() + 1;
            $(this)
              .addClass("cancel-on")
              .siblings()
              .removeClass("cancel-on");
          });
        });
      },
      // 跳转订单状态详情
      gotoAddressStatus() {
        let orderIds = this.$route.query.enterFign ? this.descOrderId : this.$route.query.orderId
        this.$router.push({
          path: "/order-status",
          query: {
            orderId: orderIds,
            orderStatus: this.orderStatus,
            estimateTime: this.estimateTime, // 预估时间
            carNum: this.carNum, // 车牌号
          }
        });
      },
      //拨打电话
      callPhone(tel) {
        window.location.href = "tel:" + tel;
      },
      //立即付款
      nowPay() {
        //支付的时候，后台可以去判断的 接口有判断的
        /*       if(this.orderStatus==60){
                this.$toast('请等待司机提交计费',3000,2)
                return;
              } */
        let that = this;
        let orderId = that.orderId;
        let orderMoney = that.orderMoney ? that.orderMoney : '--'
        let params = {
          orderId: orderId
        }
        this.$createDialog({
          type: 'confirm',
          title: '付款确认',
          content: '实际订单金额' + orderMoney + '，应付金额￥0',
          confirmBtn: {
            text: '确定',
            active: true,
            disabled: false,
            href: 'javascript:;'
          },
          cancelBtn: {
            text: '取消',
            active: false,
            disabled: false,
            href: 'javascript:;'
          },
          onConfirm: () => {
            pay(params).then(res => {
              if (res.header.code == '10000000') {
                that.$toast('支付成功', 2000, 1)
                // that.orderDetail(orderId)
                //支付成功之后跳转到小程序首页
                setTimeout(() => {
                  wx.miniProgram.reLaunch({url: '/pages/maintainFirst/maintainFirst'})
                }, 2000)

              } else {
                let msg = res.header.message;
                that.$toast(msg, 3000, 2, 1, res.header.code)
              }
            })
          },
          onCancel: () => {
          }
        }).show()
      },
      //取消订单
      cancelOrder() {
        this.cancelSHowFlag = true;
      },
      //隐藏取消订单弹框
      hideCancelOrder() {
        this.cancelSHowFlag = false;
      },
      // 确认取消
      sureCancelOrder() {
        let that = this,
          orderId = that.orderId,
          params = {
            orderId: orderId,
            cancelType: that.cancelResultFlag.toString(),
            cancelReason: that.showTexArea,
            orderStatus: 81
          };
        //去除取消说明
        // if (!that.showTexArea) {
        //   that.$toast('请填写取消说明',3000,4)
        //   return;
        // }
        this.showToastFlag = true
        this.toastText = '取消订单中...'
        cancelOrder(params).then(res => {
          if (res.header.code == "10000000") {
            that.cancelSHowFlag = false;
            this.showToastFlag = false
            that.showTexArea = ''
            that.$toast('取消成功', 2000, 1)
            setTimeout(() => {
              wx.miniProgram.navigateTo({url: '/pages/maintainFirst/maintainFirst'})
            }, 2000)
          } else {
            this.showToastFlag = false
            let msg = res.header.message;
            that.$toast(msg, 3000, 2, 1, res.header.code)
          }
        });
      },
      //初始化订单详情
      orderDetail(orderIds) {
        let that = this,
          orderId = orderIds,
          params = {
            orderId: orderId
          };
        that.showToastFlag = true
        orderDetail(params).then(res => {
          that.showToastFlag = false
          if (res.header.code == "10000000") {
            //显示用户可用积分
            that.availablePoints(res.body.score)
            that.serviceType = res.body.serviceType;
            that.startMan = res.body.startMan;
            that.startManTel = res.body.startManTel;
            that.startPoiName = res.body.startPoiName;
            that.startPoiAddress = res.body.startPoiAddress;
            that.endMan = res.body.endMan;
            that.endManTel = res.body.endManTel;
            that.endPoiName = res.body.endPoiName;
            that.endPoiAddress = res.body.endPoiAddress;
            that.carNum = res.body.carNum;
            that.frameNum = res.body.frameNum;
            that.orderId = res.body.orderId;
            that.estimateMoney = res.body.estimateMoney
              ? "￥" + res.body.estimateMoney
              : "--";
            that.estimateTime = res.body.estimateTime
              ? res.body.estimateTime + "分钟"
              : "--";
            that.estimateMileage = res.body.estimateMileage
              ? (res.body.estimateMileage == 0 ? '--' : res.body.estimateMileage + "KM")
              : "--";
            that.orderStatus = res.body.orderStatus;
            that.createTime = res.body.createTime;
            that.orderMoney = res.body.orderMoney !=null ? "￥" + res.body.orderMoney : "--";
            that.totalMoney = res.body.totalMoney !=null ? "￥" + res.body.totalMoney : "--";
            that.payPath = res.body.payPath ? res.body.payPath : '车友会积分';
            that.payTime = res.body.payTime;
            that.takeCarTime = res.body.takeCarTime;
            that.confirmTime = res.body.confirmTime;
            that.returnCarTime = res.body.returnCarTime;
            that.assignOrderTime = res.body.assignOrderTime;
            that.driverMob = res.body.driverMob;
            that.passScore = res.body.orderPoint !=null ? res.body.orderPoint : '--';
            //积分抵扣
            that.score = res.body.score !=null ? "￥" + res.body.score : "--";
            // 免单抵扣
            that.eventOffer = res.body.eventOffer !=null ? "￥" + res.body.eventOffer : "--";
            that.payMoney = res.body.payMoney !=null ? "¥" + res.body.payMoney : '--';
            // that.score = res.body.score?(res.body.orderMoney?'￥'+res.body.orderMoney:'--'): "--";
            that.couponMoney = res.body.couponMoney

            // that.eventOffer = res.body.score?'--':(res.body.orderMoney?'￥'+res.body.orderMoney:'--')
            that.actualMileage = res.body.actualMileage ? res.body.actualMileage : '--'//实际里程
            that.actualTime = res.body.actualTime ? res.body.actualTime : '--'//实际时间
            // that.userScore = Number(res.body.score)+Number(res.body.availablePoint)
            //待取车、待交车、待付款需要走实时费用接口
            if (res.body.orderStatus == 40 || res.body.orderStatus == 41 || res.body.orderStatus == 50 || res.body.orderStatus == 60 || res.body.orderStatus == 61) {
              //获取实际费用
              that.feeMoney(res.body.orderId, 2)
            }
          } else {
            let msg = res.header.message;
            that.$toast(msg, 3000, 2, 1, res.header.code)
          }
        });
      },
      //实时费用
      feeMoney(orderIds, type) {
        let that = this,
          params = {
            orderId: orderIds,
            type: type
          }
        fee(params).then(res => {
          if (res.header.code == "10000000") {
            // 与map-order.vue  获取实际里程 不一致  这里除了1000  那边没有除1000  接口里定义的是米
            //that.actualMileage=Number(res.body.distance)/1000?Number(res.body.distance)/1000:'--'//实际里程
            that.actualMileage = res.body.distance ? res.body.distance : '--'//实际里程
            that.actualTime = Math.floor(res.body.driveTime / 60) ? Math.floor(res.body.driveTime / 60) : '--'//实际时间
            that.orderMoney = res.body.totalFee ? '￥' + res.body.totalFee : '--'//实际金额
          } else {
            let msg = res.header.message;
            that.$toast(msg, 3000, 2, 1, res.header.code)
          }
        })
      },
      //url解密
      urlDestrs() {
        let that = this,
          gtmcuid = that.$route.query.gtmcuid ? that.$route.query.gtmcuid : '',
          vinNo = that.$route.query.frameNum ? that.$route.query.frameNum : '',
          applyNumber = that.$route.query.applyNumber ? that.$route.query.applyNumber : '',
          telNo = that.$route.query.telNo ? that.$route.query.telNo : '',
          orderId = that.$route.query.orderId ? that.$route.query.orderId : "",
          params = {
            gtmcuid: gtmcuid,
            vin: vinNo,
            applyNumber: applyNumber,
            telNo: telNo,
            orderId: orderId
          }
        urlDestr(params).then(res => {
          if (res.header.code == '10000000') {
            //主要获取订单号
            that.descOrderId = res.body.orderId
            //that.orderDetail(res.body.orderId)
            let gtmcUid = res.body.gtmcuid
            that.getUserInfo(gtmcUid, that.$route.query.enterFign, res.body.vin)
          } else {
            let msg = res.header.message
            that.$toast(msg, 3000, 2, 1, res.header.code)
          }
        })
      },
      // 查询广丰用户信息
      getUserInfo(gtmcUid, enterFign, frameNum) {
        let that = this,
          params = {
            gtmcUid: gtmcUid,
            enterFign: enterFign,
            frameNum: frameNum
          }
        getUserInfo(params).then(res => {
          if (res.header.code == '10000000') {
            //本地存储用户信息
            localStorage.setItem('localUserId', res.body.userId)
            localStorage.setItem('localTelNo', res.body.telNo)
            localStorage.setItem('localName', res.body.name)
            localStorage.setItem('localDealerCode', res.body.dealerCode)//绑定专属店CD
            localStorage.setItem('localDealerName', res.body.dealerName)//门店名称
            localStorage.setItem('localDealerRel', res.body.dealerRel)//门店联系人电话
            localStorage.setItem('localDealerAddress', res.body.dealerAddress)//门店地址
            localStorage.setItem('localDealerLongitude', res.body.dealerLongitude)//门店经度
            localStorage.setItem('localDealerLatitude', res.body.dealerLatitude)//门店纬度
            localStorage.setItem('localDealerServicePhone', res.body.dealerServicePhone)//门店电话
            localStorage.setItem('localToken', res.body.token)//用户token
            // if(res.body.token){
            //
            // }

            // localStorage.setItem('localCarLis',JSON.stringify(res.body.vehicleList))//车辆列表
            that.dealerName = res.body.dealerName
            console.log("用户token：" + localStorage.getItem('localToken'))

            that.orderDetail(that.descOrderId)

          } else {
            let msg = res.header.message
            that.$toast(msg, 3000, 2)
            // that.$createToast({
            //   txt:msg,
            //   type:'txt'
            // }).show()
          }
        })
      },
      //查询用户积分
      availablePoints(score) {
        let that = this,
          params = {
            userId: localStorage.getItem("localUserId")
          };
        availablePoint(params).then(res => {
          if (res.header.code == "10000000") {
            that.userScore = Number(score) + Number(res.body.point)
          } else {
            let msg = res.header.message;
            that.$toast(msg, 3000, 2, 1, res.header.code);
          }
        });
      },
    },
    mounted() {
      this.setHeaderTitle();
      this.cancelResultChange();
      //入口四、五进来进行解密
      if (this.$route.query.enterFign) {
        if (this.$route.query.enterFign == 4 || this.$route.query.enterFign == 5) {
          console.log(window.location.href)
          this.urlDestrs()
        }
      } else {
        this.orderDetail(this.$route.query.orderId);
      }
    }
  };
</script>
<style lang='less' scoped>
  .scroll-list-wrap {
    height: 100vh;
    -webkit-overflow-scrolling: auto;

    .info-title {
      width: 100%;
      height: 192px;
      background: url("../../../../static/images/order-info-bg.png") no-repeat top center;
      background-size: cover;
      overflow: hidden;

      .status-img {
        margin-top: 35px;
        margin-left: 10px;
        margin-right: 10px;
      }

      img {
        width: 100%;
      }
    }

    .show-info-area {
      margin-top: 40px;
      margin-left: 15px;
      margin-right: 15px;
      padding-bottom: 5px;

      .lis-item-title {
        margin-left: 10px;
        width: 72px;
        line-height: 20px;
        text-align: center;
        background: #c1c4c8;
      }

      .lis-item-info {
        width: 345px;
        border-radius: 8px;
        background: #fff;
        box-shadow: 0 4px 4px 0 #c0c6d2;
        padding-top: 20px;
        padding-bottom: 18px;

        .icon-address-car {
          width: 44px;
          height: 37px;

          img {
            width: 100%;
          }
        }

        .grey-next {
          position: absolute;
          right: 14px;

          img {
            position: relative;
            top: -8px;
            width: 22px;
            height: 22px;
          }
        }

        .show-info-address {
          line-height: 15px;
          max-width: 250px;
        }

        .lis-item-info-area {
          margin-top: 3px;
          padding-bottom: 15px;
          border-bottom: 1px solid #e4e8f0;

          .show-name {
            width: 90px;
          }
        }

        .lis-item-info-other {
          margin: 0 15px;
        }

        .ji {
          width: 37px;
          height: 37px;
        }

        #selectRadio {
          span {
            display: inline-block;
            width: 15px;
            height: 15px;
          }
        }

        #selectRadio.active {
          span {
            background: url("../../../../static/images/radio.png") no-repeat top center;
            background-size: cover;
          }
        }
      }
    }
  }

  #btns {
    margin: auto;
    width: 345px;
    height: 82px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 4px 4px 0 #c0c6d2;
    z-index: 1;

    #have_purchase_btns,
    #have_pay_btns,
    #deliverAndgetCar {
      // width: 245px;
      height: 100%;

      img {
        margin-right: 6px;
        height: 22px;
      }

      div {
        position: relative;
        top: 2px;
      }

      .flex {
        position: relative;
        top: 0px;
        height: 100%;
      }
    }

    #deliverAndgetCar {
      width: 93%;
    }
  }

  #other-div {
    margin-top: 32px;
    height: 30px;
    width: 100%;
    background: transparent;
  }

  #closed {
    position: relative;
    margin-bottom: 50px;

    div {
      position: absolute;
      left: 0;
      right: 0;
      bottom: -36px;
      margin: auto;
      width: 224px;
      height: 50px;
      text-align: center;
      line-height: 45px;
      background: url("../../../../static/images/closed-btn-bg.png") no-repeat top center;
      background-size: cover;
      margin: 0 auto;
    }

    img {
      width: 100%;
    }
  }

  #mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: #000;
    z-index: 2;
  }

  #showCarImg {
    position: absolute;
    top: 120px;
    left: 50%;
    margin-left: -172px;
    width: 346px;
    height: 258px;
    z-index: 3;
    overflow: hidden;
  }

  #lookImgArea {
    position: fixed;
    top: 100vh;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 3;
    transition: all 0.5s;
    -webkit-transition: all 0.5s;
  }

  #lookImgArea.show {
    top: 0;
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
    background: url("../../../../static/images/radio1.png") no-repeat center center;
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

  .cancelClass {
    border-bottom: 0 !important;
    padding-bottom: 0 !important;
  }

  #toastDiv {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 100;
  }

  #toastMas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: #000;
    opacity: 0.5;
  }

  #toastArea {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -95px;
    margin-top: -50px;
    width: 190px;
    height: 100px;
    background: rgba(37, 38, 45, 0.9);
    border-radius: 4px;
    z-index: 9999;

    img {
      margin-top: 15px;
      width: 28px;
    }
  }

  #yunshuBtn {
    margin-top: 20px;
    width: 93px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    font-size: 12px;
    color: #4CBFFE;
    border-radius: 14px;
    border: 1px solid #4CBFFE;
  }

  #nowPayBtn {
    margin-top: 36px;
    width: 345px;
    height: 44px;
    background: #4CBFFE;
    border-radius: 25px;
    box-shadow: 2px 3px 9px 2px #A6DFFF;
    color: #fff;
    font-size: 20px;
  }

  #fengeLine {
    position: absolute !important;
    top: 0 !important;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 1px; /*no*/
    height: 22px;
    background: #E3E3E3;
  }

  .address2-call {
    top: -10px;
    width: 345px;
    height: 50px;
  }

  .show-user-info {
    width: 230px;
  }

  .btn-line {
    position: absolute !important;
    right: 0;
    top: 28px !important;
    width: 1px;
    height: 26px;
    background: #f5f5f5
  }

  .haveNum {
    bottom: 8px;
    right: 3px;
    color: #bebcbc;
    font-size: 10px;
  }
</style>
