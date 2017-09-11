<template>
    <div class="search-box">
        <i class="icon-search"></i>
        <input class="box" v-model="query" :placeholder="placeholder" />
        <i class="icon-dismiss" v-show="query" @click="clear"></i>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            placeholder: {
                type: String,
                default: '搜索歌曲、歌手'
            },
        },
        data(){
            return {
                query: ''
            }
        },
        created(){
            this.$watch('query', (newQuery) => {
                this.$emit('query', newQuery)
            })
        },
        methods: {
            clear(){
                this.query = ''
            },
            setQuery(query){
                this.query = query
            },
        },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "./search-box"
</style>
