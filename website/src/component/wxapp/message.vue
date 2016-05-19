<style>
	.message-wrap{
		position: relative;
		display: block;
		width: 80%;
		margin: 0 auto;
		padding-top: 5px;
	}
	#add-reply{
		position: absolute;
		top: 10px;
		left: 0px;
	}
	.message-wrap ul{
		-webkit-padding-start: 0px;
		margin-top: 20px;
	}
	.message-wrap ul li{
		display: inline-block;
		margin: 10px 20px 10px 0;
		list-style: none;
	}
	.message-wrap ul li span{
		display: inline-block;
		vertical-align: text-top;
	}
	.message-wrap .material-icons{
		cursor: pointer;
	}
	.message-wrap .mdl-textfield{
		width: 100px;
		margin: 0 10px 0 0;
	}
	.message-wrap .table-wrap{
		position: relative;
		display: block;
		width: 100%;
		padding: 0;
	}
	.table-wrap ul li{
		margin: 10px 20px;
	}
	.table-wrap .mdl-data-table{
		position: relative;
		table-layout:fixed;
		width: 100%;
	}
	.table-wrap .mdl-data-table tr td:nth-child(1),
	.table-wrap .mdl-data-table tr th:nth-child(1){
		width: 10%;
	}
	.table-wrap .mdl-data-table tr td:nth-child(2),
	.table-wrap .mdl-data-table tr th:nth-child(2){
		width: 10%;
	}
	.table-wrap .mdl-data-table tr td:nth-child(3),
	.table-wrap .mdl-data-table tr th:nth-child(3){
		width: 60%;
		white-space: normal;
		word-wrap:break-word;
	}
</style>

<template>
	<div class="message-wrap" id="message">
		<button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab" id="add-reply" v-on:click="addClassify"><i class="material-icons">add</i></button>
		<div class="mdl-tooltip" for="add-reply">添加分类</div>
		<ul>
			<li v-for="item in classifyList">
				<span>设置回复前缀：</span>
				<div class="mdl-textfield mdl-js-textfield">
				    <input class="mdl-textfield__input" type="text" v-bind:id="'reply' + $index" v-model="item.name">
				    <label class="mdl-textfield__label" v-bind:for="'reply' + $index">{{item.name}}</label>
				</div>
				<span class="mdl-color-text--grey-700" v-on:click="saveClassify($index)"><i class="material-icons" v-bind:id="'classify-save-' + $index">save</i></span>
				<span class="mdl-color-text--grey-700" v-on:click="deleteClassify($index)"><i class="material-icons" v-bind:id="'classify-delete-' + $index">delete</i></span>
				<div class="mdl-tooltip" v-bind:for="'classify-save-' + $index">保存</div>
				<div class="mdl-tooltip" v-bind:for="'classify-delete-' + $index">删除</div>
			</li>
		</ul>
		<div class="table-wrap">
			<table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
				<thead>
			    	<tr>
			      		<th class="mdl-data-table__cell--non-numeric">姓名</th>
					    <th class="mdl-data-table__cell--non-numeric">学号</th>
					    <th class="mdl-data-table__cell--non-numeric">回复内容</th>
					    <th class="mdl-data-table__cell--non-numeric">
					    	<span>分类</span>
					    	<button id="demo-menu-lower-right" class="mdl-button mdl-js-button mdl-button--icon">
								<i class="material-icons">keyboard_arrow_down</i>
							</button>
							<ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="demo-menu-lower-right">
							  	<li class="mdl-menu__item mdl-menu__item--full-bleed-divider" v-on:click="getMessage('all')">全部</li>
							  	<li class="mdl-menu__item mdl-menu__item--full-bleed-divider" v-for="item in classifyList" v-on:click="getMessage(item.name)">{{item.name}}</li>
							</ul>
					    </th>
				    </tr>
			  	</thead>
			  	<tbody>
			    	<tr v-for="item in messages">
			      		<td class="mdl-data-table__cell--non-numeric">{{item.name}}</td>
			      		<td class="mdl-data-table__cell--non-numeric">{{item.schoolNum}}</td>
			      		<td class="mdl-data-table__cell--non-numeric">{{item.content}}</td>
			      		<td class="mdl-data-table__cell--non-numeric">{{item.classify}}</td>
			    	</tr>
			  	</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	var Message = {
		el: function(){
			return '#message'
		},
		data: function(){
			return {
				classifyList: [],
				messages: []
			}
		},
		methods: {
			addClassify: function(){
				this.classifyList.push({name: "课程3"});
				this.$nextTick(componentHandler.upgradeAllRegistered);
			},
			saveClassify: function(){
				var data = {
					key: []
				};
				var length = this.classifyList.length;
				for (var i = 0; i < length; i++){
					data.key.push(this.classifyList[i].name)
				}
				this.$http.post('/wxdata/save-reply-key', {data:data})
						  .then(function(result){
						  	if(result.ok){
						  		console.log("success")
						  	}
						  })
			},
			deleteClassify: function(index){
				this.classifyList.splice(index, 1)
				this.saveClassify();
			},
			getClassify: function(callback){
				this.$http.get('/wxdata/get-reply-key').then(function(result){
					if(result.data.length > 0){
						var data = result.data[0].replyKey;
						callback(data)
					}else{
						this.setClassify(["课程1"])
					}
				})
			},
			setClassify: function(data){
				for (var i = 0; i < data.length; i++){
					this.classifyList.push({name: data[i]})
				}
				this.$nextTick(componentHandler.upgradeAllRegistered)
			},
			getMessage: function(classify){
				var data = {
					classify: classify
				},
				self = this;

				self.$http.get('/wxdata/get-reply-info', {data: data}).then(function(result){
					self.messages = result.data;
				})
			}
		},
		route: {
			activate: function(){
				var self = this;
				self.getClassify(self.setClassify);
				self.getMessage("all")
			}
		}
	}
	module.exports = Message;
</script>