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
    <title>instashop-im</title>
    <link href="<?=STATIC_HOST?>/css/dist/app/im_index.css?v=1" rel="stylesheet">
</head>
<body>
    <nav class="header ks-clear">
        <p class="shop-name j_shop_name"></p>
        <a href="javascript:history.back();" class="">Toko</a>
    </nav>
    <section class="message-wraper j_message_box">
        <ul class="message-ul j_message_wraper">
        </ul>
    </section>
    <footer class="chat-wraper">
        <div class="send-txt-box">
            <div class="msg-count-box"></div>
            <textarea class="send-txt j_message_txt"></textarea>
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
    <script src="<?=STATIC_HOST?>/js/base/require-zepto.js"></script>
    <!--<script src="<?=STATIC_HOST?>/js/base/require-config.js"></script>-->
    <script src="<?=STATIC_HOST?>/js/dist/app/im.js?v=1468203501682"></script>
</body>
</html>