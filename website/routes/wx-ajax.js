var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('./../model/mongoConnect.js');

router.use(bodyParser.json()); // 解析JSON

// 绑定相关接口
var wxInfoScheam = new mongoose.Schema({
	teacherId: Number,
	appId: String,
	token: String,
	aesKey: String
});

router.get('/get-wx-info', function(req, res, next){
	var wxInfoModel = mongoose.model("WxInfo", wxInfoScheam);

	wxInfoModel.find({
		teacherId: 1
	}).exec(function(err, result){
		res.json(result);
	});
});

router.post('/save-wx-info', function(req, res, next){
	var data = req.body.data;
	var teacherInfo = {
		teacherId: data.teacherId,
		appId: data.appid,
		token: data.token,
		aesKey: data.key
	}
	var wxInfoModel = mongoose.model("WxInfo", wxInfoScheam);

	wxInfoModel.find({
		teacherId: 1
	}).exec(function(err, result){
		if(result.length > 0){
			wxInfoModel.update(teacherInfo);
		}else{
			var wxInfoEntity = new wxInfoModel(teacherInfo)
			wxInfoEntity.save();
		}
	})

	res.end();
});

module.exports = router;