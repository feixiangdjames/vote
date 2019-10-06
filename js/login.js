let loginRender = (function ($) {
    let $userName=$('#userName'),
        $userPass=$('#userPass'),
        $submit=$('#submit');
    let fromURL=utils.queryURLParams()['fromURL'];
    fromURL?fromURL=decodeURIComponent(fromURL):fromURL='index.html';
    let summitFn=function summitFn() {
        axios.post('/login',{
            name:$userName.val().trim(),
            password:hex_md5($userPass.val().trim())
        }).then(result=>{
            let code=parseFloat(result.code);
               if(code===0){

                   window.location.href=fromURL;
                   return;
               }
               alert('请检查登录用户名或密码，登录失败')
        })
    };
    return {
        init: function () {
            $submit.tap(summitFn);
        }
    }
})(Zepto);
loginRender.init();