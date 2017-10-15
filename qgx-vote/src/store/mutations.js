import * as types from './mutation-types'

const mutations = {
    [types.SET_WORK](state, work){ // 设置作品对象
        state.work = work;
    },
    [types.SET_WORKS](state, works){ // 设置作品数组
        state.works = works;
    },
    [types.SET_RANKS](state, ranks){ // 设置作品排行数组
        state.ranks = ranks;
    },
    [types.SET_VOTE_COUNT](state, votedCount){ // 设置投票次数
        state.votedCount = votedCount;
    },
    [types.SET_VOTE_TIP](state, voteTip){ // 设置投票提示文字
        state.voteTip = voteTip;
    },
}

export default mutations
