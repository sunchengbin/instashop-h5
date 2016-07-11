/**
 * Created by sunchengbin on 16/6/30.
 */
define(['base'],function(Base){
    var common = {

        /**
         * 将 plain object 的 key 全部转换成 camel 形式
         * @param  {object} obj 要转换的原始 object
         * @return {object}     转换后的新 object
         */
        _toCamelForObjectKey: function (obj) {
            var newObj = {}
            for (var k in obj) {
                newObj[common._toCamel(k)] = obj[k]
            }
            return newObj
        },

        /**
         * 将一个 _ 形式字符串的转换成 camel 形式
         */
        _toCamel: function (str) {
            var arr = str.split('_')
            for (var i = 1; i < arr.length; i++) {
                arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1)
            }
            return arr.join('')
        },


        HTMLDeCode: function (str) {
            if (!str) return '';
            var s = "";
            if (str.length == 0) return "";
            if(/\&lt\;script/g.test(str)){
                return str;
            }
            s = str.replace(/&lt;/g, "<");
            s = s.replace(/&gt;/g, ">");
            s = s.replace(/&nbsp;/g, "\r");
            s = s.replace(/'/g, "\'");
            s = s.replace(/&quot;/g, "\"");
            //s = s.replace(/<br>/g, "\n");
            return s;
        },
        HTMLEnCode: function (str) {
            if (!str) return '';
            var s = "";
            if (str.length == 0) return "";
            s = str.replace(/</g, "&lt;");
            s = s.replace(/>/g, "&gt;");
            s = s.replace(/\r/g, "&nbsp;");
            s = s.replace(/\'/g, "'");
            s = s.replace(/\"/g, "&quot;");
            s = s.replace(/\n/g, "<br>");
            return s;
        },
        enCode: function(str){
            if (!str) return '';
            var s = "";
            if (str.length == 0) return "";
            s = str.replace(/</g, "&lt;");
            s = s.replace(/>/g, "&gt;");
            s = s.replace(/\r/g, "&nbsp;");
            s = s.replace(/\'/g, "'");
            s = s.replace(/\"/g, "&quot;");
            //s = s.replace(/\n/g, "<br>");
            return s;
        },
        transAddressMsg : function(msg){
            if(/INSTASHOP\_H5\_IM\_MESSAGE\_TYPE\:ADDRESS/g.test(msg)){
                //msg = this.HTMLDeCode(msg);
                msg = msg.replace(/INSTASHOP\_H5\_IM\_MESSAGE\_TYPE\:ADDRESS/g,'');
                msg = msg.replace(/\[/g,'[<a class="j_address" href="javascript:;">');
                msg = msg.replace(/\]/g,'</a>]');
            }
            if(/http\:\/\/imghk0\.geilicdn\.com/g.test(msg)){//图片
                //msg = '<div class="lazy-img" style="width:'+Math.ceil(window.outerWidth/3)+'px;background-image:url('+this.cutImg(msg)+')"></div>';
                var _w = Math.ceil(window.outerWidth/3);
                if(_w > 120){_w = 120}
                var _oh = Base.others.getUrlPrem('h',msg),
                    _ow = Base.others.getUrlPrem('w',msg),
                    _nh = Math.ceil(_oh * _w / _ow);
                msg = '<img style="width:'+_w+'px;height:'+_nh+'px;" src="'+this.getLogoUrl(msg)+'"/>';
            }
            if(/http\:\S+\/detail\/\d+/g.test(msg)){//详情链接
                var other_arr = msg.split(/http\:\S+\/detail\/\d+/g),
                    _url = msg.match(/http\:\S+\/detail\/\d+/g);
                msg = other_arr[0]+'<a class="" href="'+_url+'">'+_url+'</a>'+other_arr[1];
            }
            return msg;
        },
        _JSONP: 0,
        getJSONP: function (url, callback) {
            var jsonpId = 'jsonp' + common._JSONP++;
            var script = document.createElement('script');
            script.src = url.indexOf('?') === -1 ?
            url + '?' + 'callback' + '=' + jsonpId :
            url + '&' + 'callback' + '=' + jsonpId;
            window[jsonpId] = function (response) {
                try {
                    //console.log('getJSONP', response)
                    callback(response);
                }
                finally {
                    delete window[jsonpId];
                    script.parentNode.removeChild(script);
                }
            };
            document.body.appendChild(script);
        },
        handleTime: function (str) {
            var that = this;
            if (!str) {
                return "";
            }
            var date = new Date();
            var timeOffset = date.getTimezoneOffset() / 60;
            var des = new Date(Number(str) + ((-8) - (timeOffset)) * 3600 * 1000);
            var y = des.getFullYear(),
                m = formate(des.getMonth() + 1),
                d = formate(des.getDate()),
                h = formate(des.getHours()),
                mm = formate(des.getMinutes());
            var yd = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            var diff = yd.getTime() - Number(str);
            var diffValue = diff - (24 * 3600 * 1000);
            if (navigator.language == "id" && diff < 0) {
                return h + "." + mm;
            } else if ((navigator.language == "zh-CN" || navigator.language == "zh-cn") && diff < 0) {
                return h + ":" + mm;
            } else if (diff > 0 && diffValue < 0 && navigator.language == "id") {
                return "Kemarin" + " " + h + "." + mm;
            } else if (diff > 0 && diffValue < 0 && (navigator.language == "zh-CN" || navigator.language == "zh-cn")) {
                return "Yesterday" + " " + h + ":" + mm;
            } else if (diff < 0) {
                return h + ":" + mm;
            } else if (diff > 0 && diffValue < 0) {
                return "Yesterday" + " " + h + ":" + mm;
            } else {
                return y + "/" + m + "/" + d + " " + h + ":" + mm;
            }
            return (diff < 0 ? (h + ":" + mm) : (y + "/" + m + "/" + d + " " + h + ":" + mm));
            function formate(str) {
                return ("" + str).length > 1 ? str : "0" + str;
            }
        },
        testTime : function(time){
            var _now_time = (new Date()).getTime();
            if((_now_time-time) > 180000){
                return true;
            }
            return false;
        },
        getRequestParam: function (param, uri) {
            var value;
            uri = uri || window.location.href;
            value = uri.match(new RegExp('[\?\&]' + param + '=([^\&\#]*)([\&\#]?)', 'i'));
            return value ? decodeURIComponent(value[1]) : value;
        },
        getSid : function(){//当前用户sellerid
            var _url = location.href,
                _arr = _url.split('/'),
                //_sid = _arr[(_arr.length-1)].split('?')[0];
                //_sid = Base.others.getUrlPrem('seller_id');
                _sid = _arr[(_arr.length-1)];
            if(!_sid){
                _sid = 40732;
            }
            return _sid;
        },
        ScorllToBottom : function(){
            setTimeout(function(){
                $('.j_message_box').scrollTop(9999);
            },100);
        },
        getLogoUrl : function(url){
            if(url){
                return this.cutImg(url);
            }
            return 'http://imghk0.geilicdn.com/ushop-default-shoplogo-logo.jpg?w=110';
        },
        listenAndroidKeyboardToggle: function (onShow, onHide) {
            // 针对 android 机型
            // 通过窗口高度的变化来监听键盘的收起和出现
            var windowInnerHeight_no_keyboard = window.innerHeight,
                windowInnerHeight_has_keyboard = windowInnerHeight_no_keyboard;
            if ((/(Android)\s+([\d.]+)/i).test(window.navigator.userAgent)) {
                window.addEventListener('resize', function () {
                    // alert( [ window.innerHeight, windowInnerHeight_no_keyboard, windowInnerHeight_has_keyboard ] )
                    if (window.innerHeight < windowInnerHeight_no_keyboard) {
                        onShow && onShow()
                    }
                    if (window.innerHeight >= windowInnerHeight_has_keyboard) {
                        onHide && onHide()
                    }
                });
            }
        },
        getImageUrl : function (url, enable) {
            var isWebpSupported = function(){
                var ua = navigator.userAgent;
                var android = ua.match(/(android) ([\.\d]+)/i) || [];
                var name = ua.match(/(ucweb|opera|chrome|mozilla|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
                var browser_name = name[1].toLowerCase();
                var browser_version = name[2];
                var browser_int_version;
                if (android.length > 0) {
                    var android_version = android[2].replace(/\./g, '');
                    //console.log('android version', android_version);
                    if (android_version.length == 2) android_version = android_version + '0';
                    var android_int_version = parseInt(android_version);
                    //console.log('android match', android_int_version);
                    if (browser_name == "chrome") {
                        browser_int_version = parseInt(browser_version.split('.')[0]);
                        //console.log('android chrome match', browser_int_version);
                        if (browser_int_version >= 46) {
                            return true;
                        }
                    } else if (browser_name == 'ucweb') {
                        browser_int_version = parseInt(browser_version.replace(/\./g, ''));
                        //console.log('android ucweb match', browser_int_version);
                        if (browser_int_version >= 99) {
                            return true;
                        }
                    } else if (browser_name == 'mozilla') {
                        //console.log('android browser match', android_int_version);
                        if (android_int_version > 410) {
                            return true;
                        }
                    }
                }
                return false;
            };
            return enable && isWebpSupported() ? url.replace('.jpg', '.jpg.webp') : url;
        },
        //替换图片url进行裁图
        cutImg : function(url,width){
            var _ww = width?width:Math.ceil(window.outerWidth/3),
                _this = this,
                _url = url.split('?')[0];
            if(_ww > 120){_ww = 120}
            url = _url + '?w='+_ww;
            return _this.getImageUrl(url,true);
        },
        insertSellerMsg : function(msg,time){
            var _msg = msg,
                _this = this,
                _sid = _this.getSid();
            var data = JSON.parse(localStorage.getItem('SELLERINFO'));
            var _htm = '<li>'
                +(_this.testTime(time)?'<p><span class="time-box">'+_this.handleTime(time)+'</span></p>':'')
                +'<div class="one-message left-header">'
                +'<div class="lazy" style="background-image:url('+_this.getLogoUrl(data[_sid].shop_img_url)+')"></div>'
                +'<div class="message-box">'
                +'<div>'
                +_msg
                +'</div>'
                +'</div>'
                +'</div>'
                +'</li>';
            return _htm;

        },
        insertUserMsg : function(msg,time){
            var _msg = msg,
                _this = this,
                _htm = '<li>'
                +(_this.testTime(time)?'<p><span class="time-box">'+_this.handleTime(time)+'</span></p>':'')
                +'<div class="one-message right-header">'
                +'<div class="lazy" style="background-image:url('+_this.getLogoUrl()+')"></div>'
                +'<div class="message-box">'
                +'<div>'
                +_msg
                +'</div>'
                +'</div>'
                +'</div>'
                +'</li>';
            return _htm;
        }
    }

    return common;
})

