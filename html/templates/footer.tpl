<script src="{$STATIC_HOST}/js/base/require-zepto.js"></script>
{if $IS_DEBUG}
    <script src="{$STATIC_HOST}/js/base/require-config.js"></script>
    <script src="{$STATIC_HOST}/js/app/{$INDEX_JS_NAME}.js?v=1487333387479"></script>
{else}
    <script src="{$STATIC_HOST}/js/dist/app/{$INDEX_JS_NAME}.js?v=1487333387479"></script>
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
    </script>
{/literal}
<script>{$BI_SCRIPT}</script>
</body>
</html>
