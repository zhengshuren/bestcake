<template>
  <div class="classType">
    <div class="listTab">
      <div class="Tab" v-for="(item, index) in listTab" :key="index" :class="index == TabActive ? 'active' : ''" v-on:click="setTopTab(index)">
        {{item}}
      </div>
    </div>
    <div class="list-classify">
      <div class="list-name" v-for="(item, index) in TabActiveList" :key="index" :class="index == childActive ? 'active' : ''" v-on:click="setChildTab(index)" >
        {{item}}
      </div>
    </div>
    <div class="cakeInfo-List">
      <div class="cakeInfo" v-for="(item, index) in chooseCakeData" :key="index">
        <div class="cakeImg">
          <img :src="item.ImgUrl" alt="" v-on:click='toshow(item.Name, item.SupplyNo)'>
        </div>
        <p class="cakeName">{{item.Name}}</p>
        <p class="cakeDtail">{{item.Means}}</p>
        <p class="cakePrice" style="line-height: .6rem">
          <span style="padding-left: 2vw;color: rgb(255, 51, 0);font-size: 4.267vw;">￥{{item.CurrentPrice}}</span>
          <span style="color: rgb(188, 188, 188);font-size: 3.2vw;margin-left: 1.067vw;">/{{item.Size}}</span>
        </p>
        <div class="list-product-e">
          <img src="https://res.bestcake.com\m-images-2\list-cart.png?v=1" alt="" @click="addCarts(item, $event)">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  name: 'HelloWorld',
  data () {
    return {
      listTab: ['自营', '贝式严选'],
      TabActive: 0,
      TabActiveList: [],
      // 自营列表
      zi_list: ['经典', '女神', '伴手礼'],
      // 贝式严选
      bei_list: ['乳品'],
      childActive: 0,
      // 选中的数据
      chooseCakeData: [],
      // 记录选中的位置
      tabIndex: 0,
    }
  },
  mounted () {
    if (this.$route.query.index) {
      //  console.log(this.$route.query);
      this.setTopTab(this.$route.query.index);
      this.setChildTab(this.$route.query.c_index);
    } else {
      this.setTopTab(0);
      this.setChildTab(0);
    }
    
  },
  methods: {
    addCarts (cake, e) {
      // console.log(cake);
      let obj = {
        Price: cake.CurrentPrice,
        Name: cake.Name,
        Id: cake.ID,
        ImgUrl: cake.ImgUrl,
        Size: cake.Size,
        SupplyNo: cake.SupplyNo
      }
      this.$store.commit("add", obj);
      flay(cake.ImgUrl, e);
      setTimeout(() => {
        let instance = Toast('添加成功');
        setTimeout (() => {
          instance.close();
        }, 2000);
      }, 500);
    },
    setTopTab (index) {
      // console.log(this.$store.state.name)
      // 表的切换
      this.TabActive = index;
      if (this.TabActive == 0) {
        this.TabActiveList = this.zi_list;
        this.setChildTab(this.tabIndex);
      } else {
        this.TabActiveList = this.bei_list;
        this.setChildTab(0);
      }
      // this.setChildTab(this.tabIndex);
    },
    setChildTab (index) {
      this.$apis.GetJdListNew().then(res => {
        // console.log(res);
        let tempArray = [];
        var typeObj = {};
        if (this.TabActiveList.length === 1) {
          typeObj = {
            type: 'RP',
            imgtype: 'RP',
            img: 'jpg'
          }
        } else {
          this.tabIndex = index;
          typeObj = this.pdType(index);
        }
        res.data.Tag.cakelist.forEach(item => {
          if (item.SupplyNo.indexOf(typeObj.type) !== -1) {
            item.ImgUrl = `https://res.bestcake.com/m-images/ww/${typeObj.imgtype}/${item.Name}.${typeObj.img}?v=14`
            tempArray.push(item);
          }
        });
        this.chooseCakeData = tempArray;
        // console.log(this.chooseCakeData);
      });
      this.childActive = index;
    },
    // 跳转至详情页
    toshow (key, c) {
      this.$router.push({
        path: '/show',
        query: {key, c}
      })
    },
    // 判断类型
    pdType (index) {
      let obj = '';
      switch (index) {
        case 0: 
          obj = {
            type: 'KSK',
            imgtype: 'jd',
            img: 'png'
          }
          break;
        case 1: 
          obj = {
            type: 'NS',
            imgtype: 'NS',
            img: 'jpg'
          }
          break;
        case 2: 
          obj = {
            type: 'JZ',
            imgtype: 'JZ',
            img: 'png'
          }
          break; 
        default : break;       
      }
      return obj;
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
<style scoped>
  @import "./../../common/css/class.scss"
</style>
