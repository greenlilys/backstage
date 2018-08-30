<template>
	<div>
		<div class="hf headBox">
							<el-row class="font-18 mb-10">
								<el-col :span="6">
									<span class="fontYellow">运营商等级设置</span>
								</el-col>														
							</el-row>
							
							<template>
								<el-table :data="tableData" style="width:100%;">									
									<el-table-column label="运营商等级" width='' align="center">
										<template slot-scope="scope">
											<el-input v-model="scope.row.name" required="required" placeholder="请输入内容" ></el-input>
										</template>
									</el-table-column>
									<el-table-column label="代理费用（￥）" width="" align="center">
										<template slot-scope="scope">
											<el-input v-model="scope.row.agencyfee" required="required" placeholder="请输入内容"></el-input>
										</template>
									</el-table-column>
									<el-table-column prop="ratio" label="网点营收分润（%）" width="" align="center">
										<template slot-scope="scope">
											<el-input v-model="scope.row.ratio" required="required" placeholder="请输入内容"></el-input>
										</template>
									</el-table-column>
									
									<el-table-column prop="action" label="操作" width="" align="center">										
									    <template slot-scope="scope">
											<el-button type="warning" size="mini" class="btnStyle"  @click="deleteRow(scope.$index, scope.row)">删除</el-button>	       
									    </template>
									</el-table-column>
								</el-table>
							</template>
							<el-row class="mt-20">
								<el-col :span="6">
									<el-button type="success" size="small" @click="addOperLevel">+&nbsp;添加运营商级别</el-button>
									<el-button type="success" size="small" @click="submitForm">保&nbsp;&nbsp;&nbsp;&nbsp;存</el-button>
								</el-col>
							</el-row>
							
		</div>
		
	</div>
</template>

<script>
	import Dialogue from '@/components/common/Dialogue'
	export default {
		data() {
			return {
				 tableData: []

			};
		},
		methods: {
			getOperLevellist(){//获取列表
				this.$get('operLevel/getAll',{
					
				}).then(data=>{
					this.tableData = data;
				})
			},
			deleteRow(index,row){//删除
				row.type = "del";	
				this.submitForm();
			},		
			addOperLevel(){//添加
				let obj = {
					id:'',
					name:'',
					ratio:'',
					agencyfee:'',
					type:'add'
				}
				this.tableData.push(obj);
			},
			submitForm(){//保存
				
				let arr = JSON.stringify(this.tableData);
				console.log(arr);
				this.$post('operLevel/add',{
					level:arr
				}).then(data=>{
					this.$ye();
					this.getOperLevellist();
				})
				
			}
		},
		mounted(){
			this.getOperLevellist();
		},
		components:{
			Dialogue
		}
	}
</script>

<style scoped>
.headBox{box-sizing: border-box;}


</style>