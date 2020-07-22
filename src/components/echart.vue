<template>
	<div class="compo-echart contain-box">
		<div class="container loading-container" v-show="isLoading">
			<div class="preloader-wrapper">
				<p>Loading...</p>
			</div>
		</div>
		<div id="JechartBox" class="echart-box"></div>
	</div>
</template>

<script lang="babel">
	import echarts from 'echarts'
	import pjsonp from 'pjsonp'
	import axios from "axios";
	import bus from '../asset/bus.js'
	let key = 'czOpOkWeUWk1jTMekpxY5KZy5TEhqjPh';
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
				url: 'http://localhost:3000/getData',
				posData:[],
				dataArr:[],
			}
		},
		watch: {
			pageNum(){
				this.getData(this.url)
			}
		},
		mounted(){
			this.getData(this.url)
			require('echarts/lib/chart/bar')
			require('echarts/lib/component/tooltip')
			require('echarts/lib/component/title')
		},
		methods: {
			genData(addressArr){
				let that = this;
				that.posData = [];

        let addArr = Array.from(new Set(addressArr));	// 小区去重
				for (let i = 0; i < addArr.length; i++) {
					// 此api支持jsonp就直接jsonp,或者可以反向代理
					pjsonp(`https://api.map.baidu.com/geocoding/v3/?`,{
						address: addArr[i],
						output: 'json',
						ak:that.$config.ak,
						city:that.$config.city,
					},{ }).then((data)=>{
						if (data.status=='0') {
							that.posData.push({
								pos:data.result.location,
								name:addArr[i]
							})
						}
					})
				}

				bus.$emit('send', that.posData)
			},
			setEcharts(addressList,priceList){
				// 设置echarts
				let myChart = echarts.init(document.getElementById('JechartBox'))
				myChart.setOption({
					tooltip: {},
					grid:{
						bottom: '20%'
					},
					xAxis: {
						name:'小区',
						data: addressList,
						axisLabel: {
							interval:0,
							margin: 10,
							fontsize: 12,
							formatter:function(val){
								return val.split("").join("\n")
							}
						}
					},
					yAxis: {
						name:'总价(万)',
					},
					series: [{
						name: '总价',
						type: 'bar',
						data: priceList
					}],
					color: ['#3398DB']
				})

			},
			getData(url){
				let that = this
				this.isLoading = true

				this.addressList = []
				this.priceList = []

				axios({
					url,
					method: 'get',
					params:{
						targetUrl: 'https://gz.lianjia.com/ershoufang/pg' + that.pageNum
					}
				}).then((data)=>{
					let res = data.data

					for(let i = 0,len = res.length; i<len; i++){
						let curItem = res[i]
						that.addressList.push(curItem.address.communityName)
						that.priceList.push(parseInt(curItem.priceInfo.totalPrice.replace('万',''),10))
					}

					that.setEcharts(that.addressList, that.priceList);
					that.isLoading = false

					that.genData(that.addressList)
				})
			}
		}
	}
</script>

<style lang="scss" >
	@import '@/asset/app.scss';
</style>