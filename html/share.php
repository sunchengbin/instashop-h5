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
    <meta name="format-detection" content="telephone=no" />
    <?=STATIC_DNS?>
    <?=STATIC_ICO_CSS?>
    <?=STATIC_FONT_CSS?>
    <link href="<?=STATIC_HOST?>/css/dist/app/editmodel.css?v=1500622418379" rel="stylesheet"/>
    <title>分享页面测试</title>
    <style>
        button{
        display:block;
            padding:10px 10px;
            background:#43CB9C;
            color:#fff;
            font-size:;
            margin-top:10px;
        }
    </style>
</head>
<body>
    <button class="j_share_btn" data-type="share_to_instagram">share_to_instagram</button>
    <button class="j_share_btn" data-type="share_to_line">share_to_line</button>
    <button class="j_share_btn" data-type="share_to_whatsapp">share_to_whatsapp</button>
    <button class="j_share_btn" data-type="share_to_bbm">share_to_bbm</button>
    <button class="j_share_btn" data-type="share_to_copy">share_to_copy</button>
    <button class="j_share_btn" data-type="share_to_more">share_to_more</button>
    <button class="j_share_btn" data-type="share_to_facebook">share_to_facebook</button>
    <button class="j_share_btn" data-type="share_to_twitter">share_to_twitter</button>
    <button class="j_share_btn" data-type="share_to_sms">share_to_sms</button>
    <button class="j_share_btn" data-type="share_to_preview">share_to_preview</button>
    <button class="j_share_btn" data-type="share_to_copy_link">share_to_copy_link</button>
    <button class="j_share_btn" data-type="share_to_copy_detail">share_to_copy_detail</button>
    <button class="j_share_btn" data-type="share_to_save">share_to_save</button>




    <p>no-img</p>
    <button class="j_no_img" data-type="share_to_instagram">share_to_instagram</button>
    <button class="j_no_img" data-type="share_to_line">share_to_line</button>
    <button class="j_no_img" data-type="share_to_whatsapp">share_to_whatsapp</button>
    <button class="j_no_img" data-type="share_to_bbm">share_to_bbm</button>
    <button class="j_no_img" data-type="share_to_copy">share_to_copy</button>
    <button class="j_no_img" data-type="share_to_more">share_to_more</button>
    <button class="j_no_img" data-type="share_to_facebook">share_to_facebook</button>
    <button class="j_no_img" data-type="share_to_twitter">share_to_twitter</button>
    <button class="j_no_img" data-type="share_to_sms">share_to_sms</button>
    <button class="j_no_img" data-type="share_to_preview">share_to_preview</button>
    <button class="j_no_img" data-type="share_to_copy_link">share_to_copy_link</button>
    <button class="j_no_img" data-type="share_to_copy_detail">share_to_copy_detail</button>
    <button class="j_no_img" data-type="share_to_save">share_to_save</button>

    <button class="j_share_to_bbm" data-type="share_to_save">h5_share_to_save</button>

    <script src="<?=STATIC_HOST?>/js/base/require-zepto.js"></script>
    <script src="<?=STATIC_HOST?>/js/dist/app/share.js?v=1500622418379"></script>
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