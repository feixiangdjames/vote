let voteRender = (function ($) {
    let limit=10,
        page=1,
        total=0,/*总条数*/
        pageNum=1,/*总页数*/
        isRun=false,
        search='';
        let $userLIst=$('.userList'),
            $tip=$userLIst.find('.tip'),
            $headerBox=$('.headerBox'),
            $searchBtn=$headerBox.find('.searchBtn'),
            $wrapper=$userLIst.find('ul');
    /*getDate*/
    let queryData=function queryData(){
            axios.get('/getMatchList',{
                params:{limit,page,search}/*问号传参*/
            }).then(result=>{pageNum=parseFloat(result['pageNum']);
                total=parseFloat(result['total']);
                return result;
            }).then(bindHTML);
    };
    //BIND-HTML
    let bindHTML=function bindHTML(result){
      let {code,list=[]}=result;
      if(parseFloat((code)!==0)){
          $wrapper.css('display','none');
          $tip.css('display','block');
          return;
      }
        $wrapper.css('display','block');
        $tip.css('display','none');
        let $frg=$(document.createDocumentFragment());
        list.forEach((item,index)=>{
            let {id,name,picture,sex,matchId,slogan,voteNum,isVote}=item;
            $frg.append(`<li>
            <a href="detail.html?userId=${id}">
                <img src="${picture}" alt="${name}" class="picture">
            <p class="title">
                <span>${name}</span><span>编号#${matchId}</pan></p>
            <p class="slogan">${slogan}</p>
            </a>
        <div class="vote">
            <span class="voteNum">${voteNum}</span>
            ${parseFloat(isVote)===0?`<a href="javascript:;" class="voteBtn">投他一票</a>`:``}
        </div>
        </li>`)
        });
        $wrapper.append($frg);
        $frg=null;
        isRun=false;
    };
    return {
        init: function () {
            queryData();
            //下拉加载更多数据
            $(window).on('scroll',()=>{
              let {clientHeight,
              scrollTop,
              scrollHeight}=document.documentElement;
              if((clientHeight+scrollTop+200)>=scrollHeight){
                  if(isRun)return;
                  if(page>=pageNum)return;
                  isRun=true;
                  page++;
                  if(page)
                  queryData();
              }
            });
            $searchBtn.tap(()=>{
                if(isRun=false)return;
                    isRun=true;
                     search=$searchBtn.prev('input').val().trim();
                     page=1;
                     $wrapper.html('');
                     queryData();
            });
        }
    }
})(Zepto);
voteRender.init();