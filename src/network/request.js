import axios from "axios";
export function request(config) {
  // 1.创建 axios 实例
  const instance = axios.create({
    baseURL: "http://152.136.185.210:7878/api/m5",
    // baseURL: "http://123.207.32.32:8000",
    timeout: 5000
  });

  // 2. 拦截器
  instance.interceptors.request.use(
    config => {
      // console.log(config);
      return config;
    },
    error => {
      console.log(error);
    }
  );

  // 3.发送请求
  return instance(config);
}
