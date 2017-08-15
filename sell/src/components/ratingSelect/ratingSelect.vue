<template>
    <div id="ratingSelect">
        <div class="rating-type border-1px">
            <span class="filter all" :class="{'active': selectType === 2}" @click="select(2, $event)">
                {{desc.all}}
                <span class="count">{{ratings.length}}</span>
            </span>
            <span class="filter positive" :class="{'active': selectType === 0}" @click="select(0, $event)">
                {{desc.positive}}
                <span class="count">{{positives.length}}</span>
            </span>
            <span class="filter negative" :class="{'active': selectType === 1}" @click="select(1, $event)">
                {{desc.negative}}
                <span class="count">{{negatives.length}}</span>
            </span>
        </div>
        <div class="switch" :class="{'on': onlyContent}" @click="toggleContent($event)">
            <i class="iconfont icon-gou"></i>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script>
    const POSITIVE = 0;
    const NEGATIVE = 1;
    const ALL = 2;

    export default {
        props: {
            ratings: {
                type: Array,
                default(){
                    return [];
                },
            },
            selectType: {
                type: Number,
                default: ALL,
            },
            onlyContent: {
                type: Boolean,
                default: false,
            },
            desc: {
                type: Object,
                default(){
                    return {
                        all: '全部',
                        positive: '满意',
                        negative: '不满意'
                    }
                },
            }
        },
        methods: {
            select(type, event){
                if(!event._constructed) return;

                /*派发事件*/
                this.$emit('select', type);
            },
            toggleContent(event){
                if(!event._constructed) return;

                /*派发事件*/
                this.$emit('toggleContent');
            },
        },
        computed: {
            positives(){
                return this.ratings.filter((rating) => {
                    return rating.rateType === POSITIVE;
                });
            },
            negatives(){
                return this.ratings.filter((rating) => {
                    return rating.rateType === NEGATIVE;
                });
            },
        },
    }
</script>

<style scoped>
    #ratingSelect .rating-type{
        font-size: 0;
        padding: 18px 0;
        margin: 0 18px;
    }

    #ratingSelect .rating-type.border-1px::before{
        display: none;
    }

    #ratingSelect .rating-type .filter{
        display: inline-block;
        font-size: 12px;
        line-height: 16px;
        padding: 8px 12px;
        border-radius: 2px;
        margin-right: 8px;
        color: rgb(77, 85, 93);
        cursor: pointer;
        user-select: none;
    }

    #ratingSelect .rating-type .filter:last-child{
        margin-right: 0;
    }

    #ratingSelect .rating-type .filter.active{
        color: #fff;
    }

    #ratingSelect .rating-type .all,
    #ratingSelect .rating-type .positive{
        background-color: rgba(0, 160, 220, .2);
    }

    #ratingSelect .rating-type .all.active,
    #ratingSelect .rating-type .positive.active{
        background-color: rgb(0, 160, 220);
    }

    #ratingSelect .rating-type .negative{
        background-color: rgba(77, 85, 93, .3);
    }

    #ratingSelect .rating-type .negative.active{
        background-color: rgb(77, 85, 93);
    }

    #ratingSelect .rating-type .filter .count{
        font-size: 8px;
        margin-left: 2px;
    }

    /*Switch*/
    #ratingSelect .switch{
        padding: 12px 18px;
        line-height: 24px;
        border-bottom: 1px solid rgba(7, 17, 27, .1);
        color: rgb(147, 153, 159);
        font-size: 0;
        cursor: pointer;
    }

    #ratingSelect .switch .iconfont{
        display: inline-block;
        vertical-align: top;
        font-size: 24px;
        margin-right: 4px;
    }

    #ratingSelect .switch.on .iconfont{
        color: #00c850;
    }

    #ratingSelect .switch .text{
        display: inline-block;
        vertical-align: top;
        font-size: 12px;
    }
</style>
