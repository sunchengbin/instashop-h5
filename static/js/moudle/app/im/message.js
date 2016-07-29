/**
 * Created by sunchengbin on 16/7/1.
 * 消息监听
 */
define(['server','config','base','imcommon','lazyload'],function(Server,Config,Base,Common,Lazyload){
    var Message = {
        msgListen : function(){
            var _this = this;
            Server.fetch(null, undefined, undefined, function (result) {
                //console.log(result);
                _this.msgListen();
                if (Base.others.isArray(result)) {
                    Base.others.each(result, function (r) {
                        _this.handleWhatListened(r);
                    });
                } else {
                    _this.handleWhatListened(result);
                }
            });
        },
        handleWhatListened : function(result){
            var _this = this,
                cmd = result.cmd,
                sub_cmd = result.sub_cmd,
                body = result.body;
            // 收到消息
            if( cmd === Config.msgCmds.MAIN ) {
                if( sub_cmd === Config.msgCmds.SEND_NOTIFY ) {
                    // 消息类型是 1 === 文本
                    // 消息类型是 2 === 机器人文本消息
                    if( body.msg_type === 1 || body.msg_type === 2 ) {
                        var _msg = Common.HTMLDeCode(Common.transAddressMsg(decodeURIComponent(body.msg_data))),
                            _htm = Common.insertSellerMsg(_msg,body.time);
                        $('.j_message_wraper').append(_htm);
                        Common.ScorllToBottom();
                        _this.sendAck( body.from_uid, body.from_source_type, body.msgid );
                    }
                }
            }
            if( cmd === Config.userCmds.MAIN ) {
                if( sub_cmd === Config.userCmds.KICKOUT ) {
                    alert( '您的账号已在其他设备上登录.' )
                }
            }
        },
        sendAck : function( from_uid, from_source_type, msgid ) {//发送ack信息
            return function() {
                var reqBody = {
                    ackUid: from_uid,
                    ackSourceType: from_source_type,
                    ackMsgId: msgid
                };
                Server.fetch( reqBody, Config.msgCmds.MAIN, Config.msgCmds.SEND_ACK )
            }
        },
        sendMessage : function(fromUid, toUid, msgContent, mediaType,callback,address){//发送消息
            var time = Date.now(),
                _msgContent = address?encodeURIComponent(msgContent):encodeURIComponent( Common.enCode(msgContent));
            var reqBody = {
                fromUid : fromUid,
                fromSourceType : '1001',
                toUid : toUid,
                toSourceType : '1001',
                msgId : time,
                time : time,
                msgType : '1', //固定值
                mediaType : mediaType || '1', // mediaType == 2 是图片型信息
                msgData : _msgContent
            };
            //console.log(msgContent);
            var _msg = Common.HTMLEnCode(msgContent),
                _htm = '',
                _time = (new Date()).getTime();
            if(mediaType && mediaType == 2){//图片消息
                //本地上传了不需要
                _htm = Common.insertUserMsg(Common.transAddressMsg(_msg),_time,'1');
            }else{//文本消息
                _htm = Common.insertUserMsg(_msg,_time);
                $('.j_message_wraper').append(_htm);
            }

            Common.ScorllToBottom();
            Server.fetch( reqBody, Config.msgCmds.MAIN, Config.msgCmds.SEND,function(){
                callback && callback();
            },function(){
                callback && callback();
            });
        }

    };
    return Message;
})