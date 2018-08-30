<template>
	<div>
		<div class="mainContent">
			<h1>活动规则：</h1>
			<el-row type="flex" align="middle" class="mt-10">
				<el-col :span="3"><p>安装预约可获取积分数量：</p></el-col>
				<el-col :span="6"><el-input v-model="input" placeholder="请输入内容"></el-input></el-col>
			</el-row>
			<el-row type="flex" align="middle" class="mt-10">
				<el-col :span="3"><p>换电预约可获取积分数量：</p></el-col>
				<el-col :span="6"><el-input v-model="input" placeholder="请输入内容"></el-input></el-col>
			</el-row>
			<el-row type="flex" align="middle" class="mt-10">
				<el-col :span="3"><p>退电预约可获取积分数量：</p></el-col>
				<el-col :span="6"><el-input v-model="input" placeholder="请输入内容"></el-input></el-col>
			</el-row>
			<el-row type="flex" align="middle" class="mt-10">
				<el-col :span="3"><p>活动周期：</p></el-col>
				<el-col :span="6">
					<template>
					<div class="block">
						<el-date-picker v-model="value7" type="daterange" align="right" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
						</el-date-picker>
					</div>
				</template>
				</el-col>
			</el-row>				
			
		
		</div>
	</div>
</template>

<script>
	export default {
  data() {
    return {
      input: '',
      value7:''
    }
  }
}
</script>

<style scoped>
	.mainContent{background:#fff;padding:10px 20px 0;box-sizing: border-box;}
	.mainContent h1{font-size:18px;line-height: 30px;;}
	.mainContent p{line-height: 20px;}
	
</style>