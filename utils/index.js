// 工具方法集合
import time from './time.js'; // 格式化时间
import common from './common.js'; // 常用
import map from './map.js'; // 地图
import state from './state.js'; // 设置,获取Vux数据

export default {
    ...time,
    ...common,
    ...map,
    ...state,
}
