{include file="header.tpl" title="My Page Title"}

<body data-spider="615lnd28">
    {if $INDEX_DATA}
    <div>
        <section class="shop-header">
            <img class="shop-header-bg" data-img="{$INDEX_DATA.shop.front_cover|bg_img}" src="">
            <div class="clearfix shop-info">
                <div class="shop-img">
                    <img data-img="{$INDEX_DATA.shop.logo}" src="" />
                </div>
                <p>{$INDEX_DATA.shop.name}</p>
                <span><i class="icon iconfont icon-shop-font"></i>Toko fisik</span>
            </div>
        </section>
        <div class="tabs">
            <ul class="tablist tab-index ins-avg-sm-3 ins-avg-md-3 ins-avg-lg-3">
                <li class="tabitem tab-active">
                    <div>
                        <i class="icon iconfont icon-empty-font"></i>
                        <span>店铺首页</span>
                    </div>
                </li>
                <li class="tabitem">

                    <div><i class="icon iconfont icon-empty-font"></i><span>全部商品</span></div>
                </li>
                <li class="tabitem">
                    <div><i class="icon iconfont icon-empty-font"></i><span>店铺简介</span></div>
                </li>
            </ul>
        </div>
        <div class="tab-content tab-index-content">
            <div class="tabpanel tabpanel-active">
                {include file="preferential.tpl"} 
                {include file="model.tpl"} 
                {*推荐商品*}
                <div data-spider="item-list" class="item-list-wraper">
                    {if !$INDEX_DATA.item_list.list|@count}
                    <section class="no_item">Belum ada produk</section>
                    {/if}
                    <section class="items-box j_hot_box j_box">
                        {if $RECOMMEND_ITEM|@count}
                        <p class="item-title b-bottom"><span></span>Rekomendasi Item</p>
                        {if $ITEMTYPE neq '3'}
                        <ul class="items-list clearfix j_hot_list">
                            {foreach $RECOMMEND_ITEM as $item}
                            <li>
                                <a spm-auto="单品" spm-click="itemId={$item.id},sellerId={$INDEX_DATA.shop.id}" class="item-info j_item_info" data-url="{$item.h5_url|transUrl}"
                                    href="javascript:;">
                                    <div class="lazy" data-img="{$item.img|list_img}">
                                        {if $item.is_discount}
                                        <span>-{$item.discount.value}%</span> {if $item.discounting}
                                        <p><i class="icon iconfont icon-time-font"></i><span data-time="{$item.discount.end_time|discountSecond}">{$item.discount.end_time|discountTime}</span>
                                        </p>
                                        {else}
                                        <p>Coming Soon</p>
                                        {/if} {/if}
                                    </div>
                                    <p class="title">{$item.item_comment|nl2br}</p>
                                    {if $item.price lt 0}
                                    <p class="price"></p>
                                    {elseif $item.is_discount}
                                    <p class="price cost-price">Rp {$item.price|priceFormat}</p>
                                    {else}
                                    <p class="price">Rp {$item.price|priceFormat}</p>
                                    {/if} {if $item.is_discount} {if $item.discounting}
                                    <p class="discount-price">Rp {$item.discount.price|priceFormat}</p>
                                    {else}
                                    <p class="discount-price">Rp {$item.discount.price|priceFormat}</p>
                                    {/if} {else}
                                    <p class="discount-price"></p>
                                    {/if}
                                </a>
                            </li>
                            {/foreach}
                        </ul>
                        {else}
                        <ul class="three-items-list clearfix j_hot_list">
                            {foreach $RECOMMEND_ITEM as $item}
                            <li>
                                <a spm-auto="单品" spm-click="itemId={$item.id},sellerId={$INDEX_DATA.shop.id}" class="item-info j_item_info" data-url="{$item.h5_url|transUrl}"
                                    href="javascript:;">
                                    <div class="lazy" data-img="{$item.img|list_img}">
                                        {if $item.is_discount}
                                        <span>-{$item.discount.value}%</span> {/if}
                                    </div>
                                </a>
                            </li>
                            {/foreach}
                        </ul>
                        {/if} {/if}
                    </section>
                </div>
                <section class="index-footer" data-spider="foot-nav">
                    <div class="search-box" data-spider="go-search">
                        <a href="{$HOST_NAME}/html/search.php" class="search-btn block" spm-auto="搜索商品" spm-click="search-items">
                            <i class="iconfont icon-search-font"></i>
                        </a>
                    </div>
                    <ul class="b-top">
                        {if $INDEX_DATA.tag_list|@count}
                        <li class="j_category b-right" spm-auto="查看分类" spm-click="show-category">
                            <i class="icon iconfont icon-tag-font"></i> Kategori
                        </li>
                        {/if}
                        <li class="j_cart_wraper b-right" data-url="{$HOST_NAME}/html/cart.php" spm-auto="去购物车" spm-click="go-cart">
                            <i class="icon iconfont icon-i-shop-font"></i> Troli
                        </li>
                        <li>
                            {if $INDEX_DATA.shop.line_url} {if $INDEX_DATA.shop.phone}
                            <a spm-auto="查看联系方式" spm-click="check-contact" class="contact-services j_show_contact" data-type="all" href="javascript:;">
                                <i class="icon iconfont icon-i-news-font"></i> Kontak
                            </a>
                            {else}
                            <a class="contact-services block j_goto_line" spm-auto="联系卖家line" spm-click="go-line" href="javascript:;">
                                <i class="icon iconfont icon-i-news-font"></i> Kontak
                            </a>
                            {/if} {else} {if $INDEX_DATA.shop.phone}
                            <a spm-auto="查看联系方式" spm-click="check-contact" class="contact-services j_show_contact" data-type="tel" href="javascript:;">
                                <i class="icon iconfont icon-i-news-font"></i> Kontak
                            </a>
                            {/if} {/if}
                        </li>
                    </ul>
                </section>
            </div>
            <div class="tabpanel">
                {*全部商品*} {include file="items.tpl"}

            </div>
            {*店铺简介*}
            <div class="tabpanel">
                {include file="intro.tpl"}
            </div>
        </div>
    </div>
    {/if}
</body>
<script>
    var init_data = {$INDEX_DATA_STR};
</script>

{include file="footer.tpl"}