<template>
    <transition name="slide">
        <scroll class="vote-detail" :data="scrollData" ref="detailScroll">
            <div class="vote-detail-wrapper">
                <div class="poster" ref="poster">
                    <img :src="work.imgUrl">
                </div>
                <div class="content">
                    <span class="num">{{work.num}}</span>
                    <span class="name">{{work.name}}</span>
                    <span class="ticket-group">
                        <i class="icon icon-heart"></i>
                        <span class="ticket-count">{{work.ticket}}票</span>
                    </span>
                </div>
                <div class="btn-group">
                    <btn size="large" :type="typeCls(work)" @select="showTip(work)">为TA投票</btn>
                    <btn size="large" type="stroke" @select="back">返回</btn>
                </div>
            </div>
            <top-tip ref="topTip">
                <p class="tip-title">
                    <i class="iconfont icon-toupiao"></i>
                    {{voteTip}}
                </p>
            </top-tip>
        </scroll>
    </transition>
</template>

<script type="text/ecmascript-6">
    import Btn from 'base/btn/btn'
    import Confirm from 'base/confirm/confirm'
    import Scroll from 'base/scroll/scroll'
    import TopTip from 'base/top-tip/top-tip'

    import {mapGetters} from 'vuex'
    import {voteMixin} from 'common/js/mixin'

    const padding = 15

    export default {
        mixins: [voteMixin],
        data(){
            return {
                scrollData: [],
                voteStatus: 'fill',
            }
        },
        created(){
            this.scrollData.push(this.work)
            this.voteStatus = this.work.voted ? 'disabled' : 'fill'
        },
        mounted(){
            setTimeout(() => {
                this.$refs.poster.style.width = `${window.innerWidth - padding * 2}px`
                this.$refs.detailScroll.refresh()
            }, 100)
        },
        computed: {
            ...mapGetters([
                'work',
            ]),
        },
        methods: {
            back(){
                this.$router.back()
            },
        },
        components: {
            Scroll,
            Btn,
            TopTip,
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import './vote-detail'
</style>
