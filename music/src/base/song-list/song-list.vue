<template>
    <div class="song-list">
        <ul>
            <li v-for="(song, index) in songs" class="item" @click="selectItem(song, index)">
                <div class="content">
                    <h2 class="name">{{song.name}}</h2>
                    <p class="desc">{{getDesc(song)}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            songs: {
                type: Array,
                default: []
            },
        },
        methods: {
            getDesc(song){
                return `${song.singer}-${song.album}`;
            },
            selectItem(item, index){
                this.$emit('select', item, index);
            },
        },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "./song-list"
</style>
