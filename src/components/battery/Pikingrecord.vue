<template>
	<div >
		<div class="outsideBox1 flex-wrap flex-vertical">
			<div class="head contentBox">
				<h1 class="font-20 tc">平台电池配货总量</h1>
				<div class="flex-wrap flex-horizontal flex-justify-around">
					<div><p class="font-18 tc">60v20A</p><p class="fontYellow font-20 tc">580组</p></div>
					<div><p class="font-18 tc">70v20A</p><p class="fontYellow font-20 tc">370组</p></div>
				</div>			
			</div>
			
			<div class="bw flex-con mt-10 pr contentBox">
				<template>
								<el-table :data="tableData" style="width: 100%;">
									<el-table-column prop="date" label="运营商编号" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="运营商名称" width="" align="center">
									</el-table-column>
									<el-table-column prop="name" label="运营商账号" width="" align="center">
									</el-table-column>
									<el-table-column prop="address" label="配货数量" width="400" align="center">
									</el-table-column>
									<el-table-column prop="name" label="配货成本" width="" align="center">
									</el-table-column>									
									<el-table-column prop="action" label="操作" width="" align="center">										
									    <template slot-scope="scope">										
											<el-button type="primary" size="mini" class="btnStyle" @click="">详情</el-button>							    								         
																			    								         
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
    name: '',
    data(){
      return{
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
			currentPage1:1
      }
    },
    methods:{
     	 handleSizeChange(val) {
	        console.log(`每页 ${val} 条`);
	      },
	      handleCurrentChange(val) {
	        console.log(`当前页: ${val}`);
	      }
    },
    components:{
    	
    }
  }

</script>
<style scope>
	.head .flex-wrap{width:30%;margin:10px auto 0;}
	
</style>