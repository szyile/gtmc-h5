<template>
    <div class='header flex' v-show="!this.common.isWeiXin()">
        <slot name="left" class="left"></slot>
        <span class="header-title">
            <span class="header-title-text fb f16">{{title}}</span>
        </span>
        <slot name="right" class="right"></slot>
    </div>
</template>
<script>
export default {
    data(){
        return{
            isShow:false
        }   
    },
    props:['title'],
    components:{
    },
    methods: {

    },
    mounted(){
   
    }
}
</script>
<style lang="less" scoped>
    .header{
        width: 100%;
        align-items: center;
        height: 44px;
        text-align: center;
        font-size: 16px;
        border-bottom: 1px solid #e7e5e5;
        background:#fff
    }
    .header.bgblue{
        border-bottom:0;
    }
    .left{
        position: absolute; 
        left: 20px;
        width: 12px;
        height:21px;
        background: url('../../../../static/images/back.png') no-repeat center center;
        background-size: cover;
    }
    .left.whiteback{
        background: url('../../../../static/images/whiteback.png') no-repeat center center;
        background-size: cover;
    }
    .header-title{
        flex:2;
        margin-top: 5px;
        color: #353535;
    }
    .right{
        position: absolute; 
        right: 15px;
        padding: 0 10px;
        height: 20px;
        line-height:20px;
        color: #fff;
        font-weight: bold;
        img{
            margin-top: 2px;
            width: 18px;
        }
    }
</style>
