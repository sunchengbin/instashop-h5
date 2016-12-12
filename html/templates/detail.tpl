{include file="header.tpl" title="My Page Title"} {if $INDEX_DATA.code eq 420402}
<div class="no-exists">
    <img src="{$STATIC_HOST}/images/app/404.png" />
    <p>Produk tidak ditemukan!</p>
</div>
{else} {if $INDEX_DATA.item.status eq 3} {*商品已下架无法购买*}
<section class="item-out-stock">
    <i class="icon iconfont icon-error-font"></i>
    <p>Maaf, produk ini telah habis terjual</p>
    <p><a href="{$INDEX_DATA.item.shop.url}?item=back" class="btn confirm-btn b-btn">Beli Lagi</a></p>
</section>
{elseif $INDEX_DATA.item.status eq 4}
<div class="no-exists">
    <img src="{$STATIC_HOST}/images/app/404.png" />
    <p>Produk tidak ditemukan!</p>
</div>
{else}
<nav class="shop-header-nav clearfix">
    <div class="fl">
        <button class="j_go_back">
                    <i class="icon iconfont icon-back-font"></i>
                </button>
        <div class="btn-cover"></div>
    </div>
    <div class="fr">
        <button class="j_cart_wraper" data-url="{$HOST_NAME}/html/cart.php">
                    <i class="icon iconfont icon-cart-font"></i>
                </button>
        <div class="btn-cover"></div>
    </div>
</nav>
<section class="item-info">
    <div class="banner-box">
        <ul class="item-banner j_banner clearfix">
            {foreach $INDEX_DATA.item.imgs as $banner_img}
            <li data-num="{$banner_img@index}" data-src="{$banner_img|viewerImg}"><img data-img="{$banner_img|item_img}" src="" /></li>
            {/foreach}
        </ul>
    </div>
    <div class="info-box">
        <p class="title">
            {$INDEX_DATA.item.item_comment|nl2br}
        </p>
        {if $INDEX_DATA.item.is_discount} {if $INDEX_DATA.item.discounting}
        <p class="price discount-price">
            Rp {$INDEX_DATA.item.discount.price|priceFormat}
        </p>
        {else}
        <p class="price discount-price">
            Rp {$INDEX_DATA.item.discount.price|priceFormat}
        </p>
        {/if} {if $INDEX_DATA.item.discount.min_price eq $INDEX_DATA.item.discount.max_price}
        <p class="price-lang">Rp {$INDEX_DATA.item.discount.min_price|priceFormat}</p>
        {else}
        <p class="price-lang">Rp {$INDEX_DATA.item.discount.min_price|priceFormat} - {$INDEX_DATA.item.discount.max_price|priceFormat}</p>
        {/if}
        <p class="discount-info">
            <span>-{$INDEX_DATA.item.discount.value|abs}%</span>
            {if $INDEX_DATA.item.discounting} Time remaining :
            <span data-time="{$INDEX_DATA.item.discount.end_time|discountSecond}">{$INDEX_DATA.item.discount.end_time|discountTime}</span>
           {else} Start time {$INDEX_DATA.item.discount.start_time|transDate} WIB {/if}
        </p>
        {else}
        <p class="price discount-price">
            {$INDEX_DATA.item|itemPrice}
        </p>
        {/if} 
        {if $INDEX_DATA.item.shop.shop_discount}
        <section class="reduc-box-line">
            <div class="reduc-box-wrap j_reduc_box">
                <i class="iconfont icon-go-font fr reduc-box-go"></i>
                <div>
                    <p class="reduc-box-info">
                        <i class="iconfont icon-bugle"></i> 
                            {foreach $INDEX_DATA.item.shop.shop_discount.info as $keyvar=>$item} 
                                {if $keyvar eq 0}
                                    Minimal Pembelian Rp {$item.condition_price|priceFormat} Potongan Rp {$item.discount_price|priceFormat} 
                                {else}
                                    , Minimal Pembelian Rp {$item.condition_price|priceFormat} Potongan Rp {$item.discount_price|priceFormat}
                                {/if}
                            {/foreach}
                    </p>
                    <p class='reduc-expire'>
                        {$INDEX_DATA.item.shop.shop_discount.start_time|dateFormat} - {$INDEX_DATA.item.shop.shop_discount.end_time|dateFormat} WIB
                    </p>
                </div>
            </div>
        </section>
        {/if}
        <a href="javascript:;" data-url="{$INDEX_DATA.item.shop.url}" class="go-shop j_shop_info">
            <div class="clearfix shop-info">
                <i class="icon iconfont fr icon-go-font"></i>
                <img class="fl" src="{$INDEX_DATA.item.shop.logo}" />
                <p>{$INDEX_DATA.item.shop.name}</p>
            </div>
        </a>
    </div>
    <div class="shop-explain j_down_box">
        <div>
            <span class="top-angle"></span>
            <div class="txt">
                {if $INDEX_DATA.item.shop.note} {$INDEX_DATA.item.shop.note|nl2br} {else} Selamat datang di mini websiteku {/if}
            </div>
            <div class="txt-hide">
                {$INDEX_DATA.item.shop.note|nl2br}
            </div>
            <p><i class="icon iconfont j_down_btn down-btn"></i></p>
        </div>
    </div>
    <div class="index-btn-box">
        <!--新增3.5 功能点4需求-->
        <div class="btn j_submit_btn confirm-btn">
            <i class="iconfont icon-shop-font"></i>
            <a href="http://www.instashop.co.id/" onclick="trackOutboundLink('http://www.instashop.co.id/'); return false;" target="_self">Buat webstore gratis sekarang!</a>
        </div>
    </div>
</section>
<section class="buy-box">
    {if $INDEX_DATA.item.shop.line_url} {if $INDEX_DATA.item.shop.phone}
    <a href="javascript:;" data-type="all" class="j_show_contact ser-box fl">
        <i class="icon iconfont icon-news-font"></i>
        <p>Kontak</p>
    </a>
    {if $INDEX_DATA.item.stock le 0}
    <div class="clearfix buy-btns no-buy have-contact">
        {else}
        <div class="clearfix buy-btns have-contact">
            {/if} {else}
            <a href="{$INDEX_DATA.item.shop.line_url}" class="ser-box fl">
                <i class="icon iconfont icon-news-font"></i>
                <p>Kontak</p>
            </a>
            {if $INDEX_DATA.item.stock le 0}
            <div class="clearfix buy-btns no-buy have-contact">
                {else}
                <div class="clearfix buy-btns have-contact">
                    {/if} {/if} {else} {if $INDEX_DATA.item.shop.phone}
                    <a href="javascript:;" data-type="tel" class="j_show_contact ser-box fl">
                        <i class="icon iconfont icon-news-font"></i>
                        <p>Kontak</p>
                    </a>
                    {if $INDEX_DATA.item.stock le 0}
                    <div class="clearfix buy-btns no-buy have-contact">
                        {else}
                        <div class="clearfix buy-btns have-contact">
                            {/if} {else} {if $INDEX_DATA.item.stock le 0}
                            <div class="clearfix buy-btns no-buy">
                                {else}
                                <div class="clearfix buy-btns">
                                    {/if} {/if} {/if} {if $INDEX_DATA.item.stock le 0}
                                    <a class="add-cart j_add_cart disable-addnow disable-btn" data-id="{$INDEX_DATA.item.id}" href="javascript:;">
                        Stok Kurang
                    </a> {else}
                                    <a class="add-cart j_add_cart" data-id="{$INDEX_DATA.item.id}" href="javascript:;">
                        Masuk keranjang
                    </a>
                                    <a href="javascript:;" class="buy-now j_buy_btn">
                        Beli sekarang
                    </a> {/if}
                                </div>
</section>
{/if} {/if}
<script>var init_data = {$INDEX_DATA_STR};</script> {include file="footer.tpl"}