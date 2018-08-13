<template>
	<div>
		<div class="flex-wrap flex-vertical outsideBox1">
			<el-row class="contentBox" type="flex" align="middle">
					<template>
						<div class="block">
							<span class="demonstration">选择时段：&nbsp;</span>
							<el-date-picker v-model="valueTime" type="daterange"  range-separator="至" start-placeholder="开始日期" 
								end-placeholder="结束日期" value-format="yyyy-MM-dd" @change="handleTime">
							</el-date-picker>
						</div>
					</template>
				<el-col :span="6">
					<el-button type="warning" size="medium" class="btnStyle" @click="search">查询</el-button>		
				</el-col>
			</el-row>
			
			<div class="contentBox mt-10">
				<p class="tc font-18">租金收入总额</p>
				<p class="tc font-20 fontYellow mt-10">
					<span v-if="renew.amount!=null||renew.reamount!=null ">￥{{renew.amount-renew.reamount}}</span></p>
				<p class="tc font-20 fontYellow mt-10">
					<span v-if="renew.amount==null||renew.reamount==null ">￥0</span></p>
			</div>
			
			<div class="conBottom mt-10 flex-con">						
				<div class="tabCard flex-wrap flex-horizontal">				
					<div v-for="(v,i) in tabItem" @click="changeItem(v,i)" v-bind:class="{actived : i == currentI}">{{v}}</div>
				</div>				
				
				<component v-bind:is="current"></component>
			</div>
		</div>
	</div>
</template>

<script>
	
	import Rentrecord from '@/components/money/rent/Rentrecord'
	import Backrecord from '@/components/money/rent/Backrecord'
	
	export default{
		data(){
			return{
				tabItem:['租金记录','退租记录'],
	      tabComponents:['Rentrecord','Backrecord'],
	      current:'Rentrecord',
	      currentI:'0',
				valueTime:[],
				renew:{},
				begin:'',
				end:''
			}
		},
		methods:{   	
	      changeItem(v,i){
	      	this.currentI = i;
	      	this.current = this.tabComponents[i];
		  },
		  handleTime(v){//日期
				console.log(v);
				this.begin = v[0];
				this.end = v[1];
		  },
		  renewStatist(){
			this.$get('capital/renewStatistics',{
				begin:this.begin,
				end:this.end
			}).then(data=>{
				 var ren = data;
				 this.renew=ren;
			})
		  },
		search(v) {
			this.renewStatist(this.begin, this.end)
		},	  
	  },
	  mounted(){
		this.renewStatist(this.begin,this.end);
	  },
	  created(){	  	
		  this.begin = this.$route.query.begin;
		  this.end = this.$route.query.end;
	  },
	  components:{
		Rentrecord,
		Backrecord
	  }
	}
</script>

<style>
</style>