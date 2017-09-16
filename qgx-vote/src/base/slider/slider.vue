<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot></slot>
        </div>
        <div class="dots">
            <span class="dot" v-for="(item, index) in dots" :class="{active: currentPageIndex === index}"></span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll'
    import {addClass} from 'common/js/dom'

    export default {
        data(){
            return {
                dots: [],
                currentPageIndex: 0,
            }
        },
        props: {
            loop: {
                type: Boolean,
                default: true
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            interval: {
                type: Number,
                default: 4000
            },
        },
        mounted(){
            setTimeout(() => {
                this._setSliderWidth();
                this._initDots();
                this._initSlider();

                if(this.autoPlay){
                    this._play();
                }
            }, 20);

            window.addEventListener('resize', () => {
                if(!this.slider) return;

                this._setSliderWidth(true);
                this.slider.refresh();
            });
        },
        methods: {
            _setSliderWidth(isResize){ // 设置slider总宽度
                this.children = this.$refs.sliderGroup.children; // slot插入的子元素数组
                let width = 0; // 声明容器宽度
                let sliderWidth = this.$refs.slider.clientWidth; // 声明slider的宽度
                for(let i = 0, l = this.children.length; i < l; i++){ // 循环遍历子元素
                    let child = this.children[i]; // 获取子元素
                    addClass(child, 'slider-item'); // 给每个子元素添加'slider-item'类名
                    child.style.width = sliderWidth + 'px'; // 给每个子元素设置宽度
                    width += sliderWidth; // 增加容器宽度
                }

                if(this.loop && !isResize){ // 如果slider是loop模式并且屏幕尺寸变化时，增加容器宽度
                    width += 2 * sliderWidth;
                }

                this.$refs.sliderGroup.style.width = width + 'px'; // 设置容器的宽度
            },
            _initSlider(){ // 初始化slider
                this.slider = new BScroll(this.$refs.slider, { // 基于BSroll的slider
                    scrollX: true, // 允许横向滚动
                    scrollY: false, // 不允许纵向滚动
                    momentum: false, // 禁掉动量动画
                    snap: {
                        loop: this.loop,
                        threshold: 0.3,
                        speed: 400
                    },
                });

                // 当slider滑动结束时
                this.slider.on('scrollEnd', () => {
                    let pageIndex = this.slider.getCurrentPage().pageX; // 获取当前slider横向页面数
                    if(this.loop) pageIndex -= 1; // 如果是无缝轮播模式，索引-1
                    this.currentPageIndex = pageIndex; // 将该索引设置为当前索引

                    if(this.autoPlay){ // 如果slider是自动轮播
                        clearTimeout(this.timer); // 清空定时器
                        this._play(); // 并准备执行下一次切换
                    }
                });
            },
            _initDots(){ // 初始化控制点
                this.dots = new Array(this.children.length); // slot插入多少元素，则生成多大的一个数组
            },
            _play(){ // 执行轮播
                let pageIndex = this.currentPageIndex + 1; // 获取下一个slider元素的索引
                if(this.loop) pageIndex += 1; // 如果是无缝轮播模式，索引+1

                // 隔一段时间，让slider切换到下一页
                this.timer = setTimeout(() => {
                    this.slider.goToPage(pageIndex, 0, 400);
                }, this.interval);
            },
        },
        destroyed(){
            clearTimeout(this.timer);
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "./slider"
</style>
