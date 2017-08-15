<template>
    <div id="food" v-show="showFlag" ref="food">
        <div class="food-content">
            <div class="image-header">
                <img :src="food.image" alt="产品大图">
                <div class="back">
                    <i class="iconfont icon-iconfontfanhui" @click="hide"></i>
                </div>
            </div>
            <div class="content">
                <h2 class="title">{{food.name}}</h2>
                <div class="detail">
                    <span class="sell-count">月售{{food.sellCount}}份</span>
                    <span class="rating">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food"></cartcontrol>
                </div>
                <transition name="fade">
                    <div class="buy" v-show="!food.count || food.count === 0" @click.stop.prevent="addFirst($event)">加入购物车</div>
                </transition>
            </div>
            <split></split>
            <div class="info">
                <h2 class="title">商品信息</h2>
                <p class="text" v-show="food.info">{{food.info}}</p>
            </div>
            <split></split>
            <div class="rating-wrapper">
                <h2 class="title">商品评价</h2>
                <ratingSelect @select="ratingSelectFn" @toggleContent="toggleContentFn" :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings"></ratingSelect>
                <div class="rating-content">
                    <ul class="" v-show="food.ratings && food.ratings.length">
                        <li class="rating-item border-1px" v-for="rating in food.ratings" v-show="needShow(rating.rateType, rating.text)">
                            <div class="user">
                                <span class="username">{{rating.username}}</span>
                                <img class="avatar" :src="rating.avatar" width="12" height="12" alt="用户头像">
                            </div>
                            <div class="time">{{rating.rateTime | formatDate}}</div>
                            <p class="text">
                                <i class="iconfont" :class="showType(rating.rateType)"></i>
                                {{rating.text}}
                            </p>
                        </li>
                    </ul>
                    <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import BScroll from 'better-scroll';
    import cartcontrol from '../cartcontrol/cartcontrol';
    import split from '../split/split';
    import ratingSelect from '../ratingSelect/ratingSelect';
    import {formatDate} from '../../common/js/date';

    const POSITIVE = 0;
    const NEGATIVE = 1;
    const ALL = 2;

    export default {
        props: {
            food: {
                type: Object
            },
        },
        data(){
            return {
                showFlag: false,
                selectType: ALL,
                onlyContent: true,
                desc: {
                    all: '全部',
                    positive: '满意',
                    negative: '吐槽'
                },
            }
        },
        methods: {
            // 这个方法是通过父组件goods调用的
            show(){
                this.showFlag = true;
                this.selectType = ALL;
                this.onlyContent = true;

                this.$nextTick(() => {
                    if(!this.scroll){
                        this.scroll = new BScroll(this.$refs.food, {
                            click: true,
                        });
                    }else{
                        this.scroll.refresh();
                    }
                });
            },
            hide(){
                this.showFlag = false;
            },
            addFirst(event){
                if(!event._constructed){
                    return;
                }

                Vue.set(this.food, 'count', 1);
                this.$emit('add', event.target); // 将'加入购物车'DOM传递出去
            },
            showType(type){
                return {
                    'icon-haoping': type === POSITIVE,
                    'icon-chaping': type === NEGATIVE,
                };
            },
            needShow(type, text){
                if(this.onlyContent && !text) return false;
                if(this.selectType === ALL){
                    return true;
                }else{
                    return type === this.selectType;
                }
            },
            ratingSelectFn(type){
                this.selectType = type;
                this.$nextTick(() => {
                    this.scroll.refresh();
                });
            },
            toggleContentFn(){
                this.onlyContent = !this.onlyContent;
                this.$nextTick(() => {
                    this.scroll.refresh();
                });
            },
        },
        filters: {
            formatDate(time){
                let date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm');
            },
        },
        components: {
            cartcontrol,
            split,
            ratingSelect,
        }
    }
</script>

<style scoped>
    /*商品详情*/
    #food{
        position: fixed;
        left: 0;
        top: 0;
        bottom: 48px;
        z-index: 30;
        width: 100%;
        background-color: #fff;
        transform: translate3d(0, 0, 0);
    }

    #food .food-content{
        position: relative;
    }

    /*产品大图*/
    #food .food-content .image-header{
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        overflow: hidden;
    }

    #food .food-content .image-header img{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }

    #food .food-content .image-header .back{
        position: absolute;
        left: 10px;
        top: 10px;
        color: #fff;
        cursor: pointer;
    }

    #food .food-content .image-header .back .iconfont{
        display: block;
        padding: 10px;
    }

    /*商品信息*/
    #food .food-content .content{
        padding: 18px;
        position: relative;
    }

    #food .food-content .content .title{
        font-size: 14px;
        font-weight: 700;
        line-height: 1;
        color: rgb(7, 17, 27);
        margin-bottom: 8px;
    }

    #food .food-content .content .detail{
        font-size: 0;
        line-height: 10px;
    }

    #food .food-content .content .detail .sell-count,
    #food .food-content .content .detail .rating{
        font-size: 10px;
        color: rgb(147, 153, 159);
    }

    #food .food-content .content .detail .sell-count{
        margin-right: 12px;
    }

    #food .food-content .content .price{
        font-weight: 700;
        line-height: 24px;
    }

    #food .food-content .content .price .now{
        color: rgb(240, 20, 20);
        margin-right: .5em;
        font-size: 14px;
    }

    #food .food-content .content .price .old{
        text-decoration: line-through;
        font-size: 10px;
        color: rgb(147, 153, 159);
    }

    /*加入购物车*/
    #food .food-content .cartcontrol-wrapper{
        position: absolute;
        right: 12px;
        bottom: 12px;
    }

    #food .food-content .buy{
        position: absolute;
        right: 18px;
        bottom: 18px;
        z-index: 10;
        font-size: 10px;
        line-height: 24px;
        padding: 0 12px;
        box-sizing: border-box;
        border-radius: 12px;
        color: #fff;
        background-color: rgb(0, 160, 220);
        cursor: pointer;
    }

    /*商品描述*/
    #food .food-content .info{
        padding: 18px;
    }

    #food .food-content .info .title{
        font-size: 14px;
        line-height: 1;
        margin-bottom: 6px;
        color: rgb(7, 17, 27);
    }

    #food .food-content .info .text{
        font-size: 12px;
        line-height: 2;
        color: rgb(77, 85, 93);
        padding: 0 8px;
    }

    /*商品评价*/
    #food .food-content .rating-wrapper{
        padding-top: 18px;
    }

    #food .food-content .rating-wrapper .title{
        font-size: 14px;
        line-height: 1;
        color: rgb(7, 17, 27);
        margin-left: 18px;
    }

    #food .food-content .rating-wrapper .rating-content{
        padding: 0 18px;
    }

    #food .food-content .rating-wrapper .rating-content .rating-item{
        position: relative;
        padding: 16px 0;
    }

    #food .food-content .rating-wrapper .rating-content .rating-item.border-1px::before,
    #food .food-content .rating-wrapper .rating-content .rating-item.border-1px:last-child::after{
        display: none;
    }

    #food .food-content .rating-wrapper .rating-content .rating-item .user{
        position: absolute;
        right: 0;
        top: 16px;
        font-size: 0;
        line-height: 12px;
    }

    #food .food-content .rating-wrapper .rating-content .rating-item .user .username{
        display: inline-block;
        vertical-align: top;
        font-size: 10px;
        color: rgb(147, 153, 159);
        margin-right: 6px;
    }

    #food .food-content .rating-wrapper .rating-content .rating-item .user .avatar{
        display: inline-block;
        vertical-align: top;
        border-radius: 50%;
    }

    #food .food-content .rating-wrapper .rating-content .rating-item .time{
        font-size: 10px;
        line-height: 1.2;
        color: rgb(147, 153, 159);
        margin-bottom: 6px;
    }

    #food .food-content .rating-wrapper .rating-content .rating-item .text{
        font-size: 12px;
        line-height: 16px;
        color: rgb(7, 17, 27);
    }

    #food .food-content .rating-wrapper .rating-content .rating-item .text .iconfont{
        margin-right: 4px;
    }

    #food .food-content .rating-wrapper .rating-content .rating-item .text .icon-haoping{
        color: rgb(0, 160, 220);
    }

    #food .food-content .rating-wrapper .rating-content .rating-item .text .icon-chaping{
        color: rgb(147, 153, 159);
    }

    #food .food-content .rating-wrapper .rating-content .no-rating{
        padding: 16px 0;
        font-size: 12px;
        color: rgb(147, 153, 159);
    }
</style>
