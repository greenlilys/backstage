<template>
	<div>
	<div class="hf flex-wrap flex-vertical">
		<el-row class="p-10 bw pb-0" type="flex" align="middle">
			<el-col :span="6">
				<span class="font-14">上线状态：</span>
				<template>
					<el-radio-group v-model="radio1" @change="handleRedio1">
						<el-radio label="">全部</el-radio>
						<el-radio label="1">已上线</el-radio>
						<el-radio label="0">未上线</el-radio>				
					</el-radio-group>	
				</template>
			</el-col>

			<el-col :span="6">
				<div>
					<el-input placeholder="请输入内容" v-model="nickName" class="input-with-select" clearable>
						<el-button slot="append" icon="el-icon-search" @click="search">搜索</el-button>
					</el-input>
				</div>
			</el-col>

			<el-col :span="6" :offset="6" style="text-align:right;">
				<router-link to='/Main/Addshop'>
					<el-button type="success" size="medium">+&nbsp;添加网点</el-button>
				</router-link>
				
				
			</el-col>
		</el-row>
		
		<el-row class="flex-con bw pr paddinglist">
				<el-col >			
							<template>
								<el-table :data="tableData" style="width: 100%;">
									<el-table-column prop="no" label="店铺编号" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="店铺名称" width="130" align="center">
									</el-table-column>
									<el-table-column prop="username" label="店铺账号" width="160" align="center">
									</el-table-column>
									<el-table-column prop="statuss" label="账号状态" width="" align="center">
									</el-table-column>
									<el-table-column prop="addresss" label="店铺地址" width="300" align="center">
									</el-table-column>
									<el-table-column prop="contactnameiphone" label="联系人"  width="170" align="center">
									</el-table-column>
									<el-table-column prop="operatorNo" label="所属运营商" width="" align="center">
									</el-table-column>

									<el-table-column label="库存/配货" width="120" align="center">
										<template slot-scope="scope">						
											<div v-for="item in scope.row.batterysd">{{item}}</div>
										</template>
									</el-table-column>
									<el-table-column prop="platbond" label="保证金" width="" align="center">
									</el-table-column>
									<el-table-column prop="isonlines" label="上线状态" width="" align="center">
									</el-table-column>
									<el-table-column prop="action" label="操作" width="250" align="center">
										<template slot-scope="scope">
													<router-link :to="{path:'/Main/Shopdetail',query:{ id:scope.row.id}}">
														<el-button type="warning" size="mini" class="btnStyle">详情</el-button>
													</router-link>			
												<el-button type="warning" size="mini" class="btnStyle" @click="handle(scope.$index, scope.row)" >{{scope.row.status == 0 ? nouse : canuse}}</el-button>
												<el-button type="warning" size="mini" class="btnStyle" @click="handles(scope.$index, scope.row)" >{{scope.row.isonline == 0 ? goonline : downline}}</el-button>									    								         
										</template>
									</el-table-column>
								</el-table>
							</template>
							<template>
								<div class="block page">							    
							    <el-pagination							      
							      @current-change="handleCurrentChange"							     
							      :current-page.sync="currentPage"
							      :page-size="10"							    
							      layout="total, prev, pager, next"
							      :total="total">
							    </el-pagination>
							 	 </div>
							</template>
						</el-col>
				</el-row>					
				<Dialogue :textContent="textContent" :dialogVisible="dialogVisible" v-on:confirm="confirmIsuse" v-on:cancel="canceluse"></Dialogue>
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
			navtitle:'网点>网点列表',
			radio1: '',
			nickName: '',
			tableData: [],
			currentPage: 1,
			total: 0,
			dialogVisible: false, //禁用启用提示框	
			dialogVisibles: false, //上线提示框       
			textContent: '', //提示框文本
			currentStatus: '', //当前禁用启用状态 0 或 1
			currentOnline: '', //当前上线下线状态 0 或 1
			currentId: '', //当前网点id
			nouse: '禁用',
			canuse: "启用",
			goonline: '网点上线',
			downline: '网点下线'
			
			
		}
	},
	methods: {	
		handleCurrentChange(v) {			
			this.getShopList({pageNo:v})
		},
		getShopList({pageNo=1,radio1=this.radio1,nickName=this.nickName}={}) {			
			this.$get('shop/shopList', {
				pageNo: pageNo,
				isOnline: radio1,
				nickName: nickName
			}).then(data => {
				var arr = data.datas;				
				for(var i = 0, len = arr.length; i < len; i++) {
					//店铺地址
					arr[i].addresss = arr[i].provincename + arr[i].cityname + arr[i].countyname + arr[i].address;
					//联系人
					arr[i].contactnameiphone = arr[i].contactname + arr[i].contactcellphone;

					//帐号状态
					if(arr[i].status == 0) {
						arr[i].statuss = "已启用"
					} else {
						arr[i].statuss = "已禁用"
					}
					if(arr[i].battery){
							if(arr[i].battery.includes(';')){
								arr[i].batterysd = arr[i].battery.split(';');
							}else{
								arr[i].batterysd = [];
								arr[i].batterysd.push(arr[i].battery);
							}
						}else{
							arr[i].batterysd = [];
						}
					//上线状态
					if(arr[i].isonline == 1) {
						arr[i].isonlines = "已上线"
					} else {
						arr[i].isonlines = "未上线"
					}
					//所属运营商
					if(arr[i].operatorNo == null || arr[i].operatorNo == "") {
						arr[i].operatorNo = "--";
					}
				}
				this.tableData = arr;
				this.total = Number(data.totalCount);
			})
		},
		
		handleRedio1() {//筛选上线状态			
			this.getShopList();
			this.currentPage = 1;
		},
		search() {			
			if(this.nickName){
				this.getShopList();
				this.currentPage = 1;
			}else{
				this.$fail('请输入搜索内容');
			}			
			
		},
		handle(index, row) { //禁用启用按钮	      	
			this.currentStatus = row.status;
			this.currentId = row.userid;
			this.dialogVisible = true;
			this.textContent = row.status == 0 ? "确认禁用该网点吗？" : "确认启用该网点吗？"
		},
		handles(index, row) { //上下线按钮	      	
			this.currentOnline = row.isonline;
			this.currentId = row.id;
			this.dialogVisibles = true;
			this.textContent = row.isonline == 0 ? "确认上线该网点吗？" : "确认下线该网点吗？"

		},
		confirmIsuse() { //确认禁用或者启用
			var status = this.currentStatus == 0 ? 1 : 0;
			var userId = this.currentId;
			this.$post('shop/updateShopUser', {
				userId: userId,
				state: status
			}).then(data => {
				this.dialogVisible = false;
				this.$ye();
				this.getShopList(1, this.radio1, this.nickName)
			})
		},
		confirmIsonline() { //确认上下线
			var online = this.currentOnline == 0 ? 1 : 0;
			var id = this.currentId;
			this.$post('shop/updateShopOnline', {
				id: id,
				isonline: online
			}).then(data => {
				this.dialogVisibles = false;
				this.$ye();
				this.getShopList(1, this.radio1, this.nickName);
			})
		},
		canceluse() { //取消或者关闭
			this.dialogVisible = false;
			this.dialogVisibles = false;
		}
		},
		
		mounted() {
			this.getShopList();
			this.$sendTitle(this.navtitle);
		},
		components: {
			Dialogue
		}
}
</script>

<style scoped>	
	.contentBox{position:relative;}	
	.el-table div.cell{padding:0;}
	.el-button+.el-button{margin-left:0;}
</style>