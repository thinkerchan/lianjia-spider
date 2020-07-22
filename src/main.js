// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.prototype.$config = {
  ak:'czOpOkWeUWk1jTMekpxY5KZy5TEhqjPh',
  mapKey:'3kHfWzjXEIz1toe93VNGHijHU0V7noeP',
  city:'广州',
}

/* eslint-disable no-new */
window._app = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
