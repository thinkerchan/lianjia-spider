<template>
  <div class="compo-map">
    <baidu-map class="echart-map"  :ak="$config.mapKey"  :center="$config.city" >
      <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
      <div  v-for="(item,index) of dataArr" v-bind:key="index">
        <bm-marker :position="item.pos" :dragging="false" @click="infoWindowOpen(item.name)"></bm-marker>
      </div>
      <div class="pop" id="Jpop" v-show="show" @click="infoWindowClose">{{dizhi}}</div>
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
        dataUrl: 'http://localhost:3000/getData',
        show: false,
        dataArr:null, //传过来是一个数组
        addArr:null,
        dizhi:'',
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