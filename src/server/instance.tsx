import axios from 'axios';
// import axiosRetry from 'axios-retry';
import Cookies from 'js-cookie';


const auth = Cookies.get('auth.rahkonesh');


const instance = axios.create({
  // baseURL: 'http://localhost:4000 ',
  baseURL: 'http://185.221.237.102:1400',
  headers: {
    Authorization: `Bearer ${auth}`,
  }
});



instance.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  if (error.response.data.statusCode == 403 || error.response.status == 403) {
  }
  return Promise.reject(error);
});

export default instance;
