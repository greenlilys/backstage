
<template>
	<div>	
	<div class="bw hf changeInfo">
		<el-row>
			<el-col :span="12">
				<el-form ref="form" :model="form" label-width="140px">
					<el-form-item label="店主姓名：">
						<el-input v-model="form.contactname"></el-input>
					</el-form-item>
					<el-form-item label="联系电话：">
						<el-input v-model="form.contactcellphone"></el-input>
					</el-form-item>
					<el-form-item label="身份证号码：">
						<el-input v-model="form.contactno"></el-input>
					</el-form-item>
					<el-form-item label="店铺名称：">
						<el-input v-model="form.shopName"></el-input>
					</el-form-item>
					<el-form-item label="店铺编号：">
						<el-input v-model="form.no"></el-input>
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
								<el-input v-model="form.x" placeholder="经度坐标"></el-input>								
							</el-col>
							<el-col :span="11" :offset="2">								
								<el-input v-model="form.y" placeholder="纬度坐标"></el-input>								
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
					<el-form-item label="手机账号：">
						<el-input v-model="form.username" disabled></el-input>
					</el-form-item>
					<el-form-item label="账号状态：">							
						<el-radio-group v-model="status" @change="handleChange">
						  <el-radio  label="0">启用</el-radio>
						  <el-radio  label="1">禁用</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="配货数量：">	
								<el-table :data="tableData" style="width: 100%;">
									<el-table-column prop="name" label="电池套餐名称" width="200" align="center">
									</el-table-column>
									<el-table-column prop="mode" label="电池型号" width="130" align="center">
									</el-table-column>
									<el-table-column prop="groupnum" label="套餐电池数量" align="center">
									</el-table-column>
									<el-table-column prop="distrinum" label="配货数量" align="center">
									</el-table-column>									
								</el-table>							
						
					</el-form-item>

					<el-form-item label="已缴保证金（￥）：">						
						<el-input v-model="form.platbond" placeholder="请输入内容"></el-input>								
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
						<el-row>
							<el-button type="warning" @click="submitForm">保存</el-button>
						</el-row>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>

	</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	//省市县选择器
	import VDistpicker  from 'v-distpicker'

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
				selects: { province: '广东省', city: '广州市', area: '海珠区' }
				
			}

		},
		methods: {
			
			handleChange(val) {//启用禁用				
				this.form.status= val;
			},
			handled(val){//运营商选中值变化触发 参数为选中值id
				this.form.operatorid = val;				
			},
			handleTime(v){//加盟有效期
				console.log(v);
				this.form.signtimebegin = v[0];
				this.form.signtimeend = v[1];
			},
			
			getAll(num){//获取所有运营商
				this.$get('operAdmin/getAll',{
						pageSize:num	
					}).then(data=>{
					this.options = data.datas;
	    		})
			},
			onSelected(data) {//省市县
//				console.log(data.province.value + ' | ' + data.city.value + ' | ' + data.area.value)				
				this.form.provincename = data.province.value;					
				this.form.cityname = data.city.value;
				this.form.countyname = data.area.value;			

			},
			getShopDetail(id){//获取表单信息
				this.$get('shop/joinShopDetail',{
				id:id
				}).then(data=>{	
					
					this.tableData = data.batteryList;
					this.selects.province = data.provincename;
					this.selects.city = data.cityname;
					this.selects.areas = data.countyname;
					this.form.userId = data.userid;
					this.form.contactname = data.contactname;
					this.form.contactcellphone = data.contactcellphone;
					this.form.contactno = data.contactno;
					this.form.shopName = data.name;
					this.form.username = data.username;
					this.form.no = data.no;					
					this.form.address = data.address;
					this.form.x = data.x;
					this.form.y = data.y;
					this.form.status= this.status = data.status.toString();
					this.form.platbond = data.platbond;	
					this.form.operatorid = data.operatorid;//默认运营商id
					this.oname = data.oname;//默认运营商
					this.form.signtimebegin = data.signtimebegin;
					this.form.signtimeend = data.signtimeend;
					this.$set(this.valueTime,0,data.signtimebegin);
					this.$set(this.valueTime,1,data.signtimeend);
				
				})
			},
			submitForm(){//提交表单
				var form = this.form;
				var id = this.id;
				this.$post('shop/updateShopDetail',form).then(data=>{
					this.$ye('保存成功');
					this.getShopDetail(id);//重新渲染数据
				})
			}
		},
		created(){
			this.id = this.form.id = this.$route.query.id;			
		},
		components: {
			VDistpicker 
		},
		mounted: function() {
			this.getShopDetail(this.id);
			this.getAll(100);
		}

	}
</script>

<style scoped>		
	.changeInfo{box-sizing:border-box;padding:10px 0 0 10px;}
	.battery {background: #F4F6F9;color: #58595D;border: #D8DBE3 1px solid;	padding: 11px;}
	.el-form-item {	margin-bottom: 9px;}
	.el-select {width: 100%;}
	.el-date-editor--daterange.el-input__inner {width: 100%;}
	.el-input-number {width: 120px;}
	.distpicker-address-wrapper select {width: 32.8%;}	
		
</style>