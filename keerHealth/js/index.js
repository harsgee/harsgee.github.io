/**
 * Created by hanyou on 2017/5/11.
 */
function head(index,subIndex) {
    var html = $('<div class="container">' +
        '<div class="head-l">' +
        '<img src="image/logo_146x30.png" alt=""/>' +
        '<p>专注动态健康智慧养老服务平台</p></div>' +
        '<div class="head-r">' +
        '<ul class="clearfix">' +
        '<li ><p onclick="location.href=\'index.html\'">首页</p></li> ' +
        '<li ><p onclick="location.href=\'dongtaiHealth.html\'">动态健康</p></li> ' +
        '<li class="hasSelect"> ' +
        '<p onclick="location.href=\'yanglaoJujia.html\'">智慧养老</p> ' +
        '<div class="navSelect"> ' +
        '<div onclick="location.href=\'yanglaoJujia.html\'">居家养老</div> ' +
        '<div onclick="location.href=\'yanglaoJigou.html\'">机构养老</div> ' +
        '</div></li> ' +
        '<li><p onclick="location.href=\'about.html\'">关于我们</p></li> ' +
        '<li><p class="nav-app" onclick="location.href=\'keerHealthAPP.html\'">科尔健康APP</p></li> ' +
        '</ul></div></div>');
    html.find(".head-r").find("li").eq(index).addClass("active");
    if(subIndex!=undefined){
        html.find(".head-r").find(".navSelect").children().eq(subIndex).addClass("selected");
    }
    html.appendTo(".header");
}
function foot() {
    var html = $('<div class="container"><img src="image/logo_146x30.png" alt=""><p>POWERED BY EOS2011 &copy;2006-2013 深圳市陶魔科技有限公司 粤ICP备13044128号-1</p></div>');
    html.appendTo(".footer");
}