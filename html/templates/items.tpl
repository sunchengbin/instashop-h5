<div class="all-items-wrap-box">
    {*全部商品排序tab*}
    <div class="item-tabs">
        <ul class="tablist tab-items ins-avg-sm-3 ins-avg-md-3 ins-avg-lg-3">
            <li class="tabitem tab-active">
                <div>
                    <span>Populer</span>
                </div>
            </li>
            <li class="tabitem">
                <div><span>Terbaru</span></div>
            </li>
            <li class="tabitem tabitem-sortprice" data-status="{if $CT eq 'undefined'}bypricel2h{else}{if $CT eq 3}bypriceh2l{else}{if $CT eq 2}bypricel2h{else}bypricel2h{/if}{/if}{/if}">
                <div>
                    <span>Harga
                        <div class="sort-price">
                            <i class="icon iconfont icon-arrow-fill-up sort-price-l2h {if $CT eq 3}sort-price-off{/if}"></i>
                            <i class="icon iconfont icon-arrow-fill-down sort-price-h2l {if $CT eq 2}sort-price-off{/if}"></i>
                        </div>
                    </span>
                </div>
            </li>
        </ul>
    </div>
    {*全部商品box*}
    <div data-spider="item-list" class="all-items-wrap">
        {if !$ALL_ITEMS|@count}
        {*没有商品*}
        <section class="no_item">Belum ada produk</section>
        {/if}
        <section class="items-box j_hot_box j_box">
            {if $ALL_ITEMS|@count}
            {if $ITEMTYPE neq '3'}
            {*一行两列商品*}
            <ul class="items-list clearfix j_all_list">
                {foreach $ALL_ITEMS as $item}
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
            {*一行三列商品*}
            <ul class="three-items-list clearfix j_all_list">
                {foreach $ALL_ITEMS as $item}
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
    </div>
</div>
<script>
    var all_item_data = {$ALL_ITEM_DATA_STR}
</script>
