<template>
  <div id="app" @touchmove.prevent>
    <transition name="slide">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </transition>
    <tab :showFlag="showFlag"></tab>
  </div>
</template>

<script>
    import Tab from './components/tab/tab'

    export default {
        name: 'app',
        data(){
            return {
                showFlag: true,
            }
        },
        created(){
            this.showFlag = this.$route.name !== 'Home'
        },
        updated(){
            this.showFlag = this.$route.name !== 'Home'
        },
        components: {
            Tab,
        },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .slide-enter-active, .slide-leave-active
        transition: .4s
    .slide-enter
        transform: translate3d(100%, 0, 0)
    .slide-leave-to
        transform: translate3d(-100%, 0, 0)
</style>
