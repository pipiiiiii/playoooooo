var express = require('express');
var router = express.Router();
var wechat = require('wechat');
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