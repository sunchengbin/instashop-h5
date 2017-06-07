{if $DATA.buyer_cart|count}
    {foreach key=key item=items from=$DATA.buyer_cart name=goods}
        {foreach from=$items item=item}
            <li class="clearfix cart-item j_cart_item" group-id="{$key}" data-id="{$item.id}">
                <img src="{$item.img_head}">
                <div class="">
                    <p class="name">{$item.item_name}</p>
                    {if $item.item_sku_id}
                        <p class="type">Tipe: {$item.sku_title}</p>
                    {else}
                        <p class="type"></p>
                    {/if}
                    <p class="num">Stock: {$item.num}</p>
                    {if $item.discount}
                        {if $item.discount.price lt 0}
                            <p class="price clearfix">
                        {else}
                            <p class="price clearfix">
                                Harga: Rp {$item.discount.price|priceFormat}
                        {/if}
                            </p>
                    {else}
                        {if $item.price lt 0}
                            <p class="price clearfix">
                        {else}
                            <p class="price clearfix">
                                Harga: Rp {$item.price|priceFormat}
                        {/if}
                            </p>
                    {/if}
                </div>
            </li>
        {/foreach}
    {/foreach}
{else}
    <li class="empty-cart">Keranjang belanja Anda kosong</li>
{/if}