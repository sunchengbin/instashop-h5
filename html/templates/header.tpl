<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no"/>
  <meta content="telephone=no" name="format-detection"/>
  <meta name="apple-touch-fullscreen" content="yes"/>
  <meta name="apple-mobile-web-app-capable" content="yes"/>
  <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
  {$STATIC_DNS}
  {$STATIC_ICO_CSS}
  {$STATIC_FONT_CSS}
  {$INDEX_TITLE}
  <script>
  {$FLEXIBLE}
  </script>
  {if $IS_DEBUG}
    <link href="{$STATIC_HOST}/css/{$TEMP_FOLDER}app/{$INDEX_CSS_NAME}{$CSS_DEBUG}.css?v=1488795292840" rel="stylesheet"/>
  {else}
    <link href="{$STATIC_HOST}/css/dist/{$TEMP_FOLDER}app/{$INDEX_CSS_NAME}{$CSS_DEBUG}.css?v=1488795292840" rel="stylesheet"/>
  {/if}
</head>
