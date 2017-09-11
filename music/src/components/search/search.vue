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
            </div>
        </div>
        <div class="search-result" v-show="query">
            <suggest :query="query"></suggest>
        </div>
        <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
    import SearchBox from 'base/search-box/search-box'
    import Suggest from 'components/suggest/suggest'

    import {getHotKey} from 'api/search'
    import {ERR_OK} from 'api/config'

    export default {
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
            onQueryChange(query){
                this.query = query
            },
            addQuery(query){
                this.$refs.searchBox.setQuery(query)
            },
            _getHotKey(){
                getHotKey().then((res) => {
                    if(res.code === ERR_OK){
                        this.hotKey = res.data.hotkey.slice(0, 10);
                    }
                })
            },
        },
        components: {
            SearchBox,
            Suggest,
        },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import './search'
</style>
