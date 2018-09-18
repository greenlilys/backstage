<template>
	<div>
		<div class="flex-wrap flex-vertical businessDetail hf v-cloak">
			<div class="flex-wrap flex-horizontal topBox">
				<div class="infoBox">
						<div class="nameBox font-18">{{info.name}}（{{info.no}}）</div>
						<div class="rightInfo">
							<p>联系人：{{info.contactname}}&nbsp;&nbsp;联系电话：{{info.contactcellphone || '无'}}</p>								
							<p>代理商级别：{{info.levelName}}</p>
							<p>合约经营周期：{{info.signtimebegin}}&nbsp;&nbsp;至&nbsp;&nbsp;{{info.signtimeend}}</p>									
						</div>
				</div>
				
				<div class="itemBox flex-con">
					<p class="tc font-16">运营网点 </p>
					<p class="mt-20 fontYellow font-20 tc">{{info.shopCount}}</p>				
				</div>
				
				<div class="itemBox flex-con">
					<p class="tc font-16">库存</p>
					<div class="flex-wrap flex-horizontal flex-justify-around mt-20">
						<template v-for="item in batteryList">
							<div class="p-10 pb-0"><p class="tc font-16" style="white-space:nowrap;">{{item.mode}}</p><p class="tc font-20 fontYellow mt-10">{{item.distrinum}}</p></div>
						</template>									
					</div>
				</div>
				
				<div class="itemBox flex-con">
					<p class="tc font-16">返利余额</p>
					<p class="mt-20 fontYellow font-20 tc">￥{{info.rebate}}</p>				
				</div>
				
				<div class="itemBox flex-con">
					<p class="tc font-16">账号状态</p>
					<p class="mt-20 fontYellow font-14 tc">{{info.status == 0? canuse : nouse}}&nbsp;&nbsp;&nbsp;&nbsp;
						<el-button type="success" size="mini" class="font-14" @click="setUse">{{info.status == 0?  nouse: canuse}}</el-button>		
					</p>
				</div>
			</div>
			
			<div class="mt-10 conBottom paddinglist flex-con flex-wrap flex-vertical">
				<div class="tabCard flex-wrap flex-horizontal">				
					<div v-for="(v,i) in tabItem" @click="changeItem(v,i)" v-bind:class="{actived : i == currentI}">{{v}}</div>
				</div>
				<div class="flex-con">
					<keep-alive>
						<component v-bind:is="current" :id="id" :username="username" :levelid="levelid"></component>
					</keep-alive>
				</div>				
				
			</div>
			<Dialogue :textContent="textContent" :dialogVisible="dialogVisible"  v-on:confirm="confirmset" v-on:cancel="canceluse"></Dialogue>
		</div>
	</div>
</template>

<script>
	import Developarea from '@/components/business/Developarea'
	import Serviceprice from '@/components/business/Serviceprice'
	import Recordprofits from '@/components/business/Recordprofits'
	import Information from '@/components/business/Information'
	import Operatorsetting from '@/components/business/Operatorsetting'

	import Dialogue from '@/components/common/Dialogue'

	export default {
		data() {
			return {
				navtitle:'运营商>运营商列表>详情',
				tabItem: ['运营区域/网点', '服务定价', '分润记录', '信息管理', '运营设置'],
				tabComponents: ['Developarea', 'Serviceprice', 'Recordprofits', 'Information', 'Operatorsetting'],
				current: 'Developarea',
				currentI: '0',
				find: '',
				id: '',//运营商id
				info: [],
				nouse: '禁用',
				canuse: "启用",
				batteryList:[],//电池库存
				textContent: '',
				dialogVisible: false,			
				username:'',//运营商账号-传给运营商设置页面
				levelid:''//运营商当前级别ID-传给运营商设置页面
			}

		},
		methods: {
			changeItem(v, i) { //选项卡切换
				this.currentI = i;
				this.current = this.tabComponents[i];
			},
			getOperdetail({
				id = this.id
			} = {}) { //获取运营商详情	    	
				this.$get('operAdmin/getOper', {
					id: id
				}).then(data => {
					this.info = data;				
					this.username = data.username;
					this.levelid = {levelid:data.levelid};
				})
			},
			getBatteryList(){//库存列表
				this.$get('operBattery/getAll',{
					id:this.id
				}).then(data=>{
					this.batteryList = data;
				})
			},

			setUse() {
				this.textContent = this.info.status == 0 ? "确认禁用该运营商吗？" : "确认启用该运营商吗？"
				this.dialogVisible = true;
			},
			canceluse() {
				this.dialogVisible = false;
			},
			confirmset({
				id = this.id,
				status = this.info.status == 0 ? 1 : 0
			} = {}) {
				this.$post('operAdmin/updateStatus', {
					id: id,
					status: status
				}).then(data => {
					this.$ye();
					this.dialogVisible = false;
					this.getOperdetail();
				})
			}

		},
		
		created() {
			this.id = this.$route.query.id;
		},
		mounted() {
			this.getOperdetail();
			this.getBatteryList();
			this.$sendTitle(this.navtitle);
		},
		components: {
			Developarea,
			Serviceprice,
			Recordprofits,
			Information,
			Operatorsetting,
			Dialogue
		}
	}
</script>

<style scoped>	
	.businessDetail .infoBox{width:30%;background:#fff;padding:10px 20px 0;margin-right:10px;}
	.businessDetail .nameBox{line-height: 32px;}
	.businessDetail .topBox{height:130px;}	
	.businessDetail .rightInfo p{line-height: 22px;font-size:14px;}
	.businessDetail .itemBox{background:#fff;margin-right:10px;padding:10px 20px;}
	.businessDetail div.itemBox:nth-child(5){margin-right:0;}		

	
</style>