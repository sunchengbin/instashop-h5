//baseUrl 放在服务端写入页面
require.config({
    baseUrl: "/static/js/",
    paths: {
        //基础框架配置
        base: 'base/base/base',
        handlebars : 'base/handlebars-v2.0.0',
        hbs : 'base/hbs',
        text : 'base/text',
        insjs : 'base/insjs',
        //组件配置路径
        dialog : 'moudle/ui/dialog/dialog',
        select : 'moudle/ui/select/select',
        btn : 'moudle/ui/btn/btn',
        lazyload : 'moudle/ui/lazyload/lazyload',
        slide:'moudle/ui/slidebanner/slidebanner',
        slideselect:'moudle/ui/slideselect/slideselect',
        onoff:'moudle/ui/onoff/onoff',
        audio:'moudle/ui/audio/audio',
        ajax:"moudle/ui/ajax/ajax",
        common:"moudle/app/common/common",
        buyplug:"moudle/app/buyplug/buyplug",
        item:"moudle/app/item/item",
        quickbuyplug:"moudle/app/quickbuyplug/quickbuyplug",
        cart:"moudle/app/cart/cart",
        logistics:"moudle/app/logistics/logistics",
        contact:"moudle/app/contact/contact",
        fastclick:"moudle/ui/fastclick/fastclick",
        viewer:"moudle/ui/viewer/viewer",
        sharecoupon:"moudle/app/sharecoupon/sharecoupon",
        uploadimg:"moudle/app/uploadimg/uploadimg",
        //h5配置
        config:'moudle/config/config',
        //数据存储js
        city:"moudle/data/city",
        lang:"moudle/data/lang",
        bankcity:'moudle/data/bankcity',
        //im配置
        //imconfig:'moudle/config/imconfig',
        //im通信接口参数加密
        jsbn:"moudle/decode/jsbn",
        xxtea:"moudle/decode/xxtea",
        rsa:"moudle/decode/rsa",
        base64:"moudle/decode/base64",
        md5:"moudle/decode/md5",
        //请求相关
        server:'moudle/app/im/server',
        //公用方法
        imcommon:'moudle/app/im/common',
        //功能模块
        user:'moudle/app/im/user',
        history:'moudle/app/im/history',
        message:'moudle/app/im/message',
        validator:'moudle/ui/validator/validator',
        debug:'moudle/app/debug/debug',
        favorable:'moudle/app/favorable/favorable',
        "tab":"moudle/ui/tab/tab",
        "oauth":"moudle/app/oauth/oauth",
        "cache":"moudle/app/cache/cache",
        "sharebargain":"moudle/app/sharebargain/sharebargain",
        "bargain":"moudle/app/bargain/bargain",
        "tradeplug":"moudle/app/tradeplug/tradeplug"
    },
    packages: []
});
