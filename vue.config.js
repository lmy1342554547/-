module.exports = {
	// 配置路径别名
	configureWebpack: {
		devServer: {
			disableHostCheck: true
		}
	},
	chainWebpack: (config) => {
		// 发行或运行时启用了压缩时会生效
		config.optimization.minimizer('terser').tap((args) => {
				const compress = args[0].terserOptions.compress
				// 非 App 平台移除 console 代码(包含所有 console 方法，如 log,debug,info...)
				compress.drop_console = true
				compress.pure_funcs = [
					'__f__', // App 平台 vue 移除日志代码
					// 'console.debug' // 可移除指定的 console 方法
				]
				return args
			})
			// 警告 app平台请删除中间代码---------------
			config.module.rule('vue').use('vue-loader').loader('vue-loader').tap(options => {
				const compile = options.compiler.compile
				options.compiler.compile = (template, info) => {
					if (info.resourcePath.match(/^pages/)) {
						template = template.trim()
						template = template.replace(/^<[\d\D]+?>/g, _ => {
							_ = _.replace(/container/,'container u-skeleton')
							return `${_}
		                        <u-no-network></u-no-network>
								<u-toast ref="uToast" />
								<u-top-tips ref="uTips"></u-top-tips>
								<u-skeleton :loading="isShowSkeleton" :animation="true" bgColor="#FFF"></u-skeleton>
		                    `
						}
							
						)
					}
					return compile(template, info)
				}
				return options
			})
			// 警告 app平台请删除中间代码---------------
	}
}
