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

    <title>Kreasikan Tokomu</title>
    <style>
        button{
            background-color: #333;
            color:#fff;
            border:none;
            padding:10px 20px;
        }
    </style>
</head>
<body>
    <button class="j_btn">get_seller_info</button>
    <script src="<?=STATIC_HOST?>/js/base/require-zepto.js"></script>
    <script src="<?=STATIC_HOST?>/js/base/require-config.js"></script>
    <script>
    alert(loaction.href);
    require(['insjs','fastclick'],function(Insjs,FastClick){
        Insjs.WebOnReady(function(bridge){
            handelFn(bridge);
        },function(){
            handelFn();
        });
        function handelFn(bridge){
            $('body').on('click','.j_btn',function(){
                var _param = {
                    param:{
                        type:'get_seller_info',
                        param : null
                    }
                };
                bridge.callHandler('insSocket',_param, function(data) {
                    return null;
                });
            });
            alert(localStorage.getItem('TEST'));
            localStorage.setItem('TEST','hello world');
            registerFn(bridge);
        }
        function registerFn(bridge){//对native内容监控
            bridge.registerHandler('registerSocket', function(data, responseCallback) {
                alert(data)
                alert(JSON.parse(data).result.data.wduss)
                alert(JSON.parse(data).result.data.seller_id)
            });
        }

    })
    </script>
</body>
</html>