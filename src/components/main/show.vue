<template>
  <!-- <div class="hello">
    <h1>我是测试页</h1>
</div> -->
  <div class="show">
    <div class="banner">
      <mt-swipe :auto="10000">
        <mt-swipe-item v-for="(item, index) in bannerImg" :key="index"><a href="#"><img :src="item" alt=""></a></mt-swipe-item>
      </mt-swipe>
      <div class="moreCake" @click="toClass">更多商品</div>
      <div class="cakeName">
        <p>{{cakeName}}</p>
      </div>
      <div class="promotion"><p v-if="newFlag">新</p></div>
    </div>
    <div class="cakeDatil">
      <div class="cakeInfo" v-for="(item, index) in cakeInfoList" :key="index">
        <div class="cake-info-left">
          <p>{{item.name}}</p>
        </div>
        <div class="cake-info-right">
          <img v-if="item.name === '甜度'"  :src="item.content" alt="">
          <p v-else>{{item.content}}</p>
        </div>
      </div>
    </div>
    <div class="goodsComment">
      <div class="goodsComment-left">
        <i class= "fa fa-commenting-o fa-lg" style="font-size:4.2vm;font-weight: 900;color:#333"></i>
        <span style="padding-left:3.6vw">商品评论</span>
      </div>
      <div class="goodsComment-right" style="color: #9A9A9A;" @click="checkComment(ID)">
        <span>({{commentCount}}条)</span>
      </div>
    </div>
    <div class="sizeTab">
      <ul>
        <li v-for="(item, index) in cakeSizeList" :key="index" v-on:click="sizeTab(index)" :class="active==index?'active':''">
          <span v-if="item.Size">{{item.Size}}</span>
          <span v-else>{{item}}</span>
        </li>
      </ul>
      <div class="userRecment">
        <ul>
          <li v-if="selectRecmment.size">
            <img :src="setRecmmentURL(1)" alt="">
            <span>{{selectRecmment.size}}</span>
          </li>
          <li v-if="selectRecmment.people">
            <img :src="setRecmmentURL(2)" alt="">
            <span>{{selectRecmment.people}}</span>
          </li>
          <li v-if="selectRecmment.tool">
            <img :src="setRecmmentURL(3)" alt="">
            <span>{{selectRecmment.tool}}</span>
          </li>
          <li v-if="selectRecmment.order">
            <img :src="setRecmmentURL(4)" alt="">
            <span>{{selectRecmment.order}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="goodnum">
      <div class="goodnum_left">购买数量</div>
      <div class="goodnum_right">
        <img v-if="num === 1" src="https://res.bestcake.com/m-images/ww/detail/reduce-0.png" alt="" @click="down">
        <img v-else src="https://res.bestcake.com/m-images/ww/detail/reduce-1.png" alt="" @click="down">
        <span>{{num}}</span>
        <img src="https://res.bestcake.com/m-images/ww/detail/add.png" alt="" @click="add">
      </div>
    </div>
    <mt-tabbar v-model="selected" :fixed="true">
      <mt-tab-item>
       <p class="count">{{Money * num}}</p>
       <p class="discount">已优惠0.00</p>
      </mt-tab-item>
      <mt-tab-item>
       <p class="add_text" @click="addCarts">加入购物车</p>
      </mt-tab-item>
      <mt-tab-item>
       <div class="buynow"><button @click="buyit">立即购买</button></div>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import { Toast } from 'mint-ui'

export default {
  name: 'HelloWorld',
  data () {
    return {
      selected: '',
      // 轮播图图片
      bannerImg: [],
      // 蛋糕名称
      cakeName: '',
      // 蛋糕详情界面
      cakeInfoList: [],
      // 蛋糕尺寸信息
      cakeSizeList: [],
      // 评论数量
      commentCount: 0,
      // 甜度
      SweetURL: 0,
      // 选中的用餐建议
      selectRecmment: {},
      // 状态
      active: 0,
      // 数量
      num: 1,
      // 单价
      Money: 0,
      // 蛋糕信息
      cakeDate: {},
      newFlag: false,
      // 当前商品的
      ID: 0
    }
  },
  mounted () {
    // console.log(this.$route.query);
    this.cakeName = this.$route.query.key;
    if (this.$route.query.c.indexOf("KSK") != -1) {
      this.newFlag = false;
      this.setBannerImg ('jd-detail');
      this.setGetCakeByName();
    } else if (this.$route.query.c.indexOf("NS") != -1) {
      this.newFlag = true;
      this.setBannerImg ('ns-detail');
      this.setGetNSCakeByName();
    } else if (this.$route.query.c.indexOf("RP") != -1) {
      this.newFlag = true;
      this.setBannerImg ('rp-detail');
      this.setGetRuPCakeByName();
    } else {
      this.newFlag = false;
      // this.setGetCakeByName();
      this.setBannerImg ('jz-detail');
      this.setGetjzCakeInfo(); 
    } 
  },
  methods: {
    // 查看评论
    checkComment (id) {
      this.$router.push({
        path: '/comments',
        query: {id}
      });
    },
    // 立即购买
    buyit () {
      if (!this.$store.state.loginInfo) {
        this.$router.push({
          path: '/login',
        });
        return;
      }
      MessageBox.confirm('确定购买?').then(action => {
        let instance = Toast('购买成功');
        setTimeout (() => {
          instance.close();
        }, 2000);
      }).catch(() => {
        return;
      });
    },
    // 点击加号
    add () {
      this.num++;
      // console.log(this.buynumber);
    },
    down () {
      if (this.num === 1) {
        return;
      }
      this.num--;
    },
    // 加入购物车
    addCarts () {
      // 数据处理
      let obj = {
        Price: this.Money,
        buyNumber: this.num,
        Name: this.cakeName,
        Id: this.cakeDate.id,
        // ImgUrl: 'ImgUrl',
        Size: this.cakeDate.size,
        SupplyNo: this.cakeDate.SupplyNo
      }
      switch (true) {
        case obj.SupplyNo.indexOf ('KSK') !== -1 :
          obj.ImgUrl = `https://res.bestcake.com/m-images/ww/jd/${obj.Name}.png?v=14`;
          break;
        case obj.SupplyNo.indexOf ('NS') !== -1 :
          obj.ImgUrl = `https://res.bestcake.com/m-images/ww/ns/${obj.Name}.jpg?v=14`;
          break;
        case obj.SupplyNo.indexOf ('RP') !== -1 :
          obj.ImgUrl = `https://res.bestcake.com/m-images/ww/rp/${obj.Name}.jpg?v=14`;
          break;
        case obj.SupplyNo.indexOf ('JZ') !== -1 :
          obj.ImgUrl = `https://res.bestcake.com/m-images/ww/jz/${obj.Name}.png?v=14`;
          break;
        default : break;
      }
      
      this.$store.commit("add", obj);
      MessageBox.confirm('添加成功是否去结算?').then(action => {
        this.$router.push({
        path: '/carts',
      })
      }).catch (() => {
      });
    },
    // 设置轮播图片
    setBannerImg (path) {
      for (let i =0; i < 4; i++) {
        let str = `https://res.bestcake.com/m-images/${path}/${
          this.$route.query.key
        }/${this.$route.query.key}-${i + 1}.jpg`;
        this.bannerImg.push(str);
      }
      // console.log(this.bannerImg);
    },
    // 读取蛋糕甜度
    setCakeSweet (index) {
      return this.cakeSizeList[index].Sweet;
    },
    // 读取评论数量
    setCommentCount (index) {
      this.$apis.getAssessCakeInfo(index).then(item => {
        // console.log(item.data.Tag.count);
        this.commentCount = item.data.Tag.count;
      });
    },
    // 建议的小图标
    setRecmmentURL (index) {
      return `https://res.bestcake.com/m-images/ww/detail/icon-custom-${index}.png`;
    },
    // 选中的建议
    setselectRecmment (index) {
      // this.selectRecmment = this.$store.state.allRecmment[index];
      if (this.cakeSizeList[index].Size && this.cakeSizeList[index].Size.indexOf('磅') !== -1) {
        for(let item in this.$store.state.allRecmment) {
          if (Number.parseFloat(this.cakeSizeList[index].Size) < Number.parseInt(this.$store.state.allRecmment[item].other)) {
            this.selectRecmment = this.$store.state.allRecmment[item];
            break;
          }
        }
      } else if (this.$route.query.c.indexOf("NS") != -1) {
        this.selectRecmment = this.$store.state.allRecmment[4];
      }
    },
    // 跳转到分类页
    toClass () {
      this.$router.push({
        path: '/class'
      })
    },
    // size的tab的跳转
    sizeTab (index) {
      // 甜度改变
      this.setCakeSweet(index);
      // 评论数量改变
      if(this.cakeSizeList[index].Id) {
        this.setCommentCount(this.cakeSizeList[index].Id);
        this.ID = this.cakeSizeList[index].Id;
      } else {
        this.setCommentCount(this.cakeSizeList[index].ID);
        this.ID = this.cakeSizeList[index].ID;
      }
      
      // 建议人数改变
      this.setselectRecmment(index);
      this.active = index;
      this.Money = this.cakeSizeList[index].CurrentPrice ? this.cakeSizeList[index].CurrentPrice : this.Money;
      // console.log(this.cakeSizeList[index]);
      this.cakeDate.size = this.cakeSizeList[index].Size;
      this.cakeDate.SupplyNo =  this.cakeSizeList[index].SupplyNo ? this.cakeSizeList[index].SupplyNo : this.Money;
    },
    // KSK的数据
    setGetCakeByName () {
      this.$apis.GetCakeByName({
        name: this.$route.query.key
      }).then(res => {
        this.cakeSizeList = res.data.Tag.infos.CakeType;
        this.Money = res.data.Tag.infos.CakeType[0].CurrentPrice;
        this.SweetURL = `https://res.bestcake.com/m-images/ww/jz/tiandu_${this.setCakeSweet(0)}.png`
        this.cakeInfoList = [
          {name: '甜度', content: this.SweetURL},
          {name: '口味', content: res.data.Tag.infos.CategoryName},
          {name: '原材料', content: res.data.Tag.infos.Resourse},
          {name: '适合人群', content: JSON.parse(res.data.Tag.Detail[0]).details_tips},
          {name: '保鲜条件', content: res.data.Tag.infos.KeepFresh}
        ]
        this.setCommentCount (this.cakeSizeList[0].Id);
        this.ID = this.cakeSizeList[0].Id;
        this.setselectRecmment (0);
        this.cakeDate.size = res.data.Tag.infos.CakeType[0].Size;
        this.cakeDate.SupplyNo = res.data.Tag.infos.CakeType[0].SupplyNo;
        this.cakeDate.id = this.cakeSizeList[0].Id;
        // console.log(this.cakeInfoList);
      });
    },
    // RP的数据
    setGetRuPCakeByName () {
      this.$apis.GetRuPCakeByName({
        name: this.$route.query.key
      }).then(res => {
        // console.log(item.data.Tag);
        let tempList = [];
        res.data.Tag.forEach(item => {
          if (item.City === '上海') {
            tempList.push(item);
          }
        });
        // tempList = Array.from(new Set(tempList));
        this.cakeSizeList = tempList;
        this.Money = res.data.Tag[0].CurrentPrice;
        this.SweetURL = `https://res.bestcake.com/m-images/ww/jz/tiandu_${res.data.Tag[0].Sweet}.png`;
        this.cakeInfoList = [
          {name: '甜度', content: this.SweetURL},
          {name: '口味', content: res.data.Tag[0].CategoryName},
          {name: '原材料', content: res.data.Tag[0].Resource},
          {name: '适合人群', content: JSON.parse(res.data.Tag[0].Details).details_tips},
          {name: '保鲜条件', content: res.data.Tag[0].KeepFresh}
        ]
        this.setCommentCount (res.data.Tag[0].ID);
        console.log(res.data.Tag[0].ID);
        
        this.ID = res.data.Tag[0].ID;
        this.recmmentFlag = false;
        this.cakeDate.size = res.data.Tag[0].Size;
        this.cakeDate.SupplyNo = res.data.Tag[0].SupplyNo;
        this.cakeDate.id =res.data.Tag[0].ID;
      });
    },
    // JZ的数据
    setGetjzCakeInfo () {
      this.$apis.GetjzCakeInfo({
        name: this.$route.query.key
      }).then(res => {
        // console.log(item.data.Tag);
        let tempList = [];
        let index = 0;
        res.data.Tag.forEach(item => {
          let temp = {
            Size: item.KW,
            Id: item.CakeType[index].Id
          } 
          index++;
          tempList.push(temp);
        });
        // console.log(tempList);
        this.cakeSizeList = tempList;
        this.Money = res.data.Tag[0].CurrentPrice;
        this.SweetURL = `https://res.bestcake.com/m-images/ww/jz/tiandu_${res.data.Tag[0].CakeType[0].Sweet}.png`;
        this.cakeInfoList = [
          {name: '甜度', content: this.SweetURL},
          {name: '口味', content: res.data.Tag[0].CategoryName},
          {name: '原材料', content: res.data.Tag[0].Resourse},
          {name: '适合人群', content: JSON.parse(res.data.Tag[0].Details).details_tips},
          {name: '保鲜条件', content: res.data.Tag[0].KeepFresh}
        ]
        this.setCommentCount (res.data.Tag[0].ID);
        this.ID = res.data.Tag[0].ID;
        this.setselectRecmment(0);
        this.cakeDate.id = res.data.Tag[0].ID;
        this.cakeDate.size = res.data.Tag[0].Size;
        this.cakeDate.SupplyNo = res.data.Tag[0].SupplyNo;
      });
    },
    // NS的数据
    setGetNSCakeByName () {
      this.$apis.GetNSCakeByName({
        name: this.$route.query.key
      }).then(res => {
        // console.log(item.data.Tag)
        // 上海所有的数据
        let dataList = [];
        let tempList = [];
        res.data.Tag.forEach(item => {
          if (item.City === '上海') {
            dataList.push(item);
          }
        });
        dataList.forEach(item => {
          let temp = {
            Size: item.Size,
            Id: item.ID
          }
          tempList.push(temp);
        })
        this.cakeSizeList = tempList;
        this.Money = dataList[0].CurrentPrice;
        this.SweetURL = `https://res.bestcake.com/m-images/ww/jz/tiandu_${dataList[0].Sweet}.png`
        let bx_str = '最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时。5月1日~10月31日建议2天内食用 11月1日~翌年4月30日建议3天内食用。';
        this.cakeInfoList = [
          {name: '甜度', content: this.SweetURL},
          {name: '口味', content: dataList[0].CategoryName},
          {name: '原材料', content: dataList[0].Resource},
          {name: '适合人群', content: JSON.parse(dataList[0].Details).details_tips},
          {name: '保鲜条件', content: bx_str}
        ]
        this.setCommentCount (this.cakeSizeList[0].Id);
        this.ID = this.cakeSizeList[0].Id;
        this.setselectRecmment (0);
        this.cakeDate.size = this.cakeSizeList[0].Size;
        this.cakeDate.id = this.cakeSizeList[0].Id;
        this.cakeDate.SupplyNo = dataList[0].SupplyNo;
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "./../../common/css/show.scss"
</style>
