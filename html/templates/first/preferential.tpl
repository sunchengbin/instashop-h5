{if $INDEX_DATA_SHOP.shop.shop_discount}
    <section class="reduc-box" data-spider="reduc_box">
        <div class="reduc-box-wrap j_reduc_box">
            <span class="rp-bg"></span>
            <div class="clearfix" flex="cross:center">
                <p class="reduc-box-info">
                    {if $INDEX_DATA_SHOP.shop.shop_discount.discount_type eq 'price'}
                        {foreach $INDEX_DATA_SHOP.shop.shop_discount.info as $keyvar=>$item}
                            {if $keyvar eq 0}
                            Minimal Pembelian <em>{$item.condition_price|priceFormat}</em><br> Potongan <em>{$item.discount_price|priceFormat}</em>
                            {else}
                            , Minimal Pembelian <em>{$item.condition_price|priceFormat}</em><br> Potongan <em>{$item.discount_price|priceFormat}</em>
                            {/if}
                        {/foreach}
                    {else}
                        {foreach $INDEX_DATA_SHOP.shop.shop_discount.info as $keyvar=>$item}
                            Minimal Pembelian Rp {$item.condition_price|priceFormat} akan mendapat potongan -{$item.discount_percent}%.{if $INDEX_DATA_SHOP.shop.shop_discount.limit_price neq '0.00'}Nominal potongan maksimal Rq {$INDEX_DATA_SHOP.shop.shop_discount.limit_price|priceFormat}{/if}
                        {/foreach}
                    {/if}
                </p>
                <p class="reduc-expire">
                    {$INDEX_DATA_SHOP.shop.shop_discount.start_time|transDate} - {$INDEX_DATA_SHOP.shop.shop_discount.end_time|transDate} WIB
                </p>
            </div>
        </div>
    </section>
{/if}
{if $INDEX_DATA_SHOP.shop.coupon}
    <section class="reduc-box" data-spider="coupon_box">
        <div class="reduc-box-wrap j_share_btn" data-couponid="{$INDEX_DATA_SHOP.shop.coupon.id}">
        <span class="rp-bg"></span>
        <div class="clearfix" flex="cross:center">
             <p class="reduc-box-info-coupon">
                 Voucher <em>{$INDEX_DATA_SHOP.shop.coupon.amount|priceFormat}</em>
             </p>
             <p class="reduc-expire-coupon">
                 {$INDEX_DATA_SHOP.shop.coupon.start_time|transDate} - {$INDEX_DATA_SHOP.shop.coupon.end_time|transDate} WIB
             </p>
         </div>
        </div>
    </section>
{/if}