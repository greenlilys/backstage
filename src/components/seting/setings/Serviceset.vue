<template>
	<div>
		<div class="contentBox">
			
			<div class="mb-10">
				<span class="font-14">预约可选周期：</span>
				<el-tag
				  :key="tag"
				  v-for="tag in dynamicTags"
				  closable
				  :disable-transitions="false"
				  @close="handleClose(tag)">
				  {{tag}}
				</el-tag>
				<el-input
				  class="input-new-tag"
				  v-if="inputVisible"
				  v-model="inputValue"
				  ref="saveTagInput"
				  size="small"
				  @keyup.enter.native="handleInputConfirm"
				  @blur="handleInputConfirm"
				>
				</el-input>
				<el-button v-else type="primary" size="small" class="button-new-tag btnStyle" @click="showInput">添加可选周期项</el-button>	
		
			</div>
		</div>
	
		<div>
			<el-form ref="form" :model="form" label-width="270px">
				
			<el-row class="mt-10 contentBox">
				<el-col :span="10">
						<el-form-item label="安装预约服务完成后返利：">												
						</el-form-item>
						<el-form-item label="月租返利（元）：">
							<el-input v-model="form.name" placeholder="555"></el-input>						
						</el-form-item>
						<el-form-item label="季租返利（元）：">
							<el-input v-model="form.name" placeholder="555"></el-input>						
						</el-form-item>
						<el-form-item label="年租返利（元）：">
							<el-input v-model="form.name" placeholder="555"></el-input>						
						</el-form-item>
				</el-col>
			</el-row>
			
			<el-row class="mt-10 contentBox">
				<el-col :span="10">
						<el-form-item label="网点服务返利：">												
						</el-form-item>
						<el-form-item label="用户续租后网点返利（元）：">
							<el-input v-model="form.name" placeholder="555"></el-input>						
						</el-form-item>
						<el-form-item label="换电预约服务完成后返利（元）：">
							<el-input v-model="form.name" placeholder="555"></el-input>						
						</el-form-item>
						<el-form-item label="退电预约服务完成后返利（元）：">
							<el-input v-model="form.name" placeholder="555"></el-input>						
						</el-form-item>
						<el-form-item label="网点推荐新用户租用返利（元/人次）：">
							<el-input v-model="form.name" placeholder="555"></el-input>						
						</el-form-item>
				</el-col>
			</el-row>
			
				<el-row class="mt-10 contentBox">
					<el-col :span="10">
							<el-form-item label="网点加盟保证金设置：">												
							</el-form-item>
							<el-form-item label="加盟保证金（元/网点）：" >
								<el-input v-model="form.name" placeholder="555"></el-input>						
							</el-form-item>
							<el-form-item>						
								<el-button type="primary" class="btnStyle" @click="submitForm('ruleForm2')">保存</el-button>						
							</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
		
		
	</div>
</template>

<script>
	export default {
    data() {
      return {
        dynamicTags: ['2小时内', '3小时内', '4小时内'],
        inputVisible: false,
        inputValue: '',
        form: {
					name: '88888',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
      };
    },
    methods: {
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
    }
  }
</script>

<style scoped>

</style>