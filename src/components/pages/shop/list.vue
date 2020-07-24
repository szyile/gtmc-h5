<template>
  <div class="ov-h flex flex-direction_column">
    <!-- 搜索框 -->
    <app-header :title="title">
      <span slot="left" class="left" @click="this.common.goBack"></span>
    </app-header>
    <!-- 输入框 -->
    <div id="searchInput" class="flex justify-content_flex-justify">
      <div class="search-input-out pos-re">
        <img src="../../../../static/images/search-input.png" alt class="search-input-bg" />
        <input
          type="text"
          placeholder="请输入门店名称"
          class="search-input pos-abs f15"
          v-model="searchValue"
          id="search_input"
          @focus="thisFocus"
        />
        <span id="cancel" class="pos-abs f16">取消</span>
      </div>
      <div class="selectCity pos-re" @click="gotoCity">
        <img src="../../../../static/images/dingwei.png" alt class="dingwei pos-abs" />
        <div class="f15 selected-city pos-abs tx-c" :slectedCityId="slectedCityId">{{slectedCity}}</div>
        <img src="../../../../static/images/down.png" alt class="down pos-abs" />
      </div>
    </div>
    <div class="tab-box">
      <div class="tab-item" @click="tabTap(0)">
        <div :class="['tab-text',tabIndex == 0 ? 'activity':'']">推荐排序</div>
      </div>
      <div class="tab-item" @click="tabTap(1)">
        <div :class="['tab-text',tabIndex == 1 ? 'activity':'']">附近优先</div>
      </div>
    </div>
    <!-- 搜索结果区域 -->
    <div id="searchList" class="flex1" @click="thisBlur">
      <div class="scroll-list-wrap">
        <cube-scroll ref="scroll">
          <ul style="margin-bottom:120px">
            <li
              v-for="(item,index) in searchResult"
              :key="index"
              :data-id="item.id"
              @click="selectStore(item)"
            >
              <div class="item">
                <div class="item-name">广州丰田广州益贵花都店</div>
                <div class="item-h-box">
                  <div class="tuijian">推荐指数98%</div>
                  <rate v-model="value" void-icon="star" void-color="#eee" readonly />
                </div>
                <div class="item-h-box">
                  <div>广州天河区黄埔大道168号</div>
                  <div>距离：5Km</div>
                </div>
              </div>
            </li>
          </ul>
        </cube-scroll>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../../common/header";
import { Rate } from "vant";
export default {
  data() {
    return {
      title: "",
      slectedCity: "",
      slectedCityId: "",
      searchValue: "",
      searchResult: [{}, {}, {}, {}],
      tabIndex: 0,
      value:4
    };
  },
  components: {
    "app-header": Header,
    Rate
  },
  created() {},
  mounted() {
    this.setHeaderTitle();
    this.initDingwei();
  },
  methods: {
    tabTap(index) {
      if (this.tabIndex == index) {
        return;
      }
      this.tabIndex = index;
    },
    setHeaderTitle() {
      this.title = this.$route.meta.name;
    },
    gotoCity() {
      this.$router.push("/city-change");
    },
    initDingwei() {
      let that = this;
      let localSelectedCity = localStorage.getItem("localSelectedCity");
      let localSelectedCityId = localStorage.getItem("localSelectedCityId");
      if (localSelectedCity && localSelectedCityId) {
        that.slectedCity = localSelectedCity;
        that.slectedCityId = localSelectedCityId;
      } else {
        AMap.plugin("AMap.CitySearch", function() {
          var citysearch = new AMap.CitySearch();
          //自动获取用户IP，返回当前城市
          citysearch.getLocalCity(function(status, result) {
            if (status === "complete" && result.info === "OK") {
              if (result && result.city && result.bounds) {
                console.log(result);
                localStorage.setItem("localSelectedCity", result.city);
                localStorage.setItem("localSelectedCityId", result.adcode);
                that.slectedCity = result.city;
                that.slectedCityId = result.adcode;
              }
            } else {
              that.slectedCity = "定位失败";
            }
          });
        });
      }
    },
    thisBlur() {
      $("input").blur();
    },
    //输入框聚焦
    thisFocus() {
      if (this.searchHistoryData && this.searchHistoryData.length > 0) {
        if (this.searchValue.length == 0) {
          this.showHistoryFlag = true;
        } else {
          this.showHistoryFlag = false;
        }
      } else {
        this.showHistoryFlag = false;
      }
    },
    //点击取消清除输入框
    clearInput() {
      this.searchValue = "";
      this.searchResult = [];
      this.showHistoryFlag = false;
    },
    //离开路由清除选择的城市信息
    beforeRouteLeave(to, from, next) {
      localStorage.removeItem("localSelectedCity");
      localStorage.removeItem("localSelectedCityId");
      next();
    }
  }
};
</script>

<style lang='less' scoped>
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
  #searchList {
    width: 345px;
    margin: 0 auto;
    margin-top: 5px;
    border-radius: 4px;
    overflow: hidden;
    ul {
      border-radius: 4px;
      overflow: hidden;
    }
    li {
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
}
.tab-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #ffffff;
  height: 45px;
  border-bottom: solid 1px #d1d1d1;
  .tab-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 45px;
    .tab-text {
      color: #333;
      font-size: 14px;
      height: 45px;
      line-height: 45px;
    }
    .activity {
      color: #25a5f7;
      border-bottom: 3px solid #25a5f7;
    }
  }
}
.item {
  background: #fff;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border-bottom: solid 1px #f1f1f1;
  padding: 10px;
  font-size: 16px;
  .item-name {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-top: 10px;
    color: #333;
    font-weight: 600;
  }
  .item-h-box {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    color: #666;
    .tuijian {
      color: #25a5f7;
    }
  }
}
</style>