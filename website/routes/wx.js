var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var mongoose = require('./../model/mongoConnect.js');
var bodyParser = require('body-parser');

router.use(bodyParser.json());
// 绑定相关接口
var wxInfoScheam = new mongoose.Schema({
	teacherId: Number,
	appId: String,
	token: String,
	aesKey: String
});
// router.all('/', wechat(config, function(req, res, next) {
//   var message = req.weixin;

//   if(message){
//     res.reply('success');
//   }
// }));
var config = {};
router.all('/interface/:appid', function(req, res, next){
	var appid = req.params.appid;
	var wxInfoModel = mongoose.model("WxInfo", wxInfoScheam);
	wxInfoModel.find({
		appId: appid
	}).exec(function(err, result){
		var data = result[0];
		console.log(data);
		if(result.length > 0){
			config = {
				token: data.token,
				appid: data.appId,
				encodingAESKey: data.aesKey
			}
			next('route');
		}
	})
});
router.all('/interface/:appid', wechat(config, function(req, res, next){
	var message = req.weixin;

	if(message){
		res.reply('success')
	}
}))

router.get('/cms', function(req, res, next){

	// var wxModel = db.model("WeiXin",wxSchema);
	// wxModel.find({
	// 	className: "javascript"
	// }).where("student")
	//   .in(['张三','小明'])
	//   .exec(function(err, result){
	//   	Array.prototype.slice.call(result);
	// 	return res.render('wxapp/index', {
	// 		title: "管理界面",
	// 		data: {
	// 			content: err || result
	// 		}
	// 	})
	// })
	
	// var studentInfo = {
	// 	wxId: "id_4",
	// 	className: "javascript",
	// 	student: "小明"
	// }

	// var wxEntity = new wxModel(studentInfo);
	// wxEntity.save()

	res.render('wxapp/index', { 
		title: 'Creating',
		data: {
			content: 1
		}
	});
})


module.exports = router;