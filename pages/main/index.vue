<template>
	<view class="container">
		<button type="default" @click="handleToPage">测试</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
			handleToPage() {
				uni.navigateTo({
					url:'./test'
				})
			}
		},
	}
</script>

<style scoped lang="scss">

</style>