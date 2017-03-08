/**
 * Created by sunchengbin on 16/6/16.
 */
require(['hbs','text!views/app/logistics.hbs','lang','fastclick'],function(Hbs,Logistics,Lang,Fastclick) {
    init_data.logistics.lang = Lang;
    var _htm= Hbs.compile(Logistics)(init_data.logistics);
    Fastclick.attach(document.body);
    $('body').prepend(_htm);
    $('body').on('click','.j_go_back',function(){
        history.back();
    });
})