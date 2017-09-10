<template>
    <div class="music-list">
        <div class="back" @click="back">
            <i class="icon-back"></i>
        </div>
        <h2 class="title" v-html="title"></h2>
        <div class="bg-image" :style="bgStyle" ref="bgImage">
            <div class="play-wrapper">
                <div class="play" v-show="songs.length > 0" ref="playBtn"  @click="randomPlayAll">
                    <i class="icon-play"></i>
                    <span class="text">随机播放全部</span>
                </div>
            </div>
            <div class="filter" ref="filter"></div>
        </div>
        <div class="bg-layer" ref="layer"></div>
        <scroll :data="songs" :probe-type="probeType" :listen-scroll="listenScroll" @scroll="scroll" class="list" ref="list">
            <div class="song-list-wrapper">
                <song-list @select="selectItem" :songs="songs"></song-list>
            </div>
            <div class="loading-container" v-show="!songs.length">
                <loading></loading>
            </div>
        </scroll>
    </div>
</template>

<script type="text/ecmascript-6">
    import Scroll from 'base/scroll/scroll'
    import SongList from 'base/song-list/song-list'
    import Loading from 'base/loading/loading'

    import {prefixStyle} from 'common/js/dom'
    import {mapActions} from 'vuex'
    import {playlistMixin} from 'common/js/mixin'

    const RESERVED_HEIGHT = 40;
    const transform = prefixStyle('transform');
    const backdrop = prefixStyle('backdrop-filter');

    export default {
        mixins: [playlistMixin],
        props: {
            bgImage: {
                type: String,
                default: ''
            },
            songs: {
                type: Array,
                default: []
            },
            title: {
                type: String,
                default: ''
            },
        },
        data(){
            return {
                scrollY: 0,
            }
        },
        created(){
            this.probeType = 3;
            this.listenScroll = true;
        },
        mounted(){
            this.imageHeight = this.$refs.bgImage.clientHeight;
            this.minTranslateY = - this.imageHeight + RESERVED_HEIGHT;
            this.$refs.list.$el.style.top = `${this.imageHeight}px`;
        },
        computed: {
            bgStyle(){
                return `background-image: url(${this.bgImage})`;
            },
        },
        methods: {
            scroll(pos){
                this.scrollY = pos.y;
            },
            back(){
                this.$router.back();
            },
            selectItem(item, index){
                this.selectPlay({
                    list: this.songs,
                    index,
                });
            },
            randomPlayAll(){
                this.randomPlay({
                    list: this.songs,
                });
            },
            handlePlaylist(playlist){
                const bottom = playlist.length > 0 ? '60px' : '';
                this.$refs.list.$el.style.bottom = bottom;
                this.$refs.list.refresh();
            },
            ...mapActions([
                'selectPlay',
                'randomPlay',
            ])
        },
        watch: {
            scrollY(newVal){
                let translateY = Math.max(this.minTranslateY, newVal);
                let zIndex = 0;
                let scale = 1;
                let blur = 0;
                const percent = Math.abs(newVal / this.imageHeight);

                this.$refs.layer.style[transform] = `translate3d(0, ${translateY}px, 0)`;

                if(newVal < this.minTranslateY){
                    zIndex = 10;
                    this.$refs.bgImage.style['padding-top'] = 0;
                    this.$refs.bgImage.style['height'] = `${RESERVED_HEIGHT}px`;
                    this.$refs.playBtn.style.display = 'none';
                }else{
                    zIndex = 0;
                    this.$refs.bgImage.style['padding-top'] = '70%';
                    this.$refs.bgImage.style['height'] = '0px';
                    this.$refs.playBtn.style.display = '';
                }

                if(newVal > 0){
                    scale = 1 + percent;
                    zIndex = 10;
                }else{
                    blur = Math.min(20 * percent, 20);
                }

                this.$refs.filter.style[backdrop] = `blur(${blur}px)`;
                this.$refs.bgImage.style['z-index'] = zIndex;
                this.$refs.bgImage.style[transform] = `scale(${scale})`;
            },
        },
        components: {
            Scroll,
            SongList,
            Loading,
        },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    @import "~common/stylus/mixin"
    @import "./music-list"
</style>
