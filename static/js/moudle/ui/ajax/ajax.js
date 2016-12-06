/**
 * Created by sunchengbin on 16/6/2.
 */
define(['config','base'],function(Config,Base){
    var Debug = Base.others.getUrlPrem('_debug_env') || localStorage.getItem('DebugEnv');
    var Ajax = {
        getJsonp : function ( url, success, error ) {
            var _data = Base.others.getUrlPrem('param',url)?JSON.parse(Base.others.getUrlPrem('param',url)):null;
            if(_data && Debug){
                _data.edata['_debug_env'] = Debug;
                url = url.split('?')[0];
                url = url +'?param='+JSON.stringify(_data);
            }
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
            var _data = opts.data.param?JSON.parse(opts.data.param).edata:null;
            if(_data && Debug){
                _data['_debug_env'] = Debug;
                opts.data.param = JSON.stringify({'edata':_data});
            }
            var _data = {
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
            };
            if(opts.timeout){
                _data.timeout = opts.timeout;
            }
            $.ajax(_data)
        },
        transData : function(data){
            var _data = {};
            data.client_uuid = localStorage.getItem('ClientUuid');
            _data.edata = data;
            return _data;
        }
    };
    return Ajax;
})

