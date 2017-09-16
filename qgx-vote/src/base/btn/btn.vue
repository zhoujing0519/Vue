<template>
    <div class="btn" @click.stop="select" :class="modify(size, type)">
        <slot></slot>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            size: {
                type: String,
                default: 'small'
            },
            type: {
                fill: String,
                default: 'fill'
            },
        },
        methods: {
            select(){
                this.$emit('select')
            },
            modify(size, type){
                return `size-${size} type-${type}`
            },
        },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import './btn'
</style>
