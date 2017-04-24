<section class="index-footer" data-spider="foot-nav">
    {*商品搜索button*}
    <div class="search-box" data-spider="go-search">
        <a href="{$HOST_NAME}/html/search.php" class="search-btn block" spm-auto="搜索商品" spm-click="search-items">
            <i class="iconfont icon-search-font"></i>
        </a>
    </div>

    {if true}
        {*开通担保交易底部导航*}
        <div class="contact-box" data-spider="go-search">
            {if $INDEX_DATA.shop.line_url} 
                {if $INDEX_DATA.shop.phone}
                    <a spm-auto="查看联系方式" spm-click="check-contact" class="contact-services j_show_contact" data-type="all" href="javascript:;">
                        <i class="icon iconfont icon-i-news-font"></i>
                    </a>
                {else}
                    <a class="contact-services block j_goto_line" spm-auto="联系卖家line" spm-click="go-line" href="javascript:;">
                        <i class="icon iconfont icon-i-news-font"></i>
                    </a>
                {/if} 
            {else} 
                {if $INDEX_DATA.shop.phone}
                <a spm-auto="查看联系方式" spm-click="check-contact" class="contact-services j_show_contact" data-type="tel" href="javascript:;">
                    <i class="icon iconfont icon-i-news-font"></i>
                </a>
                {/if} 
            {/if}
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
            <li data-url="{$HOST_NAME}/html/cart.php" spm-auto="我的订单" spm-click="go-order">
                <i class="icon iconfont icon-edit-font"></i> 我的订单
            </li>
        </ul>
    {else}
        <ul class="b-top">
            {if $INDEX_DATA.tag_list|@count}
            <li class="j_category b-right" spm-auto="查看分类" spm-click="show-category">
                <i class="icon iconfont icon-tag-font"></i> Kategori
            </li>
            {/if}
            <li class="j_cart_wraper b-right" data-url="{$HOST_NAME}/html/cart.php" spm-auto="去购物车" spm-click="go-cart">
                <i class="icon iconfont icon-i-shop-font"></i> Troli
            </li>
            <li data-url="{$HOST_NAME}/html/cart.php" spm-auto="我的订单" spm-click="go-order">
                <i class="icon iconfont icon-edit-font"></i> 我的订单
            </li>
        </ul>
    {/if}

    {*未开通担保交易底部导航*}

</section>