/**
 * Created by sunchengbin on 16/6/2.
 */
define(['config'],function(Config){
    var Ajax = {
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
        postJsonp : function (opts) {//{url:, data:, type:, success:, error:}
            $.ajax({
                url: Config.host.hostUrl+'router/api.php?_path_=' + opts.url,
                dataType: "JSON",
                data: opts.data,
                type: "POST",
                headers: {
                    "X-Http-Method-Override": opts.type || "PUT"
                },
                success: function (res) {
                    opts.success && opts.success(JSON.parse(res));
                },
                error: function (err) {
                    opts.error && opts.error(err);
                }
            })
        }
    };
    return Ajax;
})

