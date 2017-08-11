<template>
    <div>
        <!-- banner -->
    	<header class="banner">
    		<div class="swiper-container" id="swiper_banner">
    			<div class="swiper-wrapper">
    				<div class="swiper-slide" v-for="slide in slides">
                        {{slide}}
                        <img src="" alt="banner">
                    </div>
    			</div>
    			<div class="swiper-pagination"></div>
    		</div>
    	</header>
    	<article class="container">
    		<!-- 产品展示 -->
    		<section class="products products-wrap">
    			<!-- 筛选 -->
    			<nav class="filter flex">
    				<a href="javascript:;">New Product</a>
    				<a class="active" href="javascript:;">Best Sellers</a>
    				<a href="javascript:;">Show</a>
    			</nav>
    			<!-- 列表 -->
    			<div class="product-list">
    				<ul class="list clear">
    					<li>
    						<a href="productDetails.html">
    							<div class="toBackground"><img class="backgroundImage" src="" alt="产品"></div>
    							<h3>
    								PowerLine Lightning<br>
    								(3ft/0.9m)
    							</h3>
    							<p>The Premium Lipstick Sized Protable charger</p>
    						</a>
    					</li>

    				</ul>
    			</div>
    			<div class="more clear">
    				<a class="fr" href="productFilter.html">More >></a>
    			</div>
    		</section>
    		<!-- 恋家评论 -->
    		<section class="message">
    			<h2>LOVE HOME</h2>
    			<ul class="list">
    				<li>
    					<div class="header clear">
    						<div class="user-wrap fl clear">
    							<div class="avatar fl"><img src="" alt="Weoiuyt Lightning"></div>
    							<span class="fl">Weoiuyt Lightning</span>
    						</div>
    						<span class="fr">by AnkerOfficial Mar 17</span>
    					</div>
    					<div class="clear"></div>
    					<a href="lovehomeDetails.html" class="comment">
    						<h3>PowerLine Lightning (3ft/0.9m)</h3>
    						<p>
    							The Premium Lipstick Sized Protable charger The Premium Lipstick Sized Protable charger The Premium Lipstick Sized Protable charger The Premium Lipstick Sized Protable charger.
    						</p>
    						<div class="image-group clear">
    							<div class="toBackground"><img class="" src="" alt="产品"></div>
    							<div class="toBackground"><img class="" src="" alt="产品"></div>
    							<div class="toBackground"><img class="" src="" alt="产品"></div>
    						</div>
    					</a>
    					<div class="interact-group clear">
    						<a class="watch" href="javascript:;">(1000)</a>
    						<a class="reply" href="lovehomeDetails.html">Reply</a>
    						<a class="praise" href="javascript:;">(201)</a>
    					</div>
    				</li>
    			</ul>
    			<div class="more clear" style="padding-right: 0;">
    				<a class="fr" href="lovehomeList.html">More >></a>
    			</div>
    		</section>
    	</article>
    </div>
</template>

<script>

export default {
    name: 'home',
    data(){
        return {
            slides: []
        }
    },
    created(){
        this.slides = [1, 2, 3];
    },
}
</script>

<style>
/*banner*/
.banner{
	width: 100%;
	height: 3.25rem;

	/*height: 2.56rem;*/
}

.banner .swiper-container{
	width: 100%;
	height: 100%;
}

.banner .swiper-container .swiper-slide{
	display: block;
	width: 100%;
	height: 100%;
}

.banner .swiper-container .swiper-slide a{
	display: block;
	width: 100%;
	height: 100%;
}

.banner .swiper-container img{
	width: 100%;
}

.swiper-pagination-bullet{
	background: #fff;
	opacity: 1;
}

.swiper-pagination-bullet-active{
	background: #009de4;
}

/*products*/
.products{
	background-color: #fff;
}

/*更多*/
.more{
	width: 100%;
	height: 0.65rem;
	padding-right: 0.3rem;
}

.more a{
	font-size: 0.22rem;
	color: #666666;
	line-height: 0.65rem;
}

.product-list .list{
	display: none;
}

.product-list .list.active{
	display: block;
}

</style>
