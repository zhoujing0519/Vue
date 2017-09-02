<template>
    <div id="footer">
        <nav class="footer-wrapper">
            <router-link to="/">
                <i class="iconfont icon-home"></i>
                <span class="text">Home</span>
            </router-link>
            <router-link to="/lovehome">
                <i class="iconfont icon-tabulation"></i>
                <span class="text">Lovehome</span>
            </router-link>
            <router-link to="/product">
                <i class="iconfont icon-dianpu"></i>
                <span class="text">Product</span>
            </router-link>
            <router-link to="/my">
                <i class="iconfont icon-31wode"></i>
                <span class="text">My</span>
            </router-link>
        </nav>
    </div>
</template>

<script>
    export default {

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #footer{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        background-color: #333;
        padding-top: 6px;
        padding-bottom: 8px;
        box-sizing: border-box;
    }

    #footer .footer-wrapper{
        width: 100%;
        height: 100%;
        display: flex;
    }

    #footer .footer-wrapper a{
        flex: 1;
        text-align: center;
        color: #fff;
        text-decoration: none;
    }

    #footer .footer-wrapper .router-link-exact-active{
        color: #009de4;
    }

    #footer .footer-wrapper a .iconfont{
        font-size: 21px;
        line-height: 1;
    }

    #footer .footer-wrapper a .text{
        font-size: 10px;
        line-height: 1;
        display: block;
        margin-top: 3px;
    }
</style>
