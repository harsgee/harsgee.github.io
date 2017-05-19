/**
 * Created by hanyou on 2017/5/15.
 */
function scroll(el) {
    var element = $("#"+el);
    if(element.length>0){
        $("#scroll").animate({
            scrollTop: element.offset().top
        }, 400);
    }
}
function head(index) {
    var html = '<div class="page-header_reset navbar-fixed-top"> ' +
        '<div class="container"> ' +
        '<ul class="nav nav-pills"> ' +
        '<li role="presentation"><a href="#">简解</a></li> ' +
        '<li role="presentation"><a href="#">样式库</a></li> ' +
        '<li role="presentation"><a href="#">组件库</a></li> ' +
        '<li role="presentation"><a href="#">更多学习网址</a></li> ' +
        '</ul></div></div>';
    $(html).find("li").addClass("active");
}