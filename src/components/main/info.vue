<template>
  <div class="hello">
    <!-- <h1>我是登录页</h1> -->
    <div>
        <mt-cell title="头像">
            <img :src="this.$store.state.loginInfo.avatar" alt="" class="touxiang" v-fileOnload='setImgInfo'>
        </mt-cell>
        <mt-cell title="ID" :value=this.$store.state.loginInfo.id></mt-cell>
        <mt-cell title="昵称" :value=this.$store.state.loginInfo.name></mt-cell>
        <mt-cell title="用户名"  :value=this.$store.state.loginInfo.username></mt-cell>
        <mt-cell title="等级" :value=this.$store.state.loginInfo.Levels></mt-cell>
    </div>
    <div class="tuichu">
        <div @click="tc">退出登录</div>
    </div>
    <router-view v-wechat-title="$route.meta.title"/>
</div>
</template>

<script>
import Mock from "mockjs";
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
  name: 'HelloWorld',
  data () {
    return {
      flag: true,
      imgURL: '',
      setImgInfo : {
        'fn' : 'fnOnload',
        'multiple' : false
      }
    }
  },
  methods: {
    // 上传头像
    fnOnload (data) {
      this.imgURL = data;
      this.$store.state.loginInfo.avatar = this.imgURL;
      this.$store.commit('changeHeaderImg');
    },
    // 退出登录
    tc () {
      MessageBox.confirm('确定退出?').then(action => {
          let instance = Toast('退出成功！');
          setTimeout(() => {
              instance.close();
          }, 2000);
          this.$store.commit('zhuxiao');
          this.$router.push({
              path: '/index',
          })
      }).catch(err => {
          console.log(err);
      });
        
   }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 /* @import "./../../common/css/login.scss" */
 .hello {
    background: rgb(255, 248, 248);
    overflow: hidden;
    height: 100%;
 }
 .touxiang {
    border-radius: 50%;
    width: 12.2667vw;
    height: 12.2667vw;
    margin: 2.667vw 0;
 }
 .tuichu {
    margin-top: 4vw;
    text-align: center;
    background: #fff;
    overflow: hidden;
    margin-bottom: 93vw;
 }
 .tuichu div {
    color: #f2495e;
    margin-top: 3.867vw;
    margin-bottom: 3.867vw;
    font-size: 3.7334vw;
    line-height: 3.7334vw;
 }
</style>
