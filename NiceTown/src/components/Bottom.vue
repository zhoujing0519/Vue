<template>
  <div class="footer">
    <ul>
        <li :class="{'active': $route.path == '/'}"><router-link to="/">
            <span class="iconfont icon-home"></span>
            <span>Home</span>
        </router-link></li>
        <li :class="{'active': $route.path == '/lovehome'}"><router-link to="/lovehome">
            <span class="iconfont icon-tabulation"></span>
            <span>Lovehome</span>
        </router-link></li>
        <li :class="{'active': $route.path == '/product'}"><router-link to="/product">
            <span class="iconfont icon-dianpu"></span>
            <span>Product</span>
        </router-link></li>
        <li :class="{'active': $route.path == '/my'}"><router-link to="/my">
            <span class="iconfont icon-31wode"></span>
            <span>My</span>
        </router-link></li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
}

.footer ul{
    font-size: 0;
    width: 100%;
}

.footer ul li{
    display: inline-block;
    width: 25%;
    font-size: .24rem;
    line-height: 2em;
    text-align: center;
}
</style>
