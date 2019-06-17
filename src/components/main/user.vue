<template>
  <div class="hello">
    <!-- <h1>我是测试页</h1> -->
    <div class="personInfo" v-if="this.$store.state.loginInfo.name">
      <div class="personImg">
        <img v-if="this.$store.state.loginInfo.avatar" :src="this.$store.state.loginInfo.avatar" alt="" @click="checkInfo">
        <img v-else src="http://m.bestcake.com/images/icon_user.jpg" alt="" @click="checkInfo">
        <div class="username">{{this.$store.state.loginInfo.name}}</div>
      </div>
      <div class="vipLevels">
        <div class="person">
          <p class="title">会员等级</p>
          <p class="content">V{{this.$store.state.loginInfo.Levels}}</p>
        </div>
        <div class="person">
          <p class="title">吉致币</p>
          <p class="content">{{this.$store.state.loginInfo.Coin}}</p>
        </div>
        <div class="person">
          <p class="title">优惠卷</p>
          <p class="content">{{this.$store.state.loginInfo.discount}}</p>
        </div>
        <div class="person">
          <p class="title">兑换券</p>
          <p class="content">{{this.$store.state.loginInfo.duihuan}}</p>
        </div>
      </div>
    </div>
    <div class="otherInfo">
      <div class="myOrder">
        <div class="info-left">
          <img src="https://res.bestcake.com\m-images\order\mw-person-dd.png" alt="">
          <p>我的订单</p>
        </div>
        <img src="https://res.bestcake.com\m-images\order\mw_firm_right.jpg" alt="">
      </div>
      <div class="line"></div>
      <div class="myAddress">
        <div class="info-left">
          <img src="https://res.bestcake.com\m-images\order\mw_firm_ad.jpg" alt="">
          <p>我的地址</p>
        </div>
        <img src="https://res.bestcake.com\m-images\order\mw_firm_right.jpg" alt="">
      </div>
    </div>
    <div class="footer">
      <div class="footer-tel">
        <span>客服热线：400-627-5757</span>
      </div>
      <div class="footer-info">
        <span>服务协议与证照信息</span>
      </div>
    </div>
    <!-- <router-view/> -->
</div>
</template>

<script>
import Mock from "mockjs";
export default {
  name: 'HelloWorld',
  data () {
    return {
      // vipLevelsList: []
    }
  },
  mounted () {
    // console.log(this.$store.state.loginInfo);
  },
  methods: {
    checkInfo () {
      this.$router.push({
        path: '/info',
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "./../../common/css/user.scss"
</style>
