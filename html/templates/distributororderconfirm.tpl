{include file="header.tpl" title="header"}
<body data-spider="7zo1j3kq">
<div class="address-wraper">
    <section class="address-form-box">
        <section class="address-wraper" data-spider="wraper-box">
            <section class="cart-list">
                <ul class="j_cart_list">
                    {include file="carts.tpl" title="carts"}
                </ul>
            </section>
            <div class="address-buyer-note user-info info-box">
                <span>Keterangan:  </span>
                <input class="j_buyer_note" type="text" value="" maxlength="500" placeholder="Tidak dapat melebihi 500 karakter"/>
            </div>
            <p class="address-title">Silakan isi alamat pengirimanmu</p>
            <div class="user-info">
                <div class="user-name info-box b-bottom">
                    <input class="j_name" type="text" value="" placeholder="Nama Anda" />
                </div>
                <div class="user-tel info-box b-bottom">
                    <span>+62</span>
                    <input class="j_tel" type="tel" value="" placeholder="No.Hp Anda" maxlength="20" />
                </div>
            </div>
            <div class="tel-msg-txt">
                Pastikan nomor ponselmu sudah benar. Informasi nomor rekening dan pembayaran akan kami kirimkan ke nomor ponsel ini
            </div>
            <div class="user-address j_user_address">
                <div class="info-box b-bottom b-top act clearfix" data-name="province">
                    <i class="icon iconfont fr icon-go-font"></i>
                    <p class="j_province"></p>
                </div>
                <div class="info-box b-bottom clearfix" data-name="city">
                    <i class="icon iconfont fr icon-go-font"></i>
                    <p class="j_city"></p>
                </div>
                <div class="info-box b-bottom clearfix" data-name="country">
                    <i class="icon iconfont fr icon-go-font"></i>
                    <p class="j_country"></p>
                </div>
                <div class="info-box-address clearfix">
                    <textarea class="j_street" maxlength="400" placeholder="Alamat jelas"></textarea>
                </div>
                <div class="info-box b-top clearfix">
                    <input class="j_post" maxlength="10" type="text" value="" placeholder="Kode Pos: Pilih, Sebaiknya diisi" />
                </div>
            </div>
            {if $INDEX_DATA.carts|isExistSupplyShop}
                <div class="hiden j_logistics">
                    <p class="address-title">Pilih Jenis Paket Pengiriman</p>
                    <ul class="logistics-list j_logistics_info">
                    </ul>
                </div>
                {else}
                {if $INDEX_DATA.shop.express_free eq 0}
                    <div class="hiden j_logistics">
                        <p class="address-title">Pilih Jenis Paket Pengiriman</p>
                        <ul class="logistics-list j_logistics_info">
                        </ul>
                    </div>
                {/if}
            {/if}

            <div class="total-box">
                {if $INDEX_DATA.shop.shop_discount}
                <div class="reduc-info" style="display:none">
                    <p class="clearfix"><span class="fr j_reduc_price"></span>Potongan Harga: </p>
                </div>
                {/if}
                <div class="total-ps b-top">
                    <p class="total-p clearfix"><span class="fr j_freight">Rp 0</span>Biaya Pengiriman: </p>
                    <p class="total-p clearfix"><span class="fr j_total">Rp 0</span>Jumlah Total: </p>
                </div>
            </div>
            <button class="btn confirm-btn j_submit_buy">Ajukan Pesanan</button>
            <div class="agree-info clearfix">
                <i class="icon iconfont fl icon-checked-font j_check_box"></i>
                <p>Saya telah membaca dan memahami <a href="{$HOST_NAME}/html/agreeinfo.php" spm-auto="使用协议" spm-click="click" >syarat dan ketentuan penggunaan</a></p>
            </div>
        </section>
    </section>
    <section class="address-list-box j_address_list_box">
        <nav class="header-nav address-header-nav j_address_header clearfix">
            <i class="icon iconfont j_go_address icon-back-font"></i> Alamat Pengiriman
        </nav>
        <section class="address-list j_address_list">
            <div class="list-box j_list_box">
            </div>
        </section>
    </section>
</div>

<script>var init_data = {$INDEX_DATA_STR};</script>
{include file="footer.tpl"}
