<template>
    <transition name="slide">
        <div class="user-center">
            <div class="back" @click="back">
                <i class="icon-back"></i>
            </div>
            <div class="switches-wrapper">
                <switches :currentIndex="currentIndex" :switches="switches" @switch="switchItem"></switches>
            </div>
            <div class="play-btn" ref="playBtn" @click="random">
                <i class="icon-play"></i>
                <span class="text">随机播放全部</span>
            </div>
            <div class="list-wrapper" ref="listWrapper">
                <scroll :data="favoriteList" v-if="currentIndex === 0" class="list-scroll" ref="favoriteList">
                    <div class="list-inner">
                        <song-list :songs="favoriteList" @select="selectSong"></song-list>
                    </div>
                </scroll>
                <scroll :data="playHistory" v-if="currentIndex === 1" class="list-scroll" ref="playList">
                    <div class="list-inner">
                        <song-list :songs="playHistory" @select="selectSong"></song-list>
                    </div>
                </scroll>
            </div>
            <div class="no-result-wrapper" v-show="noResult">
                <no-result :title="noResultDesc"></no-result>
            </div>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
    import Switches from 'base/switches/switches'
    import Scroll from 'base/scroll/scroll'
    import SongList from 'base/song-list/song-list'
    import NoResult from 'base/no-result/no-result'

    import Song from 'common/js/song'

    import {playlistMixin} from 'common/js/mixin'
    import {mapGetters, mapActions} from 'vuex'

    export default {
        mixins: [playlistMixin],
        data(){
            return {
                currentIndex: 0,
                switches: [
                    {name: '我喜欢的'},
                    {name: '最近听的'}
                ],
            }
        },
        computed: {
            noResult(){
                return this.currentIndex === 0 ? !this.favoriteList.length : !this.playHistory.length
            },
            noResultDesc(){
                return this.currentIndex === 0 ? '暂无收藏歌曲' : '你还没有听过歌曲'
            },
            ...mapGetters([
                'favoriteList',
                'playHistory',
            ]),
        },
        methods: {
            handlePlaylist(playlist){
                const bottom = playlist.length > 0 ? '60px' : ''
                this.$refs.listWrapper.style.bottom = bottom
                this.$refs.favoriteList && this.$refs.favoriteList.refresh()
                this.$refs.playList && this.$refs.playList.refresh()
            },
            back(){
                this.$router.back()
            },
            random(){
                let list = this.currentIndex === 0 ? this.favoriteList : this.playHistory
                if(list.length === 0) return
                list = list.map((song) => {
                    return new Song(song)
                })
                this.randomPlay({
                    list
                })
            },
            switchItem(index){
                this.currentIndex = index
            },
            selectSong(song){
                this.insertSong(new Song(song))
            },
            ...mapActions([
                'insertSong',
                'randomPlay',
            ]),
        },
        components: {
            Switches,
            Scroll,
            SongList,
            NoResult,
        },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "./user-center"
</style>
