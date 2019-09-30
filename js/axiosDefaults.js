if('undefined'!==typeof axios) {
    axios.defaults.baseURL = 'http://localhost:8000/';
    axios.defaults.withCredentials=true;
    axios.defaults.transformRequest = data => {
        let str = ``;
        if (data && typeof data === 'object') {
            for (let attr in data) {
                if (data.hasOwnProperty(attr)) {
                    str += `${attr}=${data[attr]}&`;
                }
            }
        }
        return str.substring(0, str.length - 1);
    };
    axios.defaults.headers['Content-Type']='x-www-form-urlencoded';/*请求头*/
    axios.interceptors.response.use(result=>result.data);/*拦截器  */
}