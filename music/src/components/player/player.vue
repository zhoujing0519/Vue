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
                        <div class="cd-wrapper">
                            <div class="cd">
                                <img :src="currentSong.image" class="image">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="operators">
                        <div class="icon i-left">
                            <i class="icon-sequence"></i>
                        </div>
                        <div class="icon i-left">
                            <i class="icon-prev"></i>
                        </div>
                        <div class="icon i-center">
                            <i class="icon-play"></i>
                        </div>
                        <div class="icon i-right">
                            <i class="icon-next"></i>
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
                    <img :src="currentSong.image" width="40" height="40">
                </div>
                <div class="text">
                    <h2 class="name" v-html="currentSong.name"></h2>
                    <p class="desc" v-html="currentSong.singer"></p>
                </div>
                <div class="control">

                </div>
                <div class="control">
                    <i class="icon-playlist"></i>
                </div>
            </div>
        </transition>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters, mapMutations} from 'vuex'

    export default {
        computed: {
            ...mapGetters([
                'fullscreen',
                'playlist',
                'currentSong',
            ])
        },
        methods: {
            back(){
                this.setFullScreen(false);
            },
            open(){
                this.setFullScreen(true);
            },
            enter(el, done){

            },
            afterEnter(){},
            leave(el, done){},
            afterLeave(){},
            ...mapMutations({
                setFullScreen: 'SET_FULL_SCREEN'
            })
        },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "./player"
</style>
