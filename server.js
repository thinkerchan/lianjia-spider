const express = require('express')
const request = require('request')
const cheerio = require('cheerio')
const path = require('path')
const axios = require('axios')

let app = express()

app.use(function(req, res, next) {
    res.set({
        'Access-Control-Allow-Origin': '*'
    })
    next()
})

let contentArr = [];
app.get('/getData',(req,res) => {
	contentArr = []
	let entryUrl = req.query.targetUrl

	let getPage = (url,callback) => {
		return axios({
			method:'get',
			url: url,

		}).then((data)=>{
			let $ = cheerio.load(data.data)
			let list = $('.sellListContent').find('li').find('.info')

			// console.log(list.length);
			for (let index = 0; index < list.length; index++) {
				const curInfoItem = $(list[index]);
				let data = {
					title: {
						title: curInfoItem.find('a').html(),
						link: curInfoItem.find('a').attr('href')
					},
					address: {
						// address: list.find('.address').find('.houseInfo').find('a')[i].children[0].data,
						// addressLink: list.find('.address').find('.houseInfo').find('a')[i].attribs.href
					},
					flood: {
						// position: list.find('.flood').find('.positionInfo')[i].children[1].data
					},
					priceInfo: {
						// totalPrice: list.find('.priceInfo').find('.totalPrice').find('span')[i].children[0].data + '万',
						// unitPrice: list.find('.priceInfo').find('.unitPrice').find('span')[i].children[0].data
					}
				}
				contentArr.push(data)
			}
		})
	}

	getPage(entryUrl).then(() => {
		res.send(contentArr)
	})
})

// http://localhost:3000/getData?targetUrl=https://gz.lianjia.com/ershoufang/
app.listen(3000,_ => {
	console.log('api:3000')
})