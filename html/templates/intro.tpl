<div>
    {* 店铺基本信息 *}

    {if $SHOP_INFO_DATA.realinfo.opentime.has || $SHOP_INFO_DATA.realinfo.telephone neq ''}
    <div class="shopinfo-card shopinfo-base">
        <div class="shopinfo-card-header">
            Informasi Toko:
        </div>
        {*营业时间 has为开关*}
        {if $SHOP_INFO_DATA.realinfo.opentime.has}
        <p>Jam Operasional Toko: {$SHOP_INFO_DATA.realinfo.opentime.from} - {$SHOP_INFO_DATA.realinfo.opentime.to} WIB</p>
        {/if}
        {*电话不为空时*}
        {if $SHOP_INFO_DATA.realinfo.telephone neq ''}
        <p>Telepon:<a href="tel:{$SHOP_INFO_DATA.realinfo.telephone}"> <i class="icon iconfont icon-phone-font"></i>{$SHOP_INFO_DATA.realinfo.telephone}</a></p>
        {/if}
    </div>
    <div class="ins-typo ins-p-1">
    </div>

    {/if}
    
    {* 店铺地址google map *}
    {if $SHOP_INFO_DATA.realinfo.location.vicinity neq ''}
    <div class="shopinfo-card shopinfo-map">
        <div class="shopinfo-card-header">
           <i class="icon iconfont icon-address-font"></i> Alamat Toko:{$SHOP_INFO_DATA.realinfo.location.vicinity}
        </div>
        <div class="shopinfo-map-content _shopinfo-map-el">
            {*<iframe src="{$HOST_URL}/html/googlemap.html?lat=-34.397&lng=150.644" frameborder="0"></iframe>*}
        </div>
    </div>
    <div class="ins-typo ins-p-1">
    </div>
    {/if}
    {*店铺实景*}
    {if $SHOP_INFO_DATA.realinfo.imgs|@count}
    <div class="shopinfo-card shopinfo-scene">
        <div class="shopinfo-card-header">
            Foto Outlet
        </div>
        <div class="shopinfo-card-content">
            <div class="shopinfo-banner-box">
                <ul class="j_store_banner clearfix">
                </ul>
            </div>
        </div>
    </div>
    {/if}
    
    {*简介*}
    {if $SHOP_INFO_DATA.note neq ''}
    <div class="shopinfo-card shopinfo-note {if $SHOP_INFO_DATA.realinfo.imgs|@count && $SHOP_INFO_DATA.realinfo.location.vicinity neq '' && $SHOP_INFO_DATA.realinfo.opentime.has && $SHOP_INFO_DATA.realinfo.telephone neq ''}{else}shopinfo-card-allp ins-m-t-2{/if}">
        <div class="shopinfo-map-content">
            <p>{if $SHOP_INFO_DATA.note} {$SHOP_INFO_DATA.note|nl2br} {else} Selamat datang di mini websiteku {/if}</p>
        </div>
    </div>
    {/if}
</div>
<script>
    var shop_info_data = {$SHOP_INFO_DATA_STR}
</script>