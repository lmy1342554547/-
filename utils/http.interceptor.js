// 这里的vm，就是我们在vue文件里面的this，所以我们能在这里获取vuex的变量，比如存放在里面的token
// 同时，我们也可以在此使用getApp().globalData，如果你把token放在getApp().globalData的话，也是可以使用的
const install = (Vue, vm) => {
	// 环境配置
	const baseUrl = {
		production: "https://production.cn", // 正式环境
		release: "https://release.cn", // 微信正式环境
		develop: "http://192.168.10.20:8081", // 微信开发环境
		trial: "http://show.fjlonge.com/cs", // 微信体验环境
		development: "http://show.fjlonge.com/cs" // 开发环境
	};

	// 开发环境和生产环境判断
	// #ifdef MP-WEIXIN
	const env = uni.getAccountInfoSync().miniProgram.envVersion; // 获取微信运行环境
	// #endif
	// #ifndef MP-WEIXIN
	const env = process.env.NODE_ENV; // 获取除了微信以外的运行环境
	// #endif
	
	Vue.prototype.$u.http.setConfig({
		baseUrl: baseUrl[env],
		// 如果将此值设置为true，拦截回调中将会返回服务端返回的所有数据response，而不是response.data
		// 设置为true后，就需要在this.$http.interceptor.response进行多一次的判断，请打印查看具体值
		// originalData: true, 
		// 设置自定义头部content-type
		header: {
			'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
		}
	});
	// 请求拦截，配置Token等参数
	Vue.prototype.$u.http.interceptor.request = (config) => {
		// 方式一，存放在vuex的token，假设使用了uView封装的vuex方式，见：https://uviewui.com/components/globalVariable.html
		// config.header.token = vm.token;

		// 方式二，如果没有使用uView封装的vuex方法，那么需要使用$store.state获取
		// config.header.token = vm.$store.state.token;

		// 方式三，如果token放在了globalData，通过getApp().globalData获取
		// config.header.token = getApp().globalData.username;

		// 方式四，如果token放在了Storage本地存储中，拦截是每次请求都执行的，所以哪怕您重新登录修改了Storage，下一次的请求将会是最新值
		config.header.token = uni.getStorageSync('permanent').vuex_token || '';

		if (process.env.NODE_ENV === 'development') {
			console.log(`%c请求地址  ${baseUrl[env]}${config.url}\n${JSON.stringify(config)}`, "color: #02b340");
		}

		return config;
	}
	// 响应拦截，判断状态码是否通过
	Vue.prototype.$u.http.interceptor.response = (res) => {
		uni.stopPullDownRefresh() // 停止下拉动作
		let errCode = ['1000', '1001', '0404', '1101', '1103', '1000']
		// 如果把originalData设置为了true，这里得到将会是服务器返回的所有的原始数据
		// 判断可能变成了res.statueCode，或者res.data.code之类的，请打印查看结果
		if (res.success) {
			// 如果把originalData设置为了true，这里return回什么，this.post的then回调中就会得到什么
			return res.data;
		} else if (errCode.includes(res.respCode)) {
			uni.removeStorageSync('permanent');
			uni.showToast({
				title: res.respMsg,
				icon: 'none',
				duration: 2000
			});
			uni.switchTab({
				url: '/pages/tabbar/person'
			});
			return false;
		} else {
			uni.showModal({
				title: '提示',
				content: res.respMsg || '网络错误,' + res.respCode,
				confirmColor: '#1890FF',
				showCancel: false,
				success: function(res) {}
			});
			throw new Error(res);
		};
	}
}

export default {
	install
}
