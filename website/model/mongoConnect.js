var mongoose = require('mongoose');
mongoose.connect('mongodb://wx:123456@127.0.0.1:27017/wx');

module.exports =  mongoose;