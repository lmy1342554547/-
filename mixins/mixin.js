module.exports = {
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
