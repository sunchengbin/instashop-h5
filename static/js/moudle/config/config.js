/**
 * Created by sunchengbin on 16/3/21.
 * 一些基本配置
 * 图片,接口
 */

define(['base'],function(Base){
    var URL_HTTP_TYPE = location.protocol,
        URL_HOST_NAME = location.hostname,
        HOST_URL = isAws()?getAwsHostUrl():getHongKongHostUrl(),
        HOST = {//线上环境
            hostUrl : URL_HTTP_TYPE+'//'+URL_HOST_NAME+'/html/',//内部router的路径
            host : URL_HTTP_TYPE+'//'+URL_HOST_NAME+'/',
            imgUrl : URL_HTTP_TYPE+'//'+HOST_URL.staticHost+'/images',
            hrefUrl : URL_HTTP_TYPE+'//'+URL_HOST_NAME+'/html/',
            hrefHost : URL_HTTP_TYPE+'//'+URL_HOST_NAME+'/html',
            actionUrl : 'https://'+HOST_URL.apipHost+'/instashop/',
            phpHost : 'https://'+HOST_URL.apiHost+'/instashop/',
            imHost : 'http://218.213.86.206',
            imUserNameHost : 'http://218.213.86.206:2040/',//存储im用户名字
            maphost : 'http://m.instashop.co.id/'//存储im用户名字
        };
    var CONFIG = {
        host : HOST,
        getDebugEnv:getDebugEnv('master'),
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
            selfCheckDomain:'v1/domain',//第二期自定义域名活动接口
            shopsDiscount:'v1/shopsDiscount',//满减验证接口
            search:'v1/shopsItems/self',//商品搜索
            getCoupon:'v1/coupon',//领取优惠券
            oauth:'v1/buyer',//登录
            bargain:"v1/bargain",//砍价
            uploadimg:'instashop/item/pc/addImgs'//上传图片接口

        },
        businessCodes:{
            ORDER_BY_DEFAULT:0,
            ORDER_BY_ADDTIME:1,
            ORDER_BY_PRICE_L2H:2,
            ORDER_BY_PRICE_H2L:3,
            FILTER_ALL:0,
            FILTER_TOP:1
        }
    };
    function isAws(){
        if(/testaws\./g.test(URL_HOST_NAME) || /\.aws\./g.test(URL_HOST_NAME)){
            return true;
        }
        return false;
    }
    function getHongKongHostUrl(){//香港服务器
        if(/test\.instashop/g.test(URL_HOST_NAME) || /test\./g.test(URL_HOST_NAME)){
            //测试环境
            return {
                staticHost : 'static-test.instashop.co.id',
                apipHost : 'apip-test.instashop.co.id',
                apiHost : 'api-test.instashop.co.id'
            };
        }
        return {
            staticHost : 'static.instashop.co.id',
            apipHost : 'apip.instashop.co.id',
            apiHost : 'api.instashop.co.id'
        };
    }
    function getAwsHostUrl(){
        if(/testaws\.instashop/g.test(URL_HOST_NAME) || /testaws\./g.test(URL_HOST_NAME)){
            //测试环境
            return {
                staticHost : 'static-testaws.instashop.co.id',
                apipHost : 'apip-testaws.instashop.co.id',
                apiHost : 'api-testaws.instashop.co.id'
            };
        }
        return {
            staticHost : 'static-aws.instashop.co.id',
            apipHost : 'apip-aws.instashop.co.id',
            apiHost : 'api-aws.instashop.co.id'
        };
    }
    function setDebugEnv(){
        var Debug = Base.others.getUrlPrem('_debug_env') || localStorage.getItem('DebugEnv');
        if(Debug){
            localStorage.setItem('DebugEnv',Debug);
        }
    }
    function getDebugEnv(debugenv){
        return Base.others.getUrlPrem('_debug_env') || localStorage.getItem('DebugEnv') || debugenv;
    }
    setDebugEnv();
    return CONFIG;
})