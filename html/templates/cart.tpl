{include file="header.tpl"}
<body data-spider="a5fivmur">
    <nav class="header-nav clearfix " data-spider="header-nav">
        <i class="icon iconfont j_go_back icon-back-font"></i>
        Keranjangku
    </nav>
    <section class="cart-list j_cart_list" data-spider="btn-box">
        {if $GOODS.data|count}
            {foreach key=key item=items from=$GOODS.data name=goods}
                {if $GOODS.data|count gt 1}
                <div class="cart-supplier-card" group-id="{$key}">
                    <div class="cart-supplier-header"><i class="iconfont icon-warehourse"></i>Gudang{$smarty.foreach.goods.index}</div>
                {/if}
                    <ul>
                        {foreach from=$items item=item}
                            <li class="clearfix cart-item j_cart_item" data-id="{$item.id}">
                                <i class="icon iconfont j_del_cart icon-delete-small" group-id="{$key}" data-id="{$item.id}"></i>
                                <img src="{$item.img_head}">
                                <div class="">
                                    <p class="name">{$item.item_name}</p>
                                    {if $item.item_sku_id}
                                        <p class="type">Tipe: {$item.sku_title}</p>
                                    {else}
                                        <p class="type"></p>
                                    {/if}
                                    <p class="num">Stock: {$item.num}</p>
                                    {if $item.is_discount and $item.discounting}
                                        {if $item.discount.price lt 0}
                                            <div class="price clearfix">
                                                <span></span>
                                        {else}
                                            <div class="price clearfix">
                                                <span>Harga: Rp {$item.discount.price|priceFormat}</span>
                                        {/if}
                                            </div>
                                    {else}
                                        {if $item.price lt 0}
                                            <div class="price clearfix">
                                                <span></span>
                                        {else}
                                            <div class="price clearfix">
                                                <span>Harga: Rp {$item.price|priceFormat}</span>
                                        {/if}
                                            </div>
                                    {/if}
                                </div>
                            </li>
                        {/foreach}
                        <li>
                            <button class="btn j_submit_btn confirm-btn" group-id="{$key}">Checkout</button>
                        </li>
                    </ul>
                {if $GOODS.data|count gt 1}
                </div>
                {/if}
            {/foreach}
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