{include file="header.tpl"}
<body data-spider="23anxvhr">
    <section class="coupon-info">
        <div class="shop-info clearfix">
            <div class="shop-img" data-spider="header-box">
                <a class="block" spm-auto="go-home" href="{$INDEX_DATA.coupon.url|transUrl}">
                    <img data-img="" src="{$INDEX_DATA.coupon.logo}"/>
                </a>
            </div>
            <p>{$INDEX_DATA.coupon.name}</p>
        </div>
        <div class="coupon-info-box">
            Selamat, kode voucher berhasil diambil. Yuk segera dibelanjakan!
        </div>
        <div class="coupon-box">
            <div class="coupon-box-wraper clearfix">
                <div class="coupon-box-left">
                    <p class="price">Rp {$INDEX_DATA.coupon.coupon.amount|priceFormat}</p>
                    {if $INDEX_DATA.coupon.coupon.min_limit gt 0}
                        <p class="condition">—Min.Pembelian Rp {$INDEX_DATA.coupon.coupon.min_limit|priceFormat}—</p>
                    {else}
                        <p class="condition"></p>
                    {/if}
                    <p class="use-time">{$INDEX_DATA.coupon.coupon.start_time|transDate} - {$INDEX_DATA.coupon.coupon.end_time|transDate} WIB</p>
                </div>
                <div class="coupon-box-right">
                    <p>code:</p>
                    <p class="code-box">{$INDEX_DATA_CODE}</p>
                </div>
            </div>
        </div>
    </section>
    <section class="coupon-operate" data-spider="coupon_operate_box" data="{$INDEX_DATA.coupon.coupon.status}">
    {if $INDEX_DATA.coupon.coupon.type eq 2}
    {*售后优惠券*}
        <div class="past-explain">Salin dan Isi KODE VOUCHER di atas pada saat mengajukan pesanan</div>
    {else}
        <div class="past-explain">Silakan screenshot halaman ini untuk menyimpan kode voucher. Ketika mengajukan pesanan, kode voucher harus dimasukkan untuk mendapat diskon</div>
    {/if}
    {if $INDEX_DATA.coupon.coupon.status eq 0 || $INDEX_DATA.coupon.coupon.status eq 1}
        {if $INDEX_DATA.coupon.coupon.type eq 2}
        {*售后优惠券*}
            <a href="{$INDEX_DATA.coupon.url}" spm-auto="立即使用售后优惠券" class="block go-home">Gunakan Sekarang</a>
        {else}
            <a href="{$INDEX_DATA.coupon.url}" spm-auto="立即使用" class="block go-home">Gunakan Sekarang</a>
            <a href="javascript:;" spm-auto="分享获取优惠券" class="block share-coupon j_share_btn">Bagikan Promo Voucher</a>
        {/if}
    {else}
        <a href="{$INDEX_DATA.coupon.url|transUrl}" spm-auto="去逛逛" class="block go-homeed">Masuk ke toko</a>
    {/if}
    </section>
    <section class="coupon-introduce">
        <ul>
            <li class="clearfix">
                <div>1. </div>
                <div>Ketika mengajukan pesanan, masukkan kode voucher untuk mendapatkan harga diskon</div>
            </li>
            <li class="clearfix">
                <div>2. </div>
                <div>Gunakan kode voucher sebelum kadaluwarsa</div>
            </li>
            <li class="clearfix">
                <div>3. </div>
                <div>Keputusan <strong>{$INDEX_DATA.coupon.name}</strong> bersifat mutlak dan tidak dapat diganggu gugat</div>
            </li>
        </ul>
    </section>
<script>var init_data = '{$INDEX_DATA_STR}';</script>
{include file="footer.tpl"}
