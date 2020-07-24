<template>
  <div id="city" class="ov-h flex flex-direction_column">
    <app-header :title="title">
      <span slot="left" class="left" @click="this.common.goBack"></span>
    </app-header>
    <!-- 热门城市显示区域 -->
    <div id="showHotCity" class="pos-re">
      <img src="../../../../static/images/user-agreement-bg.png" alt class="hot-bg pos-abs" />
      <div class="hot-title flex align-items_center pos-abs">
        <div class="f16 white">热门城市</div>
        <div
          class="dingwei-name f15 white flex justify-content_flex-start align-items_center pos-abs"
        >
          <img src="../../../../static/images/white-dingwei.png" alt class="mr5" />
          <span>{{dingwei}}</span>
        </div>
      </div>
      <div id="showHotTag" class="pos-abs">
        <ul class="clear">
          <li v-for="item in hotCity" :key="item.cityId" :data-id="item.cityId">{{item.name}}</li>
        </ul>
      </div>
    </div>
    <!-- 城市列表区域 -->
    <div id="showCity" class="flex1 tx-l">
      <cube-index-list :data="cityData" @select="selectItem"></cube-index-list>
    </div>
  </div>
</template>
<script>
import { getCityLis } from '../../../commonJs/api'
import Header from "../../common/header";
export default {
  data() {
    return {
      cityData: [],
      title: "",
      dingwei: "",
      hotCity: [
        { name: "上海", cityId: "310000" },
        { name: "北京", cityId: "110000" },
        { name: "广州", cityId: "440100" },
        { name: "深圳", cityId: "440300" },
        { name: "武汉", cityId: "420100" },
        { name: "天津", cityId: "120000" },
        { name: "西安", cityId: "610100" },
        { name: "南京", cityId: "320100" },
        { name: "杭州", cityId: "330100" },
        { name: "成都", cityId: "510100" },
        { name: "重庆", cityId: "500000" },
        { name: "郑州", cityId: "410100" }
      ]
    };
  },
  components: {
    "app-header": Header
  },

  methods: {
    setHeaderTitle() {
      this.title = this.$route.meta.name;
    },
    //热门城市点击操作
    hotCityEvents() {
      let that = this;
      $("#showHotTag ul li").each(function() {
        $(this).click(function() {
          let selectedHotCity = $(this).text();
          let selectedHotCityId = $(this).attr("data-id");
          localStorage.setItem("localSelectedCity", selectedHotCity);
          localStorage.setItem("localSelectedCityId", selectedHotCityId);
          that.$router.go(-1);
        });
      });
    },
    selectItem(item) {
      localStorage.setItem("localSelectedCity",item.districtName);
      localStorage.setItem("localSelectedCityId",item.districtId);
      this.$router.go(-1);
    },
    //初始化定位城市
    initDingwei(){
      let that = this
      // let saveDingweiCity = localStorage.getItem('saveDingweiCity')
      // let saveDingweiCityId = localStorage.getItem('saveDingweiCityId')
      // if(saveDingweiCity && saveDingweiCityId){
      //     that.dingwei = saveDingweiCity
      // }else{
          AMap.plugin("AMap.CitySearch", function() {
          var citysearch = new AMap.CitySearch();
          //自动获取用户IP，返回当前城市
          citysearch.getLocalCity(function(status, result) {
              if (status === 'complete' && result.info === 'OK') {
                  if (result && result.city && result.bounds) {
                    // localStorage.setItem('saveDingweiCity',result.city)
                    // localStorage.setItem('saveDingweiCityId',result.adcode)
                    that.dingwei = result.city
                  }
              }else{
                    that.dingwei = '定位失败'
            
              }
          });
        });
      // }
    },
    //初始化城市列表
    getCityLis(){
      let that = this,
          params={};
      getCityLis(params).then(res=>{
        if(res.header.code == '10000000'){
          that.cityData = res.body
        }else{
          let msg = res.header.message
          that.$createToast({
            txt:msg,
            type:'txt'
          }).show()
        }
      })
    }
  },
  mounted() {
    this.hotCityEvents();
    this.setHeaderTitle();
    this.initDingwei();
    this.getCityLis()
  },
};
</script>
<style lang='less' scoped>
#showHotCity {
  width: 100%;
  height: 170px;
  padding-top: 20px;
  .hot-bg {
    top: 0;
    left: 0;
    display: inline-block;
    width: 104%;
    height: 100px;
    z-index: 1;
  }
  .hot-title {
    width: 340px;
    margin: 0 15px;
    z-index: 3;
    .dingwei-name {
      right: 0;
      img {
        display: inline-block;
        width: 13px;
      }
    }
  }
  #showHotTag {
    top: 45px;
    left: 0;
    right: 0;
    margin: auto;
    width: 353px;
    height: 123px;
    z-index: 4;
    background: url("../../../../static/images/hot-city-bg.png") no-repeat top
      center;
    background-size: cover;
    ul {
      padding-top: 2px;
      li {
        display: inline-block;
        margin-top: 10px;
        margin-left: 10px;
        width: 75px;
        height: 25px;
        line-height: 25px;
        font-size: 13px;
        border-radius: 13px;
        border: 1px solid #f1f3f7;
        float: left;
      }
    }
  }
}
#city {
  height: 100vh;
}
</style>
