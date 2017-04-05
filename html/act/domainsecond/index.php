<?php
include_once( dirname(__FILE__).'/../../../html/router/common.php');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width,initial-scale=1, minimum-scale=1.0, maximum-scale=1.0,user-scalable=no">
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expect" content="0">
    <meta name="format-detection" content="telephone=no"/>

    <meta name="spider-id" content="orju7v">

    <title>Free domain webstore</title>
    <style>
        * {
                    margin: 0;
                    padding: 0;
                    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                    -webkit-touch-callout: none;
                    background: transparent;
                    outline: none;
                }

                button, input, select, textarea {
                    font-size: 100%;
                    border: 0;
                    border-radius: 0;
                    -webkit-appearance: none;
                    box-sizing: border-box;
                }

                body, button, input, select, option, td, textarea /* for ie */
                {
                    font: 12px/1.5 'Myriad Set Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
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

                ul, ol {
                    list-style: none;
                }

                a {
                    text-decoration: none;
                }

                body {
                    background-color: #E9DAC9;
                    color: #8B572A;
                }

                @media only screen and (min-width: 641px) {
                    body {
                        max-width: 640px;
                        margin: 0 auto;
                        background-color: #E9DAC9;
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

                .dialog-wraper {
                    position: absolute;
                    background-color: #fff;
                    border-radius: 5px;
                    font-size: 1.4rem;
                    color: #666;
                }

                .dialog-body, .dialog-top, .dialog-footer {
                    padding: 10px;
                    font-size: 12px;
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
                }

                .ca-btn {
                    margin-right: 30px;
                }

                .dialog-cover {
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    right: 0;
                    background-color: black;
                    opacity: 0.4;
                    -webkit-filter: Opacity(40);
                            filter: Opacity(40);
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


                h1 {
                    margin-top: 20px;
                    font-size: 18px;
                    text-align: center;
                }
                .text-center {
                    text-align: center;
                }
                .content {
                    background: #E0CEBA;
                    margin: 10px 20px 20px;
                    padding: 10px 20px 20px;
                }

                .fwb {
                    font-weight: bolder;
                }

                .title-txt {
                    color: #666;
                }

                .content > div {
                    margin-top: 10px;
                }

                .b-bottom {
                    position: relative;
                }

                .b-bottom::after {
                    position: absolute;
                    left: -50%;
                    right: -50%;
                    bottom: 0;
                    height: 1px;
                    content: '';
                    -webkit-transform: scale(0.5);
                    transform: scale(0.5);
                    border-bottom: 1px solid #d8d8d8;
                    z-index: 1;
                }

                .margin-top {
                    margin-top: 15px;
                }

                .title-txt {
                    padding-bottom: 13px;
                }

                .step {
                    margin-top: 20px!important;
                }

                .step::before {
                    display: block;
                    position: relative;
                    content: "";
                    width: 50px;
                    height: 50px;
                    line-height: 50px;
                    background: #BC9971;
                    color: #fff;
                    border-radius: 50%;
                    text-align: center;
                    float: left;
                }
                .step:nth-last-child(n+2):after {
                    height: 1px;
                    content: '';
                    width: 100%;
                    margin-top:15px;
                    -webkit-transform: scaleY(0.5);
                    transform: scaleY(0.5);
                    border-bottom: 1px solid #91714E;
                    z-index: 1;
                }

                .step-1::before {
                    content: 'Syarat 1';
                }

                .step-2::before {
                    content: 'Syarat 2';
                }

                .step-3::before {
                    content: 'Daftar';
                }

                .step-contet {
                    margin-left: 60px;
                }

                .btn {
                    font-size: 16px;
                    color: #FFFFFF;
                    letter-spacing: 0;
                    text-shadow: 0 2px 0 #D74629;
                    display: block;
                    height: 40px;
                    line-height: 40px;
                    width: 230px;
                    margin: 15px auto 0;
                    background-image: -webkit-linear-gradient(top, #FD675C 0%, #F15737 100%);
                    background-image: linear-gradient(-180deg, #FD675C 0%, #F15737 100%);
                    border-radius: 100px;
                }

                .btn1 {
                    /*background: url(images/btn1.jpg) no-repeat;*/
                    background-size: contain;
                }

                .btn2 {
                    /*background: url(images/btn2.jpg) no-repeat;*/
                    background-size: contain;
                }

                .disable-btn {
                    /*background: url(images/disable-btn.jpg) no-repeat;*/
                    background-image: -webkit-linear-gradient(top, #BAB5AF 0%, #B3A99E 100%);
                    background-image: linear-gradient(-180deg, #BAB5AF 0%, #B3A99E 100%);
                    text-shadow:0 2px 0 #9F958B;
                }

                .user-list {
                    background-color: rgba(67, 203, 156, .15);
                    overflow: hidden;
                    position: relative;
                }

                .user-list li {
                    float: left;
                    width: 100%;
                    padding: 20px 0 40px;
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                }

                .user-list li > div {
                    width: 33.333333%;
                    -webkit-box-flex: 1;
                    -ms-flex-positive: 1;
                    flex-grow: 1;
                    -ms-flex-negative: 1;
                    flex-shrink: 1;
                    -ms-flex: 1;
                        flex: 1;
                    text-align: center;
                    font-weight: bolder;
                    overflow: hidden;
                }

                .user-list li div img {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                }

                .user-list li .name {
                    color: #43CB9C;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    display: block;
                }

                .user-list li .url {
                    padding: 0 5px;
                }

                .user-list li .url a {
                    color: #000;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    display: block;
                }

                .info-box {
                    padding: 20px;
                    line-height: 2;
                    color: #8B572A;
                }

                .info-box p span {
                    color: #8B572A;
                    font-weight: bolder;
                }

                .slide_tab {
                    position: absolute;
                    bottom: 10px;
                    left: 0;
                    width: 100%;
                    height: 20px;
                    text-align: center;
                }

                .slide_tab i {
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background-color: #fff;
                    margin-right: 5px;
                }

                .slide_tab i.cur {
                    background-color: #43CB9C;
                }

                .tel-dialog > p {
                    font-size: 14px;
                    font-weight: bolder;
                }

                .tel-dialog li {
                    padding: 10px 0;
                }

                .tel-dialog li::before {
                    display: block;
                    content: " ";
                    margin-top: 3px;
                    width: 16px;
                    height: 24px;
                    float: left;
                    background: url(images/phone.png) no-repeat;
                    background-size: contain;
                }

                .tel-dialog li > div {
                    margin-left: 25px;
                    position: relative;
                    padding-right: 5px;
                }

                .tel-dialog li input {
                    width: 100%;
                    height: 30px;
                    padding: 5px 5px 5px 40px;
                    background-color: #f5f5f5;
                    border-radius: 2px;
                }

                .tel-dialog li span {
                    position: absolute;
                    left: 10px;
                    top: 0;
                    font-size: 12px;
                    line-height: 30px;
                }

                .tel-dialog button {
                    display: block;
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    color: #fff;
                    font-size: 14px;
                    background-color: #43cb9c;
                    border-radius: 2px;
                }

                .tel-dialog button.disable-btn {
                    background-color: #eee;
                    color: #ff584c;
                }

                .domain-box {
                    color: #000;
                }

                .domain-box > p {
                    font-weight: bolder;
                    font-size: 14px;
                }

                .domain-input {
                    position: relative;
                    margin: 10px 0;
                }

                .domain-input input {
                    background: #ffffff;
                    border: 2px solid #d8d8d8;
                    border-radius: 4px;
                    width: 100%;
                    height: 35px;
                    padding: 8px 60px;
                    font-size: 14px;
                }

                .domain-input::after, .domain-input::before {
                    display: block;
                    height: 35px;
                    line-height: 35px;
                    font-size: 14px;
                    font-weight: bolder;
                    position: absolute;
                    top: 0;
                }

                .domain-input::before {
                    content: "www.";
                    left: 20px;
                }

                .domain-input::after {
                    content: ".com";
                    right: 25px;
                }

                .btn3 {
                    display: block;
                    width: 250px;
                    height: 35px;
                    margin: 0 auto 10px;
                    background: url(images/btn3.jpg) no-repeat;
                    background-size: contain;
                }

                .domain-cont > p {
                    line-height: 2;
                    font-size: 12px;
                }

                .domain-cont > p span {
                    font-weight: bolder;
                }

                .tel-dialog > p.tel-error, .domain-error {
                    color: #ff584c;
                    font-size: 12px;
                    margin-bottom: 10px;
                }

                .domain-error {
                    margin: 5px 0;
                }

                .intro {
                    font-size: 18px;
                }
                .invite-box {
                    text-align: center;
                }
                .invite-number {
                    letter-spacing: 1px;
                    font-size:20px;
                }
                .invite-iscan {
                    font-size: 14px;
                    color: red;
                    letter-spacing: 0;
                    font-weight: bolder;
                }
                .invite-table {
                    display:none;
                }
                .invite-table table {
                    margin: 0 auto;
                    border-color: #8B572A;
                    border-width: 0px;
                    border-collapse: collapse;
                    border: none;
                    background: #BB9873;
                }

                .invite-table table td {
                    border: 2px solid #8B572A;
                    width: 50%;
                    text-align: center;
                    height: 40px;
                    font-size: 14px;
                    padding:0 10px;
                    font-weight: normal;
                }

                @media only screen and (min-width: 319px) {
                    .invite-table table td {
                        border: 2px solid #8B572A;
                        width: 50%;
                        text-align: center;
                        height: 40px;
                        font-size: 12px;
                        padding:0 2px;
                        font-weight: normal;
                    }
                    .invite-table .t-header {
                        width: 100%;
                        font-size: 12px;
                        font-weight: bolder;
                    }
                }

                .invite-table table td:first-child {
                    width: 38%;
                }
                .invite-table .t-header {
                    width: 100%;
                    font-size: 14px;
                    font-weight: bolder;
                }

                .invite-dialog {
                            background: #ffffff;
                        }
                        .invite-dialog-input,.invite-dialog-img {
                            padding:10px 10px 0;
                        }

                        .invite-dialog-img img {
                            display: block;
                            margin: 0px;
                            padding: 0px;
                            border: 0;
                            width: 100%;
                        }

                        .invite-dialog-input textarea {
                            display: block;
                            width: 100%;
                            background: #F5F5F5;
                            border: 1px solid #D8D8D8;
                            outline: none;
                            color: #999999;
                            font-size: 15px;
                            resize: none;
                            padding:10px;
                            min-height: 130px;
                            height: 50px;
                        }

                        [class*="ins-avg-"] {
                            display: block;
                            padding: 0;
                            margin: 0;
                            list-style: none;
                        }

                        [class*="ins-avg-"]:before,
                        [class*="ins-avg-"]:after {
                            content: " ";
                            display: table;
                        }

                        [class*="ins-avg-"]:after {
                            clear: both;
                        }

                        [class*="ins-avg-"] > li {
                            display: block;
                            height: auto;
                            float: left;
                        }

                        .ins-avg-sm-3 > li {
                            width: 33.33333333%;
                        }

                        .ins-avg-sm-3 > li:nth-of-type(n) {
                            clear: none;
                        }

                        .ins-avg-sm-3 > li:nth-of-type(3n + 1) {
                            clear: both;
                        }

                        .ins-avg-sm-4 > li {
                            width: 25%;
                        }

                        .ins-avg-sm-4 > li:nth-of-type(n) {
                            clear: none;
                        }

                        .ins-avg-sm-4 > li:nth-of-type(4n + 1) {
                            clear: both;
                        }

                        .invite-share-box {
                            text-align: center;
                        }
                        .invite-share-box p {
                            margin-top:-22px;
                        }
                        .icon-share-copy {
                            color: #49C0FB;
                        }
                        .icon-share-line {
                            color: #7EDB5C;
                        }
                        .icon-share-whatsapp {
                            color: #6ED65B;
                        }
                        .icon-share-bbm {
                            color: #38A6D7;
                        }
                        .icon-share-instagram {
                            color: #B98E5C;
                        }
                        .invite-share-box p {
                            color: #666666!important;
                        }
                        @font-face {
                            font-family: "iconfont";
                            src: url('../../../static/css/base/fonts/iconfont.woff?t=1473737446') format('woff'), /* chrome, firefox */ url('../../../static/css/base/fonts/iconfont.ttf?t=1473737446') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/ url('../../../static/css/base/fonts/iconfont.svg?t=1473737446#iconfont') format('svg'); /* iOS 4.1- */
                        }

                        .iconfont {
                            font-family: "iconfont" !important;
                            font-size: 70px;
                            font-style: normal;
                            -webkit-font-smoothing: antialiased;
                            -webkit-text-stroke-width: 0.2px;
                            -moz-osx-font-smoothing: grayscale;
                        }

                        .icon-share-copy:before {
                            content: "\e61f";
                        }

                        .icon-share-bbm:before {
                            content: "\e620";
                        }

                        .icon-share-whatsapp:before {
                            content: "\e621";
                        }

                        .icon-share-line:before {
                            content: "\e622";
                        }
                        .icon-share-instagram:before { content: "\e623"; }
                        .j_share_btn,.invite-number-box {
                            display:none;
                        }
                        .j_domain_tip {
                                margin-top: 20px;
                                font-size: 16px;
                                font-weight: bolder;
                                text-align: center;
                        }

    </style>
    <script>
        <?php
        include_once( dirname(__FILE__).'/../../../html/router/util.php' );
        include_once( dirname(__FILE__).'/../../../html/router/common.php' );
        $params = array_merge(getSellerInfo(),[
             'action' => 'invite'
        ]);
        $path = 'v1/domain';
        ?>
        var api_url = '<?php echo check_api($path, $params); ?>';

        var act_data = JSON.parse(<?php echo get_init_data($path, $params); ?>);

      </script>
</head>
<body data-spider="hz8xkn2i">
<section class="banner">
    <img src="images/banner.jpg">
</section>
<!--<h1>Ubah domain web Instashop kamu <br>menjadi namatokokamu.com!</h1>-->

<section class="content">
    <div class="intro">
        Belum kebagian domain .com di promo bulan lalu? Jangan khawatir,sekarang Instashop bagi-bagi domain gratis lagi
        untuk web Instashopmu dari 1-15 DESEMBER 2016
    </div>

    <div class="step step-1 clearfix">
        <div class="step-contet">
            Kamu harus upload min 10 produk / memiliki min 3 pesanan selesai
            <p class="invite-iscan">
            </p>
        </div>
    </div>
    <div class="step step-2 clearfix">
        <div class="step-contet">
            <p>Ajak 5 teman online shop kamu (followers IG MINIMAL 500) untuk registrasi di Instashop <span class="fwb">menggunakan kode
                referralmu</span>
                dan upload 10 produk
            </p>
        </div>
        <div>
            <p class="invite-number-box text-center margin-top">
                Kode Referralmu:<br>
                <span class="invite-number fwb"></span>
            </p>
            <div class="invite-box">
                <p class="j_invite_tip"></p>
                <div class="invite-table">
                    <table class="j_invite_table">
                    </table>
                </div>
            </div>
            <button class="btn btn2 j_invite_btn disable-btn" data-report="domain_btn_invite">BAGIKAN KODE REFERRAL</button>
            <div class="margin-top">
                Note: Teman yang kamu ajak harus upload produk menggunakan fitur "tambah produk dari Instagram". 1 akun Instagram hanya dapat digunakan untuk 1 akun Instashop.
            </div>
        </div>
    </div>
    <div id="result" class="step step-3 clearfix">
        <div class="step-contet j_domain_succ">
            Jika syarat 1 dan 2 sudah terpenuhi, kamu akan mendapatkan notifikasi dari Instashop. Klik tombol di bawah ini untuk mendaftarkan domain webmu
        </div>
        <div class="j_domain_tip">
        </div>
        <div style="text-align:center">
            <button class="btn btn2 j_domain_btn disable-btn" data-report="domain_btn_apply">Daftar</button>
        </div>
        <div style="text-align:center">
            <button class="btn btn2 j_share_btn" data-report="domain_btn_share">Bagikan ke Teman</button>
        </div>
    </div>
</section>
<section class="info-box">
    <p><span>*Syarat & Ketentuan:</span></p>
    <p>1. Teman yang kamu ajak <span>harus</span> merupakan online shop, belum pernah terregistrasi akunnya di Instashop sebelum 1 Desember 2016 dan memiliki min. 500 followers di akun Instagram online shopnya. </p>
    <p>2. Satu akun Instagram <span>hanya</span> dapat digunakan oleh satu pengguna akun Instashop. Temanmu <span>tidak dapat</span> menambahkan gambar dari akun Instagram yang sebelumnya <span>sudah digunakan</span> oleh pengguna Instashop lain. </p>
    <p>3. Pada saat registrasi,<span class="fwb"> teman yang kamu ajak wajib mengisi kolom kode referral dengan KODE REFERRALMU</span> yang tertera di atas. Kode referral ini digunakan Instashop untuk memverifikasi otomatis data teman yang kamu ajak.
    </br>
    Kamu dapat setiap saat mengecek perkembangan teman yang menggunakan kode referralmu di bagian atas halaman ini - kolom "SYARAT 2".
    </p>
    <p>4. Promo ini berlaku hingga 15 Desember 2016 pukul 22.00 WIB</p>
    <p>5. Keputusan Instashop adalah mutlak dan tidak dapat diganggu gugat. Jika ditemukan indikasi kecurangan dalam bentuk apapun, baik selama promo ini berlangsung ataupun setelah promo ini berakhir, Instashop berhak menolak dan/atau mencabut pengajuan domain kamu.</p>
</section>
<script src="<?=STATIC_HOST?>/js/base/require-zepto.js"></script>
<!--<script src="<?=STATIC_HOST?>/js/base/require-config.js"></script>-->
<script src="<?=STATIC_HOST?>/js/dist/app/act/domainname.js?v=1491383317101"></script>
<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    function reportEventStatistics(type) {
        console.log(type)
      ga('send', 'event', type, 'click');
    }
    ga('create', 'UA-78448705-7', 'auto');
    ga('send', 'pageview');
    <?=BI_SCRIPT?>
</script>
</body>
</html>
