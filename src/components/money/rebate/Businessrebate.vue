<template>
	<div>
		<div class="flex-wrap flex-vertical bw hf">
			<el-row  class="p-10 pb-0 boxborder" type="flex" align="middle">
					<el-col :span="6" :offset="18">
						<el-input placeholder="请输入内容" v-model="find" class="input-with-select" clearable @keyup.enter.native='search'>
							<el-button slot="append" icon="el-icon-search" @click="search">筛选</el-button>
						</el-input>
					</el-col>				
			</el-row>
			<div class="paddinglist pr flex-con">
				<el-table :data="tableData" style="width: 100%;" :cell-style="cellStyle">
					<el-table-column prop="no" label="运营商编号" width="" align="center">
					</el-table-column>
					<el-table-column prop="name" label="运营商名称" width="" align="center">
					</el-table-column>
					<el-table-column prop="levelName" label="运营商等级" width="" align="center">
					</el-table-column>
					<el-table-column prop="username" label="运营商账号" width="" align="center">
					</el-table-column>
					<el-table-column prop="contactcellphonename" label="联系人/联系电话" width="" align="center">
					</el-table-column>
					<el-table-column prop="rebates" label="返利账户余额" width="" align="center">
					</el-table-column>
					<el-table-column prop="acctypeZfbacc" label="结算账户" width="" align="center">
					</el-table-column>

					<el-table-column prop="" label="操作" width="" align="center">
						<template slot-scope="scope">
							<router-link :to="{path:'/Main/Businessdetail',query:{id:scope.row.id}}">
								<el-button type="warning" size="mini" class="btnStyle">详情</el-button>
							</router-link>
								<el-button type="warning" size="mini" class="btnStyle" 
									:disabled='scope.row.rebate!=0.00 ? false :true'
									@click="Shment(scope.$index, scope.row)" >提交结算记录</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="block page">							    
					<el-pagination						
						@current-change="handleCurrentChange"
						:current-page.sync="currentPage"
						:page-size="10"							    
						layout="total, prev, pager, next"
						:total="total">
					</el-pagination>
				</div>
			</div>
			<el-dialog title="提交结算记录" :visible.sync="dialogFormVisible" width="30%">
				<el-form :model="form">
					<el-form-item  label="" :label-width="formLabelWidths">
						<span class="font-15 fontYellow">·请在完成当月运营商返利打款结算后，添加结算记录</span>
					</el-form-item>
					<el-form-item label="运营商：" :label-width="formLabelWidth">
						{{name}}
					</el-form-item>
					<el-form-item label="返利账户余额：" :label-width="formLabelWidth">
						￥{{rebate}}
					</el-form-item>
					<el-form-item label="结算账户：" :label-width="formLabelWidth">
						{{acctypeZfbacc}}
					</el-form-item>
					<el-form-item label="结算金额：" :label-width="formLabelWidth">
						<el-input v-model="form.money" placeholder="请输入结算金额" clearable></el-input>
					</el-form-item>
					<el-form-item label="结算项说明：" :label-width="formLabelWidth">
						<el-input v-model="form.remark" placeholder="请输入内容" clearable></el-input>
					</el-form-item>
					<el-form-item label="转账单号：" :label-width="formLabelWidth">
						<el-input v-model="form.paymentno" placeholder="请输入转账单号" clearable></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="success" @click="confirmIsuse">确 定</el-button>
				</div>
			</el-dialog>						
		</div>
	</div>
</template>

<script>
	import Dialogue from '@/components/common/Dialogue'
	export default{
		data(){
			return {
				  tableData: [],
		          currentPage:1,
				  find:'',
				  total:0,
				  dialogFormVisible:false,
				  formLabelWidth: '120px',
				  formLabelWidths: '36px',
				  form:{	//结算
					paymentno:'',//转账单号
					remark:'',//结算项说明
					money:''//结算金额
				  },
				  currentId:'',
				  id:'',				  
				  name:'',//运营商
				  rebate:'',//返利账户余额
				  acctypeZfbacc:''//结算账户
			}
		},
		methods:{
		
			handleCurrentChange(val) {
			this.Ooperlist(this.currentPage,this.find);
			},
			cellStyle({row, column, rowIndex, columnIndex}){
					if(columnIndex === 5){ //指定坐标
						return 'color:#FF6600'
					}else{
						return ''
					}
		 	 },
			Shment(index,row){
				this.currentId=row.id;
				this.name=row.name;
				this.rebate=row.rebate;				
				this.acctypeZfbacc=row.acctypeZfbacc;
			 	this.Ooperlist(this.currentId,this.find);
				this.dialogFormVisible = true;
			},
			search(v) {
				this.Ooperlist(this.currentPage,this.find)
			},	
			Ooperlist(pageNo){
			var pageNo = pageNo || "";
			this.$get('operAdmin/getAll',{
				pageNo: pageNo,
				name:this.find
			}).then(data=>{
				var arr=data.datas;
				for(var i = 0, len = arr.length; i < len; i++) {
					arr[i].contactcellphonename=arr[i].contactname+"/"+arr[i].contactcellphone
					if(arr[i].acctype==0){
						arr[i].acctypes="银行卡"
					}else if(arr[i].acctype==1){
						arr[i].acctypes="支付宝"
					}
					arr[i].acctypeZfbacc=arr[i].acctypes+arr[i].Zfbacc;
					arr[i].rebates="￥"+arr[i].rebate;
				}
				this.tableData=arr;
				this.total = Number(data.totalCount);
			});
			},
			confirmIsuse() { //结算处理
				var id = this.currentId;
				var money = this.form.money;
				var paymentno =this.form.paymentno;
				var remark =this.form.remark;
				this.$post('operExtract/add', {
					id: id,
					money:money,
					paymentno:paymentno,
					remark:remark
				}).then(data => {
					this.dialogFormVisible = false;
					this.$ye();
					this.Ooperlist(this.currentPage, this.find)
				})
			},
			canceluse() { //取消或者关闭
				this.dialogFormVisible = false;
			}
		},
		mounted(){
		this.Ooperlist(1,this.find);
		},
		components:{
			Dialogue
     	}
	}
</script>

<style scoped>
	
</style>