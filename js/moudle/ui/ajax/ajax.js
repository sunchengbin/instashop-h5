/**
 * Created by sunchengbin on 16/6/2.
 */
define(['config'],function(Config){
    var Ajax = function(){

    };
    Ajax.prototype = {
        getJsonp : function ( url, success, error ) {
            $.ajax( {
                url: url + "&callback=?",
                dataType: "JSONP",
                success: function ( res ) {
                    success( res );
                },
                error: function (err) {
                    error && error( err );
                }
            } )
        },
        postJsonp : function ( url, data, type, success, error ) {
            $.ajax({
                url: '../../router/api.php?_path_=' + url,
                dataType: "JSON",
                data: data,
                type: "POST",
                headers: {
                    "X-Http-Method-Override": type || "PUT"
                },
                success: function (res) {
                    success && success(JSON.parse(res));
                },
                error: function (err) {
                    error && error(err);
                }
            })
        }
    };
    return function(opts){
        return new Ajax(opts);
    }
})

