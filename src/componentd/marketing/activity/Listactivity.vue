<template>
	<div>
		<div class="flex-wrap flex-vertical hf">
            <el-row class="p-10 pb-0 boxborder bw" type="flex" align="middle">
				<el-col :span="6" :offset="18" class="tr">
					<router-link to='/Main/Addactivity'>
						<el-button type="success" size="small">+&nbsp;添加活动</el-button>	
					</router-link>	
				</el-col>
			</el-row>
			<div class="pr flex-con paddinglist bw boxborder">
				<el-table :data="tableData" style="width: 100%;">
					<el-table-column prop="startTime" label="活动开始时间" width="" align="center">
					</el-table-column>
					<el-table-column prop="endTime" label="活动结束时间" width="" align="center">
					</el-table-column>
					<el-table-column prop="types" label="活动类型" width="" align="center">
					</el-table-column>
					<el-table-column prop="isholidays" label="分批赠送" width="90" align="center">
					</el-table-column>
					<el-table-column prop="isdefaults" label="默认" width="60" align="center">
					</el-table-column>
                    <el-table-column prop="addtime" label="发布时间" width="" align="center">
					</el-table-column>
                    <el-table-column prop="states" label="状态" width="60" align="center">
					</el-table-column>
                    <el-table-column prop="" label="操作" width="400" align="center">
                        <template slot-scope="scope">
                            <el-button type="warning" size="mini" class="btnStyle" @click="Shment(scope.$index, scope.row)">管理时间</el-button>
                            <el-button type="warning" size="mini" class="btnStyle" @click="Shment1(scope.$index, scope.row)">管理力度</el-button>
                            <el-button type="warning" size="mini" class="btnStyle" @click="handleDelete(scope.$index, scope.row)" >{{scope.row.state == 0 ? nouse : canuse}}</el-button>
                            <el-button type="warning" size="mini" class="btnStyle" @click="handleDeletes(scope.$index, scope.row)">删除</el-button>
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
		<Dialogue :textContent="textContent" :dialogVisible="dialogVisibles"  v-on:confirm="confirmIsuses" v-on:cancel="canceluse"></Dialogue>

        <el-dialog title="管理活动时间" :visible.sync="dialogFormVisible" width="40%">
				<el-form ref="form" :model="form" label-width="180px"> 	
                        <el-form-item label="选择时间：：">
                            <el-date-picker v-model="valueTime" type="datetimerange"  range-separator="至" start-placeholder="开始时间" 
                                end-placeholder="结束时间" value-format="yyyy-MM-dd HH:mm:ss" @change="handleTime">
                            </el-date-picker>
                            <el-input v-show="false" v-model="form.addtime" ></el-input>
                        </el-form-item>
                        <el-form-item label="是否开启分批赠送：">
                            <template>
								<el-radio-group v-model="form.isholiday">
									<el-radio :label="0">否</el-radio>
									<el-radio :label="1">是</el-radio>
								</el-radio-group>
							</template>	
                        </el-form-item>
                        <el-form-item label="是否默认活动：">
                            <template>
								<el-radio-group v-model="form.isdefault">
									<el-radio :label="0">否</el-radio>
									<el-radio :label="1">是</el-radio>
								</el-radio-group>
							</template>	
                        </el-form-item>
                        <el-form-item label="活动类别：">
                            <el-select v-model="types">
                                 <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
			    </el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="success" @click="updateActivity">确 定</el-button>
				</div>
			</el-dialog>

            <el-dialog title="充值天牛币送天牛币" :visible.sync="dialogFormVisible1" width="40%">
				<el-form ref="form" :model="form1" label-width="180px">
                        <el-form-item label="充值一阶段A：">
							<el-input v-model="form1.oneStageA" placeholder="请填写整数"></el-input>						
						</el-form-item>
                        <el-form-item label="充值一阶段B：">
							<el-input v-model="form1.oneStageB" placeholder="请填写整数"></el-input>						
						</el-form-item>
                        <el-form-item label="充值一阶段送天牛币：">
							<el-input v-model="form1.oneGiveMuch" placeholder="请填写整数"></el-input>						
						</el-form-item>
                        <el-form-item label="充值二阶段A：">
							<el-input v-model="form1.twoStageA" placeholder="请填写整数"></el-input>						
						</el-form-item>
                        <el-form-item label="充值二阶段B：">
							<el-input v-model="form1.twoStageB" placeholder="请填写整数"></el-input>						
						</el-form-item>
                        <el-form-item label="充值二阶段送天牛币：">
							<el-input v-model="form1.twoGiveMuch" placeholder="请填写整数"></el-input>						
						</el-form-item>
                        <el-form-item label="充值三阶段A：">
							<el-input v-model="form1.threeStageA" placeholder="请填写整数"></el-input>						
						</el-form-item>
                        <el-form-item label="充值三阶段B：">
							<el-input v-model="form1.threeStageB" placeholder="请填写整数"></el-input>						
						</el-form-item>
                        <el-form-item label="充值三阶段送天牛币：">
							<el-input v-model="form1.threeGiveMuch" placeholder="请填写整数"></el-input>						
						</el-form-item>
                        <el-form-item label="充值四阶段：">
							<el-input v-model="form1.fourStage" placeholder="请填写整数"></el-input>						
						</el-form-item>
                        <el-form-item label="充值四阶段送天牛币：">
							<el-input v-model="form1.fourGiveMuch" placeholder="请填写整数"></el-input>						
						</el-form-item>
			    </el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible1 = false">取 消</el-button>
					<el-button type="success" @click="addBeetleSet">确 定</el-button>
				</div>
			</el-dialog>

            <el-dialog title="续租期送天牛币" :visible.sync="dialogFormVisible2" width="40%">
				<el-form ref="form" :model="form1" label-width="180px">	
                        <el-form-item label="4820月租：">
							<el-input v-model="form1.monthlyA" placeholder="请填写整数"></el-input>						
						</el-form-item>
                        <el-form-item label="4820季租：">
							<el-input v-model="form1.monthlyB" placeholder="请填写整数"></el-input>						
						</el-form-item>
                        <el-form-item label="4820年租：">
							<el-input v-model="form1.monthlyC" placeholder="请填写整数"></el-input>						
						</el-form-item>
                        <el-form-item label="6020月租：">
							<el-input v-model="form1.seasonA" placeholder="请填写整数"></el-input>						
						</el-form-item>
                        <el-form-item label="6020季租：">
							<el-input v-model="form1.seasonB" placeholder="请填写整数"></el-input>						
						</el-form-item>
                        <el-form-item label="6020年租：">
							<el-input v-model="form1.seasonC" placeholder="请填写整数"></el-input>						
						</el-form-item>
                        <el-form-item label="7220月租：">
							<el-input v-model="form1.annualRentA" placeholder="请填写整数"></el-input>						
						</el-form-item>
                        <el-form-item label="7220季租：">
							<el-input v-model="form1.annualRentB" placeholder="请填写整数"></el-input>						
						</el-form-item>
                        <el-form-item label="7220年租：">
							<el-input v-model="form1.annualRentC" placeholder="请填写整数"></el-input>						
						</el-form-item>
                        <el-form-item label="用户范围">
                            <template>
                                    <el-radio-group v-model="form1.userRangebeetile">
                                        <el-radio :label="0">新用户</el-radio>
                                        <el-radio :label="1">全部用户</el-radio>
                                    </el-radio-group>
                            </template>
                        </el-form-item>
			    </el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible2 = false">取 消</el-button>
					<el-button type="success" @click="addLeasetermSet">确 定</el-button>
				</div>
			</el-dialog>

            <el-dialog title="续租送租期" :visible.sync="dialogFormVisible3" width="40%">
				<el-form ref="form" :model="form1" label-width="180px">
                        <el-form-item label="月租送租期天数">
							<el-input v-model="form1.month" placeholder="请填写天数"></el-input>						
						</el-form-item>
                        <el-form-item label="季租送租期天数">
							<el-input v-model="form1.season" placeholder="请填写天数"></el-input>						
						</el-form-item>
                        <el-form-item label="年租送租期天数">
							<el-input v-model="form1.year" placeholder="请填写天数"></el-input>						
						</el-form-item>
                        <el-form-item label="用户范围">
                            <template>
                                    <el-radio-group v-model="form1.userRangedays">
                                        <el-radio :label="0">新用户</el-radio>
                                        <el-radio :label="1">全部用户</el-radio>
                                    </el-radio-group>
                            </template>
                        </el-form-item>
			    </el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible3 = false">取 消</el-button>
					<el-button type="success" @click="addTenancydays">确 定</el-button>
				</div>
			</el-dialog>

            <el-dialog title="充值天牛币打折" :visible.sync="dialogFormVisible4" width="30%">
				<el-form ref="form" :model="form1" label-width="180px">	
                       <el-form-item label="打折一阶段A：">
							<el-input v-model="form1.oneDiscountA" placeholder="请填写整数"></el-input>						
						</el-form-item>
                        <el-form-item label="打折一阶段B：">
							<el-input v-model="form1.oneDiscountB" placeholder="请填写整数"></el-input>						
						</el-form-item>
                        <el-form-item label="打折一阶段折数：">
							<el-input v-model="form1.oneDiscount" placeholder="请填写小数"></el-input>						
						</el-form-item>
                        <el-form-item label="打折二阶段A：">
							<el-input v-model="form1.twoDiscountA" placeholder="请填写整数"></el-input>						
						</el-form-item>
                        <el-form-item label="打折二阶段B：">
							<el-input v-model="form1.twoDiscountB" placeholder="请填写整数"></el-input>						
						</el-form-item>
                        <el-form-item label="打折二阶段折数：">
							<el-input v-model="form1.twoDiscount" placeholder="请填写小数"></el-input>						
						</el-form-item>
                        <el-form-item label="打折三阶段A：">
							<el-input v-model="form1.threeDiscountA" placeholder="请填写整数"></el-input>						
						</el-form-item>
                        <el-form-item label="打折三阶段B：">
							<el-input v-model="form1.threeDiscountB" placeholder="请填写整数"></el-input>						
						</el-form-item>
                        <el-form-item label="打折三阶段折数：">
							<el-input v-model="form1.threeDiscount" placeholder="请填写小数"></el-input>						
						</el-form-item>
                        <el-form-item label="打折四阶段：">
							<el-input v-model="form1.fourDiscounts" placeholder="请填写整数"></el-input>						
						</el-form-item>
                        <el-form-item label="打折四阶段折数：">
							<el-input v-model="form1.fourDiscount" placeholder="请填写小数"></el-input>						
						</el-form-item>
			    </el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible4 = false">取 消</el-button>
					<el-button type="success" @click="addBeetleSetDiscount">确 定</el-button>
				</div>
			</el-dialog>
	</div>
</template>

<script>
    import Dialogue from '@/components/common/Dialogue'
	export default{
		data(){
			return{
                navtitle:'营销>平台活动',
				tableData: [],
		        currentPage:1,
                total:0,
                nouse:'禁用',
                canuse:'启用',
                dialogVisible:false,
				textContent:'',//提示框文本
                dialogVisibles:false,
                currentState:'',
                currentId:'',
                currentType:'',
                dialogFormVisible:false,
                dialogFormVisible1:false,
                dialogFormVisible2:false,
                dialogFormVisible3:false,
                dialogFormVisible4:false,
                valueTime:[],
                options: [{
                    value: '1',
                    label: '充值天牛币送天牛币'
                    }, {
                    value: '2',
                    label: '起租/续租送天牛币'
                    }, {
                    value: '3',
                    label: '起租/续租送租期'
                    }, {
                    value: '4',
                    label: '充值天牛币打折'
                }],
                form:{
                },
                form1:{},
                begin:'',
                end:'',
                type:'',
                types:''
			}
		},
		methods:{
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.Activitylist(this.currentPage);
            },
            handleDelete(index,row){//	      	
                this.currentState = row.state;
                this.currentId = row.id;
                this.dialogVisible = true;
                this.textContent = row.state == 0? "确认禁用活动吗？" :"确认启用活动吗？";
                this.title = "提示";
			},
            handleDeletes(index,row){
                this.currentId = row.id;
                this.currentType= row.type;
                this.dialogVisibles = true;
                this.textContent = "确认删除活动吗？";
                this.title = "提示";
            },
            Activitylist(pageNo){
            var pageNo = pageNo || "";
            this.$get('platformActivity/selectUserActivity',{
                pageNo: pageNo
            }).then(data=>{
                var arr=data.datas;
                for(var i = 0, len = arr.length; i < len; i++) {

                    if(arr[i].isholiday==0){
                        arr[i].isholidays="否"
                    }else if(arr[i].isholiday==1){
                        arr[i].isholidays="是"
                    }

                    if(arr[i].isdefault==0){
                        arr[i].isdefaults="否"
                    }else if(arr[i].isdefault==1){
                         arr[i].isdefaults="是"
                    }

                    if(arr[i].state==0){
                        arr[i].states="开启"
                    }else if(arr[i].state==1){
                         arr[i].states="禁用"
                    }

                    if(arr[i].type==1){
                        arr[i].types="充值天牛币送天牛币"
                    }else if(arr[i].type==2){
                         arr[i].types="起租/续租送天牛币"
                    }else if(arr[i].type==3){
                         arr[i].types="起租/续租送租期"
                    }else{
                         arr[i].types="充值天牛币打折"
                    }
                }
                this.tableData=arr;
                this.total = Number(data.totalCount);
                });
            },
            handleTime(v){//日期
                this.begin = v[0];
                this.end = v[1];	
		    },
            Shment(index,row){
                this.currentId=row.id;
                this.ListActivity(this.currentId);
                this.dialogFormVisible = true;
                this.valueTime=[];
            },
            Shment1(index,row){
                this.currentId=row.id;
                this.IntensityActivity(this.currentId);
                if(row.type==1){
                    this.dialogFormVisible1 = true;
                }else if(row.type==2){
                     this.dialogFormVisible2 = true;
                }else if(row.type==3){
                     this.dialogFormVisible3 = true;
                }else if(row.type==4){
                     this.dialogFormVisible4 = true;
                }	
            },
            IntensityActivity(){
               this.$get('platformActivity/UserActivitydetails',{
                   id:this.currentId
				}).then(data=>{
                    this.form1=data;
				}) 
            },
             addBeetleSet(){
				this.$post('platformActivity/addBeetleSet',{
					oneStageA:this.form1.oneStageA,
                    oneStageB:this.form1.oneStageB,
                    oneGiveMuch:this.form1.oneGiveMuch,
                    twoStageA:this.form1.twoStageA,
                    twoStageB:this.form1.twoStageB,
                    twoGiveMuch:this.form1.twoGiveMuch,
                    threeStageA:this.form1.threeStageA,
                    threeStageB:this.form1.threeStageB,
                    threeGiveMuch:this.form1.threeGiveMuch,
                    fourStage:this.form1.fourStage,
                    fourGiveMuch:this.form1.fourGiveMuch,
                    activity_id:this.currentId
				}).then(data=>{
                    this.dialogFormVisible1 = false;
                    this.Activitylist(this.currentPage);//刷新当前页
					this.$ye();
				})
            },
             addLeasetermSet(){
				this.$post('platformActivity/addLeasetermSet',{
					monthlyA:this.form1.monthlyA,
                    seasonA:this.form1.seasonA,
                    annualRentA:this.form1.annualRentA,
                    monthlyB:this.form1.monthlyB,
                    seasonB:this.form1.seasonB,
                    annualRentB:this.form1.annualRentB,
                    monthlyC:this.form1.monthlyC,
                    seasonC:this.form1.seasonC,
                    annualRentC:this.form1.annualRentC,
                    activity_id:this.currentId,
                    userRange:this.form1.userRangebeetile
				}).then(data=>{
                    this.dialogFormVisible2 = false;
                    this.Activitylist(this.currentPage);//刷新当前页
					this.$ye();
				})
            },
            addTenancydays(){
				this.$post('platformActivity/addTenancydays',{
					month:this.form1.month,
                    season:this.form1.season,
                    year:this.form1.year,
                    activity_id:this.currentId,
                    userRange:this.form1.userRangedays
				}).then(data=>{
                    this.dialogFormVisible3 = false;
                    this.Activitylist(this.currentPage);//刷新当前页
					this.$ye();
				})
            },
            addBeetleSetDiscount(){
				this.$post('platformActivity/addBeetleSetDiscount',{
					oneDiscountA:this.form1.oneDiscountA,
                    oneDiscountB:this.form1.oneDiscountB,
                    oneDiscount:this.form1.oneDiscount,
                    twoDiscountA:this.form1.twoDiscountA,
                    twoDiscountB:this.form1.twoDiscountB,
                    twoDiscount:this.form1.twoDiscount,
                    threeDiscountA:this.form1.threeDiscountA,
                    threeDiscountB:this.form1.threeDiscountB,
                    threeDiscount:this.form1.threeDiscount,
                    fourDiscounts:this.form1.fourDiscounts,
                    fourDiscount:this.form1.fourDiscount,
                    activity_id:this.currentId
				}).then(data=>{
                    this.dialogFormVisible4 = false;
                    this.Activitylist(this.currentPage);//刷新当前页
					this.$ye();
				})
            },
            
            updateActivity(){
                var begins = this.valueTime[0];
                var ends = this.valueTime[1];
                if(this.types=='充值天牛币送天牛币'){
                    this.types=1;
                }else if(this.types=='起租/续租送天牛币'){
                    this.types=2;
                }else if(this.types=='起租/续租送租期'){
                    this.types=3;
                }else if(this.types=='充值天牛币打折'){
                    this.types=4;
                }
				this.$post('platformActivity/updateUserActivity',{
					type:this.types,
					isholiday:this.form.isholiday,
					isdefault:this.form.isdefault,
					startTime:begins,
                    endTime:ends,
                    addtime:this.form.addtime,
                    state:1,
                    id:this.currentId
				}).then(data=>{
                    this.dialogFormVisible = false;
                    this.Activitylist(this.currentPage);//刷新当前页
                    this.valueTime=[];
					this.$ye();
				})
            },
            ListActivity(){
               this.$get('platformActivity/UserActivitydetail',{
                   id:this.currentId
				}).then(data=>{
                    var arr=data;
                    this.valueTime.push(arr.startTime);
                    this.valueTime.push(arr.endTime);
                    if(arr.type==1){
                        this.types='充值天牛币送天牛币';
                    }else if(arr.type==2){
                        this.types='起租/续租送天牛币';
                    }else if(arr.type==3){
                        this.types='起租/续租送租期';
                    }else if(arr.type==4){
                        this.types='充值天牛币打折';
                    }
                    this.form=arr;
				}) 
            },
            confirmIsuse(){//确认禁用或者启用
                var state = this.currentState == 0 ? 1 : 0;
                var id = this.currentId;       
                this.$post('platformActivity/updateUserActivityState',{
                    id:id,
                    state:state
                }).then(data=>{
                    this.dialogVisible = false;
                    this.Activitylist(this.currentPage);//刷新当前页
                    this.$ye();
                })   	
            },
			confirmIsuses(){
                var id = this.currentId;
                var type = this.currentType;   
	      	    this.$post('platformActivity/deleteUserActivity',{
                  id:id,
                  type:type
	      	}).then(data=>{
	      		this.dialogVisibles = false;
                this.Activitylist(this.currentPage);//刷新当前页
	      		this.$ye();
				})
			},
	      canceluse(){//取消或者关闭
              this.dialogVisible = false;
              this.dialogVisibles = false;
              this.dialogFormVisible = false;
	      }
		},
		mounted(){
            this.Activitylist(1);
            this.$sendTitle(this.navtitle);
        },
        created(){
            this.Activitylist(this.currentPage);
        },
        components:{
    	    Dialogue
        }
	}
</script>

<style scoped>
	.numBox>div{padding:20px;}
	.numBox>div:nth-child(1),.numBox>div:nth-child(2){margin-right:10px;}
	
</style>