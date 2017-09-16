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
                    <btn size="large" @select="showConfirm">为TA投票</btn>
                    <btn size="large" type="stroke" @select="back">返回</btn>
                </div>
                <confirm @cancel="cancelVote" title="投票成功" ref="confirm"></confirm>
            </div>
        </scroll>
    </transition>
</template>

<script type="text/ecmascript-6">
    import Btn from 'base/btn/btn'
    import Confirm from 'base/confirm/confirm'
    import Scroll from 'base/scroll/scroll'

    import {mapGetters} from 'vuex'

    const padding = 15

    export default {
        data(){
            return {
                scrollData: [],
            }
        },
        created(){
            this.scrollData.push(this.work)
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
            showConfirm(){
                console.log(this.work)
                this.$refs.confirm.show();
            },
            cancelVote(){

            },
        },
        components: {
            Btn,
            Confirm,
            Scroll,
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import './vote-detail'
</style>
