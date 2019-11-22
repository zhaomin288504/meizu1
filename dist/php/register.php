<?php
header("Content-type:text/html;charset=utf-8");

$responseDate = array("code" => 0,"message" => "");

$username = $_POST['username'];
$password = $_POST['password'];
$repassword = $_POST['repassword'];



if(!$username){
		$responseDate["code"] = 1;
		$responseDate["message"] = "用户名不能为空";
		echo json_encode($responseDate);
		exit;
	}

if(!$password){
		$responseDate["code"] = 2;
		$responseDate["message"] = "密码不能为空";
		echo json_encode($responseDate);
		exit;
	}

if($password != $repassword){
		$responseDate["code"] = 3;
		$responseDate["message"] = "两次输入的密码不一致";
		echo json_encode($responseDate);
		exit;
	}


/*
		注册
*/

$link = mysql_connect("localhost","root","123456");

if(!$link){
	$responseDate['code'] ==4;
	$responseDate['message']=="服务器忙";
	echo json_encode($responseDate);
	exit;
}

mysql_set_charset("utf8");

mysql_select_db("qd1908");

//准备sql语句  判断数据库是否有同名用户名
$sql = "SELECT * FROM users WHERE username='{$username}'";

$res = mysql_query($sql);

$row = mysql_fetch_assoc($res);
// var_dump($row);//bool(false);
if($row){
	$responseDate['code'] =5;
	$responseDate['message']="用户名已注册";
	echo json_encode($responseDate);
	exit;
}
$str = md5(md5(md5($password)."qianfeng")."qingdao");

$sql = "INSERT INTO users(username,password) VALUE('{$username}','{$str}')";
// var_dump($sql);//string(115) "INSERT INTO users(username,password,create_Time) VALUE('等等','178d56003932a7c9a9aebd7cf178b291','1572355286285')"
$res = mysql_query($sql);
// var_dump($res);//bool(true);

if(!$res){
	$responseDate['code'] =6;
	$responseDate['message']="服务器忙";
	echo json_encode($responseDate);
	exit;
}else{
	$responseDate['message']="注册成功";
	echo json_encode($responseDate);
}
 mysql_close($link);

//密码要进行md5加密
?>