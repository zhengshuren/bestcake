import request from './http'
import  mock from "@/mock/mock" //我拿的是 mock.js里面的axios模块
import store from "@/core/store/index"

class Apls {
  //ajax01  我是mock虚拟数据
	mokeLogin(data){
		return mock.get("/login",{params:data})
  }
  mokeRegister(data){
		return mock.post("/login",{params:data})
  }
  // 小图标信息
  NewIndexController () {
    let data = {
      v: '1563550331101',
      c: 'NewIndexController',
      m: 'index'
    }
    return request({
      method: 'get',
      url: '/json1811.ashx',
      params: data
    })
  }
  // 首页的蛋糕信息
  GetIndexCakeList () {
    // console.log(store.City);
    let data = {
      v: '1560221565645',
      c: 'Index',
      m: 'GetIndexCakeList'
    }
    return request({
      method: 'get',
      url: '/json1811.ashx',
      params: data
    })
  }
  // 主页mint-ui轮播图
  GetBannerList () {
    let data = {
      v: '1560221565643',
      c: 'Index',
      m: 'GetBannerList',
      Type: '2',
      City: store.state.City
    }
    return request({
      method: 'get',
      url: '/json1811.ashx',
      params: data
    })
  }
  // 详情页的KSK全部数据
  GetCakeByName (data) {
    return request({
      method: 'get',
      url: '/json1811.ashx',
      params: {
        c: 'Product',
        m: 'GetCakeByName',
        v: '1560305026107',
        City: store.state.City,
        ProName: data.name
      }
    })
  }
  // 详情页严选的全部数据
  GetRuPCakeByName (data) {
    return request({
      method: 'get',
      url: '/json1811.ashx',
      params: {
        c: 'NsCakeCenter',
        m: 'GetRuPCakeByName',
        v: '1560305026107',
        Name: data.name
      }
    })
  }
  // 详情页JZ的全部数据
  GetjzCakeInfo (data) {
    return request({
      method: 'get',
      url: '/json1811.ashx',
      params: {
        c: 'IndexCenter',
        m: 'GetjzCakeInfo',
        v: '1560305026107',
        City: store.state.City,
        ProName: data.name
      }
    })
  }
    // 详情页NS的全部数据
  GetNSCakeByName (data) {
    return request({
      method: 'get',
      url: '/json1811.ashx',
      params: {
        c: 'NsCakeCenter',
        m: 'GetNSCakeByName',
        v: '1560305026107',
        Name: data.name
      }
    })
  }
  // 商品评论数量
  getAssessCakeInfo (id) {
    return request({
      method: 'get',
      url: '/json1811.ashx',
      params: {
        c: 'CakeAssess',
        m: 'GetSumAndAvgAccessInfo',
        v: '1560323244840',
        pid: id
      }
    })
  }
  // 评论信息的数据
  getCakeCmtList (id) {
    return request({
      method: 'get',
      url: '/json1811.ashx',
      params: {
        c: 'Item',
        m: 'getCakeCmtList',
        v: '1560323244840',
        pageNo: 0,
        pageSize: 10,
        ID: id
      }
    })
  }
  // 获取分类页面的蛋糕数据
  GetJdListNew () {
    return request({
      method: 'get',
      url: '/json1811.ashx',
      params: {
        c: 'NsCakeCenter',
        m: 'GetJdListNew',
        v: '1560305026107',
      }
    })
  }
}
export default new Apls()
