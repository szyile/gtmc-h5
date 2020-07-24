<template>
  <div id="userAgreenMent" class="tx-l">
    <app-header :title="title">
      <span slot="left" class="left" @click="this.common.goBack"></span>
    </app-header>
    <div class="scroll-list-wrap">
      <cube-scroll ref="scroll">
        <div class="pos-re">
          <div class="pos-abs f20 white articel">《取/送车服务协议》</div>
          <img src="../../../../static/images/user-agreement-bg.png" alt style="width:100%" />
        </div>
        <div class="lis-item mt25">
          <div class="title f18 fb blue mb15">一、协议须知</div>
          <div class="f14 lis-item-p mb10">
            <span class="blue mr10">1.</span>您在使用广汽丰田上门取/送车服务之前，请您务必仔细阅读本协议，充分理解各条款内容。如您不同意本协议或其中任何条款，请立即停止使用广汽丰田取送车服务协议。
          </div>
          <div class="f14 lis-item-p mb10">
            <span class="blue mr10">2.</span>当您点击取送车服务，选择“同意本协议”即表示您与广汽丰田签署本协议，本协议在您和广汽丰田之间生效，产生法律效力，并且表示您已充分阅读、理解并接受本协议全部内容，同意遵守本协议。
          </div>
          <div class="f14 lis-item-p">
            <span class="blue mr10">3.</span>除取消订单情形外，取送车服务不适用无理由退款。
          </div>
        </div>

        <div class="lis-item mt30">
          <div class="title f18 fb blue mb15">二、用户资质</div>
          <div class="f14 lis-item-p mb10">
            您确认，在您使用广汽丰田上门取/送车服务之前，您应当具备中华人民共和国法律法规规定的与您行为相适应的民事行为能力。若您不具备与您行为相适应的民事行为能力，则您及您的监护人应依照相关法律法规的规定承担因此而产生的一切后果。
            您确认，您所交付来源合法、手续齐全（包括但不限于安检合格、车辆证照齐全、车辆保险交强险）、车况正常（非改装车）、的车辆，若代驾司机发现您车辆不符合上述约定，广汽丰田有权拒绝提供取送车服务。
          </div>
        </div>

        <div class="lis-item mt30">
          <div class="title f18 fb blue mb15">三、服务条款</div>
          <div class="f14 lis-item-p mb10">
            为了向您提供便利的服务，节省您的时间，广汽丰田在一定条件下向您提供上门取车和送车服务。如果您选择了上门取车服务，您可以在预约保养服务的同时，享受由广汽丰田的合作代驾公司提供的代驾服务，将您的车开到您选择的经销商处进行保养服务（“上门取车”）。当服务完成后，也可以根据您的需求将车送还到指定地点（“上门送车”）。 仅当您在广汽丰田官方服务平台上选择“上门取/送车”服务并经广汽丰田官方服务平台审核通过后，本协议中关于上门取/送车服务的条款才予以适用。 如果您因为除保养服务外的其他服务到4S店,在服务完成后, 您也可以要求上门送车服务。
          </div>
          <div class="f14 lis-item-p mb10">
            <span class="blue">（1）</span>您需通过广汽丰田官方服务平台预约车辆保养及选择使用上门取车服务。在保养服务完成后，只有在支付完保养服务尾款的前提下方可提供上门送车服务。<span class="text-line fb">上门取送车服务单程公里数上限为80公里，如超过服务里程上限请及时通过广汽丰田官方服务平台变更代驾目的地或取消订单</span></div>
          <div class="f14 lis-item-p mb10">
            <span class="blue">（2）</span>您同意因代您向代驾公司提交订单的需要，广汽丰田官方服务平台需要向您收集车牌号、车辆交接人姓名及联系方式等必要信息，以提供给代驾公司。您在选择使用上门取送车服务前，需保证您提供的订单信息(包括但不限于车辆信息（车牌号）、服务时间、起始地及目的地、车辆交接人姓名及联系方式。)准确无误，如代驾司机发现您实际身份信息与预先告知不一致，广汽丰田有权拒绝提供取送车服务。在上门送车服务完成下单后，如果订单对应服务行程产生变化，请通过广汽丰田服务平台取消相应订单或立即通知经销商或代驾司机，以免影响车辆的交付。
          </div>
          <div class="f14 lis-item-p mb10">
            <span class="blue">（3）</span>为保障您的财产安全，请确认使用上门取送车服务前卸载车上装载的其他可分离财物（如贵重财物）并自行妥善保管，如不予配合取出可分离财物所造成的财产损失，<span class="text-line fb">广汽丰田对其不承担法律责任</span>。
          </div>
          <div class="f14 lis-item-p mb10">
            <span class="blue">（4）</span>为了对您行车违章记录不产生影响，请您确认在使用上门取送车服务前您的车辆符合当地道路行驶限牌规定，<span class="text-line fb">广汽丰田不对上门取送车服务过程当中由于违反限牌规定所产生的违章处罚负责</span>。
          </div>
          <div class="f14 lis-item-p mb10">
            <span class="blue">（5）</span>为了能够将您的车辆驾驶至经销商经营场所并返还给您，以及应对可能发生的堵车、合理绕行等情况，您应在交接车辆前与代驾司机确认代驾路线。 如您在使用代驾服务期间涉及其他必要费用（包括但不限于加油费、充电费、过路费、过桥费、停车费），请与代驾司机协商支付，以保证代驾司机可以将车辆按时送到指定交车地点。
          </div>
          <div class="f14 lis-item-p mb10">
            <span class="blue">（6）</span>在提供上门送车服务时，您同意委托广汽丰田服务平台代您向代驾公司提交订单，并同意代驾司机交接车辆时协同车辆交接人对车辆进行检查（包括但不限于里程，燃油量，车辆外观是否有损坏、划痕，车辆随车工具等）及拍照记录。
          </div>
          <div class="f14 lis-item-p mb10">
            <span class="blue">（7）</span>使用上门取送车服务过程中如果因代驾服务环节发生交通事故，代驾公司会根据事故情况，配合公安机关或主管机关完成事故责任认定，并根据责任认定承担相应责任。您应全面向代驾公司告知车辆本身所有的在保情况。此外，代驾公司已为符合本协议要求的取送车服务、车辆等投保适当的商业保险，如发生保险合同约定的保险事故，代驾公司将协助投保人、被保险人按照保险合同约定进行报案、理赔。商业保险保障范围之外的其他损失事项。 相关保险责任及保额详见附件。
          </div>
          <div class="f14 lis-item-p mb10">
            <span class="blue">（8）</span>如果您对经销商或者代驾司机的服务有任何疑议，您可以申请检查代驾公司的车辆行驶记录、车检照片，或通过代驾客服热线（400-7666-998）或广汽丰田客服热线（400）进行咨询。
          </div>
        </div>

        <div class="lis-item mt30">
          <div class="title f18 fb blue mb15">四、上门取送车服务费用</div>
          <div class="f14 lis-item-p mb10">
            如果您选择了上门取/送车服务，在服务下单前会根据代驾服务行驶里程预估相应的代驾费用，待完成代驾服务车辆交接后，按实际产生费用进行结算。取送车服务活动期间，根据具体参与优惠（包括但不限于积分抵扣、优惠券抵扣）结算后，按系统实际核算费用金额为准。
          </div>
          <div class="f14 lis-item-p mb10">
            <span class="blue mr10">4.2</span>除非您与产品名称另有约定，您同意本服务仅为您个人非商业性质的使用。
          </div>
        </div>
        <div class="lis-item mt50">
          <div class="f14 lis-item-p mb10">附件：取送车服务保险方案</div>
          <div id="showFujian" class="f14 tx-c">
              <div class="fujian1 flex justify-content-center tx-c">
                <div class="fujiantitle">保险责任</div>
                <div class="flex flex1 fujiantitle2 align-items_center justify-content_flex-center">赔偿限额</div>
              </div>
              <div class="fujian1 flex justify-content-center tx-c">
                <div class="tx-c">
                  <div class="fujiantitle tx-c">三者责任</div>
                  <div class="fujiantitle">车损责任</div>
                </div>
                <div class="flex flex1 fujiantitle2 align-items_center justify-content_flex-center">50万</div>
              </div>
              <div class="fujian1 flex justify-content-center tx-c">
                <div class="fujiantitle">车上人员责任</div>
                <div class="flex flex1 fujiantitle2 align-items_center justify-content_flex-center">300万</div>
              </div>
              <div class="fujian1 flex justify-content-center tx-c">
                <div class="fujiantitle">保费补偿责任</div>
                <div class="flex flex1 fujiantitle2 align-items_center justify-content_flex-center">
                  出险车辆当年车险保单总保费金额的15%
                  </div>
              </div>
              <div class="fujian1 flex justify-content-center tx-c">
                <div class="fujiantitle pos-re">
                  <span class="pos-abs fujiantitle-span">代步交通费用补偿责任</span>
                </div>
                <div class="flex flex1 fujiantitle2 align-items_center justify-content_flex-center flex-direction_column">
                  <p class="mt20">3000元<维修费用≤5000元，</p>
                  <p class="mt5">一次性支付赔款300元</p>
                  <p class="mt10">5000元<维修费用≤1万元，</p>
                  <p class="mt5">一次性支付赔款500元</p>
                  <p class="mt10">1万元<维修费用≤1.5万元，</p>
                  <p class="mt5">一次性支付赔款700元</p>
                  <p class="mt10">1.5万元<维修费用，</p>
                  <p class="mt5 mb20">一次性支付赔款1000元</p>
                </div>
              </div>
              <div class="fujian1 flex justify-content-center tx-c">
                <div class="fujiantitle">保管不当责任</div>
                <div class="flex flex1 fujiantitle2 align-items_center justify-content_flex-center">150万</div>
              </div>
          </div>
        </div>
        <div class="lis-item mt60" style="height:10px;"></div>
      </cube-scroll>
    </div>
  </div>
</template>
<script>
import Header from "../../common/header";
export default {
  data() {
    return {
      title: ""
    };
  },
  components: {
    "app-header": Header
  },
  methods: {
    setHeaderTitle() {
      this.title = this.$route.meta.name;
    }
  },
  mounted() {
    this.setHeaderTitle();
  }
};
</script>
<style lang='less' scoped>
#userAgreenMent {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #fff;
  .scroll-list-wrap {
    height: 100vh;
    .articel {
      text-align: center;
      top: 20px;
      left: 0;
      right: 0;
      margin: auto;
    }
    .lis-item {
      margin-left: 17px;
      margin-right: 13px;
      .title {
        line-height: 25px;
      }
      .lis-item-p {
        line-height: 20px;
      }
    }
  }
}
.text-line{
  text-decoration: underline
}
#showFujian{
  width: 100%;
  margin-bottom: 120px;
  border: 1px solid grey;
  border-bottom: 0
}
.fujiantitle{
  width: 90px;
  line-height: 20px;
  padding: 10px 0;
  border-bottom: 1px solid grey;
}
.fujiantitle2{
  border-left: 1px solid grey;
  border-bottom: 1px solid grey
}
.ss{
  height: 200px;
}
.fujiantitle-span{
  width: 100%;
  left: 0;
  top: 80px;
}
</style>
