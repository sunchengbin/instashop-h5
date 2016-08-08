<!DOCTYPE html>
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
  <title>user test</title>
</head>
<script>
    var startTime = (new Date).getTime(),
        domLoadTime = 0,
        onloadTime = 0,
        cdnjsTime = 0;
        console.log('startTime'+(new Date).getTime());

    if ( document.addEventListener ) {//dom数加载完之后执行
        document.addEventListener( "DOMContentLoaded", function(){

            domLoadTime = (new Date).getTime();
            imgLoadTime();
            console.log('domLoad'+(new Date).getTime());
        }, false );
    }
    window.onload = function(){//所有图片外链都加载完之后去执行
        onloadTime = (new Date).getTime();
        showTimes();
        instaImgLoadTime();
        console.log('load'+(new Date).getTime());
    }
    function showTimes(){
        _htm = 'startTime: '+startTime+'</br>'+'cdnjsTime: '+cdnjsTime+'</br>'+'domLoadTime: '+domLoadTime+'</br>'+'loadTime: '+onloadTime;
        document.querySelector('.j_show_info p').innerHTML = _htm;
    }
    function imgLoadTime(){
        var img = new Image();
        document.querySelector('.j_img_info p').innerHTML = 'imgStart: '+(new Date()).getTime();
        console.log('imgStart'+(new Date()).getTime())
        img.src = 'http://imghk0.geilicdn.com/test_instashop40780-1470220982299-1.jpg?w=110&h=110&cp=1';
        img.onload = function(){
            console.log('imgLoad'+(new Date()).getTime())
            document.querySelector('.j_img_info p').innerHTML += '</br>imgLoad: '+(new Date()).getTime();
        };
        img.onerror= function(){

        };
    }
    function instaImgLoadTime(){
            var img = new Image();
            document.querySelector('.j_insta_img_info p').innerHTML = 'instagramImgStart: '+(new Date()).getTime();
            console.log('imgStart'+(new Date()).getTime())
            img.src = 'https://scontent-nrt1-1.cdninstagram.com/t51.2885-15/e35/1208365_1725776744330480_728632033_n.jpg';
            img.onload = function(){
                console.log('imgLoad'+(new Date()).getTime())
                document.querySelector('.j_insta_img_info p').innerHTML += '</br>instagramImgLoad: '+(new Date()).getTime();
            };
            img.onerror= function(){

            };
        }
</script>
<style>
    *{
        padding:0;
        margin:0;
    }
    header{
        height:40px;
        line-height:40px;
        background-color:#43cb9c;
        color:#fff;
        font-size:14px;
        text-align:center;
    }
    section > p{
        font-size:14px;
        color:#333;
        padding:20px 10px 0;
        line-height:20px;
    }
</style>
<body>
    <?php
        include_once( dirname(__FILE__).'/../html/router/util.php' );
        $params = [
            'action' => 'index',
            'page_size' => 10,
            'last_id' => '',
            'json' => '0'
        ];
        $seller_id = $_REQUEST['seller_id'];
        if (!$seller_id) {
            $ss = split('\/', $_SERVER['REQUEST_URI']);
            if(split('\?', $_SERVER['REQUEST_URI']).length > 0){
                $si = split('\?',end($ss))[0];
                $seller_id = $si;
            }else{
                $seller_id = end($ss);
            }
        }
        $path = 'v1/shops/'.$seller_id;
        $ret = get_init_php_data($path, $params);
        $json = json_decode($ret, true);
        echo '<header>'.$json["code"].'</header>';
    ?>
    <section class="j_img_info">
        <p></p>
    </section>
    <section class="j_insta_img_info">
            <p></p>
        </section>
    <section class="j_show_info">
        <p>loading...</p>
    </section>
    <script src="<?=STATIC_HOST?>/js/app/usertest.js?v=1470654301890"></script>
</body>
</html>