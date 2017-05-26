{include file="header.tpl" title="My Page Title"}
<body data-spider="a5fivmur">
    <nav class="header-nav clearfix " data-spider="header-nav">
        <i class="icon iconfont j_go_back icon-back-font"></i>
        {$INDEX_TITLE}
    </nav>
    <section class="cart-list j_cart_list cart-supplier-list" data-spider="btn-box">
        {if $GOODS.data|count}
            {if $GOODS.hasDistribution}
                //有分销商品的
                {foreach $GOODS.data as $item}
                    <div class="cart-supplier-card" group-id="40732">
                        <div class="cart-supplier-header"><i class="iconfont icon-warehourse"></i>仓库1</div>
                        <ul>
                            <li class="clearfix cart-item j_cart_item" data-id="4036204">
                                <i class="icon iconfont j_del_cart icon-delete-small" group-id="40732" data-id="4036204"></i>
                                <img src="https://imghk0.geilicdn.com/test_instashop40732-1459476494049-1.jpg?w=110&amp;h=110&amp;cp=1">
                                <div class="">
                                    <p class="name">商品名</p>
                                    <p class="type">型号: 型号一</p>
                                    <p class="num">数量: 1</p>
                                    <p class="price">价格: Rp 20.000</p>
                                </div>
                            </li>
                            <li>
                                <button class="btn j_submit_btn confirm-btn" group-id="40732">去结算</button>
                            </li>
                        </ul>
                    </div>
                {/foreach}
            {else}
                <ul>
                    <li class="clearfix cart-item j_cart_item" data-id="4036204">
                        <i class="icon iconfont j_del_cart icon-delete-small" group-id="40732" data-id="4036204"></i>
                        <img src="https://imghk0.geilicdn.com/test_instashop40732-1459476494049-1.jpg?w=110&amp;h=110&amp;cp=1">
                        <div class="">
                            <p class="name">商品名</p>
                            <p class="type">型号: 型号一</p>
                            <p class="num">数量: 1</p>
                            <p class="price">价格: Rp 20.000</p>
                        </div>
                    </li>
                    <li>
                        <button class="btn j_submit_btn confirm-btn" group-id="">去结算</button>
                    </li>
                </ul>
                //没有分销商品
            {/if}
        {else}
            <ul>
                <li class="empty-cart">Keranjang belanja Anda kosong</li>
                <li>
                    <div class="no_goods_box"><button class="btn j_go_shop confirm-btn">Beli Lagi</button></div>
                </li>
            </ul>
        {/if}
    </section>
    <script>
    var user_info = {$INDEX_USER_INFO};
    </script>
{include file="footer.tpl"}