<template>
    <div class="player" v-show="playlist.length">
        <transition name="normal"
            @enter="enter"
            @after-enter="afterEnter"
            @leave="leave"
            @after-leave="afterLeave">
            <div class="normal-player" v-show="fullscreen">
                <div class="background">
                    <img :src="currentSong.image" width="100%" height="100%">
                </div>
                <div class="top">
                    <div class="back" @click="back">
                        <i class="icon-back"></i>
                    </div>
                    <h2 class="title" v-html="currentSong.name"></h2>
                    <h3 class="subtitle" v-html="currentSong.singer"></h3>
                </div>
                <div class="middle">
                    <div class="middle-l">
                        <div class="cd-wrapper" ref="cdWrapper">
                            <div class="cd" :class="cdCls">
                                <img :src="currentSong.image" class="image">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="progress-wrapper">
                        <span class="time time-l"></span>
                        <div class="progress-bar-wrapper">

                        </div>
                        <span class="time time-r"></span>
                    </div>
                    <div class="operators">
                        <div class="icon i-left">
                            <i class="icon-sequence"></i>
                        </div>
                        <div class="icon i-left" :class="disableCls">
                            <i class="icon-prev" @click="prev"></i>
                        </div>
                        <div class="icon i-center" :class="disableCls">
                            <i :class="playIcon" @click="togglePlaying"></i>
                        </div>
                        <div class="icon i-right" :class="disableCls">
                            <i class="icon-next" @click="next"></i>
                        </div>
                        <div class="icon i-right">
                            <i class="icon icon-not-favorite"></i>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="mini">
            <div class="mini-player" v-show="!fullscreen" @click="open">
                <div class="icon">
                    <img :src="currentSong.image" :class="cdCls" width="40" height="40">
                </div>
                <div class="text">
                    <h2 class="name" v-html="currentSong.name"></h2>
                    <p class="desc" v-html="currentSong.singer"></p>
                </div>
                <div class="control">
                    <i :class="playIconMini" @click.stop="togglePlaying"></i>
                </div>
                <div class="control">
                    <i class="icon-playlist"></i>
                </div>
            </div>
        </transition>
        <audio :src="currentSong.url" ref="audio" @canplay="ready" @error="error" @timeupdate="updateTime"></audio>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters, mapMutations} from 'vuex'
    import animations from 'create-keyframe-animation'
    import {prefixStyle} from 'common/js/dom'

    const transform = prefixStyle('transform');

    export default {
        data(){
            return {
                songReady: false,
                currentTime: 0,
            }
        },
        computed: {
            playIcon(){
                return this.playing ? 'icon-pause' : 'icon-play';
            },
            playIconMini(){
                return this.playing ? 'icon-pause-mini' : 'icon-play-mini';
            },
            cdCls(){
                return this.playing ? 'play' : 'play pause';
            },
            disableCls(){
                return this.songReady ? '' : 'disabled';
            },
            ...mapGetters([
                'fullscreen',
                'playlist',
                'currentSong',
                'playing',
                'currentIndex',
            ])
        },
        methods: {
            // 关闭播放器全屏模式
            back(){
                this.setFullScreen(false);
            },

            // 设置播放器全屏模式
            open(){
                this.setFullScreen(true);
            },

            // 动画钩子
            enter(el, done){
                const {x, y, scale} = this._getPosAndScale();
                let animation = {
                    0: {
                        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
                    },
                    60: {
                        transform: 'translate3d(0, 0, 0) scale(1.1)'
                    },
                    100: {
                        transform: 'translate3d(0, 0, 0) scale(1)'
                    }
                };

                animations.registerAnimation({
                    name: 'move',
                    animation,
                    presets: {
                        duration: 400,
                        easing: 'linear',
                    },
                });
                animations.runAnimation(this.$refs.cdWrapper, 'move', done);
            },
            afterEnter(){
                animations.unregisterAnimation('move');
                this.$refs.cdWrapper.style.animation = '';
            },
            leave(el, done){
                const {x, y, scale} = this._getPosAndScale();
                this.$refs.cdWrapper.style.transition = '.4s';
                this.$refs.cdWrapper.style[transform] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
                this.$refs.cdWrapper.addEventListener('transitionend', done);
            },
            afterLeave(){
                this.$refs.cdWrapper.style.transition = '';
                this.$refs.cdWrapper.style[transform] = '';
            },
            _getPosAndScale(){
                const targetWidth = 40;
                const paddingLeft = 40;
                const paddingBottom = 30;
                const paddingTop = 80;
                const width = window.innerWidth * 0.8;
                const scale = targetWidth / width;
                const x = -(window.innerWidth / 2 - paddingLeft);
                const y = window.innerHeight - paddingTop - (width / 2) - paddingBottom;
                return {x, y, scale};
            },
            togglePlaying(){ // 音乐开关
                this.setPlayingState(!this.playing);
            },
            next(){ // 下一首
                if(!this.songReady) return;
                let index = this.currentIndex + 1;
                if(index === this.playlist.length) index = 0;
                this.setCurrentIndex(index);
                if(!this.playing) this.togglePlaying();
                this.songReady = false;
            },
            prev(){ // 上一首
                if(!this.songReady) return;
                let index = this.currentIndex - 1;
                if(index === -1) index = this.playlist.length - 1;
                this.setCurrentIndex(index);
                if(!this.playing) this.togglePlaying();
                this.songReady = false;
            },
            ready(){ // 音频加载
                this.songReady = true;
            },
            error(){ // 音频加载失败
                this.songReady = true;
            },
            updateTime(e){
                this.currentTime = e.target.currentTime;
            },
            ...mapMutations({
                setFullScreen: 'SET_FULL_SCREEN',
                setPlayingState: 'SET_PLAYING_STATE',
                setCurrentIndex: 'SET_CURRENT_INDEX',
            })
        },
        watch: {
            currentSong(){
                this.$nextTick(() => {
                    this.$refs.audio.play();
                });
            },
            playing(newVal){
                const audio = this.$refs.audio;
                this.$nextTick(() => {
                    newVal ? audio.play() : audio.pause();
                });
            },
        },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "./player"
</style>
