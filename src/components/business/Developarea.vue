
<template>
	
	<div class="pr-10 hf shopBox">
		<el-row class="row joinshop" type="flex" align="middle">
			<el-col :span="6">				
				<template>
					<el-select v-model="value" placeholder="请选择筛选区域" @change="getAddress">
						<el-option v-for="(item,index) in options" :key="item.provincename + item.cityname + item.countyname" 
							:label="item.provincename + ' ' +item.cityname + ' ' +item.countyname" 
							:value="index">
						</el-option>
					</el-select>
				</template>
			</el-col>

			<el-col :span="8" :offset="10">
				<div>
					<el-input placeholder="请输入内容" v-model="find" class="input-with-select">
						<el-button slot="append" icon="el-icon-search" @click="searcShop">搜索</el-button>
					</el-input>
				</div>
			</el-col>
			
		</el-row>
		
			<el-table :data="tableData" style="width: 100%;">
				<el-table-column prop="no" label="网点编号" width="100" align="center">
				</el-table-column>
				<el-table-column prop="name" label="网点名称" width="" align="center">
				</el-table-column>
				<el-table-column prop="username" label="店铺账号" width="" align="center">
				</el-table-column>
				<el-table-column prop="auditstatusd" label="账号状态" width="" align="center">
				</el-table-column>
				<el-table-column prop="addressd" label="网点地址" width="260" align="center">
				</el-table-column>
				<el-table-column prop="contactname" label="联系人" width="" align="center">
				</el-table-column>
				<el-table-column label="库存/配货" width="" align="center">
					<template slot-scope="scope">						
						<div v-for="item in scope.row.batterysd">{{item}}</div>
					</template>
				</el-table-column>
				<el-table-column prop="platbond" label="保证金（￥）" width="" align="center">
				</el-table-column>
				<el-table-column prop="isonlines" label="上线状态" width="" align="center">
				</el-table-column>
				<el-table-column prop="action" label="操作" width="" align="center">
					<template slot-scope="scope">
						<router-link :to="{path:'/Main/Shopdetail',query:{ id:scope.row.id}}">
							<el-button type="warning" size="mini" class="btnStyle">详情</el-button>
						</router-link>
						
					</template>
				</el-table-column>
			</el-table>
		
			<div class="block pages">
				<el-pagination 
					@size-change="handleSizeChange" 
					@current-change="handleCurrentChange" 
					:current-page.sync="currentPage" 
					:page-size="10" 
					layout="total, prev, pager, next" 
					:total="totalCount">
				</el-pagination>
			</div>		
	</div>	
</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
				totalCount:10,				
				find: '',
				currentPage: 1,
				value:'',
				options: [],
				provincename:'',
				cityname:'',
				countyname:''
			};
		},
		methods: {
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			getAddress(v){
				this.provincename = this.options[v].provincename;
				this.cityname = this.options[v].cityname;
				this.countyname = this.options[v].countyname;
				this.getoperAdmin({provincename:this.provincename,cityname:this.cityname,countyname:this.countyname});
			},
			searcShop(){
				this.getoperAdmin({nickName:this.find});
			},
			getoperRegion() {//运营区域
				this.$get('operRegion/getAll',{
					id:this.id
				}).then(data=>{
					this.options = data;
				})
			},
			getoperAdmin({id=this.id,nickName=this.find,provincename='',cityname='',countyname=''}={}){
				this.$get('operAdmin/getShopList',{
					id:id,
					nickName:nickName,
					provincename:provincename,
					cityname:cityname,
					countyname:countyname
				}).then(data=>{
					let tableData = data.datas;
					this.tableData = tableData;
					this.totalCount = data.totalCount;
					for(let i = 0,len = tableData.length;i<len;i++){
						if(tableData[i].battery){
							if(tableData[i].battery.includes(';')){
								tableData[i].batterysd = tableData[i].battery.split(';');
							}else{
								tableData[i].batterysd = [];
								tableData[i].batterysd.push(tableData[i].battery);
							}
						}else{
							tableData[i].batterysd = [];
						}
						switch(tableData[i].isonline){
							case 1:
							tableData[i].isonlines = "已上线";
							break;
							case 0:
							tableData[i].isonlines = "未上线";
							break;
							default:
							tableData[i].isonlines = "--";
						}
						switch(tableData[i].auditstatus){
							case 1:
							tableData[i].auditstatusd = "审核未通过";
							break;
							case 0:
							tableData[i].auditstatusd = "初始添加";
							break;
							case 2:
							tableData[i].auditstatusd = "审核通过";
							break;
							default:
							tableData[i].auditstatusd = "--";
						}
						tableData[i].addressd = tableData[i].provincename + tableData[i].cityname + tableData[i].countyname + tableData[i].address;
					}
					
				})
			}
			
		},
		mounted(){
			if(this.id){
				this.getoperRegion();
				this.getoperAdmin();
			}			
		},
		props:['id'],
		watch:{
			id:function(newVal,oldVal){			
				if(newVal){
					this.getoperRegion();
					this.getoperAdmin();
				}else{
					this.$message({
						type:'error',
						message:'id没有获取'
					})
				}
			}
		},
	}
</script>
<style scoped>
	.shopBox{padding-top:10px;box-sizing: border-box;}
	.pages{position:absolute;right:30px;bottom:20px;}
	.shopList {width: 100%;box-sizing: border-box;}	
	.joinshop {	margin:0 0;padding-bottom:10px;}	
	.joinshop .btnReset{color:#fff;}

	
</style>