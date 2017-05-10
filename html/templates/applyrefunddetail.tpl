{include file="header.tpl"}
<body data-spider="kduyfjxm">
    <nav class="header-nav clearfix" data-spider="header-nav">
        <a spm-auto="回到订单详情页" href = "{$INDEX_DATA.order.url}?from=applyrefunddetail#{if $INDEX_DATA.item_sku_id != 0}{$INDEX_DATA.item_sku_id}{else}{$INDEX_DATA.item_id}{/if}"><i class="icon iconfont fr icon-allright-font"></i></a>
        Status Pengembalian Dana
    </nav>
    <section class="content-box">
        <ul class="refund-progress">
            {foreach key=key item=item from=$INDEX_DATA.status_flow}
            <li class="{if $item.time}act{/if}" flex="dir:left">
                <div class="progress-step"><span>{$key+1}</span></div>
                <div class="progress-info">
                    <p class="progress-info-content">{$item.title}</p>
                    <p class="progress-info-time">{if $item.time}{$item.time|dateFormat}{/if}</p>
                </div>
            </li>
            {/foreach}
        </ul>
        <ul class="refund-info-box">
            <li class="b-bottom">
                <h2>Jumlah Pengembalian Dana</h2>
                <p>Rp {$INDEX_DATA.request_refund_price|priceFormat}</p>
            </li>
            <li class="b-bottom">
                <h2>Nomor Rekening Penerima</h2>
                <p>{$INDEX_DATA.bank_info.c_number}</p>
            </li>
            <li class="b-bottom">
                <h2>Nama Pemilik Rekening</h2>
                <p>{$INDEX_DATA.bank_info.c_name}</p>
            </li>
            <li class="b-bottom">
                <h2>Alasan Pengembalian Dana</h2>
                <p>{$INDEX_DATA.reason}</p>
            </li>
            <li class="b-bottom">
                <h2>Foto Bukti Pengajuan</h2>
                {foreach $INDEX_DATA.evidence as $evidenceimg}
                    <img src="{$evidenceimg}">
                {/foreach}
            </li>
        </ul>
    </section>
{include file="footer.tpl"}
