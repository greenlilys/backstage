<template>
	<div>

		<div class="flex-wrap flex-vertical">
			<div class="flex-wrap flex-horizontal flex-justify-between joindetail">
				<div class="joinHead">
					<h1 class="fonttitle">店铺加盟申请</h1>
					<p>申请时间：{{tableData.addTime}}</p>
					<p>店铺状态：<span class="fontYellow">{{tableData.auditstatuss}}</span></p>
					<p>保证金：{{tableData.ispayfees}}</p>
					<!--<div>未通过原因：<span class="fontYellow mr-20">营业执照已过期</span><span>操作时间：2017-08-01 14:50</span></div>-->
					<div v-if="tableData.auditstatus==2 && tableData.ispayfee==1">
						<p>支付方式：{{tableData.paymodeno}}</p>
						<p>支付保证金：¥{{tableData.platbond}}</p>
						<p>支付配货成本：¥{{tableData.costdistribute}}</p>
						<p>选配电池：{{tableData.Inventorydistribution}}</p>
					</div>
					<div v-if="tableData.auditstatus==1">
						<p>未通过原因：<span class="fontYellow">{{tableData.auditreason}}&nbsp;&nbsp;{{tableData.audittime}}</span></p>
					</div>
				</div>
				<div class="joinight" v-if="flag">
					<el-button type="success" size="small" class="mt-10" @click="handle(id)">通过审核</el-button>
					<el-button type="danger" size="small" class="mt-10" @click="handles(id)">不予通过</el-button>
				</div>
				<div class="joinight" v-if=" tableData.auditstatus==2 && tableData.isonline==0">
					<el-button type="success" size="small" class="mt-10" @click="handless(tableData.id,tableData.isonline)">店铺上线</el-button>
				</div>
				<div class="joinight" v-if=" tableData.auditstatus==2 && tableData.isonline==1">
					<router-link :to="{path:'/Main/Shopdetail',query:{ id:tableData.id}}">
						<el-button type="success" size="small" class="mt-10">店铺详情</el-button>
					</router-link>
				</div>
			</div>

			<div class="persionInfo mt-10">
				<h1 class="fonttitle">基本信息</h1>
				<p>店主姓名：{{tableData.contactname}}</p>
				<p>联系电话：{{tableData.contactcellphone}}</p>
				<p>身份证号码：</p>
				<div class="shenfen">
					<img :src="tableData.contactID" alt="" />
				</div>
			</div>

			<div class="shopInfo mt-10">
				<h1 class="fonttitle">店铺信息</h1>
				<p>店铺名称：{{tableData.name}}</p>
				<p>店铺所在地区：{{tableData.provincename}}{{tableData.cityname}}{{tableData.countyname}}</p>
				<p>店铺详细地址：{{tableData.address}}</p>
				<p>经营范围：{{tableData.scopebusiness}}</p>
				<p>开业时间：{{tableData.opentime}}</p>
				<p>店铺经营面积：{{tableData.operatarea}}<sup>㎡</sup></p>
			</div>

			<div class="shopPhoto mt-10 flex-wrap flex-horizontal">
				<div class="flex-con">
					<p>营业执照</p>
					<div><img :src="tableData.businesslicense" alt="" /></div>
				</div>
				<div class="flex-con">
					<p>门头照片</p>
					<div><img :src="tableData.photo" alt="" /></div>
				</div>
			</div>

			<div>
				<div class="shopPhoto">
					<p>店内照片</p>
					<div class="flex-wrap flex-horizontal dianphoto">
						<div v-for="item in imgUrl" :key="item.value" :value="item.id" class="imgboxs"><img :src="item.url" alt="" /></div>
					</div>
				</div>
			</div>

			<el-dialog title="提示" :visible.sync="dialogFormVisible">
				<el-form :model="form">
					<el-form-item label="拒绝理由" :label-width="formLabelWidth">
						<el-input v-model="form.auditreason" auto-complete="off"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="canceluses()">取 消</el-button>
					<el-button type="primary" @click="Notadopt()">确 定</el-button>
				</div>
			</el-dialog>

			<Dialogue :textContent="textContent" :dialogVisible="dialogVisible" v-on:confirm="Adopt" v-on:cancel="canceluse"></Dialogue>
			<Dialogue :textContent="textContent" :dialogVisible="dialogVisibles" v-on:confirm="confirmIsonline" v-on:cancel="canceluse"></Dialogue>
		</div>
	</div>
</template>

<script>
	import Dialogue from '@/components/common/Dialogue'
	export default {
		name: '',
		data() {
			return {
				navtitle:'网点>加盟申请>加盟申请详情',
				id: '',
				nickName: '',
				tableData: '',
				imgUrl: [], //店内图片
				dialogVisible: false, //禁用启用提示框	       
				textContent: '', //提示框文本
				dialogFormVisible: false,

				form: {
					auditreason: '' //拒绝理由   
				},
				flag: false,
				formLabelWidth: '120px',
				currentStatus: '', //上线提示框
				dialogVisibles: false

			}
		},
		methods: {
			getShopApplyListDetail(id, nickName) {
				nickName = nickName || "";
				this.$get('shop/joinApplyDetail', {
					id: id,
					nickName: nickName
				}).then(data => {
					var arr = data;
					var batteryList = arr.batteryList
					arr.Inventorydistribution = "";
					if(batteryList != null) {
						for(var j = 0, lens = batteryList.length; j < lens; j++) {
							arr.Inventorydistribution += '\n';
							arr.Inventorydistribution += batteryList[j].mode + "锂电池 " + batteryList[j].distrinum + "组";
						}
					}
					//支付方式+支付单号
					if(arr.paymode == 0 && arr.paymode != null) {
						arr.paymodes = "支付宝"
					} else if(arr.paymode == 1) {
						arr.paymodes = "微信"
					} else if(arr.paymode == 2) {
						arr.paymodes = "钱包支付"
					} else {
						arr.paymodes = "平台添加"
					}
					arr.paymodeno = arr.paymodes + arr.paymentno;
					//审核状态
					if(arr.auditstatus == 0 && arr.paymode != null) {
						arr.auditstatuss = "等待审核"
						this.flag = true
					} else if(arr.auditstatus == 1) {
						arr.auditstatuss = "审核不通过"
						this.flag = false
					} else {
						arr.auditstatuss = "审核通过" + arr.audittime
						this.flag = false
					}
					//保证金
					if(arr.auditstatus == 2 && arr.paymode != null) {
						if(arr.ispayfee == 0) {
							arr.ispayfees = "未支付"
						} else {
							arr.ispayfees = "已支付"
						}
					} else {
						arr.ispayfees = "通过审核后可支付"
					}
					this.tableData = arr;
					this.imgUrl = arr.imgList;
				})
			},
			getParams() {
				var routerParams = this.$route.query.id
				this.id = routerParams
			},
			handle(id) {
				this.id = id;
				this.dialogVisible = true;
				this.textContent = "通过网点的申请";
			},
			handles(id) {
				this.id = id;
				this.dialogFormVisible = true;
			},
			handless(id, isonline) { //上下线按钮	  
				console.log(isonline)
				this.currentStatus = isonline;
				this.currentId = id;
				this.dialogVisibles = true;
				this.textContent = isonline == 0 ? "确认上线该网点吗？" : "确认下线该网点吗？"
			},
			Adopt() {
				this.$post('shop/examineOk', {
					id: this.id
				}).then(data => {
					this.dialogVisible = false;
					this.flag = false;
					this.$ye();
					this.getParams();
					this.getShopApplyListDetail(this.id, this.nickName);
				})
			},
			Notadopt() {
				console.log(8888)
				this.$post('shop/examineNo', {
					id: this.id,
					auditreason: this.form.auditreason
				}).then(data => {
					this.dialogFormVisible = false;
					this.flag = false;
					this.$ye();
					this.getParams()
					this.getShopApplyListDetail(this.id, this.nickName)
				})
			},
			confirmIsonline() { //确认上下线			
				console.log(8888)
				var online = this.currentStatus == 0 ? 1 : 0;
				var id = this.currentId;
				this.$post('shop/updateShopOnline', {
					id: id,
					isonline: online
				}).then(data => {
					this.dialogVisibles = false;
					this.$ye();
					this.getShopApplyListDetail(this.id, this.nickName)
				})
			},
			canceluse() { //取消或者关闭
				this.dialogVisibles = false;
			}
		},

		mounted() {
			this.getParams();
			this.getShopApplyListDetail(this.id, this.nickName);
			this.$sendTitle(this.navtitle);
		},
		components: {
			Dialogue
		},
		watch: {
			'$route': 'getParams'
		}
	}
</script>

<style scoped>
	.joindetail,
	.persionInfo,
	.shopInfo,
	.shopPhoto {
		background: #fff;
		padding: 10px 20px;
	}
	
	p {
		line-height: 22px;
		font-size: 14px;
	}
	
	h1.fontYellow {
		line-height: 26px;
	}
	
	.joinight {
		width: 20%;
	}
	
	.joinight .fontYellow {
		text-align: justify;
	}
	
	.shopPhoto img,
	.shenfen img {
		display: block;
		width: auto;
		height: 240px;
		margin-top: 10px;
	}
	
	.dianphoto {
		flex-wrap: wrap;
	}
	
	.imgboxs {
		margin-right: 10px;
	}
</style>