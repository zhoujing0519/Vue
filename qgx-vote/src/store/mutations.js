import * as types from './mutation-types'

const mutations = {
    [types.SET_WORK](state, work){ // 设置作品对象
        state.work = work;
    },
}

export default mutations
