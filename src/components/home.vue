<template>
  <div class="hello">
    <layHeader v-if="!(($route.path === '/show') || ($route.path === '/login') || ($route.path === '/info') || ($route.path === '/comments'))"></layHeader>
    <router-view v-wechat-title="$route.meta.title"/>
    <layAdvertising  v-if="!(($route.path === '/carts') || ($route.path === '/user') || ($route.path === '/login') || ($route.path === '/info') || ($route.path === '/comments'))"></layAdvertising>
    <div class="empty" v-if="!(($route.path === '/carts') || ($route.path === '/user') || ($route.path === '/login') || ($route.path === '/info') || ($route.path === '/comments'))"></div>
  </div>
</template>

<script>
import layHeader from '@/components/layout/lay_header'
import layAdvertising from '@/components/layout/lay_advertising'
export default {
  data () {
    return {
    }
  },
  mounted () {
    // console.log(this.$route.path);
    
    this.$store.commit('vuexInit');
    if (this.$route.path === '/user' && !this.$store.state.loginInfo) {
      this.$router.push({
        path: '/login',
      });
    }
  },
  components: {
    layHeader,
    layAdvertising
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.empty {
  height: 20vw;
}
</style>
