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

WxModel.prototype.getInfo = function(appid, callback){
	var wxInfoModel = mongoose.model("WxInfo", wxInfoScheam),
	    wxInfo = {},
		self = this;
	wxInfoModel.find({
		appId: appid
	}, function(err, result){
		if (result.length > 0){
			var data = result[0];

			wxInfo = {
				token: data.token,
				appId: data.appId,
				appSecret: '4886589b3a55dda203c85655879848de'
			}
			callback(wxInfo)
		}else{
			return
		}
	})
}

module.exports = new WxModel;