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

var db = mongoose.connect('mongodb://wx:123456@127.0.0.1:27017/wx');

var wxSchema = new mongoose.Schema({
	wxId: String
})
var wxModel = db.model("WeiXin",wxSchema);

router.get('/cms', function(req, res, next){

	var wxEntity = new wxModel({wxId: "id23"});
	wxEntity.save()

	res.render('wxapp/index', { title: 'Creating' });
})


module.exports = router;