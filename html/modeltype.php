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
    <link href="<?=STATIC_HOST?>/css/dist/app/orderconfirm.css?v=1478407361226" rel="stylesheet"/>
    <title>选择新建模板</title>
    <style>
        button{
           display: block;
           width: 200px;
           height: 40px;
           line-height: 40px;
           background-color: #43CB9C;
           margin-top: 10px;
           color: #fff;
           font-size: 16px;
           border-radius: 2px;
        }
    </style>
</head>
<body>
    <button class="j_model_type" data-type="edit_signage" data-json="{img:[]}">edit_signage</button>
    <button class="j_model_type" data-type="static_banner"  data-json="[{img:'',link_url:''}]">static_banner</button>
    <button class="j_model_type" data-type="rotate_banner"  data-json="[{img:'',link_url:''}]">rotate_banner</button>
    <button class="j_model_type" data-type="two_list_banner"  data-json="[{img:'',link_url:''}]">two_list_banner</button>
    <button class="j_model_type" data-type="img_navigation" data-json="[{img :'',navigation_name:'',link_url:''},] ">img_navigation</button>
    <button class="j_model_type" data-type="text_navigation" data-json="[{navigation_name:'',link_url:''},]">text_navigation</button>
    <button class="j_model_type" data-type="two_li_items" data-json="[]">two_li_items</button>
    <button class="j_model_type" data-type="big_img_item" data-json="[]">big_img_item</button>
    <button class="j_model_type" data-type="list_items" data-json="[]">list_items</button>
    <script src="<?=STATIC_HOST?>/js/base/require-zepto.js"></script>
    <!--<script src="<?=STATIC_HOST?>/js/base/require-config.js"></script>-->
    <script src="<?=STATIC_HOST?>/js/dist/app/modeltype.js?v=1478407361226"></script>
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