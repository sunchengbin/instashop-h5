{include file="header.tpl"}
<body data-spider="615lnd28">
    {if $INDEX_DATA}
    <div class="index-wrap-box">
        {*店招头像*}
        <section class="shop-header">
            <img class="shop-header-bg" data-img="{$INDEX_DATA.shop.front_cover|bg_img}" src="">
            <div class="clearfix shop-info">
                <div class="shop-img">
                    <img data-img="{$INDEX_DATA.shop.logo}" src="" />
                </div>
                <p>{$INDEX_DATA.shop.name}</p>
                {if $SHOP_INFO_DATA.realinfo.location.vicinity neq ''}
                    {*是否有实体店标志*}
                    <span><i class="icon iconfont icon-shop-font"></i>Ada Outlet</span>
                {/if}
            </div>
        </section>
        {*首页切换tab*}
        <div class="tabs" data-spider="index-parent-tab">
            <ul class="tablist tab-index ins-avg-sm-3 ins-avg-md-3 ins-avg-lg-3">
                <li class="tabitem">
                    <div>
                        <i class="icon iconfont icon-newhome"></i>
                        <span>Home</span>
                    </div>
                </li>
                <li class="tabitem">

                    <div><i class="icon iconfont icon-allitem"></i><span>Produk</span></div>
                </li>
                <li class="tabitem">
                    <div><i class="icon iconfont icon-shopinfo"></i><span>Informasi Toko</span></div>
                </li>
            </ul>
        </div>
        {*tab内容盒子*}
        <div class="tab-content tab-index-content">
            <div class="tabpanel">
                {*满减优惠券*}
                {include file="preferential.tpl"}
                {*展示插入的模板*}
                {include file="model.tpl"} 
                {*推荐商品*}
                <div data-spider="item-list" class="item-list-wraper">
                    {*既无装修模块 也没有推荐商品*}
                    {if $INDEX_DATA.template|@noHaveTemplate && !$INDEX_DATA.item_list.list|@count}
                        <section class="no_item ins-text-left">Hasil dari menu "Kreasikan Toko " & "Rekomendasi Produk " akan tampil di sini. Yuk buruan percantik webmu di menu "Kreasikan Toko "</section>
                    {/if}
                    <section class="items-box j_hot_box j_box">
                        {if $RECOMMEND_ITEM|@count}
                        <p class="item-title b-bottom"><span></span>Rekomendasi Item</p>
                        {if $ITEMTYPE neq '3'}
                        {*一行两列展示商品*}
                        <ul class="items-list clearfix j_hot_list">
                            {foreach $RECOMMEND_ITEM as $item}
                            <li>
                                <a spm-auto="单品" spm-click="itemId={$item.id},sellerId={$INDEX_DATA.shop.id}" class="item-info j_item_info" data-url="{$item.h5_url|transUrl}"
                                    href="javascript:;">
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
                                            {if $item.discount.discount_type eq "percent"}
                                                <p class="discount-price">Rp {$item.discount.min_discount_price|priceFormat}</p>
                                            {else}
                                                <p class="discount-price">Rp {$item.discount.price|priceFormat}</p>
                                            {/if}
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
                        {*一行三列展示商品*}
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
            </div>
            <div class="tabpanel">
                {*全部商品*}
                {include file="items.tpl"}
            </div>
            <div class="tabpanel">
                {*店铺简介*}
                {include file="intro.tpl"}
            </div>
        </div>
        <section class="sort-list-wraper j_sort_box" data-spider="sort-list">
            {*分类列表*}
            <p>Kategori produk</p>
            <ul>
                {foreach $TAG_LIST as $tag}
                <li class=""><a spm-auto="侧栏分类" spm-click="tagId={$tag.id}" class="j_item_info" href="javascript:;" data-url="{$HOST_NAME}/k/{$tag.id}" class=""><span></span>{$tag.name}</a></li>
                {/foreach}
            </ul>
        </section>
        <div class="sort-list-cover j_sort_cover">
            {*分类列表cover*}
            <i class="icon iconfont icon-fold-font"></i>
        </div>
        <div class="index-btn-box" data-spider="set-up-shop">
            {*我也要开店按钮*}
            <div class="btn confirm-btn">
                <i class="iconfont icon-shop-font"></i>
                <a spm-auto="我也要开店" spm-click="go-home" href="http://www.instashop.co.id/" onclick="trackOutboundLink('http://www.instashop.co.id/'); return false;" target="_self">Buat webstore gratis sekarang!</a>
            </div>
        </div>
        {*底部浮动导航*}
        {include file="navbar.tpl"}
    </div>
    {/if}
    <div class="order-guide-cover"></div>
    <div class="order-guide-info-wrap">
        <div class="order-guide-text">
             <p>点这里查看订单详情</p>
             <p>
                <button class="order-guide-btn j_close_guide">Saya mengerti</button>
             </p>
             <img class="order-guide-arrow" src="{$STATIC_HOST}/images/app/cover-arrow.png" />
        </div>
    </div>
</body>
<script>
    {*首页数据*}
    var init_data = {$INDEX_DATA_STR};
    {*登录信息*}
    var user_info = {$INDEX_USER_INFO};
</script>
<script>
    {*回退节点和翻页数据*}
    var route_pt={$PT};var route_ct={$CT};var route_page_num={$PAGE_NUM};var route_page_size={$PAGE_SIZE};
</script>

{include file="footer.tpl"}