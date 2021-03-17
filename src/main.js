import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { utils } from 'common/utils'
import { CONST } from 'common/const'
import '@/assets/css/base.css'

//工程化自动导入所有svg图标不用多次import
import '@/assets/icons'
import SvgIcon from 'components/common/SvgIcon'

Vue.prototype.$util = utils

Vue.config.productionTip = false
Vue.directive('focus', {
  inserted(el) {
    const inp = el.querySelector('input')
    inp.addEventListener('focus', () => {
      el.style.border = '1px solid #007fff'
    })
    inp.addEventListener('blur', () => {
      el.style.border = ''
    })
  }
})
Vue.component('SvgIcon', SvgIcon)

//全局常量
window.CONST = CONST

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
