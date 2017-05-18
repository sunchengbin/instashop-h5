/**
 * Created by sunchengbin on 2017/4/21.
*/
require(['hbs','uploadimg','config','lang','fastclick','dialog','btn','ajax','base','bankcity','common'],function(Hbs,UploadImg,Config,Lang,Fastclick,Dialog,Btn,Ajax,Base,BankCity,Common){
    var UploadProve = {
     init : function(){
         var _this = this;
         UploadImg({
             wrap : '.j_upload_img_btn',
             uploadImgSuccess : function(result){
                 //提交上传商品图片后
                 if($('.j_refund_img').length > 3){
                     Dialog.tip({
                         top_txt : '',//可以是html
                         body_txt : '<p class="dialog-body-p">'+Lang.REFUND_EXPLAIN_MSG+'</p>'
                     });
                 }else{
                     $.each(result,function(i,item){
                         var img = item.small;
                         $('<li class="refund-img j_refund_img" data-src="'+img+'"><img src="'+img+'"/><i class="icon iconfont j_del_img icon-delete-font"></i></li>').insertBefore('.j_upload_img_btn');
                     });
                     if($('.j_refund_img').length == 3){
                         $('.j_upload_img_btn').hide();
                     }
                 }
             }
         });
         _this.handleFn();
     },
     handleFn : function(){
         var _this = this;
         Fastclick.attach(document.body);
         //android机型键盘收缩
         Common.listenAndroidKeyboardToggle(function(){
             //alert(1);
             $('.j_dialog_cover').css('bottom',0);
             Common.ScorllToBottom();
             setTimeout(function(){
                 $('.j_dialog_cover').css('bottom',0);
             },100);
         },function(){
             //alert(2);
             $('.j_dialog_cover').css('bottom',0);
             Common.ScorllToBottom();
             setTimeout(function(){
                 $('.j_dialog_cover').css('bottom',0);
             },100);
         });
         $('body').on('click','.j_del_img',function(){
            var _parent = $(this).parent('.j_refund_img');
            Dialog.confirm({
                body_txt : '<p class="dialog-body-p">'+Lang.H5_DELETE_CONFIRM+'</p>',
                cf_fn : function(){
                    //验证单品详情页的
                    _parent.remove();
                    if($('.j_refund_img').length < 3){
                        $('.j_upload_img_btn').show();
                    }
                }
            });
         });
         $('body').on('click','.j_next_step',function(){
             if(_this.testStepOne()){
                 $('.j_go_back').attr('data-step','two');
                 $('.j_step_one').hide();
                 $('.j_step_two').show();
             }
         });
         $('body').on('click','.j_go_back',function(){
             if($(this).attr('data-step') == 'two'){
                 $(this).attr('data-step','one');
                 $('.j_step_one').show();
                 $('.j_step_two').hide();
             }else{
                 //if(_this.isEdit()){
                 //    Dialog.confirm({
                 //        body_txt : '<p class="dialog-body-p">'+Lang.H5_EXIT_CONFIRM+'</p>',
                 //        cf_fn : function(){
                 //            location.href = localStorage.getItem('RefundBack');
                 //        }
                 //    });
                 //}else{
                     location.href = localStorage.getItem('RefundBack');
                 //}
             }
         });
         $('body').on('focus','.j_bank_name',function(){
             var _list = _this.createList(BankCity,'j_bank_name');
             $('.j_list_box').html(_list);
             $('.j_address_header span').html(Lang.H5_BANK_NAME);
             $('.j_address_list_box').removeClass('hide').addClass('show');
             $(this).blur();
         });
         $('body').on('click','.j_list_item',function(){
             var _dom = $(this),
                 _type = _dom.attr('data-ipt'),
                 _val = _dom.attr('data-val');
             $('.j_address_list_box').addClass('hide').removeClass('show');
             $('.'+_type).val(_val);
         });
         $('body').on('click','.j_go_address',function(){
             $('.j_address_list_box').addClass('hide').removeClass('show');
         });
         $('body').on('focus', 'input', function () {
             $('.j_upload_img_btn').removeClass('refund-error');
             if($(this).is('.refund-error')){
                 $(this).removeClass('refund-error');
             }
         });
         $('body').on('focus', 'textarea', function () {
             if($(this).is('.refund-error')){
                 $(this).removeClass('refund-error');
             }
         });
         $('body').on('focus', '.j_refund_price', function () {
             _this.execPriceInputByFocus($(this));
         });
         $('body').on('blur', '.j_refund_price', function () {
             _this.execPriceInputByKeyup($(this));
         });
         $('body').on('keyup', '.j_refund_price', function (e) {
             _this.execPriceInputByKeyup($(this), e.which)
         });
         Btn({
             wraper : 'body',
             target : '.j_sub_btn',
             event_type : 'click',
             loading_txt:Lang.H5_SUBMITING,
             callback : function(dom){
                 var _that = this,
                     _step_one = _this.testStepOne();
                 if(!_step_one){
                     _that.cancelDisable();
                     _that.setBtnTxt(dom,Lang.H5_CONFIRM);
                     return null;
                 }
                 if(!_this.testData(function(){
                         //忽略手机号错误
                         setTimeout(function(){
                             //alert(0);
                             _this.subRefund(_that,_step_one,dom);
                         },100);

                     },function(){
                         _that.cancelDisable();
                         _that.setBtnTxt(dom,Lang.H5_CONFIRM);
                         return null;
                     })){//数据出错
                     _that.cancelDisable();
                     _that.setBtnTxt(dom,Lang.H5_CONFIRM);
                     return null;
                 }
             }
         });
     },
     subRefund : function(_that,_step_one,dom){
         var _this = this,
             _items = _this.getTestData();
         var _body = ''
             //+'<p class="dialog-body-p">'+Lang.REFUND_BANK+' : '+_items.b_name+'</p>'

            +'<p class="dialog-body-p">'+Lang.REFUND_MONEY+' Rp: '+Base.others.priceFormat(_step_one.refundPrice)+'</p>'
            +'<p class="dialog-body-p">'+Lang.REFUND_BANK_NUMBER+' : '+_items.c_number+'</p>'
            +'<p class="dialog-body-p">'+Lang.REFUND_CLIENT_NAME+' : '+_items.c_name+'</p>';
             //+'<p class="dialog-body-p">'+Lang.REFUND_CLIENT_TELEPHONE+' : '+_items.telephone+'</p>';
         Dialog.confirm({
             top_txt : Lang.H5_CONFIRM_SUBMIT,
             show_top : true,
             body_txt : _body,
             cab_txt : Lang.REFUND_EDIT_BTN_TXT,
             cf_fn : function(){
                 _this.saveData({
                     data : {
                         edata: {
                             "action": "refund",
                             "bank_info" : {
                                 "c_number":_items.c_number,
                                 "c_name":_items.c_name,
                                 "b_name":_items.b_name,
                                 "telephone":_items.telephone
                             },
                             "buyer_id": Base.others.getUrlPrem('buyer_id'),
                             "imgs": _step_one.refundImgs,
                             "item_id": Base.others.getUrlPrem('item_id'),
                             "item_sku_id": Base.others.getUrlPrem('item_sku_id'),
                             "price":_step_one.refundPrice,
                             "reason": _step_one.refundExplain,
                             "uss": Base.others.getUrlPrem('uss')

                         }
                     },
                     callback : function(){
                         _that.cancelDisable();
                         _that.setBtnTxt(dom,Lang.H5_CONFIRM);
                     }
                 });
             },
             c_fn : function(){
                 _that.cancelDisable();
                 _that.setBtnTxt(dom,Lang.H5_CONFIRM);
                 _paq.push(['trackEvent', '取消提交', 'click', '取消提交']);
                 return null;
             }
         });
     },
     execPriceInputByFocus: function ($ele) {
        var _price = $ele.val();
        if (_price != '' && !/Rp/g.test(_price)) {
            $(this).val('Rp ' + _price);
        }
     },
     execPriceInputByKeyup: function ($ele, keycode) {
        var _this = $ele;
        var _price = $.trim(_this.val().replace(/Rp\s/g, ''));
        var _msg = '';
        if (_price != '') {
            if (/\./g.test(_price)) {
                if (/\.00$/g.test(_price) && keycode != 8) {
                    _price = _price.replace(/\./g, '') / 100;
                } else {
                    _price = _price.replace(/\./g, '');
                }
            }
            if (isNaN(_price)) {
                _msg = '请填写数字';
            } else {
                if (_price <= 0) {
                    _msg = '不能小于0';
                } else {
                    if (_price.length > 10) {
                        _price = _price.substr(0, 10);
                    }
                }
            }

            if (_msg) {
                //Dialog.tip({
                //    top_txt: '', //可以是html
                //    body_txt: '<p class="dialog-body-p">' + _msg + '</p>'
                //});
                $('.j_refund_price').addClass('refund-error');
                return;
            }
            $('.j_refund_price').removeClass('refund-error');
            _this.val('Rp ' + Base.others.priceFormat(_price));
        }
     },
     testStepOne : function(){
         var _refund_price = $.trim($('.j_refund_price').val()),
            _max_price = $('.j_refund_price').attr('data-maxprice'),
            _refund_explain = $.trim($('.j_refund_explain').val());
            _refund_price = $.trim(_refund_price.replace(/Rp\s/g, ''));
         if(!_refund_price){
             //Dialog.tip({
             //    top_txt : '',//可以是html
             //    body_txt : '<p class="dialog-body-p">请填写提现金额</p>'
             //});
             $('.j_refund_price').addClass('refund-error');
             return null;
         }else{
             if (/\./g.test(_refund_price)) {
                 if (/\.00$/g.test(_refund_price)) {
                     _refund_price = _refund_price.replace(/\./g, '') / 100;
                 } else {
                     _refund_price = _refund_price.replace(/\./g, '');
                 }
             }
             if(isNaN(_refund_price)){
                 $('.j_refund_price').addClass('refund-error');
                 return null;
             }else{
                 _refund_price = Number(_refund_price);
                 if (_refund_price <= 0) {
                     return null;
                 }
                 if(_refund_price > Number(_max_price)){
                     Dialog.tip({
                         top_txt : '',//可以是html
                         body_txt : '<p class="dialog-body-p">'+Lang.REFUND_PRICE_MSG+' Rp '+Base.others.priceFormat(_max_price)+'</p>'
                     });
                     $('.j_refund_price').addClass('refund-error');
                     return null;
                 }
             }

         }
         if(!_refund_explain){
             //Dialog.tip({
             //    top_txt : '',//可以是html
             //    body_txt : '<p class="dialog-body-p">退款原因描述不能为空</p>'
             //});
             $('.j_refund_explain').addClass('refund-error');
            return null;
         }else{
            if(_refund_explain.length > 1000){
                Dialog.tip({
                    top_txt : '',//可以是html
                    body_txt : '<p class="dialog-body-p">'+Lang.REFUND_EXPLAIN_MSG+'</p>'
                });
                $('.j_refund_explain').addClass('refund-error');
                return null;
            }
         }
         var _imgs = [];
         $('.j_refund_img').each(function(i,item){
             _imgs.push($(item).attr('data-src'));
         });
         if(!_imgs.length){
             //Dialog.tip({
             //    top_txt : '',//可以是html
             //    body_txt : '<p class="dialog-body-p">请上传凭证</p>'
             //});
             $('.j_upload_img_btn').addClass('refund-error');
             return null;
         }else{
             if(_imgs.length > 3){
                 Dialog.tip({
                     top_txt : '',//可以是html
                     body_txt : '<p class="dialog-body-p">'+Lang.REFUND_IMG_MSG+'</p>'
                 });
                 return null;
             }
         }
         return {
             refundPrice : _refund_price,
             refundExplain : _refund_explain,
             refundImgs : _imgs
         };
     },
     getTestData : function(){
         var _bankname = $.trim($('.j_bank_name').val()),//银行
             _branch= $.trim($('.j_branch').val()),//银行账号
             _name = $.trim($('.j_name').val()),//用户名
             _number = $.trim($('.j_number').val());//手机号
         return {
             "c_number":_branch,//银行账号
             "c_name":_name,//用户名
             "b_name":_bankname,//银行
             "telephone":_number//用户手机号
         };
     },
     testData : function(callback,ccallback){
         var _bankname = $.trim($('.j_bank_name').val()),//银行
             _branch= $.trim($('.j_branch').val()),//银行账号
             _name = $.trim($('.j_name').val()),//用户名
             _number = $.trim($('.j_number').val());//手机号
         if(!_bankname){
             //Dialog.tip({
             //    top_txt : '',//可以是html
             //    body_txt : '<p class="dialog-body-p">'+Lang.H5_BANK_NAME+' '+Lang.H5_NOT_EMPTY+'?</p>'
             //});
             $('.j_bank_name').addClass('refund-error');
             ccallback && ccallback();
             return null;
         }
         if(!_branch){
             //Dialog.tip({
             //    top_txt : '',//可以是html
             //    body_txt : '<p class="dialog-body-p">'+Lang.H5_SUB_BRANCH+' '+Lang.H5_NOT_EMPTY+'?</p>'
             //});
             $('.j_branch').addClass('refund-error');
             ccallback && ccallback();
             return null;
         }
         if(!_name){
             //Dialog.tip({
             //    top_txt : '',//可以是html
             //    body_txt : '<p class="dialog-body-p">'+Lang.H5_ACCOUNT_NAME+' '+Lang.H5_NOT_EMPTY+'?</p>'
             //});
             $('.j_name').addClass('refund-error');
             ccallback && ccallback();
             return null;
         }
         if(!_number){
             //Dialog.tip({
             //    top_txt : '',//可以是html
             //    body_txt : '<p class="dialog-body-p">'+Lang.H5_ACCOUNT_NUMBER+' '+Lang.H5_NOT_EMPTY+'?</p>'
             //});
             $('.j_number').addClass('refund-error');
             ccallback && ccallback();
             return null;
         }
         if (Common.telVerify(_number, function () {
                 //取消
                 callback && callback();
             },function(){
                 //去确认
                 $('.j_number').addClass('refund-error');
                 ccallback && ccallback();
                 return null;

             }))
         {
             callback && callback();
         }
     },
     saveData : function(opts){
         //console.log(opts);
         Ajax.postJsonp({
             url :Config.actions.orderConfirm+'/'+Base.others.getUrlPrem('order_id'),
             data : {param:JSON.stringify(opts.data)},
             type : 'put',
             timeout : 15000,
             success : function(obj){
                 if(obj.code == 200){
                     Dialog.tip({
                         top_txt : '',//可以是html
                         body_txt : '<p class="dialog-body-p">'+Lang.H5_SUBMIT_SUCCESS+'</p>',
                         auto_fn : function(){
                             setTimeout(function(){
                                 localStorage.setItem('ApplyRefundDetail',Config.host.hrefUrl + 'applyrefunddetail.php'+location.search);
                                 location.href = Config.host.hrefUrl + 'applyrefundsuccess.php'+location.search;
                             },1000);
                         }
                     });
                 }else{
                     Dialog.tip({
                         top_txt : '',//可以是html
                         body_txt : '<p class="dialog-body-p">'+obj.message+'</p>',
                         auto_fn : function(){
                             this.remove();
                             opts.callback && opts.callback();
                         }
                     });
                 }
             },
             error : function(error){
                 Dialog.tip({
                     top_txt : '',//可以是html
                     body_txt : '<p class="dialog-body-p">'+Lang.H5_ORDER_TIMEOUT_ERROR+'</p>',
                     auto_fn : function(){
                         this.remove();
                         opts.callback && opts.callback();
                     }
                 });

             }
         });
     },
     createList : function(data,type){
         var _htm = '';
         for(var i in data){
             _htm += '<div class="address-list-item j_list_item" data-ipt="'+type+'" data-val="'+data[i]+'">'+(Array.isArray(data)?data[i]:i)+'</div>'
         }
         return _htm;
     }
    };
    UploadProve.init();
})
