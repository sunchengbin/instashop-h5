/**
 * Created by sunchengbin on 2017/4/21.
 */
 /**
  * Created by sunchengbin on 2016/11/23.
  */
require(['hbs','uploadimg','config','lang','fastclick','dialog','btn','ajax','base','bankcity'],function(Hbs,UploadImg,Config,Lang,Fastclick,Dialog,Btn,Ajax,Base,BankCity){
    var UploadProve = {
     init : function(){
         var _this = this;
         UploadImg({
             wrap : '.j_upload_img_btn',
             uploadImgSuccess : function(result){
                 //提交上传商品图片后
                 var img = result[0].small;
                 console.log(result);
                 if($('.j_refund_img').length > 3){
                     Dialog.tip({
                         top_txt : '',//可以是html
                         body_txt : '<p class="dialog-body-p">最多上传三张</p>'
                     });
                 }else{
                     $('.j_refund_img_box').prepend('<li class="refund-img j_refund_img" data-src="'+img+'"><img src="'+img+'"/><i class="icon iconfont j_del_img icon-delete-font"></i></li>');
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
                 if(_this.isEdit()){
                     Dialog.confirm({
                         body_txt : '<p class="dialog-body-p">'+Lang.H5_EXIT_CONFIRM+'</p>',
                         cf_fn : function(){
                             location.href = localStorage.getItem('RefundBack');
                         }
                     });
                 }else{
                     location.href = localStorage.getItem('RefundBack');
                 }
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
         Btn({
             wraper : 'body',
             target : '.j_sub_btn',
             event_type : 'click',
             loading_txt:Lang.H5_SUBMITING,
             callback : function(dom){
                 var _that = this,
                     _step_one = _this.testStepOne(),
                     _items = _this.testData();
                 if(!_items){
                     _that.cancelDisable();
                     _that.setBtnTxt(dom,Lang.H5_CONFIRM);
                     return null;
                 }
                 var _body = '<p class="dialog-body-p">'+Lang.H5_BANK_NAME+' : '+_items.b_name+'</p>'
                             +'<p class="dialog-body-p">'+Lang.H5_SUB_BRANCH+' : '+_items.b_branch+'</p>'
                             +'<p class="dialog-body-p">'+Lang.H5_ACCOUNT_NAME+' : '+_items.c_name+'</p>'
                             +'<p class="dialog-body-p">'+Lang.H5_ACCOUNT_NUMBER+' : '+_items.c_number+'</p>';
                 Dialog.confirm({
                     top_txt : Lang.H5_CONFIRM_SUBMIT,
                     show_top : true,
                     body_txt : _body,
                     cf_fn : function(){
                         _this.saveData({
                             data : {
                                 edata: {
                                     "action": "refund",
                                     "bank_info" : {
                                         "c_number":_items.c_number,
                                         "c_name":_items.c_name,
                                         "b_name":_items.b_name,
                                         "b_branch":_items.b_branch
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
             }
         });
     },
     isEdit : function(){//是否编辑过
         var _this = this,
             _step_one_data = _this.testStepOne(),
             _data = _this.testIsEmpty();
         if(_step_one_data && _data){
             return true;
         }
         return false;
     },
     testIsEmpty : function(){
         var _bankname = $.trim($('.j_bank_name').val()),
             _branch= $.trim($('.j_branch').val()),
             _name = $.trim($('.j_name').val()),
             _number = $.trim($('.j_number').val());
         if(!_bankname){
             return null;
         }
         if(!_branch){
             return null;
         }
         if(!_name){
             return null;
         }
         if(!_number){
             return null;
         }
         return {
             "c_number":_number,
             "c_name":_name,
             "b_name":_bankname,
             "b_branch":_branch
         }
     },
     testStepOne : function(){
         var _refund_price = $.trim($('.j_refund_price').val()),
            _max_price = $('.j_refund_price').attr('data-maxprice'),
            _refund_explain = $.trim($('.j_refund_explain').val());
         if(!_refund_price){
             Dialog.tip({
                 top_txt : '',//可以是html
                 body_txt : '<p class="dialog-body-p">请填写提现金额</p>'
             });
             return null;
         }else{
             if(Number(_refund_price) > Number(_max_price)){
                 Dialog.tip({
                     top_txt : '',//可以是html
                     body_txt : '<p class="dialog-body-p">最多能提现Rp'+_max_price+'</p>'
                 });
                 return null;
             }
         }
         if(!_refund_explain){
             Dialog.tip({
                 top_txt : '',//可以是html
                 body_txt : '<p class="dialog-body-p">退款原因描述不能为空</p>'
             });
            return null;
         }else{
            if(_refund_explain > 1000){
                Dialog.tip({
                    top_txt : '',//可以是html
                    body_txt : '<p class="dialog-body-p">退款原因最多1000字符</p>'
                });
                return null;
            }
         }
         var _imgs = [];
         $('.j_refund_img').each(function(i,item){
             _imgs.push($(item).attr('data-src'));
         });
         if(!_imgs.length){
             Dialog.tip({
                 top_txt : '',//可以是html
                 body_txt : '<p class="dialog-body-p">请上传凭证</p>'
             });
             return null;
         }else{
             if(_imgs.length > 3){
                 Dialog.tip({
                     top_txt : '',//可以是html
                     body_txt : '<p class="dialog-body-p">最多上传三张</p>'
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
     testData : function(){
         var _bankname = $.trim($('.j_bank_name').val()),
             _branch= $.trim($('.j_branch').val()),
             _name = $.trim($('.j_name').val()),
             _number = $.trim($('.j_number').val());
         if(!_bankname){
             Dialog.tip({
                 top_txt : '',//可以是html
                 body_txt : '<p class="dialog-body-p">'+Lang.H5_BANK_NAME+' '+Lang.H5_NOT_EMPTY+'?</p>'
             });
             return null;
         }
         if(!_branch){
             Dialog.tip({
                 top_txt : '',//可以是html
                 body_txt : '<p class="dialog-body-p">'+Lang.H5_SUB_BRANCH+' '+Lang.H5_NOT_EMPTY+'?</p>'
             });
             return null;
         }
         if(!_name){
             Dialog.tip({
                 top_txt : '',//可以是html
                 body_txt : '<p class="dialog-body-p">'+Lang.H5_ACCOUNT_NAME+' '+Lang.H5_NOT_EMPTY+'?</p>'
             });
             return null;
         }
         if(!_number){
             Dialog.tip({
                 top_txt : '',//可以是html
                 body_txt : '<p class="dialog-body-p">'+Lang.H5_ACCOUNT_NUMBER+' '+Lang.H5_NOT_EMPTY+'?</p>'
             });
             return null;
         }
         return {
             "c_number":_number,
             "c_name":_name,
             "b_name":_bankname,
             "b_branch":_branch
         }
     },
     saveData : function(opts){
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
                                 location.href = localStorage.getItem('RefundBack');
                             },2000);
                         }
                     });
                 }else{
                     opts.callback && opts.callback();
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
