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
    <link href="<?=STATIC_HOST?>/css/dist/app/address.css?v=1481019583072" rel="stylesheet"/>
    <title>Tambah Produk dari Instagram</title>
    <style>
    .ins-wraper {
        display:none;
    }
    /**
 * Created by sunchengbin on 15/6/29.
 */
.dialog-wraper{
    position:absolute;
    background-color : #fff;
    border-radius: 5px;
    font-size: 14px;
    color:#666;
}
.dialog-body,.dialog-top,.dialog-footer{
    padding:10px;
}
.dialog-top a{
    color: #666;
}
.dialog-body{
    overflow:auto;
}
.dialog-footer{
    text-align: right;
    padding-top:0;
    padding-bottom: 8px;
}
.dialog-footer a{
    display: inline-block;
    padding: 2px 5px;
    border-radius: 3px;
    color: #43CB9C;
}
.ca-btn{
    margin-right:30px;
}
.cf-btn{

}
.dialog-cover{
    position: fixed;
    left:0;
    top:0;
    bottom:0;
    right:0;
    background-color: rgba(0,0,0,.4);
}
.spinner {
    margin: 0 auto;
    width: 40px;
    height: 40px;
    position: relative;
}

.container1 > div, .container2 > div, .container3 > div {
    width: 10px;
    height: 10px;
    background-color: #fff;
    border-radius: 100%;
    position: absolute;
    -webkit-animation: bouncedelay 1.2s infinite ease-in-out;
    animation: bouncedelay 1.2s infinite ease-in-out;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
}

.spinner .spinner-container {
    position: absolute;
    width: 100%;
    height: 100%;
}

.container2 {
    -webkit-transform: rotateZ(45deg);
    transform: rotateZ(45deg);
}

.container3 {
    -webkit-transform: rotateZ(90deg);
    transform: rotateZ(90deg);
}

.circle1 { top: 0; left: 0; }
.circle2 { top: 0; right: 0; }
.circle3 { right: 0; bottom: 0; }
.circle4 { left: 0; bottom: 0; }

.container2 .circle1 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
}

.container3 .circle1 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
}

.container1 .circle2 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
}

.container2 .circle2 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
}

.container3 .circle2 {
    -webkit-animation-delay: -0.7s;
    animation-delay: -0.7s;
}

.container1 .circle3 {
    -webkit-animation-delay: -0.6s;
    animation-delay: -0.6s;
}

.container2 .circle3 {
    -webkit-animation-delay: -0.5s;
    animation-delay: -0.5s;
}

.container3 .circle3 {
    -webkit-animation-delay: -0.4s;
    animation-delay: -0.4s;
}

.container1 .circle4 {
    -webkit-animation-delay: -0.3s;
    animation-delay: -0.3s;
}

.container2 .circle4 {
    -webkit-animation-delay: -0.2s;
    animation-delay: -0.2s;
}

.container3 .circle4 {
    -webkit-animation-delay: -0.1s;
    animation-delay: -0.1s;
}

@-webkit-keyframes bouncedelay {
    0%, 80%, 100% { -webkit-transform: scale(0.0) }
    40% { -webkit-transform: scale(1.0) }
}

@keyframes bouncedelay {
    0%, 80%, 100% {
        transform: scale(0.0);
        -webkit-transform: scale(0.0);
    } 40% {
          transform: scale(1.0);
          -webkit-transform: scale(1.0);
      }
}



    </style>
</head>
<body>
<div class="address-wraper ins-wraper">
    <section class="address-form-box">
        <div class="index-btn-box" style="padding:0 2rem">
            <div class="btn j_submit_btn confirm-btn j_submit_check" style="margin-top:5rem">
                <a style="color:#ffffff" href="javascript:void(0)">Login ke Instagram</a>
            </div>
        </div>
    </section>
</div>
    <script src="<?=STATIC_HOST?>/js/base/require-zepto.js"></script>
    <script src="<?=STATIC_HOST?>/js/base/require-config.js"></script>
    <script src="<?=STATIC_HOST?>/js/app/instagramcheck.js?v=1481019583072"></script>
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