<template>
    <div>
        <div id="cart">
            <!-- 购物车底部栏 -->
            <div class="content" @click="toggleList">
                <div class="content-left">
                    <div class="logo-wrapper">
                        <div class="logo" :class="{'highlight': totalCount > 0}">
                            <i class="iconfont icon-cart"></i>
                        </div>
                        <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
                    </div>
                    <div class="price" :class="{'highlight': totalPrice > 0}">￥{{totalPrice}}元</div>
                    <div class="desc">
                        另需配送费￥{{deliveryPrice}}元
                    </div>
                </div>
                <div class="content-right" :class="payClass" @click.stop.prevent="pay">
                    <div class="pay">
                        {{payDesc}}
                    </div>
                </div>
            </div>
            <!-- 购物车小球容器 -->
            <div class="ball-container">
                    <div class="ball-item" v-for="ball in balls">
                        <transition
                            name="drop"
                            @before-enter="beforeDrop"
                            @enter="dropping"
                            @after-enter="afterDrop">
                            <div class="ball" v-show="ball.show">
                                <i class="inner inner-hook"></i>
                            </div>
                        </transition>
                    </div>
            </div>
            <!-- 购物车已选商品列表 -->
            <transition name="fold">
                <div class="cart-list" v-show="listShow">
                    <div class="list-header clearfix">
                        <h2 class="title">购物车</h2>
                        <span class="empty" @click="empty">清空</span>
                    </div>
                    <div class="list-content" ref="listContent">
                        <ul>
                            <li class="food border-1px" v-for="food in selectFoods">
                                <span class="name">{{food.name}}</span>
                                <div class="price">
                                    <span>￥{{food.price * food.count}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <cartcontrol @add="addFood" :food="food"></cartcontrol>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>
        </div>
        <!-- 购物车虚化背景 -->
        <transition name="fade">
            <div id="list-mark" v-show="listShow" @click="hideList"></div>
        </transition>
    </div>
</template>

<script>
    import cartcontrol from '../cartcontrol/cartcontrol';
    import BScroll from 'better-scroll';

    export default {
        props: {
            selectFoods: {
                type: Array,
                default(){
                    return [];
                },
            },
            deliveryPrice: {
                type: Number,
                default: 0,
            },
            minPrice: {
                type: Number,
                default: 0,
            },
        },
        data(){
            return {
                balls: [
                    {
                        show: false,
                    },{
                        show: false,
                    },{
                        show: false,
                    },{
                        show: false,
                    },{
                        show: false,
                    }
                ],
                droppedBalls: [],
                fold: true,
            }
        },
        computed: {
            totalPrice(){
                let total = 0;
                this.selectFoods.forEach((food) => {
                    total += (food.price * food.count);
                });

                return total;
            },
            totalCount(){
                let count = 0;
                this.selectFoods.forEach((food) => {
                    count += food.count;
                });

                return count;
            },
            payDesc(){
                if(this.totalPrice === 0){
                    return `￥${this.minPrice}元起送`;
                }else if(this.totalPrice < this.minPrice){
                    let diff = this.minPrice - this.totalPrice;
                    return `还差￥${diff}元起送`;
                }else{
                    return '去结算';
                }
            },
            payClass(){
                if(this.totalPrice >= this.minPrice){
                    return 'enough';
                }else{
                    return 'not-enough';
                }
            },
            listShow(){
                if(!this.totalCount){
                    this.fold = true;
                    return false;
                }

                let show = !this.fold;

                if(show){
                    this.$nextTick(() => {
                        if(!this.scroll){
                            this.scroll = new BScroll(this.$refs.listContent, {
                                click: true,
                            });
                        }else{
                            this.scroll.refresh();
                        }
                    });
                }

                return show;
            },
        },
        methods: {
            addFood(target){
                this.drop(target);
            },
            // 通过父组件调用, 拿到加入购物车DOM或者加号
            drop(el){
                for(let i = 0, len = this.balls.length; i < len; i++){
                    let ball = this.balls[i];
                    if(!ball.show){
                        ball.show = true;
                        ball.el = el;
                        this.droppedBalls.push(ball);
                        return;
                    }
                }
            },
            toggleList(){
                if(!this.totalCount) return;

                this.fold = !this.fold;
            },
            empty(){
                this.selectFoods.forEach((food) => {
                    food.count = 0;
                });
            },
            hideList(){
                this.fold = true;
            },
            pay(){
                if(this.totalPrice < this.minPrice) return;
                window.alert(`支付${this.totalPrice}元`);
            },
            beforeDrop(el){
                let count = this.balls.length;
                while(count--){
                    let ball = this.balls[count];
                    if(ball.show){
                        let rect = ball.el.getBoundingClientRect();
                        // let x = rect.left - 32;
                        let x = rect.left - 16;
                        // let y = -(window.innerHeight - rect.top);
                        let y = (window.innerHeight - rect.top) - 16;

                        el.style.display = '';
                        // el.style['-webkit-transform'] = el.style['transform'] = `translate3d(0, ${y}px, 0)`;
                        el.style.left = `${x}px`;
                        el.style.bottom = `${y}px`;

                        let inner = el.getElementsByClassName('inner-hook')[0];
                        inner.style['-webkit-transform'] = inner.style['transform'] = `translate3d(${x}px, 0, 0)`;
                    }
                }
            },
            dropping(el, done){
                /* eslint-disable no-unused-vars */
                let rf = el.offsetHeight;
                this.$nextTick(() => {
                    // el.style['-webkit-transform'] = el.style['transform'] = 'translate3d(0, 0, 0)';

                    el.style.left = '32px';
                    el.style.bottom = '22px';

                    let inner = el.getElementsByClassName('inner-hook')[0];
                    inner.style['-webkit-transform'] = inner.style['transform'] = 'translate3d(0, 0, 0)';
                    el.addEventListener('transitionend', done);
                });
            },
            afterDrop(el){
                let ball = this.droppedBalls.shift();
                if(ball){
                    ball.show = false;
                    el.style.display = 'none';
                }
            },
        },
        components: {
            cartcontrol
        },
    }
</script>

<style>
    /*购物车.............................................................*/
    #cart{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        z-index: 50;
        height: 48px;
    }

    #cart .content{
        display: flex;
        height: 100%;
        background-color: #141d27;
        color: #80858a;
    }

    #cart .content .content-left{
        flex: 1;
        font-size: 0;
    }

    #cart .content .content-left .logo-wrapper,
    #cart .content .content-left .price,
    #cart .content .content-left .desc{
        display: inline-block;
        vertical-align: top;
    }

    #cart .content .content-left .logo-wrapper{
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        text-align: center;
        line-height: 56px;
        border-radius: 50%;
        box-sizing: border-box;
        background-color: #141d27;
    }

    #cart .content .content-left .logo-wrapper .logo{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #2b343c;
    }

    #cart .content .content-left .logo-wrapper .logo.highlight{
        background-color: rgb(0, 160, 220);
    }

    #cart .content .content-left .logo-wrapper .logo .iconfont{
        font-size: 24px;
        line-height: 44px;
    }

    #cart .content .content-left .logo-wrapper .logo.highlight .iconfont{
        color: #fff;
    }

    #cart .content .content-left .logo-wrapper .num{
        position: absolute;
        right: 0;
        top: 0;
        min-width: 24px;
        height: 16px;
        border-radius: 16px;
        line-height: 16px;
        text-align: center;
        font-size: 9px;
        font-weight: 700;
        color: #fff;
        background-color: rgb(240, 20, 20);
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4);
    }

    #cart .content .content-left .price{
        font-size: 16px;
        line-height: 24px;
        font-weight: 700;
        margin-top: 12px;
        padding-right: 12px;
        border-right: 1px solid rgba(255, 255, 255, .4);
        box-sizing: border-box;
    }

    #cart .content .content-left .price.highlight{
        color: #fff;
    }

    #cart .content .content-left .desc{
        line-height: 24px;
        margin: 12px 0 0 12px;
        font-size: 10px;
    }

    #cart .content .content-right{
        flex: 0 0 105px;
        width: 105px;
        text-align: center;
        line-height: 48px;
        font-size: 12px;
        font-weight: 700;
    }

    #cart .content .content-right.not-enough{
        background-color: #2b333b;
    }

    #cart .content .content-right.enough{
        background-color: #00b43c;
        color: #fff;
    }

    /*小球*/
    /*#cart .ball-container .ball-item{
        position: fixed;
        left: 32px;
        bottom: 22px;
        z-index: 200;
    }*/

    #cart .ball-container .ball-item .ball{
        position: fixed;
        left: 32px;
        bottom: 22px;
        z-index: 200;
    }

    #cart .ball-container .ball-item .ball .inner{
        display: inline-block;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: rgb(0, 160, 220);
    }

    /*购物车列表*/
    #cart .cart-list{
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
        width: 100%;
        max-height: 251px;
        background-color: #fff;
        transform: translate3d(0, -100%, 0);
    }

    #cart .cart-list .list-header{
        width: 100%;
        padding: 0 18px;
        line-height: 40px;
        background-color: #f3f5f7;
        border-bottom: 1px solid rgba(7, 17, 27, .1);
        box-sizing: border-box;
    }

    #cart .cart-list .list-header .title{
        float: left;
        font-size: 14px;
        color: rgb(7, 17, 27);
    }

    #cart .cart-list .list-header .empty{
        float: right;
        font-size: 12px;
        color: rgb(0, 160, 220);
    }

    #cart .cart-list .list-content{
        max-height: 210px;
        padding: 0 18px;
        box-sizing: border-box;
        overflow: hidden;
    }

    #cart .cart-list .list-content .food{
        position: relative;
        padding: 12px 0;
        box-sizing: border-box;
    }

    #cart .cart-list .list-content .food.border-1px::before,
    #cart .cart-list .list-content .food.border-1px:last-child::after{
        display: none;
    }

    #cart .cart-list .list-content .food .name{
        font-size: 14px;
        line-height: 24px;
        color: rgb(7, 17, 27);
    }

    #cart .cart-list .list-content .food .price{
        position: absolute;
        right: 90px;
        bottom: 12px;
        line-height: 24px;
        font-size: 14px;
        color: rgb(240, 20, 20);
        font-weight: 700;
    }

    #cart .cart-list .list-content .food .cartcontrol-wrapper{
        position: absolute;
        right: 0;
        bottom: 6px;
    }

    /*遮罩*/
    #list-mark{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 40;
        background-color: rgba(7, 17, 27, .8);
        backdrop-filter: blur(10px);
    }
</style>
