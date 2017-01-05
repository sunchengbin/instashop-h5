define([
    'base',
], function (Base) {
    var Debug = {
        default:{
            prefixTemplate:"======{title}:begin ======",
            endTemmplate:"======{title}:end ======"
        },
        switch:(function(){
            var _isdebug = Boolean(Base.others.getUrlPrem("debug"));
            return _isdebug;
        })(),
        log:function(debug){
            if(this.switch){
                console.log(Base.others.fillTemplate(this.default.prefixTemplate,{title:debug.title}))
                console.log(debug.data)
                console.log(Base.others.fillTemplate(this.default.endTemmplate,{title:debug.title}))
            }
        }
    }
    return Debug;
});