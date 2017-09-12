import {mapGetters, mapMutations, mapActions} from 'vuex'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'

// 用于mini播放器出现时，scroll组件占位缩小
export const playlistMixin = {
    computed: {
        ...mapGetters([
            'playlist',
        ])
    },
    mounted(){
        this.handlePlaylist(this.playlist);
    },
    activated(){ // keep-alive使用
        this.handlePlaylist(this.playlist);
    },
    methods: {
        handlePlaylist(){
            throw new Error('component must implement handlePlaylist method');
        },
    },
    watch: {
        playlist(newVal){
            this.handlePlaylist(newVal);
        }
    },
}

// 用于播放模式
export const playerMixin = {
    computed: {
        iconMode(){
            return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random';
        },
        ...mapGetters([
            'mode',
            'playlist',
            'sequenceList',
            'currentSong',
            'favoriteList',
        ])
    },
    methods: {
        changeMode(){ // 切换模式
            const mode = (this.mode + 1) % 3;
            this.setPlayMode(mode);
            let list = null;
            if(mode === playMode.random){
                list = shuffle(this.sequenceList);
            }else{
                list = this.sequenceList;
            }
            this.resetCurrentIndex(list);
            this.setPlayList(list);
        },
        resetCurrentIndex(list){
            let index = list.findIndex((item) => {
                return item.id === this.currentSong.id;
            });
            this.setCurrentIndex(index);
        },
        toggleFavorite(song){
            this.isFavorite(song) ? this.deleteFavoriteList(song) : this.saveFavoriteList(song)
        },
        getFavoriteIcon(song){
            return this.isFavorite(song) ? 'icon-favorite' : 'icon-not-favorite'
        },
        isFavorite(song){
            const index = this.favoriteList.findIndex((item) => {
                return song.id === item.id
            })
            return index > -1
        },
        ...mapMutations({
            setPlayingState: 'SET_PLAYING_STATE',
            setCurrentIndex: 'SET_CURRENT_INDEX',
            setPlayMode: 'SET_PLAY_MODE',
            setPlayList: 'SET_PLAYLIST',
        }),
        ...mapActions([
            'saveFavoriteList',
            'deleteFavoriteList',
        ]),
    },
}

// 用于搜索
export const searchMixin = {
    data(){
        return {
            query: '',
            refreshDelay: 100,
        }
    },
    computed: {
        ...mapGetters([
            'searchHistory',
        ]),
    },
    methods: {
        blurInput(){
            this.$refs.searchBox.blur()
        },
        saveSearch(){
            this.saveSearchHistory(this.query)
        },
        addQuery(query){
            this.$refs.searchBox.setQuery(query)
        },
        onQueryChange(query){
            this.query = query
        },
        ...mapActions([
            'saveSearchHistory',
            'deleteSearchHistory',
        ]),
    },
}
