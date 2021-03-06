/**
 * 独立域名活动-第二季
 */
require(['config', 'insjs', 'ajax', 'dialog', 'fastclick', 'common', 'lang'], function (Config, Insjs, Ajax, Dialog, Fastclick, Common, Lang) {
    "use strict";

    var DM = window.DM = {
        debug: {
            debugInfo: "",
            requrl: ""
        },
        act_data: act_data,
        bridge: null,
        StatusCheck: {
            isClient: false, //客户端版本是否符合要求
            isDemand: false, //用户是否符合参与活动要求
            isAllowApply: false, //用户是否可以申请域名
            isAllowInvite: false, //用户是否可以邀请好友
            isHasInviteUser: false, //用户是否已有符合邀请的被邀请者
            isAllowShare: false //是否可以分享
        },
        init: function () {
            var _this = this;
            Fastclick.attach(document.body);
            //用户信息
            _this.user_info = {
                seller_id: Common.getQueryParam("seller_id"),
                wduss: encodeURIComponent(Common.getQueryParam("wduss"))
            };
            // _this.initStatus();
            $(".invite-number").text(_this.user_info.seller_id);
            $(".invite-number-box").show();
            // _this.StatusCheck.isDemand = false;
            Insjs.judgeVersion("3.5", function () {
                    //初始化状态监控
                    _this.initStatus();
                    _this.initData();
                    _this.handleFn();
                    Insjs.WebOnReady(function (bridge) {
                        _this.bridge = bridge;
                    }, function () {
                        _this.versionTipDialog();
                    });
                }, function () {
                    // _this.StatusCheck.isDemand = false;
                    _paq.push(['trackEvent', '低于3.5版本提示', 'autotip', '']);
                    Dialog.alert({
                        body_txt: 'Silakan update ke versi terbaru untuk mengikuti promo ini'
                    });
                })
        },
        versionTipDialog: function () {
            _paq.push(['trackEvent', '低于3.5版本提示', 'autotip', '']);
            Dialog.alert({
                body_txt: 'Silakan update ke 3.5 sebelum menggunakan fitur ini'
            });
        },
        initData: function () {
            var _this = this;
            _this.StatusCheck.isAllowInvite = true;
            $(".invite-iscan").text("Sedang diverifikasi").css("color", "#8B572A");
            var res = _this.act_data;
            var _selfCheckData = res.self_check || {};
            var _domainCheckData = res.domain;
            var _inviteUserList = res.invite_user;
            _this.debug.debugInfo = JSON.stringify(res);
            if (res && 200 == res.code) {
                //是否符合要求
                _this.StatusCheck.isDemand = _selfCheckData.self_ok;
                //是否允许点击邀请按钮
                _this.StatusCheck.isAllowInvite = true;
                if (_inviteUserList.length > 0) {

                    $(".j_invite_table").html(_this.createInviterTable(_inviteUserList));
                    $(".invite-table").show();
                    $(".j_invite_tip").hide();
                    if (_inviteUserList.length >= 5) {
                        _this.StatusCheck.isHasInviteUser = true;
                    }

                } else {
                    $(".invite-table").hide();
                    $(".j_invite_tip").show();
                    $(".j_invite_tip").text('Belum ada teman yang memenuhi syarat')
                    _this.StatusCheck.isHasInviteUser = false;
                }
                //是否允许点击申请按钮
                if (_domainCheckData) {
                    //域名状态 失败 等待 成功
                    switch (_domainCheckData.status) {
                        case "fail":
                            //TODO 域名绑定失败 请重新申请
                            $(".j_domain_tip").text("Domain ini sudah digunakan, silakan gunakan domain lain")
                            _this.StatusCheck.isAllowApply = true;
                            break;
                        case "wait":
                            $(".j_domain_tip").text("Pendaftaran Sedang Diproses")
                            $(".j_domain_btn").hide();
                            _this.StatusCheck.isAllowApply = false;
                            break;
                        case "succ":
                            $(".j_domain_succ").html("Selamat, registrasi domainmu berhasil!</br>Yuk segera bagikan web barumu ini!");
                            $(".j_domain_tip").html(_domainCheckData.domain);
                            $(".j_domain_btn").hide();
                            $(".j_share_btn").show();
                            _this.domainImg = res.share[0];
                            _this.domain = _domainCheckData.domain;
                            _this.StatusCheck.isAllowShare = true;
                            _this.StatusCheck.isAllowApply = false;
                            window.location.href = "#result";
                            break;
                    }
                } else {
                    //没申请过
                    _this.StatusCheck.isAllowApply = true;
                }
            } else {
                _this.StatusCheck.isAllowInvite = false;
                Dialog.alert({
                    top_txt: '', //可以是html
                    body_txt: '<p class="dialog-body-p">' + (res.message ? res.message : Lang.H5_ERROR) + '</p>'
                });
            }
        },
        initStatus: function () {
            var ctx = this;
            Object.defineProperties(ctx.StatusCheck, {
                "isDemand": {
                    get: function () {
                        //客户端是否符合 && 接口
                        return !!this._isDemand;
                    },
                    set: function (val) {
                        if (val) {
                            $(".invite-iscan").text("Syarat ini sudah terpenuhi").css("color", "#54AE59");
                            $(".invite-number").text(ctx.user_info.seller_id);
                            $(".invite-number-box").show();
                        } else {
                            $(".invite-iscan").text("Syarat ini belum terpenuhi").css("color", "red");
                            $(".invite-number").text(ctx.user_info.seller_id);
                            $(".invite-number-box").show();
                        }
                        this._isDemand = val;
                    }
                },
                "isAllowInvite": {
                    get: function () {
                        //当 用户3.5版本下 与 符合条件 与 已经申请域名时 返回true
                        return !!this._isAllowInvite;
                    },
                    set: function (val) {
                        if (val) {
                            //当 用户3.5版本下 与 符合条件 与 有达标被邀请者 时 设置为true生效
                            $(".j_invite_btn").removeClass('disable-btn')
                        } else {
                            $(".j_invite_btn").addClass('disable-btn')
                        }
                        this._isAllowInvite = val;
                    }
                },
                "isAllowApply": {
                    get: function () {
                        return !!this._isAllowApply;
                    },
                    set: function (val) {
                        if (val) {
                            //当 用户3.5版本下 与 符合条件 与 有达标被邀请者 时 设置为true生效
                            if (this.isDemand && this.isHasInviteUser) {
                                $(".j_domain_btn").removeClass('disable-btn')
                                $(".j_domain_btn").show()
                            } else {
                                val = !val;
                            }
                        } else {
                            $(".j_domain_btn").addClass('disable-btn')
                        }
                        this._isAllowApply = val;
                    }
                }
            })
        },
        handleFn: function () {
            var _this = this;
            _this.domain_dialog = null;

            //邀请按钮
            $("body").on("click", ".j_invite_btn", function () {
                    Insjs.judgeVersion("3.5", function () {
                        if (_this.StatusCheck.isAllowInvite) {
                            _paq.push(['trackEvent', '邀请按钮', 'click', '']);
                            var _report = $(this).attr("data-report");
                            reportEventStatistics(_report);
                            _this.invite_dialog = Dialog.dialog({
                                body_txt: _this.createInviteDialogHtm(),
                                show_footer: false,
                                show_top: false,
                                c_fn: function () {
                                    _paq.push(['trackEvent', '关闭邀请弹层', 'click', '']);
                                }
                            });
                        }
                    }, function () {
                        _this.versionTipDialog();
                    })
                })
                //分享按钮
            $('body').on('click', '.j_share_btn', function () {
                Insjs.judgeVersion("3.5", function () {
                    if (_this.StatusCheck.isAllowShare) {
                        _paq.push(['trackEvent', '分享按钮', 'click', '']);
                        var _report = $(this).attr("data-report");
                        reportEventStatistics(_report);
                        _this.share_dialog = Dialog.dialog({
                            body_txt: _this.createShareDialogHtm(),
                            show_footer: false,
                            show_top: false,
                            body_fn: function () {
                                var _dialog = this;
                                var _shareImg = $(".invite-dialog-img-url")[0];
                                _shareImg.src = _this.domainImg;
                                _shareImg.onload = function () {
                                    _dialog.opts.wraper.css(_dialog.setPosition());
                                }
                            },
                            c_fn: function () {
                                _paq.push(['trackEvent', '关闭分享弹层', 'click', '']);
                            }
                        });
                    }

                }, function () {
                    _this.versionTipDialog();
                })
            });

            $('body').on('click', '.j_invite_action', function () {
                var _dom = $(this),
                    _type = _dom.attr('data-type'),
                    _report = _dom.attr('data-report'),
                    _invite_txt = $.trim($("#j_invite_txt").val());
                _invite_txt = _invite_txt.replace('http://www.instashop.co.id', 'http://www.instashop.co.id?from=' + _type +"\&seller_id=" + _this.user_info.seller_id);
                if("share_to_bbm"==_type){
                    _invite_txt = escape(_invite_txt);
                }
                var _param = {
                    param: {
                        type: 'share',
                        param: {
                            type: _type,
                            data: [{
                                img: '',
                                content: _invite_txt,
                                link_url: 'http://www.instashop.co.id?from=' + _type + "&seller_id=" + _this.user_info.seller_id
                            }]
                        }
                    }
                };
                try {
                    reportEventStatistics(_report);
                    _this.bridge.callHandler('insSocket', _param, function (response) {
                        return null;
                    });
                } catch (e) {
                    _this.versionTipDialog();
                }
            });
            $('body').on('click', '.j_share_action', function () {
                var _dom = $(this),
                    _type = _dom.attr('data-type'),
                    _report = $(this).attr('data-report');
                var _param = {
                    param: {
                        type: 'share',
                        param: {
                            type: _type,
                            data: [{
                                img: _this.domainImg,
                                link_url: _this.domain
                            }]
                        }
                    }
                };
                try {
                    reportEventStatistics(_report);
                    _this.bridge.callHandler('insSocket', _param, function (response) {
                        return null;
                    });
                } catch (e) {
                    _this.versionTipDialog();
                }
            });


            $('body').on('click', '.j_domain_btn', function () {
                if (_this.StatusCheck.isAllowApply) {
                    _paq.push(['trackEvent', '申请域名', 'click', '']);
                    var _report = $(this).attr('data-report');
                    reportEventStatistics(_report);
                    _this.domain_dialog = Dialog.dialog({
                        body_txt: _this.createDomainDialogHtm(),
                        show_footer: false,
                        show_top: false,
                        c_fn: function () {
                            _paq.push(['trackEvent', '关闭申请域名弹层', 'click', '']);
                        }
                    });
                }
            });
            $("body").on("click", ".j_debug_btn", function () {
                Dialog.alert({
                    body_txt: "请求:" + _this.debug.requrl + "</br>回参:</br>" + _this.debug.debugInfo
                });
            });
            $('body').on('keyup', '.j_domain_ipt', function () {
                $('.j_domain_error').html('');
            });
            $('body').on('click', '.j_domain_submit', function () {
                if (_this.StatusCheck.isAllowApply) {
                    var _domain = $.trim($('.j_domain_ipt').val());
                    if (_this.testDomain(_domain)) {
                        $('.j_domain_error').html('Ajukan...');
                        //先查询有没有
                        _this.actionFn({
                            action: 'search',
                            seller_id: _this.user_info.seller_id,
                            wduss: _this.user_info.wduss,
                            domain: _domain + '.com'
                        }, function () {
                            if (confirm('Domain ini masih bisa digunakan, segera registrasikan domainmu!')) {
                                //没有重复的 提交
                                _this.actionFn({
                                    domain: _domain + '.com',
                                    seller_id: _this.user_info.seller_id,
                                    wduss: _this.user_info.wduss
                                }, function (obj) {
                                    //申请中
                                    $(".j_domain_tip").text("Pendaftaran Sedang Diproses")
                                    $(".j_domain_btn").hide();
                                    _this.domain_dialog.remove();
                                    _this.StatusCheck.isAllowApply = false;
                                    alert('Pendaftaran domain membutuhkan 72 jam, silakan tunggu sejenak. Selama kurun waktu ini, customermu masih dapat mengunjungi mini webmu di alamat ' + _this.user_info.seller_id + '.instashop.co.id ');
                                });
                            } else {
                                $('.j_domain_error').html('');
                            }
                        });
                    } else {
                        // _this.StatusCheck.isAllowApply = false;
                        if (/instashop/g.test(_domain)) {
                            $('.j_domain_error').html('Link toko ini tidak disetujui');
                        } else {
                            $('.j_domain_error').html('Masukkan domain dengan tepat');
                        }

                    }
                }
            });
        },
        createInviteDialogHtm: function () {
            var _htm = '';
            var _this = this;
            _htm = '<div class="invite-dialog">' +
                '    <div class="invite-dialog-input">' +
                '        <textarea name="content" value="" id="j_invite_txt"' +
                '                  >Hi! Sekarang bikin web ga perlu bayar mahal,karena sudah ada INSTASHOP,aplikasi untuk membuat \& mengelola webstore. Pakai KODE REFERRAL ' + _this.user_info.seller_id +
                ' saat registrasi untuk mendapat webstore GRATIS!Download yuk http://www.instashop.co.id</textarea>' +
                '    </div>' +
                '    <div class="invite-share-box" data-spider="invitebox">' +
                '        <ul class="ins-avg-sm-4">' +
                '            <li>' +
                '                <i data-spider="dcopy" spm-auto="copy邀请" class="iconfont icon-share-copy j_invite_action" data-report="domain_btn_invite_copy" data-type="share_to_copy"></i>' +
                '                <p>COPY</p>' +
                '            </li>' +
                '            <li><i data-spider="dline" spm-auto="line邀请" class="iconfont icon-share-line j_invite_action" data-report="domain_btn_invite_line" data-type="share_to_line"></i>' +
                '                <p>LINE</p></li>' +
                '            <li><i data-spider="dbbm" spm-auto="bbm邀请" class="iconfont icon-share-bbm j_invite_action" data-report="domain_btn_invite_bbm" data-type="share_to_bbm"></i>' +
                '                <p>BBM</p></li>' +
                '            <li><i data-spider="dwhatsapp" spm-auto="whatsapp邀请" class="iconfont icon-share-whatsapp j_invite_action" data-report="domain_btn_invite_whatsapp" data-type="share_to_whatsapp"></i>' +
                '                <p>WhatsApp</p>' +
                '            </li>' +
                '        </ul>' +
                '    </div>' +
                '</div>';
            return _htm;

        },
        createShareDialogHtm: function () {
            var _htm = "";
            if (/ios/i.test(window.navigator.userAgent)) {
                _htm = '<div class="invite-dialog">' +
                    '    <div class="invite-dialog-img">' +
                    '        <img class="invite-dialog-img-url" src="">' +
                    '    </div>' +
                    '    <div class="invite-share-box" data-spider="sharebox">' +
                    '        <ul class="ins-avg-sm-3">' +
                    '            <li>' +
                    '                <i data-spider="dinstagram" spm-auto="instagram分享" class="iconfont icon-share-instagram j_share_action" data-report="domain_btn_share_instagram" data-type="share_to_instagram"></i>' +
                    '                <p>Instagram</p>' +
                    '            </li>' +
                    '            <li><i data-spider="dline" spm-auto="line分享" class="iconfont icon-share-line j_share_action" data-report="domain_btn_share_line" data-type="share_to_line"></i>' +
                    '                <p>LINE</p></li>' +
                    '            <li><i data-spider="dwhatsapp" spm-auto="whatsapp分享" class="iconfont icon-share-whatsapp j_share_action" data-report="domain_btn_share_whatsapp" data-type="share_to_whatsapp"></i>' +
                    '                <p>WhatsApp</p></li>' +
                    '        </ul>' +
                    '    </div>' +
                    '</div>';
            } else {
                _htm = '<div class="invite-dialog">' +
                    '    <div class="invite-dialog-img">' +
                    '        <img class="invite-dialog-img-url" src="">' +
                    '    </div>' +
                    '    <div class="invite-share-box" data-spider="sharebox">' +
                    '        <ul class="ins-avg-sm-4">' +
                    '            <li>' +
                    '                <i data-spider="dinstagram" spm-auto="instagram分享" class="iconfont icon-share-instagram j_share_action" data-report="domain_btn_share_instagram" data-type="share_to_instagram"></i>' +
                    '                <p>Instagram</p>' +
                    '            </li>' +
                    '            <li><i data-spider="dline" spm-auto="line分享" class="iconfont icon-share-line j_share_action" data-report="domain_btn_share_line" data-type="share_to_line"></i>' +
                    '                <p>LINE</p></li>' +
                    '            <li><i data-spider="dwhatsapp" spm-auto="whatsapp分享" class="iconfont icon-share-whatsapp j_share_action" data-report="domain_btn_share_whatsapp" data-type="share_to_whatsapp"></i>' +
                    '                <p>WhatsApp</p></li>' +
                    '            <li><i data-spider="dbbm" spm-auto="bbm分享" class="iconfont icon-share-bbm j_share_action" data-report="domain_btn_share_bbm" data-type="share_to_bbm"></i>' +
                    '                <p>BBM</p>' +
                    '            </li>' +
                    '        </ul>' +
                    '    </div>' +
                    '</div>';
            }
            return _htm;
        },
        createInviterTable: function (inviters) {
            var _trs = "";
            var _error_status_map = [{//以前是否有账号搬过家
                rule:"is_import_ins",
                txt:"Sama sekali belum menambahkan produk dari Instagram",
            },{//粉丝数
                rule:"followed_by_count_full",
                txt:"Followers IG kurang dari 500",
            },{//10件
                rule:"ins_item_count_full",
                txt:"Sudah menambahkan produk dari Instagram, tetapi produk yang diupload kurang dari 10",
            },{//被邀请者必须使用自己instagram账号搬家，如果使用和别人一样的账号，则视为无效
                rule:"prev_ins_count_full",
                txt:"Akun IG yang digunakan sudah pernah didaftarkan oleh toko lain",
            }];
            var _table_head = '<tr>' +
                '                            <td class="t-header">' +
                '                                Teman Yang Diundang' +
                '                            </td>' +
                '                            <td class="t-header">' +
                '                                Status' +
                '                            </td>' +
                '                        </tr>';
            for (var i = 0, inviter; inviter = inviters[i++];) {
                var _curTr = "";
                // var _curTr = '<tr><td>' + inviter.shop_name + '</td><td>' + inviter.telephone + '</td></tr>';
                if(inviter.ins_item_count_full&&inviter.followed_by_count_full&&inviter.is_import_ins&&inviter.prev_ins_count_full){
                    _curTr = '<tr><td>' + inviter.shop_name + '</br>' + inviter.telephone + '</td><td style="text-align:left">Sudah memenuhi syarat</td></tr>';
                }else{
                    for(var j=0,_curCheckStatus;_curCheckStatus=_error_status_map[j++];){
                        if(!inviter[_curCheckStatus.rule]){
                            //TODO 对应文案
                            _curTr = '<tr><td>' + inviter.shop_name + '</br>' + inviter.telephone + '</td><td style="text-align:left">' + _curCheckStatus.txt + '</td></tr>';
                            break;
                        }
                    }
                }
                _trs += _curTr;
            }
            return _table_head + _trs;
        },
        createDomainDialogHtm: function () {
            var _htm = '';
            _htm += '<div class="domain-box">' +
                '<p>Tulis domain web yang kamu inginkan :</p>' +
                '<div class="domain-error j_domain_error"></div>' +
                '<div class="domain-input">' +
                '<input class="j_domain_ipt" maxlength="20" type="text">' +
                '</div>' +
                '<div class="input-explain">' +
                '1. Link toko terdiri dari 5-20 karakter<br>' +
                '2. Hanya diperbolehkan berupa angka (0-9) dan abjad (a-z)<br>' +
                '3. Di dalam nama domain tersebut tidak boleh mengandung Instashop<br>' +
                '4. Jika ada pertanyaan, silahkan hubungi kami<br>' +
                '</div>' +
                '<button class="btn j_domain_submit">Yakin ingin mengajukan?</button>' +
                '<div class="domain-cont">' +
                '<p>1. Setelah diubah, nanti alamat web Instashop kalian bukan lagi namatoko.instashop.co.id, tapi langsung berubah menjadi <span>namatoko.com :)</span></p>' +
                '<p>2. Nama domain tidak harus sama dengan nama toko,tapi hanya boleh mengandung angka dan huruf abjad <span>(tidak boleh mengandung karakter).</span></p>' +
                '<p>Contoh domain yang tepat: namatoko.com, </p>' +
                '<p>namatoko123.com</p>' +
                '<p>Contoh domain yang salah: nama_toko.com, </p>' +
                '<p>namatoko@.com </p>' +
                '<p>3. Domain tidak dapat diubah setelah didaftarkan.Proses pendaftaran domain web membutuhkan waktu <span>72 jam</span> sebelum dapat digunakan. Sebelum itu, kamu masih bisa menggunakan namatoko.instashop.co.id</p>' +
                '</div>' +
                '</div>';
            return _htm;
        },
        actionFn: function (opts, callback) {
            var _this = this,
                _data = {
                    edata: opts
                };
            if (opts.action == 'check') {
                Ajax.getJsonp(
                    Config.host.actionUrl + Config.actions.domainName + '?param=' + JSON.stringify(_data),
                    function (obj) {
                        if (obj.code == 200) {
                            callback && callback(obj);
                        }
                    },
                    function (obj) {}
                );
            } else {
                if (opts.action == 'search') {
                    Ajax.getJsonp(
                        Config.host.actionUrl + Config.actions.domainName + '?param=' + JSON.stringify(_data),
                        function (obj) {
                            console.log(obj)
                            if (obj.code == 200) {
                                callback && callback(obj);
                            } else {
                                $('.j_domain_error').html(obj.message);
                                // _this.StatusCheck.isAllowApply = false;
                                // _this.domain_btn_disable = true;
                            }
                        },
                        function (obj) {
                            // _this.StatusCheck.isAllowApply = false;
                            // _this.domain_btn_disable = true;
                            $('.j_domain_error').html(obj.message);
                        }
                    );
                } else {
                    Ajax.postJsonp({
                        url: Config.actions.domainName,
                        data: {
                            param: JSON.stringify(_data)
                        },
                        type: 'POST',
                        success: function (obj) {
                            //_this.domain_btn_disable = true;
                            _this.StatusCheck.isAllowApply = false;
                            if (obj.code == 200) {
                                callback && callback(obj);
                            } else {
                                $('.j_domain_error').html(obj.message);
                            }
                        },
                        error: function (error) {
                            // _this.StatusCheck.isAllowApply = false;
                            //_this.domain_btn_disable = true;
                            $('.j_domain_error').html(error);
                        }
                    });
                }

            }

        },
        testDomain: function (url) {
            if (url.length > 4 && url.length < 21 && /^[0-9a-zA-Z]+$/.test(url) && !/instashop/g.test(url)) {
                return true;
            }
            return false;
        }
    };
    DM.init();
})