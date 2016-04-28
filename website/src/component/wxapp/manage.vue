<style>
	.manage-wrap{
		position: absolute;
		width: 650px;
		height: 400px;
		top: 50%;
		left: 50%;
		margin-top: -200px;
		margin-left: -325px;
	}
	.manage-wrap .mdl-checkbox{
		width: auto;
		display: inline-block;
		vertical-align: middle;
	}
	.manage-wrap ul li{
		list-style: none;
		position: relative;
	}
	.manage-wrap ul li p{
		display: inline-block;
		vertical-align: middle;
		font-size: 16px;
		margin: 0 0 0 50px;
	}
	.manage-wrap .mdl-textfield{
		padding: 23px 0 20px 0;
	}
	.manage-wrap button{
		display: block;
		margin: 0 auto;
	}
	.manage-wrap .mdl-tooltip{
		position: absolute;
		width: 100px;
		top: 40px;
		left: 615px;
		transform: scale(1);
	}
	.manage-dialog{
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -30px;
		margin-left: -65px;
		padding: 10px 30px;
		border-radius: 5px;
		text-align: center;
		font-size: 20px;
		opacity: 0;
		transform: translateY(20px);
		transition: all 0.3s ease-out;
	}
	.manage-dialog p{
		margin: 0;
	}
	.manage-dialog.show{
		opacity: 1;
		transform: translateY(0);
	}
</style>

<template>
	<div class="manage-wrap" id="manage">
		<ul>
			<li>
				<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-class">
				  <input type="checkbox" id="checkbox-class" class="mdl-checkbox__input" v-model="isCheck.cl">
				  <span class="mdl-checkbox__label">查看课表功能</span>
				</label>
				<p>设置回复关键字：</p>
				<div class="mdl-textfield mdl-js-textfield">
				    <input class="mdl-textfield__input" type="text" id="reply-class" v-model="reply.cl">
				    <label class="mdl-textfield__label" for="reply-class">课表</label>
				</div>
				<div class="mdl-tooltip" v-show="isInput.cl">请输入关键字</div>
			</li>
			<li>
				<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-homework">
				  <input type="checkbox" id="checkbox-homework" class="mdl-checkbox__input" v-model="isCheck.homework">
				  <span class="mdl-checkbox__label">查看作业功能</span>
				</label>
				<p>设置回复关键字：</p>
				<div class="mdl-textfield mdl-js-textfield">
				    <input class="mdl-textfield__input" type="text" id="reply-homework" v-model="reply.homework">
				    <label class="mdl-textfield__label" for="reply-homework">作业</label>
				</div>
				<div class="mdl-tooltip" v-show="isInput.homework">请输入关键字</div>
			</li>
			<li>
				<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-score">
				  <input type="checkbox" id="checkbox-score" class="mdl-checkbox__input" v-model="isCheck.score">
				  <span class="mdl-checkbox__label">查看成绩功能</span>
				</label>
				<p>设置回复关键字：</p>
				<div class="mdl-textfield mdl-js-textfield">
				    <input class="mdl-textfield__input" type="text" id="reply-score" v-model="reply.score">
				    <label class="mdl-textfield__label" for="reply-score">成绩</label>
				</div>
				<div class="mdl-tooltip" v-show="isInput.score">请输入关键字</div>
			</li>
		</ul>
		<button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" v-on:click="saveData">保存</button>
	</div>
	<div class="manage-dialog mdl-color--white" v-bind:class="{'show':saveStatus}">
		<p>保存成功！</p>
	</div>
</template>

<script>
	var Manage = {
		el: function(){
			return '#manage'
		},
		data: function(){
			return {
				isCheck: {
					cl: false,
					homework: false,
					score: false
				},
				reply: {
					cl: '',
					homework: '',
					score: ''
				},
				isInput: {
					cl: false,
					homework: false,
					score: false
				},
				saveStatus: false
			}
		},
		methods: {
			saveData: function(){
				if(this.checkInput('cl') && this.checkInput('homework') && this.checkInput('score')){
					this.saveStatus = true;
					function saveSuccess(obj){
						obj.saveStatus = false
					}
					function _saveSuccess(obj){
						return function(){
							saveSuccess(obj)
						}
					}
					setTimeout(_saveSuccess(this),1000)
				}
			},
			setData: function(){
				// console.log(1)
			},
			checkInput: function(tag){
				if (this.isCheck[tag] === true){
					if (this.reply[tag] != ''){
						this.isInput[tag] = false;
					}else{
						this.isInput[tag] = true;
						return false
					}
				}
				return true
			}
		}
	};

	module.exports = Manage;
</script>