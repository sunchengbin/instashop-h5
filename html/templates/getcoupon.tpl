{include file="header.tpl"}
<body data-spider="ymknfo25">
    <section class="coupon-info">
        <div class="shop-info clearfix">
            <div class="shop-img">
                <img data-img="" src="{$INDEX_DATA.coupon.logo}"/>
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
        <div class="telphone-box"><input type="tel" maxlength="20" class="telphone j_tel" placeholder="No.Hp"/></div>
        <div class="explain">Kode Voucher akan dikirimkan ke nomor ini, pastikan nomor ponselmu sudah diisi dengan benar</div>
        <a href="javascript:;" spm-auto="领取优惠券" class="block j_get_coupon_btn">segera</a>
    </section>
    <section class="coupon-introduce">
        <p>Silakan screenshot juga halaman ini untuk menyimpan kode voucher</p>
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
