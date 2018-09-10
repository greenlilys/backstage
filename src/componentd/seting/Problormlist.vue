<template>
	<div>
		<div class="hf flex-wrap flex-vertical">
			<el-row class="p-10 boxborder bw" type="flex" align="middle">
				<el-col :span="6" :offset="18" class="tr">
					<router-link to='/Main/Problorm'>
						<el-button type="success" size="small">+&nbsp;添加问题</el-button>	
					</router-link>	
				</el-col>
			</el-row>
		
			<div class="paddinglist boxborder pr mt-10 flex-con bw">	
								<el-table :data="tableData" style="width: 100%;">
									<el-table-column prop="title" label="问题标题" width="" align="center">
									</el-table-column>
									<el-table-column prop="addTime" label="发布时间" width="" align="center">
									</el-table-column>
									<el-table-column prop="action" label="操作" width="250" align="center">
									    <template slot-scope="scope">						
												<router-link :to="{path:'/Main/UpdateProblorm',query:{id:scope.row.id}}">
														<el-button type="warning" size="mini" class="btnStyle">修改</el-button>
												</router-link>
												<el-button type="warning" size="mini" class="btnStyle" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
									    </template>
									</el-table-column>
								</el-table>
							
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
						</div>
				</div>
				<Dialogue :textContent="textContent" :dialogVisible="dialogVisible"  v-on:confirm="confirmIsuse" v-on:cancel="canceluse"></Dialogue>
	</div>
</template>

<script>
	import Dialogue from '@/components/common/Dialogue'
	export default {
		data() {
			return {
				navtitle:'设置>常见问题',
				tableData: [],
				currentPage:1,
				total:0,
				currentId:'',
				dialogVisible:false,
                textContent:'',//提示框文本
                currentId:'',
                id:''
			};
		},
		methods: {
			handleSizeChange(val) {
	        console.log(`每页 ${val} 条`);
	        },
	        handleCurrentChange(val) {
	        this.getProblormList(val);
			},
            handleDelete(index,row){
            this.currentId = row.id;
            this.dialogVisible = true;
            this.textContent = "确认删除该问题吗？";
            this.title = "提示";
            },
			getProblormList(pageNo){	      	
	      	    this.$get('problem/commonProblemList',{
					pageNo:pageNo					
				}).then(data=>{
					this.tableData = data.datas;
					this.total = data.totalCount;
			})
			},
			confirmIsuse(){
			    var id = this.currentId;       
                this.$post('problem/deleteCommonProblem',{
                id:id
                }).then(data=>{
                this.dialogVisible = false;
                this.getProblormList(this.currentPage);//刷新当前页
                this.$ye();
			})
			},
	      canceluse(){//取消或者关闭
	      	this.dialogVisible = false;
	      }
		},
	    method(){
			this.getProblormList(1);
		},
		created(){
			this.getProblormList(this.currentPage);
		}, 
		mounted:function(){
			this.$sendTitle(this.navtitle);
		},
		components:{
    	Dialogue
        }
	}

</script>

<style scoped>
	
</style>