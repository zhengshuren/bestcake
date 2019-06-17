export default (Vue) => {
  Vue.directive('thisname', el => {
    el.onclick = function () {
      alert('OK')
    }
  })
}
