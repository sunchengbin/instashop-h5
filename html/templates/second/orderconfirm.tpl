{include file="../header.tpl"}
<body data-spider="2cj9l5q4">
<nav class="header-nav clearfix " data-spider="header-nav">
    <i class="icon iconfont j_go_back icon-back-font"></i>
    Pesanan
</nav>
<section class="">

    {*邮寄地址*}
    <div class="address-box j_address_wraper">
        <div class="clearfix user-info">
            <span class="fr">{$DATA.buyer_address.telephone}</span>
            <i class="icon iconfont fr icon-phone-font"></i>
            <i class="icon iconfont fl icon-address-font"></i>
            <span class="fl">{$DATA.buyer_address.name}</span>
        </div>
        <div class="user-address-info">
            <i class="icon iconfont fr icon-go-font"></i>
            <div class="address-info">
                {$DATA.buyer_address.address.street}, {$DATA.buyer_address.address.country}, {$DATA.buyer_address.address.city} {$DATA.buyer_address.post}, {$DATA.buyer_address.address.province}
            </div>
        </div>
    </div>

    {*担保交易*}
    <div class="trade-plug">
        <div class="trade-box j_sel_payment clearfix">
            <div class="trade-box-title">
                Pilih Metode Pembayaran
            </div>
            <div class="divide"></div>
            <div class="trade-items">
                <div class="trade-item">
                    <div class="checkbox-div j_trade_sel" data-tradetype="1">
                        <div class="checkbox-warp">
                            <div class="checkbox"></div>
                        </div>
                        Transfer ke Penjual
                    </div>
                </div>
                <div class="divide"></div>
                <div class="trade-item">
                    <div class="checkbox-div {if $DATA.shop_info.warrant neq 1}checkbox-disabled{/if} j_trade_sel " data-tradetype="2">
                        <div class="checkbox-warp">
                            <div class="checkbox"></div>
                        </div>
                        Rekening Bersama
                    </div>
                </div>
            </div>
        </div>
        <div class="trade-tip">
            <a href="{$HOST_NAME}/html/applyrefundtypeexplain.php" target="_blank">两种交易类型有何区别？</a>
        </div>
    </div>

    {*物流*}
    {if $DATA.express_free eq 0}
        {*不包邮*}
        {if $DATA.buyer_cart|count and $DATA.express_fee_list.list|testExpress}
            <div class="logistics-box j_sel_logistics clearfix">
                Pilih Jenis Paket Pengiriman
                <div class="fr">
                    <i class="icon iconfont fr icon-go-font"></i>
                    <span class="j_logistics_info"></span>
                </div>
            </div>
        {else}
            <div class="logistics-box clearfix">
                Maaf, saat ini alamat tujuanmu belum dapat dijangkau
            </div>
        {/if}
    {/if}

    {*商品和其他购物按钮*}
    <div class="list-box" data-spider="list-box">
        <div class="shop-info clearfix">
            <img src="{$DATA.shop_info.shop_log}">
            <p>{$DATA.shop_info.shop_name}</p>
        </div>
        <ul class="order-items">
            {include file="../orderconfirmcart.tpl"}
        </ul>
        <p class="clearfix buyer-note-p">
            <span>Keterangan: </span>
            <input maxlength="500" type="text" placeholder="Tidak dapat melebihi 500 karakter" class="j_buyer_note"/>
        </p>
        {if $DATA.price.discount_price}
        <div class="reduc-info b-bottom">
            <p class="clearfix"><span class="fr j_reduc_price">-Rp {$DATA.price.discount_price|priceFormat}</span>Potongan Harga: </p>
        </div>
        {/if}
        <div class="order-info">
            <p class="clearfix"><span class="fr j_post">Rp 0</span>Biaya Pengiriman: </p>
            <p class="clearfix"><span class="fr j_sum" data-price="{$DATA.price.total_price}">Rp {$DATA.price.total_price|priceFormat}</span>Jumlah Total: </p>
        </div>
        {if $DATA.express_free eq 0}
            {*不包邮*}
            {if $DATA.buyer_cart|count and $DATA.express_fee_list.list|testExpress}
                <button class="btn confirm-btn j_submit_buy">Ajukan Pesanan</button>
            {/if}
        {else}
            <button class="btn confirm-btn j_submit_buy">Ajukan Pesanan</button>
        {/if}
        <div class="agree-info clearfix">
            <i class="icon iconfont fl icon-checked-font j_check_box"></i>
            <p>Saya telah membaca dan memahami <a href="{$HOST_NAME}/html/agreeinfo.php">syarat dan ketentuan penggunaan</a></p>
        </div>
    </div>
</section>
<script>
var user_info = {$INDEX_USER_INFO};
var ConfirmData = {$DATA_STR};
</script>
{include file="../footer.tpl"}