
import axios from 'axios'
import { Message } from 'element-ui'
import qs from 'qs'
import router from '../../router/index'
// 全局配置对象
var GLOBALconfig = {};
var serverconfig = {
  /*服务器后台地址*/
  // 'serviceIP': 'http://www.tianniu.net.cn/',
  /*测试服务器地址*/
  'serviceIP': 'http://192.168.0.101:8080/',
};
// 接口请求地址、后缀
var http_api = {
  agent: 'platform/'
};
// 后端 接口请求地址
var url_api = {
  agent: serverconfig.serviceIP + http_api.agent // 网点端 api
};
// 暴露全局变量作用
GLOBALconfig.agent_api = url_api.agent; //API 请求地址

axios.defaults.withCredentials = true;
axios.defaults.timeout = 50000;//axios超时时间
axios.defaults.baseURL=GLOBALconfig.agent_api;
//http request 拦截器
axios.interceptors.request.use(
  config => {
    // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
    // config.data = JSON.stringify(config.data);
    config.headers = {
      'Content-Type':'application/x-www-form-urlencoded'
    }
    // if(token){
    //   config.params = {'token':token}
    // }
    return config;
  },
  error => {
    alert(error);
    return Promise.reject(err);
  }
);


//http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    alert(error);
    return Promise.reject(error)
  }
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */



export function fetch(url,params={},successfn,codefn){
  return new Promise((resolve,reject) => {
    axios.get(url,{
      params:params
    })
    .then(response => {
      resolve(response.data);
      allSuccessFun(response.data,successfn,codefn);
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

 export function post(url,data = {},successfn,codefn){
    let params = new URLSearchParams();
    for(let Key in data){
      params.append(Key,data[Key]);
    }
    return new Promise((resolve,reject) => {
     axios.post(url,params)
        .then(response => {
          resolve(response.data);
          allSuccessFun(response.data,successfn,codefn);
        },err => {
          reject(err)
        })
   })
 }
 //axios 成功返回全局函数
 export function allSuccessFun(res,successfn,codefn) {
  if(res){
    var message = "" || res.message;
    var code = "" || res.code;
    var data = "" || res.data;
    switch (code) {
      case 1:
        successfn(data);
        break;
      case 1007:
        //router.push('/Sign')
        break;
      case 1202:
        alert('用户名或密码错误');
        break;
      default:
        console.log("code = " + code);
        break;
    }
  }
 }