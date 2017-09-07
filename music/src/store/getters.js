// 根据state的不同值，进行映射

export const singer = state => state.singer
export const playing = state => state.playing
export const fullscreen = state => state.fullscreen
export const playlist = state => state.playlist
export const sequenceList = state => state.sequenceList
export const mode = state => state.mode
export const currentIndex = state => state.currentIndex
export const currentSong = (state) => {
    return state.playlist[state.currentIndex] || {}
}
