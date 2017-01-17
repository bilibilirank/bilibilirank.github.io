/**
 * Created by xiewl on 2017/1/9.
 */
//获取url参数
function getUrlParam() {
    window.paramObj = {};
    if(location.search){
        var paramStr = location.search.split('?')[1];
        var temp = paramStr.split('&');
        temp.map(function (item) {
            paramObj[item.split('=')[0]] = item.split('=')[1];
        });
    }
}
//获取up排名
function getUserRankList(index,orderby,state) {
    $('body').animate({scrollTop: 0},100);
    $('.rank-list tbody').html('<tr><td colspan="5"><span class="loading-list"></span></td></tr>');
    if(!window.userList){
        $.get('/data/bilibili_users.json',function (res) {
            window.userList = res.RECORDS;
            showPage();
        });
    }else{
        showPage();
    }
    function showPage() {
        var pageSize = 20;
        userList.sort(function (a, b) {
            var type = orderby.split('_')[0];
            var order = orderby.split('_')[1];
            if(order == 'asc'){
                return a[type] - b[type];
            }else if(order == 'desc'){
                return b[type] - a[type];
            }
        });
        var html = '';
        var list = userList.slice((index-1)*pageSize,index*pageSize);
        var listLen = list.length;
        for(var i = 0;i<listLen;i++){
            var item = list[i];
            html += [
                '<tr>',
                '<td>'+ (i + 1 + pageSize*(index - 1)) +'</td>',
                '<td class="user">',
                '<img class="img-circle avatar" src="'+ item.face +'" alt="">',
                '<span>'+ item.name +'</span>',
                '</td>',
                '<td>'+ item.fans +'</td>',
                '<td>'+ item.playNum +'</td>',
                '<td>'+ (item.regtime && new Date(item.regtime*1e3+8*3600000).toISOString().replace(/T.*$/,'') || '空') +'</td>',
                '<td>'+ item.updatetime.replace(/\s.*$/g,'') +'</td>',
                '</tr>'
            ].join('');
        }
        $('.rank-list tbody').html(html);
        if(!state){
            history.pushState({ index: index, orderby: orderby }, '', location.href.split("?")[0]+'?index='+index+'&orderby='+orderby);
        }
        pager(+index,Math.ceil(userList.length/pageSize));
    }
}
function pager(index,totalPages) {
    var $pager=$('#pagination');
    $pager.empty();
    $pager.removeData("twbs-pagination");
    $pager.unbind("page");
    $pager.twbsPagination({
        totalPages : totalPages,  //总页数
        startPage : index,
        visiblePages : 10,
        first:"首页",
        prev:"上一页",
        next :"下一页",
        last :"尾页",
        paginationClass : "pagination",
        hideOnlyOnePage : false,
        onPageClick :function(event,page){
            getUserRankList(page,$('#orderBy .tz-select-choice').attr('data-value'));
        }
    });
}
function setFilter(){
    var item = $('.tz-select-item[data-value="'+ paramObj.orderby +'"]');
    item.addClass('active').siblings().removeClass('active');
    item.parents('.tz-select-box').find('.tz-select-choice').attr('data-value',item.attr('data-value')).text(item.text());
    $('body').on('click','#orderBy .tz-select-item',function () {
        getUserRankList(1,$(this).attr('data-value'));
    });
}
function popstate() {
    window.addEventListener("popstate", function() {
        var data = history.state;
        getUserRankList(data.index,data.orderby,true);
    });
}
$(function () {
    getUrlParam();
    setFilter();
    popstate();
    getUserRankList(paramObj.index || 1,$('#orderBy .tz-select-choice').attr('data-value'));
});