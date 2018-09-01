<template>
	<div>
		<!-- <div class="flex-wrap flex-horizontal headBox">
			<div class="contentBox flex-con">
				<h1 class="font-20 tc fontYellow">{{registernum.register}}</h1>
				<p class="font-16 mt-10 tc">注册用户</p>
			</div>
			<div class="contentBox flex-con" v-for="item in stocknum" :key="item.id">
					<h1 class="font-20 tc fontYellow">{{item.num}}</h1>
					<p class="font-16 tc mt-10">{{item.mode}}</p>
			</div>		
		</div>

		<div class="flex-wrap flex-horizontal headBox">
			<div class="contentBox flex-con">
				<h1 class="font-20 tc fontYellow">{{usernum.num}}</h1>
				<p class="font-16 mt-10 tc">在租用户</p>
			</div>
			<div class="contentBox flex-con">
				<h1 class="font-20 tc fontYellow">{{setMealsnum.monthlyrent}}</h1>
				<p class="font-16 mt-10 tc">续租-月租</p>
			</div>
			<div class="contentBox flex-con">
				<h1 class="font-20 tc fontYellow">{{setMealsnum.seasonrent}}</h1>
				<p class="font-16 mt-10 tc">续租-季租</p>
			</div>
			<div class="contentBox flex-con">
				<h1 class="font-20 tc fontYellow">{{setMealsnum.annualrent}}</h1>
				<p class="font-16 mt-10 tc">续租-年租</p>
			</div>
		</div> -->
		<el-row class="headBox">
			<el-col :span="4" class="bor">
				<el-row class="user-left user-left-top">
					<el-col>
						<h1 class="num-size tc fontYellow">{{usernum.num}}</h1>
						<p class="font-16  tc">在租用户</p>
					</el-col>
				</el-row>
				<el-row class="user-left">
					<el-col>
						<h1 class="num-size tc fontYellow">{{registernum.register}}</h1>
						<p class="font-16  tc">注册用户</p>
					</el-col>
				</el-row>
			</el-col>
			<el-col :span="19" class="right-mar">
				<el-row type="flex" class="row-bg bor" justify="space-around">
					<el-col class="rig-padd"  v-for="item in stocknum" :key="item.id">
						<h1 class="num-size tc fontYellow">{{item.num}}</h1>
						<p class="font-16 tc">{{item.mode}}</p>
					</el-col>
				</el-row>
				<el-row class="bor num-rig-bot" type="flex" justify="center" align='middle'>
					<el-col span="5" class="user-bor-rig">
						<p class="font-16 tc">用户续租数量</p>
					</el-col>
					<el-col span="19">
						<el-row type="flex"  justify="space-around">
							<el-col class="rig-padd">
								<h1 class="num-size tc fontYellow">{{setMealsnum.monthlyrent}}</h1>
								<p class="font-16 tc">续租-月租</p>
							</el-col>
							<el-col class="rig-padd">
								<h1 class="num-size tc fontYellow">{{setMealsnum.seasonrent}}</h1>
								<p class="font-16 tc">续租-季租</p>
							</el-col>
							<el-col class="rig-padd">
								<h1 class="num-size tc fontYellow">{{setMealsnum.annualrent}}</h1>
								<p class="font-16 tc">续租-年租</p>
							</el-col>
						</el-row>
					</el-col>
				</el-row>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	export default {
    name: '',
    data(){
      return{
		  	navtitle:'统计>用户统计',
				stock:{},
				registernum:{},
				stocknum:{},
				setMealsnum:{},
				usernum:{}
      }
    },
    methods:{
      stockStatist(){
			this.$get('reportform/selectCustomerstocknum',{
			}).then(data=>{
				this.stock = data;
				this.registernum =	data.registernum;
				this.stocknum = data.stocknum;
				this.setMealsnum = data.setMealsnum;
				this.usernum = data.usernum;
			})
		}
		},
		mounted(){
		this.stockStatist();
		this.$sendTitle(this.navtitle);
		},
    components:{
    	
    }
  }

</script>
<style scope>
.right-mar{
	margin-left:10px 
}
.contentBox{padding:20px;}
.bor{border: 1px solid #E9EEF3}
.user-left{
	padding: 20px 10px;
	margin: 0 10px 
}
.num-size{
	font-size: 23px
}
.user-left-top{
	border-bottom: 1px solid  #E9EEF3
}
.rig-padd{
	padding: 18px 0
}
.right-num{
	height: 100%;
	display: flex;
	align-items:center;
	justify-content:center
}
.user-bor-rig{
	border-right: 1px solid #E9EEF3;
	padding: 20px 0
}
.num-rig-bot{
	margin-top:10px 
}
</style>