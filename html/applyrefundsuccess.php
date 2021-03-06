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
    <?=initPhpCss('applyrefundsuccess','default')?>
    <title>Pengajuan Pengembalian Dana</title>
</head>
<body data-spider="0dz7gmbw">
    <nav class="header-nav clearfix" data-spider="header-nav">
        <!--<i class="icon iconfont j_go_back icon-back-font" onclick="history.go(-1);"></i>-->
        Pengajuan Pengembalian Dana
    </nav>
    <section class="content-box" data-spider="content-box">
        <i class="icon iconfont icon-applayrefundsuccess"></i>
        <p>Permintaan pengembalian dana berhasil diajukan, silakan cek Status Pengembalian Dana</p>
        <div class="btn confirm-btn j_refunddetail" spm-auto="查看退款进度" spm-click="">Cek Status Pengembalian Dana</div>
    </section>
    <script>
        document.querySelector('.j_refunddetail').onclick = function(){
            location.href = localStorage.getItem('ApplyRefundDetail');
        };
    </script>
    <script>
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