import { create } from "domain";

export default (Vue) => {
  Vue.directive('thisname', el => {
    el.onclick = function () {
      alert('OK')
    }
  });

  Vue.directive ('fileOnload', (el, binding, vnode, oldVnode) =>{
    // 创建节点
    function createNode (data) {
      let node = document.createElement('input');
      node.type = 'file';
      node.accept = 'image/jpeg, image/jpg, image/png';
      node.style.display = 'none';
      node.multiple = data.multiple ? 'multiple' : '';
      el.prepend(node);
      el.onclick = function() {
        el.children[0].click();
      }
    }
    // 创建节点
    createNode(binding.value);
    let fileInput = el.children[0];
    fileInput.onchange = function (event) {
      //当用户上传图片了,拿到事件对象
      var event = event || window.event;
      // 在事件对象下面去求  file文件对象
      var file = event.target.files[0];
      vnode.context[binding.value.fn](window.URL.createObjectURL(file));
    }

  });
  
}
