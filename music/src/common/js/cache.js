import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15

const PLAY_KEY = '__play__'
const PLAY_MAX_LENGTH = 200

function insertArray(arr, val, compare, maxLen){
    const index = arr.findIndex(compare)
    if(index === 0) return
    if(index > 0) arr.splice(index, 1)
    arr.unshift(val)
    if(maxLen && arr.length > maxLen) arr.pop()
}

function deleteFromArray(arr, compare){
    const index = arr.findIndex(compare)
    if(index > -1) arr.splice(index, 1)
}

// 保存搜索数据
export function saveSearch(query){
    let searches = storage.get(SEARCH_KEY, [])
    insertArray(searches, query, (item) => {
        return item === query
    }, SEARCH_MAX_LENGTH)
    storage.set(SEARCH_KEY, searches)
    return searches
}

// 读取localStorage中的搜索历史数据
export function loadSearch(){
    return storage.get(SEARCH_KEY, [])
}

// 删除某1条搜索历史数据
export function deleteSearch(query){
    let searches = storage.get(SEARCH_KEY, [])
    deleteFromArray(searches, (item) => {
        return item === query
    })
    storage.set(SEARCH_KEY, searches)
    return searches
}

// 清空搜索数据
export function clearSearch(){
    storage.remove(SEARCH_KEY)
    return []
}

// 保存播放历史
export function savePlay(song){
    let songs = storage.get(PLAY_KEY, [])
    insertArray(songs, song, (item) => {
        return item.id === song.id
    }, PLAY_MAX_LENGTH)
    storage.set(PLAY_KEY, songs)
    return songs
}

// 读取播放历史
export function loadPlay(){
    return storage.get(PLAY_KEY, [])
}
