<style>
	.login{
		position: absolute;
		width: 400px;
		height: 300px;
		top: 50%;
		left: 50%;
		margin-top: -150px;
		margin-left: -200px;
		padding-top: 40px;
		border-radius: 10px;
		box-sizing: border-box;
	}
	.mdl-textfield{
		display: block;
		margin: auto;
	}
	.mdl-button{
		display: block;
		width: 100px;
		margin: 50px auto;
	}
</style>

<template>
	<div class="login mdl-shadow--2dp mdl-color--white" id="login">
		<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
		    <input class="mdl-textfield__input" type="text" id="username">
		    <label class="mdl-textfield__label" for="username">用户名</label>
		</div>
		<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
		    <input class="mdl-textfield__input" type="password" id="password">
		    <label class="mdl-textfield__label" for="password">密码</label>
		</div>
		<button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" v-on:click="go">登录</button>
	</div>
</template>

<script>
	var Login = {
		el: function(){
			return "#login"
		},
		data: function(){
			return {
				username: '',
				password: '',
				isInput: true
			}
		},
		methods: {
			go: function(){
				if (this.username == '' || this.password == ''){

				}
				this.$http.post('/wxapp/save-session', {}).then(function(){
					window.location = "/wxapp/cms";
				})
			}
		}
	}

	module.exports = Login
</script>