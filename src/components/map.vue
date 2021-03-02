<template>
  <div class="compo-map">
    <baidu-map class="echart-map"  :ak="$config.mapKey"  :center="$config.city" >
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <div  v-for="(item,index) of dataArr" v-bind:key="index">
        <bm-marker :position="item.pos" :dragging="false" @click="infoWindowOpen(item.name)"></bm-marker>
      </div>
      <div class="pop" id="Jpop" v-show="show" @click="infoWindowClose">
        小区: {{dizhi}}
        <p>地址: {{dizhi}}</p>
        <p>单价: {{uniPrice}}</p>
        <p>在售: {{onsale}}</p>
        <p>历史成交价: {{historyLink}}</p>
      </div>
    </baidu-map>

  </div>
</template>
<script>
  import Vue from 'vue'
  import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
  import BmMarker from 'vue-baidu-map/components/overlays/Marker.vue'
  import BmLabel from 'vue-baidu-map/components/overlays/Label.vue'
  import BmInfoWindow from 'vue-baidu-map/components/overlays/InfoWindow.vue'
  import BmNavigation from 'vue-baidu-map/components/controls/Navigation.vue'
  import bus from '../asset/bus.js'

  export default {
    name: 'mapdata',
    components: {
      BaiduMap,
      BmMarker,
      BmInfoWindow,
      BmNavigation,
      BmLabel
    },
    data () {
      return {
        isLoading: false,
        addressList: [],
        priceList: [],
        // dataUrl: 'http://localhost:3000/getData',
        dataUrl: location.protocol+location.hostname+':3000/getData',
        show: false,
        dataArr:null, //传过来是一个数组
        addArr:null,
        dizhi:'',
        uniPrice:'88888/平',
        onsale:'x套',
        historyLink:'此处是链接'
      }
    },
    created () {
      let _this = this;
      bus.$on('send', data => {
        _this.dataArr = data
      })
    },
    mounted(){
      //
    },
    methods:{
      infoWindowClose () {
        this.show = false
      },
      infoWindowOpen (name) {
        this.show = true
        this.dizhi = name;
      },
    }
  }
</script>
<style lang="scss">
  @import '@/asset/app.scss';
</style>