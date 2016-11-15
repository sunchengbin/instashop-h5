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
    <?=STATIC_DNS?>
    <?=STATIC_ICO_CSS?>
    <?=STATIC_FONT_CSS?>
    <link href="<?=STATIC_HOST?>/css/dist/app/decorate.css?v=1478407361226" rel="stylesheet"/>
    <title>选择新建模板</title>
    <style>
        button{
           display: block;
           width: 200px;
           height: 40px;
           line-height: 40px;
           background-color: #43CB9C;
           margin-top: 10px;
           color: #fff;
           font-size: 16px;
           border-radius: 2px;
        }
    </style>
</head>
<body>
    <nav class="decorate-sample-tab">
        <ul class="flex-container">
            <li class="flex-avg decorate-sample-tab-item decorate-sample-tab-active" data-tabid="imageads">Image ads</li>
            <li class="flex-avg decorate-sample-tab-item" data-tabid="navigation">navigation</li>
            <li class="flex-avg decorate-sample-tab-item" data-tabid="recommended">Recommended</li>
        </ul>
    </nav>
    <div class="decorate-sample-panel">
        <div class="decorate-sample-panel-content" id="imageads">
            <section>
                <p><span>Image ads</span></p>
                <div class="decorate-sample-block flex-container j_model_type" data-type="static_banner">
                    The picture scale is not limited
                </div>
            </section>
            <section>
                <p><span>Rotate ads</span></p>
                <div class="decorate-sample-block flex-container j_model_type" data-type="rotate_banner">The picture scale is not limited</div>
            </section>
            <section>
                <p><span>Two columns of ads</span></p>
                <div class="flex-container decorate-sample-items">
                    <div class="flex-container j_model_type" data-type="two_list_banner">
                        Picture ratio 1:1
                    </div>
                    <div class="flex-container j_model_type" data-type="two_list_banner">
                        Picture ratio 1:1
                    </div>
                </div>
            </section>
        </div>
        <div class="decorate-sample-panel-content" id="navigation">
            <section>
                <p><span>Image ads</span></p>
                <div class="decorate-sample-block flex-container j_model_type" data-type="img_navigation">
                    <div class="decorate-sample-navigation-item"></div>
                    <div class="decorate-sample-navigation-item"></div>
                    <div class="decorate-sample-navigation-item"></div>
                    <div class="decorate-sample-navigation-item"></div>
                    <div class="decorate-sample-navigation-txt">Navigation1</div>
                    <div class="decorate-sample-navigation-txt">Navigation2</div>
                    <div class="decorate-sample-navigation-txt">Navigation3</div>
                    <div class="decorate-sample-navigation-txt">Navigation4</div>
                </div>
            </section>
            <section>
                <p><span>Rotate ads</span></p>
                <div class="decorate-sample-block j_model_type" data-type="text_navigation">
                    <ul>
                        <li>Navigation1</li>
                        <li>Navigation2</li>
                        <li>More...</li>
                    </ul>
                </div>
            </section>
        </div>
        <div class="decorate-sample-panel-content" id="recommended">
            <section>
                <p><span>Two-column type</span></p>
                <div class="decorate-sample-block j_model_type" data-type="two_li_items">
                    <ul class="items-list flex-container">
                        <li>
                            <div class="item-info j_item_info" href="javascript:;">
                                <div class="lazy">
                                </div>
                                <p class="title">82金额不我的心的感谢和的的的的的</p>
                                <p class="price">Rp 352.786</p>
                            </div>
                        </li>
                        <li>
                            <div class="item-info j_item_info" href="javascript:;">
                                <div class="lazy">
                                </div>
                                <p class="title">82金额不我的心的感谢和的的的的的</p>
                                <p class="price">Rp 352.786</p>
                            </div>
                        </li>

                    </ul>
                </div>
            </section>
            <section>
                <p><span>Gambar besar</span></p>
                <div class="decorate-sample-block flex-container j_model_type" data-type="big_img_item">
                    <div>
                    </div>
                    <p class="title">82金额不我的心的感谢和的的的的的sdfsfsdfsdfsdfsdfsfdfs</p>
                    <p class="price">Rp 352.786</p>
                </div>
            </section>
            <section>
                <p><span>Jenis daftar</span></p>
                <div class="decorate-sample-block j_model_type" data-type="list_items">
                    <ul class="items-list">
                        <li>
                            <div class="item-info j_item_info"  href="javascript:;">
                            </div>
                            <div>
                                <p class="title">82金额不我的</p>
                                <p class="title">asfsdfdffasdfsfdfsfds</p>
                                <p class="price">Rp 352.786</p>
                            </div>
                        </li>
                        <li>
                            <div class="item-info j_item_info"  href="javascript:;">
                            </div>
                            <div>
                                <p class="title">82金额不我的</p>
                                <p class="title">82金额sdfsfsdfsdf不我的</p>
                                <p class="price">Rp 352.786</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>

        </div>
    </div>
    <script src="<?=STATIC_HOST?>/js/base/require-zepto.js"></script>
    <!--<script src="<?=STATIC_HOST?>/js/base/require-config.js"></script>-->
    <script src="<?=STATIC_HOST?>/js/dist/app/modeltype.js?v=1478407361226"></script>
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