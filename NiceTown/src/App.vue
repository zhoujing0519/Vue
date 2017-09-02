<template>
  <div id="app">
    <transition name="fade" mode="out-in">
        <router-view></router-view>
    </transition>
    <!-- 底部通栏 -->
    <v-footer></v-footer>
  </div>
</template>

<script>
import Footer from './components/Footer/Footer'

export default {
  name: 'app',
  components: {
      'v-footer': Footer
  },
}
</script>

<style>

</style>
