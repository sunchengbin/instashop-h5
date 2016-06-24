/**
 * Created by sunchengbin on 16/3/21.
 * 一些基本配置
 * 图片,接口
 */

define([],function(){
    var CONFIG = {
        host : {
            //测试环境
            //hostUrl : 'http://m-test.instashop.co.id/html/',//内部router的路径
            //actionUrl : 'https://apip-test.instashop.co.id/instashop/',
            //host : 'http://m-test.instashop.co.id/',
            //imgUrl : 'http://m-test.instashop.co.id/images',
            //hrefUrl : 'http://m-test.instashop.co.id/html/'
            //线上
            hostUrl : 'http://m.instashop.co.id/html/',//内部router的路径
            actionUrl : 'https://apip.instashop.co.id/instashop/',
            host : 'http://m.instashop.co.id/',
            imgUrl : 'http://m.instashop.co.id/images',
            hrefUrl : 'http://m.instashop.co.id/html/'
        },
        linkUrl : {
            index : 's/',
            item : 'detail/',
            cart : 'html/cart.html',
            orderConfirm : 'html/orderconfirm.html',
            address : 'html/address.html'
        },
        actions : {
            shopList : 'v1/shops/',//商家首页商品数据获取接口
            testCart : 'v1/carts/',//验证购物车商品是否可以下单
            orderConfirm : 'v1/orders',//下单
            imNum:'v1/im/'//获取im的回复信息数
        }
    };
    return CONFIG;
})