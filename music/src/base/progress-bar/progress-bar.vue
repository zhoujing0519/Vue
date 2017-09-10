<template>
    <div class="progress-bar" ref="progressBar" @click="progressClick">
        <div class="bar-inner">
            <div class="progress" ref="progress"></div>
            <div class="progress-btn-wrapper" ref="progressBtn"
                @touchstart.prevent="progressTouchStart"
                @touchmove.prevent="progressTouchMove"
                @touchend="progressTouchEnd">
                <div class="progress-btn"></div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {prefixStyle} from 'common/js/dom';

    const transform = prefixStyle('transform');
    const progressBtnWidth = 16;

    export default {
        props: {
            percent: {
                type: Number,
                default: 0
            },
        },
        created(){
            this.touch = {};
        },
        methods: {
            progressTouchStart(e){
                this.touch.initiated = true;
                this.touch.startX = e.touches[0].pageX;
                this.touch.left = this.$refs.progress.clientWidth;
            },
            progressTouchMove(e){
                if(!this.touch.initiated) return;
                const deltaX = e.touches[0].pageX - this.touch.startX;
                const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
                const offsetWidth = Math.min(Math.max(0, this.touch.left + deltaX), barWidth);
                this._offset(offsetWidth);
            },
            progressTouchEnd(){
                this.touch.initiated = false;
                this._triggerPercent();
            },
            progressClick(e){
                // 当我们点击progressbtn的时候，e.offsetX获取不对
                // this._offset(e.offsetX);
                const rect = this.$refs.progressBar.getBoundingClientRect();
                const offsetWidth = e.pageX - rect.left;
                this._offset(offsetWidth);
                this._triggerPercent();
            },
            _offset(offsetWidth){
                this.$refs.progress.style.width = `${offsetWidth}px`;
                this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`;
            },
            _triggerPercent(){
                const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
                const percent = this.$refs.progress.clientWidth / barWidth;
                this.$emit('percentChange', percent);
            },
        },
        watch: {
            percent(newVal){
                if(newVal >= 0 && !this.touch.initiated){
                    const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
                    const offsetWidth = newVal * barWidth;
                    this._offset(offsetWidth);
                }
            },
        },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "./progress-bar"
</style>
