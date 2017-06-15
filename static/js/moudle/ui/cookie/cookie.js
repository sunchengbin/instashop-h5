/**
 * Created by sunchengbin on 15/7/6.
 * 关于cookie的一些操作
 */
define(function(){
    var cookie = {
        getCookie : function(name){
            var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
            if (arr != null) return unescape(arr[2]);
            return null;
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
