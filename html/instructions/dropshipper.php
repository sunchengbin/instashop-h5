
<?php
include_once( dirname(__FILE__).'/../../html/router/common.php');
?>
<!DOCTYPE html>
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
  <style>
  *{
      padding:0;
      margin:0;
      word-break: break-word;
    }
    html { font-size: 62.5%; }
    @media only screen and (min-width: 374px) {
        html { font-size: 72%!important }
    }
    @media only screen and (min-width: 413px) {
        html { font-size: 80%!important }
    }
    @media only screen and (min-width: 481px) {
        html { font-size: 94%!important }
    }
    @media only screen and (min-width: 561px) {
        html { font-size: 109%!important }
    }
    @media only screen and (min-width: 641px) {
        html { font-size: 125%!important }
    }
    @media(orientation: landscape) and (min-width: 481px) {
        html { font-size: 62.5% !important; }
    }
    body {
        font: 12px/1.5 'Myriad Set Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        color:#666;
        max-width:640px;
        margin:0 auto;
    }
    section{
      font-size:16px;
      color:#666;
      padding: 1rem 2rem;
    }
    .header-nav{
        text-align:center;
        padding: 0 1rem;
        height: 4.6rem;
        line-height: 4.6rem;
        background-color: #43CB9C;
        font-size: 1.6rem;
        color: #fff;
    }
    img{
      width:100%;
    }
    .pc-download-app{
        display:none;
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
    @media only screen and (min-width: 1200px) {
        .pc-download-app{
          display:block;
        }
        .mobile-download-app{
          display:none;
        }
    }
    .pc-down-android, .pc-down-ios {
        display: inline-block;
        width: 200px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        background-color: #F8E71C;
        color: #43CB9C;
        font-size: 20px;
        float: left;
        margin-bottom: 20px;
    }
    .pc-down-android{
          background: url(<?=HOST_URL?>/html/instructions/images/gp.png) no-repeat;
          background-size: contain;
              margin-left: 100px;
    }
    .pc-down-ios{
        background: url(<?=HOST_URL?>/html/instructions/images/as.png) no-repeat;
        background-size: contain;
    }
    .clearfix:after {
        content: '\20';
        display: block;
        height: 0;
        clear: both;
    }
    .mobile-download-app{
    text-align:center;
    }
    .mb-down-load {
        display: inline-block;
        color: #fff;
        font-size: 16px;
        width: 230px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: #F5A623;
        border-radius: 4px;
        margin: 0 auto 20px;
        font-weight: bold;
    }
    h1{
        font-size:18px;
    }
    h2{
        font-size:16px;
    }
    em{
        font-style:normal;
        text-decoration: underline;
    }
    p strong{

    }
    p,img,h1,h2,ul{
        margin-bottom:20px;
    }
    .icon-line {
        font-size: 2.6rem;
        margin-left: -4px;
    }
    ul{
        list-style:none;
    }
    .icon-line:before {
        position: absolute;
        line-height: 2;
    }
    .contact-us{
        padding:1rem 2rem;
    }
    .contact-us span {
        width: 2.5rem;
        text-align: left;
        display: inline-block;
    }
    .contact-us i{
        color:#999;
    }
    .contact-us span:first-child {
        position: relative;
    }
    .contact-title{
        font-size:18px;
    }
  </style>
  <title>[UNTUK DROPSHIPPER] PANDUAN DROPSHIP</title>
  <body data-spider="s9xynf1c">
  <section>
    <h1>PANDUAN DROPSHIP DARI SISI DROPSHIPPER</h1>
    <h1>CARA REGISTRASI JADI DROPSHIPPERnya SUPPLIER INSTASHOP</h1>
    <h2>STEP 1:</h2>
    <p>
        1. Download Instashop
    </p>
    <div class=" clearfix pc-download-app" data-spider="pc-download-box">
    <a target="_blank" spm-auto="android-down" data-spider="dandroid-down" href="https://play.google.com/store/apps/details?id=com.instashop" class="pc-down-android"></a>
    <a target="_blank" spm-auto="ios-down" data-spider="dios-down" href="https://itunes.apple.com/us/app/instashop-buat-webstore-gratis/id1105365362?l=zh&ls=1&mt=8" class="pc-down-ios"></a>
    </div>
    <div class="mobile-download-app clearfix " data-spider="mobile-download-box">
    <div class="j_down_url mb-down-load">Download Gratis！</div>
    </div>
    <h2>STEP 2:</h2>
    <p>
     Klik menu “<strong>Supplierku dan Dropshipperku</strong>”, klik “<strong>Tambah Supplier</strong>”, lalu masukkan nomor ponsel suppliermu. <em>Pastikan suppliermu sudah meregistrasikan tokonya di Instashop juga ya!</em>
    </p>
    <img src="<?=HOST_URL?>/html/instructions/images/11.png" alt="">
    <h2>STEP 3 :</h2>
    <p>
    Tinggal menunggu supplier kamu untuk menyetujui kamu untuk men-dropship produk dia. Setelah itu menuju ke <strong>"Produk Supplier"</strong> untuk men-dropship atau me-resell produk supplier.
    </p>
    <img src="<?=HOST_URL?>/html/instructions/images/22.png" alt="">
  </section>
  <div class="contact-us">
      <ul>
          <li class="contact-title">Contact us:</li>
          <li>
              <span><i class="iconfont icon-line"></i></span>
              LINE: @instashop
          </li>
          <li>
              <span><i class="iconfont icon-phone-font"></i></span>
              PH/WA: 0812 8491 8486
          </li>
      </ul>
  </div>
  <script>
        function bowser(){
          var u = navigator.userAgent;
          return {//移动终端浏览器版本信息
              trident: u.indexOf('Trident') > -1, //IE内核
              presto: u.indexOf('Presto') > -1, //opera内核
              webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
              gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
              mobile: !!u.match(/AppleWebKit.*Mobile/i) || !!u.match(/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/), //是否为移动终端
              ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
              android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
              iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
              iPad: u.indexOf('iPad') > -1, //是否iPad
              webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
          };
      }
      var _down_dom = document.querySelectorAll('.j_down_url'),
          _bower = bowser(),
          _url = _bower.android?'https://play.google.com/store/apps/details?id=com.instashop':'https://itunes.apple.com/us/app/instashop-buat-webstore-gratis/id1105365362?l=zh&ls=1&mt=8';
      for(var i = 0 ;i < _down_dom.length;i++){
          _down_dom[i].addEventListener('click',function(){
              if(_bower.android){
                  _paq.push(['trackEvent','mobile-android-down','click','mobile-android-down']);
              }else{
                  _paq.push(['trackEvent','mobile-ios-down','click','mobile-ios-down']);
              }
              setTimeout(function(){
                  location.href = _url;
              },100);

          });
      }
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-78448705-7', 'auto');
      ga('send', 'pageview');
    <?=BI_SCRIPT?>
  </script>
</body>
</html>
