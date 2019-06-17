<template>
  <div class="hello">
    <div class="cart-list">
      <div class="carts-good" v-for="(item, index) in this.$store.state.cartList" :key="index">
        <div class="choose">
          <img v-if="item.flag" src="https://res.bestcake.com/m-images/order/mw_firm_duihao_1.jpg" alt=""  @click="changGoodState(item)">
          <img v-else src="https://res.bestcake.com/m-images/order/mw_firm_duihao_2.jpg" alt="" @click="changGoodState(item)">
        </div>

        <div class="goodImg">
          <img :src="item.ImgUrl" alt="">
        </div>
        <div class="good-info">
          <p class="goodTitle">{{item.Name}}</p>
          <div class="goodSize">
            <span>{{item.Size}}</span>
            <div class="goodnum">
                <img v-if="item.buyNumber === 1" src="https://res.bestcake.com/m-images/ww/detail/reduce-0.png" alt="" @click="subnum(item)">
                <img v-else src="https://res.bestcake.com/m-images/ww/detail/reduce-1.png" alt="" @click="subnum(item)">
                <span>{{item.buyNumber}}</span>
                <img src="https://res.bestcake.com/m-images/ww/detail/add.png" alt="" @click="addnum(item)">
            </div>
          </div>
          <p class="goodPrice">{{item.Price * item.buyNumber}}</p>
        </div>
        <div class="discount">
          <span class="way">优惠方式</span>
          <span class="content">不参与活动</span>
        </div>
      </div>
    </div>
    <!-- 推荐 -->
    <div class="Recommend">
      <div class="Recommend-title">
        <p style="line-height: 7.46vw; color: #333; font-weight: bold; font-size: 6.4vw;">Hot  Recommend</p>
        <div class="line">
          <p></p>
        </div>
        <p style="line-height: 4vw; color: #333; font-weight: bold; font-size: 4vw;">热销新品推荐</p>
      </div>
      <div class="content">
        <div class="good">
          <div class="goodImg">
            <img src="https://res.bestcake.com\m-images\cart\mw_firm_sq.jpg" alt="" @click="toshow('吉致生巧', 'JZ')">
          </div>
          <div class="goodInfo">
            <p>伴手礼系列-吉致生巧</p>
            <p>168.00<span style="font-weight:normal">/一盒</span></p>
            <div class="buy">
              <img src="https://res.bestcake.com\m-images\order\mw_firm_gwc.jpg" alt="">
            </div>
          </div>
        </div>
        <div class="good">
          <div class="goodImg">
            <img src="https://res.bestcake.com\m-images\cart\mw_firm_nzt_v1.jpg" alt="" @click="toshow('吉致牛轧糖(巴旦木味)', 'JZ')">
          </div>
          <div class="goodInfo">
            <p>伴手礼系列-吉致牛轧糖</p>
            <p>68.00<span style="font-weight:normal">/十六粒装</span></p>
            <div class="buy">
              <img src="https://res.bestcake.com\m-images\order\mw_firm_gwc.jpg" alt="">
            </div>
          </div>
        </div>
        <div class="good">
          <div class="goodImg">
            <img src="https://res.bestcake.com\m-images\cart\mw_firm_pf_v1.jpg" alt="" @click="toshow('吉致泡芙', 'JZ')">
          </div>
          <div class="goodInfo">
            <p>伴手礼系列-吉致泡芙</p>
            <p>88.00<span  style="font-weight:normal">/0.8磅</span></p>
            <div class="buy">
              <img src="https://res.bestcake.com\m-images\order\mw_firm_gwc.jpg" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="footer">
      <div class="chooseAll">
        <img v-if="selectStatus" src="https://res.bestcake.com/m-images/order/mw_firm_duihao_1.jpg" alt="">
        <img v-else src="https://res.bestcake.com/m-images/order/mw_firm_duihao_2.jpg" alt="">
        <span @click="selectIt">全选</span>
      </div>
      <div class="cleanCarts">
        <p @click="clearAll">清空</p>
      </div>
      <div class="count">
        <p class="text">合计：<span style="font-size: 4.8vw;color: #f2495e;font-weight: bold;">{{countMoney}}</span></p>
        <p class="discount">已优惠: 0.00</p>
      </div>
      <div class="buynow"><button @click="payfor">立即结算</button></div>
    </div>
    <!-- <mt-button type="danger">danger</mt-button> -->
    <!-- <router-view/> -->
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import { Toast } from 'mint-ui';
// import Mock from 'mockjs'
export default {
  name: 'HelloWorld',
  data () {
    return {
      selected: '',
      countMoney: 0,
      selectStatus: true
    }
  },
  mounted () {
    this.countMoney = 0;
    this.$store.state.cartList.forEach(item => {
      item.flag = true;
      this.countMoney += item.buyNumber * item.Price;
    });
  },
  methods: {
    // 清空购物车
    clearAll () {
      MessageBox.confirm('确定清空购物车?').then(action => {
        this.$store.state.cartList = [];
        this.$store.state.cartNum = 0;
        this.count();
        this.$store.commit('updateStore'); 
        let instance = Toast('购物车已清空');
        setTimeout (() => {
          instance.close();
        }, 2000);
      }).catch(() => {
      });
      
    },
    // 结算购物车
    payfor () {
      if (!this.$store.state.loginInfo) {
        this.$router.push({
          path: '/login',
        });
        return;
      }
      MessageBox.confirm('确定结算订单?').then(action => {
        this.$store.commit('delCarts');
        // 总额改变
        this.count();
        let instance = Toast('结算成功');
        setTimeout (() => {
          instance.close();
        }, 2000);
      }).catch(() => {
        return;
      });
    },
    // 全选或全部选
    selectIt () {
      this.selectStatus = !this.selectStatus;
      this.$store.state.cartList.forEach(item => {
			  item.flag = this.selectStatus;
      });
      this.count();
      this.$store.commit('updateStore');
      
    },
    // 跳转至详情页
    toshow (key, c) {
      this.$router.push({
        path: '/show',
        query: {key, c}
      })
    },  
    changGoodState (cartsGood) {
      this.$store.commit("changeState", cartsGood);
      this.count();
      this.isAll();
    },
    addnum (cartsGood) {
      this.$store.commit("addnum", cartsGood);
      this.count ();
    },
    subnum (cartsGood) {
      if (cartsGood.buyNumber !==1) {
        this.$store.commit("subnum", cartsGood);
        this.count ();
      }
    },
    count () {
      this.countMoney = 0;
      this.$store.state.cartList.forEach(item => {
        if (item.flag) {
          this.countMoney += item.buyNumber * item.Price;
        }
      });
    },
    // 判断是否全选
    isAll () {
      this.count();
      this.selectStatus = true;
      this.$store.state.cartList.forEach(item => {
			  if (!item.flag) {
          this.selectStatus = false;
          return
        }
		  });
    }
  }
  // beforeRouteEnter (to, from, next) {
  //   console.log('组件路由进入触发');
  //   // console.log(to)
  //   // console.log(from)
  //   next()
  // },
  // beforeRouteUpdate (to, from, next) {
  //   console.log('子路由进入触发')
  //   next()
  // },
  // beforeRouteLeave (to, from, next) {
  //   console.log('子路由离开触发')
  //   next()
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "./../../common/css/carts.scss"
</style>
