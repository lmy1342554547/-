<script>
import Vue from 'vue';
export default {
    onLaunch() {
        uni.getSystemInfo({
            success: res => {
                // #ifndef MP
                Vue.prototype.StatusBar = res.statusBarHeight;
                if (res.platform == 'android') {
                    Vue.prototype.CustomBar = res.statusBarHeight + 50;
                } else {
                    Vue.prototype.CustomBar = res.statusBarHeight + 45;
                }
                // #endif

                // #ifdef MP-WEIXIN
                Vue.prototype.StatusBar = res.statusBarHeight;
                let custom = wx.getMenuButtonBoundingClientRect();
                Vue.prototype.Custom = custom;
                Vue.prototype.CustomBar = custom.bottom + custom.top - res.statusBarHeight;
                // #endif

                // #ifdef MP-ALIPAY
                Vue.prototype.StatusBar = res.statusBarHeight;
                Vue.prototype.CustomBar = res.statusBarHeight + res.titleBarHeight;
                // #endif
            }
        });
        //#ifdef MP-WEIXIN
        const updateManager = uni.getUpdateManager();
        updateManager.onCheckForUpdate(res => {
            // 请求完新版本信息的回调
            console.log(res.hasUpdate);
        });
        updateManager.onUpdateReady(res => {
            uni.showModal({
                title: '更新提示',
                content: '新版本已经准备好，是否重启应用？',
                success: res => {
                    if (res.confirm) {
                        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                        updateManager.applyUpdate();
                    }
                }
            });
        });
        updateManager.onUpdateFailed(function(res) {
            // 新的版本下载失败
            console.log(res);
        });
        //#endif
    }
};
</script>

<style lang="scss">
/*每个页面公共css */
@import './styles/main.scss';
@import './styles/icon.css';
@import './styles/animation.css';
</style>
