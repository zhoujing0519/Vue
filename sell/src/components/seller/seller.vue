<template>
    <div id="seller" ref="seller">
        <div class="seller-content">
            <div class="overview">
                <h1 class="title" v-text="seller.name"></h1>
                <div class="desc border-1px">
                    <star :size="36" :score="seller.score"></star>
                    <span class="text">({{seller.ratingCount}})</span>
                    <span class="text">月售{{seller.sellCount}}单</span>
                </div>
                <ul class="remark">
                    <li class="block">
                        <h2>起送价</h2>
                        <div class="content">
                            <span class="stress" v-text="seller.minPrice"></span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>商家配送</h2>
                        <div class="content">
                            <span class="stress" v-text="seller.deliveryPrice"></span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>平均配送时间</h2>
                        <div class="content">
                            <span class="stress" v-text="seller.deliveryTime"></span>分钟
                        </div>
                    </li>
                </ul>
                <div class="favorite" @click="toggleFavorite($event)">
                    <i class="iconfont icon-favorite" :class="{'active': favorite}"></i>
                    <span class="text">{{favoriteText}}</span>
                </div>
            </div>
            <split></split>
            <div class="bulletin">
                <h2 class="title">公告与活动</h2>
                <div class="content-wrapper">
                    <p class="content">{{seller.bulletin}}</p>
                    <ul v-if="seller.supports" class="supports">
                        <li class="support-item border-1px" v-for="(item, index) in seller.supports">
                            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                            <span class="text" v-text="seller.supports[index].description"></span>
                        </li>
                    </ul>
                </div>
            </div>
            <split></split>
            <div class="pics">
                <h2 class="title">商家实景</h2>
                <div class="pic-wrapper" ref="picWrapper">
                    <ul class="pic-list" ref="picList">
                        <li class="pic-item" v-for="pic in seller.pics">
                            <img :src="pic" width="120" height="90" alt="商家实景">
                        </li>
                    </ul>
                </div>
            </div>
            <split></split>
            <div class="info">
                <h2 class="title border-1px">商家信息</h2>
                <ul>
                    <li class="info-item border-1px" v-for="info in seller.infos">{{info}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll';
    import {saveToLocal, loadFromLocal} from '../../common/js/store';
    import star from '../star/star';
    import split from '../split/split';

    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data(){
            return {
                favorite: (() => {
                    return loadFromLocal(this.seller.id, 'favorite', false);
                })()
            }
        },
        computed: {
            favoriteText(){
                return this.favorite ? '已收藏' : '收藏';
            },
        },
        created(){
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        },
        mounted(){
            this._initScroll();
            this._initPics();
        },
        watch: {
            'seller'(){
                this._initScroll();
                this._initPics();
            }
        },
        methods: {
            _initScroll(){
                if(!this.scroll){
                    this.scroll = new BScroll(this.$refs.seller, {
                        click: true
                    });
                }else{
                    this.scroll.refresh();
                }
            },
            _initPics(){
                // 商家实景
                if(this.seller.pics){
                    let picWidth = 120;
                    let marginR = 6;
                    let width = (picWidth + marginR) * this.seller.pics.length - marginR;
                    this.$refs.picList.style.width = width + 'px';
                    this.$nextTick(() => {
                        if(!this.picScroll){
                            this.picScroll = new BScroll(this.$refs.picWrapper, {
                                scrollX: true,
                                eventPassthrough: 'vertical'
                            });
                        }else{
                            this.picScroll.refresh();
                        }
                    });
                }
            },
            toggleFavorite(event){
                if(!event._constructed) return;

                this.favorite = !this.favorite;
                saveToLocal(this.seller.id, 'favorite', this.favorite);
            },
        },
        components: {
            star,
            split,
        }
    }
</script>

<style scoped>
    #seller{
        position: absolute;
        top: 174px;
        bottom: 0;
        left: 0;
        width: 100%;
        overflow: hidden;
    }

    #seller .overview{
        padding: 18px;
    }

    #seller .overview .title{
        margin-bottom: 8px;
        line-height: 1;
        color: rgb(7, 17, 27);
        font-size: 14px;
    }

    #seller .overview .desc{
        padding-bottom: 18px;
        font-size: 0;
    }

    #seller .overview .desc.border-1px::before{
        display: none;
    }

    #seller .overview .desc .star{
        display: inline-block;
        margin-right: 8px;
        vertical-align: top;
    }

    #seller .overview .desc .text{
        margin-right: 12px;
        display: inline-block;
        vertical-align: top;
        font-size: 10px;
        line-height: 1.8;
        color: rgb(77, 85, 93);
    }

    #seller .overview .remark{
        display: flex;
        padding-top: 18px;
    }

    #seller .overview .remark .block{
        flex: 1;
        text-align: center;
        border-right: 1px solid rgba(7, 17, 27, .1);
    }

    #seller .overview .remark .block:last-child{
        border: none;
    }

    #seller .overview .remark .block h2{
        margin-bottom: 4px;
        line-height: 1;
        font-size: 10px;
        color: rgb(147, 153, 159);
    }

    #seller .overview .remark .block .content{
        font-size: 10px;
        line-height: 24px;
        color: rgb(7, 17, 27);
    }

    #seller .overview .remark .block .content .stress{
        font-size: 24px;
    }

    #seller .overview .favorite{
        position: absolute;
        right: 11px;
        top: 18px;
        text-align: center;
        width: 40px;
    }

    #seller .overview .favorite .iconfont{
        display: block;
        color: #d4d6d9;
        background-color: #fff;
        font-size: 24px;
        line-height: 1;
        margin-bottom: 4px;
    }

    #seller .overview .favorite .iconfont.active{
        color: rgb(240, 20, 20);
    }

    #seller .overview .favorite .text{
        color: rgb(77, 85, 93);
        font-size: 10px;
        line-height: 1;
    }

    /*公告*/
    #seller .bulletin{
        padding: 18px;
        padding-bottom: 0;
    }

    #seller .bulletin .title{
        font-size: 14px;
        line-height: 1;
        color: rgb(7, 17, 27);
        margin-bottom: 8px;
    }

    #seller .bulletin .content-wrapper{
        padding: 0 12px;
    }

    #seller .bulletin .content-wrapper .content{
        font-size: 12px;
        line-height: 2;
        color: rgb(240, 20, 20);
    }

    #seller .bulletin .content-wrapper .supports .support-item{
        padding: 16px 12px;
        font-size: 0;
    }

    #seller .bulletin .content-wrapper .supports .support-item.border-1px::before,
    #seller .bulletin .content-wrapper .supports .support-item.border-1px:last-child::after{
        display: none;
    }

    #seller .bulletin .content-wrapper .supports .support-item .text{
        display: inline-block;
        vertical-align: top;
        font-size: 12px;
        line-height: 16px;
        color: rgb(7, 17, 27);
    }

    #seller .bulletin .content-wrapper .supports .support-item .icon{
        display: inline-block;
        vertical-align: top;
        width: 16px;
        height: 16px;
        margin-right: 4px;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
    }

    /*满减*/
    #seller .bulletin .content-wrapper .supports .support-item .decrease{
        background-image: url(./icons/decrease_2@2x.png);
    }

    /*3x图片*/
    @media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2){
        #seller .bulletin .content-wrapper .supports .support-item .decrease{
            background-image: url(./icons/decrease_2@3x.png);
        }
    }

    /*打折*/
    #seller .bulletin .content-wrapper .supports .support-item .discount{
        background-image: url(./icons/discount_2@2x.png);
    }

    /*3x图片*/
    @media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2){
        #seller .bulletin .content-wrapper .supports .support-item .discount{
            background-image: url(./icons/discount_2@3x.png);
        }
    }

    /*特殊*/
    #seller .bulletin .content-wrapper .supports .support-item .special{
        background-image: url(./icons/special_2@2x.png);
    }

    /*3x图片*/
    @media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2){
        #seller .bulletin .content-wrapper .supports .support-item .special{
            background-image: url(./icons/special_2@3x.png);
        }
    }

    /*票*/
    #seller .bulletin .content-wrapper .supports .support-item .invoice{
        background-image: url(./icons/invoice_2@2x.png);
    }

    /*3x图片*/
    @media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2){
        #seller .bulletin .content-wrapper .supports .support-item .invoice{
            background-image: url(./icons/invoice_2@3x.png);
        }
    }

    /*保*/
    #seller .bulletin .content-wrapper .supports .support-item .guarantee{
        background-image: url(./icons/guarantee_2@2x.png);
    }

    /*3x图片*/
    @media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2){
        #seller .bulletin .content-wrapper .supports .support-item .guarantee{
            background-image: url(./icons/guarantee_2@3x.png);
        }
    }

    /*商家实景..............................................................................................*/
    #seller .pics{
        padding: 18px;
    }

    #seller .title{
        font-size: 14px;
        line-height: 1;
        margin-bottom: 12px;
        color: rgb(7, 17, 27);
    }

    #seller .pic-wrapper{
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
    }

    #seller .pic-wrapper .pic-list{
        font-size: 0;
    }

    #seller .pic-wrapper .pic-list .pic-item{
        display: inline-block;
        margin-right: 6px;
    }

    #seller .pic-wrapper .pic-list .pic-item:last-child{
        margin-right: 0;
    }

    /*商家信息*/
    #seller .seller-content .info{
        padding: 18px 18px 0px 18px;
        color: rgb(7, 17, 27);
    }

    #seller .seller-content .info .title{
        font-size: 14px;
        line-height: 1;
        padding-bottom: 12px;
    }

    #seller .seller-content .info .title.border-1px::before{
        display: none;
    }

    #seller .seller-content .info .info-item{
        padding: 16px 12px;
        line-height: 16px;
        font-size: 12px;
    }

    #seller .seller-content .info .info-item.border-1px:last-child::after,
    #seller .seller-content .info .info-item.border-1px::before{
        display: none;
    }
</style>
