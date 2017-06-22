{if not $INDEX_DATA.carts}
    <li class="empty-cart">Keranjang belanja Anda kosong</li>
{else}
    {foreach from=$INDEX_DATA.carts item=item}
        <li class="clearfix cart-item b-bottom j_cart_item" data-id="{$carts|getCartId}">
            <img src="{$item.img_head}">
            <div class="">
                <p class="name">{$item.item_name}</p>
                <p class="num">{$item.num}</p>
                {if $item.item_sku_id}
                    <p class="type">Tipe: {$item.sku_title}</p>
                {else}
                    <p class="type"></p>
                {/if}
                <p class="price">Harga: Rp {$item.discount_price|priceFormat}</p>
            </div>
        </li>
    {/foreach}
{/if}