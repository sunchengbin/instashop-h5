/**
 * Created by sunchengbin on 16/3/21.
 * 一些基本配置
 * 图片,接口
 */

define([],function(){
    var CONFIG = {
        host : {
            //本地测试
            hostUrl : 'http://127.0.0.1/',
            actionUrl:'https://api-m-test.instarekber.com',
            imgUrl : 'http://127.0.0.1/instashop/images',
            hrefUrl : 'http://127.0.0.1/instashop/html'
            //测试环境
            //hostUrl : '',
            //imgUrl : 'http://m-test.instashop.co.id/images',
            //hrefUrl : 'http://m-test.instashop.co.id/html'
            //线上
            //hostUrl : '',
            //imgUrl : 'http://m.instashop.co.id/images',
            //hrefUrl : 'http://m-test.instashop.co.id/html'
        },
        actions : {
            shopList : '/instashop/v1/shops/'//商家首页商品数据获取接口
        }
    };
    return CONFIG;
})