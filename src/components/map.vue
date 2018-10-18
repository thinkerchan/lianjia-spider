<template>
  <div>
    <baidu-map class="echart-map"  ak="3kHfWzjXEIz1toe93VNGHijHU0V7noeP"  center="广州" >
      <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
      <div  v-for="(item,index) of dataArr" v-bind:key="index">
        <bm-marker :position="item.pos" :dragging="false" @click="infoWindowOpen(item.name)"></bm-marker>
      </div>
      <div class="pop" id="Jpop" v-show="show" @click="infoWindowClose">{{dizhi}}</div>
    </baidu-map>
  </div>
</template>
<script>
  import $ from 'jquery'
  import Vue from 'vue'
  import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
  import BmMarker from 'vue-baidu-map/components/overlays/Marker.vue'
  import BmInfoWindow from 'vue-baidu-map/components/overlays/InfoWindow.vue'
  import BmNavigation from 'vue-baidu-map/components/controls/Navigation.vue'
  import bus from '../asset/bus.js'

  export default {
    name: 'mapdata',
    data () {
      return {
        isLoading: false,
        addressList: [],
        priceList: [],
        dataUrl: 'http://localhost:3000/getData',
        show: false,
        points:{lng: 113.33113261095514, lat: 23.112220351371434},
        points2:{lng: 113.23113261095514, lat: 23.212220351371434},
        dataArr:null, //传过来是一个数组
        addArr:null,
        dizhi:'',
      }
    },
    watch:{
      pageNum(){
        // this.getData()
      }
    },
    created () {
      let _this = this;
      bus.$on('send', data => {
        _this.dataArr = data
      })
    },
    components: {
      BaiduMap,
      BmMarker,
      BmInfoWindow,
      BmNavigation,
    },
    mounted(){
    },
    methods:{
      infoWindowClose () {
        this.show = false
      },
      infoWindowOpen (name) {
        this.show = true
        this.dizhi = name;
      },
      getData(){
      }
    }
  }
</script>
<style lang="scss" scoped>
  .echart-map{
    position: relative;
    width: 100%;
    height: 500px;
  }
  .pop{
    position: absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    padding:30px 100px;
    background-color: rgba(0,0,0,.6);
    border-radius: 10px;
    color:#fff;
    text-align: center;
  }
</style>