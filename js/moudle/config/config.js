/**
 * Created by sunchengbin on 16/3/21.
 * 一些基本配置
 * 图片,接口
 */

define([],function(){
    var CONFIG = {
        host : {
            //本地测试
            hostUrl : 'http://m-test.instashop.co.id/js/',//内部router的路径
            actionUrl : 'https://api-m-test.instarekber.com/instashop/',
            host : 'http://m-test.instashop.co.id/',
            imgUrl : 'http://m-test.instashop.co.id/images',
            hrefUrl : 'http://m-test.instashop.co.id/html/'
            //测试环境
            //hostUrl : '',
            //imgUrl : 'http://m-test.instashop.co.id/images',
            //hrefUrl : 'http://m-test.instashop.co.id/html'
            //线上
            //hostUrl : '',
            //imgUrl : 'http://m.instashop.co.id/images',
            //hrefUrl : 'http://m-test.instashop.co.id/html'
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
            orderConfirm : 'v1/orders'//下单
        }
    };
    return CONFIG;
})