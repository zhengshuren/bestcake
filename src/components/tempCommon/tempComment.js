import { Swipe, SwipeItem } from 'mint-ui'
import { Tabbar, TabItem } from 'mint-ui'
import { Field } from 'mint-ui'
import { Button } from 'mint-ui'
import { Cell } from 'mint-ui'

export default (Vue) => {
//   定义全局组件
  // mint-ui轮播图
  Vue.component(Swipe.name, Swipe)
  Vue.component(SwipeItem.name, SwipeItem)
  // mint-ui底部切换栏
  Vue.component(Tabbar.name, Tabbar);
  Vue.component(TabItem.name, TabItem);
  Vue.component(Field.name, Field);
  Vue.component(Button.name, Button);
  Vue.component(Cell.name, Cell);
  Vue.component('test', el => {
    // template: '<h1>hello Vue</h1>'
  })
}
