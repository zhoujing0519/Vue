<template>
    <div id="my">
        <div class="my-banner">
            <div class="my-avatar">
                <img :src="avatar" alt="avatar">
            </div>
            <p class="my-name">{{username}}</p>
            <span class="my-country">From:{{country}}</span>
        </div>
        <Split></Split>
        <div class="list-wrap">
            <ul>
                <li class="list-item" v-for="item in list">
                    <i class="icon iconfont"></i>
                    <span class="desc">{{item.desc}}</span>
                    <i class="arrow iconfont icon-enter"></i>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Split from '../../components/Split/Split';

export default {
    data(){
        return {
            username: 'James Cameron',
            country: 'China',
            avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504157965281&di=fab1ef7ecd6440f203f0f84e5f8403b6&imgtype=0&src=http%3A%2F%2Fcdn.img.xiushuang.com%2Favatar%2F122737%2Fbig%2F413196.jpg',
            list: [
                {
                    desc: 'Love record',
                },
                {
                    desc: 'User information',
                },
                {
                    desc: 'About us',
                },
            ],
        };
    },
    components: {
        Split
    },
}
</script>

<style scoped>
    #my .my-banner{
        width: 100%;
        background-color: #009de4;
        text-align: center;
        padding-top: 45px;
        padding-bottom: 45px;
        color: #fff;
    }

    #my .my-avatar{
        width: 66px;
        height: 66px;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 auto;
        border: 2px solid;
        margin-bottom: 8px;
    }

    #my .my-avatar img{
        width: 100%;
        height: 100%;
    }

    #my .my-name,
    #my .my-country{
        line-height: 1;
    }

    #my .my-name{
        font-size: 13px;
        margin-bottom: 4px;
    }

    #my .my-country{
        font-size: 9px;
    }

    /*列表*/
    .list-item{
        height: 50px;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
        margin-bottom: 3px;
        line-height: 50px;
        padding: 0 15px;
        color: #666;
        background-color: #fff;
        position: relative;
    }

    .list-item .desc{
        font-size: 12px;
        display: inline-block;
    }

    .list-item .arrow{
        position: absolute;
        right: 15px;
        top: 0;
        font-size: 13px;
    }
</style>
