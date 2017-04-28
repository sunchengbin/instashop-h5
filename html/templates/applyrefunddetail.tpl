{include file="header.tpl"}
<body data-spider="">
    <nav class="header-nav clearfix" data-spider="header-nav">
        <i class="icon iconfont fr icon-allright-font" onclick="location.href='{$INDEX_DATA.url}'+'#'+{if $INDEX_DATA.item_sku_id != 0}{$INDEX_DATA.item_sku_id}{else}{$INDEX_DATA.item_id}{/if};"></i>
        申请退款
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
                <h2>Jumlah pengembalian dana</h2>
                <p>Rp {$INDEX_DATA.request_refund_price|priceFormat}</p>
            </li>
            <li class="b-bottom">
                <h2>Alasan Pengembalian Dana</h2>
                <p>{$INDEX_DATA.reason}</p>
            </li>
            <li class="b-bottom">
                <h2>Sertifikat Upload（Hingga 3pcs）</h2>
                {foreach $INDEX_DATA.evidence as $evidenceimg}
                    <img src="{$evidenceimg}">
                {/foreach}
            </li>
            <li class="b-bottom">
                <h2>Nama Bank</h2>
                <p>{$INDEX_DATA.bank_info.b_name}</p>
            </li>
            <li class="b-bottom">
                <h2>Rekening Bank</h2>
                <p>{$INDEX_DATA.bank_info.b_branch}</p>
            </li>
            <li class="b-bottom">
                <h2>Nama Pemilik Rekening</h2>
                <p>{$INDEX_DATA.bank_info.c_name}</p>
            </li>
            <li class="b-bottom">
                <h2>Nomor Ponsel</h2>
                <p>{$INDEX_DATA.bank_info.c_number}</p>
            </li>
        </ul>
    </section>
{include file="footer.tpl"}
