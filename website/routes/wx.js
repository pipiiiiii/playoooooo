var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var mongoose = require('mongoose');

var config = {
  token: 'myweixin',
  appid: 'wxbd50e5ea1bb8b9e4',
  encodingAESKey: 'ikd8r4AzBO2o6KZ3b9EKNcvdJHe5fWnQ5fVgwhe7eM3'
};

router.all('/', wechat(config, function(req, res, next) {
  var message = req.weixin;

  if(message){
    res.reply('success');
  }
}));
// 数据库
// var db = mongoose.connect('mongodb://wx:123456@127.0.0.1:27017/wx');

// var wxSchema = new mongoose.Schema({
// 	wxId: String,
// 	className: String,
// 	student: String
// })

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