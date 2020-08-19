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
	}
};
</script>

<style lang="scss">
/*每个页面公共css */
@import './styles/main.scss';
@import './styles/icon.scss';
@import './styles/animation.scss';
</style>
