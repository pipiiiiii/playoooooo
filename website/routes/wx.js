var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var WechatAPI = require('wechat-api');
var wxModel = require('./../model/wxModel.js');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('./../model/mongoConnect.js');

router.use(session({
	secret: 'keyboard',
	saveUninitialized: false,
	resave: false,
	store: new MongoStore({	mongooseConnection: mongoose.connection })
}))
var token,appId,appSecret;
router.use('/interface/:appid', function(req, res, next){
	var appid = req.params.appid;
	
	wxModel.getToken(appid, function(info){
		req.wechat_token = info.token;
		appId = info.appId;
		appSecret = info.appSecret;
		next();
	})
});
router.use('/interface/:appid', wechat(token).event(function(message, req, res, next){
	var openId = message.FromUserName,
		// api = new WechatAPI(appId, appSecret);
		// console.log(api)
  	if (message.Event == 'subscribe'){
  		var array = [{
  			"title": "点击此处进行绑定",
  			"description": "点击此处进入翻转课堂进行绑定",
  			"url": "www.qq.com",
  			"picurl": "zhishu.1njoy.com/app/assets/images/lang.jpg"
  		}]
  		api.sendNews(openId, array)
  	}else if(message){
  		res.reply('请先绑定')
  	}
}).text(function(message, req, res, next){
	if(message){
		res.reply("successful")
	}
}).middlewarify())

router.use('/cms', function(req, res, next){
	console.log(req.session)
	var auth = req.session.auth;
	console.log(req.session)
	if(!auth){
		auth = req.session.auth = {
			teacherId: ''
		};
	}else{
		// auth.teacherId = ''
	}

	if(req.session.auth.teacherId == ''){
		return res.redirect("/wxapp/login");
	}else{
		next();
	}
}, function(req, res, next){
	console.log(req.session)
	res.render('wxapp/index', { 
		title: '微信管理系统',
		data: {
			content: 1
		}
	});
})

router.get('/login', function(req, res, next){
	res.render('wxapp/login', {
		title: '微信管理系统'
	})
})

router.post('/save-session', function(req, res, next){
	req.session.auth.teacherId = 1;

	res.end();
})

module.exports = router;