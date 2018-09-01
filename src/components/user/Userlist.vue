<template>
	<div class="flex-wrap flex-vertical">		
			
			<el-row type="flex" align="middle" class="contentBox bw">
					<el-col :span="6">
						<div>
							<el-input placeholder="请输入内容" v-model="find" class="input-with-select" clearable>
								<el-button slot="append" icon="el-icon-search" @click="search">搜索</el-button>
							</el-input>
						</div>
					</el-col>				
			<el-col :span="12" :offset="6" style="text-align:right;">
					<el-button type="success" size="medium" @click="editRent">修改租期</el-button>				
					<el-button type="success" size="medium" @click="sendMessage">群发短信</el-button>
			</el-col>
			</el-row>
			
			<el-row type="flex" align="middle" class="contentBox mt-10 bw" >
					<el-col :span="6">
					<span class="font-14">押金状态：</span>
					<template>
						<el-radio-group v-model="radio1"  @change = "handleRadio1">
							<el-radio  :label="2">全部</el-radio>
							<el-radio  :label="0">未缴</el-radio>
							<el-radio  :label="1">已缴</el-radio>	
						</el-radio-group>
					</template>
				</el-col>
				
				<el-col :span="6">
					<span class="font-14">租期状态：</span>
					<template>
						<el-radio-group v-model="radio2"  @change = "handleRadio2">
							<el-radio  :label="2">全部</el-radio>
							<el-radio  :label="0">租期中</el-radio>
							<el-radio  :label="1">已逾期</el-radio>
						</el-radio-group>
					</template>
				</el-col>
				<el-col :span="4" :offset="8" style="text-align:right;">
					<el-button type="success" size="small">导出当前数据</el-button>				
				</el-col>
			</el-row>
			
			<el-row class="pr flex-con bw">
				<el-col >
					<template>
								<el-table :data="tableData" style="width: 100%;">
									<el-table-column prop="username" label="用户账号" width="110" align="center">
									</el-table-column>
									<el-table-column prop="nicknames" label="用户昵称" width="" align="center">
									</el-table-column>
									<el-table-column prop="addTime" label="注册时间" width="140" align="center">
									</el-table-column>
									<el-table-column prop="address" label="所在区域" width="200" align="center">
									</el-table-column>
									<el-table-column prop="isdeposits" label="押金状态" width="" align="center">
									</el-table-column>
									<el-table-column prop="deposit" label="押金金额" width="" align="center">
									</el-table-column>
									<el-table-column prop="modes" label="电池型号" width="" align="center">
									</el-table-column>
									<el-table-column prop="isinstalls" label="安装状态" width="" align="center">
									</el-table-column>
									<el-table-column prop="rentstates" label="租期状态" width="" align="center">
									</el-table-column>
									<el-table-column prop="rent" label="租期" width="180" align="center">
									</el-table-column>
									<el-table-column prop="wallet" label="钱包余额" width="" align="center">
									</el-table-column>
									<el-table-column prop="integral" label="天牛币余额" width="100" align="center">
									</el-table-column>
									<el-table-column prop="statusd" label="账户状态" width="" align="center">
									</el-table-column>
									<el-table-column prop="" label="操作" width="150" align="center">
									    <template slot-scope="scope">
									    	<router-link :to="{path:'/Main/Userdetail',query:{id:scope.row.id,isdeposit:scope.row.isdeposit}}">
													<el-button type="warning" size="mini" class="btnStyle">详情</el-button>
											</router-link>
											<el-button type="warning" size="mini" class="btnStyle" @click="handleDelete(scope.$index, scope.row)" >{{scope.row.status == 0 ? nouse : canuse}}</el-button>		         
									    </template>
									</el-table-column>
								</el-table>
							</template>
							
							<template>
								<div class="block page">							    
							    <el-pagination
							      @size-change="handleSizeChange"
							      @current-change="handleCurrentChange"
							      @prev-click="prevClick"
							      @next-click="nextClick"
							      :current-page.sync="currentPage"
							      :pager-count="11" 
							      :page-size="10"							      
							      layout="total, prev, pager, next"
							      :total="totalCount">
							    </el-pagination>
							 	 </div>
							</template>	
				</el-col>
			</el-row>
			
			<el-dialog title="修改租期" :visible.sync="dialogFormVisible" width="30%">
			  <el-form :model="form">
			    <el-form-item label="修改类型：" :label-width="formLabelWidth">
			    	<el-radio  v-model="form.radio3" :label="0">增加租期</el-radio>
					<el-radio  v-model="form.radio3" :label="1">减少租期</el-radio>			      
			    </el-form-item>
			    <el-form-item label="修改天数：" :label-width="formLabelWidth">
			     	<el-input v-model="form.rentDay" placeholder="请输入内容" clearable></el-input>
			    </el-form-item>
			     <el-form-item label="备注信息：" :label-width="formLabelWidth">
			     	<el-input v-model="form.remark" placeholder="请输入内容" clearable></el-input>
			    </el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible = false">取 消</el-button>
			    <el-button type="primary" @click="confirmEdit">确 定</el-button>
			  </div>
			</el-dialog>
			
			
			
			<el-dialog title="群发短信" :visible.sync="dialogFormVisible1" width="30%">
			  <el-form :model="form1">			   
			    <el-form-item label="短信模板：" :label-width="formLabelWidth">
			     	<el-input v-model="form1.messageId" placeholder="请输入内容" clearable></el-input>
			    </el-form-item>			     
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible1 = false">取 消</el-button>
			    <el-button type="primary" @click="confirmSend">确 定</el-button>
			  </div>
			</el-dialog>
			<Dialogue :textContent="textContent" :dialogVisible="dialogVisible"  v-on:confirm="confirmIsuse" v-on:cancel="canceluse"></Dialogue>
			
		
	</div>
</template>
<script>
	import Dialogue from '@/components/common/Dialogue'
	export default {
    name: '',
    data(){
      return{
		  navtitle:'用户>用户列表',
          radio1:2,//押金查询
          radio2:2,//租期查询
          
          find:'',//搜索框
          tableData: [],
		  currentPage:1,		  
		  totalCount:100, //总条目
		  dialogFormVisible: false,
		  
	      form: {	          
	          radio3:"",//单选框
	          rentDay:'',//租期变化天数
	          remark: ''	        
	       },
	       dialogFormVisible1:false,
	        form1: {	          
	          messageId:''//短信模板ID        
	       },
	       formLabelWidth: '120px',
	       currentStatus:'',//当前禁用启用状态 0 或 1
	       currentId:'',//当前用户id	       
	       dialogVisible:false,//禁用启用提示框	       
	       textContent:'',//提示框文本
	       nouse:'禁用',
	       canuse:"启用",
	       
        
      }
    },
    methods:{
     	  handleSizeChange(val) {//pageSize 改变时会触发
	        console.log(`每页 ${val} 条`);
	      },
	      handleCurrentChange(v) {//currentPage 改变时会触发
	      	this.getUserList(v,this.radio1,this.radio2,this.find)
	      },
	      getUserList(pageNo,radio1,radio2,searchInput){
	      		 	var pageNo = pageNo || "",
		      			radio1 = radio1 == 2? "" : radio1,
		      			radio2 = radio2 == 2? "" : radio2,
		      			searchInput = searchInput || "";		      		
		      	this.$get('customer/cusList',{
		      		pageNo:pageNo,
		      		isdeposit:radio1,
		      		isoverdue:radio2,
		      		nickName:searchInput
		      	}).then(data=>{
	    		var arr = data.datas;
	    		for(var i = 0,len=arr.length;i<len;i++){
	    			if(!arr[i].provincename  && !arr[i].cityname && !arr[i].countyname){
	    				arr[i].address = "--";
	    			}else{
	    				arr[i].address = arr[i].provincename + arr[i].cityname + arr[i].countyname;
	    			}
	    			
	    			arr[i].rent = arr[i].begindate + "至" +arr[i].duedate;
	    			if(arr[i].isdeposit == 0){
	    				arr[i].isdeposits = "未缴纳"
	    			}else{
	    				arr[i].isdeposits = "已缴纳"
	    			}
	    			
	    			if(arr[i].isdeposit == 1){//如果缴纳押金
	    				if(arr[i].isinstall == 0){
		    				arr[i].isinstalls = "已安装"
		    			}else{
		    				arr[i].isinstalls = "未安装"
		    			}
	    			}
	    			else{
	    				arr[i].isinstalls = "--"
	    			}
	    			
	    			if(arr[i].status == 0){
	    				arr[i].statusd = "正常"
	    			}else{
	    				arr[i].statusd = "禁用"
	    			}
	    			
	    			if(arr[i].isdeposit == 1 && arr[i].isinstall == 0 && arr[i].isoverdue == 1){
	    				arr[i].rentstates = "已逾期"    				
	    				    				
	    			}else if(arr[i].isdeposit == 1 && arr[i].isinstall == 0 && arr[i].isoverdue == 0){
	    				arr[i].rentstates = "租期中"
	    			}else{
	    				arr[i].rentstates = "--"
	    			}
	    			
	    			if(!arr[i].nickname){
	    				arr[i].nicknames = "--"
	    			}else{
	    				arr[i].nicknames = arr[i].nickname;
	    			}
	    			
	    			if(!arr[i].mode){
	    				arr[i].modes = "--"
	    			}else{
	    				arr[i].modes = arr[i].mode;
	    			}
	    		}
	    		this.tableData = arr;
	    		this.totalCount = Number(data.totalCount);
	    		})
	      },
	      prevClick (v){ },//上一页
	      nextClick (v){ },//下一页
	      handleRadio1 (v){
	      	this.getUserList(1,this.radio1,this.radio2,this.find)
	      	this.currentPage = 1;
	      },
	      handleRadio2 (v){
	      	this.getUserList(1,this.radio1,this.radio2,this.find)
	      	this.currentPage = 1;
	      },
	      search (){
	      	this.getUserList(1,this.radio1,this.radio2,this.find)
	      	this.currentPage = 1;
	      },
	      editRent(){//修改租期按钮
	      	this.dialogFormVisible = true;
	      	
	      },
	      sendMessage(){//群发短信按钮
	      	this.dialogFormVisible1 = true;
	      },
	      confirmEdit(){//确定修改租期
	      	var radio1 = this.radio1 == 2? "" : this.radio1;	      	
	      	var radio2 = this.radio2 == 2? "" : this.radio2;
	      	var currentPage = this.currentPage;
	      	var find = this.find;
	      	
	      	this.$post('customer/duedates',{
	      		dataType:this.form.radio3,
	      		duedateday:this.form.rentDay,
	      		remark:this.form.remark,
	      		isdeposit:radio1,
	      		isoverdue:radio2,
	      		nickName:this.find
	      	}).then(data=>{
	      		this.dialogFormVisible = false;
	      		this.getUserList(currentPage,radio1,radio2,find);//刷新当前页
	      		this.$ye();
	      	})
	      	
	      },
	      confirmSend(){//确定群发短信
	      	var radio1 = this.radio1 == 2? "" : this.radio1;
	      	var radio2 = this.radio2 == 2? "" : this.radio2;
	      	
	      	this.$get('customer/smsNotification',{	      		
	      		moid:this.form1.messageId,
	      		isdeposit:radio1,
	      		isoverdue:radio2,
	      		nickName:this.find
	      	}).then(data=>{
	      		this.dialogFormVisible1 = false;
	      		this.$ye();
	      	})
	      	
	      },
	      handleDelete(index,row){//禁用启用按钮	      	
	      	this.currentStatus = row.status;
	      	this.currentId = row.id;
	      	this.dialogVisible = true;
	      	this.textContent = row.status == 0? "确认禁用该用户吗？" :"确认启用该用户吗？";
	      	this.title = "提示";

	      },
	      confirmIsuse(){//确认禁用或者启用
	       var status = this.currentStatus == 0 ? 1 : 0;
	       var userId = this.currentId;
	       
	       var radio1 = this.radio1 == 2? "" : this.radio1;
	       var radio2 = this.radio2 == 2? "" : this.radio2;
	       var currentPage = this.currentPage;
	       var find = this.find;
	       
	      	this.$post('customer/updateCusState',{
	      		id:userId,
	      		state:status
	      	}).then(data=>{
	      		this.dialogVisible = false;
	      		this.getUserList(currentPage,radio1,radio2,find);//刷新当前页
	      		this.$ye();
	      	})
	      	
	      },
	      canceluse(){//取消或者关闭
	      	this.dialogVisible = false;
	      }
	     
    },
    ceeated (){
    	
    },
    mounted (){
		this.getUserList(1,this.radio1,this.radio2,this.find);
		this.$sendTitle(this.navtitle);
    },
    components:{
    	Dialogue
    }
  }

</script>
<style scope>
.el-table div.cell{padding:0;}
</style>