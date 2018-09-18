<template>
	<div >
		<div class="boxborder hf flex-wrap flex-vertical">	
		
		<el-row class="bw p-10 boxborder" type="flex" align="middle">
			<el-col :span="6">
				 <span class="font-14">账号状态：</span>
				<template>
					<el-radio-group v-model="radio"  @change = "handleRadio">
						<el-radio label="" >全部</el-radio>
						<el-radio label="0" >启用</el-radio>
						<el-radio label="1">禁用</el-radio>				
					</el-radio-group>	
				</template>
			</el-col>

			<el-col :span="6">
				<div>
					<el-input placeholder="请输入内容" v-model="find" clearable  @clear='clear' class="input-with-select" @keyup.enter.native='screen'>
						<el-button slot="append" icon="el-icon-search" @click='screen'>筛选</el-button>
					</el-input>
				</div>
			</el-col>

		</el-row>
		<Dialogue :textContent="'您确定'+isstop+'主账号为“'+stopName+'”这个团购项目么?'" :dialogVisible="dialogVisible"  v-on:confirm="confirmIsuse" v-on:cancel="dialogVisible=false"></Dialogue>
		<div class="bw paddinglist pr mt-10 flex-con">					
							<template>
								<el-table :data="tableData" style="width: 100%;">
									<el-table-column prop="username" label="主账号" width="" align="center">
									</el-table-column>									
									<el-table-column label="联系人" width="" align="center">
										<template slot-scope="scope">
											<div slot="reference" class="name-wrapper">
												{{scope.row.contactname}}&nbsp;&nbsp;{{scope.row.contactcellphone}}
											</div>
										</template>
									</el-table-column>
									<el-table-column prop="name" label="管理团购项目" width="" align="center">
									</el-table-column>
									<el-table-column prop="addtime" label="账号创建时间" width="" align="center">
									</el-table-column>
									<el-table-column label="账号状态" width="" align="center">
										<template slot-scope="scope">
											<div slot="reference" class="name-wrapper">
												<el-tag size="medium">{{scope.row.state?'已停用':'正在使用'}}</el-tag>
											</div>
										</template>
									</el-table-column>
									<el-table-column prop="action" label="操作" align="center">
									    <template slot-scope="scope">	
											<el-button type="warning" class="btnStyle" size="mini" @click='amend(scope.row.id)'>修改</el-button>
											<el-dialog title="修改账号信息" :visible.sync="dialogFormVisible">
												<el-row type='flex' justify="center">
													<el-col :span="15">
														<el-form label-width="120px" ref="form" :model="form" :rules="rules" class="amend">
															<el-form-item label='联系人' prop="name">
																<el-input placeholder='请输入联系人名称' auto-complete="off" v-model='form.name'></el-input>
															</el-form-item>
															<el-form-item label='联系电话' prop="tel">
																<el-input placeholder='请输入联系人电话' v-model="form.tel"></el-input>
															</el-form-item>
														</el-form>
													</el-col>
												</el-row>

												<div slot="footer" class="dialog-footer">
													<el-button @click="offAmend">取 消</el-button>
													<el-button type="success" @click="submitForm('form')">修 改</el-button>
												</div>

												</el-dialog>
											<el-button type="warning" class="btnStyle" size="mini" @click='stop(scope.row.id,scope.row.username,1)' v-if='!scope.row.state'>停用</el-button>
											<el-button type="warning" class="btnStyle" size="mini" @click='stop(scope.row.id,scope.row.username,0)' v-else>启用</el-button>
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
		</div>
		</div>
	</div>
</template>

<script>
import Dialogue from '@/components/common/Dialogue'
	export default {
		data() {
			return {
				dialogVisible:false,
				dialogFormVisible: false,
				total:0,//数据数
				navtitle:'团购账号>账号管理',
				tableData: [],
				radio: '',
				find: '',
				stopName:'',
				stopId:0,
				currentPage:1,
				amendId:0,//修改的id
				currentPage:0,//当前页
				state:0,
				isstop:'停用',
				form:{
					name:'',
					tel:''
				},
				rules:{
					name: [
						{ required: true, message: '请输入联系人名称', trigger: 'blur' },
						{ min: 2, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
					],
					tel: [
						{ required: true, message: '请输入联系方式', trigger: 'blur' },
						{ min: 11, max: 11, message: '长度为11个字符', trigger: 'blur' }
					]
				}
			};
		},
		components: {
			Dialogue
		},
		methods: {
			offAmend(){
				this.dialogFormVisible=false;
				this.form.name='';
				this.form.tel='';
			},
			submitForm(formName) {
				var that=this;
				this.$refs[formName].validate((valid) => {
				if (valid) {
					that.$post('/group/update',{
						id:that.amendId,
						contactname:that.form.name,
						contactcellphone:that.form.tel
					}).then(data=>{
						that.$ye('修改成功')
						that.dialogFormVisible=false;
						that.getData(that.currentPage,that.find,that.radio);
						that.form.name='';
						that.form.tel='';
					})
				} else {
					return false;
				}
				});
			},
			amend(data){
				console.log(data)
				this.amendId=data;
				this.dialogFormVisible=true;
			},
			confirmIsuse(){
				this.$post('/group/updateState',{
					id:this.stopId,
					state:this.state
				}).then(data=>{
					this.dialogVisible=false;
					this.$message({
						type: 'success',
						message: '成功停用!'
					});
					this.getData(this.currentPage,this.find,this.radio);
				})
			},
			stop(id,name,state){
				console.log(state)
				if(state==0){
					this.isstop='启用'
				}else if(state==1){
					this.isstop='停用'
				}
				this.stopName=name;
				this.dialogVisible=true;
				this.stopId=id;
				this.state=state
			},
	      handleCurrentChange(val) {
			  	this.currentPage=val;
					this.getData(val,this.find,this.radio);
				},
				clear(){
			  this.getData(1,this.find,this.radio);
		  	},
				//   筛选
				screen(){
					this.currentPage=1;
					this.getData(1,this.find,this.radio);
				},
				handleRadio(value){
					console.log(value);
					this.radio=value;
					this.currentPage=1;
					this.getData(1,this.find,this.radio);
				},
				getData(pageNo,find,status){
					this.$get('/group/getAll',{
						pageNo:pageNo,
						name:find,
						status:status
					}).then(data=>{
						console.log(data);
						this.tableData=data.datas
						this.total=data.totalCount
					})
				}
	     
		},
		mounted:function(){
			this.$sendTitle(this.navtitle);
			this.getData(1,'',this.radio);
		}
	}
</script>

<style scoped>	
	.amend .el-form-item {	margin-bottom: 22px;}
	
	.btnReset{color:#fff;}	
	
</style>