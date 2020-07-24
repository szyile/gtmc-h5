import 'amfe-flexible'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// By default we import all the components.
// Only reserve the components on demand and remove the rest.
// Style is always required.
import {
    Style,
    // basic
    Button,
    Loading,
    Tip,
    Toolbar,
    TabBar,
    TabPanels,
    // form
    Checkbox,
    CheckboxGroup,
    Checker,
    Radio,
    RadioGroup,
    Input,
    Textarea,
    Select,
    Switch,
    Rate,
    Validator,
    Upload,
    Form,
    // popup
    Popup,
    Toast,
    Picker,
    CascadePicker,
    DatePicker,
    TimePicker,
    SegmentPicker,
    Dialog,
    ActionSheet,
    Drawer,
    ImagePreview,
    // scroll
    Scroll,
    Slide,
    IndexList,
    Swipe,
    Sticky,
    ScrollNav,
    ScrollNavBar,
    RecycleList
} from 'cube-ui'
import App from './App'
import router from './router'

Vue.use(Button)
Vue.use(Loading)
Vue.use(Tip)
Vue.use(Toolbar)
Vue.use(TabBar)
Vue.use(TabPanels)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Checker)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Input)
Vue.use(Textarea)
Vue.use(Select)
Vue.use(Switch)
Vue.use(Rate)
Vue.use(Validator)
Vue.use(Upload)
Vue.use(Form)
Vue.use(Popup)
Vue.use(Toast)
Vue.use(Picker)
Vue.use(CascadePicker)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(SegmentPicker)
Vue.use(Dialog)
Vue.use(ActionSheet)
Vue.use(Drawer)
Vue.use(ImagePreview)
Vue.use(Scroll)
Vue.use(Slide)
Vue.use(IndexList)
Vue.use(Swipe)
Vue.use(Sticky)
Vue.use(ScrollNav)
Vue.use(ScrollNavBar)
Vue.use(RecycleList)

Vue.config.productionTip = false
    //jq引用
import jquery from 'jquery'
window.jquery = window.$ = jquery
    // axios引入
import axios from 'axios'
Vue.prototype.http = axios

// vconsole引入
// import vconsole from './vconsole/index'

//公共方法引入

import common from './commonJs/index'
Vue.prototype.common = common

//时间选择器插件引入
import AwesomePicker from 'vue-awesome-picker';
Vue.use(AwesomePicker);

import toastRegistry from './components/common/toast/index.js'
Vue.use(toastRegistry)

/* eslint-disable no-new */
var vue = new Vue({
    el: '#app',
    router,
    axios,
    common,
    template: '<App/>',
    components: { App }
})
export default vue;
router.beforeEach((to, from, next) => {
    document.title = to.meta.name
    next();
})