import {mapMutations, mapGetters} from 'vuex'

export const voteMixin = {
    computed: {
        ...mapGetters([
            'votedCount',
            'maxCount',
            'voteTip',
            'works',
        ]),
    },
    methods: {
        showTip(item){
            if(item.voted === 1){ // 已经投过票了
                this.setVoteTip('这件作品，您已经投过票了哦~')
                this.$refs.topTip.show()
                return
            }

            if(this.votedCount === this.maxCount){ // 投了5次了
                this.setVoteTip('您已经投过5次票，不能再投了哦~')
                this.$refs.topTip.show()
                return
            }else{ // 次数不够 +1
                this.setVotedCount(this.votedCount + 1)
                this.setVoteTip('投票成功，谢谢您的参与！')
                this.$refs.topTip.show()
                item.ticket++
                item.voted = 1
            }
        },
        typeCls(item){
            return item.voted ? 'disabled' : 'fill'
        },
        ...mapMutations({
            setVotedCount: 'SET_VOTE_COUNT',
            setVoteTip: 'SET_VOTE_TIP',
            setWorks: 'SET_WORKS',
        }),
    },
}
