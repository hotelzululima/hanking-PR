/**
 * ueditor完整配置项
 * 可以在这里配置整个编辑器的特性
 */
/**************************提示********************************
 * 所有被注释的配置项均为UEditor默认值。
 * 修改默认配置请首先确保已经完全明确该参数的真实用途。
 * 主要有两种修改方案，一种是取消此处注释，然后修改成对应参数；另一种是在实例化编辑器时传入对应参数。
 * 当升级编辑器时，可直接使用旧版配置文件替换新版配置文件,不用担心旧版配置文件中因缺少新功能所需的参数而导致脚本报错。
 **************************提示********************************/

(function () {

    /**
     * 编辑器资源文件根路径。它所表示的含义是：以编辑器实例化页面为当前路径，指向编辑器资源文件（即dialog等文件夹）的路径。
     * 鉴于很多同学在使用编辑器的时候出现的种种路径问题，此处强烈建议大家使用"相对于网站根目录的相对路径"进行配置。
     * "相对于网站根目录的相对路径"也就是以斜杠开头的形如"/myProject/ueditor/"这样的路径。
     * 如果站点中有多个不在同一层级的页面需要实例化编辑器，且引用了同一UEditor的时候，此处的URL可能不适用于每个页面的编辑器。
     * 因此，UEditor提供了针对不同页面的编辑器可单独配置的根路径，具体来说，在需要实例化编辑器的页面最顶部写上如下代码即可。当然，需要令此处的URL等于对应的配置。
     * window.UEDITOR_HOME_URL = "/xxxx/xxxx/";
     */
    window.UEDITOR_HOME_URL = "umeditor/"
    var URL = window.UEDITOR_HOME_URL || getUEBasePath();

    /**
     * 配置项主体。注意，此处所有涉及到路径的配置别遗漏URL变量。
     */
    window.UEDITOR_CONFIG = {

        //为编辑器实例添加一个路径，这个不能被注释
        UEDITOR_HOME_URL: URL

        //工具栏上的所有的功能按钮和下拉框，可以在new编辑器的实例时选择自己需要的从新定义
        , toolbars: [[
	        'undo', //撤销
	        'redo', //重做
	        'bold', //加粗
	        'indent', //首行缩进
	        'italic', //斜体
	        'underline', //下划线
	        'strikethrough', //删除线
	        'subscript', //下标
	        'fontborder', //字符边框
	        'superscript', //上标
	        'horizontal', //分隔线
	        'time', //时间
	        'date', //日期
	        'unlink', //取消链接
	        'inserttable', //插入表格
	        'deletetable', //删除表格
	        'mergecells', //合并多个单元格
	        'insertparagraphbeforetable', //"表格前插入行"
	        'mergeright', //右合并单元格
	        'mergedown', //下合并单元格
	        'fontfamily', //字体
	        'fontsize', //字号
	        'paragraph', //段落格式
	        'edittable', //表格属性
	        'edittd', //单元格属性
	        'link', //超链接
	        'spechars', //特殊字符
	        'justifyleft', //居左对齐
	        'justifyright', //居右对齐
	        'justifycenter', //居中对齐
	        'justifyjustify', //两端对齐
	        'forecolor', //字体颜色
	        'backcolor', //背景色
	        'insertorderedlist', //有序列表
	        'insertunorderedlist', //无序列表
	        'rowspacingtop', //段前距
	        'rowspacingbottom', //段后距
	        'imagecenter', //居中
	        'lineheight', //行间距
	        'touppercase', //字母大写
	        'tolowercase', //字母小写
	        'simpleupload'//图片上传 
    	]]
        ,enableAutoSave: false
        ,saveInterval: 5000
        ,wordCount:false
        ,elementPathEnabled : false
        ,zIndex : 9900     //编辑器层级的基数,默认是900
        //图片上传配置区
        ,serverUrl:path+"umeditor/config.json"             //图片上传提交地址
        ,imagePath:URL + "manage/getImage"                     //图片修正地址，引用了fixedImagePath,如有特殊需求，可自行配置
        ,imageFieldName:"upfile"                   //图片数据的key,若此处修改，需要在后台对应文件修改对应参数
        ,imageUrlPrefix:path
        
        
    };

    function getUEBasePath(docUrl, confUrl) {

        return getBasePath(docUrl || self.document.URL || self.location.href, confUrl || getConfigFilePath());

    }

    function getConfigFilePath() {

        var configPath = document.getElementsByTagName('script');

        return configPath[ configPath.length - 1 ].src;

    }

    function getBasePath(docUrl, confUrl) {

        var basePath = confUrl;


        if (/^(\/|\\\\)/.test(confUrl)) {

            basePath = /^.+?\w(\/|\\\\)/.exec(docUrl)[0] + confUrl.replace(/^(\/|\\\\)/, '');

        } else if (!/^[a-z]+:/i.test(confUrl)) {

            docUrl = docUrl.split("#")[0].split("?")[0].replace(/[^\\\/]+$/, '');

            basePath = docUrl + "" + confUrl;

        }

        return optimizationPath(basePath);

    }

    function optimizationPath(path) {

        var protocol = /^[a-z]+:\/\//.exec(path)[ 0 ],
            tmp = null,
            res = [];

        path = path.replace(protocol, "").split("?")[0].split("#")[0];

        path = path.replace(/\\/g, '/').split(/\//);

        path[ path.length - 1 ] = "";

        while (path.length) {

            if (( tmp = path.shift() ) === "..") {
                res.pop();
            } else if (tmp !== ".") {
                res.push(tmp);
            }

        }

        return protocol + res.join("/");

    }

    window.UE = {
        getUEBasePath: getUEBasePath
    };

})();
