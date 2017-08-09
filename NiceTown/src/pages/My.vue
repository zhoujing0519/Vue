<template>
    <div>
        <!-- 头部 -->
		<div class="banner">
            <div class="user-wrap">
    			<div class="user-avatar"><img src="" alt="用户头像"></div>
    			<h2 class="user-name">James Cameron</h2>
    			<p class="user-country">
    				From：
    				<span>China</span>
    			</p>
    		</div>
		</div>
    	<!-- 列表 -->
		<nav class="user-informations">
			<a href="loveRecord-2.html"><i class="iconfont icon-tabulation"></i><span>Love record</span></a>
			<a href="userInformation.html"><i class="iconfont icon-31wode"></i><span>User information</span></a>
			<a href="about.html"><i class="iconfont icon-home"></i><span>About us</span></a>
		</nav>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.banner{
	position: relative;
	width: 100%;
	height: 3.87rem;
	background-color: #009de4;
	margin-bottom: 0.2rem;
}

.user-wrap{
	position: absolute;
	left: 50%;
	top: 50%;
	-webkit-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	text-align: center;
	color: #fff;
}

.user-avatar{
	width: 1.22rem;
	height: 1.22rem;
	border: 1px solid #fff;
	border-radius: 50%;
	overflow: hidden;
	margin: 0 auto;
	margin-bottom: 0.14rem;
}

.user-avatar img{
	display: block;
	width: 100%;
	height: 100%;
}

.user-name{
	font-size: 0.26rem;
	line-height: 0.3rem;
	margin-bottom: 0.1rem;
}

.user-country{
	font-size: 0.18rem;
	line-height: 0.2rem;
}

/*用户信息列表*/
.user-informations{
	width: 100%;
}

.user-informations a{
	position: relative;
	display: block;
	width: 100%;
	height: 1rem;
	background-color: #fff;
	border-top: 1px solid #eee;
	border-bottom: 1px solid #eee;
	margin-bottom: 0.05rem;
	padding-right: 1rem;
	font-size: 0.24rem;
	line-height: 1rem;
	color: #666666;
}

.user-informations a .iconfont{
    padding: 0 .3rem;
}

.user-informations a::after{
	content: "";
	display: block;
	position: absolute;
	right: 0.3rem;
	top: 50%;
	width: 0.2rem;
	height: 0.2rem;
	border-right: 1px solid #9f9f9f;
	border-bottom: 1px solid #9f9f9f;
	-webkit-transform: translate3d(0, -50%, 0) rotate(-45deg);
	-moz-transform: translate3d(0, -50%, 0) rotate(-45deg);
	-ms-transform: translate3d(0, -50%, 0) rotate(-45deg);
	transform: translate3d(0, -50%, 0) rotate(-45deg);
}
</style>
