<template>
    <div id="seller" v-el:seller>
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
            </div>
            <!-- <div class="bulletin">
                <h2 class="title">公告与活动</h2>
                <div class="content-wrapper border-1px">
                    <p class="content">{{seller.bulletin}}</p>
                    <ul v-if="seller.supports" class="supports">
                        <li class="support-item border-1px" v-for="(item, index) in seller.supports">
                            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                            <span class="text" v-text="seller.supports[index].description"></span>
                        </li>
                    </ul>
                </div>
            </div> -->
            <div class="pics">
                <h2 class="title">商家实景</h2>
                <div class="pic-wrapper" v-el:picWrapper>
                    <ul class="pic-list" v-el:picList>
                        <li class="pic-item" v-for="pic in seller.pics">
                            <img :src="pic" width="120" height="90" alt="商家实景">
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import star from '../star/star';

    export default {
        props: {
            seller: {
                type: Object
            }
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
                    this.scroll = new BScroll(this.$els.seller, {
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
                    this.$els.picList.style.width = width + 'px';
                    this.$nextTick(() => {
                        if(!this.picScroll){
                            this.picScroll = new BScroll(this.$els.picWrapper, {
                                scrollX: true,
                                eventPassthrough: 'vertical'
                            });
                        }else{
                            this.picScroll.refresh();
                        }
                    });
                }
            }
        },
        components: {
            star
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
        padding: 0 12px 16px 12px;
    }

    #seller .bulletin .content-wrapper.border-1px::before{
        display: none;
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
        font-size: 12px;
        line-height: 16px;
        color: rgb(7, 17, 27);
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
</style>
