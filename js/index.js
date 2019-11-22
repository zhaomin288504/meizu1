define(["jquery","jquery-cookie"],function($){
    //轮播图
    function slideshow(){
        $(".list").hide();
        $(".barAbove").hide();
        $.ajax({
            
            type:"get",
            url:"../json/index1.json",
            success:function(arr){
                //banner图

            
                var banner = arr.banner;
                // console.log(banner.length);
                for(var i = 0;i <banner.length;i++){
                   var node1 = $(`<li><a id = "${banner[i].id}" style="display:${i == 0?"block":"none"}; opacity:${i==0?1:0.2}"><img src="${banner[i].img}" alt=""></a></li>`);
                   node1.appendTo($(".navbox .banner"));
                   //圈圈
                  
                   $(`<span class="${i==0?"sactive":""}"></span>`).appendTo($(".navbox .banner .circle .spanbox"))
                  
                }
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
                    $(".navbox .nava .navabox .left a").css("color","#337ab7");
                    

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
                      $(this).find("li a").css("color","white");
                      
                
                   })
                   

                  

                   $("body").on("mouseenter",".list",function(){
                        $(".list").show();
                        $(".barAbove").show();
                        $(".navbox .nava .navabox .left a").css("color","#337ab7");

                    })
                   
                    $("body").on("mouseleave",".list",function(){
                      $(".list").hide();
                        $(".list").html("");
                        $(".barAbove").hide();
                        $(".navbox .nava .navabox .left a").css("color","#fff");
                        
                    })
               
            },
            

            error:function(msg){
                console.log(msg);
            }
            
        });
        
    }
    //上边榄切换
    //banner图切换
    function bannerTab() {
         var timer =null;
         var iNow = 0;
         tab();
        timer=setInterval(function(){
            iNow++;
            tab();
        },2000)

        $(".navbox .banner").hover(function(){
            clearInterval(timer);
        },function(){
           timer=setInterval(function(){
            
            iNow++;
            tab();
        },2000)
        })

        //bug2点击跳转
       /*  $(".navbox .banner .circle .spanbox").on("click","spanp",function(){
            iNow = $(this).index();
            tab();
        }); */
        

         //进行切换
         function tab() {
             var aImgs = $(".navbox .banner li a");
             var aBtns = $(".navbox .banner .circle .spanbox span");
             //圈圈动画
            
             //图片动画
             aImgs.css("opacity",0.2).hide().eq(iNow).show().stop(true).animate({
                 opacity:1
             },800,function() {
                 if(iNow == aBtns.size()-1){
                     iNow=-1;
                 }else if(iNow == aBtns.size()){
                     iNow=0;
                 }
             })
              aBtns.removeClass("sactive").eq(iNow).addClass("sactive");

             aBtns.on("click",function(){
                 $(this).addClass("sactive").siblings().removeClass("sactive");
                iNow = $(this).index();
                console.log(iNow)
                aImgs.css("opacity",0.2).hide().eq(iNow).show().animate({
                    opacity:1
                },800);
            });
   
         }
    }
    //加载section数据
    function downData(){
        $.ajax({
            type:"get",
            url:"../json/index1.json",
            success:function(arr){
                var adv = arr.adv;
                // console.log(adv);
                //第一列手机
                for(var i=0;i<adv.length;i++){
                    var node1 = $(`<div>
                        <a href="">
                            <img src="${adv[i].img}" alt="">
                            <span class="span1">${adv[i].model}</span>
                            <span class="span2">${adv[i].tag}</span>
                        </a>
                    </div>`);
                    node1.appendTo(".advbox .adv1 .advb");
                }



                //大图小图big
                var adiv2 = arr.big;
                var node2 = $(`<span class="new">${adiv2[0].active}</span>
                <p class="p1">${adiv2[0].model}</p>
                <p class="p2">${adiv2[0].desc}</p>
                <p class="p3">${adiv2[0].price}</p>
                <img src="${adiv2[0].img}" alt="">`);
                node2.appendTo(".advbox .adiv2 .bigbox .left");
                var node3 = $(`<span class="new">${adiv2[1].active}</span>
                <p class="p1">${adiv2[1].model}</p>
                <p class="p2">${adiv2[1].desc}</p>
                <p class="p3">${adiv2[1].price}</p>
                <img src="${adiv2[1].img}" alt="">`);
                node3.appendTo(".advbox .adiv2 .bigbox .right");

                //大图小图small
                var adiv3 = arr.small;
                
                for(var i=0;i<3;i++){
                    var node3 = $(` <a href="" class="abox1">
                    <span class="new"></span>
                    <img src="${adiv3[i].img}" alt="">
                    <p class="p1">${adiv3[i].model}</p>
                    <p class="p2">${adiv3[i].desc}</p>
                    <p class="p3">${adiv3[i].price}</p>
                </a>`);
                node3.appendTo(".advbox .adiv2 .smallbox");
                }
                var node4 = $(`<a href="" class="abox4">
                <img src="${adiv3[3].img}" alt="">
                <p class="p1">${adiv3[3].model}</p>
                <p class="p2">${adiv3[3].desc}</p>
                <p class="p3">>${adiv3[3].price}</p>
            </a>`)
                node4.appendTo(".advbox .adiv2 .smallbox");

                
                for(var i=4;i<7;i++){
                    var node5 = $(` <a href="" class="abox1">
                    <span class="new"></span>
                    <img src="${adiv3[i].img}" alt="">
                    <p class="p1">${adiv3[i].model}</p>
                    <p class="p2">${adiv3[i].desc}</p>
                    <p class="p3">${adiv3[i].price}</p>
                </a>`);
                node5.appendTo(".advbox .adiv2 .smallbox");
                }
                var node6 = $(`<a href="" class="abox4">
                <img src="${adiv3[7].img}" alt="">
                <p class="p1">${adiv3[7].model}</p>
                <p class="p2">${adiv3[7].desc}</p>
                <p class="p3">${adiv3[7].price}</p>
            </a>`)
                node6.appendTo(".advbox .adiv2 .smallbox");



                //4个大的居中图写到这
                var adiv4 = arr.Img;
                var node7=$(`<a href=""><img src="images/4.jpg" alt=""></a>`);
                node7.appendTo(".advbox .bigimg1");
                var node8=$(`<a href=""><img src="images/4.jpg" alt=""></a>`);
                node7.appendTo(".advbox .bigimg1");

                
            },error:function(msg){
                console.log(msg);
            }
        })
    };

    //移入移除侧边栏
    function immigration(){
        // alert(1);
        $(".navbox .banner .sidebar").on("mouseenter",".lie",function(){
           console.log($(this).index() / 2);
           $(this).nextSibling().show(); 


            $(this).css({
                "background":"yellow",
                "opacity":0.4
            })
        }).on("mouseleave",".lie",function(){
            $(this).css({
                "background":"#00c3f5",
                "opacity":0.4
            })
        })
    }


    function downData2(order){
        $.ajax({
            type:"get",
            url:"../json/index1.json",
            success:function(arr){
                var nav = arr.nav;
                console.log(nav);
                // console.log(adv);
                //第一列手机
                for(var i=0;i<nav.length;i++){
                  
                    var node1 = $(`<div class="lie">${nav[i].title}</div>
                    <div class="ce" style="width:${getwidth(nav[i].into.length)}px">
                        <ul class="ubox" >
                            
                        </ul>        
                    </div>
                    `);
                    node1.appendTo(".navbox .banner .sidebar");
                   
                    

                    //取出当前分类下的所有数据
                    if(i < 4){
                        var intoArr = nav[i].into;
                    
                   for(var j=0;j<intoArr.length;j++){
                       
                       $(`<li>
                        <div class="neir">
                                <img src="${intoArr[j].img}" alt="">
                                <span>${intoArr[j].price}</span>
                            </div>
                        </li>`).appendTo(node1.find("ul"));

                   }
                    }
                    
                };
                $(".ubox").hide();
                $(".ce").hide();
            },
            error:function(msg){
                console.log(msg);
            }
        })
    }

    //移入移除侧边栏
    function immigration(){
        // alert(1);
        $(".navbox .banner .sidebar").on("mouseenter",".lie",function(){
            $(this).next().show();
            $(this).next().find(".ubox").show();

            $(this).css({
                "background":"#333",
                "opacity":0.6
            })
        }).on("mouseleave",".lie",function(){
            $(this).next().hide();
            $(this).next().find(".ubox").hide();
            $(this).css({
                "background":"#000",
                "opacity":0.6
            })
        })
    }
    //获取ul的宽度
    function getwidth(num){
       return Math.ceil(num / 5) * 148;
    }

    return {
        slideshow:slideshow,
        bannerTab:bannerTab,
        downData:downData,
        downData2:downData2,
        immigration:immigration
    }
})