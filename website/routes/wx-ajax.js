var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('./../model/mongoConnect.js');

router.use(bodyParser.json()); // 解析JSON

/* 	
	绑定相关接口
	wxInfoSchema: 用户公众号信息
	get-wx-info: 获取用户公众号信息
	save-wx-info: 保存用户公众号信息
 */
var wxInfoSchema = new mongoose.Schema({
	teacherId: Number,
	appId: String,
	token: String,
	aesKey: String
});

router.get('/get-wx-info', function(req, res, next){
	var wxInfoModel = mongoose.model("WxInfo", wxInfoSchema);

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
	var wxInfoModel = mongoose.model("WxInfo", wxInfoSchema);

	wxInfoModel.find({
		teacherId: 1
	}).exec(function(err, result){
		if(result.length > 0){
			wxInfoModel.update({teacherId: 1},teacherInfo);
		}else{
			var wxInfoEntity = new wxInfoModel(teacherInfo)
			wxInfoEntity.save();
		}
	})

	res.end();
});
/*
	功能管理相关接口
	wxManageSchema: 功能基本状态信息
	wxManageClassSchema: 课表功能信息
	wxManageHomeworkSchema: 作业功能信息
	wxManageScoreSchema: 成绩功能信息
	get-wx-manage: 获取用户设置
	save-wx-manage: 保存用户设置
 */ 
var wxManageSchema = new mongoose.Schema({
	teacherId: Number,
	classId: String,
	homeworkId: String,
	scoreId: String
});
var wxManageClassSchema = new mongoose.Schema({
	isOpen: Boolean,
	key: String
});
var wxManageHomeworkSchema = new mongoose.Schema({
	isOpen: Boolean,
	key: String
});
var wxManageScoreSchema = new mongoose.Schema({
	isOpen: Boolean,
	key: String
})

router.get('/get-wx-manage', function(req, res, next){
	var wxManageModel = mongoose.model("wxmanage", wxManageSchema),
		wxManageClassModel = mongoose.model("wxmanageclass", wxManageClassSchema),
		wxManageHomeworkModel = mongoose.model("wxmanagehomework", wxManageHomeworkSchema),
		wxManageScoreModel = mongoose.model("wxmanagescore", wxManageScoreSchema),
		manageData = {
			cl: {},
			homework: {},
			score: {}
		},
		count = 1;
	function setData(index, data){
		manageData[index] = data;
		if(count == 3){
			res.json(manageData)
		}else{
			count++
		}
	}
	wxManageModel.find({
		teacherId: 1
	}).exec(function(err, result){
		if(result.length > 0){
			var r = result[0];
			wxManageClassModel.find({
				_id: r.classId
			}).exec(function(err, result){
				setData('cl',result[0])
			})
			wxManageHomeworkModel.find({
				_id: r.homeworkId
			}).exec(function(err, result){
				setData('homework', result[0])
			})
			wxManageScoreModel.find({
				_id: r.scoreId
			}).exec(function(err, result){
				setData("score", result[0])
			})
		}else{
			res.end()
		}
	})
})

router.post('/save-wx-manage', function(req, res, next){
	var wxManageModel = mongoose.model("wxmanage", wxManageSchema),
		wxManageClassModel = mongoose.model("wxmanageclass", wxManageClassSchema),
		wxManageHomeworkModel = mongoose.model("wxmanagehomework", wxManageHomeworkSchema),
		wxManageScoreModel = mongoose.model("wxmanagescore", wxManageScoreSchema),
		data = req.body.data,
		count = 1,
		manageStatus = {
			teacherId: 1,
			classId: '',
			homeworkId: '',
			scoreId: ''
		};

	// 第一次保存调用函数
	function saveManage(index,data){
		manageStatus[index] = data;
		if(count == 3){
			var wxManageEntity = new wxManageModel(manageStatus);
			wxManageEntity.save();
			res.end();
		}else{
			count++
		}
	}
	function addCount(){
		if(count == 3){
			res.end()
		}else{
			count++
		}
	}
	wxManageModel.find({
		teacherId: 1
	}).exec(function(err, result){
		if(result.length > 0){
			var r = result[0];
			// 课表信息
			if (r.classId != '' && data.classStatus.isCheck){
				console.log(r)
				wxManageClassModel.find({
					_id: r.classId
				}).update({isOpen: true, key: data.classStatus.cl}).exec(function(err, result){
					addCount();
				})
			}else if(r.classId != '' && !data.classStatus.isCheck){
				wxManageClassModel.find({
					_id: r.classId
				}).update({$set: {isOpen: false}}).exec(function(err, result){
					addCount();
				})
			}
			// 作业信息
			if (r.homeworkId != '' && data.homeworkStatus.isCheck){
				wxManageHomeworkModel.find({
					_id: r.homeworkId
				}).update({isOpen: true, key: data.homeworkStatus.homework}).exec(function(err, result){
					addCount();
				})
			}else if(r.homeworkId != '' && !data.homeworkStatus.isCheck){
				wxManageHomeworkModel.find({
					_id: r.homeworkId
				}).update({$set: {isOpen: false}}).exec(function(err, result){
					addCount();
				})
			}
			// 成绩信息
			if (r.scoreId != '' && data.scoreStatus.isCheck){
				wxManageScoreModel.find({
					_id: r.scoreId
				}).update({isOpen: true, key: data.scoreStatus.score}).exec(function(err, result){
					addCount();
				})
			}else if(r.scoreId != '' && !data.scoreStatus.isCheck){
				wxManageScoreModel.find({
					_id: r.scoreId
				}).update({$set: {isOpen: false}}).exec(function(err, result){
					addCount();
				})
			}
		}else{
			var wxManageEntity = new wxManageClassModel({
					isOpen: data.classStatus.isCheck,
					key: data.classStatus.cl || ''
				})
			wxManageEntity.save(function(err, result){
				saveManage("classId", result._id)
			});
			var wxManageHomeworkEntity = new wxManageHomeworkModel({
				isOpen: data.homeworkStatus.isCheck,
				key: data.homeworkStatus.homework || ''
			})
			wxManageHomeworkEntity.save(function(err, result){
				saveManage("homeworkId", result._id)
			});
			var wxManageScoreEntity = new wxManageScoreModel({
				isOpen: data.scoreStatus.isCheck,
				key: data.scoreStatus.score
			})
			wxManageScoreEntity.save(function(err, result){
				saveManage("scoreId", result._id)
			});
		}
	})
})

/*
	消息查看相关接口
	replyKeySchema: 回复前缀信息
	replyInfoSchema: 回复信息
	studentSchema: 学生信息
	get-reply-key: 获取前缀信息
	save-reply-key: 保存前缀信息
	get-reply-info: 获取前缀信息
 */
var replyKeySchema = new mongoose.Schema({
	teacherId: Number,
	replyKey: Array
})
var replyInfoSchema = new mongoose.Schema({
	teacherId: Number,
	content: String,
	studentId: Number,
	classify: String
})
var studentSchema = new mongoose.Schema({
	studentId: Number,
	wxId: String,
	name: String,
	schoolNum: Number
})

router.get('/get-reply-key', function(req, res, next){
	var replyKeyModel = mongoose.model("replykey", replyKeySchema);

	replyKeyModel.find({
		teacherId: 1
	}).exec(function(err, result){
		res.json(result)
	})
})

router.post('/save-reply-key', function(req, res, next){
	var replyKeyModel = mongoose.model("replykey", replyKeySchema),
		data = req.body.data,
		replyKeyInfo = {
			teacherId: 1,
			replyKey: data.key
		};

	replyKeyModel.find({
		teacherId: 1
	}).remove().exec(function(err, result){
		var replyKeyEntity = new replyKeyModel(replyKeyInfo)
		replyKeyEntity.save();
	});

	res.end();
})

router.get('/get-reply-info', function(req, res, next){
	var replyInfoModel = mongoose.model("replyInfo", replyInfoSchema),
		studentModel = mongoose.model("student", studentSchema);

	var data = req.query.data
		classify = data.classify,
		messages = [],
		length = 0,
		count = 1;

	function findStudent(data){
		studentModel.find({
			studentId: 1
		}).exec(function(err, result){
			var r = result[0];
			messages.push({
				name: r.name,
				schoolNum: r.schoolNum,
				content: data.content,
				classify: data.classify
			});
			if (count == length){
				res.json(messages)
			}else{
				count++
			}
		})

	}
	console.log(data)
	if (classify == "all"){
		replyInfoModel.find({
			teacherId: 1
		}).exec(function(err, result){
			var message = result;
			
			length = message.length;

			for(var i = 0; i < message.length; i++){
				findStudent(message[i])
			}
		})
	}else{
		replyInfoModel.find({
			teacherId: 1
		}).where("classify").equals(classify).exec(function(err, result){
			length = result.length;
			for(var i = 0; i < result.length; i++){
				findStudent(result[i])
			}
		})
	}
})
module.exports = router;