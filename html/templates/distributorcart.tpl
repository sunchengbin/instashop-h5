{include file="header.tpl"}
<body data-spider="a5fivmur">
    <section class="cart-list j_cart_list cart-supplier-list" data-spider="btn-box">
        {if $GOODS.data|count}
            {foreach key=key item=items from=$GOODS.data name=goods}

                <div class="cart-supplier-card" group-id="{$key}">
                    <div class="cart-supplier-header b-bottom"><i class="iconfont icon-warehourse"></i>{$items[0].shop_info.shop_name}</div>

                    <ul>
                        {foreach from=$items item=item}
                            <li class="clearfix cart-item j_cart_item" group-id="{$key}" data-id="{$item.id}">
                                <i class="icon iconfont j_del_cart icon-delete-small" group-id="{$key}" data-id="{$item.id}"></i>
                                <img src="{$item.img_head}">
                                <div class="">
                                    <p class="name">{$item.item_name}</p>
                                    {if $item.item_sku_id}
                                        <p class="type">Tipe: {$item.sku_title}</p>
                                    {else}
                                        <p class="type"></p>
                                    {/if}
                                    <p class="num">Jumlah: {$item.num}</p>
                                    {if $item.discount_price lt 0}
                                        <div class="price clearfix">
                                            <span></span>
                                    {else}
                                        <div class="price clearfix">
                                            <span>Harga: Rp {$item.discount_price|priceFormat}</span>
                                    {/if}
                                        </div>
                                        {*购买数量*}
                                        <div class="item-num-box clearfix">
                                            <span class="j_reduce_btn reduc-price" data-direct-buy="{$item.direct_buy}" data-sku-id="{$item.item_sku_id}" data-stock="{$item.stock}" data-seller-id="{$item.shop_info.id}" data-id="{$item.item_id}">
                                                <i class="icon iconfont icon-minus-font"></i>
                                            </span>
                                            {if $item.item_sku_id}
                                                <input class="fl j_item_num" type="text" data-price="{$item.sku.discount.price}" value="{$item.num}" readonly="readonly"/>
                                            {else}
                                                <input class="fl j_item_num" type="text" data-price="{$item.item.discount.price}" value="{$item.num}" readonly="readonly"/>
                                            {/if}
                                        
                                            <span class="j_add_btn" data-direct-buy="{$item.direct_buy}" data-seller-id="{$item.shop_info.id}" data-sku-id="{$item.item_sku_id}" data-id="{$item.item_id}" data-stock="{$item.stock}">
                                                <i class="icon iconfont icon-add-font"></i>
                                            </span>
                                        </div>
                                </div>
                                {if $item.status neq 1}
                                    <p class="error-p">{$item.status_txt}</p>
                                {/if}
                            </li>
                        {/foreach}
                        <li>
                            <div class="button-box" flex="box:mean">
                            <p><button class="btn j_submit_btn confirm-btn" data-type="self" group-id="{$key}">kirim ke alamatku</button></p>
                            <p><button class="btn j_submit_btn confirm-btn" data-type="others" group-id="{$key}">kirim ke alamat lain</button></p>
                            </div>
                        </li>
                    </ul>

                </div>

            {/foreach}
        {else}
            <ul>
                <li class="empty-cart">Keranjangmu masih kosong</li>
            </ul>
        {/if}
    </section>
    <script>
    var user_info = {$INDEX_USER_INFO};
    var cart_data = {$CART_GOODS}
    </script>
{include file="footer.tpl"}