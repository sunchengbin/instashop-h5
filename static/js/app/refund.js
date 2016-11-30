/**
 * Created by sunchengbin on 2016/11/23.
 */
require(['hbs','text!views/app/refund.hbs','config','lang','fastclick','dialog','btn','ajax','base','bankcity'],function(Hbs,RefundHtm,Config,Lang,Fastclick,Dialog,Btn,Ajax,Base,BankCity){
    var UploadProve = {
        init : function(){
            var _this = this,
                _refund = localStorage.getItem('RefundCard'),
                _refund_card = _refund?JSON.parse(_refund):null;
            try{
                var _htm= Hbs.compile(RefundHtm)({
                    data : _refund_card&&_refund_card.b_branch?_refund_card:null,
                    lang : Lang
                });
                $('body').prepend(_htm);
                _this.handleFn();
            }
            catch(error){

            }
        },
        handleFn : function(){
            var _this = this;
            Fastclick.attach(document.body);
            $('body').on('click','.j_go_back',function(){
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
                            //验证单品详情页的
                            _this.saveData({
                                data : {
                                    edata: {
                                        "action":"refund_card",
                                        "c_number":_items.c_number,
                                        "c_name":_items.c_name,
                                        "b_name":_items.b_name,
                                        "b_branch":_items.b_branch
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
                            return null;
                        }
                    });
                }
            });
        },
        isEdit : function(){//是否编辑过
            var _this = this,
                _data = _this.testData(),
                _refund = localStorage.getItem('RefundCard'),
                _refund_card = _refund?JSON.parse(_refund):null;
            if(_data){
                if(_refund_card && _refund_card.b_branch){//已经提交过现在进行编辑
                    if(_refund_card.b_branch == _data.b_branch && _refund_card.b_name == _data.b_name && _refund_card.c_name == _data.c_name && _refund_card.c_number == _data.c_number){
                        return false;
                    }else{
                        return true;
                    }
                }else{
                    return true;
                }
            }
            return false;
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
