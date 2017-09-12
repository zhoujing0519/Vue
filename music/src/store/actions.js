// 对mutations的封装，一次执行多个mutation
import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
import {saveSearch, deleteSearch, clearSearch, savePlay} from 'common/js/cache'

function findIndex(list, song){
    return list.findIndex((item) => {
        return item.id === song.id;
    });
}

// 点击播放歌曲
export const selectPlay = function({commit, state}, {list, index}){
    commit(types.SET_SEQUENCE_LIST, list);
    if(state.mode === playMode.random){
        let randomList = shuffle(list);
        commit(types.SET_PLAYLIST, randomList);
        index = findIndex(randomList, list[index]);
    }else{
        commit(types.SET_PLAYLIST, list);
    }
    commit(types.SET_CURRENT_INDEX, index);
    commit(types.SET_FULL_SCREEN, true);
    commit(types.SET_PLAYING_STATE, true);
}

// 随机播放歌单
export const randomPlay = function({commit}, {list}){
    commit(types.SET_PLAY_MODE, playMode.random);
    commit(types.SET_SEQUENCE_LIST, list);
    let randomList = shuffle(list);
    commit(types.SET_PLAYLIST, randomList);
    commit(types.SET_CURRENT_INDEX, 0);
    commit(types.SET_FULL_SCREEN, true);
    commit(types.SET_PLAYING_STATE, true);
}

// 插入歌曲
export const insertSong = function({commit, state}, song){
    let playlist = state.playlist.slice()
    let sequenceList = state.sequenceList.slice()
    let currentIndex = state.currentIndex

    // Playlist....................................................................
        let currentSong = playlist[currentIndex] // 记录当前歌曲
        let fpIndex = findIndex(playlist, song) // 查找当前列表中是否有待插入的歌曲并返回其索引
        currentIndex++ // 因为是插入歌曲，索引+1
        playlist.splice(currentIndex, 0, song) // 插入这首歌到当前索引位置
        if(fpIndex > -1){ // 如果已经包含这首歌
            if(currentIndex > fpIndex){ // 如果当前插入的序号大于列表中的序号
                playlist.splice(fpIndex, 1)
                currentIndex--
            }else{
                playlist.splice(fpIndex + 1, 1)
            }
        }

    // SequenceList....................................................................
        let currentSIndex = findIndex(sequenceList, currentSong) + 1
        let fsIndex = findIndex(sequenceList, song)
        sequenceList.splice(currentSIndex, 0, song)
        if(fsIndex > -1){ // 如果已经包含这首歌
            if(currentSIndex > fsIndex){ // 如果当前插入的序号大于列表中的序号
                sequenceList.splice(fsIndex, 1)
            }else{
                sequenceList.splice(fsIndex + 1, 1)
            }
        }

        commit(types.SET_PLAYLIST, playlist)
        commit(types.SET_SEQUENCE_LIST, sequenceList)
        commit(types.SET_CURRENT_INDEX, currentIndex)
        commit(types.SET_FULL_SCREEN, true)
        commit(types.SET_PLAYING_STATE, true)
}

// 删除歌曲
export const deleteSong = function({commit, state}, song){
    let playlist = state.playlist.slice()
    let sequenceList = state.sequenceList.slice()
    let currentIndex = state.currentIndex

    // Playlist....................................................................
        let fpIndex = findIndex(playlist, song) // 查找当前列表中待删除的歌曲并返回其索引
        playlist.splice(fpIndex, 1) // 删除这首歌
        if(currentIndex > fpIndex || currentIndex === playlist.length){
            currentIndex--
        }

    // SequenceList....................................................................
        let fsIndex = findIndex(sequenceList, song)
        sequenceList.splice(fsIndex, 1)

        commit(types.SET_PLAYLIST, playlist)
        commit(types.SET_SEQUENCE_LIST, sequenceList)
        commit(types.SET_CURRENT_INDEX, currentIndex)

        const playingState = playlist.length > 0
        commit(types.SET_PLAYING_STATE, playingState)
}

// 清空歌曲列表
export const deleteSongList = function({commit}){
    commit(types.SET_PLAYLIST, [])
    commit(types.SET_SEQUENCE_LIST, [])
    commit(types.SET_CURRENT_INDEX, -1)
    commit(types.SET_PLAYING_STATE, false)
}

// 保存搜索历史
export const saveSearchHistory = function({commit}, query){
    commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

// 删除某一条搜索记录
export const deleteSearchHistory = function({commit}, query){
    commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

// 清空搜索记录
export const clearSearchHistory = function({commit}){
    commit(types.SET_SEARCH_HISTORY, clearSearch())
}

// 保存播放记录
export const savePlayHistory = function({commit}, song){
    commit(types.SET_PLAY_HISTORY, savePlay(song))
    commit(types.SET_FULL_SCREEN, true)
}
