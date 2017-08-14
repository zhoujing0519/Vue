<template>
    <div id="cartcontrol">
        <transition name="move">
            <div class="cart-decrease iconfont icon-jian-yuankuang" v-show="food.count > 0" @click.stop.prevent="decreaseGoods($event)"></div>
        </transition>
        <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
        <div class="cart-increase iconfont icon-jia-yuankuang" @click.stop.prevent="addGoods($event)"></div>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default {
        props: {
            food: {
                type: Object,
            },
        },
        created(){
            // console.log(this.food);
            // this.$on('add', );
        },
        methods: {
            addGoods(event){
                if(!event._constructed){
                    return;
                }

                if(!this.food.count){
                    // this.food.count = 1; 无效
                    Vue.set(this.food, 'count', 1);
                }else{
                    this.food.count++;
                }

                // 注册事件
                this.$emit('add', event.target);
            },
            decreaseGoods(event){
                if(!event._constructed){
                    return;
                }

                if(this.food.count){
                    this.food.count--;
                }
            }
        },
    }
</script>

<style scoped>
    #cartcontrol{
        font-size: 0;
    }

    #cartcontrol .cart-decrease,
    #cartcontrol .cart-count,
    #cartcontrol .cart-increase{
        display: inline-block;
    }

    #cartcontrol .cart-decrease,
    #cartcontrol .cart-increase{
        font-size: 24px;
        line-height: 1;
        padding: 6px;
        color: rgb(0, 160, 200);
        cursor: pointer;
    }

    #cartcontrol .cart-count{
        vertical-align: top;
        padding-top: 6px;
        line-height: 24px;
        text-align: center;
        font-size: 10px;
        color: rgb(147, 153, 159);
    }
</style>
