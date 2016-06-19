/**
 * Created by sunchengbin on 16/6/16.
 */
require(['hbs','text!views/app/logistics.hbs','lang'],function(Hbs,Logistics,Lang) {
    init_data.logistics.lang = Lang;
    var _htm= Hbs.compile(Logistics)(init_data.logistics);
    $('body').prepend(_htm);
})