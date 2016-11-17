/**
 * Created by sunchengbin on 2016/11/11.
 * 选择模块类型
 */
require(['base','insjs','fastclick','config'],function(Base,Insjs,FastClick,Config){
    var ModelType = {
        init : function(){
            var _this = this;
            Insjs.WebOnReady(function(bridge){
                _this.handelFn(bridge);
            },function(){
                _this.handelFn();
            });
        },
        handelFn : function(bridge){
            var _this = this;
            FastClick.attach(document.body);
            $('body').on('click','.j_model_type',function(){
                var _type = $(this).attr('data-type'),
                    _index = Base.others.getUrlPrem('index');
                var _param = {
                    param:{
                        type:'edit_model',
                        param:{
                            index : _index,
                            type: _type,
                            data: []
                        }
                    }
                };
                bridge.callHandler('insSocket',_param, function(response) {
                    return null;
                });
            });
            (function (win, dom) {
                var SwitchTap = {
                    init: function () {
                        this.bind();
                        this.switchTap(null, "imageads");
                    },
                    changeId: function (tabid) {
                        var _alltab = dom.querySelectorAll(".decorate-sample-panel") || [];
                        var _alltabitem = dom.querySelectorAll(".decorate-sample-tab-item") || [];
                        for (var _i = 0; _i < _alltabitem.length; _i++) {
                            _alltabitem[_i].className = _alltabitem[_i].className.replace("decorate-sample-tab-active", "");
                        }
                        for (var _i = 0; _i < _alltab.length; _i++) {
                            _alltab[_i].style.display = "none";
                        }
                        dom.querySelector("#" + tabid).style.display = "block";
                    },
                    switchTap: function (event, tabid) {
                        var ctx = this;
                        var _tabid = "";
                        if (!!event && event.target) {
                            _tabid = event.target.getAttribute("data-tabid") || "imageads";
                            ctx.changeId(_tabid);
                            event.target.className = " decorate-sample-tab-item decorate-sample-tab-active";
                        } else {
                            ctx.changeId(tabid);
                            document.querySelectorAll(".decorate-sample-tab-item") && (document.querySelectorAll(".decorate-sample-tab-item")[0].className = "decorate-sample-tab-item decorate-sample-tab-active")
                        }

                    },
                    bind: function () {
                        var ctx = this;
                        dom.querySelector(".decorate-sample-tab").addEventListener("click", function (event) {
                            ctx.switchTap(event);
                        });
                    }
                }
                SwitchTap.init();
            })(window, document)
        }
    };
    ModelType.init();
})
