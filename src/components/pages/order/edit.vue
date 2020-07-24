<template>
  <div id="add" class="tx-l">
    <div class="flex flex-direction_column" style="height:100vh">
      <app-header :title="title">
        <span slot="left" class="left" @click="this.common.goBack"></span>
      </app-header>
      <!-- 提交订单按钮 -->
      <div id="submitBtn" class="">
        <div class="blue">预估 <span class="orange">{{totalMoney}}</span>元<span class='ml20'>本单将用<span>{{costPoint}}</span>积分抵扣</span></div>
        <div class="addBtn flex1" @click="submit">提交订单</div>
      </div>


      <div class="add-top-info pos-re">
        <div class="add-info-bg">
          <img src="../../../../static/images/add-page-bg.png" alt />
        </div>
        <div class="add-info-form pos-abs f15">
          <ul>
            <!-- 取车显示 start -->
            <li class="flex justify-content_flex-start align-items_center" v-show='enterFign == 1'>
              <img src="../../../../static/images/address.png" alt class="w17-h15" />
              <div class="lis-div lis-div1 flex1">{{selectAddress}}</div>
            </li>
            <li class="flex justify-content_flex-start align-items_center" v-show='enterFign == 1'>
              <img src="../../../../static/images/address2.png" alt class="w17-h15"/>
              <div class="lis-div lis-div1 flex1">{{iclubStore}}</div>
            </li>
            <!-- 取车显示 end -->
            <!-- 送车显示 start -->
            <li class="flex justify-content_flex-start align-items_center" v-show='enterFign == 2'>
              <img src="../../../../static/images/address.png" alt class="w17-h15" />
              <div class="lis-div lis-div1 flex1">{{iclubStore}}</div>
            </li>
            <li class="flex justify-content_flex-start align-items_center" v-show='enterFign == 2'>
              <img src="../../../../static/images/address2.png" alt class="w17-h15"/>
              <div class="lis-div lis-div1 flex1">{{selectAddress}}</div>
            </li>
            <!-- 送车显示 end -->
            <li class="flex justify-content_flex-start align-items_center li-bb" @click="showFormatPicker">
              <img
                src="../../../../static/images/date-icon.png"
                alt
                class="w15-h15 pos-re date-icon"
              />
              <div class="lis-div flex1">
                 <input type="text" placeholder="请选择时间" class="select-date-input" readonly v-model='showDate'>
              </div>
            </li>
            <li class="flex justify-content_flex-justify align-items_center mb10 mt5">
              <div class="li-left-area flex justify-content_flex-start align-items_center">
                <img src="../../../../static/images/car-icon.png" alt class="w19-h15" />
                <div class="grey">取车</div>
                <input
                  type="text"
                  placeholder="姓名"
                  class="user-input"
                  @focus="gotoView"
                  @blur="gotoView"
                  v-model="getCarName"
                />
              </div>
              <div class="li-right-area flex justify-content_flex-start align-items_center mr15">
                <img src="../../../../static/images/phone-icon2.png" alt class="w17-h15" />
                <div>
                  <input
                    type="tel"
                    placeholder="电话"
                    class="user-input user-input1"
                    @focus="gotoView"
                    @blur="gotoView"
                    @keyup="limitInputNumber"
                    v-model="getCarTel"
                  />
                </div>
              </div>
            </li>
            <li class="flex justify-content_flex-justify align-items_center">
              <div class="li-left-area flex justify-content_flex-start align-items_center">
                <img src="../../../../static/images/car-icon.png" alt class="w19-h15" />
                <div class="grey">接车</div>
                <input
                  type="text"
                  placeholder="姓名"
                  class="user-input"
                  @focus="gotoView"
                  @blur="gotoView"
                  v-model="returnCarName"
                />
              </div>
              <div class="li-right-area flex justify-content_flex-start align-items_center mr15">
                <img src="../../../../static/images/phone-icon2.png" alt class="w17-h15" />
                <div>
                  <input
                    type="tel"
                    placeholder="电话"
                    class="user-input user-input1"
                    @focus="gotoView"
                    @blur="gotoView"
                    @keyup="limitInputNumber"
                    v-model="returnCarTel"
                  />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- 选择车辆 -->
      <div id="selectCar" class="flex1 flex flex-direction_column">
        <div class="select-car-title f13 white">请选择车辆</div>
        <div class="select-car-info flex1">
          <div class="showCarLis flex1">
            <div style="width:100%;height:5px;"></div>
            <div class="scroll-list-wrap">
              <cube-scroll ref="scroll">
                <ul class="f15" id="showCarLisUl">
                  <li
                    class="mt15 flex justify-content_flex-start align-items_center init"
                    v-for="(item,index) in carLisData"
                    :key="index"
                    :frame_num='item.vinNo'
                    :car_num='item.registerNo'
                  >
                    <div class="radio-img"></div>
                    <div class="ml10">
                      <div>
                        <span>车牌号：</span>
                        <span class="grey">{{item.registerNo}}</span>
                      </div>
                      <div class="mt10">
                        <span>车架号：</span>
                        <span class="grey">{{item.vinNo}}</span>
                      </div>
                    </div>
                  </li>
                </ul>

                <div class="showCarOther mt20">
                  <div
                    class="user-agreement-area flex justify-content_flex-start align-items_center"
                    id="user-agreement-area"
                  >
                    <img src="../../../../static/images/select.png" alt class="ml15" id="selectImg" />
                    <div class="f13">
                      <span class="grey ml5" id="agreen">同意</span>
                      <span class="orange" @click="gotoUserAgreeMent">《用户协议》</span>
                    </div>
                  </div>
                </div>
                <div style="height:130px;" @click="inPutBlur"></div>
              </cube-scroll>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 显示错误提示 -->
    <div id="showErr" style="display:none">
      <div id="mask"></div>
      <div class="show-err-info tx-c">
        <img src="../../../../static/images/err-icon.png" alt class="mt15" />
        <div class="f13 white mt10">{{showErrTest}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  costPoint,
  estimate,
  checkRepeat,
  availablePoint,
  addOrder,
  processing
  } from '../../../commonJs/api';
import Header from "../../common/header";
export default {
  data() {
    return {
      title: "",
      showDate:this.$route.query.applyTime?decodeURI(this.$route.query.applyTime).substr(0,16):'',//选择的时间
      getCarName:localStorage.getItem('localName'), //接车人姓名
      getCarTel:localStorage.getItem('localTelNo'), //接车人电话
      returnCarName:localStorage.getItem('localDealerName'), //接车人姓名
      returnCarTel: localStorage.getItem('localDealerServicePhone'), //接车人电话
      costPoint:'',//扣除积分
      userAgreementFlag: true,
      selectCarFlag: false,
      carLisData: JSON.parse(localStorage.getItem('localCarLis')),
      showErrTest: "",
      selectAddress:this.$route.query.selectAddress,//用户选择的地址
      enterFign:this.$route.query.enterFign,
      iclubStore:this.$route.query.iclubStore,
      minDate:new Date().getFullYear(),
      maxDate:new Date().getFullYear()+1,
      userPoint:'',//存储用户积分
      checkRepeat:'',//保存订单是否重复 1：可以下单   2：不可以下单
      frameNum:'',//车架号
      totalMoney:'',//滴滴返回的价格
      mileage:'',//滴滴返回的里程
      totalTime:'',//滴滴返回的时间

    };
  },
  components: {
    "app-header": Header
  },
  methods: {
    gotoUserAgreeMent(){
       $("input").blur();
      this.$router.push('/user-agreement')
    },
    datemonth(date1,date2){
      // 拆分年月日
      date1 = date1.split('-');
      // 得到月数
      date1 = parseInt(date1[0]) * 12 + parseInt(date1[1]);
      // 拆分年月日
      date2 = date2.split('-');
      // 得到月数
      date2 = parseInt(date2[0]) * 12 + parseInt(date2[1]);
      var m = Math.abs(date1 - date2);
      return m;
    },
    showFormatPicker() {

      let that = this
      if (!this.formatPicker) {
        this.formatPicker = this.$createDatePicker({
          title: '选择预约取车时间',
          min: new Date(that.minDate, 0, 1),
          max: new Date(that.maxDate, 11, 31),
          value:that.showDate?new Date(this.showDate.substr(0,4),Number(this.showDate.substr(5,2)-1),this.showDate.substr(8,2),this.showDate.substr(11,2),Number(this.showDate.substr(14,2))):new Date(),
          format: {
            year:'YYYY年',
            month: 'MM月',
            date: 'DD日',
            hour: 'hh时',
            minute: 'mm分'
          },
          startColumn:'year',
          columnCount:5,
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle
        })
      }

      this.formatPicker.show()
    },
    selectHandle(date, selectedVal, selectedText) {
      let dates = new Date()
      let nowYear = dates.getFullYear()
      let nowMonth = dates.getMonth()+1<10?'0'+Number(dates.getMonth()+1):dates.getMonth()+1
      let nowDate = dates.getDate()<10?'0'+Number(dates.getDate()):dates.getDate()
      let y = selectedVal[0]
      let m = selectedVal[1]<10?'0'+selectedVal[1]:selectedVal[1]
      let d = selectedVal[2]<10?'0'+selectedVal[2]:selectedVal[2]
      let t = selectedVal[3]<10?'0'+selectedVal[3]:selectedVal[3]
      let mm = selectedVal[4]<10?'0'+selectedVal[4]:selectedVal[4]
      let showDate = y+'-'+m+'-'+d+" "+t+':'+mm
      let date1 = y+'-'+m+'-'+d
      let date2 = nowYear+'-'+nowMonth+'-'+nowDate
      if(this.common.tabDate(date1,date2) == 1){
        this.$createToast({
          type: "txt",
          time: 2000,
          txt: "预约时间不能小于当前时间"
        }).show();
        this.showDate = ''
        return
      }
      if(this.datemonth(date1,date2) > 2){
         this.$createToast({
          type: "txt",
          time: 2000,
          txt: "最多选择当前时间后2个月"
        }).show();
        this.showDate = ''
        return
      }
      this.showDate = showDate
    },
    cancelHandle() {

    },
    // 解决ios输入框点击无效bug
    gotoView(event) {
      let This = event.currentTarget;
      setTimeout(() => {
        This.scrollIntoView({
          block: "end",
          behavior: "smooth"
        });
      }, 500);
    },
    //设置标题
    setHeaderTitle() {
      this.title = this.$route.meta.name;
    },
    //选择车辆
    selectCarEvents() {
      let that = this;
      $(".showCarLis ul li.init").each(function() {
        $(this).click(function() {
          $("input").blur();
          console.log($(this).attr('frame_num'));
          $(this)
            .toggleClass("on")
            .siblings()
            .removeClass("on");
        });
      });
    },
    // 限制手机号11位
    limitInputNumber() {
      this.common.limitInputNumber(this.getCarTel, 11, res => {
        this.getCarTel = res;
      });
      this.common.limitInputNumber(this.returnCarTel, 11, res => {
        this.returnCarTel = res;
      });
    },
    //用户协议选择
    userAgreementEvents() {
      let that = this;
      $("#agreen").click(function() {
         $("input").blur();
        that.userAgreementFlag = !that.userAgreementFlag;
        $("#user-agreement-area").toggleClass("active");
      });
      $("#selectImg").click(function() {
        $("#agreen").trigger("click");
      });
    },
    //初始化滚动区域高
    initSelectCarInfoHeight() {
      let H = $(".select-car-info").height();
      $(".showCarLis,.scroll-list-wrap").css("height", H);
    },
    //针对ios设置
    isIosSetting() {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isiOS) {
        $(".user-input1").addClass("user-input-ios");
      }
    },
    // 创建订单
    submit() {
      $("input").blur();
      let regPhone = /^1[345789]\d{9}$/;
      if(!this.showDate){
        this.$createToast({
          type: "txt",
          time: 1000,
          txt: "请选择时间"
        }).show();
        return;
      }
      if (!this.getCarName || !this.returnCarName) {
        this.showErrTest = "取车/接车人姓名未填写";
        $("#showErr").addClass("name-err");
        $("#showErr").fadeIn();
        setTimeout(function() {
          $("#showErr").fadeOut();
          this.showErrTest = "";
        }, 2000);
        setTimeout(function() {
          $("#showErr").removeClass("name-err");
        }, 3000);
        return;
      }
      if (!regPhone.test(this.getCarTel)) {
        this.showErrTest = "取车/接车人手机号码格式不正确";
        $("#showErr").fadeIn();
        setTimeout(function() {
          $("#showErr").fadeOut();
          this.showErrTest = "";
        }, 2000);
        return;
      }
      //选择车辆
      let selectedCarFlag = $("#showCarLisUl li.on").length;
      if (!selectedCarFlag) {
        this.$createToast({
          type: "txt",
          time: 1000,
          txt: "请选择车辆"
        }).show();
        return;
      }
      if(!$("#user-agreement-area").hasClass('active')){
        this.$createToast({
          type: "txt",
          time: 1000,
          txt: "请勾选并同意《用户协议》"
        }).show();
        return;
      }
      let poinStatus = Number(this.userPoint)-Number(this.costPoint)
      //查询是否重复
      this.checkRepeats()
      // if(this.checkRepeat ==0){
      //     this.$createToast({
      //       txt:'订单已经存在，不能重复下单',
      //       type:'txt'
      //     }).show()
      //     return;
      // }else if(poinStatus<0){
      //    this.$createToast({
      //       txt:'您的积分不足，无法下单',
      //       type:'txt'
      //     }).show()
      //     return;
      // }else{
          let goopTip = "\n<span color='red'>温馨提示：为了保障您的财产安全，使用取送车服务时，请确保将车内贵重物品自行妥善保管，感谢您的配合。</span>";
          this.$createDialog({
          type: 'confirm',
          title: '提交订单',
          content: '尊敬的用户，本次服务将预消费'+this.costPoint+'广汽丰田车友会会员积分，请确认.' + goopTip,
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
            this.addOrderSubmit()
          },
          onCancel: () => {
          }
        }).show()
      // }
    },
    //执行生成订单操作
    addOrderSubmit(){
      //根据传递的enterFign判断订单类型   1：取车
      let that = this,
          params={
            serviceType:this.$route.query.enterFign, //服务类型
            orderType:1,//订单类型
            publishLat:this.$route.query.selectAddressLat, //发单纬度，可与起点纬度一样
            publishLng:this.$route.query.selectAddressLng,//发单经度，可与起点经度一样
            startLat:this.$route.query.selectAddressLat, //起点纬度
            startLng:this.$route.query.selectAddressLng, //起点经度
            startPoiName:this.$route.query.selectAddress,//起点POI名称
            startPoiAddress:localStorage.getItem("saveUserSelectNearestRoad"),//起点POI地址
            endLat:this.$route.query.iclubStoreLng, //结束位置纬度
            endLng:this.$route.query.iclubStoreLat, //结束位置经度
            endPoiName:this.$route.query.iclubStore,//结束POI名称
            endPoiAddress:localStorage.getItem('localDealerAddress'),//终点POI地址
            startMan:this.getCarName,//起点联系人
            startManTel:this.getCarTel,//起点联系人电话
            endMan:this.returnCarName,//终点联系人
            endManTel:this.returnCarTel,//终点联系人电话
            carNum:$('#showCarLisUl li.on').attr('car_num'),//车牌号
            frameNum:$('#showCarLisUl li.on').attr('frame_num'),//车架号
            applyNumber:this.$route.query.applyNumber,//预约单号
            estimateMilege:this.mileage,//预估里程
            estimateMoney:this.totalMoney,//预估金额
            estimateTime:this.totalTime,//预估时间
            businessType:1,//业务渠道
            orderTime:this.showDate+':00',
            carType:this.$route.query.enterFign
          }
        addOrder(params).then(res=>{
          console.log(res);
          if(res.header.code == '10000000'){
            let orderId = res.body.orderId
            this.$createToast({
              mask:true,
              type: "txt",
              txt:"发单成功",
              time:0
            }).show();

            setTimeout(function(){
              that.$router.push({
                path:"/map-order",
                query:{
                  startLat:that.$route.query.selectAddressLat, //起点纬度
                  startLng:that.$route.query.selectAddressLng, //起点经度
                  endLat:that.$route.query.iclubStoreLng, //结束位置纬度
                  endLng:that.$route.query.iclubStoreLat, //结束位置经度
                  carNum:$('#showCarLisUl li.on').attr('car_num'),//车牌号
                  estimateTime:that.totalTime,//预估时间
                  estimateMileage:that.mileage,//预估里程
                  mapOrderStatus:10,//订单状态
                  orderId:orderId
                }
              });
            },2000)
          }else{
            let msg = res.header.message
            that.$createToast({
              type: "txt",
              txt: msg
            }).show();
          }
        })
      console.log(params);

    },
    //默认选中第一个车辆
    initFirstCar(){
      $("#showCarLisUl li").eq(0).addClass('on')
    },
    inPutBlur(){
       $("input").blur();
    },
    //服务消耗积分
    costPoints(){
      let that = this,
          params={
            configKey:'score'
          };
      costPoint(params).then(res=>{
        if(res.header.code == '10000000'){
          that.costPoint = res.body.configValue
        }else{
          let msg = res.header.message
          that.$createToast({
            type: "txt",
            txt: msg
          }).show();
        }
      })
    },
    //订单费用估算
    estimate(){
      let customerTel = this.getCarTel,
        slat = this.$route.query.selectAddressLat,
        slng = this.$route.query.selectAddressLng,
        elat = this.$route.query.iclubStoreLat,
        elng = this.$route.query.iclubStoreLng,
        role = 1,
        params={
          customerTel:customerTel,
          slat:slat,
          slng:slng,
          elat:elat,
          elng:elng,
          role:role
        };
        estimate(params).then(res=>{
          if(res.header.code='10000000'){
            if(res.body){
              this.totalMoney = res.body.totalMoney
              this.mileage = res.body.mileage
              this.totalTime = res.body.totalTime
            }
          }else{
            let msg = res.header.message
            this.$createToast({
              type: "txt",
              txt: msg
            }).show();
          }
        })
    },
    //检查订单是否重复
    checkRepeats(){
      let that = this,
        frameNum = $("#showCarLisUl li.on").attr('frame_num'),
        params={
          frameNum:frameNum,
          checkDate:that.showDate.substr(0,10)
        }
      checkRepeat(params).then(res=>{
        if(res.header.code='10000000'){
          that.checkRepeat = res.body.result
        }else{
          let msg = res.header.message;
          that.$createToast({
            type: "txt",
            txt: msg
          }).show();
        }
      })
    },
    //查询用户积分
    availablePoint(){
      let that = this,
          params={
            userId:localStorage.getItem('localUserId')
          }
      availablePoint(params).then(res=>{
        console.log(res);
        if(res.header.code='10000000'){
          that.userPoint = res.body.point
        }else{
          let msg = res.header.message;
          that.$createToast({
            type: "txt",
            txt: msg
          }).show();
        }
      })
    }
  },
  created(){
    this.availablePoint()
  },
  mounted() {
    this.setHeaderTitle();
    this.userAgreementEvents();
    this.selectCarEvents();
    this.initSelectCarInfoHeight();
    this.isIosSetting();
    this.showFormatPicker()
    this.initFirstCar()
    this.costPoints()
    this.estimate()
    console.log(this.enterFign)

  }
};
</script>
<style lang='less' scoped>
.add-top-info {
  width: 100%;
  height: 250px;
  .add-info-bg {
    img {
      width: 100%;
    }
  }
  .add-info-form {
    top: 20px;
    left: 0;
    right: 0;
    margin: auto;
    width: 355px;
    height: 240px;
    background: url("../../../../static/images/add-info-bg.png") no-repeat top
      center;
    background-size: cover;
    ul {
      margin-top: 10px;
      li {
        margin-left: 10px;
        margin-right: 10px;
        &.li-bb {
          border-bottom: 1px solid #e4e8f0;
        }

        img {
          width: 17px;
          height: 17px;
          margin-left: 13px;
          margin-right: 9px;
        }
        .user-input {
          padding: 0;
          padding-top: 1px;
          margin-left: 10px;
          width: 93px;
          height: 30px !important;
          border-radius: 0;
          outline: none;
          border: 0;
          border-bottom: 1px solid #e4e8f0;
          background: transparent;
        }
        .user-input-ios::-webkit-input-placeholder {
          position: relative;
          top: 2px;
        }
      }
    }
    .lis-div {
      padding-bottom: 10px;
      padding-top: 15px;
      &.lis-div1 {
        border-bottom: 1px solid #e4e8f0;
      }
    }
  }
}
#selectCar {
  margin: 0 auto;
  margin-top: 20px;
  width: 340px;
  .select-car-title {
    margin-left: 10px;
    padding-top: 3px;
    width: 80px;
    line-height: 20px;
    text-align: center;
    background: #c1c4c8;
  }
  .select-car-info {
    width: 100%;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    box-shadow: 0 4px 4px 0 #c1c4c8;
    background: #fff;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    .showCarLis {
      ul {
        padding-left: 15px;
        border-bottom: 1px solid #e4e8f0;
        li {
          padding-bottom: 10px;
          border-bottom: 1px solid #e4e8f0;
          &:last-child {
            border-bottom: 0;
          }
          .radio-img {
            width: 15px; /*no*/
            height: 15px; /*no*/
            background: url("../../../../static/images/radio1.png") no-repeat
              top center;
            background-size: cover;
          }
        }
        li.on .radio-img {
          background: url("../../../../static/images/radio.png") no-repeat top
            center;
          background-size: cover;
        }
      }
    }
    .user-agreement-area.active,
    .user-agreement-area {
      img {
        position: relative;
        top: -1px;
        display: inline-block;
        width: 15px;
        height: 15px;
        opacity: 1;
      }
    }
    .user-agreement-area {
      img {
        opacity: 0.5;
      }
    }
  }
}
#submitBtn {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  z-index: 2;
  box-shadow: 0px 0px 4px #4CBFFE;
  .addBtn{
    height: 46px;
    line-height: 48px;
     box-shadow: 0px 0px 4px #4CBFFE;
     font-size: 20px;
     color: #fff;
    background: #4CBFFE
  }
  .blue{
    padding:10px 0;
    font-size: 13px;
    background: #fff;
  }
}
.w19-h15 {
  width: 19px !important;
  height: 15px !important;
}
.w17-h15 {
  width: 17px !important;
  height: 15px !important;
}
.w15-h15 {
  width: 15px !important;
  height: 15px !important;
}
.date-icon {
  top: 1px;
}
#showErr {
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -47px;
  margin-left: -114px;
  width: 228px;
  height: 94px;
  z-index: 10000;
  opacity: 0.8;
  #mask {
    width: 100%;
    height: 100%;
    background: #000;
    border-radius: 4px;
  }
  .show-err-info {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    img {
      display: inline-block;
      width: 35px;
      height: 35px;
    }
  }
}
#showErr.name-err {
  margin-left: -88px;
  width: 176px;
}
.select-date-input{
  height:auto;
  border: 0;
  outline: none;
  border-radius: 0;
  padding: 0!important
}
</style>
