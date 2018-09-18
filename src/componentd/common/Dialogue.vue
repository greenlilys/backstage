<template>
			<el-dialog
			  title="提示"
			  :visible.sync="dialogVisible"
			  :before-close="handleClose"
			  width="30%"
			  >
			  <span>{{textContent}}</span>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="cancel">取 消</el-button>
			    <el-button type="primary" @click="confirm">确 定</el-button>
			   </span>
			  </span>
			</el-dialog>
</template>

<script>
	export default {
		name:'Dialogue',
		data(){
			return{
				
			}
		},
		props:['textContent','dialogVisible','title'],
		methods:{
			confirm(){
				this.$emit('confirm')
			},
			cancel(){
				this.$emit('cancel')
			},
			handleClose(){
				this.$emit('cancel')
			}
		}
	}
</script>

<style>
</style>