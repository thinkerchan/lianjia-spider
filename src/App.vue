<template>
  <div class="page-app">
    <!-- <p class="tit">广州二手房房价柱状图, 数据来源<a href="https://gz.lianjia.com/ershoufang/">链家二手房</a></p> -->
    <div class="echart-container">
      <echart :page-num="pageNum" @getApiData="getApiData"></echart>
    </div>
    <div class="btn-group container">
      <button class="btn waves-effect waves-light" @click="--pageNum">上一页</button>
      <span style="margin: 0 15px;">{{pageNum}}</span>
      <button class="btn waves-effect waves-light" @click="++pageNum">下一页</button>
    </div>
    <div class="map-wrap echart-container">
      <mapdata :page-num="pageNum"></mapdata>
    </div>
  </div>
</template>
<style  lang="scss">
  @import 'asset/app.scss';
</style>
<script>
  import echart from "@/components/echart";
  import mapdata from "@/components/map";
  export default{
    data(){
      return {
        pageNum: 1
      }
    },
    watch: {
      pageNum(val){
        if(val <=0 ) this.pageNum = 1
      }
    },
    components: {
      echart,
      mapdata
    },
    methods:{
      getApiData(data){
        console.log('data',data)
      }
    }
  }
</script>