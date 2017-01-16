{if $INDEX_DATA.shop.shop_discount}
    <section class="reduc-box">
        <div class="reduc-box-wrap j_reduc_box">
            <i class="iconfont icon-go-font fr reduc-box-go"></i>
            <div>
                <p class="reduc-box-info">
                    <i class="iconfont icon-bugle"></i>
                    {foreach $INDEX_DATA.shop.shop_discount.info as $keyvar=>$item}
                        {if $keyvar eq 0}
                        Minimal Pembelian Rp {$item.condition_price|priceFormat} Potongan Rp {$item.discount_price|priceFormat}
                        {else}
                        , Minimal Pembelian Rp {$item.condition_price|priceFormat} Potongan Rp {$item.discount_price|priceFormat}
                        {/if}
                    {/foreach}
                </p>
                <p class="reduc-expire">
                    {$INDEX_DATA.shop.shop_discount.start_time|transDate} - {$INDEX_DATA.shop.shop_discount.end_time|transDate} WIB
                </p>
            </div>
        </div>
    </section>
{/if}
{if $INDEX_DATA.shop.coupon}
    <section class="reduc-box">
        <div class="reduc-box-wrap j_share_btn" data-couponid="{$INDEX_DATA.shop.coupon.id}">
            <i class="iconfont icon-go-font fr reduc-box-go"></i>
        <div>
        <p class="reduc-box-info">
            <i class="iconfont icon-bugle"></i>
                优惠券: Rp {$INDEX_DATA.shop.coupon.amount|priceFormat}
            </p>
            <p class="reduc-expire">
                {$INDEX_DATA.shop.coupon.start_time|transDate} - {$INDEX_DATA.shop.coupon.end_time|transDate} WIB
            </p>
            </div>
        </div>
    </section>
{/if}