{include file="header.tpl"}
<body data-spider="ixawcheq">
    <nav class="header-nav clearfix" data-spider="header-nav">
        <i class="icon iconfont j_log_out icon-logout fr" spm-auto="退出登录" spm-click="">Keluar</i>
        <i class="icon iconfont j_go_back icon-back-font" spm-auto="回退" spm-click=""></i>
        Pesanan Saya
    </nav>
    <section class="content-box">
        {if $INDEX_DATA|count eq 0}
            <p class="no-order">Belum ada pesanan</p>
        {else}
            <ul class="trade-order-list j_order_list" data-spider="order-list">
            {foreach $INDEX_DATA as $item}
                {if $item.items|count > 1}
                    <li class="order-info j_order_info" data-url="{$item.url}">
                        <p class="order-status b-bottom"><span>{$item.state_txt}</span>{$item.add_time|dateFormat}</p>
                        <div class="info-detail">
                            <div class="items-img">
                                {foreach from=$item.items item=one_item name=items}
                                    {if $smarty.foreach.items.index lt 4}
                                        <img data-img="{$one_item.img_head}">
                                    {/if}
                                {/foreach}
                            </div>
                        </div>
                       <p class="clearfix total-price">{if $item.warrant_status neq 'nowarrant'}<i class="icon iconfont fl icon-warrant-flag"></i>{/if}Jumlah Total：Rp {$item.total_price|priceFormat}</p>
                    </li>
                {else}
                    <li class="order-info j_order_info" data-url="{$item.url}">
                        <p class="order-status b-bottom"><span>{$item.state_txt}</span>{$item.add_time|dateFormat}</p>
                        <div class="info-detail" flex="dir:left">
                            <div class="one-item">
                                <img data-img="{$item.items[0].img_head}">
                            </div>
                            <div class="one-item-explain">
                                {$item.items[0].item_title}
                            </div>
                        </div>
                        <p class="clearfix total-price">{if $item.warrant_status neq 'nowarrant'}<i class="icon iconfont fl icon-warrant-flag"></i>{/if}Jumlah Total：Rp {$item.total_price|priceFormat}</p>
                    </li>
                {/if}

            {/foreach}

            </ul>
        {/if}
    </section>
{include file="footer.tpl"}
