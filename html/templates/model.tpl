{if $INDEX_DATA.template|@count}
    {foreach $INDEX_DATA.template as $model}
        {if $model.type eq 'edit_signage'}
        {elseif $model.type eq 'static_banner'}
        <section class="banner-wraper model-box j_model_box">
            <div class="banner-box">
                <ul class="item-banner static-banner clearfix">
                    {foreach $model.data as $banner}
                        <li class=""><a class="block" href="{$banner.link_url}"><img data-img="{$banner.img}"/></a></li>
                    {/foreach}
                </ul>
            </div>
        </section>
        {elseif $model.type eq 'rotate_banner'}
        <section class="model-box j_model_box">
            <div class="banner-box">
                <ul class="item-banner j_banner rotate-banner clearfix">
                    {foreach $model.data as $banner}
                        <li class=""><a class="block" href="{$banner.link_url}"><img data-img="{$banner.img}"/></a></li>
                    {/foreach}
                </ul>
            </div>
        </section>
        {elseif $model.type eq 'two_list_banner'}
        <section class="banner-wraper two-list-banner j_model_box">
            <ul class="two-list-box clearfix">
                {foreach $model.data as $banner}
                    <li>
                        <a class="block" href="{$banner.link_url}">
                            <div class="lazy" data-img="{$banner.img|list_img}"></div>
                        </a>
                    </li>
                {/foreach}
            </ul>
        </section>
        {elseif $model.type eq 'img_navigation'}
        <section class="navigation-box model-box j_model_box">
            {if $model.title}
            <p class="item-title b-bottom"><span></span>{$model.title}</p>
            {/if}
            <div class="nav-img-box j_nav_img_box">
                <ul class="nav-img-ul clearfix">
                    {foreach $model.data as $navigation}
                        <li class="">
                            <a class="block clearfix j_item_info" data-url="{$navigation.link_url}" href="javascript:;">
                                <div class="lazy" data-img="{$navigation.img|list_img}"></div>
                                <p class="">{$navigation.navigation_name}</p>
                            </a>
                        </li>
                    {/foreach}
                </ul>
            </div>
        </section>
        {elseif $model.type eq 'text_navigation'}
        <section class="navigation-box model-box j_model_box">
            {if $model.title}
            <p class="item-title b-bottom"><span></span>{$model.title}</p>
            {/if}
            <ul class="nav-text-ul">
                {foreach $model.data as $navigation}
                    <li class="b-top">
                        <a class="block clearfix j_item_info" data-url="{$navigation.link_url}" href="javascript:;">
                            <i class="icon iconfont icon-go-font fr"></i>
                            <span>{$navigation.navigation_name}</span>
                        </a>
                    </li>
                {/foreach}
            </ul>
        </section>
        {elseif $model.type eq 'two_li_items'}
        <section class="items-box model-box j_model_box">
             {if $model.title}
             <p class="item-title b-bottom"><span></span>{$model.title}</p>
             {/if}
            <ul class="items-list clearfix">
                {foreach $model.data as $item}
                    <li>
                        <a class="item-info j_item_info" data-url="{$item.h5_url}" href="javascript:;">
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
        <section class="one-item-box model-box j_model_box">
            {if $model.title neq ''}
            <p class="item-title b-bottom"><span></span>{$model.title}</p>
            {/if}
            <ul class="items-list clearfix">
                {foreach $model.data as $item}
                    <li>
                        <a class="item-info j_item_info" data-url="{$item.h5_url}" href="javascript:;">
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
        <section class="item-list-box model-box j_model_box">
            {if $model.title}
            <p class="item-title b-bottom"><span></span>{$model.title}</p>
            {/if}
            <ul class="">
            {foreach $model.data as $item}
                <li class="clearfix cart-item">
                    <a class="block j_item_info" data-url="{$item.h5_url}" href="javascript:;">
                        <img src="{$item.img|list_img}">
                        <div class="">
                            <p class="name">
                                {$item.item_comment|nl2br}
                            </p>
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
                        </div>
                    </a>
                </li>
            {/foreach}
            </ul>
        </section>
        {/if}
    {/foreach}
{/if}