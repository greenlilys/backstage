
<template>
	<div>
		<el-row class="changeInfo bw hf">
			<el-col :span="12">
				<el-form ref="form" :model="form" label-width="120px">
					<el-form-item label="店主姓名：">
						<el-input v-model="form.contactname" clearable></el-input>
					</el-form-item>
					<el-form-item label="联系电话：">
						<el-input v-model="form.contactcellphone" clearable></el-input>
					</el-form-item>
					<el-form-item label="身份证号码：">
						<el-input v-model="form.contactno" clearable></el-input>
					</el-form-item>
					<el-form-item label="店铺名称：">
						<el-input v-model="form.shopName" clearable></el-input>
					</el-form-item>
					<el-form-item label="店铺编号：">
						<el-input v-model="form.no" clearable></el-input>
					</el-form-item>
					<el-form-item label="店铺所在地区：">
						<template>
							<v-distpicker :province="selects.province" :city="selects.city" :area="selects.areas" @selected="onSelected"></v-distpicker>
						</template>
					</el-form-item>
					<el-form-item label="店铺详细地址：">
						<el-input v-model="form.address"></el-input>
					</el-form-item>
					<el-form-item label="店铺位置坐标：">
						<el-row>
							<el-col :span="11">
								<el-form-item label="X：" label-width="20px">
									<el-input v-model="form.x" placeholder="请输入横坐标：" clearable></el-input>
								</el-form-item>
							</el-col>

							<el-col :span="11" :offset="2">
								<el-form-item label="Y：" label-width="20px">
									<el-input v-model="form.y" placeholder="请输入纵坐标：" clearable></el-input>
								</el-form-item>
							</el-col>
						</el-row>

					</el-form-item>
					<el-form-item label="加盟有效期：">
						<template>
							<div class="block">
								<el-date-picker v-model="valueTime" type="daterange" align="right" range-separator="至" start-placeholder="开始日期" 
									end-placeholder="结束日期" value-format="yyyy-MM-dd" @change="handleTime">
								</el-date-picker>
							</div>
						</template>

					</el-form-item>
					<el-form-item label="APP网点账号：">
						<el-input v-model="form.username"></el-input>
					</el-form-item>
					<el-form-item label="APP帐号密码：">
						<el-input v-model="form.password"></el-input>
					</el-form-item>
					<el-form-item label="账号状态：">					
						  <el-radio-group v-model="status" @change="handleChange">
							  <el-radio  label="0">启用</el-radio>
							  <el-radio  label="1">禁用</el-radio>
						</el-radio-group>					
					</el-form-item>
				
					<el-form-item label="配货数量：">
						<el-row>
							<el-col :span="24">
								<template v-for="item in battery">
									<span class="battery" :key="item.id">{{item.mode}}</span>									
									<el-input-number @change="handleChange1"
										:min="0" label="描述文字" @blur="changeBlur" v-model="item.num"></el-input-number>
								</template>
							</el-col>
						</el-row>
					</el-form-item>

					<el-form-item label="已缴保证金：">
						<el-row>
							<el-col :span="24">
								<el-form-item label="￥" label-width="20px">
									<el-input v-model="form.platbond" placeholder="请输入保证金" clearable></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form-item>

					<el-form-item label="所属运营商：">
						<template>
							<el-select v-model="oname" placeholder="请选择" @change="handled(oname)">
								<el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
								</el-option>
							</el-select>
						</template>
					</el-form-item>

					<el-form-item>
							<el-button type="warning" class="btnStyle" @click="submitForm">保存</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>

	</div>
</template>

<script>
	import Vue from 'vue'
	import Distpicker from 'v-distpicker'

	export default {
		data() {
			return {
				id:"",//网点id
				form: {},
				tableData:[],
				status:'0',
				valueTime:[],//加盟有效期			
				options: [],	
				oname:'',
				selects: { province: '河南省', city: '郑州市', areas: '二七区' },
				battery:[],
				bateryList:[]

			}

		},
		methods: {			
			
			handleChange(val) {//启用禁用				
				this.form.status= val;
			},
			onSelected(data) {//省市县选择
				console.log(data.province.value + ' | ' + data.city.value + ' | ' + data.area.value);
				this.form.provincename = data.province.value;					
				this.form.cityname = data.city.value;
				this.form.countyname = data.area.value;
			},
			handleTime(v){//加盟有效期
				console.log(v);
				this.form.signtimebegin = v[0];
				this.form.signtimeend = v[1];
			},
			handled(val){//运营商选中值变化触发 参数为选中值id
				this.form.operatorid = val;					
			},
			handleChange1(){//配货数量	
				
			},
			changeBlur(event){
				console.log(event)
			},
			submitForm(){
		  	
		    },
		
	        getOperator(){
		      this.$get('operAdmin/getAll',{
						pageSize:100	
					}).then(data=>{
					this.options = data.datas;
	    		})
		    },
		    getBattery(){ 
		      this.$get('shop/skipAddShop',{
						pageSize:100,
						putway:0
					}).then(data=>{
					this.battery= data.datas;
	    		})
		    }
		  
    	},
		components: {
			'v-distpicker': Distpicker
		},
		mounted: function() {
			this.getOperator();
			this.getBattery();
			this.form.status = this.status;
		}

	}
</script>

<style scoped>
	.changeInfo{box-sizing:border-box;padding:10px 0 0 10px;}
	.el-input-number{margin-right:22px;}
	.battery {background: #F4F6F9;color: #58595D;border: #D8DBE3 1px solid;	padding: 11px;border-radius:4px;}	
	.el-select {width: 100%;}
	.el-date-editor--daterange.el-input__inner {width: 100%;}
	.el-input-number {width: 120px;}
	.distpicker-address-wrapper select {width: 32.8%;}	
	.changeInfo .el-table td{padding:4px 0;}
	.changeInfo .el-table th{padding:0;background:#ADB4B9;color:#252C30;}	
	.changeInfo .el-table{font-size:14px;}
	.changeInfo .el-col-offset-2{margin-left:10px;}
</style>