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
    <link href="<?=STATIC_HOST?>/css/dist/app/ordersuccess.css?v=1466411659457" rel="stylesheet"/>
    <title>订单成功</title>
</head>
<body>
    <nav class="header-nav clearfix j_go_back">
        <i class="icon iconfont fr">&#xe601;</i>
        Informasi Pembayaran
    </nav>
    <section class="order-box">
        <p class="order-info clearfix">
            <span class="fr j_total"></span>
            Jumlah Total
        </p>
        <p class="order-content">
            Mohon transfer sesuai jumlah yang tertera (termasuk 3 digit terakhir)
        </p>
    </section>
    <section class="pay-info">
        <p class="bank-info">
            <img src="<?=STATIC_HOST?>/images/app/mandiri.png"/>
            Bank Mandiri
        </p>
        <p class="pay-content">
            Nama Penerima  : PT Insta Shop Indonesia<br>
            Kantor Cabang  : Thamrin Nine<br>
            Nomor Rekening : 122-00-0737567-1<br>
            Kode Bank      : 008<br>
        </p>
        <p class="pay-content-explain">
            *Kode bank diperlukan ketika kamu melakukan transfer dari ATM selain Bank Mandiri.
        </p>
        <div class="last-explain">
            <p>Catatan:</p>
            <p>    Silakan screenshot atau salin informasi ini untuk kemudahan pembayaran.</p>
            <p>    Informasi pembayaran ini juga akan kami kirimkan melalui SMS ke ponsel kamu.</p>
            <p>    Jika pembayaranmu sudah berhasil, kami akan mengirimkan SMS notifikasi ke ponsel kamu.</p>
        </div>
    </section>
    <script>
        var price = localStorage.getItem('OrderTotal'),
            data = JSON.parse(localStorage.getItem('ShopData')),
            totalPrice = priceFormat(price);
        document.querySelector('.j_total').innerHTML = 'Rp '+totalPrice;
        document.querySelector('.j_go_back').addEventListener('click',function(){
            location.href = '/s/'+data.ShopInfo.id;
        });
        function priceFormat( price ) {
            // e.g. 100.00 => 100
            // e.g 1000.00 => 1.000
            // 去掉 "." 后面的所有数字，然后每隔 3 个数加一个点
            var price, result = [];
            price = '' + price;
            price = price.split( '.' )[ 0 ];
            price = price.split( '' ).reverse();
            for( var num = 0;num < price.length;num++) {
                if( num && ( num % 3 === 0 ) ) {
                    result.push( '.' )
                }
                result.push( price[num] )
            }
            result = result.reverse().join( '' );
            return result;
        }
    </script>
</body>
</html>