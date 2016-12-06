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
            //线上
            //hostUrl : URL_HTTP_TYPE+'//'+URL_HOST_NAME+'/html/',//内部router的路径
            //host : URL_HTTP_TYPE+'//'+URL_HOST_NAME+'/',
            //imgUrl : URL_HTTP_TYPE+'//static.instashop.co.id/images',
            //hrefUrl : URL_HTTP_TYPE+'//'+URL_HOST_NAME+'/html/',
            //hrefHost : URL_HTTP_TYPE+'//'+URL_HOST_NAME+'/html',
            //actionUrl : 'https://apip.instashop.co.id/instashop/',
            //imHost : 'http://218.213.86.206',
            //phpHost : 'http://api.instashop.co.id/instashop/',
            //imUserNameHost : 'http://218.213.86.206:2040/'//存储im用户名字
            //本地开发环境和测试环境
            hostUrl : URL_HTTP_TYPE+'//'+URL_HOST_NAME+'/html/',//内部router的路径
            host : URL_HTTP_TYPE+'//'+URL_HOST_NAME+'/',
            imgUrl : URL_HTTP_TYPE+'//static-test.instashop.co.id/images',
            hrefUrl : URL_HTTP_TYPE+'//'+URL_HOST_NAME+'/html/',
            hrefHost : URL_HTTP_TYPE+'//'+URL_HOST_NAME+'/html',
            actionUrl : 'https://apip-test.instashop.co.id/instashop/',
            imHost : 'http://10.5.15.10:2000',
            imUserNameHost : 'http://10.5.15.10:2040/',//存储im用户名字
            phpHost : 'http://api-test.instashop.co.id/instashop/'
        },
        actions : {
            setUserName : 'set_user_memo',//设置app中用户的name
            getUserInfo : 'getUserInfo',//获取用户信息
            shopList : 'v1/shops/',//商家首页商品数据获取接口
            testCart : 'v1/carts/',//验证购物车商品是否可以下单
            orderConfirm : 'v1/orders',//下单
            imNum:'v1/im/',//获取im的回复信息数
            expressesList:'v1/expresses/',//获取物流列表
            uploadprove:'v1/evidence',//上传付款凭证
            errorAction:'v1/h5log',//上传错误log
            feedBack:'v1/feedback',//用户反馈页面
            domainName:'v1/domain',//自定义域名相关
            instagramcheck:'v1/auth',//instagramid搬家校验
            sortAction:'v1/tag/',//分类页面翻页接口
            saveTemplate:'v1/shopsTemplate',//提交装修模板
            selfCheckDomain:'v1/domain'//第二期自定义域名活动接口
        }
    };
    return CONFIG;
})