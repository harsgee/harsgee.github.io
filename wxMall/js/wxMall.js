/**
 * Created by hanyou on 2017/6/14.
 */
(function ($) {
    var defaults = {
        items:[],
        onSelected:function (data) {}
    };
    $.fn.filterSelect = function (opt) {
        var options = $.extend(defaults,opt);
        var $this = $(this);
        var filterBox = $('.filter-wrap');
        var i;
        if(filterBox.length<=0){
            filterBox = $('<div class="filter-wrap"><div class="filter-type_container clear-fix"><div class="filter-type active">全部分类</div></div></div>');
            filterBox.appendTo(".page-content_scroll");
        }
        if(arguments[0]=='setValue'){
            filterBox.children('.filter-type_container').empty();
            var newValue = arguments[1];
            filterBox.children('.filter-type_container').append('<div class="filter-type active">全部分类</div>');
            for(i=0;i<newValue.length;i++){
                filterBox.children('.filter-type_container').append('<div class="filter-type" data-value="'+newValue[i].value+'">'+newValue[i].text+'</div>');
            }
        }else {
            for(i=0;i<options.items.length;i++){
                filterBox.children('.filter-type_container').append('<div class="filter-type" data-value="'+options.items[i].value+'">'+options.items[i].text+'</div>');
            }
            $this.click(function () {
                hideFilterList();
            });
            $('.filter-type_container').on('click','.filter-type',function () {
                var text = $(this).text();
                $('.filter-type_btn>p').text(text);
                $(this).addClass('active').siblings('.active').removeClass('active');
                hideFilterList();
                options.onSelected({text:$(this).text(),value:$(this).attr('data-value')});
            });
            $('.backdrop').click(function () {
                hideFilterList();
            });
        }
    };
    function hideFilterList(el) {
        var element = el||$('.filter-type_btn');
        var filter = $('.filter-wrap');
        if(filter.hasClass('open')){
            filter.removeClass('open');
            element.removeClass(' active');
            $('.backdrop').css({'display':'none','opacity':0});
        }
        else {
            filter.addClass('open');
            element.addClass('active');
            $('.backdrop').css({'display':'block','opacity':1});
        }
    }
})(jQuery);
//返回顶部
(function ($) {
    $.fn.hyBackTop = function () {
        var $this = $(this);
        var el = $('<div class="back-to-top" style="display: none;"></div>');
        el.appendTo('.page-content');
        el.on('click',function () {
            $this.animate({
                scrollTop:0
            },300);
        });
        $this.scroll(function () {
            var top = $(this).scrollTop();
            if(top>$('.page-content').height()){
                el.css('display','block');
            }else {
                el.css('display','none');
            }
        });
        return $this;
    };
})(jQuery);
//返回上一页
(function ($) {
    $.fn.hyBackPrepage = function () {
        var that = $(this);
        var el = $('<div class="back-pre">×</div>');
        el.appendTo('.page-content');
        el.on('click',function () {
            window.history.go(-1);
        });
        return that;
    }
})(jQuery);
var hyAnimate = {
    show:function (el) {
        el.css({'display':'block'}).animate({'opacity':1,'height':'100%'},300);
    },
    hide:function (el) {
        el.animate({'opacity':0,'height':0},300);
        setTimeout(function () {
            el.css({'display':'none'});
        },300);
    }
};
var hyPage = {
    foot:function (id) {
        var imgs = {index:'image/ic_shouye_blue_46x46.png',
            shopCart:'image/ic_gouwuche_blue_46x46.png',
            userCenter:'image/ic_wode_blue_46x46.png',
            travel:'image/ic_wode_blue_46x46.png'
        };
        var html = $('<div class="weui-flex f-menu">' +
            '<div class="weui-flex__item" data-id="index" onclick="location.href=\'index.html\'">' +
            '<img src="image/ic_shouye_gray.png" alt=""><p>首页</p></div>' +
            '<div class="weui-flex__item" data-id="travel" onclick="location.href=\'travel.html\'">' +
            '<img src="image/ic_shouye_gray.png" alt=""><p>生态游</p></div>' +
            '<div class="weui-flex__item" data-id="shopCart" onclick="location.href=\'trolley.html\'">' +
            '<img src="image/ic_gouwuche_gray.png" alt=""><p>购物车</p></div>' +
            '<div class="weui-flex__item" data-id="userCenter" onclick="location.href=\'userCenter.html\'">' +
            '<img src="image/ic_wode_gray.png" alt=""><p>个人中心</p></div></div>');
        html.find('[data-id='+id+']').addClass('active').children('img').attr('src',imgs[id]);
        html.appendTo('.footer');
    }
};

//底部弹框
(function ($) {
    var defaults = {
        popupId:'',
        onOpen:function () {},
        onClose:function () {}
    };
    $.fn.HYPopup = function (opt) {
        if(typeof opt=="object")
        var options = $.extend(defaults,opt);
        var popup;
        if(options.popupId==''){
            popup = $('.hy-popup');
        }else {
            popup = $('#'+options.popupId);
        }
        var that = $(this);
        if(opt=='open'){
            that.click(openPopup);
            // openPopup();
        }else {
            that.click(function () {
                openPopup();
                options.onOpen();
            });
            popup.find('.close-popup').click(function () {
                closePopup();
            });
            popup.click(function (e) {
                if($(e.target).hasClass('hy-popup')){
                    closePopup();
                }
            });
        }

        function openPopup() {
            popup.css({'display':'block'}).animate({'opacity':1},400);
            popup.find('.hy-popup-container').animate({'bottom':'0'});
        }
        function closePopup() {
            popup.animate({'opacity':0},400);
            popup.find('.hy-popup-container').animate({'bottom':'-50%'});
            setTimeout(function () {
                popup.css({'display':'none'});
                options.onClose();
            },400);
        }
    }
})(jQuery);