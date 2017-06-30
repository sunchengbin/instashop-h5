{include file="header.tpl"}
<body data-spider="h2suioqg">
{if $INDEX_DATA.code eq 420402}
<div class="no-exists">
    <img src="{$STATIC_HOST}/images/app/404.png" />
    <p>Produk tidak ditemukan!</p>
</div>
{else}
    {if $INDEX_DATA.item.status eq 3} {*商品已下架无法购买*}
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
        {if $INDEX_DATA.code eq 200}
        <nav class="shop-header-nav clearfix" data-spider="header-nav">
            <div class="fr">
                <button class="j_cart_wraper" data-url="{$HOST_NAME}/html/distributorcart.php?{$SEARCH_URL}">
                    {if $CART_NUM neq 0}
                    <span class="cart-num">{$CART_NUM}</span>
                    {/if}
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
            <div class="info-box" data-spider="shop-info-box">
                <p class="title">
                    {$INDEX_DATA.item.item_comment|nl2br}
                </p>
                {if $INDEX_DATA.item.is_discount}
                    {if $INDEX_DATA.item.discounting}
                        {if $INDEX_DATA.item.discount.discount_type eq "percent"}
                            {if $INDEX_DATA.item.discount.max_discount_price eq $INDEX_DATA.item.discount.min_discount_price}
                                <p class="discount-price">Rp {$INDEX_DATA.item.discount.min_discount_price|priceFormat}</p>
                            {else}
                                <p class="discount-price">Rp {$INDEX_DATA.item.discount.min_discount_price|priceFormat}-{$INDEX_DATA.item.discount.max_discount_price|priceFormat}</p>
                            {/if}
                        {else}
                            <p class="discount-price">Rp {$INDEX_DATA.item.discount.price|priceFormat}</p>
                        {/if}
                    {else}
                        <p class="discount-price">Rp {$INDEX_DATA.item.discount.price|priceFormat}</p>
                    {/if}
                    {if $INDEX_DATA.item.discount.min_price eq $INDEX_DATA.item.discount.max_price}
                        <p class="price-lang">Rp {$INDEX_DATA.item.discount.min_price|priceFormat}</p>
                    {else}
                        <p class="price-lang">Rp {$INDEX_DATA.item.discount.min_price|priceFormat} - {$INDEX_DATA.item.discount.max_price|priceFormat}</p>
                    {/if}
                    </p>
                {else}
                    {if $INDEX_DATA.item.drop_prices}
                        <p class="price bargain-price">
                           {$INDEX_DATA.item.drop_price|priceFormat}
                        </p>
                    {else}
                        {if $INDEX_DATA.item.bargain}
                            <p class="price bargain-price">
                                {$INDEX_DATA.item|itemPrice}
                            </p>
                        {else}
                            <p class="price discount-price">
                                {$INDEX_DATA.item|itemPrice}
                            </p>
                        {/if}
                    {/if}
                    {if $INDEX_DATA.item.drop_prices|count gt 1}
                    <ul class="combination-price">
                        <li flex="box:mean">
                            <div>Jumlah</div>
                            <div>Grosir</div>
                        </li>
                        {foreach $INDEX_DATA.item.drop_prices as $drop_price}
                            <li flex="box:mean">
                                <div>
                                    {if $drop_price.max_num eq 0}
                                        ≥{$drop_price.min_num}
                                    {else}
                                        {$drop_price.min_num} ~ {$drop_price.max_num}
                                    {/if}
                                </div>
                                <div>
                                    {$drop_price.price|priceFormat}
                                </div>
                            </li>
                        {/foreach}
                    </ul>
                    {/if}
                {/if}
                <a href="javascript:;" data-url="{$INDEX_DATA.item.shop.url}" spm-auto="去首页" spm-click="go-home" class="go-shop j_shop_info">
                    <div class="clearfix shop-info">
                        <img class="fl" src="{$INDEX_DATA.item.shop.logo}" />
                        <p>{$INDEX_DATA.item.shop.name}</p>
                        {if $SHOP_INFO_DATA.realinfo.location.vicinity neq ''}
                        <span><i class="icon iconfont icon-shop-font"></i>Ada Outlet</span>
                        {/if}
                        {if $INDEX_DATA.item.shop.warrant_flag == 1}
                        <i class="icon iconfont icon-secured"></i>
                        {/if}
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
            <div class="index-btn-box"></div>
        </section>
        <section class="buy-box" data-spider="foot-nav">
            {if $INDEX_DATA.item.shop.line_url}
                {if $INDEX_DATA.item.shop.phone}
                <a href="javascript:;" data-type="all" flex="main:center cross:center" spm-auto="联系卖家" spm-click="get-contact" class="j_show_contact ser-box fl">
                    <div>
                    <i class="icon iconfont icon-news-font"></i>
                    <p>Kontak</p>
                    </div>
                </a>
                {if $INDEX_DATA.item.stock le 0}
                    <div class="clearfix buy-btns  have-contact">
                {else}
                    {if $INDEX_DATA.item.status eq 2}
                        <div class="clearfix buy-btns  have-contact">
                    {else}
                        <div class="clearfix buy-btns have-contact">
                    {/if}
                {/if}
            {else}
                <a href="javascript:;" spm-auto="联系卖家" flex="main:center cross:center" spm-click="get-line" class="ser-box fl block j_goto_line">
                    <div>
                    <i class="icon iconfont icon-news-font"></i>
                    <p>Kontak</p>
                    </div>
                </a>
                {if $INDEX_DATA.item.stock le 0}
                    <div class="clearfix buy-btns  have-contact">
                {else}
                    {if $INDEX_DATA.item.status eq 2}
                        <div class="clearfix buy-btns  have-contact">
                    {else}
                        <div class="clearfix buy-btns have-contact">
                    {/if}
                {/if}
            {/if}
            {else}
                {if $INDEX_DATA.item.shop.phone}
                    <a href="javascript:;" data-type="tel" flex="main:center cross:center" spm-auto="联系卖家" spm-click="get-contact" class="j_show_contact ser-box fl">
                        <div>
                        <i class="icon iconfont icon-news-font"></i>
                        <p>Kontak</p>
                        </div>
                    </a>
                    {if $INDEX_DATA.item.stock le 0 || $INDEX_DATA.item.status eq 2}
                        <div class="clearfix buy-btns  have-contact">
                    {else}
                        {if $INDEX_DATA.item.status eq 2}
                            <div class="clearfix buy-btns  have-contact">
                        {else}
                            <div class="clearfix buy-btns have-contact">
                        {/if}
                    {/if}
                {else}
                    {if $INDEX_DATA.item.stock le 0}
                        <div class="clearfix buy-btns">
                    {else}
                        {if $INDEX_DATA.item.status eq 2}
                            <div class="clearfix buy-btns ">
                        {else}
                            <div class="clearfix buy-btns">
                        {/if}
                    {/if}
                {/if}
            {/if}
            {if $INDEX_DATA.item.stock le 0}
                <a class="add-cart j_save_imgs" data-id="{$INDEX_DATA.item.id}" href="javascript:;" spm-auto="添加购物车" spm-click="itemId={$INDEX_DATA.item.id},sellerId={$INDEX_DATA.item.shop.id}" >
                Simpan ke galeri
                </a>
                <a href="javascript:;" class=" disable-btn" spm-auto="立即购买" spm-click="itemId={$INDEX_DATA.item.id},sellerId={$INDEX_DATA.item.shop.id}" >
                {if $INDEX_DATA.item.status eq 2}
                    Sudah Digudangkan
                {else}
                    Stok Habis
                {/if}
                </a>
            {else}
                {if $INDEX_DATA.item.status eq 2}
                    <a class="add-cart j_save_imgs" data-id="{$INDEX_DATA.item.id}" href="javascript:;" spm-auto="添加购物车" spm-click="itemId={$INDEX_DATA.item.id},sellerId={$INDEX_DATA.item.shop.id}" >
                    Simpan ke galeri
                    </a>
                    <a href="javascript:;" class=" disable-btn" spm-auto="立即购买" spm-click="itemId={$INDEX_DATA.item.id},sellerId={$INDEX_DATA.item.shop.id}" >
                    Sudah Digudangkan
                    </a>
                {else}
                    <a class="add-cart j_save_imgs" data-id="{$INDEX_DATA.item.id}" href="javascript:;" spm-auto="添加购物车" spm-click="itemId={$INDEX_DATA.item.id},sellerId={$INDEX_DATA.item.shop.id}" >
                    Simpan ke galeri
                    </a>
                    <a href="javascript:;" class="buy-now j_add_cart" data-direct-buy="2" spm-auto="立即购买" spm-click="itemId={$INDEX_DATA.item.id},sellerId={$INDEX_DATA.item.shop.id}" >
                    Beli
                    </a>
                {/if}
            {/if}
        </div>
        </section>
        {else}
        <section class="item-out-stock">
            <i class="icon iconfont icon-error-font"></i>
            <p>Koneksi internet kamu bermasalah, silakan coba lagi</p>
        </section>
        {/if}
    {/if}
{/if}
<script>
var init_data = {$INDEX_DATA_STR};
var shop_info_data = {$SHOP_INFO_DATA_STR};
var user_info = {$INDEX_USER_INFO};
</script>
{include file="footer.tpl"}