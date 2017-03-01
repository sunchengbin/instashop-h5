<?php
include_once( dirname(__FILE__).'/../../html/router/common.php');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1, minimum-scale=1.0, maximum-scale=1.0,user-scalable=no">
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expect" content="0">
    <meta name="format-detection" content="telephone=no" />
    <title>Free domain webstore</title>
    <style>
    *{
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
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    body, button, input, select,option,td, textarea /* for ie */ {
        font: 12px/1.5 'Myriad Set Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
    .fl{
        float:left;
    }
    .fr{
        float:right;
    }
    img{
        width: 100%;
        vertical-align: middle;
    }
    .block{
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
    a{
        text-decoration:none;
    }
    body{
        background-color:#F8FDFB;
    }
    @media only screen and (min-width: 641px) {
        body {
            max-width: 640px;
            margin: 0 auto;
            background-color: #F5F5F5;
        }
        body .buy-box,body .logistics-plug,body .buy-plug,body .shop-header-nav,body footer,body .prove-btn,body .index-footer{
            max-width: 640px;
            left: 50%;
            margin-left: -320px;
        }
        body .address-list{
            max-width: 640px;
        }
    }
    .dialog-wraper{
        position:absolute;
        background-color : #fff;
        border-radius: 5px;
        font-size: 1.4rem;
        color:#666;
    }
    .dialog-body,.dialog-top,.dialog-footer{
        padding:10px;
        font-size:12px;
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
    .dialog-cover{
        position: absolute;
        left:0;
        top:0;
        bottom:0;
        right:0;
        background-color: black;
        opacity: 0.4;
        filter: Opacity(40);
    }
    h1{
        margin-top:20px;
        font-size:18px;
        text-align:center;
    }
    .content{
        padding:10px 20px 20px;
    }
    .fwb{
        font-weight:bolder;
    }
    .title-txt{
        color:#666;
    }
    .content > div{
        margin-top:10px;
    }
    .b-bottom{
        position: relative;
    }
    .b-bottom::after{
        position: absolute;
        left:-50%;
        right: -50%;
        bottom:0;
        height: 1px;
        content: '';
        -webkit-transform: scale(0.5);
        transform: scale(0.5);
        border-bottom: 1px solid #d8d8d8;
        z-index: 1;
    }
    .title-txt{
        padding-bottom:13px;
    }
    .step::before{
        display:block;
        content:"";
        width:40px;
        height:45px;
        float:left;
    }
    .step-1::before{
        background:url(images/step1.jpg) no-repeat;
        background-size:contain;
    }
    .step-2::before{
        background:url(images/step2.jpg) no-repeat;
        background-size:contain;
    }
    .step-contet{
        margin-left:45px;
    }
    .btn{
        display:block;
        height: 30px;
        width: 230px;
        margin: 10px auto 0;
    }
    .btn1{
        background:url(images/btn1.jpg) no-repeat;
         background-size:contain;
    }
    .btn2{
        background:url(images/btn2.jpg) no-repeat;
         background-size:contain;
    }
    .disable-btn2{
        background:url(images/disable-btn2.jpg) no-repeat;
        background-size:contain;
    }
    .user-list{
        background-color:rgba(67,203,156,.15);
        overflow:hidden;
        position:relative;
    }
    .user-list li{
        float:left;
        width:100%;
        padding:20px 0 40px;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
    }
    .user-list li > div{
        width:33.333333%;
        -webkit-box-flex: 1;
        -webkit-flex-grow: 1;
        -ms-flex-positive: 1;
        flex-grow: 1;
        -webkit-flex-shrink: 1;
        -ms-flex-negative: 1;
        flex-shrink: 1;
        flex:1;
        text-align:center;
        font-weight:bolder;
        overflow:hidden;
    }
    .user-list li div img{
        width:30px;
        height:30px;
        border-radius:50%;
    }
    .user-list li .name{
        color:#43CB9C;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        display: block;
    }
    .user-list li .url{
        padding:0 5px;
    }
    .user-list li .url a{
        color:#000;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        display: block;
    }
    .info-box{
        padding: 20px;
        line-height:2;
        color:#444;
    }
    .info-box p span{
        color:#000;
        font-weight:bolder;
    }
    .slide_tab{
        position: absolute;
        bottom:10px;
        left: 0;
        width: 100%;
        height: 20px;
        text-align: center;
    }
    .slide_tab i{
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #fff;
        margin-right:5px;
    }
    .slide_tab i.cur{
        background-color: #43CB9C;
    }
    .tel-dialog >p {
        font-size:14px;
        font-weight:bolder;
    }
    .tel-dialog li{
        padding: 10px 0;
    }
    .tel-dialog li::before{
        display:block;
        content:" ";
        margin-top: 3px;
        width:16px;
        height:24px;
        float:left;
        background:url(images/phone.png) no-repeat;
        background-size:contain;
    }
    .tel-dialog li > div{
        margin-left:25px;
        position:relative;
        padding-right: 5px;
    }
    .tel-dialog li input{
         width: 100%;
         height: 30px;
         padding: 5px 5px 5px 40px;
         background-color: #f5f5f5;
         border-radius: 2px;
    }
    .tel-dialog li span{
        position: absolute;
        left: 10px;
        top: 0;
        font-size: 12px;
        line-height:30px;
    }
    .tel-dialog button{
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
    .tel-dialog button.disable-btn{
        background-color: #eee;
        color: #ff584c;
    }
    .domain-box{
        color:#000;
    }
    .domain-box > p{
        font-weight:bolder;
        font-size:14px;
    }
    .domain-input{
        position:relative;
        margin:10px 0;
    }
    .domain-input input{
        background:#ffffff;
        border:2px solid #d8d8d8;
        border-radius:4px;
        width:100%;
        height:35px;
        padding:8px 60px;
        font-size:14px;
    }
    .domain-input::after,.domain-input::before{
        display:block;
        height:35px;
        line-height:35px;
        font-size:14px;
        font-weight:bolder;
        position:absolute;
        top:0;
    }
    .domain-input::before{
        content:"www.";
        left:20px;
    }
    .domain-input::after{
        content:".com";
        right:25px;
    }
    .btn3{
        display:block;
        width:250px;
        height:35px;
        margin:0 auto 10px;
        background:url(images/btn3.jpg) no-repeat;
        background-size:contain;
    }
    .domain-cont > p{
        line-height:2;
        font-size:12px;
    }
    .domain-cont > p span{
        font-weight:bolder;
    }
    .tel-dialog >p.tel-error,.domain-error{
        color:#ff584c;
        font-size:12px;
        margin-bottom: 10px;
    }
    .domain-error{
        margin:5px 0;
    }
    </style>
</head>
<body>
        <section class="banner">
            <img src="images/banner.jpg">
        </section>
        <h1>Ubah domain web Instashop kamu <br>menjadi namatokokamu.com!</h1>
        <section class="content">
            <div class="top-title fwb">
                Caranya gampang banget: Ajak 5 teman online shopmu
                untuk bergabung di Instashop dan dapatkan domain web yang kamu inginkan.
            </div>
            <div class="top-title fwb">
                Promo ini hanya berlaku dari 2-3 November 2016. Batas waktu pengisian data teman dan registrasi domain web adalah 3 November 2016 pukul 23.59 WIB. Yuk buruan ikutan!
            </div>
            <div class="title-txt b-bottom">
                Informasi detail, syarat dan ketentuan silakan dibaca di bagian bawah halaman ini.
            </div>
            <div class="step step-1 fwb clearfix">
                <div class="step-contet">
                    Masukkan 5 nomor ponsel teman yang kamu referensikan untuk bergabung di Instashop.
                    <button class="btn btn1 j_tel_btn"></button>
                </div>
            </div>
            <div class="step step-2 fwb clearfix">
                <div class="step-contet">
                    Setelah data temanmu terverifikasi, klik tombol berikut untuk mendaftarkan domain web yang kamu mau.
                    <button class="btn btn2 j_domain_btn disable-btn2"></button>
                </div>
            </div>
        </section>
        <section class="user-list">
            <ul class="clearfix j_user_list">
                <li>
                    <div>
                        <img src="images/www.espanolasz.com.jpg">
                        <p class="name">Espanolasz</p>
                        <p class="url"><a href="//www.espanolasz.com" class="">espanolasz.com</a></p>
                    </div>
                    <div>
                        <img src="images/www.collabsstore.com.jpg">
                        <p class="name">Collabsstore</p>
                        <p class="url"><a href="//www.collabsstorejkt.com" class="">collabsstorejkt.com</a></p>
                    </div>
                    <div>
                        <img src="images/www.laplacestore.com.jpg">
                        <p class="name">Laplace store</p>
                        <p class="url"><a href="//www.laplacestore.com" class="">laplacestore.com</a></p>
                    <div>
                </li>
                <li>
                    <div>
                        <img src="images/www.uwearstoree.com.jpg">
                        <p class="name">Uwear store</p>
                        <p class="url"><a href="//www.uwearstoree.com" class="">uwearstoree.com</a></p>
                    </div>
                    <div>
                        <img src="images/www.kxystuff.com.jpg">
                        <p class="name">Kxystuff</p>
                        <p class="url"><a href="//www.kxystuff.com" class="">kxystuff.com</a></p>
                    </div>
                    <div>
                        <img src="images/www.chocohollicshop.com.jpg">
                        <p class="name">Chocohollic shop</p>
                        <p class="url"><a href="//www.chocohollicshop.com" class="">chocohollicshop.com</a></p>
                    <div>
                </li>
                <li>
                    <div>
                        <img src="images/www.hijabbymp.com.jpg">
                        <p class="name">Hijab_bymayangpathiloka</p>
                        <p class="url"><a href="//www.hijabbymp.com" class="">hijabbymp.com</a></p>
                    </div>
                    <div>
                        <img src="images/www.welovetinypeach.com.jpg">
                        <p class="name">Tinypeach</p>
                        <p class="url"><a href="//www.welovetinypeach.com" class="">welovetinypeach.com</a></p>
                    </div>
                    <div>
                        <img src="images/www.griyabajumuslimanak.com.jpg">
                        <p class="name">Baju_muslim_anak</p>
                        <p class="url"><a href="//www.griyabajumuslimanak.com" class="">griyabajumuslimanak.com</a></p>
                    <div>
                </li>
                <li>
                    <div>
                        <img src="images/www.arikahijab.com.jpg">
                        <p class="name">Arika hijab</p>
                        <p class="url"><a href="//www.arikahijab.com" class="">arikahijab.com</a></p>
                    </div>
                    <div>
                        <img src="images/www.sistershijabshop.com.jpg">
                        <p class="name">Sistershijab</p>
                        <p class="url"><a href="//www.sistershijabshop.com" class="">sistershijabshop.com</a></p>
                    </div>
                    <div>
                        <img src="images/www.babymilestonecard.com.jpg">
                        <p class="name">Harumi design</p>
                        <p class="url"><a href="//www.babymilestonecard.com" class="">babymilestonecard.com</a></p>
                    <div>
                </li>
                <li>
                    <div>
                        <img src="images/www.mamalovashop.com.jpg">
                        <p class="name">Mamalova</p>
                        <p class="url"><a href="//www.mamalovashop.com" class="">mamalovashop.com</a></p>
                    </div>
                    <div>
                        <img src="images/www.garskinlaptopku.com.jpg">
                        <p class="name">Garskin laptopku</p>
                        <p class="url"><a href="//www.garskinlaptopku.com" class="">garskinlaptopku.com</a></p>
                    </div>
                    <div>
                        <img src="images/www.griyavhy.com.jpg">
                        <p class="name">Griyavhy</p>
                        <p class="url"><a href="//www.griyavhy.com" class="">griyavhy.com</a></p>
                    <div>
                </li>
                <li>
                    <div>
                        <img src="images/www.dapuracine.com.jpg">
                        <p class="name">Acine</p>
                        <p class="url"><a href="//www.dapuracine.com" class="">dapuracine.com</a></p>
                    </div>
                    <div>
                        <img src="images/www.nomphonestuff.com.jpg">
                        <p class="name">Nomphone_stuff</p>
                        <p class="url"><a href="//www.nomphonestuff.com" class="">nomphonestuff.com</a></p>
                    </div>
                    <div>
                        <img src="images/www.lapulchraahijab.com.jpg">
                        <p class="name">La pulchraa</p>
                        <p class="url"><a href="//www.lapulchraahijab.com" class="">lapulchraahijab.com</a></p>
                    <div>
                </li>
                <li>
                    <div>
                        <img src="images/www.hijabbywm.com.jpg">
                        <p class="name">hijabbywm</p>
                        <p class="url"><a href="//www.hijabbywm.com" class="">hijabbywm.com</a></p>
                    </div>
                    <div>
                    </div>
                    <div>
                    </div>
                </li>
          </ul>
        </section>
        <section class="info-box">
            <p><span>Detail, Syarat dan Ketentuan:</span></p>
            <p>Instashop mau bagi-bagi <span>DOMAIN WEB GRATIS</span> untuk link toko webstore Instashop kalian nih. </p>
            <p>Caranya simpel banget: </p>
            <p>1. Ajak <span>5 orang teman online shop</span> kamu (harus memiliki followers Instagram minimal <span>2000</span>) untuk bergabung
            dengan Instashop. Teman kamu harus belum pernah terdaftar di Instashop ya sebelumnya:)</p>
            <p>2. Setelah registrasi, minta teman kamu untuk mengisi lengkap <span>Atur Toko</span> dan <span>meng-upload minimal 10 produk.</span>
             PS: Untuk memudahkan proses upload produk, gunakan
            fitur <span>tambah produk dari Instagram</span> ya!</p>
            <p>3. Masukkan nomor ponsel yang diregistrasikan di Instashop dari teman kamu dengan <span>klik "Isi Data Teman".</span></p>
            <p>4. Tim Instashop akan memverifikasi data-data yang kamu berikan. Jika data yang kamu berikan sudah valid,
            tombol <span>"Daftar Domain Web"</span> akan berubah menjadi dapat diklik. Klik tombol tersebut untuk mendaftarkan domain web
            yang kamu inginkan. </p>
            <p>5. Ajak juga kelima temanmu ini untuk menyebarkan kabar baik ini ke teman-teman online shop lainnya, agar mereka juga bisa menikmati domain gratis!<br>
            Keputusan tim Instashop adalah mutlak dan tidak dapat diganggu gugat. Untuk pertanyaan lebih lanjut, silakan hubungi CS Instashop ya:)</p>
        </section>
        <script src="<?=STATIC_HOST?>/js/base/require-zepto.js"></script>
        <!--<script src="<?=STATIC_HOST?>/js/base/require-config.js"></script>-->
        <script src="<?=STATIC_HOST?>/js/dist/app/act/domainname.js?v=1488354333068"></script>
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
