<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
        <div class="tab-item">
            <router-link to="/goods">商品</router-link>
        </div>
        <div class="tab-item">
            <router-link to="/ratings">评论</router-link>
        </div>
        <div class="tab-item">
            <router-link to="/seller">商家</router-link>
        </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import header from './components/header/header'
import axios from 'axios'

const ERR_OK = 0;

export default {
  name: 'app',
  data(){
      return {
          seller: {}
      }
  },
  created(){
      axios.get('/api/seller').then((res) => {
          if(res.data.errno === ERR_OK){
              this.seller = res.data.data;
          }
      })
      .catch(err => {
          alert('网络错误，不能访问！');
      });
  },
  components: {
      'v-header': header,
  },
}
</script>

<style>
#app .tab{
    display: flex;
    width: 100%;
    line-height: 40px;
}

#app .tab-item{
    flex: 1;
    text-align: center;
}

#app .tab-item a{
    display: block;
    font-size: 14px;
    color: rgb(77, 85, 93);
}

#app .tab-item a.active{
    color: rgb(240, 20, 20);
}
</style>
