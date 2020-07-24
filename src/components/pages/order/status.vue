<template>
  <div id="info" class="tx-l">
    <div class="flex flex-direction_column" style="height:100vh">
      <div>
        <app-header :title="title">
          <span slot="left" class="left" @click="this.common.goBack"></span>
        </app-header>
      </div>
      
      <div class="scroll-list-wrap flex1">
        <cube-scroll ref="scroll">
          <div class="show-info-title pos-re">
            <div id="driverInfo" class="pos-abs" v-show="driverInfoShow">
              <div id="driverHeader">
                <img src="../../../../static/images/drive-header.png" alt v-show='showHeaderFlag'/>
                <img :src="driverHeader" alt v-show='!showHeaderFlag'/>
              </div>
              <div id="driverName" class="blue f16 pos-abs">{{driverName}}</div>
              <div id="driverNumber" class="f15 pos-abs">
                <div class="grey">
                  司机工号：
                  <span class="black">{{driverNumber}}</span>
                </div>
                <div class="grey mt15">
                  司机电话：
                  <span class="black">{{driverPhone}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="show-info-area">
            <!-- 地址信息 -->
            <div class="lis-item">
              <div class="lis-item-title f13 white">订单状态详情</div>
              <div class="lis-item-info">
                <ul v-show="detailInfoShow">
                  <!-- 已关闭 滴滴 已取消3 =》  -->
                  <li class="flex justify-content_flex-start" v-show="status81">
                    <div class="status-line opc3">
                      <img src="../../../../static/images/status-line.png" alt />
                    </div>
                    <div>
                      <!-- <div class="f14 status-title" :class="status== 81 ?'blue':''">订单已取消，预扣0积分已退回。取消原因：{{cancelReason}}</div> -->
                      <div class="f14 status-title" :class="status== 81 ?'blue':''">
                        <span>{{status81Text}}</span>
                      </div>
                      <div class="grey f10 date">{{status81Time}}</div>
                    </div>
                  </li>
                  <!-- 已关闭 滴滴 已超时2 =》 抱歉附近没有司机接单，订单自动关闭 -->
                  <li class="flex justify-content_flex-start" v-show="status80">
                    <div class="status-line opc3">
                      <img src="../../../../static/images/status-line.png" alt />
                    </div>
                    <div>
                      <!-- <div class="f14 status-title" :class="status== 80 ?'blue':''">抱歉附近没有司机接单，订单自动关闭</div> -->
                      <div class="f14 status-title" :class="status== 80 ?'blue':''">
                        <span>{{status80Text}}</span>
                      </div>
                      <div class="grey f10 date">{{status80Time}}</div>
                    </div>
                  </li>
                  <!-- 已完成 =》 订单已完成 -->
                  <li class="flex justify-content_flex-start" v-show="status70">
                    <div class="status-line opc3">
                      <img src="../../../../static/images/status-line.png" alt />
                    </div>
                    <div>
                      <!-- <div class="f14 status-title" :class="status== 70 ?'blue':''">订单已完成</div> -->
                      <div class="f14 status-title" :class="status== 70 ?'blue':''">
                        <span>{{status70Text}}</span>
                      </div>
                      <div class="grey f10 date">{{status70Time}}</div>
                    </div>
                  </li>
                  <!-- 待付款 滴滴 提交计费7 =》 司机已到达目的地 -->
                  <li class="flex justify-content_flex-start" v-show="status61">
                    <div class="status-line opc5">
                      <img src="../../../../static/images/status-line.png" alt />
                    </div>
                    <div>
                      <!-- <div class="f14 status-title" :class="status== 61 ?'blue':''">等待付款</div> -->
                      <div class="f14 status-title" :class="status== 61 ?'blue':''">
                        <span>{{status61Text}}</span>
                      </div>
                      <div class="grey f10 date">{{status61Time}}</div>
                    </div>
                  </li>
                  <!-- 待付款 滴滴 结束服务7 =》 司机已到达目的地 -->
                  <li class="flex justify-content_flex-start" v-show="status60">
                    <div class="status-line opc5">
                      <img src="../../../../static/images/status-line.png" alt />
                    </div>
                    <div>
                      <!-- <div class="f14 status-title" :class="status== 60 ?'blue':''">{{driverName}}已到达目的地</div> -->
                      <div class="f14 status-title" :class="status== 60 ?'blue':''">
                        <span>{{status60Text}}</span>
                      </div>
                      <div class="grey f10 date">{{status60Time}}</div>
                    </div>
                  </li>
                  <!-- 待交车 滴滴 开始服务6 =》 司机取到车辆正在前往目的地 -->
                  <li class="flex justify-content_flex-start" v-show="status50">
                    <div class="status-line opc6">
                      <img src="../../../../static/images/status-line.png" alt />
                    </div>
                    <div>
                      <!-- <div class="f14 status-title" :class="status== 50 ?'blue':''">{{driverName}}取到车辆正在前往目的地</div> -->
                      <div class="f14 status-title" :class="status== 50 ?'blue':''">
                        <span>{{status50Text}}</span>
                      </div>
                      <div class="grey f10 date">{{status50Time}}</div>
                    </div>
                  </li>
                  <!-- 待取车 滴滴 已到达5 =》 某某师傅已接单，请耐心等候、司机已经到达取车点等候取车 -->
                  <li class="flex justify-content_flex-start" v-show="status41">
                    <div class="status-line opc8">
                      <img src="../../../../static/images/status-line.png" alt />
                    </div>
                    <div>
                      <!-- <div class="f14 status-title" :class="status== 41 ?'blue':''">司机已经到达取车点等候取车</div> -->
                      <div class="f14 status-title" :class="status== 41?'blue':''">
                        <span>{{status41Text}}</span>
                      </div>
                      <div class="grey f10 date">{{status41Time}}</div>
                    </div>
                  </li>
                  <!-- 待取车 滴滴 已接单4 =》 某某师傅已接单，请耐心等候、司机已经到达取车点等候取车 -->
                  <li class="flex justify-content_flex-start" v-show="status40">
                    <div class="status-line opc8">
                      <img src="../../../../static/images/status-line.png" alt />
                    </div>
                    <div>
                      <!-- <div class="f14 status-title" :class="status== 40 ?'blue':''">{{driverName}}已接单，请耐心等候</div> -->
                      <div class="f14 status-title" :class="status== 40?'blue':''">
                        <span>{{status40Text}}</span>
                      </div>
                      <div class="grey f10 date">{{status40Time}}</div>
                    </div>
                  </li>
                  <!-- 待接单 滴滴发单 1 =》 等待司机接单 -->
                  <li class="flex justify-content_flex-start" v-show="status30">
                    <div class="status-line opc10">
                      <img src="../../../../static/images/status-line.png" alt />
                    </div>
                    <div>
                      <!-- <div class="f14 status-title" :class="status== 30 ?'blue':''">订单已审核，等待司机接单</div> -->
                      <div class="f14 status-title" :class="status== 30 ?'blue':''">
                        <span>{{status30Text}}</span>
                      </div>
                      <div class="grey f10 date">{{status30Time}}</div>
                    </div>
                  </li>
                  <!-- 待派单（24小时外) =》 订单已审核，等待分配司机接单 -->
                  <li class="flex justify-content_flex-start" v-show="status20">
                    <div class="status-line opc10">
                      <img src="../../../../static/images/status-line.png" alt />
                    </div>
                    <div>
                      <!-- <div class="f14 status-title" :class="status== 20 ?'blue':''">订单已审核，等待分配司机接单</div> -->
                      <div class="f14 status-title" :class="status== 20 ?'blue':''">
                        <span>{{status20Text}}</span>
                      </div>
                      <div class="grey f10 date">{{status20Time}}</div>
                    </div>
                  </li>
                  <!-- 待审核 =》 订单已经提交，等待审核 -->
                  <li class="flex justify-content_flex-start" v-show="status10">
                    <div class="status-line opc10">
                      <img src="../../../../static/images/status-line.png" alt />
                    </div>
                    <div>
                      <!-- <div class="f14 status-title" :class="status== 10 ?'blue':''">订单已经提交，
                        <span v-if="serviceType == 1">等待审核</span>
                        <span v-else>等待司机接单</span>
                      </div> -->
                      <div class="f14 status-title" :class="status== 10 ?'blue':''">
                       <span>{{status10Text}}</span>
                      </div>
                      <div class="grey f10 date">{{status10Time}}</div>
                    </div>
                  </li>
                  
                </ul>
                <!-- 当没有开始服务的时候显示 -->
                <div class="no-info-data f14" v-show="!detailInfoShow">
                  暂无详情
                </div>
                <!-- 防止部分机型 显示问题 -->
                <!-- <div id="other-div"></div> -->
              </div>
            </div>
          </div>
          <div style="height:50px"></div>
        </cube-scroll>
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
import {statusDetail} from '../../../commonJs/api';
import Header from "../../common/header";
import { async } from 'q';
export default {
  data() {
    return {
      title: "",
      cancelReason:'',//取消原因
      status: this.$route.query.orderStatus ? this.$route.query.orderStatus : 10, //记录订单状态
      //控制对应进度的显示
      status10: false, // 待审核
      status10Time: '', // 时间 
      status10Text:'',//显示的文字
      status20: false, // 待派单
      status20Time: '', // 时间 
      status20Text:'',//显示的文字
      status30: false, // 待接单
      status30Time: '', // 时间
      status30Text:'',//显示的文字 
      status40: false, // 待取车
      status40Time: '', // 时间 
      status40Text:'',//显示的文字
      status41: false, // 待取车
      status41Time: '', // 时间 
      status41Text:'',//显示的文字
      status50: false, // 待交车
      status50Time: '', // 时间 
      status50Text:'',//显示的文字
      status60: false, // 待付款
      status60Time: '', // 时间 
      status60Text:'',//显示的文字
      status61: false, // 待付款
      status61Time: '', // 时间
      status61Text:'',//显示的文字 
      status70: false, // 已完成
      status70Time: '', // 时间 
      status70Text:'',//显示的文字
      status80: false, // 已关闭
      status80Time: '', // 时间 
      status80Text:'',//显示的文字
      status81: false, // 已关闭
      status81Time: '', // 时间 
      status81Text:'',//显示的文字
      costPoint:'',//服务消耗积分
      driverName: "",
      driverHeader:"",
      driverNumber: "",
      driverPhone: "",
      statusRecordsLis:[],
      orderStatus:this.$route.query.orderStatus, // 订单状态
      driverInfoShow: false, // 判断司机信息是否显示
      detailInfoShow: false, // 判断是否有详情
      carNum: this.$route.query.carNum, // 车牌号
      estimateTime: this.$route.query.estimateTime, // 预估时长
      enterFign: localStorage.getItem("saveTypeId"), // 入口类型 
      showToastFlag:false,
      showHeaderFlag:true,
      serviceType:'',//标记是取车还是送车
    };
  },
  components: {
    "app-header": Header
  },
  methods: {
    setHeaderTitle() {
      this.title = this.$route.meta.name;
    },
    //初始化订单状态
    statusDetails(){
      this.showToastFlag = true
      let that = this,
        params={
          orderId:this.$route.query.orderId
        }
      statusDetail(params).then(res=>{
        //  返回

        if(res.header.code == "10000000"){
          this.showToastFlag = false
          this.serviceType = res.body.serviceType
          if (res.body.driverDId) {
            that.driverInfoShow =true // 司机信息是否显示
            that.driverName = res.body.driverName;//司机姓名
            that.driverHeader = res.body.driverHeaderUrl;//司机头像
            that.driverPhone = res.body.driverMob;//司机手机号
            that.driverNumber = res.body.driverDId;//司机工号
          }
          if(res.body.driverHeaderUrl && res.body.driverHeaderUrl != "www.baidu.com" ){
            that.showHeaderFlag = false
          }else{
            that.showHeaderFlag = true
          }
          if (res.body.records && res.body.records.length > 0 ) {
            that.detailInfoShow = true
            // 根据订单状态 判断进度
            that.orderStep(res.body.records)
          }
          
        }else{
          this.showToastFlag = false
          that.driverInfoShow = false // 司机信息是否显示
          that.detailInfoShow = false
          let msg = res.header.message;
          that.$toast(msg,3000,2,res.header.code)
        }
      })
    },
    // 根据订单状态 判断显示的进度
    orderStep(list){
      let slef = this
      list.map(async item => {
        if (item.orderStatus == 10) {
          slef.status10 = true
          slef.status10Time = item.createTime
          slef.status10Text = item.remarks
        }
        if (item.orderStatus == 20) {
          slef.status20 = true
          slef.status20Time = item.createTime
          slef.status20Text = item.remarks
        }
        if (item.orderStatus == 30) {
          slef.status30 = true
          slef.status30Time = item.createTime
          slef.status30Text = item.remarks
        }
        if (item.orderStatus == 40) {
          slef.status40 = true
          slef.status40Time = item.createTime
          slef.status40Text = item.remarks
        }
        if (item.orderStatus == 41) {
          slef.status41 = true
          slef.status41Time = item.createTime
          slef.status41Text = item.remarks
        }
        if (item.orderStatus == 50) {
          slef.status50 = true
          slef.status50Time = item.createTime
          slef.status50Text = item.remarks
        }
        if (item.orderStatus == 60) {
          slef.status60 = true
          slef.status60Time = item.createTime
          slef.status60Text = item.remarks
        }
        if (item.orderStatus == 61) {
          slef.status61 = true
          slef.status61Time = item.createTime
          slef.status61Text = item.remarks
        }
        if (item.orderStatus == 70) {
          slef.status70 = true
          slef.status70Time = item.createTime
          slef.status70Text = item.remarks
        }
        if (item.orderStatus == 80) {
          slef.status80 = true
          slef.status80Time = item.createTime
          slef.status80Text = item.remarks
        }
        if (item.orderStatus == 81) {
          slef.status81 = true
          slef.status81Time = item.createTime
          slef.status81Text = item.remarks
        }
      })
    }
  },
  mounted() {
    this.setHeaderTitle();
    this.statusDetails()
  }
};
</script>


<style lang='less' scoped>

.scroll-list-wrap {
  height: 100vh;

  .info-title {
    width: 100%;
    height: 192px;
    background: url("../../../../static/images/order-info-bg.png") no-repeat top
      center;
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
      width: 98px;
      line-height: 20px;
      text-align: center;
      background: #c1c4c8;
    }
    .lis-item-info {
      width: 345px;
      border-radius: 8px;
      background: #fff;
      box-shadow: 0 4px 4px 0 #c0c6d2;
      padding-top: 25px;
      .status-line {
        margin-right: 15px;
        height: 58px;
        img {
          height: 100%;
          margin-left: 8px;
        }
      }
      .status-title {
        position: relative;
        top: -2px;
        line-height: 15px;
      }
      .date {
        margin-top: 4px;
      }
    }
  }
}
.show-info-title {
  width: 100%;
  height: 137px;
  background: url("../../../../static/images/status-bg.png") no-repeat top
    center;
  background-size: 100% 87%;
}
#driverInfo {
  left: 0;
  right: 0;
  bottom: -10px;
  margin: auto;
  width: 353px;
  height: 81px;
  border-radius: 6px;
  background: url("../../../../static/images/status-head-bg.png") no-repeat top
    center;
  background-size: cover;
  #driverHeader {
    position: absolute;
    top: -40px;
    left: 15px;
    width: 75px;
    height: 75px;
    border: 2px solid #4cbffe;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
  #driverName {
    left: 33px;
    bottom: 16px;
  }
  #driverNumber {
    margin-top: 19px;
    margin-left: 114px;
  }
}
.no-info-data{
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #aaa;
}
</style>
