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
            <el-button @click="backMain">返回</el-button>
        </div>
    </div>
</template>
<script lang='ts' setup>
import { useRouter } from 'vue-router';
const router = useRouter()
const backMain = () => {
    router.push('/main')
}
</script>
<style lang='scss' scoped>
.main {
    overflow: hidden;
    background-color: #5c779b;
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: 9999;
    text-align: center;

    h3 {
        margin-top: 50px;
        height: 120px;
        background: linear-gradient(to right, rgb(97, 35, 255), rgb(255, 222, 7), rgb(101, 219, 146), rgb(84, 104, 254));
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
            border-radius: 10px;
            color: white;
            font-size: 16px;
            font-weight: 700;
            box-shadow: 0px 6px 13px 0px #4c4c4c;
            border: none;
            background: linear-gradient(to right, rgb(114, 106, 106), rgb(87, 87, 108));
            transition: all .2s !important;
        }

        .el-button:hover {
            border: none;
            transform: scale(1.05);
            background: linear-gradient(to right, #6b88ab 30%, rgb(40, 40, 63));
        }
    }
}
</style>