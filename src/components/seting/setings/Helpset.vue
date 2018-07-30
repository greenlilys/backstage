<template>
	<div class="helpset">
			<el-form ref="form" :model="form" label-width="200px">
				<el-row class="contentBox">
					<el-col :span="10">
							<el-form-item label="救援价格：">												
							</el-form-item>
							<el-form-item label="救援起步价（含1公里）：">
								<el-input v-model="form.name" placeholder="555"></el-input>						
							</el-form-item>	
							<el-form-item label="单价（元/公里）：">
								<el-input v-model="form.name" placeholder="555"></el-input>						
							</el-form-item>
							<el-form-item label="平台分润（元）：">
								<el-input v-model="form.name" placeholder="555"></el-input>						
							</el-form-item>
							<el-form-item label="">
								<el-button type="primary" class="btnStyle" @click="submitForm('ruleForm2')">保存</el-button>				
							</el-form-item>	
					</el-col>
				</el-row>
				<el-row class="mt-10 contentBox">
					<el-col :span="10">
							<el-form-item label="救援维修项：">												
							</el-form-item>
							<el-form-item label="">
								<el-table :data="tableData" border style="width: 100%;">
										<el-table-column prop="date" label="电池套餐名称" width="" align="center">
										</el-table-column>
										<el-table-column prop="name" label="电池型号" width="" align="center">
										</el-table-column>
										<el-table-column prop="address" label="套餐电池数量" align="center">
										</el-table-column>
										<el-table-column prop="money" label="配货数量" align="center">
										</el-table-column>									
									</el-table>
							</el-form-item>	
									
							<el-form-item label="">
								<el-button type="primary" class="btnStyle" @click="submitForm('ruleForm2')">+添加救援维修项</el-button>				
							</el-form-item>	
													
					</el-col>
				</el-row>
			</el-form>
		
		
		
	</div>
</template>

<script>
	export default {
    data() {
      return {
       
        form: {
					name: '88888',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				tableData: [{
		            date: '2016-05-02',
		            name: '王小虎',
		            address: '1518 ',
		            money:50.00,
		            action:'查看详情'
		          }, {
		            date: '2016-05-04',
		            name: '王小虎',
		            address: ' 1517',
		            money:50.00,
		            action:'查看详情'
		          }]
      }
    },
    methods: {
     
    }
  }
</script>

<style scoped>

</style>