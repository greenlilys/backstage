<template>
	<div class="helpset">
			<el-form ref="form" :model="form" label-width="0" class="hf flex-wrap flex-vertical">
				<el-row class="mt-10 contentBox  flex-con">
					<el-col :span="12">
							<h5 class="fonttitle flex-wrap flex-horizontal flex-align-center"><div class="pr-10">电池报损项(电池损坏默认扣减对应产品的全额押金)</div><span class="flex-con"></span></h5>
							<el-form-item label="" class="mar-top">
									<el-table :data="batteRyreport" border style="width: 100%;">
										<el-table-column label="报损项" width="" align="center">
											<template slot-scope="scope">
												<el-input v-model="scope.row.name" required="required" placeholder="请输入内容" ></el-input>
											</template>
										</el-table-column>
                                       <el-table-column label="电池型号" width="" align="center">
											<template slot-scope="scope">
                                                <el-select v-model="scope.row.batteryid" placeholder="请选择">
                                                    <el-option v-for="item in tableData" :key="item.id" :label="item.mode" :value="item.id"></el-option>
                                                </el-select>
                                            </template>
										</el-table-column>
                                        <el-table-column label="赔偿金额(元)" width="" align="center">
											<template slot-scope="scope">
												<el-input v-model="scope.row.amount" required="required" placeholder="请输入内容" ></el-input>
                                                <el-input v-model="scope.row.types" v-show="false" required="required" value='0'></el-input>
											</template>
										</el-table-column>
										<el-table-column prop="" label="操作" align="center">
											<template slot-scope="scope">
												<el-button type="warning" class="btnStyle" size="mini" icon="el-icon-delete" @click="deleteRows(scope.$index, scope.row)"></el-button>
											</template>
										</el-table-column>								
									</el-table>
							</el-form-item>				
							<el-form-item label="">
								<el-button type="success"  size="small" @click="addRepair">+添加报损项</el-button>	
                                <el-button type="success" size="small" @click="editForms">保&nbsp;&nbsp;&nbsp;&nbsp;存</el-button>	
							</el-form-item>
							
							<h5 class="fonttitle flex-wrap flex-horizontal flex-align-center"><div class="pr-10">电动车报损项(电池损坏默认扣减对应产品的全额押金)</div><span class="flex-con"></span></h5>
							<el-form-item label="" class="mar-top">
									<el-table :data="tramReport" border style="width: 100%;">
										<el-table-column label="报损项" width="" align="center">
											<template slot-scope="scope">
												<el-input v-model="scope.row.name" required="required" placeholder="请输入内容" ></el-input>
											</template>
										</el-table-column>
                                        <el-table-column label="电车型号" width="" align="center">
										<template slot-scope="scope">
                                                <el-select v-model="scope.row.batteryid">
                                                    <el-option v-for="item in tableDatas" :key="item.id" :label="item.mode" :value="item.id"></el-option>
                                                </el-select>
                                            </template>
										</el-table-column>
                                        <el-table-column label="赔偿金额(元)" width="" align="center">
											<template slot-scope="scope">
												<el-input v-model="scope.row.amount" required="required" placeholder="请输入内容" ></el-input>
												<el-input v-model="scope.row.types" v-show="false" required="required" value='1'></el-input>
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
								<el-button type="success"  size="small" @click="addRepairs">+添加报损项</el-button>
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
        tableDatas:[],
        batteRyreport:[],
        tramReport:[],
        form:{}
      }
    },
    methods: {
		SettingMap(){
			this.$get('report/selectSet',{
			}).then(data=>{
                this.tableData = data.Ryreport.datas;
                this.tableDatas = data.Ryreports.datas;	
                this.batteRyreport=data.batteRyreport;
                this.tramReport =data.tramReport;     

			})
        },
        deleteRow(index,row){//删除
				row.type = "del";	
				this.editForm();
        },
        deleteRows(index,row){//删除
				row.type = "del";	
				this.editForms();
		},
		addRepair(){//添加
				let obj = {
					id:'',
					batteryid:'',
                    amount:'',
                    types:'0',
					type:'add'
				}
			this.batteRyreport.push(obj);
        },
        addRepairs(){//添加
				let obj = {
					id:'',
					batteryid:'',
                    amount:'',
                    types:'1',
					type:'add'
				}
			this.tramReport.push(obj);
		},
		editForm(){
			let arr = JSON.stringify(this.tramReport);
			this.$post('report/addRyreport',{
				ryrepor:arr
			}).then(data=>{
				this.SettingMap();
				this.$ye();
			})
        },
        editForms(){
			let arr = JSON.stringify(this.batteRyreport);
			this.$post('report/addRyreport',{
				ryrepor:arr
			}).then(data=>{
				this.SettingMap();
				this.$ye();
			})
		},
	},
	method(){
		this.SettingMap();
		},
	created(){	  	
		this.SettingMap();
	}
  }
</script>
<style scoped>
.mar-top{margin-top: 10px }
</style>