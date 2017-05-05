<!DOCTYPE html>
<?php
include_once( dirname(__FILE__).'/../html/router/common.php');
?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1, minimum-scale=1.0, maximum-scale=1.0,user-scalable=no">
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expect" content="0">
    <?=STATIC_DNS?>
    <?=STATIC_ICO_CSS?>
    <?=STATIC_FONT_CSS?>
    <title></title>
    <link href="<?=STATIC_HOST?>/css/dist/app/im_index.css?v=1493978631150" rel="stylesheet">
</head>
<body>
    <nav class="header ks-clear">
        <p class="shop-name j_shop_name"></p>
        <a href="javascript:;" class="j_go_shop">Toko</a>
    </nav>
    <section class="message-wraper j_message_box">
        <ul class="message-ul j_message_wraper">
        </ul>
    </section>
    <footer class="chat-wraper j_footer">
        <div class="send-txt-box">
            <div class="msg-count-box" contenteditable="true"></div>
            <textarea class="send-txt j_message_txt" contenteditable="true"></textarea>
        </div>
        <div class="btn-box">
            <div class="up-img">
                <form id="up-img" action="" enctype="multipart/form-data" method="post" target="resultHandlerIframe">
                    <a class="icon-picture iconfont icon-upimg-font" href="javascript:;">
                        <input type="file" accept="image/*" name="img">
                    </a>
                </form>
                <iframe id="iframeid" src="" name="resultHandlerIframe" class="iframe"></iframe>
            </div>
            <div class="btn j_send_btn">send</div>
        </div>
    </footer>
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-78448705-7', 'auto');
      ga('send', 'pageview');

    </script>
</body>
</html>