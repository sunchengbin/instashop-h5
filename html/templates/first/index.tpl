{include file="../header.tpl" title="My Page Title"}
<body data-spider="615lnd28">
{if $INDEX_DATA}
    <section class="shop-header">
        <img class="shop-header-bg" data-img="{$INDEX_DATA.shop.front_cover|bg_img}" src="">
        <div class="clearfix shop-info">
            <div class="shop-img">
                <img data-img="{$INDEX_DATA.shop.logo}" src=""/>
            </div>

        </div>
    </section>
{else}
    <section class="no_item">Belum ada produk</section>
{/if}
<script>var init_data = {$INDEX_DATA_STR};</script>
{include file="../footer.tpl"}
