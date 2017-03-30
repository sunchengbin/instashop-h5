<!DOCTYPE html>
<?php
include_once( dirname(__FILE__).'/../../../html/router/common.php');
?>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1, minimum-scale=1.0, maximum-scale=1.0,user-scalable=no">
        <meta http-equiv="pragma" content="no-cache">
        <meta http-equiv="cache-control" content="no-cache">
        <meta http-equiv="expect" content="0">
        <meta name="format-detection" content="telephone=no" />
        <?=STATIC_DNS?>
            <?=STATIC_ICO_CSS?>
                <?=STATIC_FONT_CSS?>
                    <?php
        if(isDebug()){
            echo '<link href="'.STATIC_HOST.'/css/app/bargaininvite.css?v=1490338931741" rel="stylesheet"/>';
        }else{
            echo '<link href="'.STATIC_HOST.'/css/dist/app/bargaininvite.css?v=1490338931741" rel="stylesheet"/>';
        }
     ?>
                        <style>
                            html,
                            body {
                                background: #F5F5F5;
                            }
                            
                            header {
                                height: 16.6rem;
                                background: #FF7400;
                            }
                            
                            .bargain-header-top {
                                height: 6.8rem;
                                width: 100%;
                                position: relative;
                            }
                            
                            .bargain-header-avatar {
                                width: 6rem;
                                height: 6rem;
                                box-sizing: border-box;
                                border-radius: 100%;
                                border: 2px solid #ffffff;
                                position: absolute;
                                left: 0;
                                right: 0;
                                top: 1.75rem;
                                overflow: hidden;
                                margin: 0 auto;
                            }
                            
                            .bargain-header-desc {
                                width: 100%;
                                padding: 0 2.9rem;
                                margin-top: 2rem;
                                box-sizing: border-box;
                                color: #FFEAC6;
                                font-size: 14px;
                                text-align: center;
                            }
                            
                            .bargain-good-detail {
                                background: #ffffff;
                            }
                            
                            .bargain-good-detail .desc {
                                color: #666666;
                                font-size: 14px;
                                padding: 1.5rem;
                                box-sizing: border-box;
                            }
                            
                            .bargain-good-detail .price {
                                font-size: 20px;
                                color: #F6A623;
                                box-sizing: border-box;
                                padding: 0.8rem 0;
                            }
                            
                            .bargain-good-detail .price span {
                                font-size: 14px;
                                color: #F6A623;
                                opacity: 0.5;
                                box-sizing: border-box;
                                vertical-align: middle;
                            }
                            
                            .bargain-good-detail button {
                                width: 90%;
                                height: 4rem;
                                line-height: 4rem;
                                text-align: center;
                                font-size: 14px;
                                background: #F5A623;
                                border-radius: 2px;
                                margin: 0 auto;
                                display: block;
                                margin-bottom: 0.75rem;
                                color: #ffffff;
                            }
                            
                            .bargain-good-detail button:last-child {
                                background: #FF7400;
                            }
                            
                            .bargain-list {
                                margin-top: 1.05rem;
                                background: #ffffff;
                            }
                            
                            .bargain-list .title {
                                height: 4.5rem;
                                line-height: 4.5rem;
                                text-align: left;
                                padding: 0 1.45rem;
                                font-weight: 400;
                                font-size: 16px;
                                color:#666666;
                            }
                            
                            .bargain-list .content .item {
                                height: 6rem;
                                line-height: 6rem;
                                padding: 0 1.75rem;
                                color: #666666;
                                font-size: 14px;
                                position: relative;
                            }
                            
                            .bargain-list .content .item:after {
                                position: absolute;
                                content: " ";
                                height: 1px;
                                background: #d8d8d8;
                                width: 100%;
                                left: 0;
                                right: 0;
                                top: 0;
                            }
                            
                            .bargain-list .content .item .avatar {
                                width: 3.5rem;
                                height: 3.5rem;
                                border-radius: 100%;
                                overflow: hidden;
                                display: inline-block;
                                vertical-align: middle;
                            }
                            
                            .bargain-list .content .item .avatar img {
                                width: 100%;
                                height: 100%;
                                vertical-align: initial;
                            }
                            
                            .bargain-list .content .item .price {
                                color: #F6A623;
                            }
                        </style>
    </head>

    <body>
        <!--邀请头-->
        <header>
            <div class="bargain-header-top">
                <img src="./images/bargain-header.png" alt="">
                <div class="bargain-header-avatar">
                    <img src="http://graph.facebook.com/732398890274398/picture" alt="">
                </div>
            </div>
            <div class="bargain-header-desc">
                Saya berpartisipasi dalam Rp100.000 ambil kegiatan iPhone, telah Kandao Rp180.000, Datang dan terus membantu saya memotongnya!
            </div>
        </header>
        <!--商品信息-->
        <div class="bargain-good-detail">
            <!--商品图-->
            <div class="">

            </div>
            <!--描述-->
            <div class="desc">
                <p>
                    Tampaknya kode verifikasi membutuhkan waktu lebih lama, apakah kamu ingin mengirim ulang kode? Unofficially, they’re like
                    the antithetical third day of the acknowledged-by-the-Gregorian-calendar-we-know. Kirim kode verifikasi
                    melalui pesan suara Kirim melalui pesan suara Tampaknya pengiriman kode verifikasi membutuhkan waktu
                    lebih lama, apakah kamu ingin mengirim ulang kode?
                </p>
                <p class="price">
                    Rp 100.000 <span> Rp 200.000</span>
                </p>
                <div class="">
                    <button class="" type="">Bantuan chanue murah</button>
                    <button class="" type="">Saya harus membeli Rp100.000！</button>
                </div>
            </div>
        </div>
        <!--排行榜-->
        <div class="bargain-list">
            <div class="title">
                Teman daftar murah
            </div>
            <div class="content">
                <ul>
                    <li class="item">
                        <span>1 </span>
                        <div class="avatar">
                            <img src="http://graph.facebook.com/732398890274398/picture" alt="">
                        </div>
                        <span>chenghaolan</span>
                        <span class="price fr">- Rp 100.000</span>
                    </li>
                    <li class="item">
                        <span>2 </span>
                        <div class="avatar">
                            <img src="http://graph.facebook.com/732398890274398/picture" alt="">
                        </div>
                        <span>vic</span>
                        <span class="price fr">- Rp 100.000</span>
                    </li>
                </ul>
            </div>
        </div>
    </body>

    </html>