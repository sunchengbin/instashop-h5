
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
  <?=STATIC_ICO_CSS?>
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
        text-align:justify;
    }
    h2{
        font-size:16px;
        text-align:justify;
    }
    em{
        font-style:normal;
        text-decoration: underline;
    }
    p strong{
        text-align:justify;
    }
    p,img,h1,h2{
        margin-bottom:20px;
    }
  </style>
  <title>[UNTUK DROPSHIPPER] PANDUAN DROPSHIP</title>
  <body data-spider="s9xynf1c">
  <section>
    <h1>PANDUAN DROPSHIP DARI SISI DROPSHIPPER</h1>
    <h2>STEP 1.  REGISTRASI, UPLOAD PRODUK, ATUR TOKO</h2>
    <p>
        1. Download Instashop
    </p>
    <div class=" clearfix pc-download-app" data-spider="pc端下载app">
    <a target="_blank" spm-auto="android-down" data-spider="dandroid-down" href="https://play.google.com/store/apps/details?id=com.instashop" class="pc-down-android"></a>
    <a target="_blank" spm-auto="ios-down" data-spider="dios-down" href="https://itunes.apple.com/us/app/instashop-buat-webstore-gratis/id1105365362?l=zh&ls=1&mt=8" class="pc-down-ios"></a>
    </div>
    <div class="mobile-download-app clearfix " data-spider="移动端下载app">
    <div class="j_down_url mb-down-load">Download Gratis！</div>
    </div>
    <p>
    2. Klik menu “<strong>Supplierku dan Dropshipperku</strong>”, klik “<strong>Tambah Supplier</strong>”, lalu masukkan nomor ponsel suppliermu. <em>Pastikan suppliermu sudah meregistrasikan tokonya di Instashop juga ya!</em>
    </p>
    <img src="<?=HOST_URL?>/html/instructions/images/11.png" alt="">
    <p>
    3. Kamu akan menerima notifikasi jika pengajuan dropshipmu sudah diterima supplier. Masuk ke menu “<strong>Produk Supplier</strong>”, lalu centang produk yang ingin kamu dropship dan klik tombol “<strong>Atur Harga Jual Massal</strong>”
    </p>
    <img src="<?=HOST_URL?>/html/instructions/images/12.png" alt="">
    <p>
    4. Isi Harga Jual Kembalimu untuk masing-masing produk
    </p>
    <img src="<?=HOST_URL?>/html/instructions/images/13.png" alt="">
    <p>
    5. Jika produk supplier memiliki banyak varian, klik tombol “<strong>Bedakan Harga Per Varian</strong>” untuk mengisi harga masing-masing varian
    </p>
    <img src="<?=HOST_URL?>/html/instructions/images/14.png" alt="">
    <p>
    6. Selesai! Kini produk dari supplier sudah otomatis tampil di menu pengaturan produk dan <strong>halaman web kamu.</strong> Pembelimu bisa langsung berbelanja di halaman webmu.
    </p>
    <img src="<?=HOST_URL?>/html/instructions/images/15.png" alt="">
    <img src="<?=HOST_URL?>/html/instructions/images/16.png" alt="">
    <h2>NOTE:</h2>
    <p>
    1. Customer <strong>TIDAK AKAN</strong> melihat harga modal dan nama toko / web supplier di web kamu. Yang dilihat customer hanya harga jual kamu, <strong>foto & keterangan produk</strong>. Kalau ingin tahu tampilan yang dilihat customer, klik link web kamu yang ada di halaman depan aplikasi ya :)
    </p>
    <p>
    2. Harga modal supplier yang tertera di aplikasi <strong>BELUM TERMASUK</strong> harga ongkos kirim ya. Tapi tidak perlu khawatir, ketika pembeli berbelanja, nanti harga ongkos kirim akan langsung terhitung otomatis sesuai dengan jasa logistik yang didukung oleh supplier.
    </p>
    <p>
    3. Khusus dropshipper, di menu <strong>“Atur Toko” HANYA PERLU</strong> mengisi:
    </p>
    <ul>
        <li>
        Nama Toko
        </li>
        <li>
        Deskripsi Tokonya sendiri
        </li>
        <li>
        Link Toko (supaya link webnya tidak berupa angka)
        </li>
        <li>
        Kontak (untuk menambahkan kontak LINE dan Nomor HP yang muncul di web supaya customer bisa kontak kamu)
        </li>
        <li>
        Admin Lainnya (jika ingin menambahkan admin untuk bantu atur toko)
        </li>
        <li>
        <strong>PENGATURAN LAIN YANG TERKAIT PESANAN</strong> DI MENU ATUR TOKO, seperti Berat Produk Standar, Pengaturan Ongkos Kirim & Batas Waktu Pembayaran <strong>TIDAK PERLU DIISI</strong> karena sudah <strong>OTOMATIS</strong> sesuai dengan settingan dari supplier. <strong>Kecuali</strong> dropshipper juga ingin menjual produknya sendiri (bukan produk dropship), maka pengaturan terkait pesanan di atas juga perlu diisi. Nantinya, pengaturan ini berlaku <strong>HANYA</strong> untuk produk-produk yang kamu upload sendiri (<strong>BUKAN</strong> produk dari supplier yang ada di menu Produk Supplier). Seperti pada umumnya pesanan non dropship, pesanan untuk produkmu sendiri harus kamu kirim dan masukkan nomor resinya untuk mencairkan saldo penghasilan.
        </li>
    </ul>
    <h2>STEP 2.  KELOLA PESANAN</h2>
    <p>1. Jika pembeli berbelanja di webstoremu, kamu akan menerima notifikasi pesanan baru.</p>
    <img src="<?=HOST_URL?>/html/instructions/images/17.png" alt="">
    <p>2. Jika pesanan tersebut sudah dibayar pembeli, pesanan akan berpindah ke menu “<strong>Perlu Dikirim</strong>” di Pengaturan Pesanan</p>
    <img src="<?=HOST_URL?>/html/instructions/images/18.png" alt="">
    <p>3. Jika produk sudah dikirim suppliermu, pesanan tersebut akan otomatis berpindah ke menu “Selesai”</p>
    <img src="<?=HOST_URL?>/html/instructions/images/19.png" alt="">
    <p>4. Kamu dapat menarik saldo bagian keuntunganmu di menu penghasilan. Dana modal dan ongkos kirim akan langsung masuk ke saldo supplier</p>
    <p>NOTE: Proses pencairan saldo membutuhkan pendaftaran rekening bank terlebih dahulu. Silakan daftarkan rekening bank kamu di menu <strong>Penghasilan</strong>. Demi kelancaran proses pencairan saldo, pastikan nomor rekening dan nama pemilik rekening yang diisi PERSIS SAMA  (termasuk tanda titik, tanda koma dan huruf besar) dengan nama di buku tabunganmu.</p>
    <img src="<?=HOST_URL?>/html/instructions/images/20.png" alt="">
  </section>
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
