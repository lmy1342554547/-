// 全局混入
module.exports = {
	data() {
		return {
			isRipple: true, // 是否全局开启按钮水波纹
			isShowSkeleton: false, // 全局混入骨架屏显示状态
			loadTexts: { // 全局上拉触底状态文字
				loadmore: '点击或上拉加载更多',
				loading: '努力加载中',
				nomore: '实在没有了'
			},
		};
	},
	methods: {
		// 查询dom节点信息
		$getRect(selector, all) {
			return new Promise(resolve => {
				uni.createSelectorQuery().
				in(this)[all ? 'selectAll' : 'select'](selector)
					.boundingClientRect(rect => {
						if (all && Array.isArray(rect) && rect.length) {
							resolve(rect)
						}
						if (!all && rect) {
							resolve(rect)
						}
					})
					.exec()
			})
		}
	}
}
