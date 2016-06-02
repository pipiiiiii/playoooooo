<style>
	.bind-content{
		position: absolute;
		top: 50%;
		left: 50%;
		width: 300px;
		height: 300px;
		margin-top: -150px;
		margin-left: -150px;
		padding-top: 60px;
	}
	.bind-content p{
		text-align: center;
	}
	.bind-content button{
		border: none;
		display: block;
		position: relative;
		margin: 50px auto;
		width: 100px;
		height: 40px;
	}
	.bind-dialog{
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 10;
		background-color: rgba(0,0,0,0.5);
	}
	.bind-wrap{
		position: relative;
		width: 900px;
		height: 600px;
		top: 50%;
		margin: -300px auto 0;
	}
	.bind-form,.bind-help{
		position: relative;
		display: inline-block;
		vertical-align: top;
		width: 300px;
		height: 600px;
		margin: 0 50px 0 50px;
		z-index: 11;
		background-color: #fff;
		border-radius: 10px;
	}
	.bind-wrap .close{
		position: absolute;
		top: 5px;
		right: 5px;
		cursor: pointer;
	}
	.bind-form form{
		margin-top: 60px;
	}
	.mdl-textfield{
		margin: 15px auto;
	}
	.bind-help h3{
		text-align: center;
	}
	.bind-form button{
		display: block;
		margin: 20px auto;
	}
	.bind-form p{
		margin: 20px auto;
	}
	.bind-dialog .mdl-tooltip{
		position: absolute;
		top: 52px;
		left: 0px;
		transform: scale(1);
	}
</style>

<template>
	<div id="bind">
		<div class="bind-content">
			<p>{{bindText}}</p>
			<button class="mdl-botton mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" v-on:click="changeDialog">点击设置信息</button>
		</div>
		<div class="bind-dialog" v-show="shown">
			<div class="bind-wrap">
				<dialog class="bind-form mdl-dialog">
					<i class="material-icons close" v-on:click="changeDialog">close</i>
					<form>
						<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" v-bind:class="{'is-dirty':isTure.getData}">
							<label class="mdl-textfield__label" for="appid" v-bind:class="{'mdl-color-text--red-500':isTure.appid}">AppID</label>
							<input class="mdl-textfield__input" type="text" id="appid" v-model="appid" />
							<div class="mdl-tooltip" v-show="isTure.appid">请输入AppID</div>
						</div>
						<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" v-bind:class="{'is-dirty':isTure.getData}">
							<label class="mdl-textfield__label" for="token" v-bind:class="{'mdl-color-text--red-500':isTure.token}">token</label>
							<input class="mdl-textfield__input" type="text" id="token" v-model="token" />
							<div class="mdl-tooltip" v-show="isTure.token">请输入token</div>
						</div>
						<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" v-bind:class="{'is-dirty':isTure.getData}">
							<label class="mdl-textfield__label" for="key" v-bind:class="{'mdl-color-text--red-500':isTure.key}">EncodingAESKey</label>
							<input class="mdl-textfield__input" type="text" id="key" v-model="key" />
							<div class="mdl-tooltip" v-show="isTure.key">请输入Key</div>
						</div>
					</form>
					<button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" v-on:click="getUrl">生成链接</button>
					<div id="p2" class="mdl-progress mdl-js-progress mdl-progress__indeterminate" v-show="loading"></div>
					<p v-show="url">您的链接已生成：{{url}}</p>
				</dialog>
				<dialog class="bind-help mdl-dialog">
					<i class="material-icons close" v-on:click="changeDialog">close</i>
					<h3>使用说明</h3>
					<p class="">1.前往<a href="https://mp.weixin.qq.com/" target="_blank">https://mp.weixin.qq.com/</a>注册公众账号</p>
					<p>2.登录后在左侧开发标签中选择基本设置</p>
					<p>3.将AppID填入左侧表单中</p>
					<p>4.在服务器配置中设置token和EncodingAESKey,并填入左侧表单中</p>
					<p>5.点击生成连接按钮</p>
					<p>6.将生成的连接复制到设置页面的URL地址中</p>
					<p>7.点击提交</p>
				</dialog>
			</div>
		</div>
	</div>
</template>

<script>
	var Bind = {
		el: function(){
			return '#bind'
		},
		data: function(){
			return {
				shown: false,
				loading: false,
				appid: '',
				token: '',
				key: '',
				url: '',
				isTure:{
					appid: false,
					token: false,
					key: false,
					getData: false
				},
				bindText: '您已经绑定过微信公众号信息'
			}
		},
		methods: {
			changeDialog: function(){
				this.shown = !this.shown;

				this.$http.get('/wxdata/get-wx-info').then(function(result){
					var data = result.data[0];
					if (data){
						this.isTure.getData = true;
						this.appid = data.appId;
						this.token = data.token;
						this.key = data.aesKey;
						this.$nextTick(componentHandler.upgradeAllRegistered)
					}
				})
			},
			getUrl: function(){
				var isTure = this.isTure;
				isTure.appid = this.appid != '' ? false : true;
				isTure.token = this.token != '' ? false : true;
				isTure.key = this.key != '' ? false : true;

				if (this.appid != '' && this.token != '' && this.key != ''){
					this.loading = true;
					this.$http.post('/wxdata/save-wx-info',{
						data: {
							teacherId: 1,
							appid: this.appid,
							token: this.token,
							key: this.key
						}
					}).then(function(result){
						console.log(this)
						if(result.ok){
							this.loading = false;
							this.url = "www.playoooooo.com/wxapp/interface/" + this.appid;
							this.bindText = '您已经绑定过微信公众号信息'
						}
					})
				}		
			}
		}
	};

	module.exports = Bind;
</script>