<template>
    <view class="container">
        <image class="logo" src="/static/logo.png"></image>
        <view class="text-area flex flex-direction">
            <text class="title text-center text-green">基础框架更新于{{ 1591174302 | timeFrom() }}</text>
            <text class="title text-center text-green">js相关代码请查看utils/index.js</text>
        </view>
        <button class="cu-btn test-button bg-theme text-white" :disabled="false" type="" @tap="tesat">测试</button>
    </view>
</template>

<script>
export default {
    data() {
        return {
            title: 'Hello',
            list: [
                {
                    name: '关注'
                },
                {
                    name: '推荐'
                },
                {
                    name: '电影'
                }
            ],
            current: 0
        };
    },
    onLoad() {},
    onShow() {
        this.$random(1, 2);
    },
    methods: {
        change(index) {
            this.current = index;
        },
        async tesat() {
            let value = await this.$http.post('/auth/inspectorsLogin', {});
            console.log(value);
        }
    },
    onPullDownRefresh() {}
};
</script>

<style scoped lang="scss">
.logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 200rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
}

.title {
    font-size: 36rpx;
}
.text {
    color: $uni-color-primary;
}
.test-button {
    height: 80rpx;
}
</style>
