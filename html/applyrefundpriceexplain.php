<!DOCTYPE html>
<!--担保交易价格详情-->
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
    <title>Syarat Pengajuan Pengembalian Dana</title>
    <?=STATIC_FONT_CSS?>
    <style>
        *{
            margin: 0;
            padding: 0;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            -webkit-touch-callout: none;
            background: transparent;
            outline: none;
        }
        html {
          font-size: 62.5%;
        }

        @media only screen and (min-width: 374px) {
          html {
            font-size: 72%!important
          }
        }

        @media only screen and (min-width: 413px) {
          html {
            font-size: 80%!important
          }
        }

        @media only screen and (min-width: 481px) {
          html {
            font-size: 94%!important
          }
        }

        @media only screen and (min-width: 561px) {
          html {
            font-size: 109%!important
          }
        }

        @media only screen and (min-width: 641px) {
          html {
            font-size: 125%!important
          }
        }

        @media(orientation: landscape) and (min-width: 481px) {
          html {
            font-size: 62.5% !important;
          }
        }
        h1, h2, h3, h4, h5, h6 {
            font-size: 100%;
        }
        a {
            text-decoration: none;
        }
        a:hover {
            text-decoration: none;
        }
        img{
            width: 100%;
            vertical-align: middle;
            border:0;
        }
        body, button, input, select,option,td, textarea{
            font: 12px/1.5 'Myriad Set Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color:#777;
        }
        h1{
            font-size:16px;
            color: #333;
            margin:20px 0;
        }
        a{
            color: #3572b0;
        }
        li{
            list-style-position: inside;
        }
        p{
            margin-bottom: 10px;
        }
        strong{
            color: #444;
        }
        img{
            background-color:#f5f5f5;
        }
        .content{
            font-size:14px;
            padding:0 15px 15px;
        }
        .iconfont {
            font-family:"iconfont" !important;
            font-size:14px;
            font-style:normal;
            -webkit-font-smoothing: antialiased;
            -webkit-text-stroke-width: 0.2px;
            -moz-osx-font-smoothing: grayscale;
        }
        .icon-back-font:before { content: "\e608"; }
        .header-nav{
            /*padding: 0 1rem;*/
            /*height: 4rem;*/
            /*line-height: 4rem;*/
            /*background-color: #43CB9C;*/
            /*font-size: 1.6rem;*/
            /*color: #fff;*/
            position:relative;
            padding: 0 1rem;
            height: 4rem;
            line-height: 4rem;
            background-color: #F5f5f5;
            font-size: 16px;
            color: #666;
        }
        /*风格统一需求*/
        .header-nav:after {
            position: absolute;
            left: -50%;
            right: -50%;
            bottom: -1px;
            height: 1px;
            content: '';
            -webkit-transform: scale(0.5);
            transform: scale(0.5);
            border-bottom: 1px solid #d8d8d8;
            z-index: 1;
        }

        .header-nav .iconfont{
            font-size: 16px;
            display: inline-block;
            height: 4rem;
            line-height: 4rem;
        }
        .cart-num{
            position: absolute;
            display: inline-block;
            width: 1.6rem;
            height: 1.6rem;
            border-radius: 50%;
            text-align: center;
            line-height: 1.6rem;
            background-color: #F58823;
            color: #fff;
            right: 0;
            top: 0;
            font-size: 12px;
        }
        .header-nav button{
            float: right;
            height: 4rem;
            line-height: 4rem;
            font-size: 16px;
            padding-left: 2rem;
            color: #666;
        }

    </style>
</head>
<body>
    <?php
        if($_REQUEST['from']){
            echo '<nav class="header-nav clearfix" data-spider="header-nav"><i class="icon iconfont j_go_back icon-back-font"></i>Syarat Pengajuan Pengembalian Dana</nav>';
        }
    ?>
    <section class="content">

        <h1 id="first-type">Syarat Pengajuan Pengembalian Dana</h1>
        <ul>
            <li>
               Melampirkan bukti d alasan kuat atas permintaan pengembalian dana tersebut. Isi deskripsi selengkap mungkin dan lampirkan gambar / foto jelas dari produk untuk dijadikan bahan pertimbangan penjual dan tim CS Instashop .
            </li>
            <li><strong>Jika produk belum dikirim oleh penjual (status: Menunggu Pengiriman)</strong>, maka jumlah maksimal dana yang dapat dikembalikan adalah senilai <strong>total harga pesanan (harga produk + ongkos kirim)</strong>.</li>
            <li><strong>Jika produk sudah dikirim oleh penjual (status: Sudah Dikirim)</strong>, maka jumlah maksimal dana yang dapat dikembalikan hanya <strong>senilai harga produk</strong>, tidak termasuk ongkos kirim.</li>
            <li>Status Pengembalian Dana akan diperbaharui di halaman web ini.</li>
            <li>Penjual dapat menentukan untuk menerima atau menolak pengembalian dana. Jika pengembalian dana ditolak oleh penjual, tim CS Instashop akan membantu proses mediasi antara kamu dan penjual.</li>
        </ul>
        <h1 id="second-type">Bagaimana Alur Pengembalian Dana?</h1>
        <div>
            <img src="<?=STATIC_HOST?>/images/refundexplain/refund_process_all.png">
            <p>1. Pembeli dapat mengajukan pengembalian dana setelah pembayaran terkonfirmasi.</p>
            <img src="<?=STATIC_HOST?>/images/refundexplain/refund_process_one.jpeg">
            <p>2. Penjual dapat memilih untuk menerima atau menolak pengajuan pengembalian dana.</p>
            <img src="<?=STATIC_HOST?>/images/refundexplain/refund_process_two.jpeg">
            <p>3. Jika pengajuan pengembalian dana ditolak, maka tim CS Instashop akan menghubungi pembeli dan penjual untuk melakukan mediasi. </p>
            <p>Setelah mediasi mencapai kesepakatan, maka tim CS kami akan memproses pengembalian dana / pencairan dana sesuai hasil mediasi.</p>
            <img src="<?=STATIC_HOST?>/images/refundexplain/refund_process_three.jpeg">
            <p>4. Pencairan dana diajukan ke bank. Dana akan sampai ke rekening dalam 2 (dua) hari kerja.</p>
            <img src="<?=STATIC_HOST?>/images/refundexplain/refund_process_four.jpeg">
            <p>5. Transaksi Selesai.</p>
            <img src="<?=STATIC_HOST?>/images/refundexplain/refund_process_five.jpeg">
        </div>
    </section>
    <script>
       document.querySelector('.j_go_back') && document.querySelector('.j_go_back').addEventListener('click',function(){
            history.go(-1);
        });
    </script>
</body>
</html>