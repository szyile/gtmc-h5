<template>
    <div class="wrap" v-if="show" :class="showContent ?'fadein':'fadeout'">
        <!-- 成功 -->
        <div class="tx-c imgDiv" v-show='type==1'>
            <img src="../../../../static/images/success.png" alt="">
        </div>
        <!-- 错误 -->
        <div class="tx-c imgDiv" v-show='type==2'>
            <img src="../../../../static/images/err.png" alt="">
        </div>
        <!-- 等待 -->
        <div class="tx-c imgDiv" v-show='type==3'>
            <img src="../../../../static/images/loading.gif" alt="">
        </div>
        <!-- 警告 -->
        <div class="tx-c imgDiv" v-show='type==4'>
            <img src="../../../../static/images/err-icon.png" alt="">
        </div>
        <div class="tx-c">{{text}}</div>
        <div class="showcode" v-show='codeFlag == 1'>错误码：{{code}}</div>
    </div>
</template>
<style scoped>
    .wrap{
        position: fixed;
        left: 50%;
        bottom:50%;
        background: rgba(37,38,45,0.9);
        padding:0px 15px;
        border-radius: 4px;
        transform: translate(-52%,50%);
        color:#ccc;
        font-size:13px;
        min-width: 220px;
        padding-bottom: 17px;
        z-index: 9999;
    }
    .imgDiv{
        width: 100%;
        height: 30px; 
        margin-top: 15px;
        margin-bottom: 10px;  
    }
    .fadein {
        animation: animate_in 0.35s;
    }
    .fadeout {
        animation: animate_out 0.35s;
        opacity: 0;
    }
    img{
        width: 28px;
    }
    .showcode{
        width: 100%;
        text-align: center;
        margin-top: 5px;
    }
    @keyframes animate_in {
        0% {
            opacity: 0;
        }
        50% {
            opacity: 0.5;
        }
        100%{
            opacity: 1;
        }
    }
    @keyframes animate_out {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
        100%{
            opacity: 0;
        }
    }
</style>