<template>
  <div class="ad">
    <div class="daContent" v-for="(item, index) in ad_content" :key="index">
        <div class="title">
            {{item.title}}
        </div>
        <div class="text">
            {{item.text}}
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ad_content: [
        {title: '划线价格', text: '商品的专柜价、吊牌价、正品零售价、厂商指导价或该商品的曾经展示过的销售价等，并非原价，仅供参考。'},
        {title: '未划线价格', text: '商品的实时标价，不因表述的差异改变性质。具体成交价格根据商品参加活动，或会员使用优惠券、积分等发生变化，最终以订单结算页价格为准。'}
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.ad {
    padding: 4vw 0;
    overflow: hidden;
}
.daContent {
    margin: 0 4vw;
    font-size: 3.734vw;
    margin-bottom: 4vw;
    display: flex;
    justify-content: space-between;
    .title {
        width: 27vw;
        color: #181818;
    }
    .text {
        width: 65vw;
        color: #a2a2a2;
        line-height: .6rem;
    }
}
</style>
