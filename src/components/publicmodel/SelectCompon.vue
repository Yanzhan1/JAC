<template>
	<div class="select-component">
		<div class="selection-show" @click="toggleDrop">
			<span> {{selected}} </span>
			<span v-if="titleState" class="title">{{title}}</span>
			<div class="arrow"></div>
		</div>
		<div class="selection-list" v-if="isDrop">
			<ul>
				<li v-for="(item,index) in selections"  :key="index" @click="chooseSelection(index, item[carryProperty])">{{ item.brandName ? item.brandName : item.seriesName}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'selectComponent',
		data() {
			return {
				isDrop: false,
				nowIndex: 0,
				titleState: true, //头部状态
			}
		},
		props: {
			//列表
			selections: {
				type: Array,
				default: [{
					label: "test",
					value: 0
				}]
			},
			//title
			title: {
				type: String
			},
			//属性
			carryProperty: {
				type: String
			},
			carryContent: {
				type: String
			}
		},  
		//你好
		methods: {
			toggleDrop() {
				this.isDrop = !this.isDrop;
			},
			chooseSelection(index, val) {

				let data = {
					index,
					val
				}
				this.nowIndex = index;
				this.isDrop = false;
				this.titleState = false;
				this.$emit('on-change', data);
			}
		},
		computed: {
			selected() {
				return (this.selections[this.nowIndex] && this.selections[this.nowIndex].brandName) || (this.selections[this.nowIndex] && this.selections[this.nowIndex].seriesName)
			}
		}
	}
</script>

<style scoped>
	.title {

	}
	
	.selection-component {
		position: relative;
		display: inline-block;
	}
	
	.selection-show {
		/*position: relative;*/
		display: inline-block;
		padding: 0 20px 0 10px;
		cursor: pointer;
		height: 100%;
		line-height: 0.84rem;
		border-radius: 3px;
		background: #fff;
	}
	.selection-show span {
		position: absolute;
		top: 0;
		left: 0;
	    width: 1.4rem;
	    height: 100%;
		background: #fff;
		text-align: center;
	}
	
	.selection-show .arrow {
		display: inline-block;
		border-left: 4px solid transparent;
		border-right: 4px solid transparent;
		border-top: 5px solid #e3e3e3;
		width: 0;
		height: 0;
		margin-top: -1px;
		margin-left: 0;
		margin-right: -14px;
		vertical-align: middle;
	}
	
	.selection-list {
		display: inline-block;
		position: absolute;
	    left: 0rem;
    	top: 0.8rem;
		background: #fff;
		border-top: 1px solid #e3e3e3;
		border-bottom: 1px solid #e3e3e3;
		z-index: 5;
	}
	
	.selection-list li {
		padding: 5px 15px 5px 10px;
		border-left: 1px solid #e3e3e3;
		border-right: 1px solid #e3e3e3;
		cursor: pointer;
		background: #fff;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.selection-list li:hover {
		background: #e3e3e3;
	}
</style>