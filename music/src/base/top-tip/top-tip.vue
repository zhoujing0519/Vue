<template>
    <transition name="drop">
        <div class="top-tip" v-show="showFlag" @click.stop="hide">
            <slot></slot>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            delay: {
                type: Number,
                default: 1000
            },
        },
        data(){
            return {
                showFlag: false,
            }
        },
        methods: {
            show(){
                this.showFlag = true
                if(this.timer) clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    this.hide()
                }, this.delay)
            },
            hide(){
                this.showFlag = false
            },
        },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "./top-tip"
</style>
