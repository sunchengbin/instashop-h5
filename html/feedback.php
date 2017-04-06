<!DOCTYPE html>
<?php
include_once( dirname(__FILE__).'/../html/router/common.php');
?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no"/>
    <meta content="telephone=no" name="format-detection"/>
    <meta name="apple-touch-fullscreen" content="yes"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
    <?=STATIC_DNS?>
    <?=STATIC_ICO_CSS?>
    <?=STATIC_FONT_CSS?>
    <title>Respon dan Bantuan</title>
    <style>
        html {
            font-size: 62.5%;
        }

        @media only screen and (min-width: 374px) {
            html {
                font-size: 72% !important
            }
        }

        @media only screen and (min-width: 413px) {
            html {
                font-size: 80% !important
            }
        }

        @media only screen and (min-width: 481px) {
            html {
                font-size: 94% !important
            }
        }

        @media only screen and (min-width: 561px) {
            html {
                font-size: 109% !important
            }
        }

        @media only screen and (min-width: 641px) {
            html {
                font-size: 125% !important
            }
        }

        @media (orientation: landscape) and (min-width: 481px) {
            html {
                font-size: 62.5% !important;
            }
        }

        body, button, input, select, option, td, textarea /* for ie */
        {
            font: 1.2rem/1.5 'Myriad Set Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        }

        .fl {
            float: left;
        }

        .fr {
            float: right;
        }

        img {
            width: 100%;
            vertical-align: middle;
        }

        .block {
            display: block;
        }

        .clearfix:after {
            content: '\20';
            display: block;
            height: 0;
            clear: both;
        }

        .clearfix {
            *zoom: 1;
        }

        @media only screen and (min-width: 641px) {
            body {
                max-width: 640px;
                margin: 0 auto;
                background-color: #F5F5F5;
            }

            body .buy-box, body .logistics-plug, body .buy-plug, body .shop-header-nav, body footer, body .prove-btn, body .index-footer {
                max-width: 640px;
                left: 50%;
                margin-left: -320px;
            }

            body .address-list {
                max-width: 640px;
            }
        }

        .iconfont {
            font-family: "iconfont" !important;
            font-size: 2.1rem;
            font-style: normal;
            -webkit-font-smoothing: antialiased;
            -webkit-text-stroke-width: 0.2px;
            -moz-osx-font-smoothing: grayscale;
        }

        .icon-phone-font:before {
            content: "\e605";
        }

        .icon-shop-font:before {
            content: "\e607";
        }

        .icon-line:before {
            content: "\e61e";
        }
        body {
            margin: 0;
            padding: 0;
            background: #f5f5f5;
            font-family: 'Roboto-Regular', 'Helvetica Neue', Helvetica, Arial, sans-serif;
            -webkit-transform: translateZ(0);
            color: #999;
        }

        a, button, input {
            -webkit-touch-callout: none;
            outline: none;
            border: 0;
            -webkit-appearance: none;
        }

        a, a:visited {
            text-decoration: none;
            -webkit-touch-callout: none;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }

        * {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
        }

        * {
            -webkit-tap-highlight-color: transparent;
        }

        ul, h3 {
            margin: 0;
            padding: 0;
            font-weight: normal;
        }

        /*body, button,a, p,input, select,option,td, textarea !* for ie *! {*/
        /*font: 12px/1.5 'Roboto-Regular', 'Helvetica Neue', Helvetica, Arial, sans-serif;*/
        /*}*/

        .f-input-box label {
            font-size: 14px;
        }

        .f-input-box input, .add-texrea textarea {
            display: block;
            width: 100%;
            background: #ffffff;
            border: 0;
            padding: 1.5rem;
            outline: none;
            color: #999999;
            font-size:14px;

        }

        .f-input-box input {
            height: 4.5rem;
        }

        .add-texrea {
            margin-top: 2rem;
            border-bottom: none;
        }

        .add-texrea textarea {
            resize: none;
            min-height: 130px;
            padding-top: 10px;
            height: 13.5rem;
        }

        .f-submit-box {
            text-align: center;
            margin-top:2rem;
        }

        .f-submit-box input {
            width: 88%;
            font-size: 14px;
            background-color: #43CB9C;
            color: #fff;
            border-radius: 2px;
        }

        .f-contact {
            padding: 20px 0 0 20px;
            line-height: 20px;
            font-size: 16px;
        }

        .hh {
            display: none;
        }

        .error {
            color: #F5A623;
            font-size: 14px;
            padding-top: 2rem;
            text-align: center;
        }

        .insta-btn {
            height:3rem;
            line-height:3rem;
            padding:0;
        }

        .contact-us {
            font-size: 1.6rem!important;
            color: #666666;
            padding: 1.2rem 1.5rem 0;
            line-height: 1.5;
            font-weight: normal;
        }

        .contact-us i {
            color: #999999;
        }

        .contact-us h3 {
            font-size: 24px;
        }

        .contact-us ul {
            padding: 0;
            margin: 0;
        }

        .contact-us ul > li {
            list-style: none;
            font-size:14px;
        }

        .dialog-wraper {
            position: absolute;
            background-color: #fff;
            border-radius: 5px;
            font-size: 1.4rem;
            color: #666;
        }

        .dialog-body, .dialog-top, .dialog-footer {
            padding: 10px;
        }

        .dialog-body {
            overflow: auto;
        }

        .dialog-footer {
            text-align: right;
            padding-top: 0;
            padding-bottom: 8px;
        }

        .dialog-footer a {
            display: inline-block;
            padding: 2px 5px;
            border-radius: 3px;
            color: #43CB9C;
            font-size: 12px;
        }

        .ca-btn {
            margin-right: 30px;
        }

        .cf-btn {

        }

        .dialog-cover {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            right: 0;
            background-color: black;
            opacity: 0.4;
            filter: Opacity(40);
        }

        .dialog-body-p {
            font-size: 12px;
        }

        /*特殊处理line-font尺寸问题 @lanchenghao*/
        .icon-line {
            font-size: 2.6rem;
            margin-left: -4px;
        }

        .icon-line:before {
            position: absolute;
            line-height: 2;
        }

        .contact-us span {
            width: 2.5rem;
            text-align: left;
            display: inline-block;
        }

        .contact-us span:first-child {
            position: relative;
        }
    </style>
</head>

<body id="container" data-spider="8divulwy">
<div id="feedbackbox" class="f-pad">
    <div class="f-input-box">
        <!--<label for="contact">Nomor telpon atau Email</label>-->
        <input id="contact" name="contact" type="text" placeholder="Nomor telpon atau Email" value="">
    </div>
    <div class="f-input-box add-texrea">
        <!--<label for="content">Masalah atau Komentar Anda</label>-->
        <textarea name="content" value="" id="content" placeholder="Masalah atau Komentar Anda"></textarea>
        <div id="error" class="error hh">Silakan masukkan kritik dan saran kamu</div>
    </div>
</div>
<div class="f-submit-box">
    <input type="submit" value="Submit" id="f-submit" class="insta-btn">
</div>
<div class="contact-us">
    <ul>
        <li>Contact us:</li>
        <li>
            <span><i class="iconfont icon-line"></i></span>
            LINE: @instashop
        </li>
        <li>
            <span><i class="iconfont icon-phone-font"></i></span>
            PH/WA: 0812 8491 8486
        </li>
        <li><span><i class="iconfont icon-shop-font"></i></span>
            Instashop Versi Desktop : <br>'http://dashboard.instashop.co.id'
        </li>
    </ul>
</div>
<div class="f-contact">
</div>
<script src="<?=STATIC_HOST?>/js/base/require-zepto.js"></script>
<!--<script src="<?=STATIC_HOST?>/js/base/require-config.js"></script>-->
<script src="<?=STATIC_HOST?>/js/dist/app/feedback.js?v=1491447029358"></script>
<script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
      function goUrlStatistics(type) {
      console.log(type)
        ga('send', 'event', type, 'click');
      }
      ga('create', 'UA-78448705-7', 'auto');
      ga('send', 'pageview');
        <?=BI_SCRIPT?>
</script>
</body>
</html>
