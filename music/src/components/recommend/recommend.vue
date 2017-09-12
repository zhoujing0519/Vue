<template>
    <div class="recommend" ref="recommend">
        <scroll ref="scroll" :data="discList" class="recommend-content">
            <div>
                <div v-if="recommends.length" class="slider-wrapper">
                    <slider>
                        <div v-for="item in recommends">
                            <a :href="item.linkUrl">
                                <img class="needclick" :src="item.picUrl" @load="loadImage">
                            </a>
                        </div>
                    </slider>
                </div>
                <div class="recommend-list">
                    <h2 class="list-title">热门歌单推荐</h2>
                    <ul>
                        <li v-for="item in discList" class="item" @click="selectItem(item)">
                            <div class="icon">
                                <img v-lazy="item.imgurl" width="60" height="60">
                            </div>
                            <div class="text">
                                <h2 class="name" v-html="item.creator.name"></h2>
                                <p class="desc" v-html="item.dissname"></p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="loading-container" v-show="!discList.length">
                <loading></loading>
            </div>
        </scroll>
        <router-view></router-view>
    </div>
</template>

<script>
    import Slider from 'base/slider/slider'
    import Scroll from 'base/scroll/scroll'
    import Loading from 'base/loading/loading'

    import {getRecommend, getDiscList} from 'api/recommend'
    import {ERR_OK} from 'api/config'
    import {playlistMixin} from 'common/js/mixin'
    import {mapMutations} from 'vuex'

    export default {
        mixins: [playlistMixin],
        data(){
            return {
                recommends: [],
                discList: [],
            }
        },
        created(){
            this._getRecommend();
            this._getDiscList();
        },
        methods: {
            handlePlaylist(playlist){
                const bottom = playlist.length > 0 ? '60px' : '';
                this.$refs.recommend.style.bottom = bottom;
                this.$refs.scroll.refresh();
            },
            selectItem(item){
                this.$router.push({
                    path: `/recommend/${item.dissid}`
                });
                this.setDisc(item);
            },
            _getRecommend(){
                getRecommend().then((res) => {
                    if(res.code === ERR_OK){
                        this.recommends = res.data.slider;
                    }
                });
            },
            _getDiscList(){
                getDiscList().then((res) => {
                    if(res.code === ERR_OK){
                        this.discList = res.data.list;
                    }
                });
            },
            loadImage(){
                if(!this.checkLoaded){
                    this.checkLoaded = true;
                    this.$refs.scroll.refresh();
                }
            },
            ...mapMutations({
                setDisc: 'SET_DISC',
            })
        },
        components: {
            Slider,
            Scroll,
            Loading,
        },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "./recommend"
</style>
