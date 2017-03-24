{if not $INDEX_DATA.carts}
    <li class="empty-cart">Keranjang belanja Anda kosong</li>
{else}
    {foreach from=$INDEX_DATA.carts item=carts}
        <li class="clearfix cart-item b-bottom j_cart_item" data-id="{$carts|getCartId}">
            <img src="{$carts.item.img}">
            <div class="">
                <p class="name">{$carts.item.item_name}</p>
                {if $carts|getCartStock gte 9999999}
                    <p class="num"></p>
                {else}
                    <p class="num">Stock: {$carts|getCartStock}</p>
                {/if}
                {if $carts.sku and $carts.sku.id}
                    <p class="type">Tipe: {$carts.sku.title}</p>
                {else}
                    <p class="type"></p>
                {/if}
                {if $carts.item.is_discount and $carts.item.discounting}
                    {if $carts.item.discount.price lt 0}
                        <div class="price clearfix">
                            <span></span>
                    {else}
                        <div class="price clearfix">
                            {if $carts.item.discount.discount_type eq 'percent'}
                                {if $carts.sku && $carts.sku.id}
                                    <span>Harga: Rp {$carts.sku.discount.price|priceFormat}</span>
                                {else}
                                    <span>Harga: Rp {$carts.item.discount.price|priceFormat}</span>
                                {/if}

                            {else}
                                <span>Harga: Rp {$carts.item.discount.price|priceFormat}</span>
                            {/if}
                    {/if}
                            <div class="item-num-box clearfix">
                                <span class="j_reduce_btn" data-id="{$carts|getCartId}">
                                    <i class="icon iconfont icon-minus-font"></i>
                                </span>
                                {if $carts.item.discount.discount_type eq 'percent'}
                                    {if $carts.sku && $carts.sku.id}
                                        <input class="fl j_item_num" type="text" data-price="{$carts.sku.discount.price}" value="{$carts.num}" readonly="readonly"/>
                                    {else}
                                        <input class="fl j_item_num" type="text" data-price="{$carts.item.discount.price}" value="{$carts.num}" readonly="readonly"/>
                                    {/if}

                                {else}
                                    <input class="fl j_item_num" type="text" data-price="{$carts.item.discount.price}" value="{$carts.num}" readonly="readonly"/>
                                {/if}
                                <span class="j_add_btn" data-id="{$carts|getCartId}" data-stock="{$carts|getDiscountStock}">
                                    <i class="icon iconfont icon-add-font"></i>
                                </span>
                            </div>
                        </div>
                {else}
                    {if $carts|getCartPrice lt 0}
                        <div class="price clearfix">
                            <span></span>
                    {else}
                        <div class="price clearfix">
                            <span>Harga: Rp {$carts|transCartPrice}</span>
                    {/if}
                            <div class="item-num-box clearfix">
                                <span class="j_reduce_btn" data-id="{$carts|getCartId}">
                                    <i class="icon iconfont icon-minus-font"></i>
                                </span>
                                <input class="fl j_item_num" type="text" data-price="{$carts|getCartPrice}" value="{$carts.num}" readonly="readonly"/>
                                <span class="j_add_btn" data-id="{$carts|getCartId}" data-stock="{$carts|getCartStock}">
                                    <i class="icon iconfont icon-add-font"></i>
                                </span>
                            </div>
                        </div>
                {/if}
            </div>
        </li>
    {/foreach}
{/if}