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
		left: 30px;
	}
	.message-wrap ul{
		-webkit-padding-start: 0px;
		margin-top: 20px;
	}
	.message-wrap ul li{
		display: inline-block;
		margin: 10px 30px;
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
		padding: 0 30px;
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
				    <input class="mdl-textfield__input" type="text" v-bind:id="'reply' + $index">
				    <label class="mdl-textfield__label" v-bind:for="'reply' + $index">{{item.name}}</label>
				</div>
				<span class="mdl-color-text--grey-700" v-bind:id="'classify-save-' + $index"><i class="material-icons">save</i></span>
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
							  	<li class="mdl-menu__item mdl-menu__item--full-bleed-divider">课程1</li>
							  	<li class="mdl-menu__item mdl-menu__item--full-bleed-divider">课程2</li>
							  	<li class="mdl-menu__item mdl-menu__item--full-bleed-divider">课程3</li>
							  	<li class="mdl-menu__item mdl-menu__item--full-bleed-divider">课程4</li>
							</ul>
					    </th>
				    </tr>
			  	</thead>
			  	<tbody>
			    	<tr>
			      		<td class="mdl-data-table__cell--non-numeric">小明</td>
			      		<td class="mdl-data-table__cell--non-numeric">12108080</td>
			      		<td class="mdl-data-table__cell--non-numeric">老师好！老师好！老师好！老师好！老师好！老师好！老师好！老师好！老师好！老师好！老师好！老师好！老师好！老师好！老师好！老师好!</td>
			      		<td class="mdl-data-table__cell--non-numeric">闲聊</td>
			    	</tr>
			    	<tr>
			      		<td class="mdl-data-table__cell--non-numeric">小明</td>
			      		<td class="mdl-data-table__cell--non-numeric">12108080</td>
			      		<td class="mdl-data-table__cell--non-numeric">老师好！老师好！老师好！老师好！老师好！老师好！老师好！老师好！老师好！老师好！老师好！老师好！老师好！老师好！老师好！老师好！</td>
			      		<td class="mdl-data-table__cell--non-numeric">闲聊</td>
			    	</tr>
			    	<tr>
			      		<td class="mdl-data-table__cell--non-numeric">小明</td>
			      		<td class="mdl-data-table__cell--non-numeric">12108080</td>
			      		<td class="mdl-data-table__cell--non-numeric">老师好！老师好！老师好！老师好！老师好！老师好！老师好！老师好！老师好！老师好！老师好！老师好！老师好！老师好！老师好！老师好！</td>
			      		<td class="mdl-data-table__cell--non-numeric">闲聊</td>
			    	</tr>
			  	</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	var testData = [{name: "课程1"},{name: "课程2"}]
	var Message = {
		el: function(){
			return '#message'
		},
		data: function(){
			return {
				classifyList: testData
			}
		},
		methods: {
			addClassify: function(){
				testData.push({name: "课程3"});
				this.$nextTick(componentHandler.upgradeAllRegistered)
			},
			saveClassify: function(){},
			deleteClassify: function(index){
				testData.splice(index, 1)
				console.log(index)
			}
		}
	}

	module.exports = Message;
</script>