var express = require('express');
var router = express.Router();
var wechat = require('wechat');

var config = {
  token: 'myweixin',
  encodingAESKey: 'ikd8r4AzBO2o6KZ3b9EKNcvdJHe5fWnQ5fVgwhe7eM3'
};

/*router.post('/', wechat(config, function(req, res, next){
	var message = req.weixin;

	if(message){
		res.reply('success');
	}
}));*/

router.get('/', function(req, res, next){
	res.render('wxapp/index', { title: 'Creating' });
})

module.exports = router;