/**
 * Created by sunchengbin on 16/6/16.
 */
require(['hbs','text!views/app/logistics.hbs'],function(Hbs,Logistics) {
    var _htm= Hbs.compile(Logistics)(init_data.logistics);
    $('body').prepend(_htm);
})