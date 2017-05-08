/**
 * Created by sunchengbin on 16/7/19.
 */
/**
 * Created by sunchengbin on 16/6/6.
 */
require(['lang', 'hbs', 'text!views/app/warrantsuccess.hbs', 'config', 'fastclick', 'common', 'base','cache'], function (Lang, Hbs, WarrantSuccess, Config, Fastclick, Common, Base,Cache) {
    var I = {
        init: function () {
            var IndexHtm = '<div>' + Lang.H5_LOADING + '</div>';
            try {
                var _this = this,
                    price = localStorage.getItem('OrderTotal'),
                    OrderInfo = JSON.parse(localStorage.getItem('OrderInfo')),
                    _detail = getUrlPrem('detail', location.href),
                    _isCustomHost = Base.others.isCustomHost(),
                    _url = _isCustomHost ? Config.host.host + 's/' : Config.host.host,
                    _o_url = OrderInfo ? Config.host.host + 'o/' + OrderInfo.id_hash : null,
                    evidenceUrl = Config.host.hrefUrl + 'evidencepayment.php?price=' + OrderInfo.total_price + '&time=' + (OrderInfo.shop_info.cancel_coutdown / 86400);
                if (_detail) {
                    var _order_url = _detail == 1 ? Common.replaceUrlPrompt(_o_url) : Config.host.host + 'o/' + getUrlPrem('order_id'),
                        shopUrl = _detail == 1 ? (_isCustomHost ? _url + OrderInfo.shop_info.id : _url) : (_isCustomHost ? _url + getUrlPrem('shop_id') : _url);
                } else {
                    var _order_url = Common.replaceUrlPrompt(_o_url),
                        shopUrl = _isCustomHost ? _url + OrderInfo.shop_info.id : _url;
                }
                _this.orderUrl = _order_url;
                _this.shopUrl = shopUrl;
                IndexHtm = Hbs.compile(WarrantSuccess)({
                    shopInfo: OrderInfo.shop_info,
                    lang: Lang,
                    host: Config.host,
                    orderUrl: _order_url,
                    shopUrl: shopUrl,
                    evidenceUrl: evidenceUrl,
                    detail: _detail
                });
            } catch (error) {
                console.log(error);
                IndexHtm = '<section class="item-out-stock">' +
                    '<i class="icon iconfont icon-error-font"></i>' +
                    '<p>' + Lang.H5_ERROR + '</p>' +
                    '<p><a href="javascript:location.reload();" class="btn confirm-btn b-btn">' + Lang.H5_FRESHEN + '</a></p>' +
                    '</section>';
                //IndexHtm = '<div>'+Lang.H5_ERROR+'</div>';
            }
            $('body').prepend(IndexHtm);
            this.handleFn();
        },
        handleFn: function () {
            Fastclick.attach(document.body);
            var data = JSON.parse(localStorage.getItem('ShopData')),
                from = getUrlPrem('detail', location.href),
                _this = this;
            // 查看订单详情
            $("body").on("click", ".j_goto_order_detail", function () {
                //TODO 标记引导 看情况再封装
                var IndexCoverCache = Cache.getSpace("IndexCache") || new Cache({
                    namespace: "IndexCache",
                    type: "local"
                });
                // 先获取 如果没有再种 有的话pass
                var isShowOrderGuid = IndexCoverCache.find("isShowOrderGuid");
                if (isShowOrderGuid == void(0)) {
                    // 没有种过
                    // 1表示没有展示过
                    PaqPush && PaqPush('首次担保下单', '');
                    IndexCoverCache.set("isShowOrderGuid", "1")
                    setTimeout(function(){
                        location.href = _this.shopUrl;;//去店铺首页
                    },500)
                }else{
                    PaqPush && PaqPush('查看订单详情', '');
                    location.href = _this.orderUrl;
                }
            })
        }
    };
    I.init();

    function getUrlPrem(key, url) {
        var _search = url || document.location.search,
            _pattern = new RegExp("[?&]" + key + "\=([^&]+)", "g"),
            _matcher = _pattern.exec(_search),
            _items = null;
        if (null != _matcher) {
            try {
                _items = decodeURIComponent(decodeURIComponent(_matcher[1]));
            } catch (e) {
                try {
                    _items = decodeURIComponent(_matcher[1]);
                } catch (e) {
                    _items = _matcher[1];
                }
            }
        }
        return _items;
    }
})