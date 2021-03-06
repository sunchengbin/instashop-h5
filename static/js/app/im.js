/**
 * Created by sunchengbin on 16/6/30.
 * 主程序js
 */
require(['user','config','history','message','imcommon','lazyload','base','dialog','city','md5','fastclick','ajax'],function(User,Config,History,Message,Common,Lazyload,Base,Dialog,City,SparkMD5,Fastclick,Ajax){
    var Loading = null;
    var Index = {
        init : function(){
            var _this = this;
            _this.loadingShow();
            //Message.sendMessage(3079419392228589665,7682066903378624518, 'helloa',1,function(){
            //    //_this.loadingHide();
            //    $('.j_msg_loading').remove();
            //});
            _this.getSellerInfo({
                callback : function(info){
                    //渲染页面
                    var data = info[_this.getSid()];
                    $('.j_shop_name').html(data.shop_name);
                    User.init(_this.getOpts(function(result){
                        _this.handleFn();
                        _this.sendUserNameToApp();
                        History.init(data.uid,function(){
                            Message.msgListen();
                            Common.ScorllToBottom();
                            _this.loadingHide();
                        },_this.getSid());//登录成功获取历史数据
                    }));
                }
            });
            window.handleIframeCall = function(result){//上传图片跨域解决办法
                if(result.status.status_code == 0){
                    Message.sendMessage(
                        localStorage.getItem('UID'),
                        JSON.parse(localStorage.getItem('SELLERINFO'))[_this.getSid()].uid,
                        Common.HTMLEnCode(result.result.big),
                        2,
                        function(){
                            $('.j_msg_loading').remove();
                        });
                }
            }

        },
        loadingShow:function(){
            Loading = Dialog.loading({
                body_txt : '<div class="spinner"></div>'
            });
        },
        loadingHide:function(){
            setTimeout(function(){
                Loading.remove();
            },300);
        },
        handleFn : function(){
            var _this = this;
            Fastclick.attach(document.body);
            $('body').on('click','.j_send_btn',function(){//发送消息
                var _txt = $.trim($('.j_message_txt').val());
                if(!_txt){return;}
                $('.j_message_txt').val('').css('height','30px');
                document.querySelector('.j_footer').style.height = '45px';
                //_this.loadingShow();
                Message.sendMessage(localStorage.getItem('UID'),JSON.parse(localStorage.getItem('SELLERINFO'))[_this.getSid()].uid, _txt,1,function(){
                    //_this.loadingHide();
                    $('.j_msg_loading').remove();
                });
            });
            $('body').on('click','.j_go_shop',function(){//发送消息
                location.href = '/s/'+Common.getSid();
            });
            var reader = new FileReader();
            reader.onload = function(e){
                var _w = Math.ceil($(window).width()/3);
                if(_w > 120 || _w == 0){_w = 120}
                var _html = '<img style="width:'+_w+'px;" src="'+e.target.result+'"/>';
                _html = Common.insertUserMsg(_html,(new Date()).getTime(),'1');
                $('.j_message_wraper').append(_html);
                Common.ScorllToBottom();
            };
            document.querySelector('[name="img"]').onchange = function(e){
                var input = this;
                if (input.files && input.files[0]) {
                    reader.readAsDataURL(input.files[0]);
                    _this.upImgFn(e);
                }
            };
            //$('[name="img"]').on('change',function(e){//上传图片
            //    //_this.loadingShow();
            //    //通过本地file
            //    var val = $(this).val();
            //    //reader.readAsText(val);
            //    if (input.files && input.files[0]) {
            //        reader.readAsDataURL(input.files[0]);
            //    }
            //    _this.upImgFn(e);
            //});
            $('body').on('keyup','.j_message_txt',function(){
                autoGrow(document.querySelector('.j_message_txt'));
            });
            function autoGrow (oField) {
                if (oField.scrollHeight > oField.clientHeight) {
                    document.querySelector('.j_footer').style.height = (Number(oField.scrollHeight)+15)+'px';
                    oField.style.height = oField.scrollHeight + "px";
                }
            }
            $('body').on('click','.j_address',function(){//发送消息
                var _htm = _this.getAddressDialog();
                Dialog.alert({
                    show_top : false,
                    body_txt : _htm,
                    cf_fn : function(){
                        if(_this.sendAddressData()){
                            Message.sendMessage(localStorage.getItem('UID'),JSON.parse(localStorage.getItem('SELLERINFO'))[_this.getSid()].uid, _this.sendAddressData(),1,function(){
                                $('.j_msg_loading').remove();
                            },'address');
                        }
                    }
                });
                _this.setAddressSelect();
            });
            Common.listenAndroidKeyboardToggle(function(){
                Common.ScorllToBottom();
            },function(){
                Common.ScorllToBottom();
            });
            var is_scroll = true;//防止多次发送
            $('.j_message_box').scroll(function(){//发送消息
                if($('.j_message_box').scrollTop() == 0 && is_scroll){
                    var _h = $('.j_message_wraper').height();
                    is_scroll = false;
                    History.init(JSON.parse(localStorage.getItem('SELLERINFO'))[ _this.getSid()].uid,function(){
                        is_scroll = true;
                        $('.j_message_box').scrollTop($('.j_message_wraper').height()-_h);
                        _this.loadingShow();
                        _this.loadingHide();
                    },_this.getSid(),true,_h);
                }
            });
        },
        plupLoad : function(){

        },
        upImgFn : function(e){//上传图片处理方法
            function getParam( md5 ) {
                return {
                    cur_idx : 1,
                    split_num : 1,
                    extend : '.jpg',
                    wduss:'',
                    seq_id : SparkMD5.hash('' + (new Date()).getTime()),//唯一值
                    user_id : '',
                    md5_cur : md5,//文件MD5值
                    md5_all : md5//文件md5值
                }
            }
            var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
                file = e.target.files[0],
                chunkSize = 2097152, // read in chunks of 2MB
                chunks = Math.ceil( file.size / chunkSize ),
                currentChunk = 0,
                spark = new SparkMD5.ArrayBuffer(),
                frOnload = function(e){
                    spark.append( e.target.result ); // append array buffer
                    currentChunk++;
                    if (currentChunk < chunks){
                        loadNext();
                    } else {
                        // const apiBase = process.env.NODE_ENV === 'production' ? 'http://api.instashop.co.id/' : 'http://10.5.15.10:8888/'
                        var midHelperFile = Config.host.hrefHost+'/iframe.html';
                        document.querySelector('#up-img').action =
                            Config.host.phpHost+'upload_split'
                            + '?param='
                            + JSON.stringify( getParam( spark.end() ) )
                            + '&redirectUrl=' + encodeURIComponent( midHelperFile );
                        document.querySelector('#up-img').submit();
                        $('[name="img"]').val('');
                    }
                }.bind( this ),
                frOnerror = function () {
                    //console.log( 'md5 error.' )
                };
            function loadNext() {
                var fileReader = new FileReader();
                fileReader.onload = frOnload;
                fileReader.onerror = frOnerror;
                var start = currentChunk * chunkSize,
                    end = ( ( start + chunkSize ) >= file.size ) ? file.size : start + chunkSize;
                fileReader.readAsArrayBuffer( blobSlice.call( file, start, end ) );
            }
            loadNext();
        },
        sendAddressData : function(){
            var _name = $.trim($('.j_name').val()),
                _tel = $.trim($('.j_tel').val()),
                _province = $.trim($('.j_province').val()),
                _city = $.trim($('.j_city').val()),
                _country = $.trim($('.j_country').val()),
                _street = $.trim($('.j_street').val());
            if(!_name || !_tel || !_province || !_city || !_country){
                return null;
            }
            var str = '[Informasi Alamat]Nama:'+_name+'\n'+'No.Hp:'+_tel+'\n'+'Provinsi:'+_province+'\n'+'Kota:'+_city+'\n'+'Daerah:'+_country+'\n'+'Alamat jelas:'+_street;
            //console.log(str);
            return str;
        },
        getAddressDialog : function(){
            var _htm = '<div class="address-wraper">'
                +'<input type="text" class="j_name" placeholder="Nama">'
                +'<input type="tel" class="j_tel" placeholder="No.Hp">'
                +'<select class="j_province">'
                +'<option value="">--Provinsi--</option>'
                +'</select>'
                +'<select class="j_city">'
                +'<option value="">--Kota--</option>'
                +'</select>'
                +'<select class="j_country">'
                +'<option value="">--Daerah--</option>'
                +'</select>'
                +'<textarea class="j_street" placeholder="Alamat jelas"></textarea>'
                +'</div>';
            return _htm;
        },
        CreateCityOption : function(data,type){
            var _htm = '';
            switch(type) {
                case 'province':
                    _htm = '<option value="">--Provinsi--</option>';
                    break;
                case 'city':
                    _htm = '<option value="">--Kota--</option>';
                    break;
                case 'country':
                    _htm = '<option value="">--Daerah--</option>';
                    break;
            }
            for(var i in data){
                _htm += '<option value="'+(isNaN(i)?i:data[i])+'">'+(isNaN(i)?i:data[i])+'</option>'
            }
            return _htm;
        },
        setAddressSelect : function(){
            var _this = this;
            $('.j_province').html(_this.CreateCityOption(City,'province'));
            $('body').on('change','.j_province',function(){
                var _val = $(this).val();
                if(_val){
                    $('.j_city').html(_this.CreateCityOption(City[$('.j_province').val()],'city'));
                    $('.j_country').html('<option value="">--Daerah--</option>');
                }
            });
            $('body').on('change','.j_city',function(){
                var _val = $(this).val();
                if(_val){
                    $('.j_country').html(_this.CreateCityOption(City[$('.j_province').val()][$('.j_city').val()],'country'));
                }
            });
            if($('.j_province').val()){
                $('.j_city').html(_this.CreateCityOption(City[$('.j_province').val()],'city'));
            }
            if($('.j_city').val()){
                $('.j_country').html(_this.CreateCityOption(City[$('.j_province').val()][$('.j_city').val()],'country'));
            }
        },
        getOpts : function(callback){//用户登录接口的参数获取
            var _this = this;
            return {
                sid : '',
                uss : localStorage.getItem('UID'),
                callback: callback
            }
        },
        getSid : function(){//当前用户sellerid
            return Common.getSid();
        },
        getSellerInfo : function(opts){//获取用户id
            var _this = this,
                _info = localStorage.getItem('SELLERINFO');
            if(_info && JSON.parse(_info)[_this.getSid()]){
                document.title = JSON.parse(_info)[_this.getSid()].shop_name;
                opts && opts.callback && opts.callback(JSON.parse(_info));
                return;
            }
            $.ajax({
                url : Config.host.phpHost+Config.actions.getUserInfo,
                type : 'get',
                dataType:'jsonp',
                data : {user_id:_this.getSid()},
                success : function(result){
                    if(result.status.status_code == 0){
                        _this.saveSellerInfo(result.result);
                        document.title = result.result.shop_name;
                        opts && opts.callback && opts.callback(JSON.parse(localStorage.getItem('SELLERINFO')));
                    }else{

                    }
                },
                error : function(){
                    _this.getSellerInfo(opts);
                }
            })
        },
        saveSellerInfo : function(info){//把卖家相关信息存到本地
            var _info = localStorage.getItem('SELLERINFO'),
                _data = null;
            if(_info){
                _data = JSON.parse(_info);
                _data[info.id] = info;
            }else{
                _data = {};
                _data[info.id] = info;
            }
            _data && localStorage.setItem('SELLERINFO',JSON.stringify(_data));
        },
        sendUserNameToApp : function(){
            var _this = this,
                _shop_data = localStorage.getItem('ShopData'),
                _address = _shop_data?JSON.parse(_shop_data).Address:null;
                if(!_address){return;}
            var _uid = localStorage.getItem('UID'),
                _uid2 = JSON.parse(localStorage.getItem('SELLERINFO'))[_this.getSid()].uid;
            $.ajax({
                url : Config.host.imUserNameHost+Config.actions.setUserName,
                type : 'get',
                data : {
                    uid:_uid2,//商家imid
                    uid2:_uid,//用户imid
                    memo:encodeURIComponent(_address.name)
                },
                success : function(result){

                },
                error : function(){

                }
            });
        }
    };
    Index.init();
})
