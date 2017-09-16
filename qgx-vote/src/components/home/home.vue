<template>
    <div class="home">
        <div class="slider-wrapper">
            <slider>
                <div>
                    <a href="#">
                        <img src="./banner.jpg">
                    </a>
                </div>
                <div>
                    <a href="#">
                        <img src="./banner.jpg">
                    </a>
                </div>
                <div>
                    <a href="#">
                        <img src="./banner.jpg">
                    </a>
                </div>
            </slider>
        </div>
        <div class="home-content">
            “发现常州之美”摄影大赛，<br>
            旨在寻找和挖掘<br>
            极具有创新意识的青年艺术家，<br>
            尤其是那些未曾在公众视野中崭露头角、<br>
            但极具潜力的优秀摄影师/艺术家。<br>
            通过本次活动的评选平台和推荐机制，<br>
            最终将作为新生力量进入公众视野。
        </div>
        <div class="btn-wrapper">
            <btn size="large" @select="goToVote">进入投票</btn>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Slider from 'base/slider/slider'
    import Btn from 'base/btn/btn'

    export default {
        data(){
            return {
                bannerList: [],
            }
        },
        methods: {
            goToVote(){
                this.$router.push({
                    path: '/vote'
                })
            },
        },
        components: {
            Slider,
            Btn,
        },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import './home'
</style>
