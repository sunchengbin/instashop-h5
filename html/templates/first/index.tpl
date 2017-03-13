{include file="../header.tpl" title="My Page Title"}
<body data-spider="615lnd28">
{if $INDEX_DATA}
    <section class="shop-header">
        <img class="shop-header-bg" data-img="{$INDEX_DATA.shop.front_cover|bg_img}" src="">
        <div class="clearfix shop-info">
            <div class="shop-img">
                <img src="{$INDEX_DATA.shop.logo}"/>
            </div>
            <div class="shop-seller-info">
                <p>Kikyo</p>
            </div>
        </div>
    </section>
    <section class="coupon-box">
        Minimal Pembelian Rp 150.000 Potongan  Rp 10.000
    </section>
{else}
    <section class="no_item">Belum ada produk</section>
{/if}
<script>var init_data = {$INDEX_DATA_STR};</script>
{include file="../footer.tpl"}
