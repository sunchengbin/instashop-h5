define([
    'base',
], function (Base) {
    var Debug = {
        default:{
            prefixTemplate:"%c======%c{title}:begin %c======",
            endTemmplate:"%c======%c{title}:end %c======"
        },
        switch:(function(){
            var _isdebug = Boolean(Base.others.getUrlPrem("debug"));
            return _isdebug;
        })(),
        log:function(debug){
            if(this.switch){
                console.log(Base.others.fillTemplate(this.default.prefixTemplate,{title:debug.title}),"color:#43CB9C","color:red","color:#43CB9C")
                console.log(debug.data)
                console.log(Base.others.fillTemplate(this.default.endTemmplate,{title:debug.title}),"color:#43CB9C","color:red","color:#43CB9C")
            }
        }
    }
    return Debug;
});