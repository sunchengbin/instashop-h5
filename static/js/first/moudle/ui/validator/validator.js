/**
 * Created by chenghaolan on 16/11/18.
 * 提供细分校验支持
 */
define(['base', 'dialog'], function (Base, Dialog) {
    //校验策略
    var strategies = {
        isNonEmpty: function (value, errorMsg) {
            if (value == void 0 || value === "") {
                return errorMsg
            }
        },
        isEqualPlaceholder: function (value, placeholder, errorMsg) {
            if (value == placeholder) {
                return errorMsg
            }
        }
    }
    var Validator = function () {
        this.cache = [];
    }
    //添加校验规则
    Validator.prototype.add = function (value, rules) {
        var _self = this;
        for (var i = 0, rule; rule = rules[i++];) {
            (function (rule) {
                var strategyArray = rule.strategy.split(":");
                var errorMsg = rule.errorMsg;
                var strategy = strategyArray.shift();
                strategyArray.unshift(value);
                strategyArray.push(errorMsg);
                _self.cache.push(function () {
                    return strategies[strategy].apply(value, strategyArray);
                })
            })(rule);
        }
    }

    Validator.prototype.execBatch = function (verifyList) {
        var _self = this;
        _self.cache = [];
        for (var i = 0, verifyTarget; verifyTarget = verifyList[i++];) {
            _self.add(verifyTarget.target, verifyTarget.rules)
        }
        return _self.start();
    }

    //启动校验
    Validator.prototype.start = function () {
        var self = this;
        for (var i = 0, validatorFun; validatorFun = self.cache[i++];) {
            var errorMsg = validatorFun();
            if (errorMsg) {
                throw new Error(errorMsg);
            }
        }
    }
    return new Validator();
});