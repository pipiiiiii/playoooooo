var mongoose = require('./../model/mongoConnect.js');

// 公众号基本信息Scheam
var wxInfoScheam = new mongoose.Schema({
	teacherId: Number,
	appId: String,
	token: String,
	aesKey: String
});

var wxModel = {
	getToken: function(appid){
		var wxInfoModel = mongoose.model("WxInfo", wxInfoScheam);

		wxInfoModel.find({
			appId: appid
		}).exec(function(err, result){
			if (result.length > 0){
				var data = result[0];

				return data.token
			}
		})
	}
}

module.exports = wxModel;