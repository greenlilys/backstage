
<template>
	<div>
		<div class="hf p-10 boxborder bw">	
    	<el-row>
			<el-form ref="form" :model="form" label-width="140px">
			    <el-col :span="11">	
                    <el-form-item label="选择时间：：">
                        <el-date-picker v-model="valueTime" type="datetimerange"  range-separator="至" start-placeholder="开始时间" 
                            end-placeholder="结束时间" value-format="yyyy-MM-dd HH:mm:ss" @change="handleTime">
                        </el-date-picker>
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
						<el-select v-model="form.type">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
					</el-form-item>
					<el-form-item>
						<el-row>		
							<el-button type="success" @click="addActivity()">保存</el-button>
						</el-row>
					</el-form-item>
			    </el-col>
			</el-form>
		</el-row>
		</div>
	</div>
</template>

<script>

	export default {
		data() {
			return {
				navtitle:'营销>平台活动>添加活动',
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
				form: {
					type: '',
					isholiday: '',
					isdefault: ''
                },
                begin: '',
                end:'',
                valueTime:''
			}
		},
		methods: {
			handleChange(value) {
				console.log(value);
            },
            handleTime(v){//日期
                console.log(v);
                this.begin = v[0];
                this.end = v[1];	
		     },
			addActivity(){     
				this.$post('platformActivity/addUserActivity',{
					type:this.form.type,
					isholiday:this.form.isholiday,
					isdefault:this.form.isdefault,
					startTime:this.begin,
                    endTime:this.end,
                    state:1
				}).then(data=>{
					this.$ye();
					this.$router.push('/Main/Listactivity');
				})
			}   
		},
		mounted:function(){
			this.$sendTitle(this.navtitle);
		}
	}
</script>

<style scoped>
	
    /*输入框下间距样式重置*/
	.el-form-item {	margin-bottom: 10px;}
</style>