{include file="header.tpl"}
<body data-spider="23anxvhr">
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
        <p class="cart-explain">Memesan masukan kode untuk Penawaran</p>
    </section>
    <section class="coupon-operate" data-spider="coupon_operate_box">
        <p>Selamat, Anda menerima sukses!</p>
        <a href="{$INDEX_DATA.coupon.url}" spm-auto="立即使用" class="block go-home">segera</a>
        <a href="javascript:;" spm-auto="分享获取优惠券" class="block share-coupon j_share_btn">Share membuat merah</a>
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
