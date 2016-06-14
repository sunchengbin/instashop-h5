//baseUrl 放在服务端写入页面
require.config({
    baseUrl: "/instashopnew/js/",
    paths: {
        //基础框架配置
        base: 'base/base/base',
        h5_base : 'base/base/h5_base',
        handlebars : 'base/handlebars-v2.0.0',
        hbs : 'base/hbs',
        text : 'base/text',
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
        cart:"moudle/app/cart/cart",
        logistics:"moudle/app/logistics/logistics",
        //配置
        config:'moudle/config/config',
        //数据存储js
        city:"moudle/data/city",
        lang:"moudle/data/lang"
    },
    shim: {    /*用来引入外部插件*/
        //'base/hbs': ['hbs']
    },
    packages: []
});
