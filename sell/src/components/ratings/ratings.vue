<template>
    <div id="ratings" ref="ratings">
        <div class="ratings-content">
            <div class="overview">
                <div class="overview-left">
                    <h2 class="score">{{seller.score}}</h2>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="overview-right">
                    <div class="row-wrapper score-wrapper">
                        <span class="title">服务态度</span>
                        <star :score="seller.serviceScore" :size="36"></star>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="row-wrapper score-wrapper">
                        <span class="title">商品评分</span>
                        <star :score="seller.foodScore" :size="36"></star>
                        <span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class="row-wrapper delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="delivery">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <split></split>
            <ratingSelect
                @select="ratingSelectFn"
                @toggleContent="toggleContentFn"
                :selectType="selectType"
                :onlyContent="onlyContent"
                :desc="desc"
                :ratings="ratings">
            </ratingSelect>
            <div class="rating-wrapper">
                <ul>
                    <li class="rating-item border-1px" v-for="rating in ratings" v-show="needShow(rating.rateType, rating.text)">
                        <div class="avatar">
                            <img :src="rating.avatar" width="28" height="28" alt="用户头像">
                        </div>
                        <div class="content">
                            <h3 class="name">{{rating.username}}</h3>
                            <div class="star-wrapper">
                                <star class="star" :size="24" :score="rating.score"></star>
                                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟</span>
                            </div>
                            <p class="text">{{rating.text}}</p>
                            <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                                <i class="iconfont icon-haoping"></i>
                                <span class="tip" v-for="item in rating.recommend">{{item}}</span>
                            </div>
                            <div class="time">{{rating.rateTime | formatDate}}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import BScroll from 'better-scroll';
    import star from '../star/star';
    import split from '../split/split';
    import ratingSelect from '../ratingSelect/ratingSelect';
    import {formatDate} from '../../common/js/date';

    const ERR_OK = 0;
    const POSITIVE = 0;
    const NEGATIVE = 1;
    const ALL = 2;

    export default {
        props: {
            seller: {
                type: Object,
            }
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
                ratings: [],
            }
        },
        created(){
            axios.get('/api/ratings').then((res) => {
                if(res.data.errno === ERR_OK){
                    this.ratings = res.data.data;

                    this.$nextTick(() => {
                        if(!this.scroll){
                            this.scroll = new BScroll(this.$refs.ratings, {
                                click: true,
                            });
                        }else{
                            this.scroll.refresh();
                        }
                    });

                }
            })
            .catch(err => {
                alert('网络错误，不能访问！');
            });

        },
        methods: {
            ratingSelectFn(type){
                this.selectType = type;
                this.$nextTick(() => {
                    this.scroll.refresh();
                });
            },
            toggleContentFn(isOnlyContent){
                this.onlyContent = isOnlyContent;
                this.$nextTick(() => {
                    this.scroll.refresh();
                });
            },
            needShow(type, text){
                if(this.onlyContent && !text) return false;
                if(this.selectType === ALL){
                    return true;
                }else{
                    return type === this.selectType;
                }
            },
        },
        components: {
            star,
            split,
            ratingSelect,
        },
        filters: {
            formatDate(time){
                let date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm');
            },
        },
    }
</script>

<style>
    /*评论列表组件*/
    #ratings{
        position: absolute;
        left: 0;
        top: 174px;
        bottom: 0;
        width: 100%;
        overflow: hidden;
    }

    #ratings .overview{
        display: flex;
        padding: 18px 0;
    }

    #ratings .overview .overview-left{
        flex: 0 0 137px;
        width: 137px;
        border-right: 1px solid rgba(7, 17, 27, .1);
        text-align: center;
        padding: 6px 0;
    }

    @media only screen and (max-width: 321px){
        #ratings .overview .overview-left{
            flex: 0 0 120px;
            width: 120px;
        }
    }

    #ratings .overview .overview-left .score{
        font-size: 24px;
        line-height: 28px;
        color: rgb(255, 153, 0);
        margin-bottom: 6px;
    }

    #ratings .overview .overview-left .title{
        font-size: 12px;
        line-height: 1;
        color: rgb(7, 17, 27);
        margin-bottom: 8px;
    }

    #ratings .overview .overview-left .rank{
        font-size: 10px;
        line-height: 1;
        color: rgb(147, 153, 159);
    }

    #ratings .overview .overview-right{
        flex: 1;
        padding: 6px 0;
    }

    #ratings .overview .overview-right .row-wrapper{
        font-size: 0;
        margin: 0 auto;
        margin-bottom: 8px;
        width: 200px;
    }

    #ratings .overview .overview-right .row-wrapper:last-child{
        margin-bottom: 0;
    }

    #ratings .overview .overview-right .row-wrapper .title,
    #ratings .overview .overview-right .score-wrapper .star{
        display: inline-block;
        vertical-align: top;
    }

    #ratings .overview .overview-right .row-wrapper .title{
        font-size: 12px;
        line-height: 18px;
        color: rgb(7, 17, 27);
    }

    #ratings .overview .overview-right .score-wrapper .star{
        margin: 0 12px;
    }

    @media only screen and (max-width: 321px){
        #ratings .overview .overview-right .row-wrapper{
            width: 185px;
        }

        #ratings .overview .overview-right .score-wrapper .star{
            margin: 0 6px;
        }
    }

    #ratings .overview .overview-right .score-wrapper .score{
        font-size: 12px;
        line-height: 18px;
        color: rgb(255, 153, 0);
    }

    #ratings .overview .overview-right .delivery-wrapper .delivery{
        display: inline-block;
        font-size: 12px;
        line-height: 18px;
        margin-left: 12px;
        color: rgb(147, 153, 159);
    }

    /*评论列表*/
    #ratings .rating-wrapper{
        padding: 0 18px;
    }

    #ratings .rating-wrapper .rating-item{
        display: flex;
        padding: 18px 0;
    }

    #ratings .rating-wrapper .rating-item.border-1px::before,
    #ratings .rating-wrapper .rating-item.border-1px:last-child::after{
        display: none;
    }

    #ratings .rating-wrapper .rating-item .avatar{
        flex: 0 0 28px;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        margin-right: 12px;
        overflow: hidden;
    }

    #ratings .rating-wrapper .rating-item .content{
        position: relative;
        flex: 1;
    }

    #ratings .rating-wrapper .rating-item .content .name{
        font-size: 10px;
        line-height: 1.2;
        color: rgb(7, 17, 27);
        margin-bottom: 4px;
    }

    #ratings .rating-wrapper .rating-item .content .star-wrapper{
        font-size: 0;
        margin-bottom: 6px;
    }

    #ratings .rating-wrapper .rating-item .content .star-wrapper .star{
        display: inline-block;
        vertical-align: top;
        margin-right: 6px;
    }

    #ratings .rating-wrapper .rating-item .content .star-wrapper .delivery{
        display: inline-block;
        vertical-align: top;
        font-size: 10px;
        line-height: 1.2;
        color: rgb(147, 153, 159);
    }

    #ratings .rating-wrapper .rating-item .content .text{
        font-size: 12px;
        line-height: 18px;
        color: rgb(7, 17, 27);
        margin-bottom: 8px;
    }

    #ratings .rating-wrapper .rating-item .content .recommend{
        line-height: 16px;
        font-size: 0;
    }

    #ratings .rating-wrapper .rating-item .content .recommend .iconfont,
    #ratings .rating-wrapper .rating-item .content .recommend .tip{
        display: inline-block;
        margin: 0 8px 4px 0;
        font-size: 9px;
    }

    #ratings .rating-wrapper .rating-item .content .recommend .icon-haoping{
        color: rgb(0, 160, 220);
        font-size: 12px;
    }

    #ratings .rating-wrapper .rating-item .content .recommend .tip{
        border: 1px solid rgba(7, 17, 27, .1);
        border-radius: 1px;
        padding: 0 6px;
        color: rgb(147, 153, 159);
        background-color: #fff;
    }

    #ratings .rating-wrapper .rating-item .content .time{
        position: absolute;
        right: 0;
        top: 0;
        font-size: 10px;
        line-height: 1.2;
        color: rgb(147, 153, 159);
    }
</style>
