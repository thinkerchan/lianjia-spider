<template>
  <div>
    <p class="tit">广州二手房房价柱状图, 数据来源<a href="https://gz.lianjia.com/ershoufang/">链家二手房</a></p>
    <div class="echart-container">
      <echart :page-num="pageNum"></echart>
    </div>
    <div class="btn-group container">
      <button class="btn waves-effect waves-light" @click="--pageNum">上一页</button>
      <span style="margin: 0 15px;">{{pageNum}}</span>
      <button class="btn waves-effect waves-light" @click="++pageNum">下一页</button>
    </div>
  </div>
</template>
<style  lang="scss">
  *{margin: 0;padding: 0;}
  body{
    min-width:1000px;
    margin: 0 auto;
  }
  .tit{
    text-align: center;
    font-size: 20px;
    padding: 20px;
  }
  .echart-container{
   width: 1000px;
   height: 500px;
   margin: 0 auto;
   padding-bottom: 30px;
  }
  a{
    text-decoration:none;
    color:#3298DB;
  }
  .btn{
    background-color: #3298DB;
    color: #fff;
    padding: 10px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    outline: none;
  }
  .btn-group{
   margin-top: 20px;
   width: 100%;
   max-width: 100%;
   text-align: center;
  }
</style>
<script>
  import echart from "@/components/echart";
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
      echart
    }
  }
</script>