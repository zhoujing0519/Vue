<template>
    <scroll class="suggest" :data="result" :pullup="pullup" @scrollToEnd="searchMore" ref="suggest">
        <ul class="suggest-list">
            <li class="suggest-item" v-for="item in result" @click="selectItem(item)">
                <div class="icon">
                    <i :class="getIconCls(item)"></i>
                </div>
                <div class="name">
                    <p class="text" v-html="getDisplayName(item)"></p>
                </div>
            </li>
            <loading v-show="hasMore"></loading>
        </ul>
        <div class="no-result-wrapper" v-show="!result.length">

        </div>
    </scroll>
</template>

<script type="text/ecmascript-6">
    import Scroll from 'base/scroll/scroll'
    import Loading from 'base/loading/loading'

    import {search} from 'api/search'
    import {ERR_OK} from 'api/config'
    import {createSong} from 'common/js/song'
    import {mapMutations, mapActions} from 'vuex'

    import Singer from 'common/js/singer'

    const TYPE_SINGER = 'singer'
    const PERPAGE = 20

    export default {
        props: {
            query: {
                type: String,
                default: ''
            },
            showSinger: {
                type: Boolean,
                default: true,
            },
        },
        data(){
            return {
                page: 1,
                result: [],
                pullup: true,
                hasMore: true,
            }
        },
        methods: {
            search(){ // 请求服务端获取检索数据
                // 重置
                this.page = 1
                this.$refs.suggest.scrollTo(0, 0)
                this.hasMore = true

                search(this.query, this.page, this.showSinger, PERPAGE).then((res) => {
                    if(res.code === ERR_OK){
                        this.result = this._genResult(res.data)
                        this._checkMore(res.data)
                    }
                })
            },
            getIconCls(item){
                return item.type === TYPE_SINGER ? 'icon-mine' : 'icon-music'
            },
            getDisplayName(item){
                return item.type === TYPE_SINGER ? item.singername : `${item.name}-${item.singer}`
            },
            searchMore(){
                if(!this.hasMore) return
                this.page++
                search(this.query, this.page, this.showSinger, PERPAGE).then((res) => {
                    if(res.code === ERR_OK){
                        this.result = this.result.concat(this._genResult(res.data))
                        this._checkMore(res.data)
                    }
                })
            },
            selectItem(item){
                if(item.type === TYPE_SINGER){ // 点击歌手
                    const singer = new Singer({
                        id: item.singermid,
                        name: item.singername
                    })
                    this.$router.push({
                        path: `/search/${singer.id}`
                    })
                    this.setSinger(singer)
                }else{ // 点击歌曲
                    this.insertSong(item)
                }
            },
            _checkMore(data){
                const song = data.song
                if(!song.list.length || (song.curnum + song.curpage * PERPAGE) > song.totalnum){
                    this.hasMore = false
                }
            },
            _genResult(data){
                let ret = []
                if(data.zhida && data.zhida.singerid){ // 当数据存在直达，优先将直达数据push进来
                    ret.push({...data.zhida, ...{type: TYPE_SINGER}})
                }
                if(data.song) ret = ret.concat(this._normalizeSongs(data.song.list))
                return ret
            },
            _normalizeSongs(list){
                let ret = []
                list.forEach((musicData) => {
                    if(musicData.songid && musicData.albummid){
                        ret.push(createSong(musicData))
                    }
                })
                return ret
            },
            ...mapMutations({
                setSinger: 'SET_SINGER'
            }),
            ...mapActions([
                'insertSong'
            ]),
        },
        watch: {
            query(newQuery){
                this.search()
            },
        },
        components: {
            Scroll,
            Loading,
        },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "./suggest"
</style>
