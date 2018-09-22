<template>
	<div>	
		<div class="flex-wrap flex-vertical hf">		
			  	<ul class="tabItem flex-wrap flex-horizontal flex-justify-between">
						<li class="flex-wrap flex-vertical  flex-align-center flex-con"><span>今日注册</span><span>{{registerNum}}</span></li>						
						<li class="flex-wrap flex-vertical  flex-align-center flex-con"><span>今日安装</span><span>{{installNum}}</span></li>
						<li class="flex-wrap flex-vertical  flex-align-center flex-con"><span>今日换电</span><span>{{replaceNum}}</span></li>
						<li class="flex-wrap flex-vertical  flex-align-center flex-con"><span>今日退租</span><span>{{retireNum}}</span></li>	
						<li class="flex-wrap flex-vertical  flex-align-center flex-con"><span>今日租车</span><span>{{installTramCount}}</span></li>
				</ul>	
				<div class="p-10 boxborder bw mt-10">
					<div class="tabCard clear">					
							<div v-for="(item,dataType) in tabItem" @click="changeItem(dataType,timeType)" :class="[currentI == dataType?'actived':'']">{{item}}</div>
							<ul class="btnStyle" style="margin-top:6px;">
								<li v-for="(item,timeType) in buttonList" :class="[buttonInx == timeType?'actived':'']" @click="isActive(timeType)">{{item}}</li>
							</ul>
					</div>
				</div>
			<div id="main" class="flex-con"></div>
		</div>
	</div>
</template>
<script>

	export default {
		data() {
			return {
				navtitle:'工作台',
				tabItem:['注册','安装','换电','退租','租车'],
				currentI:0,
				buttonList:['本周','本月'],
				buttonInx:0,				
				registerNum:0,
				installNum:0,
				replaceNum:0,
				retireNum:0,
				installTramCount:0,
				
				dateValue:[],
				foldLineValue:[],
				dataType:0,//4：注册，0：安装，1：换电，2：退租
				timeType:0,//0：本周，1：本月
			}
		},

		methods: {
			changeItem(i,j){
				console.log(i,j)
				this.dateValue = [];
				this.foldLineValue = [];
				this.currentI = i;
				this.timeType = j;
				if (i == 0) {
					this.dataType = 4;
				}else if (i == 1) {
					this.dataType = 0;
				}else if (i == 2) {
					this.dataType = 1;
				}else if(i == 3){
					this.dataType = 2;
				}else{
					this.dataType = 3;
				}
				this.$get('main/info',{
					dataType:this.dataType,
					timeType:this.timeType			
				}).then((data)=>{
					this.registerNum  = data.registerToday;
					this.installNum = data.today.installCount;
					this.replaceNum = data.today.replaceCount;
					this.retireNum = data.today.returnCount;
					this.installTramCount = data.today.installTramCount;
					this.sendname(data.nickname);
					
					for(var key in data.foldlineDiagram){
						var date = new Date(data.foldlineDiagram[key].dateValue);
//						console.log((date.getMonth()+1) + "-" + date.getDate());
						var dateScale = (date.getMonth()+1) + "-" + date.getDate();
						this.dateValue.push(dateScale);
						if (this.dataType == 3) {
							this.foldLineValue.push(data.foldlineDiagram[key].newcount);
						}else if (this.dataType == 0) {
							this.foldLineValue.push(data.foldlineDiagram[key].installCount);
						}else if (this.dataType == 1) {
							this.foldLineValue.push(data.foldlineDiagram[key].replaceCount);
						}else if (this.dataType == 2){
							this.foldLineValue.push(data.foldlineDiagram[key].returnCount);
						}
					}
					var echarts = require('echarts');
					var myChart = echarts.init(document.getElementById('main'));
					var option = {
						tooltip: {
					        trigger: 'axis',
					        // borderColor:'#3E8EB7',
					        // backgroundColor:'#3E8EB7',
					    },  	
						xAxis: {
							type: 'category',
		        			boundaryGap: false,
							data: this.dateValue,
						},
						yAxis: {
							type: 'value',
							// axisLabel: {show:false,},
					        // axisTick: {show:false,},
					        splitLine:{show: false},
						},
						series: [{
							data: this.foldLineValue,
							type: 'line',
							markPoint: {
				                data: [
				                    {type: 'max', name: '最大值'},
				                    {type: 'min', name: '最小值'}
				                ],
				                itemStyle:{
					            	color:'#3E8EB7',
					            },
				            },
				            itemStyle:{
		                        normal:{
		                            color:'#3E8EB7',
		                            borderColor:'#3E8EB7',  //拐点边框颜色
		                        }
		                    },
				            lineStyle:{
				            	color:'#3E8EB7',
				            }

						}]
					};
					myChart.setOption(option)
				})
			},
			sendname(nickname){//用户名
				this.$bus.$emit('getname',nickname);
			},
			isActive(timeType){
				this.buttonInx = timeType;
				this.changeItem(this.currentI,this.buttonInx);
			}
		},
		
		mounted() {
			this.changeItem(0,0);
			this.$sendTitle(this.navtitle);//当前位置
		}
	}
</script>
<style scoped>

.tabItem{width:100%;margin:0 auto;}
.tabItem li{height:120px;background:#fff;margin-right:10px;}
.tabItem li:nth-child(5){margin-right:0;}
.tabItem li span:nth-child(2){font-size:38px;color:#FF6600;margin-top:20px;}
.tabItem li span:nth-child(1){	font-size:16px;	font-weight:bold;margin-top:10px;}
.tabItem span{	display:block;}

.tabCard{background:#fff;border-top:2px solid #FF9900;width:100%;line-height: 26px;}
.tabCard div{float:left;font-size:16px;padding:10px 20px;background:#fff;cursor: pointer;}
.tabCard .actived{background:#FF9900;color:#fff;}
.tabCard .btnStyle{float:right;margin-right:10px;}

#main{width:100%;margin:0 auto 0;background:#fff;}
.tabCard ul{background: #fff; border: 1px solid #ebf0f4;}
.tabCard ul li{list-style: none;float: left;text-align: center;color: #000;width: 60px;cursor:pointer;}
</style>