require('./wxapp.css');
var Vue = require('vue');
var Bind = require("./bind.vue")
var Manage = require("./manage.vue");
var Message = require('./message.vue');
var VueRouter = require('vue-router');

function init(){
	Vue.use(VueRouter);

	// var wxVm = new Vue({
	// 	el: "#wx",console.log(1)
	// 	components: {console.log(1)
	// 		manage: Manage
	// 	}
	// })

	var App = Vue.extend({});

	var router = new VueRouter({
		linkActiveClass: "mdl-color--grey-300"
	});

	router.map({
		'/': {
			component: Bind
		},
		'/manage':{
			component: Manage
		},
		'/message':{
			component: Message
		}
	})

	router.start(App, '#wx')
}

init();