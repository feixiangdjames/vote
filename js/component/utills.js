let utils = (function () {
    /*url解析*/
    let queryURLParams=function (url=window.location.href) {
        let obj={},
            reg=/([^?=&#]+)=([^?=&#]+)/g;/*全局*/
            url.replace(reg,(...arg)=>{
                console.log(reg);
               let [,key,value]=arg;
               obj[key]=value;
               /*no hash deal*/
            });
             return obj
    };
    return {
      queryURLParams
    }
})();

