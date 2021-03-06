{include file="header.tpl"}
<body data-spider="2zhbuq07">
<div class="address-wraper">
    <nav class="header-nav clearfix" data-spider="header-nav">
        <i class="icon iconfont j_go_back icon-back-font" data-step="one"></i>
        Pengajuan Pengembalian Dana
    </nav>
    <div class="step-one j_step_one" data-spider="refund-step-one">
        <h2>Jumlah Pengembalian Dana</h2>
        <input class="refund-price j_refund_price" maxlength="50" type="tel" data-maxprice="{$INDEX_DATA}"/>
        <p class="refund-explain b-bottom"><a href="{$HOST_NAME}/html/applyrefundpriceexplain.php?from=applyrefund" class="">Maksimum Rp {$INDEX_DATA|priceFormat} <i class="icon iconfont icon-question"></i></a></p>
        <h2>Alasan Pengembalian Dana</h2>
        <textarea class="refund-cause j_refund_explain" placeholder="Maksimum 1000 karakter" maxlength="1000"></textarea>
        <h2>Upload (Maksimal 3 Lembar)</h2>
        <ul class="refund-img-box clearfix j_refund_img_box">
            <!--<li class="refund-img j_refund_img" data-src="https://imghk0.geilicdn.com/instashop-1492403176613-1unadjust.jpg?w=640&h=640&cp=1"><img src="https://imghk0.geilicdn.com/instashop-1492403176613-1unadjust.jpg?w=640&h=640&cp=1"/><i class="icon iconfont j_del_img icon-delete-font"></i></li>-->
            <li class="upload-img-li j_upload_img_btn"><i class="icon iconfont icon-add-font"></i></li>
        </ul>
        <div class="btn confirm-btn j_next_step" spm-auto="下一步" spm-click="">Selanjutnya</div>
    </div>
    <div class="step-two j_step_two form-box hide" data-spider="refund-step-two">
        <p class="step-two-explain">Mohon untuk mengisi nomor rekening kamu dan nominal dana yang ingin dikembalikan.</p>
        <div class="form-li clearfix">
            <div class="g-color form-titie">Bank</div>
            <div class="ipt-box bankname-ipt-box"><input type="text" placeholder="Silahkan pilih Bank" class="j_bank_name"/><i class="icon iconfont icon-go-font"></i></div>
        </div>
        <div class="form-li clearfix">
            <div class="g-color">Nomor Rekening</div>
            <div class="ipt-box"><input type="text" value=""  maxlength="50"  placeholder="Nomor Rekening" class="j_branch"/></div>
        </div>
        <div class="form-li clearfix">
            <div class="g-color">Nama Pemilik Rekening</div>
            <div class="ipt-box"><input type="text" value="" maxlength="50" placeholder="Nama Pemilik Rekening" class="j_name"/></div>
        </div>
        <div class="form-li clearfix">
            <div class="g-color">Nomor Ponsel</div>
            <div class="ipt-box tel-ipt-box"><span>+62</span><input type="tel"  maxlength="20" value="" placeholder="Nomor Ponsel" class="j_number"/></div>
        </div>
        <button class="submit-btn btn confirm-btn j_sub_btn" spm-auto="提交退款申请" spm-click="">Ya</button>
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
