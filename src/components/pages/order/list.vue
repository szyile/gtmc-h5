<template>
  <div id="list" class="tx-l">
    <app-header :title="title">
      <span slot="left" class="left" @click="this.common.goBack"></span>
    </app-header>
    <div class="content">
      <div class="scroll-list-wrap">
        <div id="showList" class="mb40">
          <!--mescroll滚动区域的基本结构-->
          <mescroll-vue ref="mescroll" :up="mescrollUp" @init="mescrollInit">
            <ul class="mb30" id="showOrderLisUl">
              <li
                class="lis-item"
                v-for="(item,index) in dataList"
                :key="index"
                @click="gotoOrderInfo(item.orderId,item.orderStatus,item.frameNum)"
              >
                <div
                  class="status flex justify-content_flex-center align-items_center"
                  :class="{waiting:item.orderStatus == 60||item.orderStatus == 61}"
                >
                  <!-- 10-待审核 20-待派单 30-待接单 40、41-待取车 50-待交车 60、61-待付款 70-已完成 80、81-已关闭 -->
                  <span class="f13 white" v-show="item.orderStatus == 10">待审核</span>
                  <span class="f13 white" v-show="item.orderStatus == 20">待派单</span>
                  <span class="f13 white" v-show="item.orderStatus == 30">待接单</span>
                  <span
                    class="f13 white"
                    v-show="item.orderStatus == 40||item.orderStatus == 41"
                  >待取车</span>
                  <span class="f13 white" v-show="item.orderStatus == 50">待交车</span>
                  <span
                    class="f13 white"
                    v-show="item.orderStatus == 60||item.orderStatus == 61"
                  >待付款</span>
                  <span class="f13 white" v-show="item.orderStatus == 70">已完成</span>
                  <span
                    class="f13 white"
                    v-show="item.orderStatus == 80||item.orderStatus == 81"
                  >已关闭</span>
                  <img src="../../../../static/images/next.png" alt />
                </div>
                <div class="show-add-info">
                  <div class="f20 black mb10">{{item.carNum}}</div>
                  <ul class="lis-item-ul">
                    <li class="flex justify-content_flex-start">
                      <span></span>
                      {{item.createTime}}
                    </li>
                    <li class="flex justify-content_flex-start">
                      <span></span>
                      {{item.startPoiName}}
                    </li>
                    <li class="flex justify-content_flex-start">
                      <span></span>
                      {{item.endPoiName}}
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </mescroll-vue>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { orderPages } from "../../../commonJs/api";
import Header from "../../common/header";
import axios from "axios";
// 引入mescroll的vue组件
import MescrollVue from "mescroll.js/mescroll.vue";
export default {
  data() {
    return {
      waiting: false,
      title: "",
      status: 0,
      serverHttpCode: "",
      mescroll: null, // mescroll实例对象
      mescrollDown: {}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
      mescrollUp: {
        // 上拉加载的配置.
        callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
        //以下是一些常用的配置,当然不写也可以的.
        page: {
          num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
          size: 10 //每页数据条数,默认6
        },
        isBounce: false,
        htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
        noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
        empty: {
          //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
          warpId: "showList", //父布局的id (1.3.5版本支持传入dom元素)
          tip: "暂无数据~" //提示
        }
      },
      dataList: [] // 列表数据
    };
  },
  components: {
    "app-header": Header,
    MescrollVue // 注册mescroll组件
  },
  methods: {
    setHeaderTitle() {
      this.title = this.$route.meta.name;
    },
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    upCallback(page, mescroll) {
      let that = this,
        params = {
          current: page.num,
          size: page.size,
          // customerId:localStorage.getItem('localUserId'),
          customerId:localStorage.getItem('localGtmcuid'),
        };
      orderPages(params).then(res => {
        if (res.header.code == "10000000") {

            let arr = res.body.records;
            if (page.num === 1) that.dataList = [];
            that.dataList = that.dataList.concat(arr);
            that.$nextTick(() => {
              mescroll.endSuccess(arr.length);
            });
        } else {
          let msg = res.header.message;
          that.$toast(msg,3000,2,1,res.header.code)
          return;
        }
      });
    },
    // 跳转详情页
    gotoOrderInfo(orderId,orderStatus,frameNum) {
      //已完成跳转到已完成页面
      if(orderStatus == 70){
        this.$router.push({
          path: "/success-order",
          query: {
            orderId: orderId
          }
        });
        return
      }
      if(orderStatus == 80 || orderStatus == 81){   //已关闭直接跳转到文字详情页
        this.$router.push({
          path: "/order-info",
          query: {
            orderId: orderId
          }
        });
        return
      }
      //其他状态跳转到地图订单详情
      this.$router.push({
        path: "/map-order",
        query: {
          frameNum: frameNum
        }
      });
    },
  },
  created() {},
  mounted() {
    this.setHeaderTitle();
  }
};
</script>
<style lang='less' scoped>
.mescroll {
  position: absolute;
  bottom: 0;
  top: 1px;
  height: 100vh;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.content {
  position: fixed;
  width: 100%;
  height: 100vh;

  #showOrderLisUl {
    width: 365px;
    margin: 0 auto;
    margin-bottom: 60px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    .lis-item {
      overflow: hidden;
      position: relative;
      width: 100%;
      height: 170px;
      background: url("../../../../static/images/order-list-bg.png") no-repeat
        center center;
      background-size: cover;
      .status {
        position: absolute;
        right: 10px;
        top: 23px;
        width: 69px;
        height: 25px;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        background: #4cbffe;
        span {
          margin-top: 3px;
        }
        img {
          width: 6px;
          margin-left: 5px;
          margin-top: 1px;
        }
      }
      .waiting {
        background: #ff981e;
      }
      .show-add-info {
        margin-top: 26px;
        margin-left: 25px;
        .lis-item-ul {
          color: #94999e;
          font-size: 15px;
          li {
            display: inline-block;
            width: 330px;
            line-height: 28px;
            overflow: hidden; /*自动隐藏文字*/
            text-overflow: ellipsis; /*文字隐藏后添加省略号*/
            white-space: nowrap; /*强制不换行*/
            span {
              display: inline-block;
              position: relative;
              top: -3px;
              margin-right: 5px;
              width: 5px; /*no*/
              height: 5px; /*no*/
              border-radius: 50%;
              background: #ff981e;
            }
          }
        }
      }
    }
  }
}

.scroll-list-wrap {
  height: 100vh;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
