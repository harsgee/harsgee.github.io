/**
 * Created by hanyou on 2017/3/7.
 */

//底部菜单
function setTabbar(n) {
    var tabIndex = [0,-40,-80,-160];
    tabIndex[n] -= 20;
    var tabbar =
        '<div class="weui-flex tabMenu" id="tabMenu">' +
        '<div class="weui-flex__item weui-cell_access" onclick="location.href=\'index.html\';">' +
        '<i class="tab-icon" style="background-position: '+tabIndex[0]+'px 50%"></i>' +
        '<p>首页</p> </div>' +
        '<div class="weui-flex__item weui-cell_access" onclick="location.href=\'newList.html\';">' +
        '<i class="tab-icon" style="background-position: '+tabIndex[1]+'px 50%"></i>' +
        '<p>新品</p></div>' +
        '<div class="weui-flex__item weui-cell_access" onclick="location.href=\'hot.html\';">' +
        '<i class="tab-icon" style="background-position: '+tabIndex[2]+'px 50%"></i>' +
        '<p>热门</p></div>' +
        '<div class="weui-flex__item weui-cell_access" onclick="location.href=\'personcenter.html\';">' +
        '<i class="tab-icon" style="background-position: '+tabIndex[3]+'px 50%"></i>' +
        '<p>个人中心</p></div>' +
        '</div>';
    $(tabbar).appendTo("body");
    $("body").css({"padding-bottom":53});
}
//倒计时
function GetRTime(end){
    var EndTime= new Date(end);
    var NowTime = new Date();
    var t =EndTime.getTime() - NowTime.getTime();
    var d=0;
    var h=0;
    var m=0;
    var s=0;
    if(t>=0){
        d=Math.floor(t/1000/60/60/24);
        h=Math.floor(t/1000/60/60%24);
        m=Math.floor(t/1000/60%60);
        s=Math.floor(t/1000%60);
    }
    h = h<10?("0"+h):h;
    m = m<10?("0"+m):m;
    s = s<10?("0"+s):s;
    return  (h+":" + m +":" +s);
}