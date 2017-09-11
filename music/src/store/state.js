import {playMode} from 'common/js/config'
import {loadSearch} from 'common/js/cache'

const state = {
    singer: {}, // 歌手
    disc: {}, // 歌单
    topList: {}, // 排行榜

    playing: false, // 播放状态
    fullscreen: false, // 是否全屏
    playlist: [], // 播放列表
    sequenceList: [], // 顺序列表
    mode: playMode.sequence, // 播放模式，默认顺序播放
    currentIndex: -1, // 当前歌曲索引

    searchHistory: loadSearch(), // 搜索历史
}

export default state
