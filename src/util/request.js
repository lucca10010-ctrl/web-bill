import axios from "axios";


const request = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://192.168.31.140:8888',
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' },
});
request.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        config.headers.test = 'hello';
         // ✅ 必须返回配置对象
         return config;
    },
    error => {
        console.log('Request Error:', error);
        return Promise.reject(error);
    }
);

request.interceptors.response.use(
    response => {
        if (response.status >= 200 && response.status < 300) {
            console.log('Response:', response);
            return response.data;
        } else {
            return Promise.reject(response.data);
        }
    },
    error => {
        console.log('Response Error:', error);
        if (error.response?.status === 401) {
            window.location.href = '/'
        }
        return Promise.reject(error);
    }
);

export default request;