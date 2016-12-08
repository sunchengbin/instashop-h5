<?php
/* Smarty version 3.1.30, created on 2016-12-07 20:54:43
  from "/Users/sunchengbin/workspace/instashop/instashop-new/html/templates/footer.tpl" */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.30',
  'unifunc' => 'content_584806932b8784_15000437',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '34c6b0037ed3f27673c64cda35fe63e36bb71ff0' => 
    array (
      0 => '/Users/sunchengbin/workspace/instashop/instashop-new/html/templates/footer.tpl',
      1 => 1481112205,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_584806932b8784_15000437 (Smarty_Internal_Template $_smarty_tpl) {
echo '<script'; ?>
 src="<?php echo $_smarty_tpl->tpl_vars['STATIC_HOST']->value;?>
/js/base/require-zepto.js"><?php echo '</script'; ?>
>
<!--<?php echo '<script'; ?>
 src="<?php echo $_smarty_tpl->tpl_vars['STATIC_HOST']->value;?>
/js/base/require-config.js"><?php echo '</script'; ?>
>-->
<?php echo '<script'; ?>
 src="<?php echo $_smarty_tpl->tpl_vars['STATIC_HOST']->value;?>
/js/dist/app/<?php echo $_smarty_tpl->tpl_vars['INDEX_JS_NAME']->value;?>
.js?v=1481112205517"><?php echo '</script'; ?>
>

    <?php echo '<script'; ?>
>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
          var trackOutboundLink = function(url) {
              ga('send', 'event', 'outbound', 'click', url, {
                  'transport': 'beacon',
                  'hitCallback': function(){document.location = url;}
              });
          }
          ga('create', 'UA-78448705-7', 'auto');
          ga('send', 'pageview');
    <?php echo '</script'; ?>
>

<?php echo '<script'; ?>
><?php echo $_smarty_tpl->tpl_vars['BI_SCRIPT']->value;
echo '</script'; ?>
>
</body>
</html>
<?php }
}
