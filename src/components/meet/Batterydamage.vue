<template>
	<div >
		<div class="shopList flex-wrap flex-vertical">	
		
		<el-row class="row" type="flex" align="middle">
			<el-col :span="1.5">
				<div>处理结果：</div>
				
			</el-col>
			<el-col :span="7">
				<el-checkbox-group v-model="checkList">
			    <el-checkbox label="等待审查"></el-checkbox>
			    <el-checkbox label="确认损坏"></el-checkbox>
			    <el-checkbox label="未损坏"></el-checkbox>			   
			  </el-checkbox-group>
				
			</el-col>
		</el-row>
		<div class="listDetail mt-10 flex-con">					
							<template>
								<el-table :data="tableData" style="width: 100%;">
									<el-table-column prop="date" label="预约编号" width="" align="center">
									</el-table-column>									
									<el-table-column prop="name" label="预约类型" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="预约用户" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="报损网点" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="报损时间" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="报损照片" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="审查结果" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="审查时间" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="审查人" width="" align="center">
									</el-table-column>
									<el-table-column prop="" label="操作" align="center">
									    <template slot-scope="scope">										
											<el-button type="primary" size="mini" class="btnStyle" @click="openConfirm">提交审查结果</el-button>
									    </template>
									</el-table-column>
								</el-table>
							</template>
							<template>
								<div class="block page">							    
							    <el-pagination
							      @size-change="handleSizeChange"
							      @current-change="handleCurrentChange"
							      :current-page.sync="currentPage1"
							      :page-size="8"							    
							      layout="total, prev, pager, next"
							      :total="100">
							    </el-pagination>
							 	 </div>
							</template>								
		</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				 tableData: [{
            date: '2016',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            money:50.00,
            action:'查看详情'
          }, {
            date: '2016',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄',
            money:50.00,
            action:'查看详情'
          }, {
            date: '2016',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
            money:50.00,
            action:'查看详情'
          }, {
            date: '2016',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄',
            money:50.00,
            action:'查看详情'
          }],	
		currentPage1:1,
		checkList:['等待审查']
			
			};
		},
		methods: {
			 handleSizeChange(val) {
	        console.log(`每页 ${val} 条`);
	      },
	      handleCurrentChange(val) {
	        console.log(`当前页: ${val}`);
	      },
	   
	      handleChange(value){
	      },
	      openConfirm(){
		      this.$confirm('请根据报损照片确定电池是否损坏！', '提示', {
	          confirmButtonText: '确定损坏',
	          cancelButtonText: '未损坏',
	          type: 'warning'
	        }).then(() => {
	          this.$message({
	            type: 'success',
	            message: '当前用户电池押金将被扣除，电池按售卖给该用户处理，该用户所有平台服务终止。'
	          });
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '该用户可继续租用当前电池，各网点可接受进行换电、退租等服务。'
	          });          
	        });
	      }	
		}
	}
</script>

<style scoped>
	.shopList {width: 100%;box-sizing: border-box;height:100%;}	
	.row {margin: 0;}
	.row,.listDetail{background: #fff;padding: 10px;}
	.shopList .btnReset{color:#fff;}
	.listDetail{background:#fff;position:relative;}
	
</style>