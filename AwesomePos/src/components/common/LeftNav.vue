<template>
  <nav class="leftNav">
    <a href="javascript:;">
        <i class="iconfont icon-goumai"></i>
        <span>收银</span>
    </a>
    <a href="javascript:;">
        <i class="iconfont icon-dianpu"></i>
        <span>店铺</span>
    </a>
    <a href="javascript:;">
        <i class="iconfont icon-liwuhuodong"></i>
        <span>商品</span>
    </a>
    <a href="javascript:;">
        <i class="iconfont icon-huiyuanqia"></i>
        <span>会员</span>
    </a>
    <a href="javascript:;">
        <i class="iconfont icon-dianpu"></i>
        <span>统计</span>
    </a>
    <a href="javascript:;">
        <i class="iconfont icon-gongnengjianyi"></i>
        <span>设置</span>
    </a>
  </nav>
</template>

<script>
    export default {

    }
</script>

<style>
    .leftNav{
        color: #fff;
        font-size: 12px;
        width: 5%;
        height: 100%;
        background-color: #1d8ce0;
        float: left;
    }

    .leftNav{
        padding: 0;
        margin: 0;
    }

    .leftNav a{
        display: block;
        text-align: center;
        color: inherit;
        border-bottom: 1px solid;
        padding: 1em;
        text-decoration: none;
    }

    .leftNav a i,
    .leftNav a span{
        display: block;
    }

    .leftNav .iconfont{
        font-size: 2em;
    }

</style>
