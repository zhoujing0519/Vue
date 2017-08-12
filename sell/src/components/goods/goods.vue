<template>
    <div id="goods">
        <div class="menu-wrapper">
            <ul>
                <li class="menu-item border-1px" v-for="item in goods">
                    <span class="text">
                        <span class="icon" :class="classMap[item.type]" v-show="item.type > 0"></span>{{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper">
            {{goods}}
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    const ERR_OK = 0;

    export default {
        props: {
            seller: {
                type: Object,
            },
        },
        data(){
            return {
                goods: [],
            }
        },
        created(){
            axios.get('/api/goods').then(res => {
                if(res.data.errno === ERR_OK){
                    this.goods = res.data.data;
                }
            })
            .catch(err => {
                alert('网络错误，无法获取数据！');
            });

            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        },
    }
</script>

<style>
    #goods{
        display: flex;
        position: absolute;
        top: 174px;
        left: 0;
        bottom: 46px;
        width: 100%;
        overflow: hidden;
    }

    #goods .menu-wrapper{
        flex: 0 0 80px;
        width: 80px;
        height: 100%;
        background-color: #f3f5f7;
        overflow-x: hidden;
        overflow-y: auto;
    }

    #goods .menu-wrapper .menu-item{
        display: table;
        width: 56px;
        height: 54px;
        line-height: 14px;
        font-size: 12px;
        padding: 0 12px;
        text-align: center;
    }

    #goods .menu-wrapper .border-1px::before,
    #goods .menu-wrapper .border-1px:last-child::after{
        display: none;
    }

    #goods .menu-wrapper .menu-item .text{
        display: table-cell;
        vertical-align: middle;
        width: 100%;
    }

    #goods .menu-wrapper .menu-item .icon{
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 4px;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
    }

    /*满减*/
    #goods .menu-wrapper .menu-item .decrease{
        background-image: url(icons/decrease_2@2x.png);
    }

    /*3x图片*/
    @media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2){
        #goods .menu-wrapper .menu-item .decrease{
            background-image: url(icons/decrease_2@3x.png);
        }
    }

    /*打折*/
    #goods .menu-wrapper .menu-item .discount{
        background-image: url(icons/discount_2@2x.png);
    }

    /*3x图片*/
    @media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2){
        #goods .menu-wrapper .menu-item .discount{
            background-image: url(icons/discount_2@3x.png);
        }
    }

    /*特殊*/
    #goods .menu-wrapper .menu-item .special{
        background-image: url(icons/special_2@2x.png);
    }

    /*3x图片*/
    @media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2){
        #goods .menu-wrapper .menu-item .special{
            background-image: url(icons/special_2@3x.png);
        }
    }

    /*票*/
    #goods .menu-wrapper .menu-item .invoice{
        background-image: url(icons/invoice_2@2x.png);
    }

    /*3x图片*/
    @media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2){
        #goods .menu-wrapper .menu-item .invoice{
            background-image: url(icons/invoice_2@3x.png);
        }
    }

    /*保*/
    #goods .menu-wrapper .menu-item .guarantee{
        background-image: url(icons/guarantee_2@2x.png);
    }

    /*3x图片*/
    @media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2){
        #goods .menu-wrapper .menu-item .guarantee{
            background-image: url(icons/guarantee_2@3x.png);
        }
    }

    #goods .foods-wrapper{
        flex: 1;
    }
</style>
