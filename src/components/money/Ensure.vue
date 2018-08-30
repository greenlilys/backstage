<template>
	<div>
		<div class="flex-wrap flex-vertical outsideBox1">
			<div class="contentBox">
				<h1 class="font-18 tc mt-10">保证金总计</h1>
				<p class="font-20 fontYellow tc mt-10">￥<span>{{platBond.platbond}}</span></p>
			</div>
			<div class="mainlist flex-con mt-10 bw contentBox">
								<template>
									<el-table :data="platBonds" style="width: 100%;" :cell-style="cellStyle">
										<el-table-column prop="no" label="网点编号" width="" align="center">
										</el-table-column>
										<el-table-column prop="name" label="网点名称" width="" align="center">
										</el-table-column>
										<el-table-column prop="username" label="网点账号" width="" align="center">
										</el-table-column>
										<el-table-column prop="platbonds" label="保证金" width="" align="center">
										</el-table-column>
										<el-table-column prop="paytime" label="付款时间" width="" align="center">
										</el-table-column>
										<el-table-column prop="paymodes" label="支付方式" width="" align="center">
										</el-table-column>
										<el-table-column prop="paymentno" label="支付订单号" width="" align="center">
										</el-table-column>
										<el-table-column prop="signtimebegins" label="加盟有效期" width="" align="center">
										</el-table-column>
										<el-table-column prop="" label="操作" align="center">
											<template slot-scope="scope">
												<span v-if="scope.row.isreturn==1">已退款</span>										
												<span v-if="scope.row.isreturn==0"><el-button type="warning" size="mini" class="btnStyle" @click="handle(scope.$index, scope.row)" >解约退款</el-button></span>
											</template>
										</el-table-column>
																			
									</el-table>
								</template>
								<template>
									<div class="block page">							    
								    <el-pagination
								      @size-change="handleSizeChange"
								      @current-change="handleCurrentChange"
								      :current-page.sync="currentPage"
								      :page-size="10"							    
								      layout="total, prev, pager, next"
								      :total="total">
								    </el-pagination>
								 	 </div>
								</template>
			</div>
		</div>
		<Dialogue :textContent="textContent" :dialogVisible="dialogVisible" v-on:confirm="confirmIsuse" v-on:cancel="canceluse"></Dialogue>
	</div>
</template>

<script>
	import Dialogue from '@/components/common/Dialogue'

	export default{
		name: '',
		data(){
			return {
				platBonds: [],
				currentPage:1,
				total:0,
				platBond:{},
				dialogVisible: false, //解约提示框
				textContent: '' //提示框文本

			}
		},
		methods:{
		handleSizeChange(val) {
	        console.log(`每页 ${val} 条`);
		},
		cellStyle({row, column, rowIndex, columnIndex}){
					if(columnIndex === 3){ //指定坐标
						return 'color:#FF6600'
					}else{
						return ''
					}
		  },
	    handleCurrentChange(val) {
			this.platBondList(val);
		},
		handle(index, row) { //解约启用按钮	      	
			this.currentId = row.id;
			this.dialogVisible = true;
			this.textContent = "确认要解约该网点吗？"
		},
	  	platBondList(pageNo){
			var pageNo = pageNo || "";
			this.$get('capital/platBondList',{
				pageNo: pageNo
			}).then(data=>{
				var arr = data.datas;
				for(var i = 0, len = arr.length; i < len; i++) {
					arr[i].signtimebegins=arr[i].signtimebegin+"-"+arr[i].signtimeend;
					//支付方式
					if(arr[i].paymode == 0) {
						arr[i].paymodes = "支付宝"
					} else if(arr[i].paymode == 1){
						arr[i].paymodes = "微信"
					} else{
						arr[i].paymodes = "钱包支付"
					}
					arr[i].platbonds="￥"+arr[i].platbond;
				}
				this.platBonds=arr;
				this.total = Number(data.totalCount);
			});
		},
		platBondStatistics(){
			this.$get('capital/platBondStatistics',{
			}).then(data=>{
				 var ren = data;
				 this.platBond=ren;
			})
		},
		confirmIsuse() { //确认解约
			var id = this.currentId;
			this.$post('capital/updateShopPlatBond', {
				id: id
			}).then(data => {
				this.dialogVisible = false;
				this.$ye();
				this.platBondStatistics();
				this.platBondList(this.currentPage);
			})
		},
		canceluse() { //取消或者关闭
			this.dialogVisible = false;
		}
		},
		mounted(){
		this.platBondStatistics();
		this.platBondList(1);
		},
		components: {
			Dialogue
		}
	}
</script>

<style scoped>
	.mainlist{position:relative;}
</style>