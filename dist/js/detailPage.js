define(["jquery","jquery-cookie"],function($){
    //轮播图
    
    function slideshow(){
        $(".list").hide();
        $(".barAbove").hide();
        $.ajax({
            
            type:"get",
            url:"../json/index1.json",
            success:function(arr){
                //nav


                var nav = arr.nav;
                console.log(nav);
                //标题栏
                for(var i=0;i<nav.length;i++){
                    var node2 = $(`<li ><a class="a1" href="${nav[i].link}" >${nav[i].title}</a></li>`);
                    node2.appendTo(".navbox .nava .navabox .center");
                   
                }
                /* 上边榄*/
                $(".navbox .nava .navabox .center").on("mouseenter","li a",function(){
                    $(".list").html("")
                    $(".list").show();
                    $(".barAbove").show();
                    /* $(".navbox .nava .navabox .left a").css("color","#337ab7"); */
                    

                    var index = $(this).parent().index();
                    

                    //bug1不变色写不出来
                    $(this).css("color","#337ab7").parent().siblings().find("a").css("color","black");


                    var into = nav[index].into;
                    // console.log(nav)
                    var num = into.length;
                    if(num == 0){
                        $(".list").hide();
                        $(".barAbove").hide();
                    }
                   
                    for(var j=0;j<num;j++){
                        var node3 = $( `<li><a href=""><img src="${into[j].img}" alt=""></a><span>${into[j].model}</span>${into[j].price}<span></span></li>`);
                        node3.appendTo(".barAbove .list");
                    }
                    
                
                  })
                 
                  $(".navbox .nava .navabox .center").on("mouseleave", function(){
                      
                      $(".list").hide();
                      $(".barAbove").hide();
                    //   $(this).find("li a").css("color","white");
                      
                
                   })
                   

                  

                   $("body").on("mouseenter",".list",function(){
                        $(".list").show();
                        $(".barAbove").show();
                        /* $(".navbox .nava .navabox .left a").css("color","#337ab7"); */

                    })
                   
                    $("body").on("mouseleave",".list",function(){
                      $(".list").hide();
                        $(".list").html("");
                        $(".barAbove").hide();
                        /* $(".navbox .nava .navabox .left a").css("color","#fff"); */
                        
                    })
               
            },
            

            error:function(msg){
                console.log(msg);
            }
            
        });
        
    }
    //滚动高度
    function scrolltop(){
        $(window).scroll(function() {
            // 当滚动到最底部以上100像素时， 加载新内容
            if ($(this).scrollTop() >= 82) {
                $(".navbox .titlebox").css("position","fixed");
                $(".navbox .titlebox").css("top","0px");
            }else{
                $(".navbox .titlebox").css("position","absolute");
                $(".navbox .titlebox").css("top","82px");
           }
        });
    }













    

    //关闭弹窗
    $(".navbox .advbox .jump .close").click(function(){
        // alert(1);
        $(".navbox .advbox .jump").css({
            "display": 'none',
        })
    })
    

    //滚动弹窗
    function scoll(){
        $(window).on("scroll resize", function(){
        var left = ($(window).outerWidth() - $("#div1").outerWidth()) / 2-100;
        var top = ($(window).outerHeight() - $("#div1").outerHeight()) / 2 + $(window).scrollTop();
        $(".navbox .advbox .jump").css({
            left: left,
            top: top
        });
    })
    }
    

    //放大镜
    function bigGlass(ev){
            $(".navbox .advbox .adv .left .imgb").mouseenter(function(){
                $(".navbox .advbox .adv .left .mark,.navbox .advbox .adv .right .big").show();
            }).mouseleave(function(){
                $(".navbox .advbox .adv .left .mark,.navbox .advbox .adv .right .big").hide();
            }).mousemove(function(ev){
                var l = ev.pageX - $(this).offset().left - 75;
                if(l <= 0){
                    l = 0;
                }
                if(l >= 410){
                    l = 410;
                }

                var t = ev.pageY - $(this).offset().top - 75;
                if(t <= 0){
                    t = 0;
                }
                if(t >= 410){
                    t = 410;
                }
                $(".navbox .advbox .adv .left .mark").css({
                    left: l,
                    top: t
                })

                //让big下面的图片，反方向，对应倍数移动
                $(".navbox .advbox .adv .right .big img").css({
                    left: -2 * l,
                    top: -2 * t
                })
            })

      }

    //下载图片
    function data(){
        $
          $.ajax({
              type:"get",
              url:"../json/list.json",
              success:function(arr){
                  console.log(arr);
                //   alert(getUrlParam("id"));
                  for(var i=0;i<arr.length;i++){
                      if(arr[i].id == getUrlParam("id")){
                          bigImg=arr[i].bigimg
                          color = arr[i].color;
                        //   console.log(color);
                           colorImg = color[0].img; 
                        //   console.log(colorImg);
                        //   console.log(bigImg[0]);


                        //大图
                        for(var i=0;i<bigImg.length;i++){
                            var node11 = $(`<img src="${bigImg[i]}" alt="">`);
                        node11.appendTo(".navbox .advbox .adv .left .imgb");
                        $('.navbox .advbox .adv .left .imgb img').eq(0).siblings().css("display","none"); 
                        }
                        



                        //小图
                        for(var j=0;j<colorImg.length;j++){
                             var node22 =$(`<li>
                                <img src="${colorImg[j]}" alt="">
                            </li>`);
                            node22.appendTo(".navbox .advbox .adv .left ul");
                        }
                        var node33 = $(`<img src="${bigImg[0]}" alt="">`);
                        node33.appendTo(".navbox .advbox .adv .right .big");
                       
                         ;
                        //  console.log(arr[i].model);     
                       
                        var node77 = $(` <span>${arr[i].addprice}</span>`);
                        node77.appendTo(".navbox .advbox .adv .right .property p");
                        
                        var node55 = $(`<span>${arr[i].price}</span>`)
                        node55.prependTo(".navbox .advbox .adv .right .property");



                        var node66 = $(`<p>${arr[i].active}</p>`)
                        node66.prependTo(".navbox .advbox .adv .right");

                        var node44 = $(` <h1>${arr[i].model}</h1>`);
                        node44.prependTo(".navbox .advbox .adv .right");

                        var node88 = $(`<span class = "span1">${arr[i].model}</span>`);
                        node88.prependTo(".navbox .advbox .adv .right .property3 div");
                        for(var z=0;z<color.length;z++){
                            var node99 = $(` <span>${color[z].color}</span>`);
                        node99.appendTo(".navbox .advbox .adv .right .property5 div");
                        }

                        var storage = arr[i].storage;
                        for(i=0;i<storage.length;i++){
                            var node99 = $(`<span>${storage[i]}</span>`);
                            node99.appendTo(".navbox .advbox .adv .right .property6 div")
                        }
                      }

                  }
              }
          })
    }

    //点击切换图片
    function cutImg(){
        $(".navbox .advbox .adv .left ul").on("click","li",function(){
            num= $(this).index();
            $('.navbox .advbox .adv .left .imgb img').eq(num). css("display","block").siblings().css("display","none"); 
        })

    }

//截取字符串【8
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
    }
    




    function sc_BtnClick(){
        //跳转传id
        /* $(".navbox .advbox .adv .right .btn a").attr(`href`,`cart.html?id=${getUrlParam("id")}`); */
        
        //1.存cookie
        $(".navbox .advbox .adv .right .btn .btn2").on("click",function(){
            // var id = this.id;
            var id = getUrlParam("id")//取到了购物车所在商品的id
            // 1.判断是否是第一次添加数据
            var first = $.cookie("goods")==null?true:false;
            if(first){
                var obj = [{id:id,num:1}]
                $.cookie("goods",JSON.stringify(obj),{
                    expires:7
                })
            }else{
                var cookieStr = $.cookie("goods");
                var cookieArr = JSON.parse(cookieStr);
                var same = false;
                for(var i=0;i<cookieArr.length;i++){
                    if(id ==cookieArr[i].id){
                        cookieArr[i].num++;
                        same=true;
                        break;
                    }
                }
                if(!same){
                    var obj = {id:id,num:1};
                    cookieArr.push(obj);
                }

                $.cookie("goods",JSON.stringify(cookieArr),{
                    expires:7
                })
            }
            // alert($.cookie("goods"));
            
            sc_num();

           
            var left = ($(window).outerWidth()-$(".navbox .advbox .jump").outerWidth())/2;
            var top = ($(window).outerHeight()-$(".navbox .advbox .jump").outerHeight())/2 + $(window).scrollTop();
            $(".navbox .advbox .jump").css({
                left:left,
                top:top,
                "display": 'block',
            })


            
        });
    }
    ///5.购物车数量取出cooki，进行遍历，将sum累加
    function sc_num(){
        var cookieStr = $.cookie("goods");
        if(cookieStr){
            var cookieArr = JSON.parse(cookieStr);
            var sum = 0;
            for(var i=0;i<cookieArr.length;i++){
                sum+=cookieArr[i].num;
            }
            $(".cartbox .car1 table .tr3 i").html(sum);
        }else{
            $(".cartbox .car1 table .tr3 i").html(0);
        }
    }

     //加减
     function addSubtract(){
        var num=1;
        var id=getUrlParam("id");
        $(".navbox .advbox .adv .right .property9 div .sp1").on("click",function(){
            if(this.innerHTML == "+"){
                // alert(this.innerHTML)
                $(".navbox .advbox .adv .right .property9 div .n").html(num++);

            }else{
                
                if(num==1){
                    
                    alert("数量已经减到最小了");
                }else{
                    $(".navbox .advbox .adv .right .property9 div .n").html(num--);
                }
            }
            
            //重新显示新的数量
            $(".navbox .advbox .adv .right .property9 div .n").html(num);
        })
        //num的值存到cookie里
        /* var cookieStr=$.cookie("goods");
        var cookieArr = JSON.parse(cookieStr);
        var obj = {id:id,num:num};
        cookieArr.push(obj);
        $.cookie("goods",JSON.stringify(cookieArr),{
            expires:7
        }) */


    }
    

    return {
        slideshow:slideshow,
        scrolltop:scrolltop,
        bigGlass:bigGlass,
        data:data,
        cutImg:cutImg,
        sc_BtnClick:sc_BtnClick,
        addSubtract:addSubtract,
        scoll:scoll

    }
})