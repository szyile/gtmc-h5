<template>
  <div id="search" class="tx-l">
    
    <!-- 搜索框 -->
    <div class="flex flex-direction_column" style="height:100vh">
      <app-header :title="title">
      <span slot="left" class="left" @click="this.common.goBack"></span>
    </app-header>
      <!-- 输入框 -->
      <div id="searchInput" class="flex justify-content_flex-justify">
        <div class="selectCity pos-re" @click="gotoCity">
          <img src="../../../../static/images/dingwei.png" alt class="dingwei pos-abs" />
          <div class="f15 selected-city pos-abs tx-c" :slectedCityId='slectedCityId'>{{slectedCity}}</div>
          <img src="../../../../static/images/down.png" alt class="down pos-abs" />
        </div>
        <div class="search-input-out pos-re">
          <img src="../../../../static/images/search-input.png" alt class="search-input-bg" />
          <input
            type="text"
            placeholder="请输入地址"
            class="search-input pos-abs f15"
            v-model="searchValue"
            id="search_input"
            @focus='thisFocus'
          />
          <span id="cancel" class="pos-abs f16">取消</span>
        </div>
      </div>
      <!-- 历史记录搜索 -->
      <div id="history" v-show="showHistoryFlag" class="pos-re">
        <ul>
          <li v-for='(item,index) in searchHistoryData' :key="index" @click="historyInfo(item)">
            {{item}}
          </li>
        </ul>
        <div class="pos-abs">历史输入记录</div>
      </div>
      <!-- 搜索结果区域 -->
      <div id="searchList" class="flex1" v-show="searchResultStatus == 1" @click="thisBlur">
        <div class="scroll-list-wrap">
          <cube-scroll ref="scroll">
            <ul style="margin-bottom:120px">
              <li v-for="(item,index) in searchResult" :key="index" :data-id="item.id" @click='selectStore(item)'>
                <div class="ml10 lis-out mr10">
                  <div class="f18 mt20">{{item.name}}</div>
                  <div class="f13 grey mt5 mb10" style="line-height:20px">{{item.address}}</div>
                </div>
              </li>
            </ul>
          </cube-scroll>
        </div>
      </div>
    </div>
    <!-- 暂无搜索结果 -->
    <div id="searNone" class="tx-c" v-show='noSearch'>
      <div class="grey f14">暂无结果，请重新搜索~</div>
    </div>
  </div>
</template>
<script>
import AMap from "AMap";
import Header from "../../common/header";
export default {
  data() {
    return {
      title: "",
      slectedCity:'',
      slectedCityId:'',
      searchValue: "",
      searchResultStatus: 0, //记录搜索结果是否存在状态，   1：存在搜索结果    2：不存在
      searchResult: [],
      noSearch:false,
      searchHistoryData:JSON.parse(localStorage.getItem('lastHistorySearchData')),
      showHistoryFlag:false,
      historyList:JSON.parse(localStorage.getItem('lastHistorySearchData'))?JSON.parse(localStorage.getItem('lastHistorySearchData')):[]
    };
  },
  components: {
    "app-header": Header
  },
  watch:{
    searchValue(v){
      if(v<1){
        this.showHistoryFlag = true
      }
    }
  },
   created() {
    this.searchValue=this.$route.query.serchAddress?this.$route.query.serchAddress:''
    console.log(this.searchValue);
    if(this.searchValue){
    this.historyInfo(this.searchValue)
    }
  },
  methods: {
     setHeaderTitle() {
      this.title = this.$route.meta.name;
    },
    thisBlur(){
      $('input').blur()
    },
    //输入框聚焦
    thisFocus(){
      if(this.searchHistoryData && this.searchHistoryData.length>0){
        if(this.searchValue.length == 0){
          this.showHistoryFlag = true
        }else{
          this.showHistoryFlag = false
        }
      }else{
        this.showHistoryFlag = false
      }
    },
    //点击取消清除输入框
    clearInput() {
      let that = this;
      $("#cancel").click(function() {
        that.searchValue = "";
        that.searchResultStatus = 0;
        that.searchResult = [];
        that.showHistoryFlag = false
      });
    },
    gotoCity() {
      this.$router.push("/city-change");
    },
    historyInfo(value){
      this.showHistoryFlag = false
      let that = this;
      that.searchValue = value
      setTimeout(res=>{
        if(that.searchValue){
            var keywords = that.searchValue
            that.showHistoryFlag = false
            AMap.plugin('AMap.PlaceSearch', function(){
              var autoOptions = {
                city: that.slectedCity,
                citylimit:true,
                pageSize:10
              }
              var placeSearch = new AMap.PlaceSearch(autoOptions);
              placeSearch.search(keywords, function(status, result) {
                if(result.info == 'OK'){
                   if(that.searchValue){
                     that.searchResult = result.poiList.pois
                      that.searchResultStatus = 1
                      that.noSearch = false
                   }
                }else{
                  if(that.searchValue){
                    that.searchResultStatus = 0
                    that.noSearch = true
                  }
                }
              })
            }) 
        }else{
            that.searchResultStatus = 0
            return 
        }
      },200)
      
    },
    // 搜索地址
    searchData() {
      let that = this;
      $('#search_input').bind('input propertychange', function() {
        if(that.searchValue){
            var keywords = that.searchValue
            that.showHistoryFlag = false
            AMap.plugin('AMap.PlaceSearch', function(){
              var autoOptions = {
                city: that.slectedCity,
                citylimit:true,
                pageSize:10
              }
              var placeSearch = new AMap.PlaceSearch(autoOptions);
              placeSearch.search(keywords, function(status, result) {
                if(result.info == 'OK'){
                  if(that.searchValue){
                    that.searchResult = result.poiList.pois
                    that.searchResultStatus = 1
                    that.noSearch = false
                  }
                }else{
                  if(that.searchValue){
                    that.searchResultStatus = 0
                    that.noSearch = true
                  }
                }
              })
            }) 
        }else{
            that.searchResultStatus = 0
            return 
        } 
      })
    },
    // 选择门店操作
    selectStore(data){
      this.historyList.unshift(data.name)
      this.historyList = [...new Set(this.historyList)]
      if(this.historyList.length>10){
        this.historyList.pop()
      }
      let selectStoreAddress = data.name
      //本地存储10条搜索记录
      localStorage.setItem('lastHistorySearchData',JSON.stringify(this.historyList))
      let selectNearestRoad = data.address 
      let lat = data.location.lat
      let lng = data.location.lng
      localStorage.setItem('saveUserSelectNearestRoad',selectNearestRoad)
      localStorage.setItem('saveUserSelectAddress',selectStoreAddress)
      localStorage.setItem('saveUserSelectAddressLat',lat)
      localStorage.setItem('saveUserSelectAddressLng',lng)
      localStorage.setItem("chooseAddress",1);
      this.$router.go(-1)
    },
    initDingwei(){
      let that = this
      let localSelectedCity = localStorage.getItem('localSelectedCity')
      let localSelectedCityId = localStorage.getItem('localSelectedCityId')
      if(localSelectedCity && localSelectedCityId){
          that.slectedCity = localSelectedCity
          that.slectedCityId = localSelectedCityId
      }else{
          AMap.plugin("AMap.CitySearch", function() {
          var citysearch = new AMap.CitySearch();
          //自动获取用户IP，返回当前城市
          citysearch.getLocalCity(function(status, result) {
              if (status === 'complete' && result.info === 'OK') {
                  if (result && result.city && result.bounds) {
                    localStorage.setItem('localSelectedCity',result.city)
                    localStorage.setItem('localSelectedCityId',result.adcode)
                      that.slectedCity = result.city
                      that.slectedCityId = result.adcode
                  }
              }else{
                    that.slectedCity = '定位失败'
              }
          });
        });
      }
    }
  },
  mounted() {
    this.clearInput();
    this.searchData();
    this.setHeaderTitle()
    this.initDingwei()
  },
  //来开路由清除选择的城市信息
  beforeRouteLeave (to, from, next) {
    localStorage.removeItem('localSelectedCity')
    localStorage.removeItem('localSelectedCityId')
    next()
  }
};
</script>
<style lang='less' scoped>
#search{
  width: 100%;
  height: 100vh;
}
#searchInput {
  margin-top: 10px;
  margin-left: 5px;
  margin-right: 5px;
  .selectCity {
    width: 120px;
    height: 55px;
    background: url("../../../../static/images/select-city-bg.png") no-repeat
      top center;
    background-size: 100% 100%;
    .dingwei {
      display: inline-block;
      width: 17px;
      top: 14px;
      left: 18px;
    }
    .selected-city {
      top: 15px;
      left: 40px;
      max-width: 50px;
      line-height: 20px;
      overflow: hidden; /*自动隐藏文字*/
      text-overflow: ellipsis; /*文字隐藏后添加省略号*/
      white-space: nowrap; /*强制不换行*/
      color: #4cbffe;
    }
    .down {
      display: inline-block;
      width: 10px;
      top: 21px;
      right: 18px;
    }
  }
  .search-input-out {
    width: 255px;
    .search-input-bg {
      display: inline-block;
      width: 100%;
    }
    .search-input {
      top: 11px;
      left: 23px;
      padding: 0;
      width: 150px;
      height: 26px;
      line-height: 26px;
      outline: none;
      border-radius: 0;
      border: 0;
      border-right: 1px solid #e3e5eb; /*no*/
      padding-right: 10px;
    }
    #cancel {
      top: 12px;
      right: 27px;
      line-height: 25px;
      color: #375c88;
    }
  }
}
#searchList {
  width: 345px;
  margin: 0 auto;
  margin-top: 5px;
  border-radius: 4px;
  overflow: hidden;
  ul{
    border-radius: 4px;
     overflow: hidden;
  } li {
    .lis-out {
      border-bottom: 1px solid #e4e8f0;
    }
  }
  ul li:last-child {
    .lis-out {
      border-bottom: 0;
    }
  }
}
#searNone {
  position: absolute;
  left: 0;
  right:0;
  top: 150px;
}
.scroll-list-wrap{
  height: 100vh;
  background: #fff;
  overflow: hidden;
}
#history{
  margin: 0 auto;
  width: 345px;
  height: auto;
  color: grey;
  font-size: 14px;
  background: #fff;
  border-radius: 4px;
  ul{
    border-radius: 4px;
    padding: 3px 15px 35px 15px;
    li{
      padding: 10px;
      line-height: 20px;
      border-bottom: 1px solid #e4e8f0;
      &:last-child{
        border-bottom: 0
      }
    }
  }
  div{
    font-size: 12px;
    right: 8px;
    bottom: 8px
  }
}
</style>
