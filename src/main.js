// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Es6Promise from 'es6-promise'
require('es6-promise').polyfill()
Es6Promise.polyfill()

import Vue from 'vue'
import App from './App'



//导入mint-ui
import mintui from 'mint-ui'
import 'mint-ui/lib/style.css'
import '../static/style/mint-ui.css'
Vue.use(mintui)
Vue.use(Lazyload)
import router from './router'

//import '../static/js/IOSAndAndroid.js'

//css 导入
import './../static/style/public.css'
import '../static/css/myVideo/myVideo.css' // 重置vue-video-player部分样式

//导入axios
import axios from 'axios'
//导入md5加密
import md5 from 'js-md5';
//导入复制功能
import Clipboard from 'clipboard'
import _ from "lodash" //工具库
import Velocity from 'velocity-animate' //js动画库,有用
import 'velocity-animate/velocity.ui.js'
import MyStart from '@/components/publicmodel/start' //封装公共头部组件,直接引用
Vue.use(MyStart)

/**
 * 获取手机上方状态栏高度
 */
try {
    Vue.prototype.$statusBarHeightObj = {
      paddingTop: 0,
    }
    if (isMobile.iOS()) {
        Vue.prototype.$statusBarHeightObj = {
            paddingTop: 0,
        }
    } else if (isMobile.Android()) {
        Vue.prototype.$statusBarHeightObj = {
            paddingTop: js2android.getStatusBarHeight() / 4 + 'px'
        }
    }
} catch (e) {
    Vue.prototype.$statusBarHeightObj = {
        paddingTop: 0
    }
}

// import doubleShare from '@/utils/doubleShare'

// Vue.prototype.$doubleShare = doubleShare
Vue.prototype.$http = axios;
Vue.prototype.$md5 = md5
Vue.prototype.toLogin = function() {
    MessageBox({
        title: '提示',
        message: '请登录',
        confirmButtonText: '确定'
    }).then(action => {
        console.log("跳转登录");
        if (isMobile.iOS()) {
            window.webkit.messageHandlers.login.postMessage("");
        } else if (isMobile.Android() && window.js2android) {
          window.js2android.login();
        }
    });
}

// mint-ui插件
import {
    Search,
    PaletteButton,
    IndexList,
    IndexSection,
    Cell,
    Swipe,
    SwipeItem,
    CellSwipe,
    Actionsheet,
    Popup,
    Checklist,
    Switch,
    Picker,
    DatetimePicker,
    Navbar,
    TabItem,
    MessageBox,
    Toast,
    TabContainer,
    TabContainerItem,
    Spinner,
    Radio,
    Lazyload,
    Field
} from 'mint-ui'; //按需引入部分组件
Vue.component(Search.name, Search);
Vue.component(PaletteButton.name, PaletteButton);
Vue.component(IndexList.name, IndexList);
Vue.component(IndexSection.name, IndexSection);
Vue.component(Cell.name, Cell);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(CellSwipe.name, CellSwipe);
Vue.component(Actionsheet.name, Actionsheet);
Vue.component(Switch.name, Switch);
Vue.component(Popup.name, Popup);
Vue.component(Picker.name, Picker);
Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Toast.name, Toast);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Spinner.name, Spinner);
Vue.component(Radio.name, Radio);
Vue.component(Field.name, Field);

import MyHeader from '@/components/components/MyHeader'
Vue.use(MyHeader)

//状态管理
import store from './store'

//导入jquery
import $ from 'jquery'
//
//手机端调试工具,发布提交时必须注释掉
// import Vconsole from 'vconsole'
// new Vconsole()
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>',
    data: {
        eventHub: new Vue()
    }
})
