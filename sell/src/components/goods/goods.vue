<template>
    <div id="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li class="menu-item border-1px" v-for="(item, index) in goods" :class="{'current': currentIndex === index}" @click="selectMenu(index, $event)">
                    <span class="text">
                        <span class="icon" :class="classMap[item.type]" v-show="item.type > 0"></span>{{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li class="food-list food-list-hook" v-for="item in goods">
                    <h3 class="title">{{item.name}}</h3>
                    <ul>
                        <li class="food-item border-1px" v-for="food in item.foods">
                            <div class="icon">
                                <img :src="food.icon" width="57" height="57" alt="商品图标">
                            </div>
                            <div class="content">
                                <h4 class="name">{{food.name}}</h4>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span>
                                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <cartcontrol :food="food"></cartcontrol>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <cart @add="addFood" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></cart>
    </div>
</template>

<script>
    // import Vue from 'vue';
    import axios from 'axios';
    import BScroll from 'better-scroll';
    import cart from '../cart/cart';
    import cartcontrol from '../cartcontrol/cartcontrol';

    const ERR_OK = 0;

    // var eventHub = new Vue();

    export default {
        props: {
            seller: {
                type: Object,
            },
        },
        data(){
            return {
                goods: [],
                listHeight: [],
                scrollY: 0,
            }
        },
        created(){
            axios.get('/api/goods').then(res => {
                if(res.data.errno === ERR_OK){
                    this.goods = res.data.data;

                    // 当需要操作DOM相关的属性时，确保DOM渲染完毕
                    this.$nextTick(() => {
                        this._initScroll();
                        this._calculateHeight();
                    });
                }
            })
            .catch(err => {
                alert('网络错误，无法获取数据！');
            });

            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        },
        computed: {
            currentIndex(){
                for(let i = 0, len = this.listHeight.length; i < len; i++){
                    let height_start = this.listHeight[i];
                    let height_end = this.listHeight[i + 1];

                    if(!height_end || (this.scrollY >= height_start && this.scrollY < height_end)){
                        return i;
                    }
                }

                return 0;
            },
            selectFoods(){
                let foods = [];
                this.goods.forEach((good) => {
                    good.foods.forEach((food) => {
                        if(food.count) foods.push(food);
                    });
                });

                return foods;
            },
        },
        methods: {
            _initScroll(){
                this.menuScroll = new BScroll(this.$refs.menuWrapper, {
                    click: true,
                });
                this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
                    probeType: 3, // 监测实事滚动的位置
                    click: true,
                });

                this.foodsScroll.on('scroll', (pos) => {
                    this.scrollY = Math.abs(Math.round(pos.y));
                });
            },
            _calculateHeight(){
                let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
                let height = 0;
                this.listHeight.push(height);
                for(let i = 0, len = foodList.length; i < len; i++){
                    let item = foodList[i];
                    height += item.clientHeight;
                    this.listHeight.push(height);
                }
            },
            selectMenu(index, event){
                if(!event._constructed){
                    return;
                }

                let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
                let el = foodList[index];
                this.foodsScroll.scrollToElement(el, 300);
            },
            addFood(target){
                this._drop(target);
            },
            _drop(target){
                // 体验优化，异步执行下落动画
                this.$nextTick(() => {
                    this.$refs.cart.drop(target);
                });
            },
        },
        components: {
            cart,
            cartcontrol,
        },
    }
</script>

<style scoped>
    #goods{
        display: flex;
        position: absolute;
        top: 174px;
        left: 0;
        bottom: 46px;
        width: 100%;
        overflow: hidden;
    }

    #goods .menu-wrapper{
        flex: 0 0 80px;
        width: 80px;
        height: 100%;
        background-color: #f3f5f7;
        overflow: hidden;
    }

    #goods .menu-wrapper .menu-item{
        display: table;
        width: 56px;
        height: 54px;
        line-height: 14px;
        font-size: 12px;
        padding: 0 12px;
        text-align: center;
        cursor: pointer;
    }

    #goods .menu-wrapper .menu-item.current{
        position: relative;
        margin-top: -1px;
        background-color: #fff;
        font-weight: 700;
        z-index: 10;
    }

    #goods .menu-wrapper .border-1px::before,
    #goods .menu-wrapper .border-1px:last-child::after{
        display: none;
    }

    #goods .menu-wrapper .menu-item .text{
        display: table-cell;
        vertical-align: middle;
        width: 100%;
    }

    #goods .menu-wrapper .menu-item .icon{
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
    #goods .menu-wrapper .menu-item .decrease{
        background-image: url(icons/decrease_2@2x.png);
    }

    /*3x图片*/
    @media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2){
        #goods .menu-wrapper .menu-item .decrease{
            background-image: url(icons/decrease_2@3x.png);
        }
    }

    /*打折*/
    #goods .menu-wrapper .menu-item .discount{
        background-image: url(icons/discount_2@2x.png);
    }

    /*3x图片*/
    @media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2){
        #goods .menu-wrapper .menu-item .discount{
            background-image: url(icons/discount_2@3x.png);
        }
    }

    /*特殊*/
    #goods .menu-wrapper .menu-item .special{
        background-image: url(icons/special_2@2x.png);
    }

    /*3x图片*/
    @media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2){
        #goods .menu-wrapper .menu-item .special{
            background-image: url(icons/special_2@3x.png);
        }
    }

    /*票*/
    #goods .menu-wrapper .menu-item .invoice{
        background-image: url(icons/invoice_2@2x.png);
    }

    /*3x图片*/
    @media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2){
        #goods .menu-wrapper .menu-item .invoice{
            background-image: url(icons/invoice_2@3x.png);
        }
    }

    /*保*/
    #goods .menu-wrapper .menu-item .guarantee{
        background-image: url(icons/guarantee_2@2x.png);
    }

    /*3x图片*/
    @media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2){
        #goods .menu-wrapper .menu-item .guarantee{
            background-image: url(icons/guarantee_2@3x.png);
        }
    }

    /*商品列表..................................................................................................*/
    #goods .foods-wrapper{
        flex: 1;
    }

    #goods .foods-wrapper .title{
        padding-left: 14px;
        height: 26px;
        line-height: 26px;
        font-size: 12px;
        border-left: 2px solid #d9dde1;
        color: rgb(147, 153, 159);
        background-color: #f3f5f7;
    }

    #goods .foods-wrapper .food-item{
        display: flex;
        margin: 18px;
        padding-bottom: 18px;
    }

    #goods .foods-wrapper .food-item:last-child{
        margin-bottom: 0;
        padding-bottom: 0;
    }

    #goods .foods-wrapper .food-item.border-1px::before,
    #goods .foods-wrapper .food-item.border-1px:last-child::after{
        display: none;
    }

    #goods .foods-wrapper .food-item .icon{
        flex: 0 0 57px;
        margin-right: 10px;
    }

    #goods .foods-wrapper .food-item .content{
        flex: 1;
    }

    #goods .foods-wrapper .food-item .content .name{
        margin: 2px 0 8px 0;
        line-height: 1;
        height: 1em;
        font-size: 14px;
        color: rgb(7, 17, 27);
    }

    #goods .foods-wrapper .food-item .content .desc,
    #goods .foods-wrapper .food-item .content .extra{
        font-size: 10px;
        line-height: 1.2;
        color: rgb(147, 153, 159);
        margin-bottom: 8px;
    }

    #goods .foods-wrapper .food-item .content .extra .count{
        margin-right: .5em;
    }

    #goods .foods-wrapper .food-item .content .price{
        font-weight: 700;
        line-height: 24px;
    }

    #goods .foods-wrapper .food-item .content .price .now{
        color: rgb(240, 20, 20);
        margin-right: .5em;
        font-size: 14px;
    }

    #goods .foods-wrapper .food-item .content .price .old{
        text-decoration: line-through;
        font-size: 10px;
        color: rgb(147, 153, 159);
    }

    #goods .foods-wrapper .food-item .content .cartcontrol-wrapper{
        position: absolute;
        right: 0;
        bottom: 12px;
    }
</style>
