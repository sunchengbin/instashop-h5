/**
 * tab组件
 * 提供tab标签内容切换视图功能
 * @author lanchenghao@weidian.com
 */
define([
    'base',
    'config',
    'lang',
    'debug'
], function (Base, Config, Lang, Debug) {
    'use strict';
    //.tab_th
    var defaultOpts = {
        tabPrefix: "tab_",
        activeItemClass: "tab-active",
        activePanelClass: "tabpanel-active"
    }

    var Tab = function (opts) {
        this.init(opts);
    }


    Tab.prototype = {
        init: function (opts) {
            Debug.log("tab init begin");
            var _this = this;
            _this.opts = $.extend(opts);
            //tab选项卡
            _this.tabs = {};
            var _tabPanels = _this._tabPanels = _this.opts.$content ? $(_this.opts.$content).find(".tabpanel") : null;
            var _tabRoles = _this._tabRoles = $(_this.opts.$header).find(".tabitem");
            if (_tabPanels && _tabPanels.length > 0) {
                if (_tabRoles.length != _tabPanels.length) {
                    Debug.log("tab init error:msg:no match tagrole and tagpanel");
                    return;
                }
                $.each(_tabRoles, function (index, ele) {
                    var tabRole = defaultOpts.tabPrefix + (index + 1);
                    _this.tabs[tabRole] = {};
                    _this.tabs[tabRole].tabEl = ele;
                    _this.tabs[tabRole].tabPanel = _tabPanels[index];
                    $(_this.tabs[tabRole].tabEl).attr("role", tabRole);
                    if (index == 0) {
                        _this.tabs[tabRole].active = true;
                    } else {
                        _this.tabs[tabRole].active = false;
                    }
                })
            } else {
                $.each(_tabRoles, function (index, ele) {
                    var tabRole = defaultOpts.tabPrefix + (index + 1);
                    _this.tabs[tabRole] = {};
                    _this.tabs[tabRole].tabEl = ele;
                    $(_this.tabs[tabRole].tabEl).attr("role", tabRole);
                    if (index == 0) {
                        _this.tabs[tabRole].active = true;
                    } else {
                        _this.tabs[tabRole].active = false;
                    }
                })
            }


            // this.switchTab(this.tabs.tab_1);
            _this.handleEvent();
            if(_this.opts.defaultTab!=void(0)){
                _this.restoreActiveStatus();
                $(_this.tabs[defaultOpts.tabPrefix+_this.opts.defaultTab].tabEl).addClass(defaultOpts.activeItemClass);
                $(_this.tabs[defaultOpts.tabPrefix+_this.opts.defaultTab].tabPanel).addClass(defaultOpts.activePanelClass);
            }
        },
        handleEvent: function () {
            var _this = this;
            var _event_selector = _this.opts.$header + " " + ".tabitem";
            $("body").on("click", _event_selector, function (e) {
                _this.switchTab($(this));
            })
        },
        switchTab: function ($el) {
            var _this = this;
            // $el.addClass(defaultOpts.activeItemClass);
            var _tabrole = $el.attr("role");
            _this.restoreActiveStatus();
            if (_this._tabPanels) $(_this.tabs[_tabrole].tabPanel).addClass(defaultOpts.activePanelClass);
            _this.opts.switchFn && _this.opts.switchFn.call(_this, {
                el: $el,
                tabalias:_this.opts.alias[_tabrole.split("_")[1]-1],
                tabRole: _tabrole,
                tabPanel: _this._tabPanels ? $(_this.tabs[_tabrole].tabPanel) : null
            });
            $(_this.tabs[_tabrole].tabEl).addClass(defaultOpts.activeItemClass);
        },
        restoreActiveStatus: function () {
            var _this = this;
            if (_this._tabPanels) _this._tabPanels.removeClass(defaultOpts.activePanelClass);
            if (_this._tabRoles) _this._tabRoles.removeClass(defaultOpts.activeItemClass);
        }
    }
    return function (opts) {
        return new Tab(opts);
    }
});