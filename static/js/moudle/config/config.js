/**
 * Created by sunchengbin on 16/3/21.
 * 一些基本配置
 * 图片,接口
 */

define([],function(){
    var CONFIG = {
        host : {
            //测试环境
            hostUrl : 'http://www-test.instashop.co.id/html/',//内部router的路径
            actionUrl : 'https://apip-test.instashop.co.id/instashop/',
            host : 'http://www-test.instashop.co.id/',
            imgUrl : 'http://www-test.instashop.co.id/images',
            hrefUrl : 'http://www-test.instashop.co.id/html/'
            //线上
            //hostUrl : 'http://instashop.co.id/html/',//内部router的路径
            //actionUrl : 'https://apip.instashop.co.id/instashop/',
            //host : 'http://instashop.co.id/',
            //imgUrl : 'http://instashop.co.id/images',
            //hrefUrl : 'http://instashop.co.id/html/'
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