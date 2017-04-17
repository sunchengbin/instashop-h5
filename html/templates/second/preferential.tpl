{if $INDEX_DATA_SHOP.shop.shop_discount}
    <section class="reduc-box" data-spider="reduc_box">
        <div class="reduc-box-wrap j_reduc_box">
            <div class="b-bottom">
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
                            Minimal Pembelian <em>Rp {$item.condition_price|priceFormat}</em> akan mendapat
                            <br> Potongan <em>-{$item.discount_percent}%.</em>
                        {/foreach}
                    {/if}
                </p>
                <p class="reduc-expire reduc-expire-discount">
                    {$INDEX_DATA_SHOP.shop.shop_discount.start_time|transDate} - {$INDEX_DATA_SHOP.shop.shop_discount.end_time|transDate} WIB
                </p>
            </div>
        </div>
    </section>
{/if}
{if $INDEX_DATA_SHOP.shop.coupon}
    <section class="reduc-box" data-spider="coupon_box">
        <div class="reduc-box-wrap j_share_btn" data-couponid="{$INDEX_DATA_SHOP.shop.coupon.id}">
        <div class="b-bottom">
             <p>Voucher</p>
             <p class="reduc-box-info-coupon">
                  <em>{$INDEX_DATA_SHOP.shop.coupon.amount|priceFormat}</em>
             </p>
             <p class="reduc-expire-coupon">
                 {$INDEX_DATA_SHOP.shop.coupon.start_time|transDate} - {$INDEX_DATA_SHOP.shop.coupon.end_time|transDate} WIB
             </p>
         </div>
        </div>
    </section>
{/if}