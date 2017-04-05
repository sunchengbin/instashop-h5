{include file="../header.tpl"}
<body data-spider="ymknfo25">
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
            Selamat, kamu memiliki satu voucher yang belum diambil. Yuk ambil sekarang!
        </div>
        <div class="coupon-box">
            <div class="get-coupon-box clearfix">
                Rp {$INDEX_DATA.coupon.coupon.amount|priceFormat}
            </div>
        </div>
    </section>
    <section class="coupon-operate" data-spider="coupon_operate_box">
        {if $INDEX_DATA.coupon.coupon.status eq 0 || $INDEX_DATA.coupon.coupon.status eq 1}
            <div class="telphone-box"><input type="tel" maxlength="20" class="telphone j_tel" placeholder="No.Hp"/></div>
            <div class="explain">Kode Voucher akan dikirimkan ke nomor ini, pastikan nomor ponselmu sudah diisi dengan benar</div>
            <a href="javascript:;" spm-auto="领取优惠券" class="block j_get_coupon_btn">Ambil Sekarang</a>
        {else}
            <div class="past-explain">Promo ini sudah berakhir</div>
            <a href="{$INDEX_DATA.coupon.url|transUrl}" spm-auto="去逛逛" class="block">Masuk ke toko</a>
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
{include file="../footer.tpl"}
