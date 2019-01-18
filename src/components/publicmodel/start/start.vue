<template>
<div>
	<div class="start">
		<div class="form-group clearfix">
			<!--<label class="control-label col-md-4">星星数量:{{starNum}}分</label>-->
			<div class="col-md-8">
				<div class="grade-box">
					<img v-for="(star,index) in stars" v-bind:src="star.src" v-on:click="rating(index)" alt="星星图片" />
				</div>
				<div v-if="starNum>0" :class="evaluationContent == '一般' || evaluationContent == '好' ? 'active' : ''">{{evaluationContent}}</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
	import starOffImg from './startlose.png'
	import starOnImg from './starts.png'
	export default {
		name: 'start',
		data () {
			return {
				starOffImg,
				starOnImg,
				stars: [{
						src: starOffImg,
						active: false
					}, {
						src:starOffImg,
						active: false
					}, {
						src: starOffImg,
						active: false
					},
					{
						src: starOffImg,
						active: false
					}, {
						src: starOffImg,
						active: false
					}
				],
				starNum: 0,
			}
		},
		props:{
			evaluationOne:Array,
			evaluationTwo:Array,
			evaluationThree:Array
		},
		methods: {
			//评分
			rating: function(index) {
				console.log(this.evaluationOne)
				if(this.evaluationOne){
					if(this.evaluationOne[1]=='evaluationOne'){
						index=this.evaluationOne[0]-1
					}
				}
				if(this.evaluationTwo){
					if(this.evaluationTwo[1]=='evaluationTwo'){
						index=this.evaluationTwo[0]-1
					}
				}
				if(this.evaluationThree){
					if(this.evaluationThree[1]=='evaluationThree'){
						index=this.evaluationThree[0]-1
					}
				}
				var total = this.stars.length; //星星总数
				var idx = index + 1; //这代表选的第idx颗星-也代表应该显示的星星数量

				//进入if说明页面为初始状态
				if(this.starNum == 0) {
					this.starNum = idx;
					for(var i = 0; i < idx; i++) {
						this.stars[i].src = starOnImg;
						this.stars[i].active = true;
					}
					this.$emit('numChange', this.starNum)
				} else {
					//如果再次点击当前选中的星级-仅取消掉当前星级，保留之前的。
					if(idx == this.starNum) {
						for(var i = index; i < total; i++) {
							this.stars[i].src = starOffImg;
							this.stars[i].active = false;
						}
					}
					//如果小于当前最高星级，则直接保留当前星级
					if(idx < this.starNum) {
						for(var i = idx; i < this.starNum; i++) {
							this.stars[i].src = starOffImg;
							this.stars[i].active = false;
						}
					}
					//如果大于当前星级，则直接选到该星级
					if(idx > this.starNum) {
						for(var i = 0; i < idx; i++) {
							this.stars[i].src = starOnImg;
							this.stars[i].active = true;
						}
					}

					var count = 0; //计数器-统计当前有几颗星
					for(var i = 0; i < total; i++) {
						if(this.stars[i].active) {
							count++;
						}
					}
					this.starNum = count;
					this.$emit('numChange', this.starNum)
				}
			}
		},
		mounted(){
			this.rating()
		},
		computed: {
			evaluationContent() {
				if(this.starNum <= 2) {
					return `差`
				} else if(this.starNum == 3) {
					return `一般`
				} else if(this.starNum > 3) {
					return `好`
				}
			}
		}
	}
</script>

<style scoped>
			.col-md-8 {
				display: flex;
				align-items: center;
		    width: 4rem;
			}
			.active {
				color: #49BBFF;
			}
			.grade-box {
		    display: flex;
    		align-items: center;
			}
			.grade-box>img {
				width: .3rem;
				height: .3rem;
				margin-right: .25rem;
			}
</style>