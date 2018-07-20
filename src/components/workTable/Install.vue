<template>
	<div id="main" class="flex-con"></div>
</template>

<script>
	export default {
		data(){
			return{
				
			}
		},
		methods:{
			
		},
		mounted() {
			var echarts = require('echarts');
			var myChart = echarts.init(document.getElementById('main'));
			console.log(myChart)
			var option = {
				//	        	title:{
				//	        		show:true,
				//	        		text:'安装数据折线图',
				//	        		left:0,
				//	        		textStyle:{
				//	        			color:'#293C55',
				//	        			fontSize:16
				//	        		}
				//	        	},        	
				xAxis: {
					type: 'category',
					data: ['10月1号', '10月2号', '10月3号', '10月4号', '10月5号', '10月6号', '10月7号']
				},
				yAxis: {
					type: 'value'
				},
				series: [{
					data: [10, 30, 20, 50, 10, 24, 26],
					//	        		data: (function(){
					//	        			var list = [];
					//	        			for(var i =0;i<10; i++){
					//	        				list.push(i + 10 + '');
					//	        			}
					//	        			return list;
					//	        		})(),
					type: 'line'
				}]
			};

			myChart.setOption(option)
		}
	}
</script>

<style>
</style>