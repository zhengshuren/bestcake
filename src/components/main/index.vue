<template>
  <div class="hello">
    <!-- <h1 class="test">{{msg}}</h1> -->
    <!-- <layHeader></layHeader> -->
    <!-- https://res.bestcake.com/m-images/banner_new/368311689846465800.jpg?v=2 -->
    <div class="city" @click="cityFlag = true">
      {{this.$store.state.City}}
    </div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item, index) in bannerImg" :key="index"><a href="#"><img :src="item" alt=""></a></mt-swipe-item>
    </mt-swipe>
    <div class="banner">
      <div class="icon-banner" v-for="(item, index) in activeIco" :key="index">
        <div>
          <a href="#">
            <div class="icon-img">
              <img :src="item.ImgUrl" alt="">
            </div>
          </a>
          <div class="icon-title">{{item.ActName}}</div>
        </div>
      </div>
    </div>
    <div class="advertising">
      <div>
        <span><img src="https://res.bestcake.com/m-images-2/guanggao1.png?v=0419" alt="" @click="toshow('宠爱少女')"></span>
      </div>
      <div>
        <span v-for="(item, index) in iconImgList" :key="index"><img :src="item.ImgUrl" alt="" v-on:click="toshow(item.name)"></span>
      </div>
    </div>
    <!-- 魔法猜心 -->
    <img class="special" src="https://res.bestcake.com/m-images-2/mofa.png" alt="">
    <div class="special-title">任选一款，走进你的心</div>
    <div class="mofa-tab">
      <div v-for="(item, index) in tabClass" :key="index" @click="setTab(index)" :class="tabActive==index?'active':''">
        {{item}}
      </div>
    </div>
    <div class="mofa-list">
      <div class="mofa-caka" v-for="(item, index) in activeList" :key="index">
        <img :src="item.ImgUrl" alt="" v-on:click="toshow(item.Name, item.SupplyNo)">
        <p class="cake-name">{{item.Name}}</p>
        <p class="mofa-price"><span style="color: rgb(255, 51, 0);font-size: 4.267vw;">￥{{item.CurrentPrice}}</span>
        /<span style="color: rgb(212, 212, 212);font-size: 3.2vw;margin-left: 1.067vw;">{{item.Size}}</span></p>
      </div>
    </div>
    <!-- 品质臻选 -->
    <img class="special" src="https://res.bestcake.com/m-images-2/pinzhi.png" alt="">
    <div class="special-title">没尝过这些美味的人生，是不完美的</div>
    <div class="pinzhi-list" v-for="(item, index) in goodList" :key="index">
      <div class="pinzhi-img">
        <!-- <img v-lazy="item.ImgUrl" alt="" width="300" height="150"/> -->
        <img :src="item.ImgUrl" alt="" @click="toshow(item.Name, item.SupplyNo)">
      </div>
      <div class="pinzhi-detail">
        <p class="pinzhi-name">{{item.Name}}</p>
        <p class="pinzhi-info">{{item.MoreUrl}}</p>
        <div class="pinzhi-tip">
          <img v-if="item.flag" src="https://res.bestcake.com/m-images-2/icon_zy.png" alt="">
          <img v-else src="https://res.bestcake.com/m-images-2/icon_yx.png" alt="">
          </div>
        <!-- https://res.bestcake.com/m-images-2/icon_yx.png -->
        <p class="pinzhi-price">
          <span style="color: rgb(255, 51, 0);font-size: 3.2vw;line-height: .6rem">￥{{item.CurrentPrice}}</span>
          <span style="color: rgb(212, 212, 212);font-size: 3.2vw;margin-left: 1.067vw;line-height: .6rem">/ {{item.Size}}</span>
        </p>
      </div>
      <div class="pinzhi-cart">
        <img src="https://res.bestcake.com/m-images-2/pinzhi-cart.png" alt="" @click="addCart(item, $event)">
        </div>
    </div>
    <div class="c_city" v-show="cityFlag">
      <div class="chooseCity">
        <div class="chooseTitle">
          <span>选择城市</span>
        </div>
        <ul @click="selectCity($event)">
          <li><span>上海</span></li>
          <li><span>北京</span></li>
          <li><span>天津</span></li>
          <li><span>重庆</span></li>
        </ul>
        <ul @click="selectCity($event)">
          <li><span>苏州</span></li>
          <li><span>无锡</span></li>
          <li><span>南京</span></li>
          <li><span>杭州</span></li>
          <li><span>宁波</span></li>
          <li><span>绍兴</span></li>
          <li><span>成都</span></li>
          <li><span>常州</span></li>
          <li><span>台州</span></li>
          <li><span>嘉兴</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// import layHeader from '@/components/layout/lay_header'
// @import "@/common/css/reset.css";
// import './../../common/js/flyCarts'
import { Toast } from 'mint-ui'

export default {
  data () {
    return {
      // msg: 'Welcome to Your Vue.js App'
      // 魔法猜心Tab
      tabClass: ['送恋人', '送挚友', '送长者', '送亲子'],
      // 选中的内容
      activeList:[],
      tabActive:0,
      // 魔法猜心所有数据
      mofaList: [],
      // 品质甄选所有数据
      goodList: [],
      // 轮播图图片
      bannerImg: [],
      // 底部tab栏信息
      iconMsg: [],
      // 3张焦点图数据
      iconImgList: [{
        name: "小猪蛋糕-贝利",
        key: "贝丽",
        ImgUrl: "https://res.bestcake.com/m-images-2/guangao22.png?v=0419"
      },
      {
        name: "星光游乐园",
        key: "星光游乐园",
        ImgUrl: "https://res.bestcake.com/m-images-2/guanggao3.png"
      }],
      cityFlag: false,
      activeIco: []
    }
  },
  mounted() {
    // 轮播图的图
    this.$apis.GetBannerList().then(res => {
      // console.log(res.data.Tag.List);
      res.data.Tag.List.forEach(element => {
        let url = 'https://res.bestcake.com' + element.ImgUrl;
        this.bannerImg.push(url);
      });
    });
    // 获取小图标数据
    this.$apis.NewIndexController().then(res => {
      this.iconMsg = res.data.Tag.mainresult.TopIconList;
      // console.log(res.data.Tag.mainresult.TopIconList);
      
    })
    // 获取商品数据
    this.$apis.GetIndexCakeList().then(res => {
      // 小图标
      // this.iconMsg = res.data.Tag.iconList;
      // 全部数据
      res.data.Tag.list.forEach(element => {
        let flag = (element.SupplyNo.indexOf("RP") === -1);
        element.flag = flag;
        if (element.TabType == 4) {
          // 魔法猜心数据
          this.mofaList.push(element);
        } else {
          // 品质臻选数据
          this.goodList.push(element);
        }
      })
      this.selectIco();
      this.setTab(0);
    });
  },
  methods: {
    // 筛选小图标
    selectIco () {
      let tempIco = [];
      this.iconMsg.forEach(item => {
        if (item.City.indexOf(this.$store.state.City) !== -1) {
          tempIco.push(item);
        }
      });
      this.activeIco = tempIco;
    },
    // 城市选择
    selectCity (e) {
      // console.log(e.path[0].innerText);
      this.cityFlag = false;
      this.$store.state.City = e.path[0].innerText;
      this.selectIco();
    },
    // 飞入购物车
    addCart (item, e) {
      // console.log(item);
      // 数据处理
      let obj = {
        Price: item.CurrentPrice,
        Name: item.Name,
        Id: item.Pid,
        ImgUrl: item.ImgUrl,
        Size: item.Size,
        SupplyNo: item.SupplyNo
      }
      this.$store.commit("add", obj);
      flay(item.ImgUrl, e);
      setTimeout(() => {
        let instance = Toast('添加成功');
        setTimeout (() => {
          instance.close();
        }, 2000);
      }, 500);
    },
    // 魔法猜心Tab栏数据
    setTab (index) {
      let tempList = [];
      // console.log(this.mofaList)
      this.mofaList.forEach(element => {
        if (element.ActiveName == this.tabClass[index]) {
          tempList.push(element);
        }
      });
      this.activeList = tempList.slice(0,3);
      // console.log(this.activeList);
      this.tabActive = index;
    },
    // 跳转至详情页
    toshow (key, c) {
      // key为蛋糕名称
      // console.log(key)
      // console.log(c);
      c = c ? c : 'NS'
      this.$router.push({
        path: '/show',
        query: {key, c}
      })
    }
  }
}

function flay(img, e){
  // console.log(e,$);
  var flyer=$(`<img style="width:20vw;height:20vw;" class="flyer-img" src="${img}">`);
  var top=$(window).scrollTop();
  var dh=event.pageY;
  var newh=dh-top;
  //  购物车节点位置,决定图片飘的位置
  var oBtn=$(".circ").offset();
  var newdh=oBtn.top-top; 
  //  console.dir(flyer);

  flyer.fly({   
    start: {   
      left: event.pageX,//抛物体起点横坐标   
      top:newh //抛物体起点纵坐标   
      },   
      end: {   
        left: oBtn.left - 45,//抛物体终点横坐标   
          top: newdh  //抛物体终点纵坐标   
        },   
      onEnd: function() {   
        this.destory(); //销毁抛物体   
      }   
  });   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
  @import "./../../common/css/HelloWorld.scss"
</style>
