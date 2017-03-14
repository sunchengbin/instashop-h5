{include file="header.tpl" title="My Page Title"}
<body data-spider="615lnd28">
{if $INDEX_DATA}
    {if $INDEX_DATA.code eq 420405}
    <div class="no-exists">
        <img src="{$STATIC_HOST}/images/app/404.png"/>
        <p>Toko tidak ditemukan!</p>
    </div>
    {else}
    {if $INDEX_DATA.shop.status eq '2'}
    <section class="shop-header">
        {if $INDEX_DATA.template|@count}
            <img class="shop-header-bg" data-img="{$INDEX_DATA.template[0].data[0].front_cover|bg_img}" src="">
        {else}
            <img class="shop-header-bg" data-img="{$INDEX_DATA.shop.front_cover|bg_img}" src="">
        {/if}
        <div class="clearfix shop-info">
            <div class="shop-img">
                <img data-img="{$INDEX_DATA.shop.logo}" src=""/>
            </div>
            <p>{$INDEX_DATA.shop.name}</p>
        </div>
    </section>
    <section class="shop-delete">
        <i class="icon iconfont icon-error-font"></i>
        <p>Akun ini telah dihapus karena melanggar syarat dan ketentuan penggunaan Instashop</p>
    </section>
    {else}
    <section class="shop-header">
        <img class="shop-header-bg" data-img="{$INDEX_DATA.shop.front_cover|bg_img}" src="">
        <div class="clearfix shop-info">
            <div class="shop-img">
                <img data-img="{$INDEX_DATA.shop.logo}" src=""/>
            </div>
            <p>{$INDEX_DATA.shop.name}</p>
        </div>
    </section>
    <section class="shop-explain j_down_box">
        <div>
            <span class="top-angle"></span>
            <div class="txt">
                {if $INDEX_DATA.shop.note}
                {$INDEX_DATA.shop.note|nl2br}
                {else}
                Selamat datang di mini websiteku
                {/if}
            </div>
            <div class="txt-hide">
                {$INDEX_DATA.shop.note|nl2br}
            </div>
            <p><i class="icon iconfont j_down_btn down-btn"></i></p>
        </div>
    </section>
    {include file="preferential.tpl"}
    {include file="model.tpl"}
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
                            <a spm-auto="单品" spm-click="itemId={$item.id},sellerId={$INDEX_DATA.shop.id}" class="item-info j_item_info" data-url="{$item.h5_url|transUrl}" href="javascript:;">
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
                        {foreach $RECOMMEND_ITEM as $item}
                        <li>
                            <a spm-auto="单品" spm-click="itemId={$item.id},sellerId={$INDEX_DATA.shop.id}" class="item-info j_item_info" data-url="{$item.h5_url|transUrl}" href="javascript:;">
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
        </section>
        {foreach $TAGS_ITEM as $tag_list}
        <section class="items-box j_box" data-tagid="{$tag_list.id}">
            {if $tag_list|@count}
            <p class="item-title b-bottom clearfix"><a spm-auto="商品所属分类" spm-click="{$tag_list.id}" class="fr j_item_info" href="javascript:;" data-url="{$HOST_NAME}/k/{$tag_list.id}">more<i class="icon iconfont icon-go-font"></i></a><span></span><em>{$tag_list.name}</em></p>
                {if $ITEMTYPE neq '3'}
                    <ul class="items-list j_item_list clearfix">
                        {foreach $tag_list.tag_data as $item}
                        <li>
                            <a spm-auto="单品" spm-click="itemId={$item.id},sellerId={$INDEX_DATA.shop.id}" class="item-info j_item_info" data-url="{$item.h5_url|transUrl}" href="javascript:;">
                                <div class="lazy" data-img="{$item.img|list_img}">
                                    {if $item.is_discount}
                                    <span>-{$item.discount.value}%</span>
                                    {if $item.discounting}
                                    <p><i class="icon iconfont icon-time-font"></i><span
                                            data-time="{$item.discount.end_time|discountSecond}">{$item.discount.end_time|discountTime}</span>
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
                    <ul class="three-items-list clearfix j_item_list">
                        {foreach $tag_list.tag_data as $item}
                        <li>
                            <a spm-auto="单品" spm-click="itemId={$item.id},sellerId={$INDEX_DATA.shop.id}" class="item-info j_item_info" data-url="{$item.h5_url|transUrl}" href="javascript:;">
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
        </section>
        {/foreach}
        <section class="items-box j_item_box j_box">
            {if $HOT_ITEM|@count}
            <p class="item-title b-bottom"><span></span>Hot Item</p>
                {if $ITEMTYPE neq '3'}
                <ul class="items-list j_item_list clearfix">
                    {foreach $HOT_ITEM as $item}
                    <li>
                        <a spm-auto="单品" spm-click="itemId={$item.id},sellerId={$INDEX_DATA.shop.id}" class="item-info j_item_info" data-url="{$item.h5_url|transUrl}" href="javascript:;">
                            <div class="lazy" data-img="{$item.img|list_img}">
                                {if $item.is_discount}
                                <span>-{$item.discount.value}%</span>
                                {if $item.discounting}
                                <p><i class="icon iconfont icon-time-font"></i><span
                                        data-time="{$item.discount.end_time|discountSecond}">{$item.discount.end_time|discountTime}</span>
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
                    <ul class="three-items-list clearfix j_item_list">
                        {foreach $HOT_ITEM as $item}
                        <li>
                            <a spm-auto="单品" spm-click="itemId={$item.id},sellerId={$INDEX_DATA.shop.id}" class="item-info j_item_info" data-url="{$item.h5_url|transUrl}" href="javascript:;">
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
        </section>
    </div>
    <section class="sort-list-wraper j_sort_box" data-spider="sort-list">
        <p>Kategori produk</p>
        <ul>
            {foreach $TAG_LIST as $tag}
            <li class=""><a spm-auto="侧栏分类" spm-click="tagId={$tag.id}" class="j_item_info" href="javascript:;" data-url="{$HOST_NAME}/k/{$tag.id}" class=""><span></span>{$tag.name}</a></li>
            {/foreach}
        </ul>
    </section>

    <!--新增3.5 功能点4需求-->
    <div class="index-btn-box" data-spider="set-up-shop">
        <div class="btn confirm-btn">
            <i class="iconfont icon-shop-font"></i>
            <a spm-auto="我也要开店" spm-click="go-home" href="http://www.instashop.co.id/" onclick="trackOutboundLink('http://www.instashop.co.id/'); return false;" target="_self">Buat webstore gratis sekarang!</a>
        </div>
    </div>

    <div class="sort-list-cover j_sort_cover">
        <i class="icon iconfont icon-fold-font"></i>
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
                <i class="icon iconfont icon-tag-font"></i>
                Kategori
            </li>
            {/if}
            <li class="j_cart_wraper b-right" data-url="{$HOST_NAME}/html/cart.php" spm-auto="去购物车" spm-click="go-cart">
                <i class="icon iconfont icon-i-shop-font"></i>
                Troli
            </li>
            <li>
                {if $INDEX_DATA.shop.line_url}
                {if $INDEX_DATA.shop.phone}
                <a spm-auto="查看联系方式" spm-click="check-contact" class="contact-services j_show_contact" data-type="all" href="javascript:;">
                    <i class="icon iconfont icon-i-news-font"></i>
                    Kontak
                </a>
                {else}
                <a class="contact-services block j_goto_line" spm-auto="联系卖家line" spm-click="go-line" href="javascript:;">
                    <i class="icon iconfont icon-i-news-font"></i>
                    Kontak
                </a>
                {/if}
                {else}
                {if $INDEX_DATA.shop.phone}
                <a spm-auto="查看联系方式" spm-click="check-contact" class="contact-services j_show_contact" data-type="tel" href="javascript:;">
                    <i class="icon iconfont icon-i-news-font"></i>
                    Kontak
                </a>
                {/if}
                {/if}
            </li>
        </ul>
    </section>
    {/if}
    {/if}
{else}
    <section class="no_item">Belum ada produk</section>
{/if}
<script>var init_data = {$INDEX_DATA_STR};</script>
{include file="footer.tpl"}
