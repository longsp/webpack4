// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

//防重复点击
Vue.directive('reclick', {
    inserted (el, binding) {
      el.addEventListener('click', () => {
        if (!el.disabled) {
          el.disabled = true
          setTimeout(() => {
            el.disabled = false
          }, binding.value || 1000)
        }
      })
    }
})

/**
 *外部引入
 */
//按需引入mint-ui
import {InfiniteScroll, DatetimePicker} from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(InfiniteScroll);
Vue.component(DatetimePicker.name, DatetimePicker);

import 'lib-flexible' //手机自适应
//引入swiper -- 滑动插件
import VueAwesomeSwiper from 'vue-awesome-swiper'
require('swiper/dist/css/swiper.css')
Vue.use(VueAwesomeSwiper)

//字体图标
import '@/icons/index'   // api: http://www.iconfont.cn/

/**
 * 公共引入和设置
 */
import App from './App'
import router from './router'
import './assets/css/resetMint.less'
import './assets/css/common.less'
Vue.config.productionTip = false

/**
 * 全局变量、方法、插件
 */
//环境变量
import {$config} from '@/config/config'
Vue.prototype.$config = $config;

//修复精度问题
import {formatBug} from '@/utils/filter'
Vue.prototype.$formatBug = formatBug;

//全局请求方法
import http from './service/index'
Vue.prototype.$http = http;

//关闭Toast
Vue.prototype.$closeToast = function(){
    if(window.Toast){
        window.Toast.close();
    }
};

// 自定义confirm
import Confirm from '@/components/confirm/index'
Vue.prototype.$confirm = Confirm;

window.vue = new Vue({
	el: '#app',
	router,
	render: h => h(App)
})
