require(['hbs','lang','text!views/moudle/dialog.hbs'],function(HBS,lang,dialog){
    console.log(lang)
    var dialog_htm = HBS.compile(dialog)({
        title : '弹窗',
        txt : '<p>十分大大的</p>',
        lang : lang
    });
    document.querySelector('body').innerHTML = dialog_htm;
})