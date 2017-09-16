<template>
    <div class="vote">
        <div class="searchbox-wrapper">
            <searchbox placeholder="请输入选手姓名或编号搜索"></searchbox>
        </div>
        <scroll class="vote-list-wrapper" :data="works">
            <ul class="vote-list">
                <li v-for="(item, index) in works" class="vote-item" @click="selectItem(item)">
                    <div class="number">{{item.num}}号</div>
                    <div class="poster-wrapper" :style="{'backgroundImage': backgroundImage(item.imgUrl)}">
                        <span class="name">{{item.name}}</span>
                    </div>
                    <div class="ticket-group">
                        <span>当前票数：</span>
                        <span>{{item.ticket}}票</span>
                    </div>
                    <div class="btn-wrapper">
                        <btn size="medium">为TA投票</btn>
                    </div>
                </li>
            </ul>
        </scroll>
        <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
    import Btn from 'base/btn/btn'
    import Searchbox from 'base/searchbox/searchbox'
    import Scroll from 'base/scroll/scroll'

    import axios from 'axios'
    import {ERR_OK} from 'api/config'
    import {mapMutations} from 'vuex'

    export default {
        data(){
            return {
                works: [],
            }
        },
        created(){
            axios.get('/api/works').then(res => {
                if(res.data.errno === ERR_OK){
                    this.works = this._normalizeData(res.data.data)
                }
            })
            .catch(err => {
                alert('网络错误，无法获取数据！');
            });
        },
        computed: {

        },
        methods: {
            selectItem(item){
                this.$router.push({
                    path: `/vote/${item.num}`
                })
                this.setWork(item)
            },
            _normalizeData(data){
                let ret = []
                ret = data.sort((a, b) => {
                    return a.num > b.num
                })
                return ret
            },
            backgroundImage(imgUrl){
                return `url(${imgUrl})`
            },
            ...mapMutations({
                setWork: 'SET_WORK',
            }),
        },
        components: {
            Btn,
            Searchbox,
            Scroll,
        },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import './vote'
</style>
