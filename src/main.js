import App from './App'
import Vue from 'vue'
import VHtmlPlugin from '@megalo/vhtml-plugin'
import Vuex from 'vuex'
import moment from 'dayjs'
const Fly = require("./native/fly/wx.js")
const fly = new Fly
fly.config.baseURL = "http://116.62.234.172:3000"

Vue.use(VHtmlPlugin)
Vue.use(Vuex)

const store = require('./store').default
Vue.prototype.$store = store
Vue.prototype.$fly = fly
Vue.prototype.$moment = moment


const app = new Vue(App)

app.$mount()

export default {
  config: {
    // pages 的首个页面会被编译成首页
    pages: [
      'pages/home/Home',
        'pages/singer/singer',
        'pages/my/my',
        'pages/SearchDetails/SearchDetails',
      'pages/singerX/singerX',
      'pages/play/play',
      'pages/land/land'
    ],
    tabBar: {
      color: '#333',
      selectedColor: '#007d37',
      list: [
        {
          "pagePath": "pages/home/Home",
          "text": "首页",
          "iconPath": "native/tabbar/home.png",
          "selectedIconPath": "native/tabbar/home_on.png"
        },
        {
          "pagePath": "pages/singer/singer",
          "text": "歌手",
          "iconPath": "native/tabbar/erji.png",
          "selectedIconPath": "native/tabbar/erji.png"
        },
        {
          "pagePath": "pages/my/my",
          "text": "我的",
          "iconPath": "native/tabbar/mine.png",
          "selectedIconPath": "native/tabbar/mine_on.png"
        }
      ]
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '音乐馆',
      navigationBarTextStyle: 'black'
    }
  }
}
