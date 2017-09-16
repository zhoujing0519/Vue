<template>
    <transition name="confirm-fade">
        <div class="confirm" v-show="isShow">
            <div class="confirm-wrapper">
                <div class="confirm-content">
                    <div class="title">{{title}}</div>
                    <div class="btn-group">
                        <btn @select="cancel">取消</btn>
                        <btn @select="confirm">确定</btn>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script type="text/javascript">
    import Btn from 'base/btn/btn'

    export default {
        props: {
            title: {
                type: String,
                default: ''
            },
        },
        data(){
            return {
                isShow: false,
            }
        },
        methods: {
            show(){
                this.isShow = true;
            },
            hide(){
                this.isShow = false;
            },
            cancel(){
                this.$emit('cancel')
                this.hide();
            },
            confirm(){
                this.$emit('confirm')
                this.hide();
            },
        },
        components: {
            Btn,
        },
    }
</script>

<style lang="stylus">
    @import "./confirm"
</style>
