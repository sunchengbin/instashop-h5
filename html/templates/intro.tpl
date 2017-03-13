<style>
    .shopinfo-card {
        background: #ffffff;
        padding: 0 1rem 1rem;
        box-sizing: border-box;
        {*border-bottom: 1px solid #d8d8d8;*}
    }

    .shopinfo-card-allp {
        padding: 1rem 1rem 1rem;
    }
    
    .shopinfo-card-header {
        padding: 1rem 0;
        width: 100%;
        font-size: 14px;
        color: #666666;
    }
    
    .shopinfo-base p {
        color: #999999;
        font-size: 14px;
        font-size: 12px;
    }
    
    .shopinfo-base p span {
        color: #70CAFE;
    }
    .ins-typo {
        position:relative;
    }
    .ins-typo:after {
        position:absolute;
        content:" ";
        top:0;
        right:0;
        left:0;
        margin: 0 1rem;
        border-bottom: 1px solid rgba(0, 0, 0, .12);
    }
    .shopinfo-map-content iframe {
        width:100%;
        height:20rem;
        background:#d8d8d8;
    }
    .shopinfo-note .shopinfo-map-content {
        background: #F8F8F8;
        padding:1rem;
    }
    .shopinfo-note p:first-child {
        color:#666666;
    }
    .shopinfo-note p:last-child {
        color:#999999;
    }
    .shopinfo-map .shopinfo-card-header i {
        color: #70CAFE;
    }
    .shopinfo-store-banner li{
        padding:0.125rem;
        box-sizing: border-box;
    }
    .shopinfo-store-banner img{
        max-height:9rem;
    }
    .j_store_banner>li {
        float:left;
    }
    .shopinfo-banner-box{
        min-height: 10rem;
        position: relative;
        width: 100%;
        overflow: hidden;
        margin-top:.5rem;
        z-index: 1;
    }

</style>
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
        <p>Telepon:<span> <i class="icon iconfont icon-phone-font"></i>{$SHOP_INFO_DATA.realinfo.telephone}</span></p>
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
            <p>{$SHOP_INFO_DATA.note}</p>
        </div>
    </div>
    {/if}
</div>
<script>
    var shop_info_data = {$SHOP_INFO_DATA_STR}
</script>