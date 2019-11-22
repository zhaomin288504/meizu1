

// console.log("载入成功");

/* 
    配置引入的文件路径
*/
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "jquery-ui.min":"jquery-ui.min",
        "parabola": "parabola",
        "cart":"cart"
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

require(["cart"], function(cart){
    cart.downdata();
    cart.addSubtract();
    cart.clickDel();
    // cart.totalPrice();
    cart.check();
})

