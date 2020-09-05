<script module="init" lang="renderjs">
export default {
	created() {
		this.$nextTick(() => {
			setTimeout(()=> {
				let dom = document.createElement('u-toast');
				dom.className = 'test'
				dom.setAttribute('ref','uToast');
				let curDom = document.getElementsByTagName('uni-view')[0]; 
				curDom.appendChild(dom)
			},100)
			// 动态引入较大类库避免影响页面展示
			// const script = document.createElement('script')
			// // view 层的页面运行在 www 根目录，其相对路径相对于 www 计算
			// script.src = 'static/echarts.js'
			// script.onload = this.initEcharts.bind(this)
			// document.head.appendChild(script)
			var dom = document.getElementById('content')

			// dom.appendChild(document.createElement('uni-view'))
			// console.log(document.getElementsByClassName('content'));
		})
	},
}
</script>

<script>
export default {
	onLaunch() {}
};
</script>

<style lang="scss">
/*每个页面公共css */
@import "styles/main.scss";
@import "styles/icon.scss";
@import "styles/animation.scss";
@import "styles/common.scss";
@import "uview-ui/index.scss";
</style>
