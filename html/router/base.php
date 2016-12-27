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
function dateFormat($datetime){
    return date('d/m H:i',strtotime($datetime));
}