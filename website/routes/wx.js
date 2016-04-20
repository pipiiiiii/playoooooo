var express = require('express');
var router = express.Router();
var wechat = require('wechat');

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

router.get('/cms', function(req, res, next){
	res.render('wxapp/index', { title: 'Creating' });
})


module.exports = router;