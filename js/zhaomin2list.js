// console.log("载入成功");

/* 
    配置引入的文件路径
*/
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "parabola": "parabola",
        "listpage":"listpage"
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

require(["listpage"], function(listpage){
    listpage.data();
    listpage.hovershow();
    // listpage.hovershow();
    listpage.slideshow();
    listpage.toward();
    listpage.imgclick();
})

