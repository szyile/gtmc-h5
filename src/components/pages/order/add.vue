<template>
  <div id="add" class="tx-l">
    <div class="flex flex-direction_column" style="height:100vh">
      <app-header :title="title">
        <span slot="left" class="left" @click="this.common.goBack"></span>
      </app-header>

      <!-- 提交订单按钮 -->
      <div id="submitBtn" class>
        <div
          class="blue"
          @click="showNewMoneyFlag = !showNewMoneyFlag"
        >
          <div class="flex justify-content_flex-justify" v-show="activityAuths == 0">
            <div id="radioOut" class="justify-content_flex-start align-items_center">
              <div id="di"></div>
              <span>本单预估</span>
              <span class="orange">{{totalMoney2}}</span>
              <span>
                ，将用
                <span class="span-point">{{costPoint}}</span> 积分抵扣
              </span>
            </div>
            <div id="radioNo" v-show="!showNewMoneyFlag"></div>
            <div id="radioSure" v-show="showNewMoneyFlag"></div>
          </div>
        <!-- 免单 -->
          <div id="activityAuths" class="flex justify-content_flex-justify" v-show="activityAuths == 1" @click="showActivityAuthsArea = !showActivityAuthsArea">
              <div id="radioOut" class="justify-content_flex-start align-items_center">
              <div id="di"></div>
              <span>本单预估</span>
              <span class="orange">{{totalMoney2}}</span>
              <!-- 使用优惠 -->
              <span v-show="mianFlag">
                ，将用<span class="span-point">免单</span>优惠抵扣
              </span>
              <!-- 不使用优惠 -->
              <span v-show="!mianFlag">
                ，将用
                <span class="span-point">{{newCostPoint}}</span> 积分抵扣
              </span>
            </div>
            <div id="rightImg"><img src="../../../../static/images/right.png" alt=""></div>
          </div>

        </div>
        <div class="addBtn mt10 flex justify-content_flex-justify">
          <div class="f11 ml20 mt20" v-show="!showNewMoneyFlag">
            预估支付：
            <span class="f20 orange">{{totalMoney2}}</span>
          </div>
          <!--未选择时-->
          <div class="f11 ml20 mt20" v-show="showNewMoneyFlag">
            预估支付：
            <span class="f11" style="text-decoration:line-through;">{{totalMoney2}}</span>
            <span class="orange">￥</span>
            <span class="f20 orange">0</span>
          </div>
          <!--选择时-->
          <div id="submitNo" @click="submitTips" v-show="!showSubmitBtn">提交订单</div>
          <!--置灰按钮-->
          <div id="submitSure" @click="submit" v-show="showSubmitBtn">提交订单</div>
          <!--支付按钮-->
        </div>
      </div>

      <div class="add-top-info pos-re">
        <div class="add-info-bg">
          <img src="../../../../static/images/add-page-bg.png" alt />
        </div>
        <div class="add-info-form pos-abs f15">
          <ul>
            <!-- 取车显示 start -->
            <li class="flex justify-content_flex-start align-items_center" v-show="getOrSend == 1">
              <img src="../../../../static/images/address.png" alt class="w17-h15" />
              <div class="lis-div lis-div1 flex1">{{selectAddress}}</div>
            </li>
            <li class="flex justify-content_flex-start align-items_center" v-show="getOrSend == 1">
              <img src="../../../../static/images/address2.png" alt class="w17-h15" />
              <div class="lis-div lis-div1 flex1">{{iclubStore}}</div>
            </li>
            <!-- 取车显示 end -->
            <!-- 送车显示 start -->
            <li class="flex justify-content_flex-start align-items_center" v-show="getOrSend == 2">
              <img src="../../../../static/images/address.png" alt class="w17-h15" />
              <div class="lis-div lis-div1 flex1">{{iclubStore}}</div>
            </li>
            <li class="flex justify-content_flex-start align-items_center" v-show="getOrSend == 2">
              <img src="../../../../static/images/address2.png" alt class="w17-h15" />
              <div class="lis-div lis-div1 flex1">{{selectAddress}}</div>
            </li>
            <!-- 送车显示 end -->
            <li
              class="flex justify-content_flex-start align-items_center li-bb"
              @click="showDatePicker"
            >
              <img
                src="../../../../static/images/date-icon.png"
                alt
                class="w15-h15 pos-re date-icon"
              />
              <div class="lis-div flex1">
                <input
                  type="text"
                  placeholder="请选择时间"
                  class="select-date-input"
                  readonly
                  v-model="showDate"
                />
              </div>
            </li>
            <!-- 上门取车  start -->
            <li
              class="flex justify-content_flex-justify align-items_center mb10 mt5"
              v-show="getOrSend == 1"
            >
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
            <li
              class="flex justify-content_flex-justify align-items_center"
              v-show="getOrSend == 1"
            >
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
                  readonly
                  unselectable="on"
                  style="color:grey"
                />
              </div>
              <div class="li-right-area flex justify-content_flex-start align-items_center mr15">
                <img src="../../../../static/images/phone-icon2.png" alt class="w17-h15" />
                <div>
                  <input
                    type="tel"
                    placeholder="电话"
                    class="user-input user-input1 grey"
                    @focus="gotoView"
                    @blur="gotoView"
                    @keyup="limitInputNumber"
                    readonly
                    unselectable="on"
                    v-model="returnCarTel"
                  />
                </div>
              </div>
            </li>
            <!-- 上门取车  end -->
            <!-- 送车上门  start -->
            <li
              class="flex justify-content_flex-justify align-items_center mb10 mt5"
              v-show="getOrSend == 2"
            >
              <div class="li-left-area flex justify-content_flex-start align-items_center">
                <img src="../../../../static/images/car-icon.png" alt class="w19-h15" />
                <div class="grey">取车</div>
                <input
                  type="text"
                  placeholder="姓名"
                  class="user-input"
                  @focus="gotoView"
                  @blur="gotoView"
                  readonly
                  unselectable="on"
                  v-model="returnCarName"
                  style="color:grey"
                />
              </div>
              <div class="li-right-area flex justify-content_flex-start align-items_center mr15">
                <img src="../../../../static/images/phone-icon2.png" alt class="w17-h15" />
                <div>
                  <input
                    type="tel"
                    placeholder="电话"
                    class="user-input user-input1 grey"
                    @focus="gotoView"
                    @blur="gotoView"
                    @keyup="limitInputNumber"
                    readonly
                    unselectable="on"
                    v-model="returnCarTel"
                  />
                </div>
              </div>
            </li>
            <li
              class="flex justify-content_flex-justify align-items_center"
              v-show="getOrSend == 2"
            >
              <div class="li-left-area flex justify-content_flex-start align-items_center">
                <img src="../../../../static/images/car-icon.png" alt class="w19-h15" />
                <div class="grey">接车</div>
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
            <!-- 上门取车  end -->
          </ul>
        </div>
      </div>

      <!-- 选择车辆 -->
      <div id="selectCar" class="flex1 flex flex-direction_column">
        <div class="select-car-title f13 white">请确认车辆</div>
        <div class="select-car-info flex1">
          <div class="showCarLis flex1">
            <div style="width:100%;height:5px;"></div>
            <div class="scroll-list-wrap">
              <ul class="f15" id="showCarLisUl">
                <li
                  class="mt15 flex justify-content_flex-start align-items_center init"
                  v-for="(item,index) in carLisData"
                  :key="index"
                  :frame_num="item.vinNo"
                  :car_num="formData.num0+formData.num1+formData.num2+formData.num3+formData.num4+formData.num5+formData.num6+formData.num7"
                >
                  <div class="radio-img"></div>
                  <div class="ml10">
                    <div class="flex justify-content_flex-start align-items_center">
                      <span>车牌号：</span>
                      <div class="wrap">
                        <div class="num-box">
                          <div class="num0" @click="clickFirstWrap()">
                            <span>{{formData.num0}}</span>
                          </div>
                          <div class="num1" @click="clickKeyWordWrap(1)">
                            <span>{{formData.num1}}</span>
                          </div>
                          <em class="spot"></em>
                          <div class="num1" @click="clickKeyWordWrap(2)">
                            <span>{{formData.num2}}</span>
                          </div>
                          <div class="num1" @click="clickKeyWordWrap(3)">
                            <span>{{formData.num3}}</span>
                          </div>
                          <div class="num1" @click="clickKeyWordWrap(4)">
                            <span>{{formData.num4}}</span>
                          </div>
                          <div class="num1" @click="clickKeyWordWrap(5)">
                            <span>{{formData.num5}}</span>
                          </div>
                          <div class="num1" @click="clickKeyWordWrap(6)">
                            <span>{{formData.num6}}</span>
                          </div>
                          <div class="num1 pos-re" @click="clickKeyWordWrap(7)">
                            <span class="numxinicon pos-abs" v-show="numxinicon">新</span>
                            <span class="numxin pos-abs">{{formData.num7}}</span>
                          </div>
                        </div>
                      </div>
                      <!-- <input type="text" placeholder="请输入车牌" id="userCarNum" class="grey f14" v-model='item.registerNo'> -->
                      <!-- <span class="grey" id="userCarNum">{{item.registerNo}}</span> -->
                    </div>
                    <div class="mt10">
                      <span>车架号：</span>
                      <span class="grey">{{item.vinNo}}</span>
                    </div>
                  </div>
                </li>
              </ul>
              <!-- <div style="height:130px;" @click="inPutBlur"></div> -->
            </div>
            <div class="showCarOther mt15">
              <div
                class="user-agreement-area flex justify-content_flex-start align-items_center pos-re"
                id="user-agreement-area"
              >
                <!-- 用于选中用户协议 -->
                <div id="agreeBtn" class="pos-abs"></div>
                <img src="../../../../static/images/select.png" alt class="ml15" id="selectImg" />
                <div class="f13">
                  <span class="grey ml5" id="agreen">同意</span>
                  <span class="orange" @click="gotoUserAgreeMent">《用户协议》</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="selectCarBottom"></div>
    </div>
    <!-- 显示错误提示 -->
    <div id="showErr" style="display:none">
      <div id="mask"></div>
      <div class="show-err-info tx-c">
        <img src="../../../../static/images/err-icon.png" alt class="mt15" />
        <div class="f13 white mt10">{{showErrTest}}</div>
      </div>
    </div>
    <!-- 定制化toast -->
    <div id="toastDiv" v-show="showToastFlag">
      <div id="toastMas"></div>
      <div id="toastArea">
        <div class="tx-c">
          <img src="../../../../static/images/loading.gif" alt />
        </div>
        <div class="white f14 tx-c mt15">{{toastText}}</div>
      </div>
    </div>
    <!-- 自定义时间选择器 -->
    <awesome-picker
      ref="awesomeDatePicker"
      :colorConfirm="picker.colorConfirm"
      :swipeTime="picker.swipeTime"
      :textTitle="picker.textTitle"
      :data="timeData"
      @confirm="handlePickerConfirm"
    ></awesome-picker>

    <!-- 车牌号键盘 -->
    <div class="first-word-wrap" v-if="firstWrapStatus">
      <div class="cancelBtn align-items_center">
        <span @click="firstWrapStatus=false">取消</span>
        <span
          class="f12"
        >车牌号：{{formData.num0}}{{formData.num1}}{{formData.num2}}{{formData.num3}}{{formData.num4}}{{formData.num5}}{{formData.num6}}{{formData.num7}}</span>
        <span @click="submitFn">完成</span>
      </div>
      <div class="first-word" @click="selectFirstWord($event)">
        <div class="word">
          <span>京</span>
        </div>
        <div class="word">
          <span>湘</span>
        </div>
        <div class="word">
          <span>津</span>
        </div>
        <div class="word">
          <span>鄂</span>
        </div>
        <div class="word">
          <span>沪</span>
        </div>
        <div class="word">
          <span>粤</span>
        </div>
        <div class="word">
          <span>渝</span>
        </div>
        <div class="word">
          <span>琼</span>
        </div>
      </div>
      <div class="first-word" @click="selectFirstWord($event)">
        <div class="word">
          <span>翼</span>
        </div>
        <div class="word">
          <span>川</span>
        </div>
        <div class="word">
          <span>晋</span>
        </div>
        <div class="word">
          <span>贵</span>
        </div>
        <div class="word">
          <span>辽</span>
        </div>
        <div class="word">
          <span>云</span>
        </div>
        <div class="word">
          <span>吉</span>
        </div>
        <div class="word">
          <span>陕</span>
        </div>
      </div>
      <div class="first-word" @click="selectFirstWord($event)">
        <div class="word">
          <span>黑</span>
        </div>
        <div class="word">
          <span>甘</span>
        </div>
        <div class="word">
          <span>苏</span>
        </div>
        <div class="word">
          <span>青</span>
        </div>
        <div class="word">
          <span>浙</span>
        </div>
        <div class="word">
          <span>皖</span>
        </div>
        <div class="word">
          <span>藏</span>
        </div>
        <div class="word">
          <span>闽</span>
        </div>
      </div>
      <div class="first-word" @click="selectFirstWord($event)">
        <div class="word">
          <span>蒙</span>
        </div>
        <div class="word">
          <span>赣</span>
        </div>
        <div class="word">
          <span>桂</span>
        </div>
        <div class="word">
          <span>鲁</span>
        </div>
        <div class="word">
          <span>宁</span>
        </div>
        <div class="word">
          <span>豫</span>
        </div>
        <div class="word">
          <span>新</span>
        </div>
        <div class="word bordernone"></div>
      </div>
    </div>
    <div class="keyboard-wrap" v-if="keyBoardStatus === true">
      <div class="cancel align-items_center">
        <span @click="keyBoardStatus = false">取消</span>
        <span
          class="f12"
        >车牌号：{{formData.num0}}{{formData.num1}}{{formData.num2}}{{formData.num3}}{{formData.num4}}{{formData.num5}}{{formData.num6}}{{formData.num7}}</span>
        <span @click="submitFn">完成</span>
      </div>
      <div class="keyboard number-wrap" v-if="activeKeyWordIndex !== 1">
        <span
          v-for="(item,index) in allKeyWord._1"
          :key="index"
          @click="clickKeyBoard(item)"
        >{{item}}</span>
      </div>
      <div class="keyboard">
        <span
          v-for="(item,index) in allKeyWord._3"
          :key="index"
          @click="clickKeyBoard(item)"
        >{{item}}</span>
      </div>
      <div class="keyboard">
        <span
          v-for="(item,index) in allKeyWord._4"
          :key="index"
          @click="clickKeyBoard(item)"
        >{{item}}</span>
      </div>
      <div class="keyboard">
        <span
          v-for="(item,index) in allKeyWord._5"
          :key="index"
          @click="clickKeyBoard(item)"
        >{{item}}</span>
      </div>
      <div class="keyboard" v-show='clearAllFlag'>
        <span
          v-for="(item,index) in allKeyWord._6"
          :key="index"
          @click="clickKeyBoard(item)"
        >{{item}}</span>
        <span class="bordernone"></span>
        <span class="bordernone"></span>
        <span class="bordernone"></span>
        <span class="clear-all" @click="clearAll">清空</span>
      </div>
      <div class="keyboard keyboard-last" v-if="activeKeyWordIndex !== 1">
        <span
          v-for="(item,index) in allKeyWord._7"
          :key="index"
          @click="clickKeyBoard(item)"
        >{{item}}</span>
        <!-- <span class="bordernone"></span> -->
        <span class="delete" @click="deleteWord">
          <img src="../../../../static/images/icon-delete.png" alt />
        </span>
      </div>
    </div>
    <!-- 优惠选择 -->
    <div id="showActivityAuths" v-show='showActivityAuthsArea'>
      <div id="mask1"></div>
      <div class="showActivityAuths-area">
        <div class="f16 fb title">请选择优惠</div>
        <ul>
          <li class="flex justify-content_flex-justify f14"
          v-for="(item,index) in activityAuthLis"
          :key='index'
          :activityId='item.activityId'
          :activityName='item.activityName'
          >
              <div class="tx-l ov-e">{{item.activityName}}</div>
              <div class="select-div" :class='index == 0?"active":""'></div>
          </li>
          <li class="flex justify-content_flex-justify f14">
              <div>{{costPoint}}积分抵扣</div>
              <div class="select-div"></div>
          </li>
        </ul>
        <div class="showActivityAuths-sure">完成</div>
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
  processing,
  timeList
} from "../../../commonJs/api";
import Header from "../../common/header";
// 特殊字符
// const pattern=/[`~!@#$^&*()=|{}':;',\\\[\]\.<>\/?~！@#￥……&*\-+×÷%（）——|{}【】_'；：""'。，、？\s]/g;
let numExg = /[0-9]/i;//匹配数字
let numExg1 = /[a-z]/i;//匹配字母
export default {
  data() {
    return {
      picker: {
        textTitle: "请选择预约时间",
        colorConfirm: "#3089e7",
        swipeTime: 10
      },
      timeData: [],
      title: "",
      showDate: "", //
      // showDate:this.$route.query.applyTime !=0?decodeURI(this.$route.query.applyTime).substr(0,16):'',//选择的时间
      getCarName: localStorage.getItem("localName"), //接车人姓名
      getCarTel: localStorage.getItem("localTelNo"), //接车人电话
      returnCarName: localStorage.getItem("localDealerRel"), //接车人姓名
      returnCarTel: localStorage.getItem("localDealerServicePhone"), //接车人电话
      costPoint: "", //扣除积分
      userAgreementFlag: true,
      selectCarFlag: false,
      carLisData: JSON.parse(localStorage.getItem("localCarLis")),
      showErrTest: "",
      selectAddress: this.$route.query.selectAddress, //用户选择的地址
      getOrSend: this.$route.query.getOrSend,
      enterFign: this.$route.query.enterStatus,
      iclubStore: this.$route.query.iclubStore,
      minDate: new Date().getFullYear(),
      maxDate: new Date().getFullYear() + 1,
      userPoint: "", //存储用户积分
      checkRepeat: "", //保存订单是否重复 1：可以下单   0：不可以下单
      frameNum: "", //车架号
      totalMoney: "", //滴滴返回的价格
      mileage: "", //滴滴返回的里程
      totalTime: "", //滴滴返回的时间
      showToastFlag: false, //定制化提示
      toastText: "加载中",
      totalMoney2: "",
      showNewMoneyFlag: false,

      //车牌号键盘相关
      formData: {
        num0: "",
        num1: "",
        num2: "",
        num3: "",
        num4: "",
        num5: "",
        num6: "",
        num7: ""
      },
      allKeyWord: {
        _1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
        _3: ["A", "B", "C", "D", "E", "F", "G", "H"],
        _4: ["J", "K", "L", "M", "N", "P", "Q", "R"],
        _5: ["S", "T", "U", "V", "W", "X", "Y","Z"],
        _6: [],
        _7: ["港", "澳", "学", "领", "警"]
      },
      activeKeyWordIndex: 1, // 当前车牌号
      keyBoardStatus: false,
      firstWrapStatus: false, // 选择弹窗
      numxinicon: true, //控制新能源标识
      clearAllFlag:true,//控制清除按钮
      activityAuths:this.$route.query.activityAuth,//是否免单  1免单 0不免单
      showActivityAuthsArea:false,//控制优惠选择区域
      showActivityAuthsAreaNum:this.$route.query.activityAuth,//0不免单  1 免单
      newCostPoint:0,//动态设置免单时 的选择积分
      mianFlag:true,//动态显示免单优惠文案
      activityAuthLis:localStorage.getItem("activityAuthLis")?JSON.parse(localStorage.getItem("activityAuthLis")):[],//活动列表
      activityIdLis:[],//用户选择的活动ID  数组
    };
  },
  components: {
    "app-header": Header
  },
  methods: {
    //初始化获取车辆列表
    initCarInfo() {
      let carInfo = JSON.parse(localStorage.getItem("localCarLis"))[0].registerNo;
      let carNumArr = carInfo.split("");
      let str = carNumArr[0];
      carNumArr.map((vlaue,index)=>{
        if(index>0){
          if(numExg.test(vlaue) || numExg1.test(vlaue)){
              str +=vlaue
          }
        }
      })
      let arr = [...str];
      this.formData.num0 = arr[0];
      this.formData.num1 = arr[1];
      this.formData.num2 = arr[2];
      this.formData.num3 = arr[3];
      this.formData.num4 = arr[4];
      this.formData.num5 = arr[5];
      this.formData.num6 = arr[6];
      if (arr.length > 7) {
        this.numxinicon = false;
        this.formData.num7 = arr[7];
      } else {
        this.numxinicon = true;
        this.formData.num7 = "";
      }
    },
    // 查询用户进行中的订单
    processings(frameNum) {
      let that = this;
      let params = {
        frameNum: frameNum
      };
      processing(params).then(res => {
        if (res.header.code == "10000000") {
          if(res.body.isHave == 1){
            that.showToastFlag = false;
            that.$toast("下单成功", 2000, 1);
            setTimeout(function() {
              that.$router.push("/map-order");
            }, 2000);
          }else{

            that.showToastFlag = false;
            that.$toast("下单失败，请重试", 2000, 4);
          }
        } else {
          that.showToastFlag = false
          let msg = res.header.message;
          that.$toast(msg, 3000, 2,res.header.code);
        }
      });
    },
    //选择优惠相关方法
    showActivityAuths(){
      let _this = this;
      // 初始化优惠相关数据
      if(_this.$route.query.activityAuth == 1){ // 有优惠
        // 用户选择的活动列表默认是第一个活动
        let initSelectId = []
        if(initSelectId.length>0){   //暂时只有一个
            initSelectId = []
        }else{
          initSelectId.push($(".showActivityAuths-area ul li .select-div.active").parent('li').attr('activityId'))
        }
        _this.activityIdLis=initSelectId
        _this.showNewMoneyFlag = true
      }else{
        _this.showNewMoneyFlag = false
      }
      // 点击蒙层
      $("#mask1").click(function(){
        if(_this.$route.query.activityAuth == 1){
          _this.showNewMoneyFlag = true
        }else{
          _this.showNewMoneyFlag = false
        }
        _this.showActivityAuthsArea = false
      })
      // 选择优惠
      $(".showActivityAuths-area ul li").each(function(){
        $(this).click(function(){
          if($(this).index() != $(".showActivityAuths-area ul li").length-1){   //免单    选择的不等于最后一个就是选择了免单
            _this.showActivityAuthsAreaNum = 1
            _this.mianFlag = true
          }else{
            _this.mianFlag = false
            _this.showActivityAuthsAreaNum = 0
          }
          $(this).find('.select-div').addClass('active')
          $(this).siblings().find('.select-div').removeClass('active')
        })
      })
      // 优惠选择完成
      $(".showActivityAuths-sure").click(function(){
        let selectId = $(".showActivityAuths-area ul li .select-div.active").parent('li').attr('activityId')
        let selectIdArr =[];//目前只能选择一个
        if(selectId){
          selectIdArr.push(selectId)
        }else{
          selectIdArr=[]
        }
        _this.activityIdLis=selectIdArr
        if(_this.showActivityAuthsAreaNum == 0){ //不免单 扣除积分
           _this.newCostPoint = _this.costPoint
        }else{
            _this.newCostPoint = 0
        }
          _this.showActivityAuthsArea = false
          _this.showNewMoneyFlag = true
      })
    },
    submitTips() {
      if (!this.showNewMoneyFlag) {
        this.$toast("请勾选抵扣说明", 2000, 2);
        return false;
      }
      // let userCarNum = $("#userCarNum").val();
      let userCarNum = this.formData.num0+this.formData.num1+this.formData.num2+this.formData.num3+this.formData.num4+this.formData.num5+this.formData.num6+this.formData.num7

      //验证车牌号
      if (!this.common.isLicensePlate(userCarNum)) {
        this.$toast("请修改为真实有效车牌号", 3000, 2); //请输入正确的车牌号=》  请修改为真实有效车牌号
        return false;
      }
    },
    gotoUserAgreeMent() {
      $("input").blur();
      this.$router.push("/user-agreement");
    },
    datemonth(date1, date2) {
      // 拆分年月日
      date1 = date1.split("-");
      // 得到月数
      date1 = parseInt(date1[0]) * 12 + parseInt(date1[1]);
      // 拆分年月日
      date2 = date2.split("-");
      // 得到月数
      date2 = parseInt(date2[0]) * 12 + parseInt(date2[1]);
      var m = Math.abs(date1 - date2);
      return m;
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
      $("#selectImg,#agreeBtn").click(function() {
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
      let that = this;
      $("input").blur();
      let regPhone = /^1[345789]\d{9}$/;
      if (!this.showDate) {
        that.$toast("请选择时间", 3000, 4);
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
      if (!regPhone.test(this.getCarTel) || !regPhone.test(this.returnCarTel)) {
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
        that.$toast("请选择车辆", 3000, 4);
        return;
      }
      // let userCarNum = $("#userCarNum").val();
      let userCarNum = this.formData.num0+this.formData.num1+this.formData.num2+this.formData.num3+this.formData.num4+this.formData.num5+this.formData.num6+this.formData.num7
      //验证车牌号
      if (!that.common.isLicensePlate(userCarNum)) {
        that.$toast("请修改为真实有效车牌号", 3000, 2); //请输入正确的车牌号=》  请修改为真实有效车牌号
        return;
      }
      if (!$("#user-agreement-area").hasClass("active")) {
        that.$toast("请勾选并同意《用户协议》", 3000, 4);
        return;
      }
      let poinStatus = Number(this.userPoint) - Number(this.costPoint);
      //查询是否重复
      // this.checkRepeats()
      let newCost = '',newCostTest='';
      if(this.showActivityAuthsAreaNum == 0){ //不免单 扣除积分
        newCost = this.costPoint
        newCostTest = '积分'
      }else{
        newCost = '免单'
        newCostTest = '优惠'
      }

      let goopTip = "\n<span color='red'>温馨提示：为了保障您的财产安全，使用取送车服务时，请确保将车内贵重物品自行妥善保管，感谢您的配合。</span>";
      this.$createDialog({
        type: "confirm",
        title: "提交订单",
        content:
          "本单预估费用" +
          this.totalMoney +
          "元，将用" +
          newCost +newCostTest+
          "抵扣" + goopTip,
        confirmBtn: {
          text: "确定",
          active: true,
          disabled: false,
          href: "javascript:;"
        },
        cancelBtn: {
          text: "取消",
          active: false,
          disabled: false,
          href: "javascript:;"
        },
        onConfirm: () => {
          // 先判断是否免单，如果不免单再走积分判断的校验。免单 直接下单
          if(that.showActivityAuthsAreaNum == 0){  //需要扣除积分
            if (poinStatus < 0) {
              that.$toast("您的积分不足，无法下单", 3000, 4);
              return;
            }
          }

          // 执行下单
          this.addOrderSubmit();
        },
        onCancel: () => {}
      }).show();
    },
    //执行生成订单操作
    addOrderSubmit() {
      let orderIdFreeFlag ='';
      if(this.showActivityAuthsAreaNum == 0){ //扣除积分 this.showActivityAuthsAreaNum == 0 不免单   1免单
          orderIdFreeFlag = false //扣积分
      }else{
          orderIdFreeFlag = true  //不扣积分
      }
      //根据传递的getOrSend判断订单类型   1：取车 2:送车
      let that = this,
        params = {
          orderIdFree:orderIdFreeFlag,//标记是否扣除积分  true 不扣除   false扣除
          customerId: localStorage.getItem("localUserId"),
          customerTel: localStorage.getItem("localTelNo"),
          customerName: localStorage.getItem("localName"),
          serviceType: this.getOrSend, //服务类型 1 取车 2送车
          orderType: 1, //订单类型
          publishLat: this.$route.query.selectAddressLat, //发单纬度，可与起点纬度一样
          publishLng: this.$route.query.selectAddressLng, //发单经度，可与起点经度一样
          startLat: this.$route.query.selectAddressLat, //起点纬度
          startLng: this.$route.query.selectAddressLng, //起点经度
          startPoiName: this.$route.query.selectAddress, //起点POI名称
          startPoiAddress: localStorage.getItem("saveUserSelectNearestRoad"), //起点POI地址
          endLat: this.$route.query.iclubStoreLat, //结束位置纬度
          endLng: this.$route.query.iclubStoreLng, //结束位置经度
          endPoiName: this.$route.query.iclubStore, //结束POI名称
          endPoiAddress: localStorage.getItem("localDealerAddress"), //终点POI地址
          startMan: this.getCarName, //起点联系人
          startManTel: this.getCarTel, //起点联系人电话
          endMan: this.returnCarName, //终点联系人
          endManTel: this.returnCarTel, //终点联系人电话
          carNum: $("#showCarLisUl li.on").attr("car_num"), //车牌号
          frameNum: $("#showCarLisUl li.on").attr("frame_num"), //车架号
          applyNumber: this.$route.query.applyNumber?this.$route.query.applyNumber:'', //预约单号
          estimateMileage: this.mileage, //预估里程
          activityIdList:this.activityIdLis,//用户选择的活动id集合
          estimateMoney: this.totalMoney, //预估金额
          estimateTime: this.totalTime, //预估时间
          businessType: 1, //业务渠道
          orderTime: this.showDate + ":00",
          // carType: this.$route.query.getOrSend,
          enterFign: this.enterFign,
          dealerCode: this.$route.query.dealerCode
        };
      if (this.getOrSend == 2) {
        //送车    起始点要反过来
        params.publishLat = this.$route.query.iclubStoreLat; //发单纬度，可与起点纬度一样
        params.publishLng = this.$route.query.iclubStoreLng; //发单经度，可与起点经度一样
        params.startLat = this.$route.query.iclubStoreLat; //起点纬度
        params.startLng = this.$route.query.iclubStoreLng; //起点经度
        params.startPoiName = this.$route.query.iclubStore; //起点POI名称
        params.startPoiAddress = localStorage.getItem("localDealerAddress"); //起点POI地址
        params.endLat = this.$route.query.selectAddressLat; //结束位置纬度
        params.endLng = this.$route.query.selectAddressLng; //结束位置经度
        params.endPoiName = this.$route.query.selectAddress; //结束POI名称
        params.endPoiAddress = localStorage.getItem(
          "saveUserSelectNearestRoad"
        ); //终点POI地址
        params.startMan = this.returnCarName; //起点联系人
        params.startManTel = this.returnCarTel; //起点联系人电话
        params.endMan = this.getCarName; //终点联系人
        params.endManTel = this.getCarTel; //终点联系人电话
      }
      console.log('-----------------------------')
      console.log("enterStatus："+this.enterFign)
      console.log(window.location.href)
      console.log('enterFign：'+params.enterFign)
      console.log('-----------------------------')
      that.showToastFlag = true;
      this.toastText = "提交订单中";
      addOrder(params).then(res => {
        if (res.header.code == "10000000") {
          let frame_num = $("#showCarLisUl li.on").attr("frame_num")
          //框架存在不抛异常的情况，先查询是否存在进行中订单，存在即创建成功再进行跳转，恶心的框架，he，tui
          that.processings(frame_num)
        } else {
          that.showToastFlag = false;
          let msg = res.header.message;
          that.$toast(msg, 3000, 2, 1, res.header.code);
        }
      });
    },
    initFirstCar() {
      $("#showCarLisUl li")
        .eq(0)
        .addClass("on");

      $(".scroll-list-wrap").click(function() {
        $("input").blur();
        $("html,body").animate({ scrollTop: 0 }, 500);
      });

      $("#userCarNum").click(function(event) {
        $(this).focus();
        var u = navigator.userAgent;
        var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
        if (isAndroid) {
          $("html,body").animate({ scrollTop: 100 }, 500);
        }

        event.stopPropagation();
      });
    },
    inPutBlur() {
      $("input").blur();
    },
    //服务消耗积分
    costPoints() {
      let that = this,
        params = {
          configKey: "score"
        };
      costPoint(params).then(res => {
        if (res.header.code == "10000000") {
          that.costPoint = res.body.configValue;
        } else {
          let msg = res.header.message;
          that.$toast(msg, 3000, 2, 1, res.header.code);
        }
      });
    },
    //订单费用估算
    estimates() {
      this.showToastFlag = true;
      let that = this;
      let customerTel = this.getCarTel,
        slat = this.$route.query.selectAddressLat,
        slng = this.$route.query.selectAddressLng,
        elat = this.$route.query.iclubStoreLat,
        elng = this.$route.query.iclubStoreLng,
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
           that.showToastFlag = false;
          // if(res.body){
          that.totalMoney = res.body.totalMoney;
          that.totalMoney2 = res.body.totalMoney
            ? "￥" + res.body.totalMoney
            : "--";
          that.mileage = res.body.mileage;
          that.totalTime = res.body.totalTIme;
          //调用日期选择
          that.selectTime(res.body.totalTIme);
          // }else{
          //   that.showToastFlag = false
          //   that.$toast('请求超时',3000,4)
          // }
        } else {
          that.showToastFlag = false;
          let msg = res.header.message;
          that.$toast(msg, 3000, 2, 1, res.header.code);
        }
      });
    },
    // //检查订单是否重复
    // checkRepeats(){
    //   let that = this,
    //     frameNum = $("#showCarLisUl li.on").attr('frame_num'),
    //     params={
    //       frameNum:frameNum,
    //       checkDate:that.showDate.substr(0,10)
    //     }
    //   checkRepeat(params).then(res=>{
    //     if(res.header.code=='10000000'){
    //       that.checkRepeat = res.body.result
    //     }else{
    //       let msg = res.header.message;
    //       that.$createToast({
    //         type: "txt",
    //         txt: msg
    //       }).show();
    //     }
    //   })
    // },
    //查询用户积分
    availablePoint() {
      let that = this,
        params = {
          userId: localStorage.getItem("localUserId")
        };
      availablePoint(params).then(res => {
        if (res.header.code == "10000000") {
          that.userPoint = res.body.point;
        } else {
          let msg = res.header.message;
          that.$toast(msg, 3000, 2, 1, res.header.code);
        }
      });
    },
    //日期选择器
    selectTime(estimateTime) {
      let that = this;
      let params = {
        applyTime:
          this.$route.query.applyTime != 0
            ? decodeURI(this.$route.query.applyTime).substr(0, 16)
            : "",
        estimateTime: estimateTime,
        serviceType: this.getOrSend,  //1取车  2送车
        isCurrent:0
        // isCurrent: 1 //增加一条当前时间   老毕让改  isCurrent=1改下  timelist接口
      };
      timeList(params).then(res => {
        if (res.header.code == "10000000") {
          that.timeData = res.body.dataList;
          setTimeout(function() {
            that.showDatePicker();
          }, 500);
          that.showToastFlag = false;
        } else {
          that.showToastFlag = false;
          let msg = res.header.message;
          that.$toast(msg, 3000, 2, 1, res.header.code);
        }
      });
    },
    showDatePicker() {
      this.$refs.awesomeDatePicker.show();
    },
    handlePickerConfirm(data) {
      let m = data[0].value.replace("月", "-").replace("日", "");
      let h = data[1].value.replace("时", "");
      let mm = data[2].value.replace("分", "");
      let selectTime = m + "-" + h + "-" + mm;
      let newTime = selectTime.split("-");
      // 拆分判断后的新的时间
      let newM = newTime[0]; //月份
      let newD = newTime[1];
      let newH = newTime[2];
      let newMM = newTime[3];
      //和现在比较 如果比现在月份小   则加一年
      let selectY = new Date().getFullYear();
      let nowM = new Date().getMonth() + 1;
      if (Number(newM) < nowM) {
        selectY += 1;
      }
      let selectNewTime =
        selectY + "-" + newM + "-" + newD + " " + newH + ":" + newMM;
      this.showDate = selectNewTime;
    },

    //车牌号键盘相关
    clickFirstWrap() {
      // 点击第一个输入框
      this.firstClickStatus = true;
      this.firstWrapStatus = true;
      this.keyBoardStatus = false;
      this.formData.num0 = "";
      this.formData.num1 = "";
      this.formData.num2 = "";
      this.formData.num3 = "";
      this.formData.num4 = "";
      this.formData.num5 = "";
      this.formData.num6 = "";
      this.formData.num7 = "";
    },
    selectFirstWord(event) {
      // 选择省份
      if (event.target.localName !== "span") {
        return;
      }
      this.formData.num0 = event.target.innerText;
      this.firstSelectStatus = true;
      this.firstWrapStatus = false;
      this.firstClickStatus = false;
      this.keyBoardStatus = true;
      this.activeKeyWordIndex = 1;
    },
    clickKeyBoard(item) {
      // 点击自定义键盘
      this.formData["num" + this.activeKeyWordIndex] = item;
      this.activeKeyWordIndex++;
      //清除按钮
      if (this.activeKeyWordIndex >=2) {
        this.clearAllFlag = false;
      } else {
        this.clearAllFlag = true;
      }
      //新能源标识
      if (this.activeKeyWordIndex > 7) {
        this.numxinicon = false;
      } else {
        this.numxinicon = true;
      }
    },
    deleteWord() {
      // 退格
      if (this.activeKeyWordIndex > 1) {
        this.formData["num" + (this.activeKeyWordIndex - 1)] = "";
        this.activeKeyWordIndex--;
        //清除按钮
        if (this.activeKeyWordIndex >=2) {
          this.clearAllFlag = false;
        } else {
          this.clearAllFlag = true;
        }
        //新能源标识
        if (this.activeKeyWordIndex > 7) {
          this.numxinicon = false;
        } else {
          this.numxinicon = true;
        }
      }
    },
    clickKeyWordWrap(activeKeyWordIndex) {
      this.keyBoardStatus = true;
      this.activeKeyWordIndex = activeKeyWordIndex;
      this.formData["num" + this.activeKeyWordIndex] = "";
      if (this.activeKeyWordIndex >=2) {
        this.clearAllFlag = false;
      } else {
        this.clearAllFlag = true;
      }
      //新能源标识
      if (this.activeKeyWordIndex > 7) {
        this.numxinicon = false;
      } else {
        this.numxinicon = true;
      }
    },
    submitFn() {
      let plateLicense;
      plateLicense = this.plate_license_1;
      this.$emit("getPlateLicense", plateLicense);
      this.keyBoardStatus = false;
      if (!this.common.isLicensePlate(plateLicense)) {
        this.$toast("请修改为真实有效车牌号", 3000, 2); //请输入正确的车牌号=》  请修改为真实有效车牌号
        return false;
      }
    },
    //清空全部
    clearAll() {
      this.formData.num0 = "";
      this.formData.num1 = "";
      this.formData.num2 = "";
      this.formData.num3 = "";
      this.formData.num4 = "";
      this.formData.num5 = "";
      this.formData.num6 = "";
      this.formData.num7 = "";
      this.keyBoardStatus = false;
      this.numxinicon = true;
    }
  },
  computed: {
    showSubmitBtn() {
      //验证车牌号
      // let userCarNum = this.carLisData[0].registerNo;
      let userCarNum = this.formData.num0+this.formData.num1+this.formData.num2+this.formData.num3+this.formData.num4+this.formData.num5+this.formData.num6+this.formData.num7
      return this.showNewMoneyFlag && this.common.isLicensePlate(userCarNum);
    },
    plate_license_1() {
      return (
        this.formData.num0 +
        this.formData.num1 +
        this.formData.num2 +
        this.formData.num3 +
        this.formData.num4 +
        this.formData.num5 +
        this.formData.num6 +
        this.formData.num7
      );
    }
  },
  created() {
    this.availablePoint();
    if(this.$route.query.getOrSend == 1){
      this.picker.textTitle = "请选择预约取车时间"
    }else{
      this.picker.textTitle = "请选择预约送车时间"
    }
  },
  mounted() {
    this.initCarInfo();
    this.estimates();
    this.setHeaderTitle();
    this.userAgreementEvents();
    // this.selectCarEvents();
    this.initSelectCarInfoHeight();
    this.isIosSetting();
    // this.showFormatPicker()
    this.initFirstCar();
    this.costPoints();
    this.showActivityAuths()
  },
  beforeRouteEnter(to, from, next) {
    if (from.name == "Home") {
      to.meta.keepAlive = false;
    } else if (from.name == "UserAgreeMent") {
      to.meta.keepAlive = true;
    }
    next();
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
    border-radius: 8px;
    box-shadow: 0 4px 4px 0 #c1c4c8;
    background: #fff;
    // overflow: hidden;
    -webkit-overflow-scrolling: touch;
    .showCarLis {
      ul {
        padding-left: 15px;
        // border-bottom: 1px solid #e4e8f0;
        li {
          padding-bottom: 10px;
          // border-bottom: 1px solid #e4e8f0;
          &:last-child {
            border-bottom: 0;
          }
          .radio-img {
            width: 17px; /*no*/
            height: 17px; /*no*/
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
        top: -2px;
        display: inline-block;
        width: 17px; /*no*/
        height: 17px; /*no*/
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
  // text-align: center;
  z-index: 2;
  #submitBtnMask {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
  }
  // box-shadow: 0px 0px 4px #4CBFFE;
  .addBtn {
    padding-right: 8px;
    height: 57px;
    //  box-shadow: 0px 0px 4px #4CBFFE;
    font-size: 20px;
    color: #9f9f9f;
    background: #fff;
  }
  .blue {
    margin: 0 auto;
    width: 340px;
    padding: 10px 0;
    font-size: 13px;
    color: #000;
    background: #fff;
    border-radius: 10px;
    #di {
      display: inline-block;
      position: relative;
      top: 3px;
      width: 15px;
      height: 15px;
      background: url("../../../../static/images/di.png") no-repeat top center;
      background-size: cover;
      margin-left: 11px;
    }
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
.select-date-input {
  height: auto;
  border: 0;
  outline: none;
  border-radius: 0;
  padding: 0 !important;
}
#agreeBtn {
  width: 65px;
  height: 30px;
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
  position: fixed;
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
#submitNo {
  width: 126px;
  height: 40px;
  line-height: 42px;
  text-align: center;
  border-radius: 20px;
  background: #bcbcbc;
  color: #fff;
  margin-top: 10px;
}
#submitSure {
  width: 126px;
  height: 40px;
  line-height: 42px;
  text-align: center;
  border-radius: 20px;
  background: #4cbffe;
  color: #fff;
  margin-top: 10px;
}
#radioNo {
  width: 17px; /*no*/
  height: 17px; /*no*/
  border: 1px solid #c9c9c9;
  border-radius: 50%;
  position: relative;
  top: 2px;
  margin-right: 11px;
}
#radioSure {
  width: 17px; /*no*/
  height: 17px; /*no*/
  border-radius: 50%;
  background: url("../../../../static/images/select.png") no-repeat center
    center;
  background-size: 100% 100%;
  position: relative;
  top: 2px;
  margin-right: 11px;
}
#radioOut {
  span {
    position: relative;
    top: 1px;
  }
  span.span-point {
    top: 0px;
  }
}
#selectCarBottom {
  height: 120px;
}
.showCarLis {
  position: relative;
}
.showCarOther {
  position: absolute;
  width: 100%;
  bottom: 10px;
  padding-top: 13px;
  border-top: 1px solid #e4e8f0;
}
#showCarLisUl {
  border-bottom: 0;
}
#userCarNum {
  position: relative;
  top: -1px;
  display: inline-block;
  padding: 0;
  width: 150px;
  border-radius: 0;
  height: auto;
  border: 0;
  outline: none;
}

// 车牌号键盘相关
.flex-items-center {
  display: flex;
  align-items: center;
}
.wrap {
  // input输入框
  .num-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .spot {
      width: 5px; /*no*/
      height: 5px; /*no*/
      border-radius: 50%;
      margin-right: 5px;
      background-color: #d8d8d8;
    }
    & > div {
      width: 25px;
      height: 25px;
      line-height: 27px;
      border: 1px dashed #e4e4e4;
      margin-right: 3px;
      &.first {
        position: relative;
        text-align: center;
        line-height: 10px;
        font-weight: 200;
        .input-wrap {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          &.active {
            z-index: 100;
          }
        }
        em {
          color: #979797;
          font-size: 13px;
          line-height: 35px;
        }
        span {
          display: inline-block;
          width: 100%;
          height: 100%;
          color: #828282;
          line-height: 35px;
        }
      }
      &.active {
        border: 1px solid #4a90e2;
        &:after {
          border-bottom: 1px solid #4a90e2;
        }
      }
      span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        line-height: 27px;
        font-size: 15px;
        color: grey;
        &.first {
          background-color: #9cbce2;
          color: #fff;
          border-radius: 0;
        }
      }
      span.numxinicon {
        color: #dbd7d7;
        z-index: 0;
      }
      span.numxin {
        z-index: 1;
      }
    }
  }
}
.first-word-wrap {
  background-color: #d2d5db;
  padding: 10px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  .first-word {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    .word {
      box-sizing: border-box;
      width: 35px;
      height: 35px;
      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.35);
      border-radius: 5px;
      text-align: center;
      &.bordernone {
        border: none;
        box-shadow: none;
        background: transparent;
      }
      span {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        width: 100%;
        height: 100%;
        background-color: #fff;
        color: #000;
        font-size: 15px;
        border-radius: 5px;
      }
      img {
        width: 35px;
      }
    }
    &:nth-last-of-type(1) {
      margin-bottom: 0;
    }
  }
}
.keyboard-wrap {
  background: #d2d5db;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  padding-bottom: 0;
  z-index: 9999;
  .keyboard {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    &.number-wrap {
      span {
        width: 30px;
        height: 30px;
      }
    }

    span {
      text-align: center;
      display: flex;
      width: 35px;
      align-items: center;
      justify-content: center;
      height: 35px;
      margin-bottom: 7px;
      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.35);
      background-color: #fff;
      border-radius: 5px;
      &:active {
        background-color: #e4e4e4;
      }
      &.bordernone {
        border: none;
        box-shadow: none;
        background-color: transparent;
      }
      &.delete {
        img {
          width: 35px;
        }
      }
    }
    &.keyboard-last {
      span {
        width: 55px;
      }
    }
    & {
      span.clear-all {
        width: 100px;
      }
    }
  }
}
.cancelBtn,
.cancel {
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  margin-bottom: 10px;
  span:nth-child(1) {
    color: black;
    margin-left: 5px;
  }
  span:nth-child(2) {
    color: grey;
    margin-top: 3px;
  }
  span:nth-child(3) {
    color: #4cbffe;
    margin-right: 5px;
  }
}
#mask1{
  position: fixed;
  width: 100%;
  height: 100%;
  bottom: 0;
  left: 0;
  background: #000;
  opacity: 0.6;
  z-index: 9999;
}
.showActivityAuths-area{
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 0 15px;
  width: 100%;
  height: 245px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  background: #fff;
  z-index: 9999;
 .title{
   text-align: center;
   margin-top: 25px;
 }
 ul{
   height: 120px;
   overflow: auto;
 }
 li{
   margin-top: 25px;
   div{
     width: 100%;
     line-height: 25px;
     text-align: left;
     overflow: hidden;
     &:last-child{
       width: 18px;
       height: 18px;
       margin-top: 5px;
        background: url('../../../../static/images/radioAuth.png') no-repeat center center;
        background-size: 100% 100%;
     }
     &:last-child.active{
      width: 18px;
       height: 18px;
       border-color: transparent;
       background: url('../../../../static/images/select.png') no-repeat center center;
       background-size: 100% 100%;
     }
   }
 }
 .showActivityAuths-sure{
   position: absolute;
   bottom: 15px;
   width:345px;
   color: #fff;
   font-size: 16px;
   line-height: 40px;
   text-align: center;
   border-radius: 20px;
   background: #4CBFFE
 }
}
#rightImg{
  position: relative;
  top: 2px;
  right: 5px;
  width: 15px;
  height: 15px;
  img{
    width: 100%;
  }
}
</style>
