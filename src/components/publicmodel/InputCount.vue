<template>
	<div class="input-count" ref="rot">
		<div class="counter-component flex-center">
			<div class="count counter-btn-left" @click="minus">
				< </div>
					<div class="counter-show">
						<input type="text" v-model="number" @keyup="fixNumber" />
					</div>
					<div class="count counter-btn-right" @click="add"> > </div>
			</div>
		</div>
</template>

<script>
	export default {
		name: 'inputCount',
		data() {
			return {
				//计数器的值
				number: this.num
			}
		},
		methods: {
			//计数器减少
			minus() {
				if(this.number <= this.min) {
					return
				} else {
					this.number--;
				}
			},
			//计数器增加
			add() {
				if(this.number >= this.max) {
					return
				} else {
					this.number++;
				}
			},
			//限制大小
			fixNumber() {
				let fix
				if(typeof this.number === "string") {
					//查找字符串输入为字符的替换为空
					fix = Number(this.number.replace(/\D/g, ''));
				} else {
					fix = this.number
				}
				//大于最大值，小于最小值都为最小值
				if(fix > this.max || fix < this.min) {
					fix = this.min
				}
				this.number = fix
			},
			//更改排放方式 横向或者纵向
			rot () {
				this.$refs.rot.style.transform = "rotate("+ this.rotate+"deg)";
			}
		},
		mounted () {
			this.rot()
		},
		props: {
			max: {
				type: Number,
				default: 5
			},
			min: {
				type: Number,
				default: 1
			},
			rotate: {
				type: Number,
				default: 0
			},
			num: {
				type: Array,
				default: function () {
					return [1]
				}
			}
		},
		//监听告知父组件值
		watch: {
			number() {
				this.$emit("on-change", this.number)
			}
		}
	}
</script>

<style scoped>
	/*flex*/
	
	.flex-center {
		/*水平垂直居中*/
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.input-count {
		height: 100%;
		transform-origin: 0.375rem 0.375rem;
		background: url('../../../static/images/Lovecar/line4@2x.png') no-repeat center;
	}
	
	.counter-component {
		vertical-align: middle;
		z-index: 10;
	}
	
	.counter-show input {
		border: none;
		border-top: 1px solid #e3e3e3;
		border-bottom: 1px solid #e3e3e3;
		height: 0.75rem;
		line-height: 0.23rem;
		width: 0.9rem;
		outline: none;
		text-align: center;
	}
	
	.count {
		width: 0.6rem;
		height: 0.75rem;
		line-height: 0.75rem;
		border: 1px solid #e3e3e3;
		text-align: center;
		background: #fff;
	}
	
	.counter-btn-left {
		border-top-left-radius: 0.3rem;
		border-bottom-left-radius: 0.3rem;
	}
	
	.counter-btn-right {
		border-top-right-radius: 0.3rem;
		border-bottom-right-radius: 0.3rem;
	}
</style>