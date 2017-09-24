<template>
    <background title="投票规则">
        <scroll :data="ruleData" class="rule">
            <ul class="rule-list">
                <li class="rule-item">
                    <h3 class="rule-item-title">规则简介</h3>
                    <ul class="rule-item-content">
                        <li class="rule-item-text">1. 常州市各细分行业在全国全省乃至全球具有领先地位的工业制造企业，围绕先进制造主体，展现常州制造转型升级成效、智能创新发展成果，制作5分钟以内微视频作品，要求内容立意明确、导向积极、内容健康、形式新颖，具有鲜明的常州元素。</li>
                        <li class="rule-item-text">2. 所有微视频作品最终结果由专业评委分数x70%+大众评委分数x30%组成，网络大众评委打分环节，每个ID最多可投出五票给不同的作品。</li>
                        <li class="rule-item-text">3. 最终结果=专业评委分数x70%+大众评委分数x30%。</li>
                        <li class="rule-item-text">4. 投票截止日期：5月14日 23：59。</li>
                    </ul>
                </li>
                <li class="rule-item">
                    <h3 class="rule-item-title">奖项设置</h3>
                    <ul class="rule-item-content center">
                        <p>第一篇章 “隐形冠军·智造之美”</p>
                        <p>第二篇章 “风雅常州·人文之美”</p>
                        <p>第三篇章 “宜居宜业·家园之美”</p>
                        <p>每个篇章都将评出：</p>
                        <p>金奖2个</p>
    					<p>银奖3个</p>
    					<p>铜奖5个</p>
    					<p>优秀奖10个</p>
    					<p>所有获奖, 单位将统一颁发荣誉证书及奖励</p>
                    </ul>
                </li>
                <li class="rule-item">
                    <h3 class="rule-item-title">主办单位</h3>
                    <ul class="rule-item-content center">
                        <p>中共常州市委宣传部</p>
                        <p>常州市经信委</p>
                        <p>常州市科技局</p>
                        <p>常州市商务局</p>
                    </ul>
                </li>
            </ul>
        </scroll>
    </background>
</template>

<script type="text/ecmascript-6">
    import Background from 'base/background/background'
    import Scroll from 'base/scroll/scroll'

    export default {
        data(){
            return {
                ruleData: [1, 2, 3],
            }
        },
        components: {
            Background,
            Scroll,
        },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import './rule'
</style>
