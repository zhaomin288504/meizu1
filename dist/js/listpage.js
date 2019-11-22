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
    //加载section数据
    function data(){
        $.ajax({
            type:"get",
            url:"../json/list.json",
            success:function(arr){
                console.log(arr);
                for(var i=0;i<arr.length;i++){
                    var bigimg = arr[i].bigimg;
                    var smallimg = arr[i].smallimg;
                    var node1 = $(`<li>
                    <p class="jianbian">${arr[i].at}</p>
                    <a href="detailPage.html?id=${arr[i].id}" class="abox1">
                        <!-- 三个大图 -->
                        <img src="${bigimg[0]}" alt="" class="im1">
                        <img src="${bigimg[1]}" alt="">
                        <img src="${bigimg[2]}" alt="">
                        <div class="quan">

                            <!-- 三个小图 -->
                            <span class="q1"><img src="${smallimg[0]}" alt=""></span>
                            <span class="q1"><img src="${smallimg[1]}" alt=""></span>
                            <span class="q1"><img src="${smallimg[2]}" alt=""></span>
                        </div>
                        <p class="p1">${arr[i].model}</p>
                        <p class="p2">${arr[i].desc}</p>
                        <p class="p3">￥${arr[i].price}</p>
                    </a>
                </li>`);
                node1.appendTo(".advbox .adv .content1");
                };
                for(var j=0;j<12;j++){
                    var bigimg = arr[j].bigimg;
                    var node2 = $(`<li>
                        <a href="">
                            <div class="imgbox">
                                <img src="${bigimg[0]}" alt="">
                            </div> 
                            <span class="span1">${arr[j].model}</span>
                            <span class="span2">￥${arr[j].price}</span>
                        </a>
                    </li>`);
                    node2.appendTo(".advbox .adv .advbtm .box1");
                }
            },
            error:function(msg){
                console.log(msg);
            }
        })
    }
    function hovershow(){

        
        $(".advbox .adv .content1").on("mouseenter","li",function(){
            $(this).find(".quan .q1 img").css("display","inline-block");
            $(this).find(".quan .q1").css("display","block");
            
        }),
        $(".advbox .adv .content1").on("mouseleave","li",function(){
            $(".advbox .adv .content1 li .quan .q1 img").css("display","none");
            $(".advbox .adv .content1 li .quan .q1").css("display","none");
        })
    }
    function toward(){
        $(".advbox .adv .content1 ").on("click","li a img",function(){
            
            
        })
    }
    //下面轮播图
    function imgclick(){
        $(".advbox .adv .quanquan div span").click(function(){
            $(this).addClass("span1").siblings().removeClass("span1");
            $(".advbox .adv .advbtm .box1").animate({
                left:-$(this).index()*1240

            },500);
        })
    }
    //截取字符串【8
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
        }
    return {
        slideshow:slideshow,
        data:data,
        hovershow:hovershow,
        toward:toward,
        imgclick:imgclick
    }
})