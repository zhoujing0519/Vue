<template>
    <div class="search">
        <div class="search-box-wrapper">
            <search-box @query="onQueryChange" ref="searchBox"></search-box>
        </div>
        <div class="shortcut-wrapper" v-show="!query">
            <div class="shortcut">
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
                        <span class="clear" @click="clearSearchHistory">
                            <i class="icon-clear"></i>
                        </span>
                    </h2>
                    <search-list
                        :searches="searchHistory"
                        @select="addQuery"
                        @delete="deleteSearchHistory"></search-list>
                </div>
            </div>
        </div>
        <div class="search-result" v-show="query" ref="searchResult">
            <suggest :query="query" @listScroll="blurInput" @select="saveSearch" ref="suggest"></suggest>
        </div>
        <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
    import SearchBox from 'base/search-box/search-box'
    import Suggest from 'components/suggest/suggest'
    import SearchList from 'base/search-list/search-list'

    import {getHotKey} from 'api/search'
    import {ERR_OK} from 'api/config'
    import {mapActions, mapGetters} from 'vuex'
    import {playlistMixin} from 'common/js/mixin'

    export default {
        mixins: [playlistMixin],
        data(){
            return {
                hotKey: [],
                query: '',
            }
        },
        created(){
            this._getHotKey();
        },
        methods: {
            handlePlaylist(playlist){
                const bottom = playlist.length > 0 ? '60px' : '';
                this.$refs.searchResult.style.bottom = bottom;
                this.$refs.suggest.refresh();
            },
            onQueryChange(query){
                this.query = query
            },
            addQuery(query){
                this.$refs.searchBox.setQuery(query)
            },
            blurInput(){
                this.$refs.searchBox.blur()
            },
            saveSearch(){
                this.saveSearchHistory(this.query)
            },
            _getHotKey(){
                getHotKey().then((res) => {
                    if(res.code === ERR_OK){
                        this.hotKey = res.data.hotkey.slice(0, 10);
                    }
                })
            },
            ...mapActions([
                'saveSearchHistory',
                'deleteSearchHistory',
                'clearSearchHistory',
            ]),
        },
        computed: {
            ...mapGetters([
                'searchHistory',
            ]),
        },
        components: {
            SearchBox,
            Suggest,
            SearchList,
        },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import './search'
</style>
