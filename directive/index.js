import Vue from "vue";
import uToast from "../uview-ui/components/u-toast/u-toast.vue";

Vue.directive('init', {
	bind: function(el) {
		let dom = document.createElement('u-toast');
		dom.className = 'test'
		dom.setAttribute('ref','uToast');
		console.log(dom.attributes);
		el.appendChild(dom);
	}
})
