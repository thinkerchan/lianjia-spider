<template>
	<div class="contain-box">
		<div class="container loading-container" v-show="isLoading">
			<div class="preloader-wrapper">
				<p>Loading...</p>
			</div>
		</div>
		<div id="echart_box" class="echart-box"></div>
	</div>

</template>
<style lang="scss" >
	.contain-box{
		position: relative;
		width: 100%;
		height: 500px;
		.loading-container{
			position: absolute;
			width: 100%;
			max-width: 100% !important;
			height: 100%;
			z-index: 1000;
			background: rgba(255,255,255,.6);
			.preloader-wrapper{
				position: absolute;
				top: 50%;
				left: 50%;
				margin-top: -32px;
				margin-left: -32px;
			}
		}
		.echart-box{
			width: 100%;
			height: 500px;
		}
	}
</style>
<script lang="babel">
	import echarts from 'echarts'
	import $ from 'jquery'
	import bus from '../asset/bus.js'
	let key = '3kHfWzjXEIz1toe93VNGHijHU0V7noeP';
	export default{
		props: {
			pageNum: {
				type: Number,
				default: 1,
				required: true
			}
		},
		data(){
			return {
				isLoading: false,
				addressList: [],
				priceList: [],
				echarts: require('echarts/lib/echarts'),
				dataUrl: 'http://localhost:3000/getData',
				posData:[],
				dataArr:[],
			}
		},
		watch: {
			pageNum(){
				this.getData()
			}
		},
		mounted(){

			this.getData()
			require('echarts/lib/chart/bar')
			require('echarts/lib/component/tooltip')
			require('echarts/lib/component/title')

		},
		methods: {
			genData(data){
				let that = this;
				// 去重
				for (var i = 0; i < data.length; i++) {
          this.dataArr.push(data[i].address.address)
        }
        let addArr = Array.from(new Set(this.dataArr));
        // console.log(addArr)
        // return;

        // 解析坐标
				for (let i = 0; i < addArr.length; i++) {
				  $.ajax({
				    url: `https://api.map.baidu.com/geocoder/v2/?address=${addArr[i]}&output=json&ak=${key}&callback=showLocation&city=广州`,
				    type: 'GET',
				    dataType:'jsonp',
				    data: {},
				    success: function (data) {
				      if (data.status=='0') {
				        that.posData.push({
				        	pos:data.result.location,
				        	name:addArr[i]
				        })
				      }
				    }
				  });
				}

			},
			setEcharts(that){
				// 设置echarts
				let myChart = echarts.init(document.getElementById('echart_box'))
				myChart.setOption({
					tooltip: {},
					grid:{
						bottom: '20%'
					},
					xAxis: {
						data: that.addressList,
						axisLabel: {
							interval:0,
							margin: 10,
							fontsize: 12,
							formatter:function(val){
								return val.split("").join("\n")
							}
						}
					},
					yAxis: {},
					series: [{
						name: '总价',
						type: 'bar',
						data: that.priceList
					}],
					color: ['#3398DB']
				})
				that.isLoading = false
			},
			getData(){
				let that = this
				this.isLoading = true
				this.addressList = []
				this.priceList = []
				$.ajax({
					url: that.dataUrl,
					method: 'get',
					data: {
						targetUrl: 'https://gz.lianjia.com/ershoufang/pg' + that.pageNum
					},
					dataType: 'json',
					success: data => {
						for(let i = 0,len = data.length; i<len; i++){
							that.addressList.push(data[i].address.address)
							that.priceList.push(parseInt(data[i].priceInfo.totalPrice.replace('万',''),10))
						}
						that.setEcharts(that);
						// 解析坐标
						let pro = new Promise((resolve, reject)=>{
							that.genData(data)
							resolve && resolve();
 						})
						pro.then(()=>{
							// 传递数据到map组件
							bus.$emit('send', that.posData)
						})
					}
				})
			}
		}
	}
</script>