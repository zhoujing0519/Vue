<template>
    <background title="排行榜">
        <div class="rank">
            <div class="rank-header">
                <span class="item item-rank">排名</span>
                <span class="item item-num">号码</span>
                <span class="item item-name">姓名</span>
                <span class="item item-ticket">票数</span>
            </div>
            <scroll class="rank-container" :data="rankList" ref="rankScroll">
                <ul class="rank-list">
                    <li class="rank-list-item" v-for="(item, index) in rankList" @click="selectItem(item)">
                        <span class="item item-rank" :class="rankCls(index)">{{rankIndex(index)}}</span>
                        <span class="item item-num">{{item.num}}</span>
                        <span class="item item-name">{{item.name}}</span>
                        <span class="item item-ticket">{{item.ticket}}</span>
                    </li>
                </ul>
            </scroll>
        </div>
        <router-view></router-view>
    </background>
</template>

<script type="text/ecmascript-6">
    import Background from 'base/background/background'
    import Scroll from 'base/scroll/scroll'

    import axios from 'axios'
    import {ERR_OK} from 'api/config'
    import {mapMutations} from 'vuex'

    export default {
        data(){
            return {
                rankList: [],
            }
        },
        created(){
            axios.get('/api/works').then(res => {
                if(res.data.errno === ERR_OK){
                    this.rankList = this._normalizeData(res.data.data)
                }
            })
            .catch(err => {
                alert('网络错误，无法获取数据！')
            })
        },
        mounted(){
            setTimeout(() => {
                this.$refs.rankScroll.refresh()
            }, 20)
        },
        methods: {
            rankCls(index){
                if(index <= 2){
                    return `icon icon${index}`
                }else{
                    return 'text'
                }
            },
            rankIndex(index){
                if(index > 2) return index + 1
            },
            selectItem(item){
                this.$router.push({
                    path: `/rank/${item.num}`
                })
                this.setWork(item)
            },
            _normalizeData(data){
                let ret = []
                ret = data.sort((a, b) => {
                    return a.ticket < b.ticket
                })
                return ret
            },
            ...mapMutations({
                setWork: 'SET_WORK',
            }),
        },
        components: {
            Background,
            Scroll,
        },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import './rank'
</style>
