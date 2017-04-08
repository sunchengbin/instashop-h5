<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no"/>
  <meta content="telephone=no" name="format-detection"/>
  <meta name="apple-touch-fullscreen" content="yes"/>
  <meta name="apple-mobile-web-app-capable" content="yes"/>
  <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
  <title>{$BARGAIN_INVITE_DETAIL.bargain_info.title}</title> 
    <meta property="og:description" content="Hi, aku lagi ikutan promo tawar {$BARGAIN_INVITE_DETAIL.bargain_info.title}  sampai Rp {$BARGAIN_INVITE_DETAIL.bargain_info.title|priceFormat} nih! Bantu aku tawar yuk. Klik " />
    {$STATIC_DNS}
    {$STATIC_ICO_CSS}
    {$STATIC_FONT_CSS}
    {$INDEX_TITLE}
    {if $IS_DEBUG}
        <link href="{$STATIC_HOST}/css/app/{$INDEX_CSS_NAME}.css?v=1491642361837" rel="stylesheet"/>
    {else}
        <link id="j_page_index_css" data-url="/css/dist/app/{$INDEX_CSS_NAME}.css?v=1491642361837" href="{$STATIC_HOST}/css/dist/app/{$INDEX_CSS_NAME}.css?v=1491642361837" rel="stylesheet"/>
    {/if}
</head>
<style>
    html,
    body {
        background: #F5F5F5;
    }
    
    header {
        {*height: 16.6rem;*}
        background: #FF7400;
    }
    
    .bargain-header-top {
        {*height: 6.8rem;*}
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
        color: #666666;
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
    
    .bargain-list .content .item .friend-help-price {
        color: #F6A623;
    }
</style>

<body>
    <!--邀请头-->
    <header>
        <div class="bargain-header-top">
            <img src="{$STATIC_HOST}/images/app/bargain-header.png" alt="">
            <div class="bargain-header-avatar">
                <img src="{$BARGAIN_INVITE_DETAIL.buyer_info.pic}" alt="">
            </div>
        </div>
        <div class="bargain-header-desc">
            {*无法砍价 已经买了 bargain_bought_num == 0 *}
            {if $BARGAIN_INVITE_DETAIL.bargain_bought_num gt 0 } 
                Terima kasih untuk bantuan teman-teman semua.<br>Sekarang aku sudah bisa belanja {$BARGAIN_INVITE_DETAIL.bargain_info.title} dengan harga Rp {$BARGAIN_INVITE_DETAIL.last_buy.discount_price|priceFormat}!
            {else}
                {if $BARGAIN_INVITE_DETAIL|confirmIsReachBasepirce}
                    {*无法砍价 已经砍到底价了 item.min_price - bargain_result == base_price *}
                    Terima kasih untuk bantuan teman-teman semua.<br>Sekarang aku sudah bisa belanja hemat dengan harga Rp {$BARGAIN_INVITE_DETAIL.bargain_info.base_price|priceFormat}!
                {else}
                    {*可以砍价 已经坎到了多少价*}
                    Aku lagi ikutan promo tawar {$BARGAIN_INVITE_DETAIL.bargain_info.title} sampai Rp {$BARGAIN_INVITE_DETAIL.bargain_info.base_price|priceFormat} nih.<br>Harga saat ini {$BARGAIN_INVITE_DETAIL|getAfterBargainPrice}.<br>Yuk bantu aku tawar lagi! 
                {/if}
            {/if}
            
        </div>
    </header>
    <!--商品信息-->
    <div class="bargain-good-detail">
        <!--商品图-->
        <div class="">
            <img src="{$BARGAIN_INVITE_DETAIL.item_info.img|item_img}" alt="">
        </div>
        <!--描述-->
        <div class="desc">
            <p>
                {$BARGAIN_INVITE_DETAIL.item_info.item_comment|nl2br}
            </p>
            <p class="price">
            </p>
            <div class="">
                {*判断活动是否被删除 商品是否下架 删除 *}
                {if $BARGAIN_INVITE_DETAIL|checkBargainLegal}
                        <button class="j_bargain_btn_invite_help ins-btn-gray" data-overdue="1" type="">Bantu {$BARGAIN_INVITE_DETAIL.buyer_info.name} Tawar</button>
                        <button class="j_bargain_btn_invite_self ins-btn-gray" data-overdue="1" type="">Mau Beli Juga</button>
                {else}
                    {*判断是否到期*}
                    {if $BARGAIN_INVITE_DETAIL.bargain_info|checkIsBargainOverdue}
                        <button class="j_bargain_btn_invite_help ins-btn-gray" data-overdue="1" type="">Bantu {$BARGAIN_INVITE_DETAIL.buyer_info.name} Tawar</button>
                        <button class="j_bargain_btn_invite_self ins-btn-gray" data-overdue="1" type="">Mau Beli Juga</button>
                    {else}
                        {if $BARGAIN_INVITE_DETAIL.bargain_bought_num gt 0 }
                        {else}
                            {*是否到底价*}
                            {if $BARGAIN_INVITE_DETAIL|confirmIsReachBasepirce}
                            {else}
                                <button class="j_bargain_btn_invite_help" type="">Bantu {$BARGAIN_INVITE_DETAIL.buyer_info.name} Tawar</button>
                            {/if}
                                
                        {/if}
                        <button class="j_bargain_btn_invite_self" type="">Mau Beli Juga</button>
                    {/if}
                {/if}

                
                
            </div>
        </div>
    </div>
    <!--排行榜-->
    {if $BARGAIN_INVITE_DETAIL.bargain_detail}
    <div class="bargain-list">
        <div class="title">
            Penawarku
        </div>
        <div class="content">
            <ul>
                {foreach $BARGAIN_INVITE_DETAIL.bargain_detail as $bargain_friend name=friends}
                <li class="item">
                    <span>{$smarty.foreach.friends.index+1} </span>
                    <div class="avatar">
                        <img src="{$bargain_friend.buyer_info.pic}" alt="">
                    </div>
                    <span>{$bargain_friend.buyer_info.name}</span>
                    <span class="friend-help-price fr">- Rp {$bargain_friend.bargain_price|priceFormat}</span>
                </li>
                {/foreach}
            </ul>
        </div>
    </div>
    {/if}
</body>
<script>
    var init_data = {$INDEX_DATA_STR};
    var user_info = {$INDEX_USER_INFO};
</script>
{include file="footer.tpl"}