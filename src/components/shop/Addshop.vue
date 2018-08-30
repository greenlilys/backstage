
<template>
	<div>
		<div class="hf bw">
		<el-row class="changeInfo">
			<el-col :span="12">
				<el-form ref="form" :model="form" label-width="150px">
					<h5 class="fonttitle">基本信息</h5>
					<el-form-item label="店主姓名：">
						<el-input v-model="form.contactname" clearable></el-input>
					</el-form-item>
					<el-form-item label="联系电话：">
						<el-input v-model="form.contactcellphone" clearable></el-input>
					</el-form-item>
					<el-form-item label="身份证号码：">
						<el-input v-model="form.contactno" clearable></el-input>
					</el-form-item>
					<h5 class="fonttitle">店铺信息</h5>
					<el-form-item label="店铺名称：">
						<el-input v-model="form.shopName" clearable></el-input>
					</el-form-item>
					<el-form-item label="店铺编号：">
						<el-input v-model="form.no" clearable></el-input>
					</el-form-item>
					<el-form-item label="店铺所在地区：">
						<template>
							<v-distpicker @selected="onSelected"></v-distpicker>
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
									end-placeholder="结束日期" value-format="yyyy-MM-dd">
								</el-date-picker>
							</div>
						</template>
					</el-form-item>
					<h5 class="fonttitle">店铺端账号</h5>
					<el-form-item label="账号：">
						<el-input v-model="form.username" clearable></el-input>
					</el-form-item>
					<el-form-item label="密码：">
						<el-input v-model="form.password1" clearable></el-input>
					</el-form-item>
					<el-form-item label="确认密码：">
						<el-input v-model="form.password2" @change="handleword2" clearable></el-input>
					</el-form-item>
					<h5 class="fonttitle">店铺配货</h5>				
					<el-form-item label="配货数量：">
						<el-row>
							<el-col :span="24">
								<template v-for="item in battery">
									<div class="peinum">
										<span class="battery" :key="item.id">{{item.mode}}</span>									
										<el-input-number @change="handleChange1"
										:min="0" label="描述文字" v-model="item.num"></el-input-number>
									</div>									
								</template>
							</el-col>
						</el-row>
					</el-form-item>
					<h5 class="fonttitle">保证金/配货成本</h5>
					<el-form-item label="已缴保证金（￥）：">												
							<el-input v-model="form.platbond" placeholder="请输入保证金" clearable></el-input>
					</el-form-item>
					<h5 class="fonttitle">归属运营商</h5>
					<el-form-item label="所属运营商：">
						<template>
							<el-select v-model="operatorid" placeholder="请选择">
								<el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
								</el-option>
							</el-select>
						</template>
					</el-form-item>

					<el-form-item>
							<el-button type="success" @click="submitForm">保存</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		</div>
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
				valueTime:[],//加盟有效期	
				provincename:'',
				cityname:'',
				countyname:'',
				options: [],//所属运营商数据
				operatorid:'',//选中所属运营商id
				battery:[]//配货型号
			}
		},
		methods: {	
			
			submitForm(){//保存
				let battery = this.battery;			
				let arr = [];				
				for(var i =0,len=battery.length;i<len;i++){
					let obj = {};
					if(!battery[i].num){
					}else{
						obj.id = battery[i].id;
						obj.price = battery[i].pickcost;
						obj.num = battery[i].num;
						arr.push(obj);
					}
				}
				let arrs = JSON.stringify(arr);
				console.log(JSON.stringify(arr));
				console.log(JSON.stringify(this.valueTime));
				console.log(JSON.stringify(this.form))
		  		this.$post('shop/addShop',{
		  			username:this.form.username,
		  			password:this.form.password2,
		  			shopName:this.form.shopName,
		  			no:this.form.no,
		  			provincename:this.provincename,
		  			cityname:this.cityname,
		  			countyname:this.countyname,
		  			address:this.form.address,
		  			x:this.form.x,
		  			y:this.form.y,
		  			signtimebegin:this.valueTime[0],
		  			signtimeend:this.valueTime[1],
		  			contactname:this.form.contactname,
		  			contactcellphone:this.form.contactcellphone,
		  			platbond:this.form.platbond,
		  			operatorid:this.operatorid,
		  			contactno:this.form.contactno,
		  			batterylist:arrs
		  		}).then(data=>{
		  			this.$ye('保存成功');
		  		})
		    },
		 
		    handleword2(v){		    	
		    	if(this.form.password1 == '' || this.form.password1 != v) {
					this.$fail('密码输入不一致！')
				} 
		    },
			onSelected(data) {//省市县选择
				if(data.province.value != '省' && data.city.value != '市' && data.area.value != '区') {
					this.provincename = data.province.value;					
					this.cityname = data.city.value;
					this.countyname = data.area.value;
				}
				
			},
			handleChange1(v){//配货数量	
				
			},			
	        getOperator(){//所属运营商列表
		      this.$get('operAdmin/getAll',{
						pageSize:100	
					}).then(data=>{
					this.options = data.datas;
	    		})
		    },
		    getBattery(){ //电池配货型号
		      this.$get('battery/selectList',{
						pageSize:100						
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
	
	.peinum{display:inline-block;padding-top:6px;}
	.el-form-item{margin-bottom:8px;}
</style>