<template>
    <background title="排行榜">
        <div class="rank">
            <div class="rank-header">
                <span class="item item-rank">排名</span>
                <span class="item item-num">号码</span>
                <span class="item item-name">姓名</span>
                <span class="item item-ticket">票数</span>
            </div>
            <scroll class="rank-container" :data="rankList">
                <ul class="rank-list">
                    <li class="rank-list-item" v-for="(item, index) in rankList">
                        <span class="item item-rank" :class="rankCls(index)">{{rankIndex(index)}}</span>
                        <span class="item item-num">{{item.num}}</span>
                        <span class="item item-name">{{item.name}}</span>
                        <span class="item item-ticket">{{item.ticket}}</span>
                    </li>
                </ul>
            </scroll>
        </div>
    </background>
</template>

<script type="text/ecmascript-6">
    import Background from 'base/background/background'
    import Scroll from 'base/scroll/scroll'

    export default {
        data(){
            return {
                rankList: [
                    {
                        num: 7,
                        name: '聂风',
                        ticket: 1260
                    },
                    {
                        num: 11,
                        name: '步惊云',
                        ticket: 520
                    },{
                        num: 41,
                        name: '雄霸',
                        ticket: 2048
                    },{
                        num: 99,
                        name: '断浪',
                        ticket: 4399
                    },{
                        num: 52,
                        name: '楚楚',
                        ticket: 1024
                    },{
                        num: 7,
                        name: '聂风',
                        ticket: 1260
                    },
                    {
                        num: 11,
                        name: '步惊云',
                        ticket: 520
                    },{
                        num: 41,
                        name: '雄霸',
                        ticket: 2048
                    },{
                        num: 99,
                        name: '断浪',
                        ticket: 4399
                    },{
                        num: 52,
                        name: '楚楚',
                        ticket: 1024
                    },{
                        num: 7,
                        name: '聂风',
                        ticket: 1260
                    },
                    {
                        num: 11,
                        name: '步惊云',
                        ticket: 520
                    },{
                        num: 41,
                        name: '雄霸',
                        ticket: 2048
                    },{
                        num: 99,
                        name: '断浪',
                        ticket: 4399
                    },{
                        num: 52,
                        name: '楚楚',
                        ticket: 1024
                    },{
                        num: 7,
                        name: '聂风',
                        ticket: 1260
                    },
                    {
                        num: 11,
                        name: '步惊云',
                        ticket: 520
                    },{
                        num: 41,
                        name: '雄霸',
                        ticket: 2048
                    },{
                        num: 99,
                        name: '断浪',
                        ticket: 4399
                    },{
                        num: 52,
                        name: '楚楚',
                        ticket: 1024
                    },{
                        num: 7,
                        name: '聂风',
                        ticket: 1260
                    },
                    {
                        num: 11,
                        name: '步惊云',
                        ticket: 520
                    },{
                        num: 41,
                        name: '雄霸',
                        ticket: 2048
                    },{
                        num: 99,
                        name: '断浪',
                        ticket: 4399
                    },{
                        num: 52,
                        name: '楚楚',
                        ticket: 1024
                    },{
                        num: 7,
                        name: '聂风',
                        ticket: 1260
                    },
                    {
                        num: 11,
                        name: '步惊云',
                        ticket: 520
                    },{
                        num: 41,
                        name: '雄霸',
                        ticket: 2048
                    },{
                        num: 99,
                        name: '断浪',
                        ticket: 4399
                    },{
                        num: 52,
                        name: '楚楚',
                        ticket: 1024
                    },
                ],
            }
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
