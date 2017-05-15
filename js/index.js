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