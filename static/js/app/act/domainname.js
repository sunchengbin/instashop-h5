/**
 * 独立域名活动-第二季
 */
require(['config','insjs','ajax','slide','dialog','fastclick','common'],function(Config,INSJS,Ajax,Slide,Dialog,Fastclick,Common){
    "use strict";


    var DM = window.DM = {
        StatusCheck:{
            isClient:true,//TODO 客户端版本是否符合要求上线记得改为false
            isDemand:false,//用户是否符合参与活动要求
            isAllowApply:false,//用户是否可以申请域名
            isDomainDone:false,//域名是否处理完毕
            isAllowInvite:false,//用户是否可以邀请好友
            isDomainHasApply:false,//用户是否已经申请了域名（失败算否）
            isHasInviteUser:false,//用户是否已有符合邀请的被邀请者
            isAllowShare:false//是否可以分享
        },
        init : function(){
            var _this = this;
            Fastclick.attach(document.body);
            //TODO url获取
            _this.user_info = {
                seller_id:Common.getQueryParam("seller_id"),
                wduss:Common.getQueryParam("wduss")
            };
            _this.testCase = Common.getQueryParam("testcase")||1;
            _this.initStatus();
            _this.initData();
            _this.handleFn();

            //TODO 上线打开
            // if(window.WebViewJavascriptBridge){
            //     _this.StatusCheck.isClient = true;
            //     INSJS.WebOnReady(function(bridge){
            //         _this.initData();
            //         _this.handleFn();
            //     })
            // }else{
            //     Dialog.alert({
            //         body_txt : 'Silakan upgrade ke Instashop versi 3.5 sebelum melanjutkan'
            //     });
            // }
        },
        initData:function(){
            var _this = this;
            //TODO 上线替换
            var testApi = 'http://api-test.instashop.co.id/instashop/v1/domain?param={"action":"invite","seller_id":"40687","wduss":"1k29nj9vdh6Pz/jqIZtKWdbTLsYA7YzMfdjiJm4UrQI=","_debug_env":"3.6"}'
            Ajax.getJsonp(testApi,function(_res){

                var res = {
                    code:200,
                    self_check:{
                        self_ok:false
                    },
                    invite_user :[],
                    domain:false

                };
                switch(_this.testCase){
                    //用户不符合要求
                    case "1":
                        res.self_check = {};
                        res.self_check.self_ok = false;
                        res.invite_user = [];
                        res.domain = false;
                        break;
                    //用户没邀请到人 或者 邀请到的不符合要求
                    case "2":
                        res.self_check = {};
                        res.self_check.self_ok = true;
                        res.invite_user = [];
                        res.domain = false;
                        break;
                    //用户有符合要求的被邀请人 但是还不够5
                    case "3":
                        res.self_check = {};
                        res.self_check.self_ok = true;
                        res.invite_user = [{
                            shop_name:"店铺名1",
                            telephone:"18601363531"
                        },{
                            shop_name:"店铺名2",
                            telephone:"18601363531"
                        },{
                            shop_name:"店铺名3",
                            telephone:"18601363531"
                        }];
                        res.domain = false;
                        break;
                    //用户没申请域名
                    case "4":
                        res.self_check = {};
                        res.self_check.self_ok = true;
                        res.invite_user = [{
                            shop_name:"店铺名1",
                            telephone:"18601363531"
                        },{
                            shop_name:"店铺名2",
                            telephone:"18601363531"
                        },{
                            shop_name:"店铺名3",
                            telephone:"18601363531"
                        },{
                            shop_name:"店铺名4",
                            telephone:"18601363531"
                        },{
                            shop_name:"店铺名5",
                            telephone:"18601363531"
                        }];
                        res.domain = false;
                        break;
                    //域名处理中
                    case "5":
                        res.self_check = {};
                        res.self_check.self_ok = true;
                        res.invite_user = [{
                            shop_name:"店铺名1",
                            telephone:"18601363531"
                        },{
                            shop_name:"店铺名2",
                            telephone:"18601363531"
                        },{
                            shop_name:"店铺名3",
                            telephone:"18601363531"
                        },{
                            shop_name:"店铺名4",
                            telephone:"18601363531"
                        },{
                            shop_name:"店铺名5",
                            telephone:"18601363531"
                        }];
                        res.domain = {
                            domain:"piaohua.com",
                            status:"wait"
                        };
                        break;
                    //域名处理失败了
                    case "6":
                        res.self_check = {};
                        res.self_check.self_ok = true;
                        res.invite_user = [{
                            shop_name:"店铺名1",
                            telephone:"18601363531"
                        },{
                            shop_name:"店铺名2",
                            telephone:"18601363531"
                        },{
                            shop_name:"店铺名3",
                            telephone:"18601363531"
                        },{
                            shop_name:"店铺名4",
                            telephone:"18601363531"
                        },{
                            shop_name:"店铺名5",
                            telephone:"18601363531"
                        }];
                        res.domain = {
                            domain:"piaohua.com",
                            status:"fail"
                        };
                        break;
                    //域名处理成功了
                    case "7":
                        res.self_check = {};
                        res.self_check.self_ok = true;
                        res.invite_user = [{
                            shop_name:"店铺名1",
                            telephone:"18601363531"
                        },{
                            shop_name:"店铺名2",
                            telephone:"18601363531"
                        },{
                            shop_name:"店铺名3",
                            telephone:"18601363531"
                        },{
                            shop_name:"店铺名4",
                            telephone:"18601363531"
                        },{
                            shop_name:"店铺名5",
                            telephone:"18601363531"
                        }];
                        res.domain = {
                            domain:"piaohua.com",
                            status:"success"
                        };
                        break;
                }

                var _selfCheckData = res.self_check||{};
                var _domainCheckData = res.domain;
                var _inviteUserList = res.invite_user;
                console.log(res);

                if(res&&200==res.code){
                    //是否符合要求
                    _this.StatusCheck.isDemand = _selfCheckData.self_ok;
                    //是否允许点击邀请按钮
                    _this.StatusCheck.isAllowInvite = _selfCheckData.self_ok;
                    if(_inviteUserList.length>0){

                        $(".j_invite_table").html(_this.createInviterTable(_inviteUserList));
                        $(".invite-table").show();
                        $(".j_invite_tip").text('Undangan yang sudah memenuhi syarat')
                        if(_inviteUserList.length>=5){
                            _this.StatusCheck.isHasInviteUser = true;
                        }

                    }else{
                        //TODO 隐藏表格
                        $(".invite-table").hide();
                        $(".j_invite_tip").text('Undangan yang belum memenuhi syarat')
                        _this.StatusCheck.isHasInviteUser = false;
                    }
                    //是否允许点击申请按钮
                    if(_domainCheckData){
                        //域名状态 失败 等待 成功
                        switch(_domainCheckData.status){
                            case "fail":
                                //TODO 域名绑定失败 请重新申请
                                _this.StatusCheck.isAllowApply = true;
                                break;
                            case "wait":
                                //TODO 域名绑定处理中
                                _this.StatusCheck.isAllowApply = false;
                                break;
                            case "success":
                                //TODO 直接显示域名
                                _this.StatusCheck.isAllowApply = false;
                                break;
                        }
                    }else{
                        //没申请过
                        _this.StatusCheck.isAllowApply = true;
                    }
                }else{
                    Dialog.alert({
                        body_txt : '接口返回错误'
                    })
                }
            },function(){
                //TODO 通信报错
            });
        },
        initStatus:function(){
            var ctx = this;
            Object.defineProperties(ctx.StatusCheck,{
                "isDemand":{
                    get:function(){
                        //客户端是否符合 && 接口
                        return !!this.isClient && this._isDemand;
                    },
                    set:function(val){
                        if(val){
                            $(".j_invite_btn").removeClass('disable-btn')
                            $(".invite-iscan").text("Syarat sudah terpenuhi")
                            $(".invite-number-box").show();
                        }else{
                            $(".j_invite_btn").addClass('disable-btn')
                            $(".invite-iscan").text("Syarat belum terpenuhi")
                            $(".invite-number-box").hide();
                        }
                        this._isDemand = val;
                    }
                },
                "isAllowInvite":{
                    get:function(){
                        //当 用户3.5版本下 与 符合条件 与 已经申请域名时 返回true
                        return !!this._isAllowInvite;
                    },
                    set:function(val){
                        if(val){
                            //当 用户3.5版本下 与 符合条件 与 有达标被邀请者 时 设置为true生效
                            $(".j_invite_btn").removeClass('disable-btn')
                        }else{
                            $(".j_invite_btn").addClass('disable-btn')
                        }
                        this._isAllowInvite = val;
                    }
                },
                "isAllowApply":{
                    get:function(){
                      return !!this._isAllowApply;
                    },
                    set:function(val){
                        if(val){
                            //当 用户3.5版本下 与 符合条件 与 有达标被邀请者 时 设置为true生效
                            if(this.isClient && this.isDemand && this.isHasInviteUser){
                                this.isAllowInvite = val;
                                $(".j_domain_btn").removeClass('disable-btn')
                            }else{
                                val = !val;
                            }
                        }else{
                            $(".j_domain_btn").addClass('disable-btn')
                        }
                        this._isAllowApply = val;
                    }
                },
                "isDomainDone":{
                    get:function(){
                        //接口
                        return false;
                    }
                },
                "isDomainHasApply":{
                    get:function(){
                        //接口
                        return false;
                    },
                    set:function(val){

                    }
                }
            })
        },
        handleFn : function(){
            var _this = this;
            _this.tel_dialog = null;
            _this.domain_dialog = null;

            //邀请按钮
            $("body").on("click",".j_invite_btn",function(){
                if(_this.StatusCheck.isAllowInvite){
                    _this.tel_dialog = Dialog.dialog({
                        body_txt : _this.createInviteDialogHtm(),
                        show_footer:false,
                        show_top:false
                    });
                }
            })
            //分享按钮
            $('body').on('click','.j_share_btn',function(){
                if(_this.StatusCheck.isAllowShare){

                }
                _this.tel_dialog = Dialog.dialog({
                    body_txt : _this.createShareDialogHtm(),
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
                if(_this.StatusCheck.isAllowApply){
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
                            action : 'search',
                            seller_id : _this.user_info.seller_id,
                            wduss : _this.user_info.wduss,
                            domain : _domain+'.com'
                        },function(){
                            if(confirm('Domain ini masih bisa digunakan, segera registrasikan domainmu!')){
                                _this.actionFn({
                                    domain : _domain+'.com',
                                    seller_id : _this.user_info.seller_id,
                                    wduss : _this.user_info.wduss,
                                    phones: _this.tels
                                },function(obj){
                                    _this.domain_dialog.remove();
                                    alert('Pendaftaran domain membutuhkan 72 jam, silakan tunggu sejenak. Selama kurun waktu ini, customermu masih dapat mengunjungi mini webmu di alamat '+_this.user_info.seller_id+'.instashop.co.id ');
                                });
                            }else{
                                _this.domain_btn_disable = true;
                                $('.j_domain_error').html('');
                            }
                        });
                    }
                }else{
                    _this.domain_btn_disable = true;
                    if(/instashop/g.test(_domain)){
                        $('.j_domain_error').html('Link toko ini tidak disetujui');
                    }else{
                        $('.j_domain_error').html('Masukkan domain dengan tepat');
                    }

                }
            });
        },
        createInviteDialogHtm:function(){
            var _htm = '';
            _htm = '<div class="invite-dialog">'+
                '    <div class="invite-dialog-input">'+
                '        <textarea name="content" value="" id="j_invite_txt"'+
                '                  placeholder=" Hi! Sekarang bikin web ga perlu bayar jutaan rupiah lagi. Yuk buat webstore GRATIS untuk online shopmu dengan Instashop. Klik"></textarea>'+
                '    </div>'+
                '    <div class="invite-share-box">'+
                '        <ul class="ins-avg-sm-4">'+
                '            <li>'+
                '                <i class="iconfont icon-share-copy"></i>'+
                '                <p>COPY</p>'+
                '            </li>'+
                '            <li><i class="iconfont icon-share-line"></i>'+
                '                <p>LINE</p></li>'+
                '            <li><i class="iconfont icon-share-bbm"></i>'+
                '                <p>BBM</p></li>'+
                '            <li><i class="iconfont icon-share-whatsapp"></i>'+
                '                <p>WhatsApp</p>'+
                '            </li>'+
                '        </ul>'+
                '    </div>'+
                '</div>';
            return _htm;

        },
        createShareDialogHtm:function(){
          var _htm = "";
            _htm = '<div class="invite-dialog">'+
                '    <div class="invite-dialog-img">'+
                '        <img src="images/share_demo.jpeg">'+
                '    </div>'+
                '    <div class="invite-share-box">'+
                '        <ul class="ins-avg-sm-4">'+
                '            <li>'+
                '                <i class="iconfont icon-share-copy"></i>'+
                '                <p>COPY</p>'+
                '            </li>'+
                '            <li><i class="iconfont icon-share-line"></i>'+
                '                <p>LINE</p></li>'+
                '            <li><i class="iconfont icon-share-bbm"></i>'+
                '                <p>BBM</p></li>'+
                '            <li><i class="iconfont icon-share-whatsapp"></i>'+
                '                <p>WhatsApp</p>'+
                '            </li>'+
                '        </ul>'+
                '    </div>'+
                '</div>';
            return _htm;
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
        createInviterTable:function(inviters){
            var _trs = "";
            for(var i = 0,inviter;inviter = inviters[i++];){
                var _curTr = '<tr><td>'+inviter.shop_name+'</td><td>'+inviter.telephone+'</td></tr>';
                _trs +=_curTr;
            }
            return _trs;
        },
        createDomainDialogHtm : function(){
            var _htm = '';
            _htm +='<div class="domain-box">'
                +'<p>Tulis domain web yang kamu inginkan :</p>'
                +'<div class="domain-error j_domain_error"></div>'
                +'<div class="domain-input">'
                +'<input class="j_domain_ipt" maxlength="20" type="text">'
                +'</div>'
                +'<div class="input-explain">'
                +'1. Link toko terdiri dari 5-20 karakter<br>'
                +'2. Hanya diperbolehkan berupa angka (0-9) dan abjad (a-z)<br>'
                +'3. Di dalam nama domain tersebut tidak boleh mengandung Instashop<br>'
                +'4. Jika ada pertanyaan, silahkan hubungi kami<br>'
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
                    }
                );
            }else{
                if(opts.action == 'search'){
                    Ajax.getJsonp(
                        Config.host.actionUrl+Config.actions.domainName+'?param='+JSON.stringify(_data),
                        function(obj){
                            if(obj.code == 200){
                                callback && callback(obj);
                            }else{
                                $('.j_domain_error').html(obj.message);
                                _this.domain_btn_disable = true;
                            }
                        },
                        function(obj){
                            _this.domain_btn_disable = true;
                            $('.j_domain_error').html(obj.message);
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