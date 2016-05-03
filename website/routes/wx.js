var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var wxModel = require('./../model/wxModel.js');

var token = '';
router.use('/interface/:appid', function(req, res, next){
	var appid = req.params.appid;
	
	wxModel.getToken(appid, function(token){
		req.wechat_token = token;
		next();
	})
});
router.use('/interface/:appid', wechat(token)
  .text(function (message, req, res, next) {
  	var message = req.weixin;
  	if (message){
  		res.reply(message.Content)
  	}else{
  		res.reply('error')
  	}
  }).middlewarify())

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