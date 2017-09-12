<template>
    <scroll class="listview"
            :data="data"
            ref="listview"
            :listenScroll="listenScroll"
            :probeType="probeType"
            @scroll="scroll">
        <ul>
            <li v-for="group in data" class="list-group" ref="listGroup">
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <li v-for="item in group.items" class="list-group-item" @click="selectItem(item)">
                        <img v-lazy="item.avatar" class="avatar">
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-shortcut">
            <ul>
                <li class="item"
                    :class="{'current': currentIndex === index}"
                    v-for="(item, index) in shortcutList"
                    @touchstart="onShortcutTouchStart($event, index)"
                    @touchmove.stop.prevent="onShortcutTouchMove">{{item}}</li>
            </ul>
        </div>
        <div class="list-fixed" v-show="fixedTitle" ref="fixedTitle">
            <h2 class="fixed-title">{{fixedTitle}}</h2>
        </div>
        <div class="loading-container" v-show="!data.length">
            <loading></loading>
        </div>
    </scroll>
</template>

<script type="text/ecmascript-6">
    import Scroll from 'base/scroll/scroll';
    import Loading from 'base/loading/loading';

    const ANCHOR_HEIGHT = 18;
    const TITLE_HEIGHT = 30;

    export default {
        props: {
            data: {
                type: Array,
                default: []
            },
        },
        data(){
            return {
                scrollY: -1,
                currentIndex: 0,
                diff: -1,
            }
        },
        created(){
            this.touch = {};
            this.listenScroll = true;
            this.probeType = 3;
            this.listHeight = [];
        },
        computed: {
            shortcutList(){
                return this.data.map((group) => {
                    return group.title.substr(0, 1);
                });
            },
            fixedTitle(){
                if(this.scrollY > 0) return '';
                return this.data[this.currentIndex] ? this.data[this.currentIndex].title : '';
            },
        },
        methods: {
            selectItem(item){
                this.$emit('select', item);
            },
            onShortcutTouchStart(e, index){
                let firstTouch = e.touches[0];
                this.touch.y1 = firstTouch.pageY;
                this.touch.anchorIndex = index;
                this._scrollTo(index);
            },
            onShortcutTouchMove(e){
                let firstTouch = e.touches[0];
                this.touch.y2 = firstTouch.pageY;
                let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0; // 向下取整
                let anchorIndex= parseInt(this.touch.anchorIndex) + delta;
                this._scrollTo(anchorIndex);
            },
            refresh(){
                this.$refs.listview.refresh();
            },
            scroll(pos){
                this.scrollY = pos.y;
            },
            _scrollTo(index){
                // if(!index && index !== 0) return;
                // if(index < 0){
                //     index = 0;
                // }else if(index > this.listHeight.length - 2){
                //     index = this.listHeight.length - 2;
                // }
                // this.scrollY = - this.listHeight[index];
                this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 400); // 400 => 缓动时长
            },
            _calculateHeight(){
                this.listHeight = [];
                const list = this.$refs.listGroup;
                let height = 0;
                this.listHeight.push(height);
                for(let i = 0, l = list.length; i < l; i++){
                    let item = list[i];
                    height += item.clientHeight;
                    this.listHeight.push(height);
                }
            },
        },
        watch: {
            data(){
                setTimeout(() => {
                    this._calculateHeight();
                }, 20);
            },
            scrollY(newY){
                const listHeight = this.listHeight;

                // 当滚动到顶部, newY > 0
                if(newY > 0){
                    this.currentIndex = 0;
                    return;
                }

                // 在中间部分滚动
                for(let i = 0, l = listHeight.length - 1; i < l; i++){
                    let height1 = listHeight[i];
                    let height2 = listHeight[i + 1];
                    if(-newY >= height1 && -newY < height2){
                        this.currentIndex = i;
                        this.diff = height2 + newY;
                        return;
                    }
                }

                // 当滚动到底部，且-newY大于最后一个元素的上限
                this.currentIndex = listHeight.length - 2;
            },
            diff(newVal){
                let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0;
                if(this.fixedTop === fixedTop) return;
                this.fixedTop = fixedTop;
                this.$refs.fixedTitle.style.transform = `translate3d(0, ${fixedTop}px, 0)`;
            },
        },
        components: {
            Scroll,
            Loading,
        },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "./listview"
</style>
