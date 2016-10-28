/**
 * Created by sunchengbin on 2016/10/25.
 * 独立域名申请活动页面
 */
require(['config','ajax','slide','dialog','fastclick'],function(Config,Ajax,Slide,Dialog,Fastclick){
    var DM = {
        init : function(){
            var _this = this;
            Slide.createNew({
                dom: document.querySelector('.j_user_list'),
                needTab: true,
                auto : false
            });
            //本地测试
            _this.user_info = {
                seller_id:'40687',
                wduss:"1k29nj9vdh6Pz/jqIZtKWdbTLsYA7YzMfdjiJm4UrQI="
            };
            _this.handleFn();
            //实际测试
            //_this.user_info = null;
            //window.InsCallBack = function(obj){
            //    if(obj){
            //        if(typeof obj == 'string'){
            //            obj = JSON.parse(obj);
            //        }
            //        _this.user_info = obj;
            //        _this.handleFn();
            //    }
            //};
            //if(window.InsJs){
            //    window.InsJs.getUserInfo();
            //}else{
            //    Dialog.alert({
            //        body_txt : 'Silakan upgrade ke Instashop versi 3.3 sebelum melanjutkan'
            //    });
            //}
        },
        handleFn : function(){
            var _this = this;
            _this.tel_dialog = null;
            _this.domain_dialog = null;
            Fastclick.attach(document.body);
            $('body').on('click','.j_tel_btn',function(){
                _this.tel_dialog = Dialog.dialog({
                    body_txt : _this.createTelDialogHtm(),
                    show_footer:false,
                    show_top:false
                });
            });
            $('body').on('keyup','.j_tel',function(){
                $('.j_tel_error').html('');
                if(_this.testTel().length == 5){
                    $('.j_submit_tel').removeClass('disable-btn');
                }else{
                    $('.j_submit_tel').addClass('disable-btn');

                }
            });
            _this.tel_btn_disable = true;
            $('body').on('click','.j_submit_tel',function(){
                if($(this).is('.disable-btn') || !_this.tel_btn_disable){
                    return;
                }
                _this.tel_btn_disable = false;
                if(_this.testTel().length == 5){
                    $('.j_submit_tel').html('Ajukan...');
                    _this.tels = _this.testTel();
                    _this.actionFn({
                        action : 'check',
                        phones : _this.testTel(),
                        seller_id : _this.user_info.seller_id,
                        wduss : _this.user_info.wduss
                    },function(){
                        $('.j_domain_btn').removeClass('disable-btn2');
                        _this.tel_dialog.remove();
                    });
                }else{
                    _this.tel_btn_disable = true;
                }
            });
            $('body').on('click','.j_domain_btn',function(){
                if(!$(this).is('.disable-btn2')){
                    _this.domain_dialog = Dialog.dialog({
                        body_txt : _this.createDomainDialogHtm(),
                        show_footer:false,
                        show_top:false
                    });
                }
            });
            $('body').on('keyup','.j_domain_ipt',function(){
                $('.j_domain_error').html('');
            });
            _this.domain_btn_disable = true;
            $('body').on('click','.j_domain_submit',function(){
                var _domain = $.trim($('.j_domain_ipt').val());
                if(!_this.domain_btn_disable){
                    return;
                }
                _this.domain_btn_disable = false;
                if(_this.testDomain(_domain)){
                    if( _this.tels.length == 5){
                        $('.j_domain_error').html('Ajukan...');
                        _this.actionFn({
                            domain : _domain+'.com',
                            seller_id : _this.user_info.seller_id,
                            wduss : _this.user_info.wduss,
                            phones: _this.tels
                        },function(obj){
                            _this.domain_dialog.remove();
                            Dialog.tip({
                                body_txt : obj.message
                            });
                            //alert(obj.message);
                        });
                    }
                }else{
                    _this.domain_btn_disable = true;
                    $('.j_domain_error').html('Masukkan domain dengan tepat');
                }
            });
        },
        createTelDialogHtm : function(){
            var _htm = '';
            _htm = '<div class="tel-dialog">'
                    +'<p>Masukkan 5 nomor ponsel teman yang kamu referensikan untuk bergabung di Instashop.</p>'
                    +'<ul>'
                    +'<li class="clearfix"><div><span>+62</span><input class="j_tel" type="tel"></div></li>'
                    +'<li class="clearfix"><div><span>+62</span><input class="j_tel" type="tel"></div></li>'
                    +'<li class="clearfix"><div><span>+62</span><input class="j_tel" type="tel"></div></li>'
                    +'<li class="clearfix"><div><span>+62</span><input class="j_tel" type="tel"></div></li>'
                    +'<li class="clearfix"><div><span>+62</span><input class="j_tel" type="tel"></div></li>'
                    +'</ul>'
                    +'<p class="j_tel_error tel-error"></p>'
                    +'<button class="tel-btn disable-btn j_submit_tel">Isi Data Teman</button>'
                    +'</div>';
            return _htm;
        },
        createDomainDialogHtm : function(){
            var _htm = '';
            _htm +='<div class="domain-box">'
            +'<p>Tulis domain web yang kamu inginkan :</p>'
            +'<div class="domain-error j_domain_error"></div>'
            +'<div class="domain-input">'
            +'<input class="j_domain_ipt" type="text">'
            +'</div>'
            +'<button class="btn3 j_domain_submit"></button>'
            +'<div class="domain-cont">'
            +'<p>1. Setelah diubah, nanti alamat web Instashop kalian bukan lagi namatoko.instashop.co.id, tapi langsung berubah menjadi <span>namatoko.com :)</span></p>'
            +'<p>2. Nama domain tidak harus sama dengan nama toko,tapi hanya boleh mengandung angka dan huruf abjad <span>(tidak boleh mengandung karakter).</span></p>'
            +'<p>Contoh domain yang tepat: namatoko.com, </p>'
            +'<p>namatoko123.com</p>'
            +'<p>Contoh domain yang salah: nama_toko.com, </p>'
            +'<p>namatoko@.com </p>'
            +'<p>3. Domain tidak dapat diubah setelah didaftarkan.Proses pendaftaran domain web membutuhkan waktu <span>72 jam</span> sebelum dapat digunakan. Sebelum itu, kamu masih bisa menggunakan namatoko.instashop.co.id</p>'
            +'</div>'
            +'</div>';
            return _htm;
        },
        actionFn : function(opts,callback){
            var _this = this,
                _data = {
                edata:opts
            };
            if(opts.action == 'check'){
                Ajax.getJsonp(
                    Config.host.actionUrl+Config.actions.domainName+'?param='+JSON.stringify(_data),
                    function(obj){
                        _this.tel_btn_disable = true;
                        if(obj.code == 200){
                            callback && callback(obj);
                        }else{
                            $('.j_tel_error').html(obj.message);
                            //alert(obj.message);
                        }
                        $('.j_submit_tel').html('Isi Data Teman');
                    },
                    function(obj){
                        _this.tel_btn_disable = true;
                        $('.j_tel_error').html(obj.message);
                        $('.j_submit_tel').html('Isi Data Teman');
                        //alert(obj.message);
                    }
                );
            }else{
                Ajax.postJsonp({
                    url : Config.actions.domainName,
                    data : {param:JSON.stringify(_data)},
                    type : 'POST',
                    success : function(obj){
                        _this.domain_btn_disable = true;
                        if(obj.code == 200){
                            callback && callback(obj);
                        }else{
                            $('.j_domain_error').html(obj.message);
                            //alert(obj.message);
                        }
                    },
                    error : function(error){
                        _this.domain_btn_disable = true;
                        $('.j_domain_error').html(error);
                        //alert(error);
                    }
                });
            }

        },
        testDomain : function(url){
            if(url.length > 4 && url.length < 21 && /^[0-9a-zA-Z]+$/.test(url) && !/instashop/g.test(url)){
                return true;
            }
            return false;
        },
        testTel : function(){
            var _tels = [];
            $('.j_tel').each(function(){
                var _val = $.trim($(this).val());
                if(_val!=''){
                    _tels.push(_val);
                }
            });
            return _tels;
        }
    };
    DM.init();
})