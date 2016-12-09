{include file="header.tpl" title="My Page Title"}
<body data-spider="402ngpd7">
<nav class="shop-header-nav clearfix">
    <div class="fl back-box">
        <button class="j_go_back">
            <i class="icon iconfont icon-back-font"></i>
        </button>
    </div>
    <div class="search-box clearfix">
        <i class="iconfont icon-search-font"></i>
        <a href="javascript:;" class="j_search_btn fr">Cari</a>
        <div class="key-box">
            <input value="{$KEY}" class="j_key" type="text"/>
        </div>
    </div>
</nav>
<section class="items-box j_item_box" data-spider="search-val-list">
    {if $SEARCH_DATA}
        {if $SEARCH_DATA.item_list.list|@count}
            {if $ITEMTYPE eq '2'}
                <ul class="items-list clearfix j_hot_list">
                    {foreach $SEARCH_DATA.item_list.list as $item}
                    <li>
                        <a spm-auto="单品" spm-click="itemId={$item.id},sellerId={$INDEX_DATA.shop.id}" class="item-info j_item_info" data-url="{$item.h5_url}" href="javascript:;">
                            <div class="lazy" data-img="{$item.img|list_img}">
                                {if $item.is_discount}
                                <span>-{$item.discount.value}%</span>
                                {if $item.discounting}
                                <p><i class="icon iconfont icon-time-font"></i><span data-time="{$item.discount.end_time|discountSecond}">{$item.discount.end_time|discountTime}</span>
                                </p>
                                {else}
                                <p>Coming Soon</p>
                                {/if}
                                {/if}
                            </div>
                            <p class="title">{$item.item_comment|nl2br}</p>
                            {if $item.price lt 0}
                            <p class="price"></p>
                            {elseif $item.is_discount}
                            <p class="price cost-price">Rp {$item.price|priceFormat}</p>
                            {else}
                            <p class="price">Rp {$item.price|priceFormat}</p>
                            {/if}
                            {if $item.is_discount}
                            {if $item.discounting}
                            <p class="discount-price">Rp {$item.discount.price|priceFormat}</p>
                            {else}
                            <p class="discount-price">Rp {$item.discount.price|priceFormat}</p>
                            {/if}
                            {else}
                            <p class="discount-price"></p>
                            {/if}
                        </a>
                    </li>
                    {/foreach}
                </ul>
            {else}
                <ul class="three-items-list clearfix j_hot_list">
                    {foreach $SEARCH_DATA.item_list.list as $item}
                    <li>
                        <a spm-auto="单品" spm-click="itemId={$item.id},sellerId={$INDEX_DATA.shop.id}" class="item-info j_item_info" data-url="{$item.h5_url}" href="javascript:;">
                            <div class="lazy" data-img="{$item.img|list_img}">
                                {if $item.is_discount}
                                <span>-{$item.discount.value}%</span>
                                {/if}
                            </div>
                        </a>
                    </li>
                    {/foreach}
                </ul>
            {/if}
        {/if}
    {/if}
</section>
{include file="footer.tpl"}





