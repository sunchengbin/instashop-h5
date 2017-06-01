{include file="header.tpl"}
<body data-spider="">
    <nav class="header-nav clearfix" data-spider="header-nav">
        <i class="icon iconfont j_go_back icon-back-font"></i>
        {$INDEX_TITLE_STR}
    </nav>

    <section class="address-list j_address_list" data-spider="address-list-box">
        {if !$ADDRESS_LIST|count}
            <div class="">还没有地址</div>
        {else}
            {foreach from=$ADDRESS_LIST item=address}
                <div class="address-box j_address_wraper" data-id="{$address.id}">
                    {if $ADDRESS_ID eq $address.id}
                    {*地址被选中状态*}
                    <div class="selected-address" flex="">
                        <div class="selected-icon" flex-box="0" flex="main:center cross:center">
                            <i class="icon iconfont fr icon-allright-font"></i>
                        </div>
                    {/if}
                    {if $ADDRESS_ID eq $address.id}
                    {*地址被选中状态*}
                        <div class="address-info-box" flex-box="1">
                    {else}
                        <div class="address-info-box">
                    {/if}
                            <div class="clearfix user-info">
                                <span class="fr">{$address.telephone}</span>
                                <i class="icon iconfont fr icon-phone-font"></i>
                                <i class="icon iconfont fl icon-address-font"></i>
                                <span class="fl">{$address.name}</span>
                            </div>
                            <div class="user-address-info">
                                <i class="icon iconfont fr icon-go-font"></i>
                                <div class="address-info">
                                    {$address.address.street}, {$address.address.country}, {$address.address.city} {$address.address.post }, {$address.address.province}
                                </div>
                            </div>
                            {if $address.flag eq 1}
                                <div class="">

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
    <div class="add-address j_add_address">
        <a class="handle-btn" href="{$HOST_NAME}/html/address.php">添加地址</a>
    </div>
    <script>
    var user_info = {$INDEX_USER_INFO};
    </script>
{include file="footer.tpl"}