<template>
    <div class="background">
        <div class="title">
            <i class="icon"></i>
            <span class="text">{{title}}</span>
        </div>
        <div class="container">
            <slot></slot>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            title: {
                type: String,
                default: ''
            },
        },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import './background'
</style>
