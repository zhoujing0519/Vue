<template>
    <transition name="slide">
        <div class="add-song" v-show="showFlag" @click.stop>
            <div class="header">
                <h2 class="title">添加歌曲到列表</h2>
                <div class="close" @click="hide">
                    <i class="icon-close"></i>
                </div>
            </div>
            <div class="search-box-wrapper">
                <search-box placeholder="搜索歌曲" @query="onQueryChange" ref="searchBox"></search-box>
            </div>
            <div class="shortcut" v-show="!query">
                <switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></switches>
                <div class="list-wrapper">
                    <scroll :data="playHistory" v-if="currentIndex === 0" class="list-scroll" ref="songList">
                        <div class="list-inner">
                            <song-list :songs="playHistory" @select="selectSong"></song-list>
                        </div>
                    </scroll>
                    <scroll :data="searchHistory" v-if="currentIndex === 1" class="list-scroll" ref="searchList">
                        <div class="list-inner">
                            <search-list @delete="deleteSearchHistory" @select="addQuery" :searches="searchHistory"></search-list>
                        </div>
                    </scroll>
                </div>
            </div>
            <div class="search-result" v-show="query">
                <suggest :query="query" :showSinger="showSinger" @select="selectSuggest" @listScroll="blurInput"></suggest>
            </div>
            <top-tip ref="topTip">
                <div class="tip-title">
                    <i class="icon-ok"></i>
                    <span class="text">1首歌曲已经添加到播放队列</span>
                </div>
            </top-tip>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
    import SearchBox from 'base/search-box/search-box'
    import Switches from 'base/switches/switches'
    import Scroll from 'base/scroll/scroll'
    import SongList from 'base/song-list/song-list'
    import SearchList from 'base/search-list/search-list'
    import TopTip from 'base/top-tip/top-tip'
    import Suggest from 'components/suggest/suggest'

    import {searchMixin} from 'common/js/mixin'
    import {mapGetters, mapActions} from 'vuex'

    import Song from 'common/js/song'

    export default {
        mixins: [searchMixin],
        data(){
            return {
                showFlag: false,
                showSinger: false,
                currentIndex: 0,
                switches: [
                    {name: '最近播放'},
                    {name: '搜索历史'}
                ],
            }
        },
        computed: {
            ...mapGetters([
                'playHistory',
            ]),
        },
        methods: {
            show(){
                this.showFlag = true
                setTimeout(() => {
                    this.currentIndex === 0 ? this.$refs.songList.refresh() : this.$refs.searchList.refresh()
                }, 20)
            },
            hide(){
                this.showFlag = false
            },
            selectSuggest(){
                this.saveSearch()
                this.showTip()
            },
            switchItem(index){
                this.currentIndex = index
            },
            selectSong(song, index){
                if(index !== 0){
                    this.insertSong(new Song(song))
                    this.showTip()
                }
            },
            showTip(){
                this.$refs.topTip.show()
            },
            ...mapActions([
                'insertSong',
            ]),
        },
        components: {
            SearchBox,
            Suggest,
            Switches,
            Scroll,
            SongList,
            SearchList,
            TopTip,
        },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "./add-song"
</style>
