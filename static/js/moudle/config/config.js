/**
 * Created by sunchengbin on 16/3/21.
 * 一些基本配置
 * 图片,接口
 */

define([],function(){
    var URL_HTTP_TYPE = location.protocol,
        URL_HOST_NAME = location.hostname;//自由切换url协议
    var CONFIG = {
        host : {
            //测试环境
            //hostUrl : 'https://m-test.instashop.co.id/html/',//内部router的路径
            //actionUrl : 'https://apip-test.instashop.co.id/instashop/',
            //host : 'https://m-test.instashop.co.id/',
            //imgUrl : 'https://m-test.instashop.co.id/static/images',
            //hrefUrl : 'https://m-test.instashop.co.id/html/',
            //imHost : 'http://10.5.15.10:2000',
            //imUserNameHost : 'http://10.5.15.10:2040/',//存储im用户名字
            //phpHost : 'https://api-test.instashop.co.id/instashop/instashop/im/',
            //hrefHost : 'https://m-test.instashop.co.id/html'
            //线上
            hostUrl : URL_HTTP_TYPE+'//'+URL_HOST_NAME+'/html/',//内部router的路径
            host : URL_HTTP_TYPE+'//'+URL_HOST_NAME+'/',
            imgUrl : URL_HTTP_TYPE+'//'+URL_HOST_NAME+'/static/images',
            hrefUrl : URL_HTTP_TYPE+'//'+URL_HOST_NAME+'/html/',
            hrefHost : URL_HTTP_TYPE+'//'+URL_HOST_NAME+'/html',
            actionUrl : 'https://apip.instashop.co.id/instashop/',
            imHost : 'http://218.213.86.206',
            phpHost : 'http://api.instashop.co.id/instashop/instashop/im/',
            imUserNameHost : 'http://218.213.86.206:2040/'//存储im用户名字
            //本地开发环境
            //hostUrl : URL_HTTP_TYPE+'//'+URL_HOST_NAME+'/html/',//内部router的路径
            //host : URL_HTTP_TYPE+'//'+URL_HOST_NAME+'/',
            //imgUrl : URL_HTTP_TYPE+'//'+URL_HOST_NAME+'/static/images',
            //hrefUrl : URL_HTTP_TYPE+'//'+URL_HOST_NAME+'/html/',
            //hrefHost : URL_HTTP_TYPE+'//'+URL_HOST_NAME+'/html',
            //actionUrl : 'https://apip-test.instashop.co.id/instashop/',
            //imHost : 'http://10.5.15.10:2000',
            //imUserNameHost : 'http://10.5.15.10:2040/',//存储im用户名字
            //phpHost : 'http://10.5.15.10:8888/instashop/instashop/im/'
        },
        linkUrl : {
            index : 's/',
            item : 'detail/',
            cart : 'html/cart.html',
            orderConfirm : 'html/orderconfirm.html',
            address : 'html/address.html'
        },
        actions : {
            setUserName : 'set_user_memo',//设置app中用户的name
            getUserInfo : 'getUserInfo',//获取用户信息
            shopList : 'v1/shops/',//商家首页商品数据获取接口
            testCart : 'v1/carts/',//验证购物车商品是否可以下单
            orderConfirm : 'v1/orders',//下单
            imNum:'v1/im/',//获取im的回复信息数
            expressesList:'v1/expresses/',//获取物流列表
            uploadprove:'v1/evidence'//上传付款凭证
        },
        actionType : {
            /**
             * 发出登录请求
             */
            REQUEST_LOGIN : 'REQUEST_LOGIN',

            /**
             * 登录成功
             */
            LOGIN_SUCCESS : 'LOGIN_SUCCESS',

            /**
             * 用户开始输入消息
             */
            START_INPUT_CHAT : 'START_INPUT_CHAT',

            /**
             * 用户结束输入消息
             */
            END_INPUT_CHAT : 'END_INPUT_CHAT',

            /**
             * 开始监听消息
             */
            LISTENING : 'LISTENING',

            /**
             * 收到消息
             */
            RECEIVE_MSG : 'RECEIVE_MSG',

            /**
             * 请求发送消息
             */
            REQUEST_SEND_MESSAGE : 'REQUEST_SEND_MESSAGE',

            /**
             * 用户输入消息
             */
            ON_INPUT_CHAT : 'ON_INPUT_CHAT',

            /**
             * 清空输入框内容
             */
            EMPTY_TEXT_INPUT : 'EMPTY_TEXT_INPUT',


            /**
             * 请求历史消息
             */
            REQUEST_HISTORY_MESSAGE : 'REQUEST_HISTORY_MESSAGE',

            /**
             * 接收历史消息
             */
            RECEIVE_HISTORY_MESSAGE : 'RECEIVE_HISTORY_MESSAGE',

            /**
             * 接收业务用户信息
             */
            RECEIVE_USER_INFO : 'RECEIVE_USER_INFO',

            /**
             * 将 imUid 映射到 uid
             */
            MAP_IM_UID_TO_UID : 'MAP_IM_UID_TO_UID',

            /**
             * 显示 loading
             */
            SHOW_LOADING : 'SHOW_LOADING',

            /**
             * 隐藏 loading
             * @type {String}
             */
            HIDE_LOADING : 'HIDE_LOADING',

            /**
             * 显示地址表单
             */
            SHOW_ADDRESS_FROM : 'SHOW_ADDRESS_FROM',

            /**
             * 隐藏地址表单
             */
            HIDE_ADDRESS_FORM : 'HIDE_ADDRESS_FORM',

            /**
             * 开始上传
             */
            UPLOAD_START : 'UPLOAD_START',

            /**
             * 上传完成
             */
            UPLOAD_FINISHED : 'UPLOAD_FINISHED',

            /**
             * 请求欢迎语
             */
            REQUEST_WELCOME_MESSAGE : 'REQUEST_WELCOME_MESSAGE',

            /**
             * 发出欢迎语
             */
            SAY_HELLO : 'SAY_HELLO'

        },
        userCmds :{
            /**
             * 主命令
             */
            MAIN : 'user',

            /**
             * 登录命令
             */
            LOGIN : 'login',

            /**
             * 踢下线
             */
            KICKOUT : 'kickout'
        },
        msgCmds : {
            /**
             * 主命令
             */
            MAIN : 'msg',

            /**
             * 获取历史聊天信息子命令
             */
            GET_HISTORY_MSG : 'get_history_msg',

            /**
             * 清除未读消息数
             */
            CLEAR_UNREAD : 'clear_unread',
            /**
             * 接收到新消息
             */
            SEND_NOTIFY : 'send_notify',
            /**
             * 发送 ack 消息
             */
            SEND_ACK : 'send_ack',
            /**
             * 发送聊天消息
             */
            SEND : 'send'

        }
    };
    return CONFIG;
})