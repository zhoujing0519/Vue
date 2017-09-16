<template>
    <div class="searchbox">
        <input class="search-input" type="text" v-model="query" :placeholder="placeholder">
        <i class="icon-search"></i>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            query: {
                type: String,
                default: ''
            },
            placeholder: {
                type: String,
                default: ''
            },
        },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import './searchbox'
</style>
