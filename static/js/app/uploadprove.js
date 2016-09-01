/**
 * Created by sunchengbin on 16/8/31.
 * 上传证明
 */
require(['hbs','text!views/app/uploadprove.hbs','config','lang','fastclick','dialog','btn','ajax','base'],function(Hbs,UploadProveHtm,Config,Lang,Fastclick,Dialog,Btn,Ajax,Base){
    var UploadProve = {
        init : function(){
            var _this = this;
            try{
                var _htm= Hbs.compile(UploadProveHtm)({
                    data : init_data,
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
                history.back();
            });
            $('body').on('keyup','.j_tel',function(){

            });
            $('body').on('focus','.j_from',function(){
                var _list = _this.createList(init_data.bank_list,'j_from');
                $('.j_list_box').html(_list);
                $('.j_address_list_box').removeClass('hide').addClass('show');
                $(this).blur();
            });
            $('body').on('focus','.j_to',function(){
                var _list = _this.createList(init_data.receive_bank,'j_to');
                $('.j_list_box').html(_list);
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
            $('body').on('focus','.j_price',function(){
                var _price = $(this).val();
                if(_price != '' && !/Rp/g.test(_price)){
                    $(this).val('Rp '+_price);
                }

            });
            $('body').on('keyup','.j_price',function(){
                var _this = $(this);
                var _price = $.trim(_this.val().replace(/Rp\s/g,''));
                var _msg = '';
                if(_price != ''){
                    if(/\./g.test(_price)){
                        if(/\.00$/g.test(_price)){
                            _price = _price.replace(/\./g,'')/100;
                        }else{
                            _price = _price.replace(/\./g,'');
                        }
                    }
                    if(isNaN(_price)){
                        _msg = Lang.H5_PRICE_MUST_NUM;
                    }else{
                        if(_price <= 0){
                            _msg = Lang.H5_PRICE_MUST_NUM;
                        }else{
                            if(_price.length > 10){
                                _price =  _price.substr(0,10);
                            }
                        }
                    }

                    if(_msg){
                        Dialog.tip({
                            top_txt : '',//可以是html
                            body_txt : '<p class="dialog-body-p">'+_msg+'</p>'
                        });
                        return;
                    }
                    _this.val('Rp '+Base.others.priceFormat(_price));
                }
            });
            Btn({
                wraper : 'body',
                target : '.j_sub_btn',
                event_type : 'click',
                loading_txt:Lang.H5_SUBMITTING_ORDER,
                callback : function(dom){
                    var _that = this,
                        _items = _this.testData();
                    if(!_items){
                        _that.cancelDisable();
                        _that.setBtnTxt(dom,'Ajukan');
                        return null;
                    }
                    //验证单品详情页的
                    _this.saveData({
                        data : {
                            edata: {
                                "order_id": Base.others.getUrlPrem('order_id'),
                                "account_name": _items.name,
                                "trans_from": _items.from,
                                "trans_to": _items.to,
                                "price": _items.price,
                                "date": _items.time,
                                action:'h5'
                            }
                        },
                        callback : function(){
                            _that.cancelDisable();
                            _that.setBtnTxt(dom,'Ajukan');
                        }
                    });
                }
            });
        },
        testData : function(){
            var _name = $.trim($('.j_bank').val()),
                _from = $.trim($('.j_from').val()),
                _to = $.trim($('.j_to').val()),
                _price = $.trim($('.j_price').val()),
                _time = $.trim($('.j_time').val());
            if(!_name){
                Dialog.tip({
                    top_txt : '',//可以是html
                    body_txt : '<p class="dialog-body-p">Nama Pengirim di Rekening Bank '+Lang.H5_NOT_EMPTY+'?</p>'
                });
                return null;
            }
            if(!_from){
                Dialog.tip({
                    top_txt : '',//可以是html
                    body_txt : '<p class="dialog-body-p">Transfer dari '+Lang.H5_NOT_EMPTY+'?</p>'
                });
                return null;
            }
            if(!_to){
                Dialog.tip({
                    top_txt : '',//可以是html
                    body_txt : '<p class="dialog-body-p">Transfer ke '+Lang.H5_NOT_EMPTY+'?</p>'
                });
                return null;
            }
            _price = $.trim(_price.replace(/Rp\s/g,''));
            if(_price != ''){
                if(/\./g.test(_price)){
                    if(/\.00$/g.test(_price)){
                        _price = _price.replace(/\./g,'')/100;
                    }else{
                        _price = _price.replace(/\./g,'');
                    }
                }
                if(isNaN(_price) || _price == 0){
                    Dialog.tip({
                        top_txt : '',//可以是html
                        body_txt : '<p class="dialog-body-p">'+Lang.H5_PRICE_MUST_NUM+'</p>'
                    });
                    return null;
                }
            }else{
                Dialog.tip({
                    top_txt : '',//可以是html
                    body_txt : '<p class="dialog-body-p">Jumlah '+Lang.H5_NOT_EMPTY+'?</p>'
                });
                return null;
            }

            if(!_time){
                Dialog.tip({
                    top_txt : '',//可以是html
                    body_txt : '<p class="dialog-body-p">Tanggal Transfer '+Lang.H5_NOT_EMPTY+'?</p>'
                });
                return null;
            }
            return {
                name :_name,
                from:_from,
                to:_to,
                price:_price,
                time:_time
            }
        },
        saveData : function(opts){
            Ajax.postJsonp({
                url :Config.actions.uploadprove,
                data : {param:JSON.stringify(opts.data)},
                type : 'POST',
                timeout : 15000,
                success : function(obj){
                    if(obj.code == 200){
                        Dialog.tip({
                            top_txt : '',//可以是html
                            body_txt : '<p class="dialog-body-p">'+Lang.H5_SUBMIT_SUCCESS+'</p>',
                            auto_fn : function(){
                                location.href = Config.host.host+'o/'+Base.others.getUrlPrem('hash');
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
