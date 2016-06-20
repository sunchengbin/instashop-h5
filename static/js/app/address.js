/**
 * Created by sunchengbin on 16/6/12.
 */
require(['hbs','text!views/app/address.hbs','city','config','lang'],function(Hbs,Addresshtm,City,Config,Lang){
    var Address = {
        init : function(){
            var _this = this,
                _data = localStorage.getItem('ShopData'),
                _address = _data?JSON.parse(_data).Address:null;
            if(!_address){
                _address = {
                    "name": "",
                    "telephone": "",
                    "post": "",
                    "country_code": "62",
                    "email": "",
                    "address": {
                        "province": "",//省
                        "city": "",//市
                        "country": "",//街道
                        "street": ""//详细地址
                    }
                };
            }
            _address.lang = Lang;
            var _htm= Hbs.compile(Addresshtm)(_address);
            $('body').prepend(_htm);
            _this.handleFn();
        },
        handleFn : function(){
            var _this = this;
            $('body').on('tap','.j_go_back',function(){
                var _fromurl = localStorage.getItem('FromUrl');
                if(!_fromurl){
                    location.href = Config.host.host+'s/'+JSON.parse(localStorage.getItem('ShopData')).ShopInfo.id;
                }else{
                    location.href = _fromurl;
                }
            });
            $('body').on('tap','.j_user_address .act',function(){
                var _name = $(this).attr('data-name');
                switch(_name){
                    case 'province' :
                        $('.j_address_list').html(_this.CreateList(City,'province')).addClass('show').removeClass('hide');
                        break;
                    case 'city' :
                        $('.j_address_list').html(_this.CreateList(City[_this['province']],'city')).addClass('show').removeClass('hide');
                        break;
                    case 'country' :
                        $('.j_address_list').html(_this.CreateList(City[_this['province']][_this['city']],'country')).addClass('show').removeClass('hide');
                        break;
                    default :
                        break;
                }
            });
            $('body').on('tap','.j_list_item',function(){
                var _name = $(this).attr('data-val'),
                    _type = $(this).attr('data-type');
                _this[_type] = _name;
                $('.j_address_list').addClass('hide').removeClass('show');
                switch(_type){
                    case 'province' :
                        if($('.j_province').html() != _name){
                            $('.j_city').html(Lang.H5_CITY);
                            $('.j_country').html(Lang.H5_DISTRICT);
                            $('[data-name="country"]').removeClass('act');
                        }
                        $('.j_province').html(_name);
                        $('[data-name="city"]').addClass('act');
                        break;
                    case 'city' :
                        if($('.j_city').html() != _name){
                            $('.j_city').html(_name);
                            $('.j_country').html(Lang.H5_DISTRICT);
                        }
                        $('.j_city').html(_name);
                        $('[data-name="country"]').addClass('act');
                        break;
                    default :
                        $('.j_country').html(_name);
                        break;
                }
            });
            $('body').on('tap','.j_save_address',function(){
                var _data = localStorage.getItem('ShopData'),
                    _data_json = _data?JSON.parse(_data):{},
                    _name = $.trim($('.j_name').val()),
                    _telephone = $.trim($('.j_tel').val()),
                    _province = $.trim($('.j_province').html()),
                    _city = $.trim($('.j_city').html()),
                    _country = $.trim($('.j_country').html()),
                    _street = $.trim($('.j_street').val());
                if(!_name||!_telephone||!_province||!_city||!_country||!_street){return;}
                var _address = {
                    "name": _name,
                    "telephone": _telephone,
                    "post": "",
                    "country_code": "62",
                    "email": "",
                    "address": {
                        "province": _province,//省
                        "city": _city,//市
                        "country": _country,//街道
                        "street": _street//详细地址
                    }
                };
                _data_json.Address = _address;
                localStorage.setItem('ShopData',JSON.stringify(_data_json));
                setTimeout(function(){
                    var _data = JSON.parse(localStorage.getItem('ShopData')),
                        _addr = _address.street + ',' + _address.country + ',' + _address.city + ',' + _address.province;
                    location.href = Config.host.hrefUrl+'orderconfirm.php?seller_id='+_data.ShopInfo.id+'&addr='+_addr;
                    //location.href = Config.host.hrefUrl+'orderconfirm.php';
                },0);
            });
        },
        CreateList : function(data,type){
            var _htm = '';
            for(var i in data){
                  _htm += '<div class="address-list-item j_list_item" data-type="'+type+'" data-val="'+(isNaN(i)?i:data[i])+'">'+(isNaN(i)?i:data[i])+'</div>'
            }
            return _htm;
        }
    };
    Address.init();
})