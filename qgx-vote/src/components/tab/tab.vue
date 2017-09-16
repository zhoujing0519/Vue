<template>
    <transition name="slideup">
        <div class="tab" v-show="showFlag">
            <router-link class="tab-item" tag="div" to="/home">
                <i class="tab-icon tab-icon-home"></i>
                <span class="tab-text">首页</span>
            </router-link>
            <router-link class="tab-item" tag="div" to="/vote">
                <i class="tab-icon tab-icon-vote"></i>
                <span class="tab-text">投票</span>
            </router-link>
            <router-link class="tab-item" tag="div" to="/rule">
                <i class="tab-icon tab-icon-rule"></i>
                <span class="tab-text">投票规则</span>
            </router-link>
            <router-link class="tab-item" tag="div" to="/rank">
                <i class="tab-icon tab-icon-rank"></i>
                <span class="tab-text">排行榜</span>
            </router-link>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            showFlag: {
                type: Boolean,
                default: false
            },
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import './tab'
</style>
