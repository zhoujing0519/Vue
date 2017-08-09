<template>
  <div id="app">
    <transition name="fade" mode="out-in">
        <router-view></router-view>
    </transition>
    <!-- 底部通栏 -->
    <bottom></bottom>
  </div>
</template>

<script>
import Bottom from './components/Bottom'

export default {
  name: 'app',
  components: {
      Bottom
  },
}
</script>

<style>
.fade-enter{
    opacity: 0;
}

.fade-enter-active{
    transition: opacity .5s;
}

.fade-leave{
    opacity: 1;
}

.fade-leave-active{
    opacity: 0;
    transition: opacity .5s;
}
</style>
