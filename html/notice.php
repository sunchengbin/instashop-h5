
<?php
include_once( dirname(__FILE__).'/../html/router/common.php');
include_once( dirname(__FILE__).'/../html/router/util.php' );
$notice_id = $_REQUEST['notice_id'];
if (!$notice_id) {
    $ss = split('\/', $_SERVER['REQUEST_URI']);
    $notice_id = end($ss);
}
$path = 'v1/notice/'.$notice_id;
$ret = get_init_php_data($path, '');
$json = json_decode($ret, true);
$content = trim($json['notice']['content']);
if(preg_match('/^https?\:\/\/[^\s]+$/i',$content)){
  header('location:'.$content);
  exit;
}
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
      font: 1.2rem/1.5 'Myriad Set Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      color:#333;
  }
  section{
    font-size:1.4rem;
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
  p{

  }
  </style>
  <?php
          echo '<title>'.$json['notice']['title'].'</title>';
          echo '</head>';
          echo '<body>';
          echo '<section>'.$json['notice']['content'].'</section>';
      ?>


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
