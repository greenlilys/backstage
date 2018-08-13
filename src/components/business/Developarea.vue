
<template>
	<div class="mt-10">
		<el-row class="row joinshop" type="flex" align="middle">
			<el-col :span="6">				
				<template>
					<el-select v-model="value" placeholder="请选择筛选区域">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</template>
			</el-col>

			<el-col :span="8" :offset="10">
				<div>
					<el-input placeholder="请输入内容" v-model="find" class="input-with-select">
						<el-button slot="append" icon="el-icon-search">搜索</el-button>
					</el-input>
				</div>
			</el-col>

		</el-row>
		<template >
			<el-table :data="tableData" style="width: 100%;">
				<el-table-column prop="date" label="网点编号" width="" align="center">
				</el-table-column>
				<el-table-column prop="name" label="网点名称" width="" align="center">
				</el-table-column>
				<el-table-column prop="name" label="店铺账号" width="" align="center">
				</el-table-column>
				<el-table-column prop="name" label="账号状态" width="" align="center">
				</el-table-column>
				<el-table-column prop="address" label="网点地址" width="" align="center">
				</el-table-column>
				<el-table-column prop="name" label="联系人" width="" align="center">
				</el-table-column>
				<el-table-column prop="name" label="库存/配货" width="" align="center">
				</el-table-column>
				<el-table-column prop="name" label="保证金" width="" align="center">
				</el-table-column>
				<el-table-column prop="name" label="上线状态" width="" align="center">
				</el-table-column>
				<el-table-column prop="action" label="操作" width="" align="center">
					<template slot-scope="scope">
						<el-button type="warning" size="mini" class="btnStyle" @click="navShopdetail">详情</el-button>
					</template>
				</el-table-column>
			</el-table>
		</template>
		<template>
			<div class="block page">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage1" :page-size="8" layout="total, prev, pager, next" :total="100">
				</el-pagination>
			</div>
		</template>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
				radio: '1',
				find: '',
				currentPage1: 1,
				options: [{
					value: '选项1',
					label: '黄金糕'
				}, {
					value: '选项2',
					label: '双皮奶'
				}, {
					value: '选项3',
					label: '蚵仔煎'
				}, {
					value: '选项4',
					label: '龙须面'
				}, {
					value: '选项5',
					label: '北京烤鸭'
				}],
				value: '',
			};
		},
		methods: {
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			getShopareaList() {
				this.$get('operRegion/getAll',{
					id:this.id
				}).then(data=>{
					
				})
			},
			navShopdetail() {
				this.$router.push('/Shoplist/Shopdetail');
			}
		},
		mounted(){
			if(this.id){
				this.getShopareaList();
			}			
		},
		props:['id'],
		watch:{
			id:function(newVal,oldVal){			
				if(newVal){this.getShopareaList();}else{
					this.$message({
						type:'error',
						message:'id没有获取'
					})
				}
			}
		},
	}
</script>
<style scoped>
	.shopList {width: 100%;box-sizing: border-box;}	
	.joinshop {	margin:0 0;padding-bottom:10px;}	
	.joinshop .btnReset{color:#fff;}
	.listDetail{background:#fff;position:relative;}
	
</style>