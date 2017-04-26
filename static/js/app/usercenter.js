/**
 * Created by sunchengbin on 2017/4/26.
 */
require(['oauth','base','config','common'],function(Oauth,Base,Config,Common){
    $('body').on('click', '.j_go_back', function () {
        var _local_url = localStorage.getItem('FromUrl'),
            _host_url = location.href,
            _key = Base.others.getUrlPrem('search'),
            _search_url = Config.host.hrefUrl + 'search.php' + (_key ? '?key=' + _key + '&seller_id=' + init_data.item.seller_id : ''),
            _scroll_url = localStorage.getItem('index_route_info') ? localStorage.getItem('index_route_info') : '';
        if (_local_url && !/detail/g.test(_local_url)) {
            if (/\.instashop\.co\.id\/\d+/g.test(_local_url)) { //我们自己的域名下
                if (/\?search/g.test(_host_url)) { //搜索页过来会追加
                    location.href = _search_url;
                } else {
                    if (/\/s\//g.test(_local_url)) { //m-test或者m.test的首页url
                        location.href = Common.transUrl(_local_url, _scroll_url);
                    } else {
                        if (/\?/g.test(_local_url) && !/\?rec/g.test(_local_url)) {
                            location.href = localStorage.getItem('FromUrl') + '&item=back' + _scroll_url;
                        } else {
                            var _url = Base.others.isCustomHost() ? Config.host.host + 's/' + init_data.item.shop.id : Config.host.host;
                            location.href = _url + '?item=back' + _scroll_url;
                        }
                    }
                }
            } else { //独立域名
                var _host_name = location.hostname;
                if (/\?search/g.test(_host_url)) { //搜索页
                    location.href = _search_url;
                } else {
                    if (/\/\d+/g.test(_local_url)) { //是当前详情页
                        if (/\/k\/\d+/g.test(_local_url)) { //分类页
                            location.href = Common.transUrl(_local_url, _scroll_url);
                        } else {
                            if (/\/s\//g.test(_local_url)) { //m.instashop域名规则首页
                                location.href = Common.transUrl(_local_url, _scroll_url);
                            } else {
                                location.href = location.protocol + '//' + _host_name + '?item=back' + _scroll_url;
                            }
                        }
                    } else {
                        if (/\?/g.test(_local_url) && !/\?rec/g.test(_local_url)) {
                            location.href = localStorage.getItem('FromUrl') + '&item=back' + _scroll_url;
                        } else {
                            location.href = location.protocol + '//' + _host_name + '?item=back' + _scroll_url;
                        }
                    }
                }
            }
        } else {
            Common.saveFromUrl(function () {
                var _url = !Base.others.isCustomHost() ? Config.host.host : Config.host.host + 's/' + init_data.item.shop.id;
                location.href = _url + '?item=back' + _scroll_url;
            });
        }
    });
})