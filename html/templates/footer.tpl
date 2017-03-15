<script src="{$STATIC_HOST}/js/base/require-zepto.js"></script>
{if $IS_DEBUG}
    <script src="{$STATIC_HOST}/js/base/require-config.js"></script>
    <script src="{$STATIC_HOST}/js/app/{$INDEX_JS_NAME}.js?v=1489493544386"></script>
{else}
    <script id="j_page_index_js" data-url="/js/dist/app/{$INDEX_JS_NAME}.js?v=1489493544386" src="{$STATIC_HOST}/js/dist/app/{$INDEX_JS_NAME}.js?v=1489493544386"></script>
{/if}
{literal}
    <script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
          var trackOutboundLink = function(url) {
              ga('send', 'event', 'outbound', 'click', url, {
                  'transport': 'beacon',
                  'hitCallback': function(){document.location = url;}
              });
          }
          function goUrlStatistics(type) {
             ga('send', 'event', type, 'click');
          }
          ga('create', 'UA-78448705-7', 'auto');
          ga('send', 'pageview');
          (function(){
                function isTestHost(){
                    var URL_HTTP_TYPE = location.protocol,
                        URL_HOST_NAME = location.hostname;
                    if(/test\.instashop/g.test(URL_HOST_NAME) || /test\./g.test(URL_HOST_NAME)){
                        return URL_HTTP_TYPE+'//static-test.instashop.co.id';
                    }
                    return URL_HTTP_TYPE+'//static.instashop.co.id';
                }
                function resetStaticUrl(){
                    var _js_src = document.querySelector('#j_page_index_js').getAttribute('data-url'),
                        _css_src = document.querySelector('#j_page_index_css').getAttribute('data-url');
                    var URL_HTTP_TYPE = location.protocol,
                        URL_HOST_NAME = location.hostname;
                    if(/test\.instashop/g.test(URL_HOST_NAME) || /test\./g.test(URL_HOST_NAME)){
                        _js_src =  URL_HTTP_TYPE+'//m-test.instashop.co.id/static' + _js_src;
                        _css_src =  URL_HTTP_TYPE+'//m-test.instashop.co.id/static'+_css_src;
                    }else{
                        _js_src =  URL_HTTP_TYPE+'//m.instashop.co.id/static' + _js_src;
                        _css_src =  URL_HTTP_TYPE+'//m.instashop.co.id/static'+_css_src;
                    }
                    document.querySelector('#j_page_index_css').setAttribute('href',_css_src);
                    var d = document,
                      g = d.createElement('script'),
                      s = d.getElementsByTagName('script')[0];
                    g.type='text/javascript';
                    g.defer=true;
                    g.async=true;
                    g.src=_js_src;
                    s.parentNode.insertBefore(g,s);
                }
                var _cdn = new Image();
                _cdn.src = isTestHost()+'/js/app/cdnload.js';
                _cdn.onerror = function(){
                    console.log('cdn-load-error');
                    resetStaticUrl();
                };
          })();
    </script>
{/literal}
<script>{$BI_SCRIPT}</script>
</body>
</html>
