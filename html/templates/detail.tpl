{include file="header.tpl" title="My Page Title"}

{if $INDEX_DATA.code eq 420402}
    <div class="no-exists">
        <img src="{$STATIC_HOST}/images/app/404.png"/>
        <p>Produk tidak ditemukan!</p>
    </div>
{else}
    {if $INDEX_DATA.item.status eq 3}
       {*商品已下架无法购买*}
       <section class="item-out-stock">
           <i class="icon iconfont icon-error-font"></i>
           <p>Maaf, produk ini telah habis terjual</p>
           <p><a href="{$INDEX_DATA.item.shop.url}?item=back" class="btn confirm-btn b-btn">Beli Lagi</a></p>
       </section>
    {else}
        <nav class="shop-header-nav clearfix">
            <div class="fl">
                <button class="j_go_back">
                    <i class="icon iconfont icon-back-font"></i>
                </button>
                <div class="btn-cover"></div>
            </div>
            <div class="fr">
                <button class="j_cart_wraper" data-url="{$HOST_NAME}/html/cart.php">
                    <i class="icon iconfont icon-cart-font"></i>
                </button>
                <div class="btn-cover"></div>
            </div>
        </nav>
        <section class="item-info">
            <div class="banner-box">
                <ul class="item-banner j_banner clearfix">
                    {foreach $INDEX_DATA.item.imgs as $banner_img}
                        <li data-src=""><img data-img="" src=""/></li>
                     {/foreach}
                </ul>
            </div>
            <div class="info-box">
                <p class="title">
                    {{{transtxt data.item.item_comment}}}
                </p>
                {{#if data.item.is_discount}}
                    {{#if data.item.discounting}}
                        <p class="price discount-price">
                            Rp {{transprice data.item.discount.price}}
                        </p>
                    {{else}}
                        <p class="price discount-price">
                            Rp {{transprice data.item.discount.price}}
                        </p>
                    {{/if}}
                    {{#eq data.item.discount.min_price data.item.discount.max_price}}
                        <p class="price-lang">Rp {{transprice data.item.discount.min_price}}</p>
                    {{else}}
                        <p class="price-lang">Rp {{transprice data.item.discount.min_price}} - {{transprice data.item.discount.max_price}}</p>
                    {{/eq}}

                    <p class="discount-info">
                        <span>-{{transpricevalue data.item.discount.value}}%</span>

                        {{#if data.item.discounting}}
                            Time remaining :
                            <span data-time="{{timeLang.second}}">{{timeLang.time}}</span>
                        {{else}}
                            Start time
                            {{transdate data.item.discount.start_time}} WIB
                        {{/if}}
                    </p>
                {{else}}
                    <p class="price discount-price">
                        {{itemprice data.item}}
                    </p>
                {{/if}}

                <a href="javascript:;" data-url="{{shopUrl}}" class="go-shop j_shop_info">
                    <div class="clearfix shop-info">
                        <i class="icon iconfont fr icon-go-font"></i>
                        <img class="fl" src="{{data.item.shop.logo}}"/>
                        <p>{{data.item.shop.name}}</p>
                    </div>
                </a>
            </div>
            <div class="shop-explain j_down_box">
                <div>
                    <span class="top-angle"></span>
                    <div class="txt">
                        {{#if data.item.shop.note}}
                            {{{transtxt data.item.shop.note}}}
                        {{else}}
                            Selamat datang di mini websiteku
                        {{/if}}
                    </div>
                    <div class="txt-hide">
                        {{{transtxt data.item.shop.note}}}
                    </div>
                    <p><i class="icon iconfont j_down_btn down-btn"></i></p>
                </div>
            </div>
        </section>
    {/if}
{/if}


<script>var init_data = {$INDEX_DATA_STR};</script>
{include file="footer.tpl"}