<?php
/* Smarty version 3.1.30, created on 2016-10-10 18:01:50
  from "/Users/sunchengbin/workspace/instashop/instashop-new/html/templates/index.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.30',
  'unifunc' => 'content_57fb670e8315e5_68701037',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'c5072935fcfac0bfc4fe01525f7b90380b0a1a54' => 
    array (
      0 => '/Users/sunchengbin/workspace/instashop/instashop-new/html/templates/index.tpl',
      1 => 1476093708,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:header.tpl' => 1,
    'file:footer.tpl' => 1,
  ),
),false)) {
function content_57fb670e8315e5_68701037 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_subTemplateRender("file:header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array('title'=>"My Page Title"), 0, false);
?>

<?php if ($_smarty_tpl->tpl_vars['INDEX_DATA']->value['code'] == 420405) {?>
    <div class="no-exists">
        <img src="<?php echo $_smarty_tpl->tpl_vars['STATIC_HOST']->value;?>
/images/app/404.png"/>
        <p>Toko tidak ditemukan!</p>
    </div>
<?php } else { ?>
    <?php if ($_smarty_tpl->tpl_vars['INDEX_DATA']->value['shop']['status'] == '2') {?>
        <section class="shop-header">
            <img class="shop-header-bg" data-img="<?php echo $_smarty_tpl->tpl_vars['INDEX_DATA']->value['shop']['front_cover'];?>
" src="">
            <div class="clearfix shop-info">
                <div class="shop-img">
                    <img data-img="<?php echo $_smarty_tpl->tpl_vars['INDEX_DATA']->value['shop']['logo'];?>
" src=""/>
                </div>
                <p><?php echo $_smarty_tpl->tpl_vars['INDEX_DATA']->value['shop']['name'];?>
}</p>
            </div>
        </section>
        <section class="shop-delete">
            <i class="icon iconfont icon-error-font"></i>
            <p>Akun ini telah dihapus karena melanggar syarat dan ketentuan penggunaan Instashop</p>
        </section>
    <?php } else { ?>
        <section class="shop-header">
            <img class="shop-header-bg" data-img="<?php echo bg_img($_smarty_tpl->tpl_vars['INDEX_DATA']->value['shop']['front_cover']);?>
" src="">
            <div class="clearfix shop-info">
                <div class="shop-img">
                    <img data-img="<?php echo $_smarty_tpl->tpl_vars['INDEX_DATA']->value['shop']['logo'];?>
" src=""/>
                </div>
                <p><?php echo $_smarty_tpl->tpl_vars['INDEX_DATA']->value['shop']['name'];?>
</p>
            </div>
        </section>
        <section class="shop-explain j_down_box">
            <div>
                <span class="top-angle"></span>
                <div class="txt">
                    <?php echo nl2br($_smarty_tpl->tpl_vars['INDEX_DATA']->value['shop']['note']);?>

                </div>
                <div class="txt-hide">
                    <?php echo nl2br($_smarty_tpl->tpl_vars['INDEX_DATA']->value['shop']['note']);?>

                </div>
                <p><i class="icon iconfont j_down_btn down-btn"></i></p>
            </div>
        </section>
        <?php if ($_smarty_tpl->tpl_vars['INDEX_DATA']->value['shop']['banners']) {?>
            <div class="banner-box">
                <ul class="item-banner j_banner clearfix">
                    <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['INDEX_DATA']->value['shop']['banners'], 'banner');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['banner']->value) {
?>
                        <li class=""><a class="block" href="<?php echo $_smarty_tpl->tpl_vars['banner']->value['href'];?>
"><img data-img="<?php echo format_img($_smarty_tpl->tpl_vars['banner']->value['url']);?>
" src=""/></a></li>
                    <?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
?>

                </ul>
            </div>
        <?php }?>
        <?php if (!count($_smarty_tpl->tpl_vars['INDEX_DATA']->value['item_list']['list'])) {?>
            <section class="no_item">Belum ada produk</section>
        <?php }?>
        <section class="items-box j_hot_box j_box">
            <?php if (count($_smarty_tpl->tpl_vars['RECOMMEND_ITEM']->value)) {?>
                <p class="item-title b-bottom"><span></span>Rekomendasi Item</p>
                <ul class="items-list clearfix j_hot_list">
                    <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['RECOMMEND_ITEM']->value, 'item');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['item']->value) {
?>
                        <li>
                            <a class="item-info j_item_info" data-url="<?php echo $_smarty_tpl->tpl_vars['item']->value['h5_url'];?>
" href="javascript:;">
                                <div class="lazy" data-img="<?php echo list_img($_smarty_tpl->tpl_vars['item']->value['img']);?>
">
                                    <?php if ($_smarty_tpl->tpl_vars['item']->value['is_discount']) {?>
                                        <span>-<?php echo $_smarty_tpl->tpl_vars['item']->value['discount']['value'];?>
%</span>
                                        <?php if ($_smarty_tpl->tpl_vars['item']->value['discounting']) {?>
                                            <p><i class="icon iconfont icon-time-font"></i><span data-time="<?php echo discountSecond($_smarty_tpl->tpl_vars['item']->value['discount']['end_time']);?>
"><?php echo discountTime($_smarty_tpl->tpl_vars['item']->value['discount']['end_time']);?>
</span></p>
                                        <?php } else { ?>
                                            <p>Coming Soon</p>
                                        <?php }?>
                                    <?php }?>
                                </div>
                                <p class="title"><?php echo $_smarty_tpl->tpl_vars['item']->value['item_comment'];?>
</p>
                                <?php if ($_smarty_tpl->tpl_vars['item']->value['price'] < 0) {?>
                                    <p class="price"></p>
                                    <?php } elseif ($_smarty_tpl->tpl_vars['item']->value['is_discount']) {?>
                                        <p class="price cost-price">Rp <?php echo priceFormat($_smarty_tpl->tpl_vars['item']->value['price']);?>
</p>
                                    <?php } else { ?>
                                        <p class="price">Rp <?php echo priceFormat($_smarty_tpl->tpl_vars['item']->value['price']);?>
</p>
                                <?php }?>
                                <?php if ($_smarty_tpl->tpl_vars['item']->value['is_discount']) {?>
                                    <?php if ($_smarty_tpl->tpl_vars['item']->value['discounting']) {?>
                                        <p class="discount-price">Rp <?php echo priceFormat($_smarty_tpl->tpl_vars['item']->value['discount']['price']);?>
</p>
                                    <?php } else { ?>
                                        <p class="discount-price">Rp <?php echo priceFormat($_smarty_tpl->tpl_vars['item']->value['discount']['price']);?>
</p>
                                    <?php }?>
                                <?php } else { ?>
                                    <p class="discount-price"></p>
                                <?php }?>
                            </a>
                        </li>
                    <?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
?>

                </ul>
            <?php }?>
        </section>

        <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['TAGS_ITEM']->value, 'tag_list');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['tag_list']->value) {
?>
            <section class="items-box j_box" data-tagid="<?php echo $_smarty_tpl->tpl_vars['tag_list']->value['id'];?>
">
                <p class="item-title b-bottom clearfix"><a class="fr j_item_info" href="javascript:;" data-url="<?php echo $_smarty_tpl->tpl_vars['HOST_NAME']->value;?>
/k/<?php echo $_smarty_tpl->tpl_vars['tag_list']->value['id'];?>
">more<i class="icon iconfont icon-go-font"></i></a><span></span><em><?php echo $_smarty_tpl->tpl_vars['tag_list']->value['name'];?>
</em></p>
                <ul class="items-list j_item_list clearfix">
                    <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['tag_list']->value['tag_data'], 'item');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['item']->value) {
?>
                        <li>
                            <a class="item-info j_item_info" data-url="<?php echo $_smarty_tpl->tpl_vars['item']->value['h5_url'];?>
" href="javascript:;">
                                <div class="lazy" data-img="<?php echo list_img($_smarty_tpl->tpl_vars['item']->value['img']);?>
">
                                    <?php if ($_smarty_tpl->tpl_vars['item']->value['is_discount']) {?>
                                        <span>-<?php echo $_smarty_tpl->tpl_vars['item']->value['discount']['value'];?>
%</span>
                                        <?php if ($_smarty_tpl->tpl_vars['item']->value['discounting']) {?>
                                            <p><i class="icon iconfont icon-time-font"></i><span data-time="<?php echo discountSecond($_smarty_tpl->tpl_vars['item']->value['discount']['end_time']);?>
"><?php echo discountTime($_smarty_tpl->tpl_vars['item']->value['discount']['end_time']);?>
</span></p>
                                        <?php } else { ?>
                                            <p>Coming Soon</p>
                                        <?php }?>
                                    <?php }?>
                                </div>
                                <p class="title"><?php echo $_smarty_tpl->tpl_vars['item']->value['item_comment'];?>
</p>
                                <?php if ($_smarty_tpl->tpl_vars['item']->value['price'] < 0) {?>
                                        <p class="price"></p>
                                    <?php } elseif ($_smarty_tpl->tpl_vars['item']->value['is_discount']) {?>
                                        <p class="price cost-price">Rp <?php echo priceFormat($_smarty_tpl->tpl_vars['item']->value['price']);?>
</p>
                                    <?php } else { ?>
                                        <p class="price">Rp <?php echo priceFormat($_smarty_tpl->tpl_vars['item']->value['price']);?>
</p>
                                <?php }?>
                                <?php if ($_smarty_tpl->tpl_vars['item']->value['is_discount']) {?>
                                    <?php if ($_smarty_tpl->tpl_vars['item']->value['discounting']) {?>
                                        <p class="discount-price">Rp <?php echo priceFormat($_smarty_tpl->tpl_vars['item']->value['discount']['price']);?>
</p>
                                    <?php } else { ?>
                                        <p class="discount-price">Rp <?php echo priceFormat($_smarty_tpl->tpl_vars['item']->value['discount']['price']);?>
</p>
                                    <?php }?>
                                <?php } else { ?>
                                    <p class="discount-price"></p>
                                <?php }?>
                            </a>
                        </li>
                    <?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
?>

                </ul>
            </section>
        <?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
?>

        <section class="items-box j_item_box j_box">
            <?php if (count($_smarty_tpl->tpl_vars['HOT_ITEM']->value)) {?>
                <p class="item-title b-bottom"><span></span>Hot Item</p>
                <ul class="items-list j_item_list clearfix">
                    <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['HOT_ITEM']->value, 'item');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['item']->value) {
?>
                        <li>
                            <a class="item-info j_item_info" data-url="<?php echo $_smarty_tpl->tpl_vars['item']->value['h5_url'];?>
" href="javascript:;">
                                <div class="lazy" data-img="<?php echo list_img($_smarty_tpl->tpl_vars['item']->value['img']);?>
">
                                    <?php if ($_smarty_tpl->tpl_vars['item']->value['is_discount']) {?>
                                        <span>-<?php echo $_smarty_tpl->tpl_vars['item']->value['discount']['value'];?>
%</span>
                                        <?php if ($_smarty_tpl->tpl_vars['item']->value['discounting']) {?>
                                            <p><i class="icon iconfont icon-time-font"></i><span data-time="<?php echo discountSecond($_smarty_tpl->tpl_vars['item']->value['discount']['end_time']);?>
"><?php echo discountTime($_smarty_tpl->tpl_vars['item']->value['discount']['end_time']);?>
</span></p>
                                        <?php } else { ?>
                                            <p>Coming Soon</p>
                                        <?php }?>
                                    <?php }?>
                                </div>
                                <p class="title"><?php echo $_smarty_tpl->tpl_vars['item']->value['item_comment'];?>
</p>
                                <?php if ($_smarty_tpl->tpl_vars['item']->value['price'] < 0) {?>
                                    <p class="price"></p>
                                    <?php } elseif ($_smarty_tpl->tpl_vars['item']->value['is_discount']) {?>
                                        <p class="price cost-price">Rp <?php echo priceFormat($_smarty_tpl->tpl_vars['item']->value['price']);?>
</p>
                                    <?php } else { ?>
                                        <p class="price">Rp <?php echo priceFormat($_smarty_tpl->tpl_vars['item']->value['price']);?>
</p>
                                <?php }?>
                                <?php if ($_smarty_tpl->tpl_vars['item']->value['is_discount']) {?>
                                    <?php if ($_smarty_tpl->tpl_vars['item']->value['discounting']) {?>
                                        <p class="discount-price">Rp <?php echo priceFormat($_smarty_tpl->tpl_vars['item']->value['discount']['price']);?>
</p>
                                    <?php } else { ?>
                                        <p class="discount-price">Rp <?php echo priceFormat($_smarty_tpl->tpl_vars['item']->value['discount']['price']);?>
</p>
                                    <?php }?>
                                <?php } else { ?>
                                    <p class="discount-price"></p>
                                <?php }?>
                            </a>
                        </li>
                    <?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
?>

                </ul>
            <?php }?>
        </section>
        <section class="sort-list-wraper j_sort_box">
            <p>Kategori produk</p>
            <ul>
                <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['TAG_LIST']->value, 'tag');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['tag']->value) {
?>
                    <li class=""><a class="j_item_info" href="javascript:;" data-url="<?php echo $_smarty_tpl->tpl_vars['HOST_NAME']->value;?>
/k/<?php echo $_smarty_tpl->tpl_vars['tag']->value['id'];?>
" class=""><span></span><?php echo $_smarty_tpl->tpl_vars['tag']->value['name'];?>
</a></li>
                <?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl);
?>

            </ul>
        </section>
        <div class="sort-list-cover j_sort_cover">
            <i class="icon iconfont icon-fold-font"></i>
        </div>
        <section class="index-footer">
            <ul class="b-top">
                <?php if (count($_smarty_tpl->tpl_vars['INDEX_DATA']->value['tag_list'])) {?>
                    <li class="j_category b-right">
                        <i class="icon iconfont icon-tag-font"></i>
                        Kategori
                    </li>
                <?php }?>
                <li class="j_cart_wraper b-right" data-url="<?php echo $_smarty_tpl->tpl_vars['HOST_NAME']->value;?>
/html/cart.php">
                    <i class="icon iconfont icon-i-shop-font"></i>
                    Keranjangku
                </li>
                <li>
                    <?php if ($_smarty_tpl->tpl_vars['INDEX_DATA']->value['shop']['line_url']) {?>
                        <?php if ($_smarty_tpl->tpl_vars['INDEX_DATA']->value['shop']['phone']) {?>
                            <a class="contact-services j_show_contact" data-type="all" href="javascript:;">
                                <i class="icon iconfont icon-i-news-font"></i>
                                Hubungi Penjual
                            </a>
                        <?php } else { ?>
                            <a class="contact-services" href="<?php echo $_smarty_tpl->tpl_vars['INDEX_DATA']->value['shop']['line_url'];?>
">
                                <i class="icon iconfont icon-i-news-font"></i>
                                Hubungi Penjual
                            </a>
                        <?php }?>
                    <?php } else { ?>
                        <?php if ($_smarty_tpl->tpl_vars['INDEX_DATA']->value['shop']['phone']) {?>
                            <a class="contact-services j_show_contact" data-type="tel" href="javascript:;">
                                <i class="icon iconfont icon-i-news-font"></i>
                                Hubungi Penjual
                            </a>
                        <?php }?>
                    <?php }?>
                </li>
            </ul>
        </section>
    <?php }
}?>

<?php echo '<script'; ?>
>var init_data = <?php echo $_smarty_tpl->tpl_vars['INDEX_DATA_STR']->value;?>
;<?php echo '</script'; ?>
>
<?php $_smarty_tpl->_subTemplateRender("file:footer.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>

<?php }
}
