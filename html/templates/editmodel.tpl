{include file="header.tpl"}
<body data-spider="yngoklm4">
<div class="change-skin-warp" data-spider="change-skin-warp">
    <div class="clearfix">
        <button class="j_change_btn fr" data-skin="default">Ganti</button>
        <p>Template: Standar</p>
    </div>
</div>
<div class="change-skin-warp" data-spider="change-skin-warp">
    <div class="clearfix">
        <button class="j_change_btn fr" data-skin="first">Ganti</button>
        <p>Template: Pinky Spring</p>
    </div>
</div>
<div class="change-skin-warp" data-spider="change-skin-warp">
    <div class="clearfix">
        <button class="j_change_btn fr" data-skin="second">Ganti</button>
        <p>Template: Classic Black</p>
    </div>
</div>
<div class="edit-wraper-box" data-spider="edit-wraper-box">
    {if $INDEX_DATA.template|@count}
        {foreach from=$INDEX_DATA.template item=model name=foo}
            {if $model && ($model.type != 'item_list_type')}
                {if $smarty.foreach.foo.index gt 0}
                    <div class="insert-box j_insert_model">
                        <button class="handle-btn insert-btn">Sisipkan</button>
                    </div>
                {/if}
             {/if}
            {if $model.type eq 'edit_signage'}
            <section class="shop-header" data-spider="edit-signage">
                <button class="handle-btn j_edit_model" data-type="edit_signage">Ubah</button>
                <img class="shop-header-bg j_shop_bg" data-img="{$INDEX_DATA.shop.front_cover}" src="">
                <div class="clearfix shop-info">
                    <div class="shop-img">
                        <img data-img="{$INDEX_DATA.shop.logo}" src="" />
                    </div>
                    <p>{$INDEX_DATA.shop.name}</p>
                    {if $SHOP_INFO_DATA.realinfo.location.vicinity neq ''}
                        <span><i class="icon iconfont icon-shop-font"></i>Ada Outlet</span>
                    {/if}
                </div>
            </section>
            <div class="tabs">
                <ul class="tablist tab-index ins-avg-sm-3 ins-avg-md-3 ins-avg-lg-3">
                    <li class="tabitem tab-active">
                        <div>
                            <i class="icon iconfont icon-newhome"></i>
                            <span>Home</span>
                        </div>
                    </li>
                    <li class="tabitem">

                        <div><i class="icon iconfont icon-allitem"></i><span>Produk</span></div>
                    </li>
                    <li class="tabitem">
                        <div><i class="icon iconfont icon-shopinfo"></i><span>Informasi Toko</span></div>
                    </li>
                </ul>
            </div>
            {elseif $model.type eq 'static_banner'}
            <section class="banner-wraper model-box j_model_box" data-spider="static_banner">
                {if $smarty.foreach.foo.index eq 1}
                    <div class="model-btns clearfix j_model_btns" data-spider="btn-box">
                        <button class="edit-btn j_edit_model handle-btn" data-type="{$model.type}">Ubah</button><button class="del-btn j_del_model handle-btn">Hapus</button>
                    </div>
                {else}
                    <div class="model-btns clearfix j_model_btns" data-spider="btn-box">
                        <button class="edit-btn j_edit_model handle-btn" data-type="{$model.type}">Ubah</button><button class="del-btn j_del_model handle-btn">Hapus</button><button class="move-btn j_moveup_model handle-btn">Pindah ke Atas</button>
                    </div>
                {/if}
                <div class="banner-box">
                    <ul class="item-banner static-banner clearfix">
                        {foreach $model.data as $banner}
                        {if $banner.link_url}
                            <li class=""><a spm-auto="标准banner" spm-click="static-banner" class="block" href="javascript:;"><img data-img="{$banner.img}"/></a></li>
                        {else}
                            <li class=""><a spm-auto="标准banner" spm-click="static-banner" class="block no-cursor" href="javascript:;"><img data-img="{$banner.img}"/></a></li>
                        {/if}
                        {/foreach}
                    </ul>
                </div>
            </section>
            {elseif $model.type eq 'rotate_banner'}
            <section class="model-box j_model_box" data-spider="rotate_banner">
                {if $smarty.foreach.foo.index eq 1}
                    <div class="model-btns clearfix j_model_btns" data-spider="btn-box">
                        <button class="edit-btn j_edit_model handle-btn" data-type="{$model.type}">Ubah</button><button class="del-btn j_del_model handle-btn">Hapus</button>
                    </div>
                {else}
                    <div class="model-btns clearfix j_model_btns" data-spider="btn-box">
                        <button class="edit-btn j_edit_model handle-btn" data-type="{$model.type}">Ubah</button><button class="del-btn j_del_model handle-btn">Hapus</button><button class="move-btn j_moveup_model handle-btn">Pindah ke Atas</button>
                    </div>
                {/if}
                <div class="banner-box">
                    <ul class="item-banner j_banner rotate-banner clearfix">
                        {foreach $model.data as $banner}
                        {if $banner.link_url}
                            <li class=""><a spm-auto="轮播banner" spm-click="rotate-banner" class="block" href="javascript:;"><img data-img="{$banner.img}"/></a></li>
                        {else}
                            <li class=""><a spm-auto="轮播banner" spm-click="rotate-banner" class="block no-cursor" href="javascript:;"><img data-img="{$banner.img}"/></a></li>
                        {/if}
                        {/foreach}
                    </ul>
                </div>
            </section>
            {elseif $model.type eq 'two_list_banner'}

            <section class="banner-wraper two-list-banner j_model_box" data-spider="two_list_banner">
                {if $smarty.foreach.foo.index eq 1}
                    <div class="model-btns clearfix j_model_btns" data-spider="btn-box">
                        <button class="edit-btn j_edit_model handle-btn" data-type="{$model.type}">Ubah</button><button class="del-btn j_del_model handle-btn">Hapus</button>
                    </div>
                {else}
                    <div class="model-btns clearfix j_model_btns" data-spider="btn-box">
                        <button class="edit-btn j_edit_model handle-btn" data-type="{$model.type}">Ubah</button><button class="del-btn j_del_model handle-btn">Hapus</button><button class="move-btn j_moveup_model handle-btn">Pindah ke Atas</button>
                    </div>
                {/if}
                <ul class="two-list-box clearfix">
                    {foreach $model.data as $banner}
                    {if $banner.link_url}
                        <li>
                            <a spm-auto="两列banner" spm-click="two-list-banner" class="block" href="javascript:;">
                                <div class="lazy" data-img="{$banner.img|list_img}"></div>
                            </a>
                        </li>
                    {else}
                        <li>
                            <a spm-auto="两列banner" spm-click="two-list-banner" class="block no-cursor" href="javascript:;">
                                <div class="lazy" data-img="{$banner.img|list_img}"></div>
                            </a>
                        </li>
                    {/if}
                    {/foreach}
                </ul>
            </section>
            {elseif $model.type eq 'img_navigation'}

            <section class="navigation-box model-box j_model_box" data-spider="img_navigation">
                {if $smarty.foreach.foo.index eq 1}
                    <div class="model-btns clearfix j_model_btns" data-spider="btn-box">
                        <button class="edit-btn j_edit_model handle-btn" data-type="{$model.type}">Ubah</button><button class="del-btn j_del_model handle-btn">Hapus</button>
                    </div>
                {else}
                    <div class="model-btns clearfix j_model_btns" data-spider="btn-box">
                        <button class="edit-btn j_edit_model handle-btn" data-type="{$model.type}">Ubah</button><button class="del-btn j_del_model handle-btn">Hapus</button><button class="move-btn j_moveup_model handle-btn">Pindah ke Atas</button>
                    </div>
                {/if}
                {if $model.title}
                <p class="item-title b-bottom"><span></span>{$model.title}</p>
                {/if}
                <div class="nav-img-box">
                    <ul class="nav-img-ul clearfix" style="width:{$model.data|conuntImgNavWidth};">
                        {foreach $model.data as $navigation}
                            <li class="">
                                <a spm-auto="图文导航" spm-click="img-navigation" class="block clearfix j_item_info" data-url="{$navigation.link_url|transUrl}" href="javascript:;">
                                    <div class="lazy" data-img="{$navigation.img|list_img}"></div>
                                    <p class="">{$navigation.navigation_name}</p>
                                </a>
                            </li>
                        {/foreach}
                    </ul>
                </div>
            </section>
            {elseif $model.type eq 'text_navigation'}
                <section class="navigation-box model-box j_model_box" data-spider="text_navigation">
                {if $smarty.foreach.foo.index eq 1}
                    <div class="model-btns clearfix j_model_btns" data-spider="btn-box">
                        <button class="edit-btn j_edit_model handle-btn" data-type="{$model.type}">Ubah</button><button class="del-btn j_del_model handle-btn">Hapus</button>
                    </div>
                {else}
                    <div class="model-btns clearfix j_model_btns" data-spider="btn-box">
                        <button class="edit-btn j_edit_model handle-btn" data-type="{$model.type}">Ubah</button><button class="del-btn j_del_model handle-btn">Hapus</button><button class="move-btn j_moveup_model handle-btn">Pindah ke Atas</button>
                    </div>
                {/if}
                {if $model.title}
                <p class="item-title b-bottom"><span></span>{$model.title}</p>
                {/if}
                <ul class="nav-text-ul">
                    {foreach $model.data as $navigation}
                        <li class="b-top">
                            <a spm-auto="文字导航" spm-click="text-navigation" class="block clearfix j_item_info" data-url="{$navigation.link_url|transUrl}" href="javascript:;">
                                <i class="icon iconfont icon-go-font fr"></i>
                                <span>{$navigation.navigation_name}</span>
                            </a>
                        </li>
                    {/foreach}
                </ul>
            </section>
            {elseif $model.type eq 'two_li_items'}
            <section class="items-box model-box j_model_box" data-spider="two_li_items">
            {if $smarty.foreach.foo.index eq 1}
                <div class="model-btns clearfix j_model_btns" data-spider="btn-box">
                    <button class="edit-btn j_edit_model handle-btn" data-type="{$model.type}">Ubah</button><button class="del-btn j_del_model handle-btn">Hapus</button>
                </div>
            {else}
                <div class="model-btns clearfix j_model_btns" data-spider="btn-box">
                    <button class="edit-btn j_edit_model handle-btn" data-type="{$model.type}">Ubah</button><button class="del-btn j_del_model handle-btn">Hapus</button><button class="move-btn j_moveup_model handle-btn">Pindah ke Atas</button>
                </div>
            {/if}
                 {if $model.title}
                 <p class="item-title b-bottom"><span></span>{$model.title}</p>
                 {/if}
                <ul class="items-list clearfix">
                    {foreach $model.data as $item}
                        <li>
                            <a spm-auto="行单品" spm-click="itemId={$item.id},sellerId={$INDEX_DATA.shop.id}" class="item-info j_item_info" data-url="{$item.h5_url|transUrl}" href="javascript:;">
                                <div class="lazy" data-img="{$item.img|list_img}">
                                    {if $item.is_discount}
                                    <span>-{$item.discount.value}%</span>
                                    {if $item.discounting}
                                    <p><i class="icon iconfont icon-time-font"></i><span data-time="{$item.discount.end_time|discountSecond}">{$item.discount.end_time|discountTime}</span>
                                    </p>
                                    {else}
                                    <p>Coming Soon</p>
                                    {/if}
                                    {/if}
                                </div>
                                <p class="title">{$item.item_comment|nl2br}</p>
                                {if $item.price lt 0}
                                <p class="price"></p>
                                {elseif $item.is_discount}
                                <p class="price cost-price">Rp {$item.price|priceFormat}</p>
                                {else}
                                <p class="price">Rp {$item.price|priceFormat}</p>
                                {/if}
                                {if $item.is_discount}
                                {if $item.discounting}
                                <p class="discount-price">Rp {$item.discount.price|priceFormat}</p>
                                {else}
                                <p class="discount-price">Rp {$item.discount.price|priceFormat}</p>
                                {/if}
                                {else}
                                <p class="discount-price"></p>
                                {/if}
                            </a>
                        </li>
                    {/foreach}
                </ul>
            </section>
            {elseif $model.type eq 'big_img_item'}
            <section class="one-item-box model-box j_model_box" data-spider="big_img_item">
            {if $smarty.foreach.foo.index eq 1}
                <div class="model-btns clearfix j_model_btns" data-spider="btn-box">
                    <button class="edit-btn j_edit_model handle-btn" data-type="{$model.type}">Ubah</button><button class="del-btn j_del_model handle-btn">Hapus</button>
                </div>
            {else}
                <div class="model-btns clearfix j_model_btns" data-spider="btn-box">
                    <button class="edit-btn j_edit_model handle-btn" data-type="{$model.type}">Ubah</button><button class="del-btn j_del_model handle-btn">Hapus</button><button class="move-btn j_moveup_model handle-btn">Pindah ke Atas</button>
                </div>
            {/if}
                {if $model.title neq ''}
                <p class="item-title b-bottom"><span></span>{$model.title}</p>
                {/if}
                <ul class="items-list clearfix">
                    {foreach $model.data as $item}
                        <li>
                            <a spm-auto="大图单品" spm-click="itemId={$item.id},sellerId={$INDEX_DATA.shop.id}" class="item-info j_item_info" data-url="{$item.h5_url|transUrl}" href="javascript:;">
                                <div class="lazy" data-img="{$item.img|list_img}">
                                    {if $item.is_discount}
                                    <span>-{$item.discount.value}%</span>
                                    {if $item.discounting}
                                    <p><i class="icon iconfont icon-time-font"></i><span data-time="{$item.discount.end_time|discountSecond}">{$item.discount.end_time|discountTime}</span>
                                    </p>
                                    {else}
                                    <p>Coming Soon</p>
                                    {/if}
                                    {/if}
                                </div>
                                <p class="title">{$item.item_comment|nl2br}</p>
                                {if $item.price lt 0}
                                <p class="price"></p>
                                {elseif $item.is_discount}
                                <p class="price cost-price">Rp {$item.price|priceFormat}</p>
                                {else}
                                <p class="price">Rp {$item.price|priceFormat}</p>
                                {/if}
                                {if $item.is_discount}
                                {if $item.discounting}
                                <p class="discount-price">Rp {$item.discount.price|priceFormat}</p>
                                {else}
                                <p class="discount-price">Rp {$item.discount.price|priceFormat}</p>
                                {/if}
                                {else}
                                <p class="discount-price"></p>
                                {/if}
                            </a>
                        </li>
                    {/foreach}
                </ul>
            </section>
            {elseif $model.type eq 'list_items'}
            <section class="item-list-box model-box j_model_box" data-spider="list_items">
            {if $smarty.foreach.foo.index eq 1}
                <div class="model-btns clearfix j_model_btns" data-spider="btn-box">
                    <button class="edit-btn j_edit_model handle-btn" data-type="{$model.type}">Ubah</button><button class="del-btn j_del_model handle-btn">Hapus</button>
                </div>
            {else}
                <div class="model-btns clearfix j_model_btns" data-spider="btn-box">
                    <button class="edit-btn j_edit_model handle-btn" data-type="{$model.type}">Ubah</button><button class="del-btn j_del_model handle-btn">Hapus</button><button class="move-btn j_moveup_model handle-btn">Pindah ke Atas</button>
                </div>
            {/if}
                {if $model.title}
                <p class="item-title b-bottom"><span></span>{$model.title}</p>
                {/if}
                <ul class="">
                {foreach $model.data as $item}
                    <li class="clearfix cart-item">
                        <a spm-auto="两列单品" spm-click="itemId={$item.id},sellerId={$INDEX_DATA.shop.id}" class="block j_item_info" data-url="{$item.h5_url|transUrl}" href="javascript:;">
                            <img src="{$item.img|list_img}">
                            <div class="item-info-box">
                                <p class="name">
                                    {$item.item_comment|nl2br}
                                </p>
                                {if $item.price lt 0}
                                    <p class="price"></p>
                                {elseif $item.is_discount}
                                    <p class="discount-price price"><span class="fr">-{$item.discount.value}%</span>Rp {$item.discount.price|priceFormat}</p>
                                    <p class="soon-time">{$item.discount.start_time|transDate}-{$item.discount.end_time|transDate} WIB</p>
                                {else}
                                    <p class="price">Rp {$item.price|priceFormat}</p>
                                {/if}

                            </div>
                        </a>
                    </li>
                {/foreach}
                </ul>
            </section>
            {elseif $model.type eq 'three_li_items'}
            <section class="item-list-box model-box j_model_box" data-spider="three_li_items">
                {if $smarty.foreach.foo.index eq 1}
                    <div class="model-btns clearfix j_model_btns" data-spider="btn-box">
                        <button class="edit-btn j_edit_model handle-btn" data-type="{$model.type}">Ubah</button><button class="del-btn j_del_model handle-btn">Hapus</button>
                    </div>
                {else}
                    <div class="model-btns clearfix j_model_btns" data-spider="btn-box">
                        <button class="edit-btn j_edit_model handle-btn" data-type="{$model.type}">Ubah</button><button class="del-btn j_del_model handle-btn">Hapus</button><button class="move-btn j_moveup_model handle-btn">Pindah ke Atas</button>
                    </div>
                {/if}
                {if $model.title}
                    <p class="item-title b-bottom"><span></span>{$model.title}</p>
                {/if}
                <ul class="three-items-list clearfix">
                    {foreach $model.data as $item}
                    <li>
                        <a class="item-info j_item_info" href="javascript:;">
                            <div class="lazy" data-img="{$item.img|list_img}">
                                {if $item.is_discount}
                                <span>-{$item.discount.value}%</span>
                                {/if}
                            </div>
                        </a>
                    </li>
                    {/foreach}
                </ul>
            </section>
            {/if}
        {/foreach}
    {/if}
    {if $INDEX_DATA.item_list.list|@count}
    <div class="insert-box j_insert_model">
    <button class="handle-btn insert-btn">Sisipkan</button>
    </div>
    <section class="items-box model-box j_default_item_box" data-spider="default-item">
        <div class="model-btns clearfix j_model_btns" data-spider="btn-box">
            <button class="edit-btn j_edit_model handle-btn" data-type="item_list_type">Ubah</button>
        </div>
        <p class="item-title b-bottom"><span></span>Tampilan Produk</p>
        {if $ITEMTYPE eq '3'}
            <ul class="three-items-list clearfix">
                {foreach $INDEX_DATA.item_list.list as $item}
                <li>
                    <a  class="item-info j_item_info" href="javascript:;">
                        <div class="lazy" data-img="{$item.img|list_img}">
                            {if $item.is_discount}
                            <span>-{$item.discount.value}%</span>
                            {/if}
                        </div>
                    </a>
                </li>
                {/foreach}
            </ul>
        {else}
            <ul class="items-list clearfix">
                {foreach from=$INDEX_DATA.item_list.list item=item name=foo}
                {if $smarty.foreach.foo.index lt 2}
                    <li>
                        <a  class="item-info j_item_info" href="javascript:;">
                            <div class="lazy" data-img="{$item.img|list_img}">
                                {if $item.is_discount}
                                <span>-{$item.discount.value}%</span>
                                {if $item.discounting}
                                <p><i class="icon iconfont icon-time-font"></i><span data-time="{$item.discount.end_time|discountSecond}">{$item.discount.end_time|discountTime}</span>
                                </p>
                                {else}
                                <p>Coming Soon</p>
                                {/if}
                                {/if}
                            </div>
                            <p class="title">{$item.item_comment|nl2br}</p>
                            {if $item.price lt 0}
                            <p class="price"></p>
                            {elseif $item.is_discount}
                            <p class="price cost-price">Rp {$item.price|priceFormat}</p>
                            {else}
                            <p class="price">Rp {$item.price|priceFormat}</p>
                            {/if}
                            {if $item.is_discount}
                            {if $item.discounting}
                            <p class="discount-price">Rp {$item.discount.price|priceFormat}</p>
                            {else}
                            <p class="discount-price">Rp {$item.discount.price|priceFormat}</p>
                            {/if}
                            {else}
                            <p class="discount-price"></p>
                            {/if}
                        </a>
                    </li>
                {/if}
                {/foreach}
            </ul>
        {/if}
    </section>
    {/if}
    <button class="j_submit_btn sub-btn b-top">Gunakan ke Tokomu</button>
</div>
<script>var init_data = {$INDEX_DATA_STR};</script>
{include file="footer.tpl"}