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
            Selamat, Anda ambil kupon, pergi belanja sekarang!
        </div>
        <div class="coupon-box">
            <div class="get-coupon-box clearfix">
                Rp {$INDEX_DATA.coupon.coupon.amount|priceFormat}
            </div>
        </div>
    </section>
    <section class="coupon-operate">
        <div class="telphone-box"><input type="tel" class="telphone j_tel" placeholder="No.Hp"/></div>
        <div class="explain">Selamat, Anda menerima sukses!</div>
        <a href="javascript:;" spm-auto="领取优惠券" class="block j_get_coupon_btn">segera</a>
    </section>
    <section class="coupon-introduce">
        <p>Selamat, Anda menerima sukses!</p>
        <ul>
            <li class="clearfix">
                <div>1. </div>
                <div>Silakan simpan halaman screenshot, masukkan kode kode ketika memesan Kirim</div>
            </li>
            <li class="clearfix">
                <div>2. </div>
                <div>Gunakan kupon di acara validitas</div>
            </li>
            <li class="clearfix">
                <div>3. </div>
                <div>Kegiatan interpretasi xxx shop semua</div>
            </li>
        </ul>
    </section>
<script>var init_data = '{$INDEX_DATA_STR}';</script>
{include file="footer.tpl"}
