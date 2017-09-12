// 根据state的不同值，进行映射

// 数据
export const singer = state => state.singer
export const disc = state => state.disc
export const topList = state => state.topList

// 播放器
export const playing = state => state.playing
export const fullscreen = state => state.fullscreen
export const playlist = state => state.playlist
export const sequenceList = state => state.sequenceList
export const mode = state => state.mode
export const currentIndex = state => state.currentIndex
export const currentSong = (state) => {
    return state.playlist[state.currentIndex] || {}
}

// 搜索
export const searchHistory = state => state.searchHistory
export const playHistory = state => state.playHistory
