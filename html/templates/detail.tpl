{include file="header.tpl" title="My Page Title"}
<body data-spider="h2suioqg">
{if $INDEX_DATA.code eq 420402}
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
<nav class="shop-header-nav clearfix" data-spider="header-nav">
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
    <div class="info-box" data-spider="shop-info-box">
        <p class="title">
            {*砍价活动*}
            {if $INDEX_DATA.item.bargain}
                <a href="#bargain-buyer-intro" class="ins-color-hightlight-blue j_bargain_tip">[Mau beli barang ini seharga Rp {$INDEX_DATA.item.bargain.base_price|priceFormat} rupiah saja? Cuss cek caranya!]</a>
            {/if}
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
            <p class="discount-info">
                <span>-{$INDEX_DATA.item.discount.value|abs}%</span>
            {if $INDEX_DATA.item.discounting} Time remaining :
                <span data-time="{$INDEX_DATA.item.discount.end_time|discountSecond}">{$INDEX_DATA.item.discount.end_time|discountTime}</span>
            {else} Start time {$INDEX_DATA.item.discount.start_time|transDate} WIB 
            {/if}
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

        {*砍价活动功能区begin*}
        {if $INDEX_DATA.item.bargain}
        <div class="j_bargain_tip_unlogin_price">
            Jika kamu sudah berpartisipasi dalam promo "Tawar Harga" ini, <span class="ins-color-hightlight-blue j_user_login">login</span> untuk melihat status terbaru
        </div>
        <div class="ins-btn ins-btn-gray j_bargain_reachbaseprice">
        Sudah Harga Termurah
        </div>
        <div class="ins-btn ins-btn-orange j_bargain_btn_self">
        Tawar Sekarang
        </div>
        <div class="ins-btn ins-btn-orange j_bargain_btn_continue">
        Tawar Lagi
        </div>
        <div class="bargain-friend-list-container">
        </div>
        <p id="bargain-buyer-intro" class="bargain-tip-txt-how">
            Panduan Tawar Harga ?
            <section class="content">
        <h1 id="second-type">Tertarik ikutan promo tawar harga?</h1>
        <h1>Yuk simak caranya:</h1>
        <div>
            <p>1. Klik <strong>"TAWAR PRODUK INI"</strong></p>
            <p>2. Sistem kami akan <strong>menawar harga secara acak</strong>, sehingga <strong>berkurang</strong> dari harga normal. Jika harga sudah berhasil ditawar, kamu akan melihat notifikasi <strong>“Selamat, Kamu Telah Menawar Rp XXX”</strong></p>
            <p>3. Setelah itu, jika kamu ingin menawar harga lagi <strong>hingga mencapai harga terendah</strong>, klik tombol <strong>"TAWAR LAGI”</strong></p>
            <p>4. Setelah klik tombol <strong>“TAWAR LAGI”</strong>, kamu akan diminta untuk login dulu dengan akun LINE / FACEBOOK sebelum melanjutkan</p>
            <p>5. Setelah login berhasil, kamu akan diminta <strong>untuk mengajak teman-temanmu membantu menawar harga dengan jalan membagikan link ajakan ini ke sosial medianya</strong>.</p>
            <p>6. Setelah selesai membagikan ajakan menawar harga ke sosial medianya, kamu akan diminta untuk menuliskan nomor ponsel. Instashop akan menginformasikan melalui SMS setiap kali ada teman yang membantumu menawar.</p>
            <p>7. Tampilan halaman ajakan menawar harga yang dilihat temanmu.</p>
            <p>***Kamu dapat klik tombol <strong>"Bantu XXX Tawar"</strong> untuk membantu menawar harga. Jika harga sudah berhasil ditawar, temanmu akan melihat notifikasi <strong>“Selamat, Kamu Telah Menawar Rp XXX”. Nominal Tawar ditentukan acak oleh sistem, BUKAN diisi sendiri oleh penawar.</strong></p>
            <p>***Harga setelah ditawar ini <strong>HANYA</strong> berlaku bagi <strong>kamu</strong> saja, <strong>BUKAN</strong> untuk teman yang membantumu menawar. </p>
            <p>***<strong>Satu akun Facebook / LINE hanya dapat membantu menawar sebanyak satu kali</strong></p>
            <p>8.Tampilan halaman yang dilihat olehmu ketika harga sudah mencapai harga terendah. Kini kamu dapat berbelanja dengan harga termurah ini SELAGI masih berada dalam batasan waktu yang kamu tentukan.</p>
            <p><strong>Catatan:</strong> Kamu dapat klik “BELI SEKARANG" <strong>kapanpun</strong>, termasuk ketika harga belum mencapai harga terendah sekalipun, asalkan batasan waktu promo belum berakhir. <strong>Jika waktu promo telah berakhir sementara produk belum dibelanjakan</strong>, produk akan dibeli dengan harga normal.</p>
        </div>
    </section>
        </p>
        {/if}



        {*砍价活动功能区end*}
        {include file="preferential.tpl"}
        <a href="javascript:;" data-url="{$INDEX_DATA.item.shop.url}" spm-auto="去首页" spm-click="go-home" class="go-shop j_shop_info">
            <div class="clearfix shop-info">
                <i class="icon iconfont fr icon-go-font"></i>
                <img class="fl" src="{$INDEX_DATA.item.shop.logo}" />
                <p>{$INDEX_DATA.item.shop.name}</p>
                {if $SHOP_INFO_DATA.realinfo.location.vicinity neq ''}
                <span><i class="icon iconfont icon-shop-font"></i>Ada Outlet</span>
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
    <div class="index-btn-box">
        <!--新增3.5 功能点4需求-->
        <div class="btn j_submit_btn confirm-btn" data-spider="set-up-shop">
            <i class="iconfont icon-shop-font"></i>
            <a spm-auto="我也要开店" spm-click="go-home" href="http://www.instashop.co.id/" onclick="trackOutboundLink('http://www.instashop.co.id/'); return false;" target="_self">Buat webstore gratis sekarang!</a>
        </div>
    </div>
</section>
<section class="buy-box" data-spider="foot-nav">
    {if $INDEX_DATA.item.shop.line_url} 
        {if $INDEX_DATA.item.shop.phone}
        <a href="javascript:;" data-type="all" spm-auto="联系卖家" spm-click="get-contact" class="j_show_contact ser-box fl">
            <i class="icon iconfont icon-news-font"></i>
            <p>Kontak</p>
        </a>
        {if $INDEX_DATA.item.stock le 0}
            <div class="clearfix buy-btns no-buy have-contact">
        {else}
            {if $INDEX_DATA.item.status eq 2}
                <div class="clearfix buy-btns no-buy have-contact">
            {else}
                <div class="clearfix buy-btns have-contact">
            {/if}
        {/if} 
    {else}
        <a href="javascript:;" spm-auto="联系卖家" spm-click="get-line" class="ser-box fl block j_goto_line">
            <i class="icon iconfont icon-news-font"></i>
            <p>Kontak</p>
        </a>
        {if $INDEX_DATA.item.stock le 0}
            <div class="clearfix buy-btns no-buy have-contact">
        {else}
            {if $INDEX_DATA.item.status eq 2}
                <div class="clearfix buy-btns no-buy have-contact">
            {else}
                <div class="clearfix buy-btns have-contact">
            {/if}
        {/if} 
    {/if}
    {else} 
        {if $INDEX_DATA.item.shop.phone}
            <a href="javascript:;" data-type="tel" spm-auto="联系卖家" spm-click="get-contact" class="j_show_contact ser-box fl">
                <i class="icon iconfont icon-news-font"></i>
                <p>Kontak</p>
            </a>
            {if $INDEX_DATA.item.stock le 0 || $INDEX_DATA.item.status eq 2}
                <div class="clearfix buy-btns no-buy have-contact">
            {else}
                {if $INDEX_DATA.item.status eq 2}
                    <div class="clearfix buy-btns no-buy have-contact">
                {else}
                    <div class="clearfix buy-btns have-contact">
                {/if}
            {/if} 
        {else} 
            {if $INDEX_DATA.item.stock le 0}
                <div class="clearfix buy-btns no-buy">
            {else}
                {if $INDEX_DATA.item.status eq 2}
                    <div class="clearfix buy-btns no-buy">
                {else}
                    <div class="clearfix buy-btns">
                {/if}
            {/if} 
        {/if} 
    {/if}
    {if $INDEX_DATA.item.stock le 0}
        <a class="add-cart j_add_cart disable-addnow disable-btn" data-id="{$INDEX_DATA.item.id}" href="javascript:;" spm-auto="已售完" spm-click="itemId={$INDEX_DATA.item.id},sellerId={$INDEX_DATA.item.shop.id}">
            {if $INDEX_DATA.item.status eq 2}
                Sudah Digudangkan
            {else}
                Stok Kurang
            {/if}
        </a> 
    {else}
        {if $INDEX_DATA.item.status eq 2}
        <a class="add-cart j_add_cart disable-addnow disable-btn" data-id="{$INDEX_DATA.item.id}" href="javascript:;" spm-auto="已下架" spm-click="itemId={$INDEX_DATA.item.id},sellerId={$INDEX_DATA.item.shop.id}">
            Sudah Digudangkan
        </a> 
        {else}
            <a class="add-cart j_add_cart" data-id="{$INDEX_DATA.item.id}" href="javascript:;" spm-auto="添加购物车" spm-click="itemId={$INDEX_DATA.item.id},sellerId={$INDEX_DATA.item.shop.id}" >
            Masuk keranjang
            </a>
            <a href="javascript:;" class="buy-now j_buy_btn" spm-auto="立即购买" spm-click="itemId={$INDEX_DATA.item.id},sellerId={$INDEX_DATA.item.shop.id}" >
            Beli sekarang
            </a> 
            {/if}

        {/if}
</div>
</section>
{/if} {/if}
<script>
var init_data = {$INDEX_DATA_STR};
var shop_info_data = {$SHOP_INFO_DATA_STR};
var user_info = {$INDEX_USER_INFO};
</script> 
{include file="footer.tpl"}