<template>
	<div>
		<div class="flex-wrap flex-horizontal headBox">
			<div class="contentBox flex-con">
				<h1 class="font-20 tc fontYellow">{{registernum.register}}</h1>
				<p class="font-16 mt-10 tc">注册用户</p>
			</div>
			<div class="contentBox flex-con">
				<h1 class="font-20 tc fontYellow">{{stocknum.six}}</h1>
				<p class="font-16 tc mt-10">60V20A安装用户</p>
			</div>
			<div class="contentBox flex-con">
				<h1 class="font-20 tc fontYellow">{{stocknum.seven}}</h1>
				<p class="font-16 mt-10 tc">72V20A安装用户</p>
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
			
		</div>
	</div>
</template>
<script>
	export default {
    name: '',
    data(){
      return{
				stock:{},
				registernum:{},
				stocknum:{},
				setMealsnum:{}
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
			})
		}
		},
		mounted(){
		this.stockStatist();
		},
    components:{
    	
    }
  }

</script>
<style scope>
.headBox div:nth-child(1),.headBox div:nth-child(3){margin-right:10px;}
.contentBox{padding:20px;}
</style>