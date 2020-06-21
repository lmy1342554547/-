<template>
    <view class="no-data" v-show="isShow" :style="{ paddingTop: paddingTop + 'rpx'}">
        <image v-if="imgSrc" :src="imgSrc" mode="aspectFit" :style="{ width: imgWidth + 'rpx', height: imgHeight + 'rpx' }"></image>
        <image v-else src="../../static/logo.png" mode="aspectFit"></image>
        <view class="no-data-tips">{{ tips }}</view>
        <slot></slot>
    </view>
</template>

<script>
export default {
    name:'noData',
    props: {
        imgSrc: {
            type: String
        },
        tips: {
            type: String,
            default: '暂无信息'
        },
        imgWidth: {
            type: String,
            default: '200'
        },
        imgHeight: {
            type: String,
            default: '200'
        },
        paddingTop: {
            type: String,
            default: '150'
        }
    },
    data() {
        return {
            isShow: false
        };
    },
    methods: {
        show() {
            this.isShow = true;
        },
        hide() {
            this.isShow = false;
        }
    }
};
</script>

<style>
.no-data {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150upx;
    padding-bottom: 150upx;
}

.no-data image {
    width: 200rpx;
    height: 200rpx;
    margin-bottom: 40rpx;
}

.no-data .no-data-tips {
    margin-bottom: 40rpx;
    font-size: 32rpx;
    font-weight: bold;
}
</style>
