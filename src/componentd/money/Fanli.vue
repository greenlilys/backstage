<template>
	<div>
		<div class="flex-wrap flex-vertical businessDetail hf v-cloak">
			<div class="flex-wrap flex-horizontal topBox">
				<div class="itemBox flex-con">
					<p class="mt-20 tc font-16">累计返利共计 </p>
					<p class="mt-20 fontYellow font-20 tc">{{total}}</p>				
				</div>
				<div class="itemBox flex-con">
					<p class="mt-20 tc font-16">返利余额 </p>
					<p class="mt-20 fontYellow font-20 tc">{{rebate}}</p>				
				</div>
			</div>
			<div class="mt-10 conBottom paddinglist flex-con flex-wrap flex-vertical">
				<div class="tabCard flex-wrap flex-horizontal">				
					<div v-for="(v,i) in tabItem" @click="changeItem(v,i)" v-bind:class="{actived : i == currentI}">{{v}}</div>
				</div>
				<div class="flex-con">
					<keep-alive>
						<component v-bind:is="current" v-on:sendTime="getTime"></component>
					</keep-alive>
				</div>
			</div>			
		</div>
	</div>
</template>

<script>
	import Fanlidetail from '@/componentd/money/Fanli/Fanlidetail'
	import FenrunRecode from '@/componentd/money/Fanli/FenrunRecode'

	export default {
		data() {
			return {
				navtitle:'资金>返利记录',
				tabItem: ['返利记录', '分润结算记录'],
				tabComponents: ['Fanlidetail', 'FenrunRecode'],
				current: 'Fanlidetail',
				currentI: '0',
				rebate:'',
				total:'',
				begin:'',
				end:''
				
			}

		},
		methods: {
			changeItem(v, i) { //选项卡切换
				this.currentI = i;
				this.current = this.tabComponents[i];
			},
			getoperExtract({begin=this.begin,end=this.end}={}) { //获取返利金额   	
				this.$get('operExtract/get', {
					begin:begin,
					end:end
				}).then(data => {
					this.rebate = data.rebate;
					this.total = data.total;
				})
			},
			getTime(v){//搜索时间改变时执行
				console.log(v);
				this.begin=v[0];
				this.end=v[1];
				this.getoperExtract();
			}
			
			
			

		},
		
		created() {
//			this.id = this.$route.query.id;
		},
		mounted() {
			this.getoperExtract();
			this.$sendTitle(this.navtitle);
		},
		components: {
			Fanlidetail,
			FenrunRecode
		}
	}
</script>

<style scoped>	
	.businessDetail .nameBox{line-height: 32px;}
	.businessDetail .topBox{height:130px;}	
	.businessDetail .rightInfo p{line-height: 22px;font-size:14px;}
	.businessDetail .itemBox{background:#fff;margin-right:10px;padding:10px 20px;}
	.businessDetail .itemBox:nth-child(2){margin-right:0;}
	.businessDetail div.itemBox:nth-child(5){margin-right:0;}		

	
</style>