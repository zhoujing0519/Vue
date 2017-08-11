<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img :src="seller.avatar" width="64" height="64" alt="商家头像">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name" v-text="seller.name"></span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div class="support" v-if="seller.supports">
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="text" v-text="seller.supports[0].description"></span>
                </div>
            </div>
            <div class="support-count" v-if="seller.supports" @click="showDetail">
                <span class="count">{{seller.supports.length}}个</span>
                <span class="iconfont icon-enter"></span>
            </div>
        </div>
        <div class="bulletin-wrapper" @click="showDetail">
            <span class="bulletin-title"></span><span class="bulletin-text" v-text="seller.bulletin"></span>
            <span class="iconfont icon-enter"></span>
        </div>
        <div class="background">
            <img :src="seller.avatar" width="100%" height="100%" alt="商家图片背景">
        </div>
        <transition name="fade">
            <div class="detail" v-show="isDetailShow">
                <div class="detail-wrapper clearfix">
                    <div class="detail-main">
                        <h1 class="detail-name" v-text="seller.name"></h1>
                        <div class="star-wrapper">
                            <star :size="36" :score="seller.score"></star>
                        </div>
                        <div class="detail-title">
                            <div class="line"></div>
                            <div class="text">优惠信息</div>
                            <div class="line"></div>
                        </div>
                        <ul v-if="seller.supports" class="supports">
                            <li class="support-item" v-for="(item, index) in seller.supports">
                                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                                <span class="text" v-text="seller.supports[index].description"></span>
                            </li>
                        </ul>
                        <div class="detail-title">
                            <div class="line"></div>
                            <div class="text">商家公告</div>
                            <div class="line"></div>
                        </div>
                        <div class="detail-bulletin">
                            <p class="content" v-text="seller.bulletin"></p>
                        </div>
                    </div>
                </div>
                <div class="detail-close" @click="isDetailShow = false"><i class="iconfont icon-x"></i></div>
            </div>
        </transition>
    </div>
</template>

<script>
    import star from '../star/star';

    export default {
        props: {
            seller: {
                type: Object,
            }
        },
        data(){
            return {
                isDetailShow: false,
            }
        },
        created(){
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        },
        methods: {
            showDetail(){
                this.isDetailShow = true;
            }
        },
        components: {
            star
        }
    }
</script>

<style scoped>
    .header{
        color: #fff;
        background-color: rgba(7, 17, 27, .5);
        position: relative;
        overflow: hidden;
    }

    .header .content-wrapper{
        font-size: 0;
        padding: 24px 12px 18px 24px;
        position: relative;
    }

    .header .content-wrapper .avatar,
    .header .content-wrapper .content{
        display: inline-block;
    }

    .header .content-wrapper .avatar{
        vertical-align: top;
    }

    .header .content-wrapper .avatar img{
        border-radius: 2px;
    }

    .header .content-wrapper .content{
        margin-left: 16px;
    }

    .header .content-wrapper .title{
        margin: 2px 0 8px 0;
    }

    .header .content-wrapper .brand{
        display: inline-block;
        width: 30px;
        height: 18px;
        background-image: url(icons/brand@2x.png);
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        vertical-align: top;
    }

    /*3x图片*/
    @media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2){
        .header .content-wrapper .brand{
            background-image: url(icons/brand@3x.png);
        }
    }

    .header .content-wrapper .name{
        font-size: 16px;
        margin-left: 6px;
        line-height: 18px;
        font-weight: bold;
    }

    .header .content-wrapper .description{
        margin-bottom: 10px;
        font-size: 12px;
        line-height: 1;
    }

    .header .content-wrapper .support{

    }

    .header .content-wrapper .support .icon{
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 4px;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
    }

    /*满减*/
    .header .content-wrapper .support .decrease{
        background-image: url(icons/decrease_2@2x.png);
    }

    /*3x图片*/
    @media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2){
        .header .content-wrapper .support .decrease{
            background-image: url(icons/decrease_2@3x.png);
        }
    }

    /*打折*/
    .header .content-wrapper .support .discount{
        background-image: url(icons/discount_2@2x.png);
    }

    /*3x图片*/
    @media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2){
        .header .content-wrapper .support .discount{
            background-image: url(icons/discount_2@3x.png);
        }
    }

    /*特殊*/
    .header .content-wrapper .support .special{
        background-image: url(icons/special_2@2x.png);
    }

    /*3x图片*/
    @media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2){
        .header .content-wrapper .support .special{
            background-image: url(icons/special_2@3x.png);
        }
    }

    /*票*/
    .header .content-wrapper .support .invoice{
        background-image: url(icons/invoice_2@2x.png);
    }

    /*3x图片*/
    @media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2){
        .header .content-wrapper .support .invoice{
            background-image: url(icons/invoice_2@3x.png);
        }
    }

    /*保*/
    .header .content-wrapper .support .guarantee{
        background-image: url(icons/guarantee_2@2x.png);
    }

    /*3x图片*/
    @media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2){
        .header .content-wrapper .support .guarantee{
            background-image: url(icons/guarantee_2@3x.png);
        }
    }

    .header .content-wrapper .support .text{
        font-size: 10px;
        line-height: 1.2;
    }

    .header .content-wrapper .support-count{
        position: absolute;
        right: 12px;
        bottom: 18px;
        font-size: 10px;
        padding: 0 .8em;
        line-height: 2.4;
        text-align: center;
        border-radius: 1.4em;
        background-color: rgba(0, 0, 0, .2);
    }

    .header .content-wrapper .support-count .iconfont{
        font-size: 10px;
    }

    /*公告*/
    .header .bulletin-wrapper{
        height: 28px;
        line-height: 28px;
        padding: 0 22px 0 12px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        background-color: rgba(7, 17, 27, .2);
        position: relative;
    }

    .header .bulletin-title{
        display: inline-block;
        width: 22px;
        height: 12px;
        background-image: url(icons/bulletin@2x.png);
        background-size: 100%;
        vertical-align: top;
        margin-top: 8px;
    }

    .header .bulletin-text{
        font-size: 10px;
        margin: 0 4px;
        vertical-align: top;
    }

    .header .bulletin-wrapper .iconfont{
        position: absolute;
        top: 0;
        right: 12px;
        font-size: 10px;
    }

    .header .background{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        filter: blur(10px);
    }

    /*浮层*/
    .header .detail{
        position: fixed;
        z-index: 100;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(7, 17, 27, .8);
        backdrop-filter: blur(10px);
    }

    /*Sticky Footer*/
    .header .detail-wrapper{
        width: 100%;
        min-height: 100%;
    }

    .header .detail-main{
        margin-top: 64px;
        padding-bottom: 64px;
    }

    .header .detail-close{
        position: relative;
        width: 32px;
        height: 32px;
        margin: -50px auto 0 auto;
        clear: both;
        text-align: center;
    }

    .header .detail-close .iconfont{
        font-size: 20px;
    }

    .header .detail-name{
        line-height: 1;
        text-align: center;
        font-size: 16px;
        font-weight: 700;
    }

    /*详情 评分*/
    .header .detail .star-wrapper{
        margin-top: 18px;
        padding: 2px 0;
        text-align: center;
    }

    /*详情 小标题*/
    .header .detail-title{
        display: flex;
        width: 80%;
        margin: 28px auto 24px;
    }

    .header .detail-title .line{
        flex: 1;
        position: relative;
        top: -6px;
        border-bottom: 1px solid rgba(255, 255, 255, .2);
    }

    .header .detail-title .text{
        font-size: 14px;
        padding: 0 12px;
        font-weight: 700;
    }

    /*优惠列表*/
    .header .detail-main .supports{
        width: 80%;
        margin: 0 auto;
    }

    .header .detail-main .support-item{
        padding: 0 12px;
        margin-bottom: 12px;
        font-size: 0;
    }

    .header .detail-main .support-item:last-child{
        margin-bottom: 0;
    }

    .header .detail-main .support-item .icon{
        display: inline-block;
        width: 16px;
        height: 16px;
        vertical-align: top;
        margin-right: 6px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }

    /*满减*/
    .header .detail-main .support-item .decrease{
        background-image: url(icons/decrease_2@2x.png);
    }

    /*3x图片*/
    @media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2){
        .header .detail-main .support-item .decrease{
            background-image: url(icons/decrease_2@3x.png);
        }
    }

    /*打折*/
    .header .detail-main .support-item .discount{
        background-image: url(icons/discount_2@2x.png);
    }

    /*3x图片*/
    @media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2){
        .header .detail-main .support-item .discount{
            background-image: url(icons/discount_2@3x.png);
        }
    }

    /*特殊*/
    .header .detail-main .support-item .special{
        background-image: url(icons/special_2@2x.png);
    }

    /*3x图片*/
    @media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2){
        .header .detail-main .support-item .special{
            background-image: url(icons/special_2@3x.png);
        }
    }

    /*票*/
    .header .detail-main .support-item .invoice{
        background-image: url(icons/invoice_2@2x.png);
    }

    /*3x图片*/
    @media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2){
        .header .detail-main .support-item .invoice{
            background-image: url(icons/invoice_2@3x.png);
        }
    }

    /*保*/
    .header .detail-main .support-item .guarantee{
        background-image: url(icons/guarantee_2@2x.png);
    }

    /*3x图片*/
    @media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2){
        .header .detail-main .support-item .guarantee{
            background-image: url(icons/guarantee_2@3x.png);
        }
    }

    .header .detail-main .support-item .text{
        font-size: 12px;
        line-height: 16px;
    }

    .header .detail-bulletin{
        width: 80%;
        margin: 0 auto;
    }

    .header .detail-bulletin .content{
        padding: 0 12px;
        font-size: 12px;
        line-height: 24px;
    }
</style>
