<template>
    <div class="search">
        <div class="search-box-wrapper">
            <search-box @query="onQueryChange" ref="searchBox"></search-box>
        </div>
        <div class="shortcut-wrapper" v-show="!query" ref="shortcutWrapper">
            <scroll class="shortcut" :data="shortcut" :refreshDelay="refreshDelay" ref="shortcut">
                <div>
                    <div class="hot-key">
                        <h2 class="title">热门搜索</h2>
                        <ul>
                            <li class="item" v-for="item in hotKey" @click="addQuery(item.k)">
                                <span>{{item.k}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="search-history" v-show="searchHistory.length">
                        <h2 class="title">
                            <span class="text">搜索历史</span>
                            <span class="clear" @click="showConfirm">
                                <i class="icon-clear"></i>
                            </span>
                        </h2>
                        <search-list
                            :searches="searchHistory"
                            @select="addQuery"
                            @delete="deleteSearchHistory"></search-list>
                    </div>
                </div>
            </scroll>
        </div>
        <div class="search-result" v-show="query" ref="searchResult">
            <suggest :query="query" @listScroll="blurInput" @select="saveSearch" ref="suggest"></suggest>
        </div>
        <confirm
            ref="confirm"
            text="是否清空所有搜索历史"
            confirmBtnText="清空"
            @confirm="clearSearchHistory"></confirm>
        <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
    import SearchBox from 'base/search-box/search-box'
    import Suggest from 'components/suggest/suggest'
    import SearchList from 'base/search-list/search-list'
    import Confirm from 'base/confirm/confirm'
    import Scroll from 'base/scroll/scroll'

    import {getHotKey} from 'api/search'
    import {ERR_OK} from 'api/config'
    import {mapActions, mapGetters} from 'vuex'
    import {playlistMixin, searchMixin} from 'common/js/mixin'

    export default {
        mixins: [playlistMixin, searchMixin],
        data(){
            return {
                hotKey: [],
            }
        },
        created(){
            this._getHotKey();
        },
        methods: {
            handlePlaylist(playlist){
                const bottom = playlist.length > 0 ? '60px' : '';
                this.$refs.searchResult.style.bottom = bottom;
                this.$refs.suggest.refresh(); // 通过suggest组件代理

                this.$refs.shortcutWrapper.style.bottom = bottom;
                this.$refs.shortcut.refresh();
            },
            showConfirm(){
                this.$refs.confirm.show();
            },
            _getHotKey(){
                getHotKey().then((res) => {
                    if(res.code === ERR_OK){
                        this.hotKey = res.data.hotkey.slice(0, 10);
                    }
                })
            },
            ...mapActions([
                'deleteSearchHistory',
                'clearSearchHistory',
            ]),
        },
        computed: {
            shortcut(){
                return this.hotKey.concat(this.searchHistory)
            },
        },
        watch: {
            query(newQuery){
                if(!newQuery){
                    setTimeout(() => {
                        this.$refs.shortcut.refresh()
                    }, 20)
                }
            },
        },
        components: {
            SearchBox,
            Suggest,
            SearchList,
            Confirm,
            Scroll,
        },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import './search'
</style>
