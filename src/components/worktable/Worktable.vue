<template>
	<div class="container-fluid bg bgZhongHui">
		<div class="row content">
			<div class="col-md-12">

				<ul class="tabItem flex-wrap flex-horizontal flex-justify-between">
					<li class="flex-wrap flex-vertical flex-justify-center flex-align-center"><span>64</span><span>今日预约</span></li>
					<li class="flex-wrap flex-vertical flex-justify-center flex-align-center"><span>2506</span><span>用户</span></li>
					<li class="flex-wrap flex-vertical flex-justify-center flex-align-center"><span>55</span><span>加盟店</span></li>
					<li class="flex-wrap flex-vertical flex-justify-center flex-align-center"><span>944</span><span>缴纳押金总数</span></li>
					<li class="flex-wrap flex-vertical flex-justify-center flex-align-center"><span>1375</span><span>缴纳租金总数</span></li>
					<li class="flex-wrap flex-vertical flex-justify-center flex-align-center"><span>3</span><span>今日交纳押金</span></li>
					<li class="flex-wrap flex-vertical flex-justify-center flex-align-center"><span>3</span><span>今日缴纳租金</span></li>
				</ul>

				<div class="bot flex-wrap flex-horizontal">
					<div class="shopList">

						<div class="panel panel-default">
							<div class="panel-heading font-18">网点业绩TOP10</div>
							<template>
								<el-table :data="tableData" style="width: 100%">
									<el-table-column prop="date" label="日期" width="200">
									</el-table-column>
									<el-table-column prop="name" label="姓名" width="200">
									</el-table-column>
									<el-table-column prop="address" label="地址">
									</el-table-column>
								</el-table>
							</template>

						</div>

					</div>
					<div class="find">
						<div class="panel panel-default">
							<div class="panel-heading font-18">押金查询</div>
							<div class="panel-body">
								<template>
									<div class="block">
										<el-date-picker v-model="start" type="date" placeholder="选择起始时间" style="width:100%;">
										</el-date-picker>
									</div>
								</template>
								<template>
									<div class="block mt-10">
										<el-date-picker v-model="end" type="date" placeholder="选择结束时间" style="width:100%;">
										</el-date-picker>
									</div>
								</template>
								<el-row type="flex" justify="center" class="mt-10">									
									 <button type="button" class="btn btn-primary btnReset" @click="find">查&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;询</button>
								</el-row>
								<p class="font-14 mt-20">押金查询结果：</p>
							</div>

						</div>
						
						<div class="panel panel-default">
							<div class="panel-heading font-18">租金查询</div>
							<div class="panel-body">
								<template>
									<div class="block">
										<el-date-picker v-model="start" type="date" placeholder="选择起始时间" style="width:100%;">
										</el-date-picker>
									</div>
								</template>
								<template>
									<div class="block mt-10">
										<el-date-picker v-model="end" type="date" placeholder="选择结束时间" style="width:100%;">
										</el-date-picker>
									</div>
								</template>
								<el-row type="flex" justify="center" class="mt-10">
									<button type="button" class="btn btn-primary btnReset" @click="find">查&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;询</button>
								</el-row>
								<p class="font-14 mt-20">租金查询结果：</p>
							</div>

						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
	</div>
</template>
<script>
	export default {
		name: '',
		data() {
				 return {
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }],
          start:'',
          end:''
        }
			},
		
		methods: {
			find(){
				
			}
		},
		components: {

		}
	}
</script>
<style scoped>
.bg{width:100%;	padding-top:10px;height:880px;box-sizing: border-box;}
.tabItem,.bot{width:90%;margin:0 auto;}
.tabItem li{width:13.8%;height:150px;background:#fff;}
.tabItem li span:nth-child(1){font-size:38px;color:#2EB961;}
.tabItem li span:nth-child(2){	font-size:20px;	font-weight:bold;}
.tabItem span{	display:block;}
.bot{	margin-top:10px;	height:710px;}
.shopList{	margin-right:10px;	flex:1;	background:#fff;padding:10px 60px;}
.find{	width:20%;	background:#fff;box-sizing: border-box;padding:10px;}
.shopList .panel-heading{padding-left:10px;}

</style>