<!DOCTYPE html>
<?php
include_once( dirname(__FILE__).'/../html/router/common.php');
?>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no"/>
  <meta content="telephone=no" name="format-detection"/>
  <meta name="apple-touch-fullscreen" content="yes"/>
  <meta name="apple-mobile-web-app-capable" content="yes"/>
  <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
  <title>Payment status</title>
    <?=STATIC_DNS?>
    <?=STATIC_ICO_CSS?>
  <!-- 页头 -->
  <script id="tpl-header" type="text/html">
    <div class="prev"></div>
    <div class="title"><%= Lang.H5_ATM_TRANSFER_GUID %></div>
  </script>
</head>


<body id="container">

  <div id="header">
      <!-- tpl-header -->
  </div>

  <div class="insta-section">
		<div class="insta-list">
      <div class="insta-list-item">
				<div class="insta-list-item-content no-arrow">
          <h3>Cek keterangan pembayaran sekali lagi:</h3>
          <div>Masukkan PIN</div>
          <div>Pilih “TRANSAKSI LAINNYA”</div>
          <div>Pilih “TRANSFER”</div>
          <div>Pilih “KE REK BANK LAIN”</div>
          <div>Masukkan Kode Bank Permata (013) kemudian tekan“Benar”</div>
          <div>Musukkan Jumlah pembayaransesuai dengan yang ditagihkan(Jumlah yang ditransfer harus sama persis tidak boleh lebih dan kurang).
            <br>Jumlah nominal yang tidak sesuai dengan tagihan akan menyebabkan transaksi gagal.</div>
          <div>Masukkan Nomor Rekening tujuan dengan menggunakan Nomor Kode Pembayaran.
            <br>Contoh:89650111111111111
            <br>lalu tekan“Benar”
          </div>
          <div>Muncul Layar Konfirmasi Transfer yang berisi nomor rekening tujuan Bank Permata dan Nama beserta jumlah yang dibayar,jika sudah benar,Tekan “Benar”</div>
          <div>Selesai.</div>
				</div>
			</div>

    </div>
	</div>

  <div class="insta-section">
		<div class="insta-list">
      <div class="insta-list-item">
				<div class="insta-list-item-content no-arrow">
          <h3>Note:</h3>
          <div>Pembayaran hanya bisa dilakukan di ATM atau Internet Banking yang terhubung ke jaringan ATM Bersama, Prima atau ALTO.</div>
          <div>Pelanggan dapat melakukan transfer melalui ATM ke bank-bank yang telahdi tentukan dengan batas maksimal waktu transfer 3 jam.</div>
          <div>Daftar Bank untuk Pembayaran Melalui ATM: BCA, MANDIRI, BNI, BII, BRI, DANAMON, PERMATA, MEDA, BUKOPIN, CIMB Niaga, PANIN, dan lain lain.</div>
				</div>
			</div>

    </div>
	</div>
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
