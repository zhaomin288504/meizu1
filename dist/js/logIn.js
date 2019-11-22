define(["jquery","jquery-cookie"],function($){
    //轮播图
    function ajax1(){
        // alert(1);
        var oBtn=$(".advbox .adv .bgt .box .neirong button");
        var aInputs = $(".advbox .adv .bgt .box .neirong input");
        oBtn.click(function(){
            // alert(1);
            $.ajax({
                type:"post",
                url:"../dist/php/logIn.php",
                data:({
                    username:aInputs.eq(0).val(),
                    password:aInputs.eq(1).val()
    
                

                }),
                success:function(result){
                    var obj = JSON.parse(result);
                    console.log(obj);
                    if(obj.code){
                        $("#yz").html(obj.message);
                        $("#yz").css("display","block");

                        //bug不管用
                        $("#yz").attr("class","alert alert-danger");


                         
                      
                         
                        
                    }else{
                        $("#yz").html(obj.message);
                        $("#yz").css("display","block");

                        //bug不管用
                        $("#yz").attr("class","alert alert-success");


                      
                        setTimeout(function(){
                            location.assign("cart.html");

                        },500)
                     
                    }

                },
                error:function(msg){
                    alert("error"+msg);
                }
            })
        })
    }
    return {
        ajax1:ajax1
    }
})
