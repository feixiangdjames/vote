/*
* navigator:引入导航页面，可以动态在页面中mainBox创建NAV-BOX，并且完成业务操作
* 1.进入到登陆页面或注册页面，记录fromurl,当登陆或者注册成功的时候，跳转回当前页面。
* 2.验证是否已经登陆展示不同信息。
* 3.完成其余业务：退出，点击用户进入到详情页面
* */
$(function anonymous() {
    /*页面完成加载后，再执行*/
    let $mainBox = $('.mainBox'),
        $navBox = null,
        $navList = null;
    /*登陆检测*/
    axios.get('/checkLogin').then(result => {
        let code = parseFloat(result.code);
        $mainBox.prepend(`<nav class="navBox">
            <a href="index.html">首页</a>
${code === 0 ? `<a href="javascript:;">登录</a><a href="javascript:;">注册</a>` : `<a href="detail.html"></a><a href="javascript:;">退出</a>`}</nav>`);
        $navBox = $mainBox.find('navBox');
        $navList = $navBox.find('a');
        return code;
    }).then(result => {
            if (result === 0) return;
            return axios.get('/getUser');
        }
    ).then(result => {
            if (typeof result !== 'undefined') {
                let {data: {name}} = result;
                $navList.eq(1).html(name);
            }
        }
    ).then(() => {
        $mainBox.tap(function(ev){
                 let target = ev.target,
                    tarTag = target.tagName,
                    tarInn = target.innerHTML;
      /*          if (tarTag !== 'A') return;*/
                if (tarInn === '登录') {
                    window.location.href = `login.html?fromURL=${encodeURIComponent(window.location.href)}`;
                    return;
                }
                if (tarInn === '注册') {
                    window.location.href = `register.html?fromURL=${encodeURIComponent(window.location.href)}`;
                    return;
                }
                if (tarInn === '退出') {
                    axios.get('/exitLogin');
                    window.location.href = window.location.href;
                    return;
                }
            });
        }
    );
});
