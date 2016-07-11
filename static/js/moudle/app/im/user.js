/**
 * Created by sunchengbin on 16/6/30.
 * 用户登录
 */
define(['imcommon','server','imconfig'],function(Common,Server,Config){
    var User = {
        init : function(opts){
            var _this = this;
            _this.login(opts);
        },
        login : function(opts){
            var sid = opts.sid,
                uss = opts.uss,
                _this = this;
            if( ( ! sid ) || sid === '0' ) {
                sid = ''
            }

            if( ( ! uss ) || uss === '0' ) {
                uss = ''
            }
            var reqBody = {
                sid : sid || '',
                uss : uss || '',
                source : '1001',
                user_type: '2', // 2 seller, 1 buyer
                imToken : localStorage.getItem( 'IMTOKEN' ) || ''
            };
            Server.fetch( reqBody, Config.userCmds.MAIN, Config.userCmds.LOGIN, function( result ) {
                // 判断 result 是否是报错信息，否则：
                //console.log(result);
                if(result.data[0].code == 200000){
                    _this.setLoginInfo(result);
                    opts.callback && opts.callback(result);
                }

            });
        },
        setLoginInfo : function(result){
            //console.log(result)
            localStorage.setItem('UID',result.data[ 0 ].body.uid);
            localStorage.setItem('IMTOKEN',result.data[ 0 ].body.im_token);
            localStorage.setItem('IMSESSION',result.data[ 1 ].IMSession);
            //var uid = localStorage.getItem( 'UID');
            //var host = /api\.instashop\.co\.id/g.test(Config.host.phpHost) ? 'http://instashop.co.id' : 'http://www-test.instashop.co.id';
            //if (uid) {//存储imsession到主域名下面,为了解决h5和im之间的消息提示出现的跨域问题.
            //    Common.getJSONP(host + '/html/router/im.php?im_id=' + uid + '&callback=callbak', function (data) {})
            //}
        }
    };
    return User;
})