/**
 * Created by hanyou on 2016/10/24.
 */
window.onload = function(){
    var navList = [
        {"nav1":"菜单名称1","nav2":["菜单名称11"]},
        {"nav1":"菜单名称2","nav2":["菜单名称21"]}
    ];
    $("#addNavMenu ul li").css("width",(260/$("#addNavMenu ul li").length-1)+"px").each(function(i){
        $("#addNavMenu ul li").eq(i).removeClass("on");
        $('#addNavMenu ul li .secondNav').eq(i).animate({bottom:-$('#addNavMenu ul li .secondNav').eq(i).height()},100);
    });
    $("#addNavMenu").on("click","li",function(){
        if($(this).find(".secondNav").children().length>0){
            if($(this).attr("class")!="on"){
                $('#addNavMenu ul .on .secondNav').animate({bottom:-$('#addNavMenu ul .on .secondNav').height()},200);
                $('#addNavMenu ul .on').removeClass("on").find(".downArrow1").css("display","none").animate({"opacity":0},200).siblings(".downArrow2").css("display","none").animate({"opacity":0},200);
                $(this).addClass("on").find(".downArrow1").css("display","block").animate({"opacity":1},200).siblings(".downArrow2").css("display","block").animate({"opacity":1},200);
                $(this).find(".secondNav").animate({bottom:45},200);
                $('.footer_front').show();
            }else{
                $(this).find(".secondNav").animate({bottom:-$(this).find(".secondNav").height()},200);
                $(this).removeClass("on").find(".downArrow1").css("display","none").animate({"opacity":0},200).siblings(".downArrow2").css("display","none").animate({"opacity":0},200);
                $('.footer_front').hide();
            }
        }
    });
    $('.footer_front').click(function(){
        $('#addNavMenu ul .on .secondNav').animate({bottom:-$('#addNavMenu ul .on .secondNav').height()},200);
        $('#addNavMenu ul .on').removeClass("on").find(".downArrow1").css("display","none").animate({"opacity":0},200).siblings(".downArrow2").css("display","none").animate({"opacity":0},200);
        $(this).hide();
    });
    $(".raniLeft").each(function (i) {
        $(this).children(".ranilFirstNav").eq(0).find(".leftArrow1").css("display","block").siblings(".leftArrow2").css("display","block");
    });
    $(".right_addNav").on("click",".ranirabcBtn",function () {
        console.log("已保存")
    })
    $(".right_addNav").on("click",".ranilfTitle",function () {
        var cur_li_n = $(this).parents(".raniUl").children("li").index($(this).parents("li"));
        var cur_ul_n = $(".ranItem").index($(this).parents(".ranItem"));
        $(this).parents(".raniLeft").siblings(".raniRight").find(".oneMenuName").val($(this).children(".liftTitle").text());
        var $this = $(this).children(".liftTitle");
        $(".right_addNav").off("change",".oneMenuName").on("change",".oneMenuName",function () {
            $this.text($(this).val());
            if(cur_li_n==-1){
                navList[cur_ul_n].nav1 = $(this).val();
                $("#addNavMenu ul li").eq(cur_ul_n).children(".menu_li").text($(this).val());
            }else {
                navList[cur_ul_n].nav2[cur_li_n] = $(this).val();
                $("#addNavMenu ul li").eq(cur_ul_n).children(".secondNav").find("a").eq(cur_li_n).text($(this).val());
            }
            console.log(navList[cur_ul_n]);
        });
        $(this).parents(".raniLeft").find(".ranilfTitle").children(".leftArrow1").css("display","none").siblings(".leftArrow2").css("display","none");
        $(this).children(".leftArrow1").css("display","block").siblings(".leftArrow2").css("display","block");
        if($(this).parent().attr("class")=="ranilFirstNav"){
            var secondaryMnu = $(this).parents(".raniLeft").find(".ranilFirstNav").eq(1).find("li").length;
            if(secondaryMnu>0){
                $(this).parents(".raniLeft").siblings(".raniRight")
                    .find(".selectMsgType").css("display","none").end()
                    .find(".smtItem").css("display","none");
            }else {
                $(this).parents(".raniLeft").siblings(".raniRight")
                    .find(".selectMsgType").css("display","block").end()
                    .find(".smtItem").css("display","block");
            }
        }else {
            $(this).parents(".raniLeft").siblings(".raniRight")
                .find(".selectMsgType").css("display","block").end()
                .find(".smtItem").css("display","block");
        }
    });
    $(".right_addNav").on("change",".selectMsgType",function () {
        var text = $(this).children("option:selected").val();
        if(text=="文字消息"){
            $(this).siblings(".smtItem").children(".smti_wz").css("display","block").siblings().css("display","none");
        }else if(text=="图文消息"){
            $(this).siblings(".smtItem").children(".smti_tw").css("display","block").siblings().css("display","none");
        }else if (text=="连接网址"){
            $(this).siblings(".smtItem").children(".smti_link").css("display","block").siblings().css("display","none");
        }
    });
    $(".right_addNav").on("change",".select_link_type",function () {
        var sltText = $(this).children("option:selected").val();
        if(sltText=="外部链接"){
            $(this).siblings(".slt_ctr").children(".smti_link_text").css("display","block").siblings().css("display","none");
        }else if (sltText=="自定义页面"){
            $(this).siblings(".slt_ctr").children(".smti_link_page1").css("display","block").siblings().css("display","none");
        }else {
            $(this).siblings(".slt_ctr").children(".smti_link_page2").css("display","block").siblings().css("display","none");
        }
    })
    //---------------------添加二级菜单
    $(".right_addNav").on("click",".addSecondNavBtn",function () {
        if($(this).siblings(".raniUl").find("li").length<5){
            $('<li><div class="ranilfTitle"> <span class="liftTitle">菜单名称</span> <div class="ranilftBtn"> <span class="ranilftbj">删除</span> ' +
                '</div> <span class="leftArrow1"></span> <span class="leftArrow2"></span> </div> </li>').appendTo($(this).siblings(".raniUl"))
                .parents(".raniLeft").find(".ranilfTitle").children(".leftArrow1").css("display","none").siblings(".leftArrow2").css("display","none")
                .end().end().end().end().find(".leftArrow1").css("display","block").siblings(".leftArrow2").css("display","block");
            var add_2_index = $(".ranItem").index($(this).parents(".ranItem"));
            $('<a href="">菜单名称</a>').appendTo($("#addNavMenu ul li").eq(add_2_index).children(".secondNav"));
            $("#addNavMenu ul li").eq(add_2_index).children(".secondNav").css("bottom",-$("#addNavMenu ul li").eq(add_2_index).children(".secondNav").height());
        }else {
            alert("每个一级菜单下面的二级菜单最多能有5个！");
        }
    });
    //------------删除按钮
    $(".right_addNav").on("click",".ranilftBtn",function () {
        var ranilftBtn = $(this);
        $(".pc_tsModal").off("click","button").css("display","block").on("click","button",function () {
            var del = $(this).attr("class");
            if(del=="qd_delete"){
                //一级菜单删除
                if(ranilftBtn.parent().parent().attr("class")=="ranilFirstNav"){
                    var del_1_index =$(".ranItem").index(ranilftBtn.parents(".ranItem"));
                    ranilftBtn.parents(".ranItem").remove();
                    $("#addNavMenu ul li").eq(del_1_index).remove();
                    $("#addNavMenu ul li").css("width",(260/$("#addNavMenu ul li").length-1)+"px").each(function(i){
                        $("#addNavMenu ul li").eq(i).removeClass("on");
                        $('#addNavMenu ul li .secondNav').eq(i).animate({bottom:-$('#addNavMenu ul li .secondNav').eq(i).height()},100);
                    });

                }else {//二级菜单删除
                    var del2_index_2 = ranilftBtn.parents(".raniUl").find("li").index(ranilftBtn.parents("li"));
                    var del2_index_1 = $(".ranItem").index(ranilftBtn.parents(".ranItem"));
                    $("#addNavMenu ul li").eq(del2_index_1).find(".secondNav a").eq(del2_index_2).remove();
                    if(ranilftBtn.parents(".raniUl").children("li").length==1){
                        ranilftBtn.parents(".raniLeft").siblings(".raniRight").find(".selectMsgType").css("display","block")
                            .end().end().end().parents(".ranilFirstNav").siblings(".ranilFirstNav").find(".leftArrow1").css("display","block").siblings(".leftArrow2").css("display","block");
                    }else {
                        if(ranilftBtn.siblings(".leftArrow1").css("display")=="block"){
                            ranilftBtn.parents("li").prev().find(".leftArrow1").css("display","block").siblings(".leftArrow2").css("display","block");
                        }
                    }
                    ranilftBtn.parents("li").remove();
                }
                $(".pc_tsModal").css("display","none");
            }else {
                $(".pc_tsModal").css("display","none");
            }
        });

    });
    //添加一级菜单
    $(".addFirstNavBtn").on("click",function () {
        navList[navList.length]={"nav1":"菜单名称2","nav2":["菜单名称21"]};
        $("#jsModal1").tmpl().insertBefore(".addFirstNav").find(".ranilFirstNav").eq(0).find(".leftArrow1").css("display","block").siblings(".leftArrow2").css("display","block");
        $("#jsModal2").tmpl().appendTo("#addNavMenu ul");
        $("#addNavMenu ul li").css("width",(260/$("#addNavMenu ul li").length-1)+"px").each(function(i){
            $("#addNavMenu ul li").eq(i).removeClass("on");
            $('#addNavMenu ul li .secondNav').eq(i).animate({bottom:-$('#addNavMenu ul li .secondNav').eq(i).height()},100);
        });
    })
}