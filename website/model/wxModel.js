var mongoose = require('./mongoConnect.js');

// 公众号基本信息Scheam
var wxInfoScheam = new mongoose.Schema({
	teacherId: Number,
	appId: String,
	token: String,
	aesKey: String
});

function WxModel(){
	this.token = ''
}

WxModel.prototype.getToken = function(appid, callback){
	var wxInfoModel = mongoose.model("WxInfo", wxInfoScheam),
	    token = '',
		self = this;
	wxInfoModel.find({
		appId: appid
	}, function(err, result){
		if (result.length > 0){
			var data = result[0];
			callback(data.token)
		}else{
			return
		}
	})
}

module.exports = new WxModel;