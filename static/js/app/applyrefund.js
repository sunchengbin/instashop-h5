/**
 * Created by sunchengbin on 2017/4/21.
 */
require(['uploadimg'],function(UploadImg){
    UploadImg({
        selectedImgSuccess : function(img){
            //选完需要上传商品后操作
            console.log(img);
        },
        uploadImgSuccess : function(result){
            //提交上传商品图片后


        }
    });
})
