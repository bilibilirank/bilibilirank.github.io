/**
 * Created by xiewl on 2016/11/2.
 */
(function ($) {
    //reset select
    (function () {
        //替换样式
        $('select.tz-select').each(function () {
            var selectDom = $(this);
            var selectId = selectDom.attr('id');
            var optionList = selectDom.find('option');
            var optionHtml = '';
            for(var i =0,len=optionList.length;i<len;i++){
                var active = '';
                if(i == 0) active = ' active';
                optionHtml += '<p class="tz-select-item'+ active +'" data-value="'+ $(optionList[i]).attr('value') +'">'+ $(optionList[i]).text() +'</p>';
            }
            var html =[
                '<div class="tz-select-box" id="'+ selectId +'">',
                '<p class="tz-select-choice" data-value="'+ $(optionList[0]).attr('value') +'">'+ $(optionList[0]).text() +'</p>',
                '<div class="tz-select-list">',
                optionHtml,
                '</div>',
                '</div>'
            ].join('');
            selectDom.after(html);
            selectDom.remove();
        });
        //事件监听
        $('body').on('click','.tz-select-box',function (e) {
            var clickDom = $(this);
            if(clickDom.attr('data-open') == '1'){
                clickDom.removeAttr('data-open');
                if(e.target.className == 'tz-select-item'){
                    var item = $(e.target);
                    item.addClass('active').siblings().removeClass('active');
                    item.parents('.tz-select-box').find('.tz-select-choice').attr('data-value',item.attr('data-value')).text(item.text());
                }
                //空白区域解绑事件
                $('html').unbind('click');
            }else{
                $('.tz-select-box[data-open]').click();
                clickDom.attr('data-open','1');
                //空白区域绑定事件
                $('html').bind('click',function (e) {
                    if(e.target.className != 'tz-select-item'){
                        $('.tz-select-box[data-open]').click();
                    }
                })
            }
            return false;
        });
    })();
    //reset file
    (function () {
        //替换样式
        $('input[type="file"].tz-file').each(function () {
            var fileDom = $(this);
            var html = [
                '<div class="tz-file-box">',
                  '<button class="tz-btn tz-file-btn">选择文件</button>',
                  '<span class="tz-file-path"></span>',
                '</div>'
            ].join('');
            fileDom.after(html);
        });
        //事件监听
        $('body').on('click','.tz-file-btn',function () {
            var clickDom = $(this);
            clickDom.parents('.tz-file-box').prev('.tz-file').click();
        });
        $('input[type="file"].tz-file').change(function (e) {
            var fileDom = $(this);
            fileDom.next('.tz-file-box').find('.tz-file-path').text(e.target.files[0].name);
        });
    })();
    //reset radio
    (function () {
        //替换样式
        $('.tz-radio input[type="radio"]').after('<span class="tz-radio-icon"></span>');
    })();
    //reset checkbox
    (function () {
        //替换样式
        $('.tz-checkbox input[type="checkbox"]').after('<span class="tz-checkbox-icon"></span>');
    })();
    //reset toggle button
    (function () {
        $('body').on('click','.tz-toggle-btn',function () {
            $(this).toggleClass('active');
        })
    })();
    //reset title
    (function () {
        $('body').on('mouseover','[data-tz-title]',function () {
            $('.tz-title').remove();
            var str = $(this).attr('data-tz-title');
            var top = $(this).offset().top;
            var left = $(this).offset().left;
            var height = this.offsetHeight;
            var width = this.offsetWidth;
            var html ='<div class="tz-title" style="top:'+ (top-height/2 - 16) +'px;">'+ str +'</div>';
            $('body').append(html);
            var tipsWidth = $('.tz-title').get(0).offsetWidth;
            var cut = width - tipsWidth;
            $('.tz-title').css('left',left + cut/2);
        });
        $('body').on('mouseout','[data-tz-title]',function () {
            $('.tz-title').remove();
        });
    })()
})(jQuery);