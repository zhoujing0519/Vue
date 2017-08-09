<template>
  <div class="footer">
    <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/lovehome">Lovehome</router-link></li>
        <li><router-link to="/product">Product</router-link></li>
        <li><router-link to="/my">My</router-link></li>
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
