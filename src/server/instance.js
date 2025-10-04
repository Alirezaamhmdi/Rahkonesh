import axios from 'axios';
import axiosRetry from 'axios-retry';
import Cookies from 'js-cookie';


    const auth = Cookies.get('auth.timyer.ir');
    const work = Cookies.get('workspace.timyer.ir');


    const instance =axios.create({
      // baseURL: 'http://localhost:4000 ',
      baseURL: 'https://teamyer-backend.liara.run',
      headers: {
          Authorization: `Bearer ${auth}`,
          "worspacerole": work
      }
  });

    // axiosRetry(instance, {
    //   retries: 10, 
    //   retryDelay: axiosRetry.exponentialDelay,
    //   retryCondition:(error)=>{return error.code === 'ENOTFOUND' | error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED';},
    //   // onRetry:(retryCount, error, requestConfig)=>{console.log("retryCount",retryCount); }
    // });

    instance.interceptors.request.use(function (config) {
        return config;
      }, function (error) {
        if(error.response.data.statusCode==403 || error.response.status==403){
        }
        return Promise.reject(error);
      });

    export default instance;
