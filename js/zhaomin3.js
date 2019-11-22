// console.log("载入成功");

/* 
    配置引入的文件路径
*/
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "parabola": "parabola",
        "detailPage":"detailPage"
    },
    shim: {
        //设置依赖关系  先引入jquery.js  然后在隐去jquery-cookie
        "jquery-cookie": ["jquery"],
        //声明当前模块不遵从AMD
        "parabola": {
			exports: "_"
		}
    }
})

//加载首页的代码

require(["detailPage"], function(detailPage){

    detailPage.slideshow();
    detailPage.scrolltop();
    detailPage.bigGlass();
    detailPage.data();
    detailPage.cutImg();
    detailPage.sc_BtnClick();
    detailPage.addSubtract();
    detailPage.scoll();
})

