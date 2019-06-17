<template>
  <div class="hello">
    <!-- <h1>我是登录页</h1> -->
    <div class="listTab">
      <div class="Tab" :class="flag ? 'active' : ''" @click="flag = !flag">
        登录
      </div>
      <div class="Tab" :class="!flag ? 'active' : ''" @click="flag = !flag">
        注册
      </div>
    </div>
    <div class="main">
      <div v-if="flag">
        <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
        <div class="btn">
          <mt-button type="primary" size="large" @click="login">登录</mt-button>
        </div>
      </div>
      <div v-else>
        <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password1"></mt-field>
        <mt-field label="确认密码" placeholder="请输入密码" type="password" v-model="password2"></mt-field>
        <mt-field label="昵称" placeholder="请输入昵称" v-model="name"></mt-field>
        <div class="btn">
          <mt-button type="primary" size="large" @click="register">注册</mt-button>
        </div>
      </div>
    </div>
    <input type="file">
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
      username: '',
      password: '',
      password1: '',
      password2: '',
      name: ''
    }
  },
  mounted () {
    
  },
  methods: {
    // 注册
    register () {
      if (this.verify().indexOf('成功') === -1) {
        let instance = Toast({
          message: this.verify(),
          iconClass: 'icon icon-fail'
        });
        setTimeout(() => {
          instance.close();
        }, 1000);
        return;
      }
      this.$apis.mokeRegister({
        username: this.username,
        password: this.password1,
        name: this.name
      }).then (res => {
        // console.log(res.data.msg);
        let instance = Toast({
          message: res.data.msg,
          iconClass: 'icon icon-fail'
        });
        setTimeout(() => {
          instance.close();
        }, 1000);
        this.flag = true;
        return;
      }).catch (err => {
        console.log(err);
      });
      let instance = Toast({
        message: res.data.msg,
        iconClass: 'icon icon-fail'
      });
      setTimeout(() => {
        instance.close();
      }, 1000);
    },
    // 注册验证
    verify () {
      let msg = '注册成功';
      if (this.password1 !== this.password2) {
        msg = '两次密码输入不一致';
        return msg;
      }
      if (this.password1 === '' || this.password2 === '' || this.username === '' || this.name === '') {
        msg = '信息未填写完整';
        return msg;
      }
      return msg;
    },
    login () {
      // console.log(this.username);
      // console.log(this.password);
      this.$apis.mokeLogin({
        username: this.username,
        password: this.password
      }).then((res) => {
        // console.log(res);
        if (res.data.code === 1) {
          let instance = Toast({
            message: res.data.msg,
            iconClass: 'icon icon-success'
          });
          setTimeout(() => {
            instance.close();
            this.$router.push({
              path: '/user',
            })
          }, 1000);
        } else if (res.data.code === 2) {
          this.password = '';
          let instance = Toast({
            message: res.data.msg,
            iconClass: 'icon icon-fail'
          });
          setTimeout(() => {
            instance.close();
          }, 1000);
        } else {
          MessageBox.confirm('是否跳转至注册界面?').then(action => {
            this.flag = false;
          }).catch((err) => {
            console.log(err);
          });
        }
        this.$store.commit('login', res.data.info);
      }).catch((err) => {
        console.log(err);
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 @import "./../../common/css/login.scss"
</style>
