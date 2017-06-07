<!DOCTYPE html>
<!--担保交易说明详情-->
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
    <title>APA ITU REKENING BERSAMA</title>
    <style>
        *{
            margin: 0;
            padding: 0;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            -webkit-touch-callout: none;
            background: transparent;
            outline: none;
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
            margin-bottom:20px;
            min-height:200px;
            background-color:#f5f5f5;
        }
        body, button, input, select,option,td, textarea{
            font: 14px/1.5 'Myriad Set Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color:#777;
        }
        h1{
            font-size:16px;
            color: #333;
            margin:20px 0;
        }
        body{
            padding:0 15px 15px;
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
        p.top-explain{
            margin-top:10px;
        }
        img{
            background-color:#f5f5f5;
        }
        .mb20{
            margin-bottom: 40px;
        }
        .mt20{
            margin-top: 40px;
        }
        .content-ul li{
            list-style-position:outside;
            margin-left:15px;
        }
    </style>
</head>
<body>
    <p class="top-explain">
        Saat ini, sistem pembayaran Instashop sudah dikembangkan menjadi dua metode:
        <strong>REKENING BERSAMA</strong> dan <strong>TRANSFER LANGSUNG</strong>. Bingung?
    </p>
    <h1>Yuk simak penjelasan tentang kedua metode ini!</h1>
    <ul>
        <li>
            <a href="#first-type" class="">Apa itu Rekening Bersama?</a>
        </li>
        <li>
            <a href="#second-type" class="">Apa itu Transfer Langsung?</a>
        </li>
        <li>
            <a href="#third-type" class="">Apa perbedaan di antara kedua metode ini?</a>
        </li>
    </ul>
    <section class="content">
        <h1 id="first-type">1.APA ITU REKENING BERSAMA?</h1>
        <div>
            <p>Rekening Bersama adalah rekening penampung dana atas nama PT Insta Shop Indonesia yang menjamin keamanan dana hingga transaksi selesai.</p>
            <p>Dengan menggunakan fitur rekening bersama ini, maka dana pembeli akan disimpan di rekening Instashop dan <strong>baru dicairkan ke rekening penjual setelah barang diterima pembeli.</strong> </p>
            <p class="mb20">Fitur Rekening Bersama saat ini hanya dapat dinikmati oleh pembeli yang berbelanja via <strong>WEB</strong> <i>dengan catatan fitur ini sudah diaktifkan penjual.</i> Untuk pesanan yang masuk melalui fitur <strong>Buat Pesanan</strong> atau <strong>Penagihan Instan</strong> hanya dapat menikmati fitur <strong>Transfer Langsung</strong></p>
            <p><strong>Bagaimana Proses Transaksi di Rekening Bersama?</strong></p>
            <p>1. Pembeli mengajukan pesanan di Web.</p>
            <img data-img="<?=STATIC_HOST?>/images/refundexplain/1.jpg">
            <p>2. Ketika memilih rekening bersama, pembeli akan diminta <strong>untuk login via LINE atau Facebook</strong>. Setelah itu pembeli diarahkan membayar ke rekening Instashop</p>
            <img data-img="<?=STATIC_HOST?>/images/refundexplain/2.jpg">
            <p>3. Jika pembayaran sudah terverifikasi, maka status pesanan akan berubah menjadi “Menunggu Pengiriman”. <strong>TIDAK ADA BATASAN WAKTU MAKSIMAL PENGIRIMAN BARANG</strong></p>
            <img data-img="<?=STATIC_HOST?>/images/refundexplain/3.jpg">
            <p>4. Setelah resi dimasukkan oleh penjual, status pesanan akan menjadi <strong>“Sudah Dikirim”</strong>. Pembeli juga akan menerima SMS berisi pemberitahuan pesanan telah dikirim beserta nomor resi</p>
            <img data-img="<?=STATIC_HOST?>/images/refundexplain/4.jpg">
            <p>5. Jika produk telah diterima dengan baik, pembeli dapat mengklik tombol <strong>“Sudah Diterima”</strong> yang ada di link web pesanannya </p>
            <img data-img="<?=STATIC_HOST?>/images/refundexplain/5.jpg">
            <p>6. Jika di <strong>hari ketujuh (ke-7)</strong> sejak resi pengiriman dimasukkan pesanan belum diterima, pembelimu dapat klik <strong>“Perpanjang Penerimaan”</strong>. Instashop akan otomatis memperpanjang masa garansi dana hingga hari <strong>ke-10 (sepuluh)</strong></p>
            <img data-img="<?=STATIC_HOST?>/images/refundexplain/6.jpg">
            <p>7. Jika di hari ketujuh pembeli <strong>TIDAK</strong> klik “Perpanjang Penerimaan” atau “Pengembalian Dana”, maka di <strong>hari kedelapan (ke-8) dana otomatis dicairkan ke saldo penjual</strong> </p>
            <img data-img="<?=STATIC_HOST?>/images/refundexplain/7.jpg">
            <p>8. Jika hingga hari <strong>ke-10</strong> pesanan belum juga diterima, pembeli dapat klik <strong>“Pengembalian Dana”</strong>. </p>
            <p>Setelah pesanan masuk ke dalam status <strong>“Pengembalian Dana”</strong>, maka dana akan <strong>kembali disimpan</strong> oleh Instashop.</p>
            <p>Dana akan dicairkan ke penjual atau dikembalikan ke pembeli <strong>setelah mendapat persetujuan dari kedua belah pihak.</strong> </p>
            <img data-img="<?=STATIC_HOST?>/images/refundexplain/8.jpg">
            <p>9. Jika di hari kesepuluh (ke-10) pembeli <strong>TIDAK</strong> klik “Pengembalian Dana”, <strong>dana akan otomatis dicairkan ke penjual di hari kesebelas (ke-11).</strong></p>
            <p>Penjual dapat melihat dan menarik saldo dana tersebut di submenu <strong>“Saldo Dapat Ditarik”</strong> dalam menu <strong>“Penghasilan”</strong></p>
            <img data-img="<?=STATIC_HOST?>/images/refundexplain/9.jpg">
            <img data-img="<?=STATIC_HOST?>/images/refundexplain/10.png">
            <p><strong>Bagaimana Alur Pengembalian Dana?</strong></p>
            <div>
                <img data-img="<?=STATIC_HOST?>/images/refundexplain/11.png">
                <p>1. <strong>Pembeli dapat mengajukan pengembalian dana setelah pembayaran terkonfirmasi:</strong></p>
                <ul class="content-ul">
                    <li>
                        <p>Pembeli dapat klik tombol <strong>“Pengembalian Dana”</strong> untuk mengajukan permintaan pengembalian dana</p>
                        <img data-img="<?=STATIC_HOST?>/images/refundexplain/12.jpg">
                    </li>
                    <li>
                        <p>Isi lengkap <strong>jumlah pengembalian dana, alasan jelas pengembalian dana dan foto</strong> untuk memperkuat alasan pengembalian dana (misal: salah warna, produk cacat dll</p>
                        <img data-img="<?=STATIC_HOST?>/images/refundexplain/13.png">
                    </li>
                    <li>
                        <p>Isi Nomor Rekening untuk pengembalian dana. Pastikan <strong>nama pemilik rekening</strong> diisi sesuai yang tertera di <strong>buku tabungan</strong></p>
                        <img data-img="<?=STATIC_HOST?>/images/refundexplain/14.png">
                    </li>
                    <li>
                        <p>Pengembalian dana berhasil diajukan. Klik <strong>“Cek Status Pengembalian Dana”</strong> untuk melihat perkembangan pengembalian dana. <strong>SIMPAN/BOOKMARK LINK INI</strong> baik-baik ya, jangan sampai hilang!</p>
                        <img data-img="<?=STATIC_HOST?>/images/refundexplain/15.png">
                        <img data-img="<?=STATIC_HOST?>/images/refundexplain/16.jpg">
                    </li>
                </ul>
            </div>
            <div>
                <p>2. <strong>Verifikasi Penjual:  <a href="javascript:;">Setuju</a> Pengembalian Dana</strong></p>
                <ul class="content-ul">
                    <li>
                        <p>Jika pembeli mengajukan pengembalian dana, maka pesanan tsb akan pindah ke tab <strong>“Menunggu Pengembalian Dana”</strong> di menu “Pengaturan Pesanan”</p>
                        <img data-img="<?=STATIC_HOST?>/images/refundexplain/17.jpg">
                    </li>
                    <li>
                        <p>Tampilan halaman untuk menyetujui / menolak pengembalian dana</p>
                        <img data-img="<?=STATIC_HOST?>/images/refundexplain/18.png">
                    </li>
                    <li>
                        <p>Jika <strong>pengembalian dana disetujui penjual</strong>, maka status pengembalian dana akan langsung masuk ke tahap keempat <strong>“Diproses Bank”</strong>. Instashop akan mengembalikan dana ini ke rekening pembeli dalam 1-2 hari kerja</p>
                        <img data-img="<?=STATIC_HOST?>/images/refundexplain/19.jpg">
                    </li>
                </ul>
            </div>
            <div>
                <p>3. <strong>Verifikasi Penjual: <a href="javascript:;">Tolak</a> Pengembalian Dana</strong></p>
                <ul class="content-ul">
                    <li>
                        <p>Tampilan di menu Pengaturan Pesanan – Menunggu Pengembalian Dana milik penjual ketika <strong>penjual menolak pengembalian dana</strong></p>
                        <img data-img="<?=STATIC_HOST?>/images/refundexplain/20.jpg">
                    </li>
                    <li>
                        <p><strong>Tampilan yang dilihat pembeli</strong> ketika pengembalian dana <strong>ditolak</strong> oleh penjual.</p>
                        <img data-img="<?=STATIC_HOST?>/images/refundexplain/21.jpg">
                    </li>
                    <li>
                        <p>Pada tahap ini, tim CS Instashop akan menghubungi pembeli dan penjual untuk memediasi & mencari solusi terbaik. </p>
                    </li>
                    <li>
                        <p>Setelah mediasi mencapai kesepakatan, maka tim CS kami akan memproses pengembalian dana / pencairan dana sesuai hasil mediasi</p>
                    </li>
                </ul>
            </div>
            <div>
                <p>4.  Pencairan dana diajukan ke bank. Dana akan sampai ke rekening dalam 2 (dua) hari kerja</p>
            </div>
            <div class="mb20">
                <p>5. Transaksi Selesai</p>
            </div>

            <p><strong>Bagaimana Langkah Untuk Mengaktifkan Fitur Rekening Bersama? </strong></p>
            <p>1. Dari menu<strong>Atur Toko</strong>, klik <strong>Rekening Bersama</strong></p>
            <img data-img="<?=STATIC_HOST?>/images/refundexplain/22.jpg">
            <p>2. Geser ke kanan tombol nyalakan untuk mengaktifkan fitur ini. </p>
            <img class="mb20" data-img="<?=STATIC_HOST?>/images/refundexplain/23.png">

            <p><strong>Apa Pengaruh Fitur Rekening Bersama ini bagi Dropshipper?</strong></p>
            <p>Fitur “Rekening Bersama” hanya akan aktif di akun dropshipper <strong>jika sudah diaktifkan oleh supplier</strong>. Dengan kata lain, jika supplier mengaktifkan fitur Rekening Bersama, maka fitur Rekening Bersama ini juga bisa dinikmati oleh <strong>pembeli yang berbelanja di web dropshippermu.</strong> </p>
            <p>Ketika supplier menolak permintaan pengembalian dana dari pembeli dropshipper, maka dropshipper sebagai pihak penengah bertugas <strong>untuk menegosiasikan hal ini dengan pembeli dan suppliernya</strong>, dan <strong>menyampaikan hasil akhir kesepakatan</strong> ini ke tim CS Instashop.</p>
            <p>CS Instashop akan memproses dana sesuai hasil akhir kesepakatan negosiasi.</p>
        </div>
        <h1 id="second-type">2. APA ITU TRANSFER LANGSUNG?</h1>
        <div>
            <p>Transfer Langsung adalah metode pembayaran di mana rekening PT Insta Shop Indonesia hanya berfungsi sebagai alat verifikasi pembayaran.</p>
            <p>Dalam metode transfer langsung, pembeli tetap akan diarahkan untuk mengirimkan dana ke rekening PT Insta Shop Indonesia, namun setelah pembayaran terverifikasi, saldo akan segera masuk ke “Saldo Dapat Ditarik” penjual, dan dapat segera ditarik <strong>TANPA</strong> harus menunggu pengiriman barang atau resi dimasukkan. </p>
            <p>Transfer Langsung ini merupakan <strong>metode pembayaran standar (default)</strong> dari Instashop. Jika penjual tidak mengaktifkan rekening bersama, maka untuk setiap pesanan yang berlaku, metode pembayarannya adalah “Transfer Langsung”. </p>
            <p><strong>Dengan Transfer Langsung</strong>, Instashop masih dapat membantu pengembalian dana jika pesanan kamu batalkan.</p>
            <p class="mb20">Jika pesanan yang sudah dibayar dibatalkan, maka pembeli akan menerima SMS berisi pemberitahuan pesanan telah dibatalkan, dan saldo ini akan <strong>otomatis  dikurangi</strong> dari <strong>“Saldo Dapat Ditarik”</strong> akun Instashopmu. Instashop akan mengembalikan dana ke pembeli dalam 1x24 jam hari kerja terhitung sejak nomor rekening diinformasikan oleh pembeli ke dalam link yang ada di SMS pemberitahuan pembatalan pesanan.</p>

            <p><strong>ALUR TRANSAKSI TRANSFER LANGSUNG</strong></p>
            <p>1. Pembeli mengajukan pesanan di Web</p>
            <img data-img="<?=STATIC_HOST?>/images/refundexplain/24.jpg">
            <p>2. Pembeli tetap diarahkan untuk membayar ke rekening Instashop dahulu, supaya Instashop dapat membantu memverifikasi pembayaran</p>
            <img data-img="<?=STATIC_HOST?>/images/refundexplain/25.jpg">
            <p>3. Jika pembayaran sudah terverifikasi, maka status pesanan akan berubah menjadi <strong>“Perlu Dikirim”</strong>. TIDAK ADA BATASAN WAKTU MAKSIMAL PENGIRIMAN BARANG</p>
            <img data-img="<?=STATIC_HOST?>/images/refundexplain/26.jpg">
            <p>4. Begitu pesanan <strong>sudah masuk ke menu Perlu Dikirim</strong>, saldo akan masuk ke <strong>“Saldo Dapat Ditarik”</strong> kamu di menu Penghasilan dalam <strong>30 menit</strong>. Klik detail penarikan saldo untuk melihat detail pesanannya. </p>

            <p>Setelah pesanan masuk dalam saldo Penghasilan, maka kamu bisa langsung tarik saldo.</p>
            <p>Jika pesanan yang sudah dibayar dibatalkan, maka pembeli akan menerima SMS berisi pemberitahuan pesanan telah dibatalkan, dan saldo ini akan <strong>otomatis dikurangi</strong> dari <strong>“Saldo Dapat Ditarik”</strong> akun Instashopmu. </p>
            <p>Instashop akan mengembalikan dana ke pembeli dalam 1x24 jam hari kerja terhitung sejak nomor rekening diinformasikan oleh pembeli ke dalam link yang ada di SMS pemberitahuan pembatalan pesanan.</p>
            <img data-img="<?=STATIC_HOST?>/images/refundexplain/27.png">
            <img data-img="<?=STATIC_HOST?>/images/refundexplain/28.png">
        </div>
        <h1 id="third-type">3. Apa bedanya Rekening Bersama dengan Transfer ke Penjual?</h1>
        <div>
            <p>
               <strong>Dengan Rekening Bersama</strong>, dana pembeli akan disimpan sementara di rekening Instashop dan baru dicairkan ke “Saldo Dapat Ditarik” penjual setelah pembeli mengkonfirmasi penerimaan barang.
            </p>
            <p>
                Pembeli dapat memperpanjang waktu penerimaan produk sebanyak <strong>1 (satu) kali di hari ketujuh(tujuh) hari sejak resi dimasukkan penjual.</strong> Waktu perpanjangan penerimaan produk adalah sebanyak <strong>3 (tiga) hari</strong>. Jika setelah 3 (tiga) hari atau <strong>hingga di hari kesepuluh (ke-10)</strong>, pembeli tidak mengkonfirmasi penerimaan barang atau mengajukan pengembalian dana, maka pada <strong>hari kesebelas (ke-11)</strong> dana otomatis dicairkan ke “Saldo Dapat Ditarik” penjual dan transaksi dianggap selesai.
            </p>
            <p>
                Setelah barang terkonfirmasi diterima, maka Instashop tidak lagi bertanggung jawab terhadap keamanan transaksi. Segala proses retur atau pengembalian produk setelah itu dilakukan langsung antara pembeli dan penjual.
            </p>
            <p>
                <strong>Dengan Transfer Langsung</strong>, saldo akan segera masuk ke “Saldo Dapat Ditarik” setelah pembayaran terverifikasi. Penjual dapat langsung menarik dana <strong>tanpa</strong> harus menunggu produk diterima.
            </p>
            <p>
                Jika pesanan yang sudah dibayar dibatalkan, maka pembeli akan menerima SMS berisi pemberitahuan pesanan telah dibatalkan, dan saldo ini akan <strong>otomatis dikurangi</strong> dari <strong>“Saldo Dapat Ditarik”</strong> akun Instashopmu. Instashop akan mengembalikan dana ke pembeli dalam <strong>1x24</strong> jam hari kerja terhitung sejak nomor rekening diinformasikan oleh pembeli ke dalam link yang ada di SMS pemberitahuan pembatalan pesanan.
            </p>
        </div>
    </section>
    <script src="<?=STATIC_HOST?>/js/base/require-zepto.js"></script>
    <script src="<?=STATIC_HOST?>/js/base/require-config.js"></script>
    <script>
        require(['lazyload'],function(Lazyload){
            Lazyload();
        })
    </script>
</body>
</html>