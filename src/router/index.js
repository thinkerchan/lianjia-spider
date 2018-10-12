import Vue from 'vue'
import Router from 'vue-router'
import echart from '@/components/echart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'echart',
      component: echart
    }
  ]
})
