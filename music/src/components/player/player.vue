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
                <div class="middle"
                    @touchstart.prevent="middleTouchStart"
                    @touchmove.prevent="middleTouchMove"
                    @touchend="middleTouchEnd">
                    <div class="middle-l" ref="middleL">
                        <div class="cd-wrapper" ref="cdWrapper">
                            <div class="cd" :class="cdCls">
                                <img :src="currentSong.image" class="image">
                            </div>
                        </div>
                        <div class="playing-lyric-wrapper">
                            <div class="playing-lyric">{{playingLyric}}</div>
                        </div>
                    </div>
                    <scroll class="middle-r" ref="lyricList" :data="currentLyric && currentLyric.lines">
                        <div class="lyric-wrapper">
                            <div v-if="currentLyric">
                                <p ref="lyricLine" class="text" :class="{'current': currentLineNum === index}" v-for="(line, index) in currentLyric.lines">{{line.txt}}</p>
                            </div>
                        </div>
                    </scroll>
                </div>
                <div class="bottom">
                    <div class="dot-wrapper">
                        <span class="dot" :class="{'active': currentShow === 'cd'}"></span>
                        <span class="dot" :class="{'active': currentShow === 'lyric'}"></span>
                    </div>
                    <div class="progress-wrapper">
                        <span class="time time-l">{{format(currentTime)}}</span>
                        <div class="progress-bar-wrapper">
                            <progress-bar :percent="percent" @percentChange="onProgressBarChange"></progress-bar>
                        </div>
                        <span class="time time-r">{{format(currentSong.duration)}}</span>
                    </div>
                    <div class="operators">
                        <div class="icon i-left">
                            <i :class="iconMode" @click="changeMode"></i>
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
                            <i class="icon" :class="getFavoriteIcon(currentSong)" @click="toggleFavorite(currentSong)"></i>
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
                    <progress-circle :radius="radius" :percent="percent">
                        <i class="icon-mini" :class="playIconMini" @click.stop="togglePlaying"></i>
                    </progress-circle>
                </div>
                <div class="control" @click.stop="showPlaylist">
                    <i class="icon-playlist"></i>
                </div>
            </div>
        </transition>
        <playlist ref="playlist"></playlist>
        <audio :src="currentSong.url" ref="audio" @play="ready" @error="error" @timeupdate="updateTime" @ended="end"></audio>
    </div>
</template>

<script type="text/ecmascript-6">
    // Packages
    import animations from 'create-keyframe-animation'
    import Lyric from 'lyric-parser'

    // Methods
    import {mapGetters, mapMutations, mapActions} from 'vuex'
    import {prefixStyle} from 'common/js/dom'
    import {shuffle} from 'common/js/util'
    import {playMode} from 'common/js/config'
    import {playerMixin} from 'common/js/mixin'

    // Components
    import ProgressBar from 'base/progress-bar/progress-bar'
    import ProgressCircle from 'base/progress-circle/progress-circle'
    import Scroll from 'base/scroll/scroll'
    import Playlist from 'components/playlist/playlist'

    const transform = prefixStyle('transform');
    const transitionDuration = prefixStyle('transitionDuration');
    const animation = prefixStyle('animation');
    const transition = prefixStyle('transition');
    const progressCircleRadius = 32;

    export default {
        mixins: [playerMixin],
        data(){
            return {
                songReady: false,
                currentTime: 0,
                radius: 32,
                currentLyric: null,
                currentLineNum: 0,
                currentShow: 'cd',
                playingLyric: '',
            }
        },
        created(){
            this.touch = {}; // 不需要定义getter&&setter，所以不在data定义
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
            percent(){
                return this.currentTime / this.currentSong.duration;
            },
            ...mapGetters([
                'fullscreen',
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
                        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                        'webkitTransform': `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                    },
                    60: {
                        transform: 'translate3d(0, 0, 0) scale(1.1)',
                        'webkitTransform': 'translate3d(0, 0, 0) scale(1.1)',
                    },
                    100: {
                        transform: 'translate3d(0, 0, 0) scale(1)',
                        'webkitTransform': 'translate3d(0, 0, 0) scale(1)',
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
                this.$refs.cdWrapper.style[animation] = '';
            },
            leave(el, done){
                const {x, y, scale} = this._getPosAndScale();
                this.$refs.cdWrapper.style[transition] = '.4s';
                this.$refs.cdWrapper.style[transform] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
                this.$refs.cdWrapper.addEventListener('transitionend', done);
            },
            afterLeave(){
                this.$refs.cdWrapper.style[transition] = '';
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
            changeMode(){ // 切换模式
                const mode = (this.mode + 1) % 3;
                this.setPlayMode(mode);
                let list = null;
                if(mode === playMode.random){
                    list = shuffle(this.sequenceList);
                }else{
                    list = this.sequenceList;
                }
                this.resetCurrentIndex(list);
                this.setPlayList(list);
            },
            resetCurrentIndex(list){
                let index = list.findIndex((item) => {
                    return item.id === this.currentSong.id;
                });
                this.setCurrentIndex(index);
            },
            togglePlaying(){ // 音乐开关
                if(!this.songReady) return;
                this.setPlayingState(!this.playing);
                if(this.currentLyric) this.currentLyric.togglePlay();
            },
            end(){
                if(this.mode === playMode.loop){
                    this.loop();
                }else{
                    this.next();
                }
            },
            loop(){
                this.$refs.audio.currentTime = 0;
                this.$refs.audio.play();
                if(!this.playing) this.togglePlaying();
                if(this.currentLyric) this.currentLyric.seek(0);
            },
            next(){ // 下一首
                if(!this.songReady) return;
                if(this.playlist.length === 1){
                    this.loop();
                    return
                }else{
                    let index = this.currentIndex + 1;
                    if(index === this.playlist.length) index = 0;
                    this.setCurrentIndex(index);
                    if(!this.playing) this.togglePlaying();
                }
                this.songReady = false;
            },
            prev(){ // 上一首
                if(!this.songReady) return;
                if(this.playlist.length === 1){
                    this.loop();
                    return
                }else{
                    let index = this.currentIndex - 1;
                    if(index === -1) index = this.playlist.length - 1;
                    this.setCurrentIndex(index);
                    if(!this.playing) this.togglePlaying();
                }
                this.songReady = false;
            },
            ready(){ // 音频加载
                this.songReady = true;
                this.savePlayHistory(this.currentSong);
            },
            error(){ // 音频加载失败
                this.songReady = true;
            },
            updateTime(e){ // 更新音频时间
                this.currentTime = e.target.currentTime;
            },
            format(interval){ // 格式化音频时间
                interval = interval | 0;
                const minute = interval / 60 | 0;
                const second = this._pad(interval % 60);
                return `${minute}:${second}`;
            },
            onProgressBarChange(percent){ // 播放器进度变化
                const currentTime = this.currentSong.duration * percent;
                this.$refs.audio.currentTime = currentTime;
                if(!this.playing) this.togglePlaying();
                if(this.currentLyric) this.currentLyric.seek(currentTime * 1000);
            },
            getLyric(){
                this.currentSong.getLyric().then((lyric) => {
                    if(this.currentSong.lyric !== lyric) return // 当当前歌词与获取到的歌词不一致时，返回
                    this.currentLyric = new Lyric(lyric, this.handleLyric);
                    if(this.playing) this.currentLyric.play();
                }).catch((err) => {
                    this.currentLyric = null;
                    this.playingLyric = '';
                    this.currentLineNum = 0;
                });
            },
            handleLyric({lineNum, txt}){
                this.currentLineNum = lineNum;
                if(lineNum > 5){
                    let lineElement = this.$refs.lyricLine[lineNum - 5];
                    this.$refs.lyricList.scrollToElement(lineElement, 1000);
                }else{
                    this.$refs.lyricList.scrollTo(0, 0, 1000);
                }
                this.playingLyric = txt;
            },
            middleTouchStart(e){
                this.touch.initiated = true;
                const touch = e.touches[0];
                this.touch.startX = touch.pageX;
                this.touch.startY = touch.pageY;
            },
            middleTouchMove(e){
                if(!this.touch.initiated) return;
                const touch = e.touches[0];
                const deltaX = touch.pageX - this.touch.startX;
                const deltaY = touch.pageY - this.touch.startY;

                // 如果在纵轴的滚动偏差大于横向滚动偏差，则视为scroll，不操作
                if(Math.abs(deltaY) > Math.abs(deltaX)) return;

                const left = this.currentShow === 'cd' ? 0 : - window.innerWidth;
                const offsetWidth = Math.min(0, Math.max(- window.innerWidth, left + deltaX));
                this.touch.percent = Math.abs(offsetWidth / window.innerWidth);

                this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`;
                this.$refs.lyricList.$el.style[transitionDuration] = 0;
                this.$refs.middleL.style.opacity = 1 - this.touch.percent;
                this.$refs.middleL.style[transitionDuration] = 0;
            },
            middleTouchEnd(){
                this.touch.initiated = false;
                if(!this.touch.percent) return;
                let offsetWidth;
                let opacity;
                if(this.currentShow === 'cd'){
                    if(this.touch.percent > 0.1){
                         offsetWidth = - window.innerWidth;
                         opacity = 0;
                    }else{
                        offsetWidth = 0;
                        opacity = 1;
                    }
                    this.currentShow = 'lyric';
                }else{
                    if(this.touch.percent < 0.9){
                         offsetWidth = 0;
                         opacity = 1;
                    }else{
                        offsetWidth = - window.innerWidth;
                        opacity = 0;
                    }
                    this.currentShow = 'cd';
                }

                const time = 300;
                this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`;
                this.$refs.lyricList.$el.style[transitionDuration] = `${time}ms`;
                this.$refs.middleL.style.opacity = opacity;
                this.$refs.middleL.style[transitionDuration] = `${time}ms`;
                this.touch.percent = null;
            },
            showPlaylist(){
                this.$refs.playlist.show()
            },
            _pad(num, n = 2){
                let len = num.toString().length;
                while(len < n){
                    num = '0' + num;
                    len++;
                }
                return num;
            },
            ...mapMutations({
                setFullScreen: 'SET_FULL_SCREEN',
            }),
            ...mapActions([
                'savePlayHistory',
            ]),
        },
        watch: {
            currentSong(newSong, oldSong){
                // 如果没有新歌，不做操作
                if(!newSong.id) return
                // 如果新歌与老歌为同一首，不做操作
                if(newSong.id === oldSong.id) return;
                // 如果歌曲发生变化，将上一首歌曲的歌词计时器停止
                if(this.currentLyric){
                     this.currentLyric.stop();
                     this.currentTime = 0
                     this.playingLyric = ''
                     this.currentLineNum = 0
                }

                // 延迟目的是为了手机从后台切回前台时，能够正常触发音频播放
                if(this.timer) clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    // 下一首歌曲播放
                    this.$refs.audio.play();
                    // 获取歌词
                    this.getLyric();
                }, 1000);
            },
            playing(newVal){
                const audio = this.$refs.audio;
                this.$nextTick(() => {
                    newVal ? audio.play() : audio.pause();
                });
            },
        },
        components: {
            ProgressBar,
            ProgressCircle,
            Scroll,
            Playlist,
        },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "./player"
</style>
