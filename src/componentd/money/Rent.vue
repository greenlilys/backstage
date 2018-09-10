<template>
	<div>
		<div class="flex-wrap flex-vertical hf">
			<el-row class="p-10 boxborder bw" type="flex" align="middle">

				<div class="block">
					<span class="font-14">选择时段：&nbsp;</span>
					<el-date-picker v-model="valueTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
					</el-date-picker>
				</div>

			</el-row>

			<div class="p-10 boxborder bw mt-10">
				<p class="tc font-18">租金收入总额</p>
				<p class="tc font-20 fontYellow mt-10">
					<span v-if="renew.amount!=null||renew.reamount!=null ">￥{{renew.amount-renew.reamount}}</span></p>
				<p class="tc font-20 fontYellow mt-10">
					<span v-if="renew.amount==null||renew.reamount==null ">￥0</span></p>
			</div>

			<div class="conBottom paddinglist boxborder mt-10 flex-con">
				<div class="tabCard flex-wrap flex-horizontal">
					<div v-for="(v,i) in tabItem" @click="changeItem(v,i)" v-bind:class="{actived : i == currentI}">{{v}}</div>
				</div>

				<component v-bind:is="current" :valueTime='valueTime'></component>
			</div>
		</div>
	</div>
</template>

<script>
	import Rentrecord from '@/components/money/rent/Rentrecord'
	import Backrecord from '@/components/money/rent/Backrecord'

	export default {
		data() {
			return {
				navtitle:'资金>租金-租金纪录',
				tabItem: ['租金记录', '退租记录'],
				tabComponents: ['Rentrecord', 'Backrecord'],
				current: 'Rentrecord',
				currentI: '0',
				valueTime: [],
				renew: {},
				begin: '',
				end: ''
			}
		},
		methods: {
			changeItem(v, i) {
				this.currentI = i;
				this.current = this.tabComponents[i];
			},

			renewStatist({
				begin = this.begin,
				end = this.end
			} = {}) {
				this.$get('capital/renewStatistics', {
					begin: begin,
					end: end
				}).then(data => {
					this.renew = data;
				})
			}
		},
		mounted() {
			this.renewStatist();
			this.$sendTitle(this.navtitle);
		},
		watch: {
			valueTime(newVal, oldVal) {
				if(newVal) {
					this.renewStatist({
						begin: newVal[0],
						end: newVal[1]
					});
					this.currentPage = 1;
					this.begin = newVal[0];
					this.end = newVal[1];
				}
			}
		},

		components: {
			Rentrecord,
			Backrecord
		}
	}
</script>

<style>

</style>