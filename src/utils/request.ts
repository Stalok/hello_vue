import axios from "axios";
import {ElMessage} from "element-plus";

//创建axios实例
const service = axios.create({
  baseURL: "https://localhost:9090", //请求的基础路径
  timeout: 5000, //超时时间
  headers: {
    //编译语言
    "Content-type": "application/json;charset=utf-8",
  },
});

//请求拦截
service.interceptors.request.use(
  (config) => {
    //请求的数据
    config.headers = config.headers || {}; // 没有数据的话就设置为空
    if (localStorage.getItem("Authorization")) {
      //先确保登录
      config.headers.Authorization = localStorage.getItem("Authorization") || "";
    }
    return config; //必须返回出去，不然请求发不出去
  },
  (error) => {
    //处理错误请求
    return Promise.reject(error);
  }
);

//响应拦截：后端返回来的结果
// service.interceptors.response.use(
//   (res) => {
//     // const code: number = res.status;
//     //   console.log(res.data);
//       // if(code === 200){
//       //     return res.data;
//       // } else {
//       //     ElMessage.error(res.data);
//       // }
//     // const data = res.data; //data是后端返回的数据
//     //   return data; //返回出去
//     //   console.log(Promise.resolve(res.data));
//       return res.data;
//   },
//   (err) => {
//     //处理错误响应
//       ElMessage.error(err.response.data);
//     return ;
//   }
// );
//因为别的地方要用，所以就把实例暴露出去，导出
export default service;
