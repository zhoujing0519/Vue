import {playMode} from 'common/js/config'

const state = {
    singer: {},
    disc: {},
    topList: {},
    playing: false,
    fullscreen: false,
    playlist: [],
    sequenceList: [],
    mode: playMode.sequence,
    currentIndex: -1,
}

export default state
