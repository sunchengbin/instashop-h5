{include file="header.tpl"}
<body data-spider="">
<div class="address-wraper">
    <nav class="header-nav clearfix" data-spider="header-nav">
        <i class="icon iconfont j_go_back icon-back-font"></i>
        申请退款
    </nav>
    <div class="step-one">
        <h2>Jumlah pengembalian dana</h2>
        <input class="refund-price"/>
        <p class="refund-explain">最多RP 3800<a href="#" class=""><i class="icon iconfont icon-back-font"></i></a></p>
        <h2>Alasan Pengembalian Dana</h2>
        <textarea class="refund-cause"></textarea>
        <h2>Sertifikat Upload（Hingga 3pcs）</h2>
        <ul class="refund-img-box">
            <li class="refund-img"></li>
            <li class="upload-img-li j_upload_wrap"></li>
        </ul>
        <div class="btn confirm-btn">下一步</div>
    </div>
    <div class="step-two form-box hide">
        <p class="step-two-explain">Silahkan isi nomor rekening bank Anda, jumlah</p>
        <div class="form-li clearfix">
            <div class="g-color form-titie"></div>
            <div class="ipt-box"><input type="text" value="" placeholder="" class="j_bank_name"/></div>
        </div>
        <div class="form-li clearfix">
            <div class="g-color"></div>
            <div class="ipt-box"><input type="text" value=""  placeholder="" class="j_branch"/></div>
        </div>
        <div class="form-li clearfix">
            <div class="g-color"></div>
            <div class="ipt-box"><input type="text" value="" placeholder="" class="j_name"/></div>
        </div>
        <div class="form-li clearfix">
            <div class="g-color"></div>
            <div class="ipt-box"><input type="tel" value="" placeholder="" class="j_number"/></div>
        </div>
        <button class="submit-btn btn confirm-btn j_sub_btn">确定</button>
    </div>
    <section class="address-list-box j_address_list_box">
        <nav class="header-nav address-header-nav j_address_header clearfix">
            <i class="icon iconfont j_go_address icon-back-font"></i>
            <span></span>
        </nav>
        <section class="address-list j_address_list">
            <div class="list-box j_list_box"></div>
        </section>
    </section>
</div>
{include file="footer.tpl"}
