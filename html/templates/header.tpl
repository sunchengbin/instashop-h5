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
  {if $IS_DEBUG}
    <link href="{$STATIC_HOST}/css/app/{$INDEX_CSS_NAME}.css?v=1491876500927" rel="stylesheet"/>
  {else}
    <link id="j_page_index_css" data-url="/css/dist/app/{$INDEX_CSS_NAME}.css?v=1491876500927" href="{$STATIC_HOST}/css/dist/app/{$INDEX_CSS_NAME}.css?v=1491876500927" rel="stylesheet"/>
  {/if}
</head>
