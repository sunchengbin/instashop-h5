<?php
function transItems($items){
    for ($i=0; $i < count($items);$i++) {
        if($items[$i]["index_type"] == 'top') {
            $hot[]=$items[$i];
        }else{
            if($items[$i]["index_type"] == 'no_tag'){
                $item[]=$items[$i];
            }
        }
    }
    $tags = getTags($items);
    return [
        'hot' => $hot,
        'item' => $item,
        'tags' => $tags['tags']
    ];
};
function getTags($list){

    if(!count($list))return null;
    $data = [];
	$sort = [];
	$result = [];
    for ($i=0; $i < count($list);$i++) {

        if($list[$i]["index_type"] == 'tags'){

            if($data[$list[$i]["tag_id"]]){
                $data[$list[$i]["tag_id"]]["tag_data"][] = $list[$i];
            }else{
                $sort[] = $list[$i]["tag_id"];
                $data[$list[$i]["tag_id"]] = [
                    'id' => $list[$i]["tag_id"],
                    'name' => $list[$i]["tag_name"],
                    'tag_data' => [$list[$i]]
                ];
            }
        }
    }
    $result = [];
    for($j=0;$j < count($sort);$j++){
        $result[] = $data[$sort[$j]];
    }

    return [
        'tags' => $result,
        'sort' => $sort
    ];
};


function discountTime($endTime){
    $nt = time()*1000;
    $et = strtotime($endTime)*1000;
    $send = ($et - $nt + 3600000)/1000;
    $hour = ($send - $send % 3600)/3600;
    $second = ($send - $hour*3600)%60;
    $minute =  ($send - $hour*3600 - $second)/60;
    if($send < 0){
        return '00:00:00';
    }
    return (strlen($hour)<2?'0'.$hour:$hour).':'.(strlen($minute)<2?'0'.$minute:$minute).':'.(strlen($second)<2?'0'.$second:$second);
};
function discountSecond($endTime){
    $nt = time()*1000;
    $et = strtotime($endTime)*1000;
    $send = ($et - $nt + 3600000)/1000;
    $hour = ($send - $send % 3600)/3600;
    $second = ($send - $hour*3600)%60;
    $minute =  ($send - $hour*3600 - $second)/60;
    return $send;
};

function priceFormat($price) {
    return number_format($price, 0, '.', '.');
}
function getIsHaveStock($stock) {
    if($stock>=9999999)return false;
    return true;
}
function bg_img($imgurl, $w=500){
    $w = 750;
	if (false !== strpos($imgurl, '?')) {
		$tmp_arr = explode('?', $imgurl);
		$imgurl = $tmp_arr[0];
	}
	$imgurl .= sprintf("?w=%s", $w);
	return $imgurl;
}
function format_img($imgurl, $w=420, $h=315){
    $w = 420;
    $h = 315;
	if (false !== strpos($imgurl, '?')) {
		$tmp_arr = explode('?', $imgurl);
		$imgurl = $tmp_arr[0];
	}
	$imgurl .= sprintf("?w=%s&h=%s&cp=1", $w, $h);
	return $imgurl;
}
function item_img($imgurl){
    $w = 750;
    $h = 750;
	if (false !== strpos($imgurl, '?')) {
		$tmp_arr = explode('?', $imgurl);
		$imgurl = $tmp_arr[0];
	}
	$imgurl .= sprintf("?w=%s&h=%s&cp=1", $w, $h);
	return $imgurl;
}
function list_img($imgurl){
    $w = 640;
    $h = 640;
	if (false !== strpos($imgurl, '?')) {
		$tmp_arr = explode('?', $imgurl);
		$imgurl = $tmp_arr[0];
	}
	$imgurl .= sprintf("?w=%s&h=%s&cp=1", $w, $h);
	return $imgurl;
}
function viewerImg($imgurl){
    if (false !== strpos($imgurl, '?')) {
        $tmp_arr = explode('?', $imgurl);
        $imgurl = $tmp_arr[0];
    }
    return $imgurl;
}
function transDate($datetime){
    return date('d/m H.i',strtotime($datetime));
}
function itemPrice($data){
    if($data['is_discount']){
        if($data['is_discount']['price'] > 0){
            return 'Rp '.priceFormat($data['discount']['price']);
        }
        return '';
    }
    if(!$data['sku']){
        if($data['price'] > 0){
            return 'Rp '.priceFormat($data['price']);
        }
        return '';
    }else{
        if(count($data['sku']) < 2){
            if($data['price'] > 0){
                return 'Rp '.priceFormat($data['price']);
            }
        }else{
            $sku_price = [];
            foreach($data['sku'] as $item){
                if(intval($item['price']) > 0){
                    $sku_price[] = intval($item['price']);
                }
            };
            sort($sku_price);
            if($sku_price[0] != $sku_price[(count($sku_price)-1)]){
                return 'Rp '.priceFormat($sku_price[0]).'-'.priceFormat($sku_price[(count($sku_price)-1)]);
            }else{
                if($sku_price[0] == 0){
                    return '';
                }else{
                    return 'Rp '.priceFormat($sku_price[0]);
                }
            }
        }
    }
}
function getItemListType($template){
    $len = count($template);
    $type = 2;
    for ($i=0; $i < $len;$i++) {
        if($template[$i]['type'] == 'item_list_type'){
            $type = $template[$i]['data'][0];
        }
    }
    return $type;
}
function noHaveTemplate($template){
    $len = count($template);
    $have = true;
    for ($i=0; $i < $len;$i++) {
        if($template[$i]['type'] != 'item_list_type' && $template[$i]['type'] != 'edit_signage'){
            $have = false;
        }
    }
    return $have;
}
function dateFormat($datetime){
    return date('d/m H.i',strtotime($datetime));
}

function getIsSku($carts){
    if($carts['sku'] && $carts['sku']['id']){
        return 1;
    }else{
        return 0;
    }
}

function getCartId($carts){
    if($carts['sku'] && $carts['sku']['id']){
        return $carts['sku']['id'];
    }else{
        return $carts['item']['id'];
    }
}
function getCartStock($carts){
    if($carts['sku'] && $carts['sku']['stock']){
        $stock = $carts['sku']['stock'];
    }else{
        $stock = $carts['item']['stock'];
    }
    if($stock < 0){
        $stock = 0;
    }
    return $stock;
}
function getDiscountStock($carts){
    return $carts['item']['discount']['limit_count'] == 0 ? $carts['item']['stock'] : $carts['item']['discount']['limit_count'];
}
function getCartPrice($carts){
    return ($carts['sku'] && $carts['sku']['id']) ? $carts['sku']['price'] : $carts['item']['price'];
}
function transCartPrice($carts){
    return priceFormat(getCartPrice($carts));
}

function isExistSupplyShop ($carts) {
    foreach($carts as $cart){
        return $cart['item']['supply_shop']?true:false;
    }
}
function conuntImgNavWidth($data){
    return 8.5*count($data).'rem';
}

// 砍价活动新增
// 判断是否砍到了底价
function confirmIsReachBasepirce($data){
    return (intval($data['item_info']['min_price']) - intval($data['bargain_result'])) == intval($data['bargain_info']['base_price']);
}

// 获取砍价后的价格
function getAfterBargainPrice($data){
    $item = $data['item_info'];
    if(!$item.sku){
        //没有sku
        $afterPrice = intval($item['min_price'])-intval($data['bargain_result']);
        return "Rp ".priceFormat($afterPrice);
    }else{
        $afterMinPrice = intval($item['min_price'])-intval($data['bargain_result']);
        $afterMaxPrice = intval($item['max_price'])-intval($data['bargain_result']);
        return "Rp ".priceFormat($afterMinPrice)+'- '.priceFormat($afterMaxPrice);
    }
}

function getBargainLimit($data){
    return $data['item']['bargain']['limit_to'];
}

// 是否砍过价了
function checkIsUserBargain($data){
    $isUserBargain = false;
    $friends = $data['bargain_detail'];
    if($friends['length']){
        $isUserBargain = false;
    }else{
        foreach($friends as $friend){
            if($friend['buyer_id']==$data['buyer_info']['buyer_id']){
                $isUserBargain = true;
            }
        }
    }
    return $isUserBargain;
}

function checkIsBargainOverdue($data){
    $startTime = $data['start_time'];
    $endTime = $data['end_time'];
    $curTime = time();
    if($curTime<$startTime||$curTime>$endTime){
        return true;
    }
    return false;
}

function checkBargainLegal($data){
    $bargainInfo = $data['bargain_info'];
    $itemInfo = $data['item_info'];
    if('1'!=$bargainInfo['status']){
        return true;
    }
    if('1'!=$itemInfo['status']){
        return true;
    }
}
function testExpress($list) {
    $bool = false;
    foreach($list as $express){
        if (count($express) > 0) {
            $bool = true;
        }
    }
    return $bool;
}
function testCartBtnStatus(){

}
function getIsRecommend($items){
    if(!count($items))return null;
    $is_recommend = false;
    for ($i=0; $i < count($items);$i++) {
        if($items[$i]["is_top"] == '1') {
            $is_recommend = true;
        }
    }
    return $is_recommend;
}
function getIsLast($items){
    if(!count($items))return null;
    $is_last = false;
    for ($i=0; $i < count($items);$i++) {
        if($items[$i]["is_top"] == '0') {
            $is_last = true;
        }
    }
    return $is_last;
}