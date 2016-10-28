/**
 * Created by hanyou on 2016/10/26.
 */
$(function () {
    var select_bgColor = "#3c80e3";
    var del_bgColor = "#c9dfff";
    var navList = [
        {nav1:"菜单名称",nav2:["二级菜单"]}
    ];
    var curNav = 0;//标识当前操作的一级菜单序号
    var curNav2=-1;//当前操作的二级菜单序号
    var delNav;//标识二级菜单序号

    $("#addNavMenu ul li").css("width",(260/$("#addNavMenu ul li").length-1)+"px").each(function(i){
        $("#addNavMenu ul li").eq(i).removeClass("on");
        $('#addNavMenu ul li .secondNav').eq(i).animate({bottom:-$('#addNavMenu ul li .secondNav').eq(i).height()},100);
    });
    $(".ranilFirstNav").eq(0).find(".leftArrow1").css("display","block").siblings(".leftArrow2").css("display","block");
    $(".selectMsgType").css("display","none");
    $(".smtItem").css("display","none");

    /**
     * 预览菜单 点击事件
     */
    $("#addNavMenu").on("click","li",function(){
        /**
         * 获取被点击的一级菜单序号
         * 并将其相关信息映射到右边设置窗口
         */
        var li1_index = $("#addNavMenu ul li").index($(this));
        var preNav = curNav;
        curNav = li1_index;
        //左侧预览框效果
        $(".oneMenuName").attr("placeholder",navList[curNav].nav1);
        if(preNav!=curNav){
            curNav2 = -1;
            initEdit();
            curNav = li1_index;
            $("#addNavMenu ul li .menu_li").removeClass("curLi").eq(curNav).addClass("curLi");
            $(".ranilFirstNav").eq(1).children(".raniUl").empty();
            $(".ranilFirstNav").eq(0).find(".liftTitle").text(navList[curNav].nav1);
            $(".ranilfTitle").css("border-color",del_bgColor).eq(0).css("border-color",select_bgColor);
            $(".leftArrow1").css("display","none").eq(0).css("display","block");
            $(".leftArrow2").css("display","none").eq(0).css("display","block");
            if(navList[curNav].nav2.length!=0){
                for(var i=0;i<navList[curNav].nav2.length;i++){
                    $(".raniUl li .liftTitle").text(navList[curNav].nav2[i]);
                }
            }else {
                $(".selectMsgType").css("display","block");
            }

            $("#jsModal1").tmpl(navList[curNav]).appendTo($(".raniUl"));
        }
        if($(this).attr("class")!="on"){
            $('#addNavMenu ul .on .secondNav').animate({bottom:-$('#addNavMenu ul .on .secondNav').height()},200);
            $('#addNavMenu ul .on').removeClass("on");
            if($(this).find(".secondNav").children().length>0){
                $(this).addClass("on").find(".secondNav").animate({bottom:36},200);
                $('.footer_front').show();
            }
        }else{
            $(this).find(".secondNav").animate({bottom:-$(this).find(".secondNav").height()},200);
            $(this).removeClass("on");
            $('.footer_front').hide();
        }

    });
    /**
     * 设置菜单 点击事件
     */
    $(".raniLeft").on("click",".ranilfTitle",function () {
        var preNav2 = curNav2;
        if($(this).parent().attr("class")=="ranilFirstNav"){
            curNav2 = -1;
            $(".oneMenuName").val(navList[curNav].nav1);
        }else {
            curNav2 = $(".ranilFirstNav").eq(1).find(".raniUl li").index($(this).parent());
        }
        if(preNav2!=curNav2){
            initEdit();
            $(".ranilfTitle").css("border-color",del_bgColor).eq(curNav2+1).css("border-color",select_bgColor);
            $(".selectMsgType").css("display","block");
            //尖括号箭头效果
            $(".leftArrow1").css("display","none");
            $(".leftArrow2").css("display","none");
            $(this).children(".leftArrow1").css("display","block").siblings(".leftArrow2").css("display","block");
            if (curNav2==-1){
                if($(".ranilFirstNav").eq(1).find(".raniUl li").length>0){
                    $(".selectMsgType").css("display","none");
                    $(".smtItem").css("display","none");
                }
            }else {
                $(".oneMenuName").val(navList[curNav].nav2[curNav2]);
                $(".selectMsgType").css("display","block");
                $(".smtItem").css("display","block");
            }
        }
    });
    /**
     * 一添加一级菜单
     */
    $(".addFirstNav").on("click",function () {
        if(navList.length<3){
            initEdit();
            curNav2 = -1;
            $(".ranilfTitle").css("border-color",del_bgColor).eq(curNav2+1).css("border-color",select_bgColor);
            curNav = navList.length;
            navList[navList.length] = {nav1:"菜单名称",nav2:[]};
            $("#jsModal2").tmpl().appendTo("#addNavMenu ul");
            $(".ranilFirstNav").eq(1).children(".raniUl").empty();
            $(".liftTitle").eq(0).text(navList[curNav].nav1);
            $(".oneMenuName").val("");
            $(".selectMsgType").css("display","block");
            $(".smtItem").css("display","block");
            $(".leftArrow1").css("display","none").eq(0).css("display","block");
            $(".leftArrow2").css("display","none").eq(0).css("display","block");
            $("#addNavMenu ul li .menu_li").removeClass("curLi").eq(curNav).addClass("curLi");
            $("#addNavMenu ul li").css("width",(260/$("#addNavMenu ul li").length-1)+"px").each(function(i){
                $("#addNavMenu ul li").eq(i).removeClass("on");
                $('#addNavMenu ul li .secondNav').eq(i).animate({bottom:-$('#addNavMenu ul li .secondNav').eq(i).height()},100);
            });
        }else {
            alert("一级菜单最多能有3个！");
        }
    });
    /**
     * 删除一级菜单
     */
    $(".ranilFirstNav").eq(0).find(".ranilftBtn").on("click",function () {
        $(".pc_tsModal").off("click","button").css("display","block").on("click","button",function () {
            if($(this).attr("class")=="qd_delete"){
                if (navList.length>0){
                    initEdit();
                    curNav2=-1;
                    $(".ranilfTitle").css("border-color",del_bgColor).eq(curNav2+1).css("border-color",select_bgColor);

                    navList.splice(curNav,1);
                    $("#addNavMenu ul li").eq(curNav).remove();
                    $("#addNavMenu ul li").css("width",(260/$("#addNavMenu ul li").length-1)+"px");
                    if(curNav!=0){
                        curNav = curNav-1;
                        $("#addNavMenu ul li .menu_li").removeClass("curLi").eq(curNav).addClass("curLi").text(navList[curNav].nav1);
                        if(navList[curNav].nav2.length>0){
                            $(".selectMsgType").css("display","none");
                            $(".smtItem").css("display","none");
                            $(".raniUl").empty();
                            $("#jsModal1").tmpl(navList[curNav]).appendTo(".raniUl");
                        }
                        else {
                            $(".selectMsgType").css("display","block");
                            $(".smtItem").css("display","block");
                        }
                    }else {
                        curNav=0;
                    }
                }
            }
            $(".pc_tsModal").css("display","none");
        });
    });
    /**
     * 添加二级菜单
     */
    $(".addSecondNavBtn").on("click",function () {
        if(navList[curNav].nav2.length<5){
            initEdit();
            curNav2 = navList[curNav].nav2.length;
            navList[curNav].nav2[navList[curNav].nav2.length] = "二级菜单";
            $("#jsModal3").tmpl().appendTo($(".raniUl"));
            $('<a>二级菜单</a>').appendTo($("#addNavMenu ul li").eq(curNav).children(".secondNav"));
            $(".ranilfTitle").css("border-color",del_bgColor).eq(curNav2+1).css("border-color",select_bgColor);
            $(".leftArrow1").css("display","none").eq(curNav2+1).css("display","block");
            $(".leftArrow2").css("display","none").eq(curNav2+1).css("display","block");
            $(".selectMsgType").css("display","block");
            $(".smtItem").css("display","block");
            $(".oneMenuName").val(navList[curNav].nav2[curNav2]);

            $("#addNavMenu ul li").css("width",(260/$("#addNavMenu ul li").length-1)+"px").each(function(i){
                $("#addNavMenu ul li").eq(i).removeClass("on");
                $('#addNavMenu ul li .secondNav').eq(i).css({bottom:-$('#addNavMenu ul li .secondNav').eq(i).height()});
            });
        }else {
            alert("添加失败！<br>每个一级菜单下最多只能有5个二级菜单！")
        }

    });
    /**
     * 删除二级菜单
     */
    $(".ranilFirstNav").eq(1).on("click",".ranilftBtn",function () {
        var ranilftBtn = $(this);
        $(".pc_tsModal").off("click","button").css("display","block").on("click","button",function () {
            if($(this).attr("class")=="qd_delete"&&navList.length>0){
                initEdit();
                $(".selectMsgType").css("display","block");
                delNav = $(".ranilFirstNav").eq(1).find(".raniUl li").index(ranilftBtn.parents("li"));
                curNav2 = delNav;
                navList[curNav].nav2.splice(delNav,1);
                $("#addNavMenu ul li").eq(curNav).children(".secondNav").find("a").eq(delNav).remove();
                $(".ranilFirstNav").eq(1).find(".raniUl li").eq(delNav).remove();
                if(curNav2!=0){
                    curNav2 -= 1;
                }else {
                    curNav2 = -1;
                }
                $(".ranilfTitle").css("border-color",del_bgColor).eq(curNav2+1).css("border-color",select_bgColor);
                $(".leftArrow1").css("display","none").eq(curNav2+1).css("display","block");
                $(".leftArrow2").css("display","none").eq(curNav2+1).css("display","block");
                $(".oneMenuName").val(navList[curNav].nav2[curNav2]);
                if(navList[curNav].nav2.length==0){
                    $(".leftArrow1").css("display","none").eq(0).css("display","block");
                    $(".leftArrow2").css("display","none").eq(0).css("display","block");
                    $(".oneMenuName").val(navList[curNav].nav1);
                    $(".selectMsgType").css("display","block");
                    $(".smtItem").css("display","block");
                }
            }
            $(".pc_tsModal").css("display","none");
        });

    });

    /**
     * 修改 菜单名称
     */
    $(".oneMenuName").change(function () {
        if(curNav2==-1){
            navList[curNav].nav1 = $(this).val();
            $("#addNavMenu ul li").eq(curNav).find(".curLi").text($(this).val());
            $(".liftTitle").eq(0).text($(this).val());
        }else {
            navList[curNav].nav2[curNav2] = $(this).val();
            $("#addNavMenu ul li").eq(curNav).find(".secondNav a").eq(curNav2).text($(this).val());
            $(".liftTitle").eq(curNav2+1).text($(this).val());
        }
    });
    function initEdit() {
        $(".selectMsgType").css("display","none");
        $(".smtItem").css("display","none").children().css("display","none");
        $(".def_op").attr("selected",true);
        for(var i=0;i<$("select").length;i++){
            $("select").eq(i).val($("select").eq(i).children(".def_op").text());
        }
        $(".raniRight").find("input").val("").end().find("textarea").val("");
    }
    $('.footer_front').click(function(){
        $('#addNavMenu ul .on .secondNav').animate({bottom:-$('#addNavMenu ul .on .secondNav').height()},200);
        $('#addNavMenu ul .on').removeClass("on");
        $(this).hide();
    });
    $(".selectMsgType").on("change",function () {
        var text = $(this).children("option:selected").val();
        if(text=="文字消息"){
            $(this).siblings(".smtItem").children(".smti_wz").css("display","block").siblings().css("display","none");
        }else if(text=="图文消息"){
            $(this).siblings(".smtItem").children(".smti_tw").css("display","block").siblings().css("display","none");
        }else if (text=="连接网址"){
            $(this).siblings(".smtItem").children(".smti_link").css("display","block").siblings().css("display","none");
        }
    });
    $(".select_link_type").on("change",function () {
        var sltText = $(this).children("option:selected").val();
        if(sltText=="外部链接"){
            $(this).siblings(".slt_ctr").children(".smti_link_text").css("display","block").siblings().css("display","none");
        }else if (sltText=="自定义页面"){
            $(this).siblings(".slt_ctr").children(".smti_link_page1").css("display","block").siblings().css("display","none");
        }else {
            $(this).siblings(".slt_ctr").children(".smti_link_page2").css("display","block").siblings().css("display","none");
        }
    });
});