const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')

let app = express()

function entityToString(entity) {
	let entities = entity.split(';')
	entities.pop()
	let tmp = ''
	for (let i = 0; i < entities.length; i++) {
		let num = entities[i].trim().slice(2)
		if (num[0] === 'x')
			num = parseInt(num.slice(1), 16);
		else num = parseInt(num);
		tmp += String.fromCharCode(num)
	}
	return tmp
}

let getPage = (url) => {
	contentArr = [];
	return axios({
		method: 'get',
		url: url,
	}).then((data) => {
		let $ = cheerio.load(data.data)
		let list = $('.sellListContent').find('li.clear.LOGCLICKDATA').find('.info')

		for (let index = 0; index < list.length; index++) {
			const curInfoItem = $(list[index]);

			contentArr.push({
				title: {
					title: curInfoItem.find('a').text(), // or entityToString(html)
					link: curInfoItem.find('a').attr('href')
				},
				address: {
					communityName: curInfoItem.find('.flood').find('.positionInfo').find('a').eq(0).text(),
					area: curInfoItem.find('.flood').find('.positionInfo').find('a').eq(1).text(),
				},
				priceInfo: {
					totalPrice: curInfoItem.find('.priceInfo').find('.totalPrice').text(),
					unitPrice: curInfoItem.find('.priceInfo').find('.unitPrice').text()
				}
			})
		}
	})
}

let contentArr = [];
app.use(function (req, res, next) {
	res.set({
		'Access-Control-Allow-Origin': '*'
	})
	next()
})

app.get('/getData',(req,res) => {
	getPage(req.query.targetUrl).then(() => {
		res.send(contentArr)
	})
})

// http://localhost:3000/getData?targetUrl=https://gz.lianjia.com/ershoufang/

app.listen(3000,() => {
	console.log('api:3000')
})