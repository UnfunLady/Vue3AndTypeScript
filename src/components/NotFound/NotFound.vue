<template>

    <div class="main">
        <h3>404 NotFound....</h3>
        <div class="wuyuzi">
            <img src="@/assets/wuyuzi.png" alt="" />
        </div>
        <div class="one"> <img src="@/assets/Filianore.png" alt="" /></div>
        <div class="two">
            <img src="@/assets/maria.png" alt="">
        </div>
        <div class="back">
            <el-button @click="backMain">返回主页</el-button>
        </div>

    </div>
</template>

<script lang='ts' setup>
import { reactive, ref, toRefs, defineComponent, onMounted, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter()
const backMain = () => {
    router.push('/main')

}
</script>
<style lang='scss' scoped>
.main {
    overflow: hidden;
    background-color: rgb(255, 255, 255);
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: 9999;
    text-align: center;

    h3 {
        margin-top: 50px;
        height: 120px;
        background: linear-gradient(to right, rgb(21, 30, 24), rgb(210, 9, 236), rgb(21, 138, 215), rgb(226, 23, 23), rgb(3, 3, 3), rgb(7, 7, 255), rgb(3, 179, 255));
        background-clip: text;
        color: transparent;
        animation: hue 3s linear infinite;
        font-size: 100px;
        padding: 20px;
    }

    @keyframes hue {
        0% {
            filter: hue-rotate(0deg);
        }

        100% {
            filter: hue-rotate(360deg);
        }
    }


    .wuyuzi {
        position: absolute;
        left: 50%;
        top: 26%;
        transform: translate(-50%, -50%);
        z-index: 99999;
        animation: go 5.5s linear infinite;

        img {
            width: 300px;
        }
    }

    @keyframes go {
        0% {
            left: 0%;
        }

        10% {
            left: 10%
        }

        20% {
            left: 20%
        }

        50% {
            left: 50%
        }

        100% {
            left: 100%;

        }

        /*保障后百分之五十都是翻转了180度的形状*/

    }

    .one {
        position: absolute;
        left: 65%;
        top: 48%;
        transform: translate(-50%, -50%);
        z-index: 99999;

        img {
            width: 500px;
            height: 431px;

        }
    }

    .two {

        position: absolute;
        left: 35%;
        top: 48%;
        transform: translate(-50%, -50%);
        z-index: 99999;

        img {
            width: 500px;
            height: 431px;
            z-index: 99999;

        }
    }

    .back {
        position: absolute;
        left: 50%;
        top: 75%;
        transform: translate(-50%, -50%);


        .el-button {
            width: 230px;
            height: 60px;
            letter-spacing: 5px;
            color: white;
            font-size: 16px;
            font-weight: 700;
            box-shadow: 1px 5px 14px 4px gray;
            border: none;
            background: linear-gradient(to right, rgb(114, 106, 106), rgb(40, 40, 63));
            transition: all .2s !important;
        }

        .el-button:hover {
            border: none;
            transform: scale(1.05);

        }
    }
}
</style>