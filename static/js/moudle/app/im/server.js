/**
 * Created by sunchengbin on 16/6/29.
 */
define(['base64','xxtea','rsa','config'],function(Base64,Xxtea,RSA,Config){
    var getSeq = (function() {
        var seq = 0;
        return function() {
            return seq++;
        }
    })();

    var getSession = (function() {
        var session = '';
        return function() {
            if (session === '') {
                session = localStorage.getItem('IMSESSION') || '';
            }
            return session;
        }
    })();

    var XxteaUtil = {
        _cryptKey: '',
        encrypt: function(data) {
            var xxx = new Xxtea(this.getKey());
            return xxx.xxtea_encrypt(data);
        },
        decrypt: function(data) {
            var xxx = new Xxtea(this.getKey());
            return xxx.xxtea_decrypt(data);
        },
        getKey: function() {
            if (this._cryptKey == '') {
                return this.updateKey();
            } else {
                return this._cryptKey;
            }
        },
        updateKey: function() {
            var key = Base64.encode(Math.random() * new Date().getTime() + '').toString();
            key = key.substr(key.length - 16, 16);
            this._cryptKey = key;
            return key;
        }
    };

    function getUrl(cmd, sub) {
        var cryptKey = XxteaUtil.getKey();
        var PUBLICKEY = '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDDYxoqbcpEWY5hfISXQ64Dziyspi1LTktlKEwaa4BCONpKqUSsN/+63zA4vrCnXTQPU3MnSsZZeGSGGkkLb+DysbKOO58M7ofj63oVtwYzWTjw2ocLCRY0AyaJGZu671ylVCkwAqrI63nixguwbMHn/1hydtNCFQG0cH5qHzPrDQIDAQAB-----END PUBLIC KEY-----';
        var reqUrl = Config.host.imHost;// === 'production' ? 'http://218.213.86.206' : 'http://10.5.15.10:2000'

        if (sub == 'login') {
            reqUrl = reqUrl + "/login?key=" + RSA.encrypt(cryptKey, RSA.getPublicKey(PUBLICKEY)) + "&callback=callback";
        } else if (sub !== undefined) {
            reqUrl = reqUrl + "/common?session=" + getSession() + "&callback=callback";
        } else {
            reqUrl = reqUrl + "/getmsg?session=" + getSession() + "&callback=callback";
        }

        return reqUrl;
    }

    function handleRequestData(cmd, sub, req, seq, vcode_session, vcode_usdata) {
        if (seq === undefined) {
            seq = getSeq();
        }
        var params = {
            cmd: cmd,
            sub: sub,
            seq: seq,
            source: '1001',
            ver: '1',
            body: req,
            vcode_session: vcode_session,
            vcode_usdata: vcode_usdata
        };

        params = JSON.stringify(params);
        params = XxteaUtil.encrypt(params);

        return params;
    }

    function handleResponseData(data) {

        if (data.indexOf('"cmd":"http-entry"') !== -1) {
            return JSON.parse(data);
        }
        data = data.trim();
        data = data.substr( 9, data.length - 10 ); //数据返回callback(xxx),需去掉 callbak 封装
        data = XxteaUtil.decrypt(data);
        data = JSON.parse(data);
        return data;
    }

    var imApiServer = {

        fetch : function( reqBody, cmd, subCmd, callback ,error) {

            return $.ajax( {
                type : 'POST',
                async : true,
                timeout : 0,
                url : getUrl( cmd,subCmd ),
                data : handleRequestData( cmd, subCmd, reqBody ),
                headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded'
                },
                success : function( data ) {
                    data = handleResponseData( data );
                    console.log(data)
                    callback && callback( data );
                },
                error : function( e, type ){
                    error && error();
                },
                complete : function( data ){
                }
            } )
        }
    };

    return imApiServer;
})