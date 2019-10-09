let detailRender = (function ($) {
    let $mainBox=$('.mainBox'),
        $header=$mainBox.find('.headerBox');
        $tip=$header.find('.tip');
    console.log(utils.queryURLParams());
    let userId=utils.queryURLParams()['userId'];
            /*getData*/
    let queryData=function queryData() {
      axios.get('/getUser',{
          params:{userId}
      }).then(bindHTML);
    };
    let bindHTML=function (result) {
        let {code,data}=result;
        if(code!==0){
            $tip.css('display','block');
            return;
        }
        let{id,name,picture,sex,phone,bio,slogan,voteNum}=data;
        let $frg=$(document.createDocumentFragment());
        $frg.append(`<div class="userInfo">
            <img src="${picture}" alt="picture" class="picture">
            <p class="info">
                <span>${name}</span>
                <span>${id}</span>
            </p>
            <p class="bio">${bio}</p>
            <div class="vote">${voteNum}</div>
        </div>
        <div class="slogan">${slogan}</div>`);
        $header.find('.voteBtn').before($frg);
        $frg=null;
    };
    return {
        init: function () {
            queryData();
        }
    }
})(Zepto);
detailRender.init();