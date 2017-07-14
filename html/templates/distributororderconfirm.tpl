{include file="header.tpl" title="header"}
<body data-spider="7zo1j3kq">
<div class="address-wraper">
    <section class="address-form-box">
        <section class="address-wraper" data-spider="wraper-box">
            {if $SHOW_SEND_USER_INFO neq 'self'}
            <p class="address-title">Silahkan isi informasi pengirim pesanan </p>
            <div class="user-info">
                <div class="user-name info-box b-bottom">
                    <input class="j_shipper_name" type="text" input-txt="" value="{$INDEX_DATA.buyer_info.instashop_shop_name}" placeholder="Nama Anda" />
                </div>
                <div class="user-tel info-box b-bottom">
                    <span>+62</span>
                    <input class="j_shipper_tel" input-txt="" type="tel" value="{$INDEX_DATA.buyer_info.instashop_telephone}" placeholder="No.Hp Anda" maxlength="20" />
                </div>
            </div>
            {/if}
            <p class="address-title">Penerima Pesanan</p>
            <div class="user-info">
                <div class="user-name info-box b-bottom">
                    <input class="j_name" input-txt="" type="text" value="" placeholder="Nama Anda" />
                </div>
                <div class="user-tel info-box">
                    <span>+62</span>
                    <input class="j_tel" input-txt="" type="tel" value="" placeholder="No.Hp Anda" maxlength="20" />
                </div>
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
                    <textarea class="j_street" input-txt="" maxlength="400" placeholder="Alamat jelas"></textarea>
                </div>
                <div class="info-box b-top b-bottom">
                    <input class="j_post" input-txt="" maxlength="10" type="text" value="" placeholder="Kode Pos: Pilih, Sebaiknya diisi" />
                </div>
            </div>
            <div class="pay-type-box">
                <div class="info-box j_pay_way_box pay-type clearfix" data-pay-way="11">
                    Pilih Cara Pembayaran 
                    <div class="fr">
                        <i class="icon iconfont fr icon-go-font"></i>
                        <span class="pay-way-content j_pay_way_content">Transfer via ATM</span>
                    </div>
                </div>
            </div>
            {if $INDEX_DATA.express_free eq 0}
                {*不包邮*}
                <div class="logistics-box b-bottom j_logistics j_sel_logistics clearfix">
                    Pilih Jenis Paket Pengiriman
                    <div class="fr">
                        <i class="icon iconfont fr icon-go-font"></i>
                        <span class="j_logistics_info"></span>
                    </div>
                </div>
            {/if}
            <section class="cart-list {if not $INDEX_DATA.carts}no-items b-bottom{/if}">
                <ul class="j_cart_list">
                    {include file="distributorcarts.tpl" title="carts"}
                </ul>
            </section>
            <div class="address-buyer-note user-info info-box">
                <span>Keterangan:  </span>
                <input class="j_buyer_note" input-txt="" type="text" value="" maxlength="500" placeholder="Tidak dapat melebihi 500 karakter"/>
            </div>
            <div class="total-box">
                <div class="total-ps b-top">
                    <p class="total-p clearfix"><span class="fr j_post j_freight">Rp 0</span>Biaya Pengiriman: </p>
                    <p class="total-p clearfix"><span class="fr j_sum j_total" data-price="{$INDEX_DATA.price.total_price}">Rp {$INDEX_DATA.price.total_price|priceFormat}</span>Jumlah Total: </p>
                </div>
                {if $INDEX_DATA.carts}
                    <button class="btn confirm-btn j_submit_buy">Ajukan Pesanan</button>
                {else}
                    <button class="btn confirm-btn j_submit_buy hidden">Ajukan Pesanan</button>
                {/if}
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
