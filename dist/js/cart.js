

define(["jquery","jquery-cookie","jquery-ui.min"],function($){
    // 加载数据
    function downdata(){
        var cookieStr=$.cookie("goods");
        var cookieArr =JSON.parse(cookieStr);
        // console.log(cookieArr);
        /* for(var i=0;i<cookieArr.length;i++){
            $(".cartbox .car1 table .tr3 .td3 i ").html(cookieArr[i].num);
        } */
        
        $.ajax({
            type:"get",
            url:"../json/list.json",
            success:function(arr){
                console.log(arr);
                var cookieStr = $.cookie("goods");
                var cookieArr = JSON.parse(cookieStr);
                // console.log(cookieArr);
                var node2 = $(`<i>共${cookieArr.length}件商品，已选择<em>${cookieArr.length}</em>件</i>`);
                    node2.appendTo(".cartbox .car1 table .tr5 .td1 ");
                var num = 0;
                for(var j=0;j<cookieArr.length;j++){
                    var cookieId = cookieArr[j].id;
                    console.log(cookieId);
                    

                    for(var i=0;i<arr.length;i++){
                        if(arr[i].id == cookieId){
                            bigImg=arr[i].bigimg
                            color = arr[i].color;

                            var node1 =$(`<tr class="tr3">
                            <td class="td1">
                            <input class="checkbox" type="checkbox" name="checkbox1" value="checkbox复选1" checked="checked"/>
                                <!-- 1 -->
                               <img src="${bigImg[0]}" alt=""> 
                               <i>${arr[i].model}</i>
                               <i class="i1">全网通公开版</i>
                               <!-- 2 -->
                               <em>${color[0].color}6+128GB</em> 
                            </td>
                            <!-- 3 -->
                            <td class="td2">￥${arr[i].price}</td>
                            <td class="td3" id="${arr[i].id}">
                                <button >-</button>
                                <i>${cookieArr[j].num}</i>
                                <button>+</button>
                            </td>
                            <!-- 4 -->
                        
                            ￥<td class="td4">${cookieArr[j].num*arr[i].price}</td>
        
                            <td id="${arr[i].id}" class="delete">删除</td>
        
                        </tr>`);
                        node1.insertAfter(".cartbox .car1 table .tr2");
                            num += cookieArr[j].num*arr[i].price;
                       

 
                        }
                    }

                   
                }
                $(".cartbox .car1 table .tr5 td:nth-child(4)").html(num);
                
            }
        }) 
    }
    //计算总价
    function totalPrice(){
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
            $(".cartbox .car1 table .tr3 .td3 i").html(sum);
        }else{
            $(".cartbox .car1 table .tr3 .td3 i").html(0);
        }
    }

     //bug加减一起加一起减
     function addSubtract(){
        $(".cartbox .car1 table ").on("click"," .tr3 .td3 button",function(){
            // totalPrice();
            total();
            var id = $(this).closest(".td3").attr("id");
            console.log(id);
            var cookieArr =JSON.parse($.cookie("goods"));

            for(var i=0;i<cookieArr.length;i++){
                if(id==cookieArr[i].id){
                    var goodObj = cookieArr[i];
                    break;
                }
            }

            if(this.innerHTML == "+"){
                goodObj.num++;
            }else{
                if(goodObj.num==1){
                    alert("数量已经减到最小了");
                }else{
                    goodObj.num--;
                }
            }

            $(this).closest(".tr3").find(".td3 i").html(goodObj.num);
            $.cookie("goods",JSON.stringify(cookieArr),{
                expires:7
            })

            // x小计
            var num=parseInt($(this).siblings("i").html());
            var money =$(this).closest(".tr3").find(".td2").html();
            /* alert(money);
            alert(num); */
             $(this).closest(".tr3").find(".td4").html(money.substring(1)*num);
            
             
            
        })
        
    }

    //加载字符串
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
    }
    //点击删除
    function clickDel(){
        $(".cartbox .car1 table ").on("click",".tr3 .delete",function(){
            // alert(1);
           var id = $(this).attr("id");
             $(this).closest(".tr3").remove();
                console.log(id);
            
            var cookieArr = JSON.parse($.cookie("goods"));
            for(var i=0;i<cookieArr.length;i++){
                if(id == cookieArr[i].id){
                   
                    cookieArr.splice(i,1);
                    break;
                }
            }
            
            if(cookieArr.length){
                $.cookie("goods",JSON.stringify(cookieArr),{expires:7})
            }else{
                $.cookie("goods",null);
            }
            sc_num();
        })
    }
    
    //计算选中商品总价
    function total(){
    //全部动态加载的商品的父节点
    var aUls = $(".cartbox .car1 table ").find(".tr3 ");
    //总钱数是0
    var sum = 0;
    //each遍历每个加载的商品
    aUls.each(function(index, item){
        ///item表示每个遍历项
        //prop获取checkbox是否被选中
       
        var isCheckEd = $(item) . find(".td1 .checkbox" ).prop("checked");
        console.log($(item) . find(".td1 .checkbox" ).prop("checked"));
        // console.log(isCheckEd);
        //如果商品被选中累加sum
        if(isCheckEd){
            console.log($(item). find(".td4"));
            sum += Number($(item). find(".td4") . html());
        }
       //sum显示
        $("#money").html("￥"+sum);
    })
}

    //勾选对号变价格
    function check(){
        $(".cartbox .car1 table").on("click",".tr3 .checkbox",function(){
            total();
        })
    }


   

    return {
        downdata:downdata,
        addSubtract:addSubtract,
        clickDel:clickDel,
        // totalPrice:totalPrice
        check:check
    }
})
