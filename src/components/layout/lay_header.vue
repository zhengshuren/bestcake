<template>
  <div class="hello">
    <mt-tabbar class="tab" v-model="selected" :fixed="true">
      <mt-tab-item v-for="(item, index) in routePath" :key="index" :id="item.key" @click.native="tab(index)">
        <!-- <img slot="icon" src="../assets/100x100.png"> -->
        <p><i :class="item.ico"></i></p>
        <span style="line-height: .8rem;">{{item.name}}</span>
      </mt-tab-item>
      <div class="circ" v-if="this.$store.state.cartNum >= 1 || $route.path === '/index' || $route.path === '/class'">
        <span v-if="this.$store.state.cartNum >= 1">{{this.$store.state.cartNum}}</span>
      </div>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selected: "",
      // num:  this.$store.state.num,
      routePath: [
        {name: '首页', path: '/index', key: 'index', ico:['fa','fa-home','fa-lg']}, 
        {name: '分类', path: '/class', key: 'class', ico:['fa','fa-clone','fa-lg']}, 
        {name: '购物车', path: '/carts', key: 'carts', ico:['fa','fa-shopping-cart','fa-lg']},
        {name: '我的', path: '/user', key: 'user', ico:['fa','fa-user-o','fa-lg']}
        ]
    }
  },
  methods: {
    tab (index) {
      // console.log(this.$store.state.loginInfo);
      if (index === 3 && !this.$store.state.loginInfo) {
        this.$router.push({
          path: '/login',
        });
      } else {
        this.$router.push({
          path: this.routePath[index].path
        });
      }
      
    } 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.mint-tabbar {
  background: white;
}
.tab {
  border-top: 1px solid #e5e5e5;
}
.hello {
  color: #999;
}
.hello p {
  font-size: .6rem;
  line-height: 1rem;
}
.circ {
  width: 4.6vw;
  height: 4.6vw;
  border-radius: 50%;
  background: red;
  position: absolute;
  bottom: 14vw;
  left: 64vw;
  color: white;
  line-height: 4.6vw;
  text-align: center;
}
</style>
