<template>
	<view class="container">
		<u-avatar :src="weixinInfo.avatarUrl" size="190"></u-avatar>
		<text class="app-name">招标客服</text>
		<u-button v-if="authStep == 'weixin'" class="width-max" type="primary" :ripple="isRipple" open-type="getUserInfo" @getuserinfo="handleAuthWeiXin">
			微信授权
		</u-button>
		<u-button
			v-else-if="authStep == 'phone'"
			class="width-max animation-slide-top"
			type="primary"
			:ripple="isRipple"
			open-type="getPhoneNumber"
			@getphonenumber="handleAuthPhone"
		>
			绑定手机号码
		</u-button>
		<view class="register-wrap animation-slide-top" v-else-if="authStep == 'register'">
			<u-message-input class="animation-scale-up" v-if="isInputCode" :maxlength="6" :focus="true" @finish="handleFinish"></u-message-input>
			<u-input class="margin-tb-20" v-model="phone" type="number" maxlength="11" placeholder="请输入手机号" :border="true" border-color="#1890ff" />
			<u-verification-code :seconds="seconds" @end="handleEnd" @start="handleStart" ref="uCode" @change="handleCodeChange"></u-verification-code>
			<u-button type="primary" :ripple="isRipple" @click="handleGetCode">{{ buttonText }}</u-button>
		</view>
		<view class="treaty-wrap">
			<text class="text-grey">登录代表您已同意</text>
			<text class="text-theme">用户协议</text>
			<text class="text-grey">、</text>
			<text class="text-theme">隐私协议</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			weixinInfo: {
				// 用户信息
				avatarUrl: "../../../static/image/avatar.png"
			},
			authStep: "weixin", // 授权步骤
			phone: "", // 注册手机号
			seconds: 60,
			buttonText: "",
			isInputCode: false // 是否显示验证码输入
		};
	},
	methods: {
		// 微信授权
		handleAuthWeiXin(event) {
			if (event.detail.userInfo) {
				// 将微信授权信息存到vuex和storage里
				this.weixinInfo = event.detail.userInfo;
				this.$setState("weixin_user", event.detail.userInfo);
				this.authStep = "phone";
				this.$refs.uTips.show({
					title: "微信授权成功",
					type: "success",
					duration: "2000"
				});
			} else {
				uni.showModal({
					content: "您拒绝了微信授权,将无法使用小程序的功能,请重新授权,谢谢",
					showCancel: false
				});
			}
		},
		// 授权手机号
		handleAuthPhone(event) {
			if (event.detail.encryptedData) {
				uni.login({
					provider: "weixin",
					success: res => {
						this.$u
							.post("/auth/weChat/authRegister", {
								jsCode: res.code,
								iv: event.detail.iv,
								encryptedData: event.detail.encryptedData,
								nickName: this.weixinInfo.nickName,
								avatar: this.weixinInfo.avatarUrl,
								sex: this.weixinInfo.gender
							})
							.then(res => {
								// 将token存入vuex
								this.$setState("vuex_token", res.token);
								// 获取用户信息
								this.getUserInfo();
							});
					}
				});
			} else {
				this.authStep = "register";
			}
		},
		// 获取验证码
		handleGetCode() {
			// 效验手机号码格式
			if (this.$u.test.mobile(this.phone)) {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					this.$refs.uTips.show({
						title: "验证码发送中",
						type: "success",
						duration: "2000"
					});
					this.$u
						.post("/api/biz/sms/appSendSMS", {
							type: "REGISTER",
							phone: this.phone
						})
						.then(res => {
							setTimeout(() => {
								this.$u.toast("验证码已发送");
								this.isInputCode = true;
								// 通知验证码组件内部开始倒计时
								this.$refs.uCode.start();
							}, 300);
						});
				} else {
					this.$u.toast("倒计时结束后再发送");
				}
			} else {
				return this.$toast("手机号码格式不正确,请重新输入");
			}
		},
		// 验证码输入完成
		handleFinish(value) {
			uni.login({
				provider: "weixin",
				success: res => {
					// 请求注册接口
					this.$u
						.post("/auth/weChat/register", {
							jsCode: res.code,
							mobile: this.phone,
							smsCode: value,
							nickName: this.weixinInfo.nickName
						})
						.then(res => {
							this.$setState("vuex_token", res.token);
							uni.showToast({
								icon: "success",
								title: "绑定成功",
								mask: true
							});
							setTimeout(() => {
								uni.switchTab({
									url: "../tabbar/main"
								});
							}, 1500);
						});
				}
			});
		},
		// 获取用户信息
		getUserInfo() {
			this.$u.post("/api/mp/core/user/userInfo").then(res => {
				this.$setState("vuex_user", res.userInfo);
				uni.showToast({
					icon: "success",
					title: "绑定成功",
					mask: true
				});
				setTimeout(() => {
					uni.switchTab({
						url: "../tabbar/main"
					});
				}, 1500);
			});
		},
		handleCodeChange(text) {
			this.buttonText = text;
		},
		handleEnd() {
			// this.$u.toast("倒计时结束");
		},
		handleStart() {
			this.$toast("等待输入验证码");
		}
	}
};
</script>

<style scoped lang="scss">
.container {
	align-items: center;
	padding: 130rpx 30rpx 100rpx 30rpx;
	background-color: #ffffff;
	.app-name {
		font-size: 36rpx;
		margin-top: 20rpx;
		font-weight: bold;
		margin-bottom: 160rpx;
	}
	.treaty-wrap {
		display: flex;
		align-items: center;
		margin-top: auto;
	}
	.register-wrap {
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 0 40rpx;
	}
}
</style>
