
import axios from 'axios'
import { Message,Loading } from 'element-ui'
import qs from 'qs'
import router from '../../router/index'
import Vue from 'vue'
// 全局配置对象
export var GLOBALconfig = {};
var serverconfig = {
	/*服务器后台地址*/
	// 管理后台
//   'serviceIP': 'http://test.tianniu.net.cn/',
  /*测试服务器地址*/
'serviceIP': 'http://192.168.0.106:8080/'
 
};
// 接口请求地址、后缀
var http_api = {
	//天牛平台虚拟目录
   agent: 'platform/',
//    agent: 'oper/'


};
// 后端 接口请求地址
var url_api = {
	// 网点端 api
  agent: serverconfig.serviceIP + http_api.agent 
};
// 暴露全局变量作用
GLOBALconfig.agent_api = url_api.agent; //API 请求地址	

axios.defaults.withCredentials = true;//允许cookei跨域
axios.defaults.timeout = 50000;//请求超时时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = GLOBALconfig.agent_api;


var loadingInstance;
axios.interceptors.request.use(
  config => { 
	  	loadingInstance = Loading.service({
	  		background:'rgba(0,0,0,0)'
	  	});
	
			if(config.method == 'get'){
				console.log(config.params);
			}else{
				console.log(config);
			}
  	
    	return config;
  },
  error => { 
	  	loadingInstance.close(); 
	  	Message.error({message: '加载超时'});
	    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  (res) => {
	  	loadingInstance.close();
	  	//控制台打印请求接口返回数据
	  	console.log(res.config.url);
	  	console.log(res.data);	 
	  	
	  	if(res.data.code == 1007){
	  		console.log("登录超时");	  		
				Message({
			  		type:'error',
			  		message:res.data.code + res.data.message
			  	})
				router.replace({path:'/Sign'});
	  		return false;
	  	}
	  	if(res.data.code != 1){
	  		console.log("返回code不是1");
				Message({
			  		type:'error',
			  		message:"错误："+res.data.code + "错误信息："+res.data.message
			  	})
	  		return false;
	  	}
	    return res;
  },
  error => { 
  	loadingInstance.close();
		if(error && error.response){			
					switch(error.response.status){
					case 400:
				  error.message = '400：请求错误'
				  break;
				  case 401:
				  error.message = '401：未授权，请登录'
				  break;
				  case 403:
				  error.message = '403：拒绝访问'
				  break;
				  case 404:
				  error.message = '404:请求地址出错'
				  break;
				  case 408:
				  error.message = '408：请求超时'
				  break;
				  case 500:
				  error.message = '500：服务器内部错误'
				  break;
				  case 501:
				  error.message = '501：服务未实现'
				  break;
				  case 502:
				  error.message = '502：网关错误'
				  break;
				  case 503:
				  error.message = '503：服务不可用'
				  break;
				  case 504:
				  error.message = '504：网关超时'
				  break;
				  case 505:
				  error.message = '505：HTTP版本不受支持'
				  break;
				  dafault:
				  error.message = '网络错误'
				}
				Message.error({message:error.message});
					
		}   
     return Promise.reject(error)
  }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */


export function httpGet(url,params){
  return new Promise((resolve,reject) => {
    axios.get(url,{
      params:params
    })
    .then(res => {
      resolve(res.data.data);
      
    })
    .catch(err => {
      reject(err)
    })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */


 export function httpPost(url,data){
    let params = new URLSearchParams();
    for(let Key in data){
      params.append(Key,data[Key]);
    }
    return new Promise((resolve,reject) => {
     axios.post(url,params)
        .then(res => {
          resolve(res.data.data);          
        },err => {        	
          reject(err)
        })
   })
 }
 
 /**
 * 成功提示
 */

  export function ye(msg){
  	var msg = msg || '操作成功';
  		  Message({
	      			type:'success',
	      			message:msg
	      		})
  }
  
   /**
 * 失败提示
 */

  export function fail(msg){  	
  		  Message({
	      			type:'error',
	      			message:msg
	      		})
  }
  
  
 /**
 * 输入金额正则验证
 */
  export let exp = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
    
  export let bus = new Vue();
  
  
  export function sendTitle(str) {
				this.$bus.$emit('getTitle', str);
	}
  
  



