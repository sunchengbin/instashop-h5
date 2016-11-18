/**
 * Created by chenghaolan on 16/11/18.
 * 提供校验支持
 */
define(['base','dialog'],function(Base,Dialog) {
    //校验策略
    var strategies = {
        isNonEmpty:function(value,errorMsg){
            if(value==void 0||value===""){
                return errorMsg
            }
        },
        isEqualPlaceholder:function(value,errorMsg){
            var _source,_target;
            if(typeof value=="object"){
                _source = value.source;
                _target = value.target;
                if(_source!==_target){
                    return errorMsg
                }
            }
        }
    }
    var Validator = function(){
        this.cache = [];
    }
    //添加校验规则
    Validator.prototype.add = function(value,rules){
        var _self = this;
        for(var i=0,rule;rule=rules[i++];){
            (function(rule){
                var strategyArray = rule.strategy.split(":");
                var errorMsg = rule.errorMsg;
                _self.cache.push(function(){
                    var strategy = strategyArray.shift();
                    strategyArray.unshift(value);
                    strategyArray.push(errorMsg);
                    return strategies[strategy].apply(value,strategyArray);
                })
            })(rule);
        }
    }

    Validator.prototype.addBatch = function(verifyList){
        var _self = this;
        for(var i = 0,verifyTarget;verifyTarget = verifyList[i++];){
            _self.add(verifyTarget.target, verifyTarget.rules);
        }
        return _self;
    }

    //启动校验
    Validator.prototype.start = function(){
        for(var i = 0,validatorFun;validatorFun = this.cache[i++];){
            var errorMsg =validatorFun();
            if(errorMsg){
                Dialog.tip({
                    top_txt : '',//可以是html
                    body_txt : '<p class="dialog-body-p">'+errorMsg+'</p>'
                });
                return;
            }
        }
    }
    return Validator;
});