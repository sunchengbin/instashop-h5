/**
 * Created by sunchengbin on 16/6/30.
 * 历史消息获取
 */
define(['server','config','lazyload','imcommon','base','message'],function(Server,Config,Lazyload,Common,Base,Message){
    var startMsgTime = '18446744073709551615';
    var startMsgId = '18446744073709551615';
    var LIMIT = 10;
    var HISTORY = {
        init : function(toUid,callbcak,sid,type,height){
            var _this = this;
            //_this.handleFn();
            var reqBody = {
                uid : toUid,
                limit: LIMIT,
                startMsgTime: startMsgTime,
                startMsgId: startMsgId
            };
            if(startMsgTime == 0){
                //callbcak && callbcak();
                return;
            }
            Server.fetch(//获取历史消息
                reqBody,
                Config.msgCmds.MAIN,
                Config.msgCmds.GET_HISTORY_MSG,
                function( result ) {
                    if(result.code == 200000){
                        if(!result.body.msgs.length){//没有历史聊天记录
                            if(sid && !type){
                                var data = JSON.parse(localStorage.getItem('SELLERINFO'));
                                var _htm = Common.insertSellerMsg(Common.HTMLEnCode(data[sid].note),(new Date()).getTime());
                                $('.j_message_wraper').prepend(_htm);
                            }
                        }else{
                            var _user_id = localStorage.getItem('UID'),
                                _htm = '';
                            Base.others.each(result.body.msgs,function(msg,i){
                                var _msg = Common.transAddressMsg(Common.HTMLEnCode(decodeURIComponent(msg.msg_data)));
                                if(_user_id != msg.from_uid){
                                    _htm+=Common.insertSellerMsg(_msg,msg.time);
                                }else{
                                    _htm+=Common.insertUserMsg(_msg,msg.time);
                                }
                            });
                            if(type){
                                $('.j_message_wraper').prepend(_htm);
                            }else{
                                $('.j_message_wraper').append(_htm);
                            }
                            Server.fetch({uid: toUid}, Config.msgCmds.MAIN, Config.msgCmds.CLEAR_UNREAD, function (data) {});
                        }
                        startMsgId = result.body.last_msgid;
                        startMsgTime = result.body.last_msgtime;
                    }
                    callbcak && callbcak(height);
                },
                function(){
                    callbcak && callbcak();
                }
            );
        }
    };
    return HISTORY;
})