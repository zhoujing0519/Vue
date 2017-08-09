<template>
    <div id="app">
        <div class="form-group">
			<div class="input-group">
				<label for="theme">Theme：</label>
				<input type="text" id="theme" placeholder="Please enter a theme">
			</div>
			<div class="article">
				<div class="textarea-group">
					<textarea id="text" placeholder="Please write down the product description..."></textarea>
					<span>0/500 Word</span>
				</div>
				<div id="uploadWrap" class="file-group">
					<ul class="clear"></ul>
				</div>
			</div>
			<div class="btn-group btn-group-vertical">
				<!-- <button class="btn btn-success">Confirm release</button> -->
				<a class="btn btn-success" href="lovehomeDetails.html">Confirm release</a>
			</div>
		</div>
    </div>
</template>

<script>

export default {

}
</script>

<style>
.form-group{
	padding: 0.3rem;
	padding-bottom: none;
}

.input-group{
	width: 100%;
	height: 0.78rem;
	border: 1px solid #eee;
	background-color: #fff;
	padding: 0 0.27rem;
	line-height: 0.78rem;
	color: #666666;
	margin-bottom: 0.1rem;
}

.input-group label{
	font-size: 0.24rem;
}

.input-group input[type=text]{
	font-size: 0.2rem;
}

.article{
	border: 1px solid #eee;
	background-color: #fff;
	margin-bottom: 0.46rem;
}

.textarea-group{
	height: 5.09rem;
	border-bottom: 1px solid #eee;
}

.file-group{
	height: 1.79rem;
	padding: 0.3rem;
}


.file-group ul li{
	float: left;
	width: 1.19rem;
	height: 1.19rem;
	border: 1px dashed #eee;

	width: 23.5%;
}

.file-group ul li:not(:last-child){
	margin-right: 0.3rem;

	margin-right: 2%;
}

.file-group ul li a{
	position: relative;
	display: block;
	width: 100%;
	height: 100%;
	overflow: hidden;
	/*display: table-cell;*/
	line-height: 1.19rem;
	text-align: center;
	vertical-align: middle;
}

.file-group ul li.upload-default a::before, .file-group ul li.upload-default a::after{
	content: "";
	display: block;
	position: absolute;
	left: 50%;
	top: 50%;
	width: 1px;
	height: 0.4rem;
	background-color: #eee;
	-webkit-transform: translate3d(-50%, -50%, 0);
	transform: translate3d(-50%, -50%, 0);
}

.file-group ul li.upload-default a::after{
	-webkit-transform: translate3d(-50%, -50%, 0) rotate(90deg);
	transform: translate3d(-50%, -50%, 0) rotate(90deg);
}

.file-group ul li a input[type=file]{
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
	z-index: 2;
}

.file-group ul li a img{
	position: absolute;
	display: block;
}
</style>
