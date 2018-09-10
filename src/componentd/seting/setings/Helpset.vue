<template>
	<div>
			<el-form ref="form" :model="form" label-width="174px"  class="hf flex-wrap flex-vertical">
				<el-row>
					<el-col :span="9">							
							<h5 class="fonttitle flex-wrap flex-horizontal flex-align-center"><div class="pr-10">救援价格</div><span class="flex-con"></span></h5>
							<el-form-item label="救援起步价（含1公里）：">
									<el-input v-model="form.prices" placeholder=""></el-input>					
							</el-form-item>	
							<el-form-item label="单价（元/公里）：">	
									<el-input v-model="form.price" placeholder=""></el-input>
							</el-form-item>
							<el-form-item label="平台分润（小数）：">
									<el-input v-model="form.profit" placeholder=""></el-input>						
							</el-form-item>
							<el-form-item label="">
								<template slot-scope="scope">
									<el-button type="success" size="small" @click="submitForm(scope.$index, scope.row)">保&nbsp;&nbsp;&nbsp;&nbsp;存</el-button>
								</template>				
							</el-form-item>	
					</el-col>
				</el-row>
				<el-row class="mt-10 flex-con">
					<el-col :span="9">							
							<h5 class="fonttitle flex-wrap flex-horizontal flex-align-center"><div class="pr-10">救援维修项</div><span class="flex-con"></span></h5>
							<el-form-item label="">
									<el-table :data="tableData" border style="width: 100%;">
										<el-table-column label="救援类型" width="" align="center">
											<template slot-scope="scope">
												<el-input v-model="scope.row.types" required="required" placeholder="请输入内容" ></el-input>
											</template>
										</el-table-column>
										<el-table-column label="救援价格" width="" align="center">
											<template slot-scope="scope">
												<el-input v-model="scope.row.amount" required="required" placeholder="请输入内容" ></el-input>
											</template>
										</el-table-column>
										<el-table-column prop="" label="操作" align="center">
											<template slot-scope="scope">
												<el-button type="warning" class="btnStyle" size="mini" icon="el-icon-delete" @click="deleteRow(scope.$index, scope.row)"></el-button>
											</template>
										</el-table-column>								
									</el-table>
							</el-form-item>				
							<el-form-item label="">
								<el-button type="success"  size="small" @click="addRepair">+添加救援维修项</el-button>
								<el-button type="success" size="small" @click="editForm">保&nbsp;&nbsp;&nbsp;&nbsp;存</el-button>				
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
        tableData:[],
		id:'',
		form:{},
		prices:'',
		price:'',
		profit:''
      }
    },
    methods: {
		SettingMap(){
			this.$get('set/selectSetRepairType',{
			}).then(data=>{
				this.tableData = data.repair;	
			})
		},
		SettingMaps(){
			this.$get('set/selectSet',{
			}).then(data=>{
				this.form = data.business;	
			})
		},
		deleteRow(index,row){//删除
				row.type = "del";	
				this.editForm();
		},
		addRepair(){//添加
				let obj = {
					id:'',
					types:'',
					amount:'',
					type:'add'
				}
			this.tableData.push(obj);
		},
		submitForm(){
			this.$post('set/updateSet',{
				dateType:3,
				prices:this.form.prices,
				price:this.form.price,
				profit:this.form.profit
			}).then(data=>{
				this.SettingMaps();
				this.$ye();
			})
		},
		editForm(){
			let arr = JSON.stringify(this.tableData);
			this.$post('set/addRepairType',{
				repair:arr
			}).then(data=>{
				this.SettingMap();
				this.$ye();
			})
		},
	},
	method(){
		this.SettingMap();
		this.SettingMaps();
		},
	created(){	  	
		this.SettingMap();
		this.SettingMaps();
	}
  }
</script>
<style scoped>

</style>