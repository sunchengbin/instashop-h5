/**
 * Created by sunchengbin on 15/7/6.
 * 关于cookie的一些操作
 */
define(function(){
    var cookies = document.cookie;
    var cookie = {
        getCookie : function(name){
            var _c_name = encodeURIComponent(name)+'=',
                _index = cookies.indexOf(_c_name),
                _c_val = null;
            if(_index > -1){
                var _end = cookies.indexOf(';',_index);
                if(_end == -1){
                    _end = cookies.length;
                }
                _c_val = decodeURIComponent(_c_name.substring(_index + _c_name.length,_end));
            }
            return _c_val;
        },
        setCookie : function(name,value,expires,path,domain,secure){
            var _cookie = name + '=' +value;
            if(expires instanceof Date){
                _cookie += ';expires=' + expires;
            }
            if(path){
                _cookie += ';path=' + path;
            }
            if(domain){
                _cookie += ';domain=' + domain;
            }
            if(secure){
                _cookie += ';secure';
            }
            document.cookie = _cookie;
        },
        removeCookie : function(name,value,expires,path,domain,secure){
            this.setCookie(name,'',new Date(0),path,domain,secure);
        }
    };
    return cookie;
})
