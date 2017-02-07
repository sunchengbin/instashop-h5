{include file="header.tpl"}
<body data-spider="ymknfo25">
    <section class="coupon-info">
        <div class="shop-info clearfix">
            <div class="shop-img">
                <a class="block" href="{$INDEX_DATA.coupon.url|transUrl}">
                    <img data-img="" src="{$INDEX_DATA.coupon.logo}"/>
                </a>
            </div>
            <p>{$INDEX_DATA.coupon.name}</p>
        </div>
        <div class="coupon-info-box">
            Selamat, kamu memiliki satu voucher yang belum diambil. Yuk ambil sekarang!
        </div>
        <div class="coupon-box">
            <div class="get-coupon-box clearfix">
                Rp {$INDEX_DATA.coupon.coupon.amount|priceFormat}
            </div>
        </div>
    </section>
    <section class="coupon-operate">
        {if $INDEX_DATA.coupon.coupon.status neq 0}
            <div class="past-explain">Voucher sudah kadaluwarsa</div>
            <a href="{$INDEX_DATA.coupon.url|transUrl}" spm-auto="去逛逛" class="block">Beli Lagi</a>
        {else}
            <div class="telphone-box"><input type="tel" maxlength="20" class="telphone j_tel" placeholder="No.Hp"/></div>
            <div class="explain">Kode Voucher akan dikirimkan ke nomor ini, pastikan nomor ponselmu sudah diisi dengan benar</div>
            <a href="javascript:;" spm-auto="领取优惠券" class="block j_get_coupon_btn">segera</a>
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
                <div>Keputusan {$INDEX_DATA.coupon.name} bersifat mutlak dan tidak dapat diganggu gugat</div>
            </li>
        </ul>
    </section>
<script>var init_data = '{$INDEX_DATA_STR}';</script>
{include file="footer.tpl"}
