{include file="header.tpl"}
<body data-spider="">
    <nav class="header-nav clearfix" data-spider="header-nav">
        <i class="icon iconfont j_go_back icon-back-font"></i>
        {$INDEX_TITLE_STR}
    </nav>

    <section class="address-list j_address_list" data-spider="address-list-box">
        {if !$ADDRESS_LIST|count}
            <div class="">Silakan atur 'barang dikirim dari' terlebih dahulu</div>
        {else}
            {foreach from=$ADDRESS_LIST item=address}
                <div class="address-box j_address_wraper" data-id="{$address.id}">
                    {if $ADDRESS_ID eq $address.id}
                    {*地址被选中状态*}
                    <div class="selected-address" flex="">
                        <div class="selected-icon j_address_info" data-id="{$address.id}" flex-box="0" flex="main:center cross:center">
                            <i class="icon iconfont fr icon-allright-font"></i>
                        </div>
                    {/if}
                    {if $ADDRESS_ID eq $address.id}
                    {*地址被选中状态*}
                        <div class="address-info-box" flex-box="1">
                    {else}
                        <div class="address-info-box">
                    {/if}
                            <div class="clearfix user-info j_address_info" data-id="{$address.id}">
                                <span class="fr">{$address.telephone}</span>
                                <i class="icon iconfont fr icon-phone-font"></i>
                                <i class="icon iconfont fl icon-address-font"></i>
                                <span class="fl">{$address.name}</span>
                            </div>

                            {if $address.flag eq 1}
                                <div class="user-address-info">
                                    <div class="address-info j_address_info" data-id="{$address.id}">
                                        {$address.address.street}, {$address.address.country}, {$address.address.city} {$address.address.post }, {$address.address.province}
                                    </div>
                            {else}
                                <div class="user-address-info" flex="">
                                <div class="address-info j_address_info" data-id="{$address.id}" flex-box="1">
                                    {$address.address.street}, {$address.address.country}, {$address.address.city} {$address.address.post }, {$address.address.province}
                                </div>
                                <div class="j_edit_address" data-id="{$address.id}" flex="main:center cross:center" flex-box="0">
                                    <i class="icon iconfont fr icon-edit-address"></i>
                                </div>
                            {/if}

                            </div>
                            {if $address.flag eq 1}
                                <div class="flag-address b-top clearfix">
                                    <span>Alamat Utama</span>
                                    <i class="icon iconfont fr icon-edit-address j_edit_address" data-id="{$address.id}"></i>
                                </div>
                            {/if}
                        </div>
                    {if $ADDRESS_ID eq $address.id}
                    {*地址被选中状态*}
                    </div>
                    {/if}

                </div>
            {/foreach}
        {/if}
    </section>
    <div class="add-address">
        <a class="handle-btn j_add_address" href="javascript:;">tambah alamat baru</a>
    </div>
    <script>
    var user_info = {$INDEX_USER_INFO};
    </script>
{include file="footer.tpl"}