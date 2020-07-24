<template>
  <div id="testUrlIndex" class="tx-l">
    <div class="test-url-wrap mg-auto scroll-list-wrap">
      <cube-scroll ref="scroll">
        <div class="user-tel flex justify-content_flex-justify mt15">
          <input type="tel" placeholder="请输入手机号" class="f14" v-model="userTel"/>
          <p id="selectTel" class="f14" @click="selectTestTel">选择手机号</p>
          <div class="f14" id="getInfo" @click="getUserInfo">获取资料</div>
        </div>
        <div class="f12 mt20 grey" v-show='showSelectTestUserTelFlag'>所选账号：{{selectTestUserTel}} {{userTel}}</div>
        <ul class="show-userinfo f16">
          <li class="mt20">
            gtmcId:
            <span class="ml10 green">{{gtmcId}}</span>
          </li>
          <li class="mt20" id="selectCar">
            <span>车牌号:</span>
            <select name id="select1" class="f14 green" v-model="vinNum">
              <option
                :value="item.vinNo"
                v-for="(item,index) in carLis"
                :key="index"
                :carModel="item.model"
                :carNum="item.registerNo"
              >{{item.registerNo}}</option>
            </select>
          </li>
          <li class="mt20">
            车架号:
            <span class="ml10 green">{{vinNum}}</span>
          </li>
          <li class="mt20">
            店代码:
            <span class="ml10 green">{{dealerCode}}</span>
          </li>
          <li class="mt20">
            店名称:
            <span class="ml10 green">{{dealerName}}</span>
          </li>
          <li class="mt15 mb15" id="selectTime" @click="showDatePicker">
            <div class="exit1">
              <span class="red f11">tips：预约时间入口一必选</span>
            </div>
            <div>
              预约时间:
              <span class="ml10 green">{{applayDate}}</span>
              <span class="ml10 green">{{applayTime}}</span>
            </div>
          </li>
        </ul>
        <div class="show-time-wrap f16">
          <div class="show-time-tab flex flex">
            <div class="active">上午</div>
            <div>下午</div>
          </div>
          <div class="show-time-lis pos-re lis1">
            <ul class="time-morning pos-abs">
              <li>09:30</li>
              <li>09:45</li>
              <li>10:00</li>
              <li>10:15</li>
              <li>10:30</li>
              <li>10:45</li>
              <li>11:00</li>
              <li>11:15</li>
              <li>11:30</li>
              <li>11:45</li>
            </ul>
            <ul class="time-afternoon pos-abs" style="display:none">
              <li>12:00</li>
              <li>12:15</li>
              <li>12:30</li>
              <li>12:45</li>
              <li>13:00</li>
              <li>13:15</li>
              <li>13:30</li>
              <li>13:45</li>
              <li>14:00</li>
              <li>14:15</li>
              <li>14:30</li>
              <li>14:45</li>
              <li>15:00</li>
              <li>15:15</li>
              <li>15:30</li>
              <li>15:45</li>
              <li>16:00</li>
              <li>16:15</li>
              <li>16:30</li>
            </ul>
          </div>
        </div>
        <div id="submitBtn" class="f16 mg-auto" @click="addPlay">生成预约单</div>
        <div id="reservationNum" class="f16 mt20">
          预约单号：
          <span class="green">{{reservationNum}}</span>
        </div>
        <div class="show-url-wrap mt10 f16">
          <div>
            生成加密URL：
            <span class="f12 grey">(可直接点击链接访问)</span>
          </div>
          <ul>
            <li @click="addUrl1(1)">入口一<span class="f10">（若存在预约单可直接生成）</span></li>
            <li @click="addUrl1(2)">取车服务<span class="f10">（入口二）</span></li>
            <li @click="addUrl1(3)">送车服务<span class="f10">（入口三）</span></li>
            <li @click="addUrl1(4)">入口四</li>
          </ul>
        </div>
        <div class="f13 testUrl">
          <span @click="gotoIndex">{{testUrl}}</span>
        </div>
        <div id="copyBtn" class="f16" @click="copy">复制链接</div>
        <!-- 回调 -->
        <div id="weChat" class="mt30 f16 mb30">
          <div>
            小程序回调
            <span class="f10 grey">（倒序排列）</span>
          </div>
          <div class="mt10 flex justify-content_flex-justify f10 grey">
            <span>
              预约单总数:
              <span class="f12 black">{{weChatAllNum}}</span>
            </span>
            <span>
              预约中:
              <span class="f12 orange">{{weChatWaitingNum}}</span>
            </span>
            <span>
              成功:
              <span class="f12 green">{{weChatSuccessNum}}</span>
            </span>
            <span>
              取消:
              <span class="f12 red">{{weChatCancelNum}}</span>
            </span>
          </div>
          <ul class="mt15">
            <li class="flex justify-content_flex-justify align-items_center">
              <div class="lh36">序号</div>
              <div class="lh36">预约车架号</div>
              <div class="lh36">预约状态</div>
              <div class="lh36">操作</div>
            </li>
            <li
              v-for="(item,index) in orderLis"
              :key="index"
              class="flex justify-content_flex-justify align-items_center"
            >
              <div>{{index}}</div>
              <div class="f12">{{item.vin}}</div>
              <div v-show="item.applyStatus == 0" class="orange">预约中</div>
              <div v-show="item.applyStatus == 1" class="green">预约成功</div>
              <div v-show="item.applyStatus == 2" class="red">已取消</div>
              <div>
                <button
                  @click="success(item.vin,item.applyNumber,1)"
                  v-show="item.applyStatus == 0"
                  class="green"
                >预约成功</button>
                <button
                  @click="cancel(item.vin,item.applyNumber,2)"
                  v-show="item.applyStatus != 2"
                  :class='item.applyStatus == 0?"red":(item.applyStatus == 1?"mt15 red":"")'
                >取消预约</button>
              </div>
            </li>
          </ul>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>
<script>
const column1 = [
  { text: '18680083791', value: '刘国梁'}, 
  { text: '17601549930', value: '李昆' },
  { text: '13760753655', value: '廖晶' },
  { text: '18680299395', value: '张嫚' },
  // { text: '14752251281', value: '陆晓' },
  { text: '18662712635', value: '赵正飞' },
  { text: '13570330616', value: '赵培杰' },
  ]
let regPhone = /^1[345789]\d{9}$/;
import {
  testUserInfo,
  testApply,
  testEnstr,
  testApplyList,
  testNotice,
  applyAudit
} from "../../../commonJs/api";
export default {
  data() {
    return {
      showSelectTestUserTelFlag:false,
      selectTestUserTel:'',//测试用数据
      userTel: "",//用户手机号
      gtmcId: "",
      carNum: "", //存储选择的车牌号
      vinNum: "", //存储选择的车架号
      carModel: "", //存储选择的车型
      dealerCode: "", //门店代码
      dealerName: "", //门店名称
      applayDate: "", //预约日期
      applayTime: "", //预约时间
      reservationNum: "", //预约单号
      testUrl: "",//生成的url
      carLis: [],//车辆列表
      selectTime: "",//预约日期+预约时间
      orderLis: [],//存储订单列表数据
      weChatAllNum: "--", //预约单总数
      weChatSuccessNum: "--", //预约成功数量
      weChatCancelNum: "--", //预约取消数量
      weChatWaitingNum: "--", //预约中数量
      haveOrderFlag:false//用于入口一标记是否已经存在预约单
    };
  },
  watch: {
    userTel(num) {
      if (num.length > 11) {
        num = num.slice(0, 11);
        this.$nextTick(() => {
          this.userTel = num;
        });
      }
    }
  },
  components: {},
  methods: {
    // 测试手机号
    selectTestTel() {
      if (!this.picker) {
        this.picker = this.$createPicker({
          title: '测试手机号',
          data: [column1],
          onSelect: this.selectHandleUserTel
        })
      }
      this.picker.show()
    },
    selectHandleUserTel(selectedVal, selectedIndex, selectedText) {
      this.userTel = selectedText[0]
      this.selectTestUserTel = selectedVal[0]
      this.showSelectTestUserTelFlag = true
      this.gtmcId=""
      this.carNum="" //存储选择的车牌号
      this.vinNum="" //存储选择的车架号
      this.carModel="" //存储选择的车型
      this.dealerCode="" //门店代码
      this.dealerName="" //门店名称
      this.applayDate="" //预约日期
      this.applayTime="" //预约时间
      this.reservationNum="" //预约单号
      this.testUrl=""//生成的url
      this.carLis=[]//车辆列表
      this.selectTime=""//预约日期+预约时间
      this.orderLis=[]//存储订单列表数据
      this.weChatAllNum="--" //预约单总数
      this.weChatSuccessNum="--" //预约成功数量
      this.weChatCancelNum="--" //预约取消数量
      this.weChatWaitingNum="--" //预约中数量
      $(".show-time-tab div:first").addClass('active').siblings().removeClass('active')
      $(".show-time-lis ul:first").show().siblings().hide()
      $(".show-time-lis ul").find('li').removeClass('active')
      $(".show-time-lis").removeClass("lis2").addClass("lis1");
    },
    clickEvents() {
      let _this = this;
      //监听输入框
      $('.user-tel').bind('input propertychange', function() {
        if(_this.userTel.length<11){
          _this.gtmcId=""
          _this.carNum="" //存储选择的车牌号
          _this.vinNum="" //存储选择的车架号
          _this.carModel="" //存储选择的车型
          _this.dealerCode="" //门店代码
          _this.dealerName="" //门店名称
          _this.applayDate="" //预约日期
          _this.applayTime="" //预约时间
          _this.reservationNum="" //预约单号
          _this.testUrl=""//生成的url
          _this.carLis=[]//车辆列表
          _this.selectTime=""//预约日期+预约时间
          _this.orderLis=[]//存储订单列表数据
          _this.weChatAllNum="--" //预约单总数
          _this.weChatSuccessNum="--" //预约成功数量
          _this.weChatCancelNum="--" //预约取消数量
          _this.weChatWaitingNum="--" //预约中数量
          _this.selectTestUserTel = ""
          if(_this.showSelectTestUserTelFlag){
            _this.showSelectTestUserTelFlag = false
          }
          $(".show-time-tab div:first").addClass('active').siblings().removeClass('active')
          $(".show-time-lis ul:first").show().siblings().hide()
          $(".show-time-lis ul").find('li').removeClass('active')
          $(".show-time-lis").removeClass("lis2").addClass("lis1");
        }
      })
      $(".show-time-tab div").each(function() {
        $(this).click(function() {
          if ($(this).hasClass("active")) {
            return;
          }
          if ($(this).index() == 0) {
            $(".show-time-lis")
              .removeClass("lis2")
              .addClass("lis1");
          } else {
            $(".show-time-lis")
              .removeClass("lis1")
              .addClass("lis2");
          }
          $(this)
            .addClass("active")
            .siblings()
            .removeClass("active");
          $(".show-time-lis ul")
            .eq($(this).index())
            .show()
            .siblings()
            .hide();
        });
      });
      $(".show-time-lis li").each(function() {
        $(this).click(function() {
          if ($(this).hasClass("active")) {
            return;
          }
          if (
            $(this)
              .parent()
              .hasClass("time-morning")
          ) {
            $(".time-afternoon li").removeClass("active");
          } else {
            $(".time-morning li").removeClass("active");
          }
          $(this)
            .addClass("active")
            .siblings()
            .removeClass("active");
          _this.applayTime = $(this).text();
          _this.selectTime = _this.applayDate + " " + _this.applayTime;
          console.log(_this.selectTime)
        });
      });
      $(".show-userinfo,#getInfo").click(function() {
        $(".user-tel input").blur();
      });
    },
    gotoIndex() {
      if (this.testUrl) {
        window.location.href = this.testUrl;
      }
    },
    //小程序回调
    testApplyList(custTel) {
      let params = {
        custTel: custTel
      };
      testApplyList(params).then(res => {
        if (res.applyList.length > 0) {
          this.orderLis = res.applyList.reverse();
          this.weChatAllNum = res.applyList.length;
          let waitingArr = [];
          let successArr = [];
          let cancelArr = [];
          res.applyList.map(item => {
            if (item.applyStatus == 0) {
              //预约中
              waitingArr.push(item);
            }
            if (item.applyStatus == 1) {
              //预约成功
              successArr.push(item);
            }
            if (item.applyStatus == 2) {
              //取消预约
              cancelArr.push(item);
            }
          });
          this.weChatSuccessNum = successArr.length;
          this.weChatWaitingNum = waitingArr.length;
          this.weChatCancelNum = cancelArr.length;
        } else {
          this.orderLis = "";
          this.weChatAllNum = 0;
          this.weChatSuccessNum = 0;
          this.weChatErrNum = 0;
        }
      });
    },
    //复制链接
    copy() {
      let copyUrl = this.testUrl;
      if (copyUrl) {
        let oInput = document.createElement("input"); // 生成一个节点
        oInput.value = copyUrl; // 你要复制的文本
        document.body.appendChild(oInput); // 插入文档
        oInput.select(); // 选择对象
        document.execCommand("Copy"); // 执行浏览器复制命令
        document.body.removeChild(oInput); //移除标签
        this.$toast("复制成功", 3000, 1);
      } else {
        this.$toast("暂无可复制链接", 3000, 4);
      }
    },
    //获取用户信息
    getUserInfo() {
      const toast = this.$createToast({
        time: 0,
        mask: true,
        txt: "获取用户资料中..."
      });
      toast.show();
      if (!regPhone.test(this.userTel)) {
        toast.hide();
        this.$toast("请输入正确的手机号", 3000, 4);
        return;
      }
      let params = {
        tel: this.userTel
      };
      testUserInfo(params).then(res => {
        toast.hide();
        this.carLis = res.carList;
        this.gtmcId = res.gtmcuid;
        this.dealerCode = res.dealerCode;
        this.dealerName = res.dealerName;
        this.$toast("用户资料获取成功", 3000, 1);
        //用户信息查询成功存在车辆默认赋值第一个车辆信息
        if (this.carLis.length > 0) {
          this.vinNum = this.carLis[0].vinNo; //车架号
          this.carModel = this.carLis[0].model; //车型名称
          this.carNum = this.carLis[0].registerNo; //车牌号
        }
      });
      this.testApplyList(this.userTel);
    },
    //预约成功
    success(vin, applyNumber, applyStatus) {
      const toast = this.$createToast({
        time: 0,
        mask: true,
        txt: "预约中..."
      });
      toast.show();
      let params = {
        vin: vin,
        applyNumber: applyNumber,
        applyStatus: applyStatus
      };
      testNotice(params).then(res => {
        toast.hide();
        if (res.header.code == "10000000") {
          this.$toast("预约成功", 3000, 1);
          this.testApplyList(this.userTel);

          //调用os更新预约单状态
          applyAudit(params).then(res => {
            //刷新预约单列表数据
            this.testApplyList(this.userTel);
          });
        } else {
          let msg = res.header.message;
          this.$toast(msg, 3000, 2);
        }
      });
    },
    //取消预约
    cancel(vin, applyNumber, applyStatus) {
      const toast = this.$createToast({
        time: 0,
        mask: true,
        txt: "取消中..."
      });
      toast.show();
      let params = {
        vin: vin,
        applyNumber: applyNumber,
        applyStatus: applyStatus
      };
      testNotice(params).then(res => {
        toast.hide();
        if (res.header.code == "10000000") {
          this.$toast("取消成功", 3000, 1);
          this.reservationNum="" //预约单号
          this.testUrl=""//生成的url
          this.testApplyList(this.userTel);

          //调用os更新预约单状态
          applyAudit(params).then(res => {
            //刷新预约单列表数据
            this.testApplyList(this.userTel);
          });
        } else {
          let msg = res.header.message;
          this.$toast(msg, 3000, 2);
        }
      });
    },
    showDatePicker() {
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          title: "选择预约时间",
          min: new Date(),
          max: new Date(2020, 11, 20),
          value: new Date(),
          format: {
            year: "YYYY",
            month: "MM",
            date: "DD"
          },
          onSelect: this.selectHandleDate
        });
      }

      this.datePicker.show();
    },
    selectHandleDate(date, selectedVal, selectedText) {
      this.applayDate =
        selectedText[0] + "-" + selectedText[1] + "-" + selectedText[2];
        this.selectTime = this.applayDate + " " + this.applayTime;
    },
    //生成预约单
    addPlay() {
      if (
        this.gtmcId == "" ||
        $("#select1").val() == "" ||
        this.dealerCode == "" ||
        this.dealerName == ""
      ) {
        this.$toast("信息不完善，无法生成预约单", 3000, 4);
        return;
      }
      if (this.applayDate == "" || this.applayTime == "") {
        this.$toast("请选择完整预约时间", 3000, 4);
        return;
      }
      const toast = this.$createToast({
        time: 0,
        mask: true,
        txt: "加载中..."
      });
      toast.show();
      this.carModel = $("#select1")
        .find("option:selected")
        .attr("carModel");
      this.carNum = $("#select1")
        .find("option:selected")
        .attr("carNum");
      this.vinNum = $("#select1").val();
      this.selectTime = this.applayDate + " " + this.applayTime;
      console.log(this.selectTime)
      let params = {
        dealerCode: this.dealerCode,
        vin: $("#select1").val(),
        custTel: this.userTel,
        gtmcuid: this.gtmcId,
        applyTime: this.applayDate + " " + this.applayTime
      };
      testApply(params).then(res => {
        toast.hide();
        if (res.errorMessage) {
          this.$toast(res.errorMessage, 3000, 4);
          this.haveOrderFlag = true
        } else {
          this.haveOrderFlag = false
          this.reservationNum = res.applyNumber;
          this.$toast("预约单创建成功", 3000, 1);
          this.testApplyList(this.userTel);
        }
      });
    },
    //创建入口链接
    addUrl1(type) {
      let that = this;
      this.carModel = $("#select1")
        .find("option:selected")
        .attr("carModel");
      this.carNum = $("#select1")
        .find("option:selected")
        .attr("carNum");
      this.vinNum = $("#select1").val();
      console.log("用户手机号：" + this.userTel);
      console.log("门店代码：" + this.dealerCode);
      console.log("gtmcuId：" + this.gtmcId);
      console.log("车辆名称：" + this.carModel);
      console.log("车牌号：" + this.carNum);
      console.log("车架号：" + this.vinNum);
      console.log("门店名称：" + this.dealerName);
      console.log("选择的预约时间：" + this.selectTime);
      console.log("预约单号：" + this.reservationNum);
      //先清除原有链接
      this.testUrl = ""
      if (type == 1) {
        if (
          this.userTel == "" ||
          this.dealerCode == "" ||
          this.gtmcId == "" ||
          this.carModel == "" ||
          this.carNum == "" ||
          this.vinNum == "" ||
          this.dealerName == "" ||
          this.selectTime == ""
        ) { 
          this.$toast("信息不完善，无法创建链接", 3000, 4);
          return;
        }
        if(this.reservationNum == ""){
            if(this.haveOrderFlag == false){
              this.$toast("请先生成预约单", 3000, 4);
              return;
            }else{
              //存在预约单 根据车架号查询预约单号
              let vinNums = $("#select1").val()
              this.orderLis.map((item)=>{
                if(item.vin == vinNums && (item.applyStatus == 0 || item.applyStatus == 1)){
                  this.reservationNum = item.applyNumber
                }
              })
            }
        }
      }
      if (type == 2 || type == 3) {
        if (
          this.userTel == "" ||
          this.dealerCode == "" ||
          this.gtmcId == "" ||
          this.carModel == "" ||
          this.carNum == "" ||
          this.vinNum == "" ||
          this.dealerName == ""
        ) {
          this.$toast("请检查用户资料是否完整", 3000, 4);
          return;
        }
      }

      if (type == 4) {
        this.$toast("无订单id返回，暂不开通", 3000, 4);
        return;
      }
      const toast = this.$createToast({
        time: 0,
        mask: true,
        txt: "创建链接中..."
      });
      toast.show();
      let params = {
        gtmcuid: this.gtmcId,
        vin: this.vinNum,
        applyNumber: this.reservationNum,
        telNo: this.userTel,
        orderId: "1"
      };
      let userSelectCarModel = this.carModel?this.carModel:""
      var getTimestamp=new Date().getTime();
      testEnstr(params).then(res => {
        toast.hide();
        if (type == 1) {
          let url =
            "https://test.icheyou.net/h5-pads/#/?applyNumber=" +
            res.applyNumber +
            "&telNo=" +
            res.telNo +
            "&dealerCode=" +
            encodeURIComponent(this.dealerCode) +
            "&gtmcuid=" +
            res.gtmcuid +
            "&carModel=" +
            encodeURIComponent(userSelectCarModel) +
            "&carNum=" +
            encodeURIComponent(this.carNum) +
            "&vinNo=" +
            res.vin +
            "&applyTime=" +
            encodeURIComponent(this.selectTime) +
            "&dealerName=" +
            encodeURIComponent(this.dealerName) +
            "&enterFign=1&version=v1.0"+"&timestamp=" + getTimestamp;
          this.testUrl = url;
          this.$toast("入口一链接创建完成", 3000, 1);
        }
        if (type == 2) {
          let url =
            "https://test.icheyou.net/h5-pads/#/?dealerCode=" +
            encodeURIComponent(this.dealerCode) +
            "&dealerName=" +
            encodeURIComponent(this.dealerName) +
            "&telNo=" +
            res.telNo +
            "&gtmcuid=" +
            res.gtmcuid +
            "&vinNo=" +
            res.vin +
            "&carNum=" +
            encodeURIComponent(this.carNum) +
            "&carModel=" +
            encodeURIComponent(userSelectCarModel) +
            "&enterFign=2&version=v1.0&serviceType=1"+"&timestamp=" + getTimestamp;
          this.testUrl = url;
          this.$toast("入口二链接创建完成", 3000, 1);
        }
        if (type == 3) {
          let url =
            "https://test.icheyou.net/h5-pads/#/?dealerCode=" +
            encodeURIComponent(this.dealerCode) +
            "&dealerName=" +
            encodeURIComponent(this.dealerName) +
            "&telNo=" +
            res.telNo +
            "&gtmcuid=" +
            res.gtmcuid +
            "&vinNo=" +
            res.vin +
            "&carNum=" +
            encodeURIComponent(this.carNum) +
            "&carModel=" +
            encodeURIComponent(userSelectCarModel) +
            "&enterFign=3&version=v1.0&serviceType=2"+"&timestamp=" + getTimestamp;
          this.testUrl = url;
          this.$toast("入口三链接创建完成", 3000, 1);
        }
      });
    }
  },
  mounted() {
    this.clickEvents();
  }
};
</script>
<style lang='less' scoped>
@border-radius-width: 5px;
@blue: #3089e7;
@white: #fff;

#testUrlIndex {
  width: 100%;
  height: 100%;
  .test-url-wrap {
    width: 350px;
    height: 100%;
    .user-tel {
      input {
        width: 150px;
        padding-left: 15px;
        padding-top: 5px;
        padding-bottom: 3px;
        line-height: 25px;
        border-radius: @border-radius-width;
      }
      #selectTel{
        padding: 0 10px;
        line-height: 36px;
        color: @white;
        border-radius: @border-radius-width;
        background: @blue;
      }
      div {
        height: 36px;
        line-height: 36px;
        color: @white;
        padding: 0 15px;
        border-radius: @border-radius-width;
        background: @blue;
      }
    }
    .show-time-wrap {
      .show-time-tab {
        margin: 0 auto;
        width: 250px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        div {
          width: 50%;
          border: 1px solid @blue;
          border-radius: @border-radius-width;
          &.active {
            color: @white;
            background: @blue;
          }
          &:nth-child(1) {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            border-right: 0;
          }
          &:nth-child(2) {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }
        }
      }
      .show-time-lis {
        &.lis1 {
          height: 220px;
        }
        &.lis2 {
          height: 360px;
        }
        padding-top: 20px;
        li {
          display: inline-block;
          padding: 10px 20px;
          margin-left: 22px;
          margin-bottom: 10px;
          border: 1px solid grey;
          border-radius: @border-radius-width;
          &.active {
            background: @blue;
            border-color: @blue;
            color: @white;
          }
        }
      }
    }
    #submitBtn {
      padding: 15px 0;
      width: 200px;
      text-align: center;
      color: @white;
      border-radius: @border-radius-width;
      background: @blue;
    }
    .show-url-wrap {
      li {
        display: inline-block;
        width: 100%;
        padding: 13px 0px;
        margin-top: 20px;
        text-align: center;
        color: @white;
        border-radius: @border-radius-width;
        background: @blue;
      }
    }
    .testUrl {
      padding: 10px 5px;
      width: 100%;
      word-wrap: break-word;
      border-radius: @border-radius-width;
      border: 1px solid #daddda;
      overflow: auto;
      margin-top: 30px;
      margin-bottom: 30px;
    }
    #copyBtn {
      padding: 10px 0;
      text-align: center;
      color: @white;
      border-radius: @border-radius-width;
      background: @blue;
    }
    #weChat {
      ul {
        border: 1px solid #daddda;
        border-radius: @border-radius-width;
      }
      li {
        border-bottom: 1px solid #daddda;
        &:last-child {
          border-bottom: 0;
        }
        div {
          padding: 10px 0;
          flex: 1;
          text-align: center;
          border-right: 1px solid #daddda;
          &:first-child {
            flex: none;
            width: 50px !important;
          }
          &:nth-child(2) {
            flex: none;
            width: 130px !important;
          }
          &:last-child {
            line-height: 30px;
            border-right: 0;
          }
          height: 72px;
          line-height: 60px;
          button {
            border: 0;
            background: transparent;
            &.green {
              color: #12a52a;
            }
            &.red {
              color: #f3636b;
            }
          }
        }
      }
    }
  }
}
.lh36 {
  height: 36px !important;
  line-height: 20px !important;
}
#selectTime,
#selectCar {
  height: 36px;
  line-height: 36px;
}
#select1 {
  display: inline-block;
  width: 200px;
  height: 36px;
  padding: 0;
  padding-left: 10px;
}
.green {
  color: #12a52a;
}
.red {
  color: #f3636b;
}
.orange {
  color: orange;
}
.exit1 {
  line-height: 10px;
}
</style>
