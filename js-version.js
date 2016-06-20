/**
 * Created by sunchengbin on 16/4/25.
 */
var FS = require("fs"),
    FT = process.argv[2];//需要检测的文件夹路径或者文件路径(针对性修改)
var file = {
    getFilesName : function(opts){
        FS.readdir(opts.path,function(err,files){
            if (err) throw err;
            opts.callback && opts.callback(files,opts.path);
        });
    },
    readFileData : function(path){
        var _this = this;
        FS.readFile(path,{encoding:'utf8'} ,function (err, data) {
            if (err) throw err;
            _this.modifyFileData(data,path);
        });
    },
    writeFileData : function(path,data){
        FS.writeFile(path,data,{encoding:'utf8'},function(err){
            if (err) throw err;
            console.log(path+'--修改成功'); //文件被保存
        })
    },
    modifyFileData : function(data,path){
        var scripts = data.match(/\?v\=\d{1,}/g),
            _this = this,
            _time = (new Date()).getTime();
        if(scripts != null) {
            var dats = data.replace(/\?v\=\d{1,}/g,'?v='+_time);
            _this.writeFileData(path,dats);
        }
    }
};
//执行
if(FT.indexOf('.html') != -1){
    file.readFileData(FT);
}else{
    file.getFilesName({
        path : FT,
        callback : function(files,path){
            for(var i = 0;i < files.length;i++){
                if(files[i].indexOf('.html') != -1 || files[i].indexOf('.php') != -1){
                    file.readFileData(path+'/'+files[i]);
                }
            }
        }
    });
}


