<template>
    <div class="search-list" v-show="searches.length">
        <ul>
            <li
                class="search-item"
                v-for="item in searches"
                @click="selectItem(item)">
                <span class="text">{{item}}</span>
                <span class="icon">
                    <i class="icon-delete" @click.stop="deleteItem(item)"></i>
                </span>
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            searches: {
                type: Array,
                default: []
            },
        },
        methods: {
            selectItem(item){
                this.$emit('select', item)
            },
            deleteItem(item){
                this.$emit('delete', item)
            }
        },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "./search-list"
</style>
