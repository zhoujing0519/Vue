<template>
    <transition name="confirm-fade">
        <div class="confirm" v-show="showFlag" @click.stop>
            <div class="confirm-wrapper">
                <div class="confirm-content">
                    <p class="text">{{text}}</p>
                    <div class="operate">
                        <div class="operate-btn left" @click="cancel">{{cancelBtnText}}</div>
                        <div class="operate-btn" @click="confirm">{{confirmBtnText}}</div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            text: {
                type: String,
                default: ''
            },
            confirmBtnText: {
                type: String,
                default: '确定'
            },
            cancelBtnText: {
                type: String,
                default: '取消'
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
            },
            hide(){
                this.showFlag = false
            },
            confirm(){
                this.$emit('confirm')
                this.hide()
            },
            cancel(){
                this.$emit('cancel')
                this.hide()
            },
        },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "./confirm"
</style>
