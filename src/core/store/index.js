import Vue from "vue";
import Vuex from "vuex";
import apis from "@/core/api/index"
// 引入store
import Store from 'storejs'
// console.log("OK");
Vue.use(Vuex);

//定义属性值  data
const state={
	// 用餐建议
	allRecmment: [
        {size: '13.5*13.5cm', people: '适合4-5人分享', tool: '含五人份餐具', order: '至少需提前一天预约', other: 2},
        {size: '17*17cm', people: '适合5-8人分享', tool: '含十人份餐具', order: '至少需提前一天预约', other: 3},
        {size: '21*21cm', people: '适合12-15人分享', tool: '含十五人份餐具', order: '至少需提前一天预约',other: 4},
        {size: '27*40.5cm', people: '适合35-40人分享', tool: '含二十人份餐具', order: '至少需提前一天预约',other: 8},
        {people: '适合2-4人分享', order: '至少需提前一天预约',other: 'JZ'}
	],
	cartList: [],
	cartNum: 0,
	loginInfo: {},
	City: '上海'
}
// store.set('username', 'marcus')
// store.get('username')
// store.remove('username')
//定义同步方法
const mutations={
	// 登录信息状态
	login (state, data) {
		// console.log(data);
		state.loginInfo = {
			username : data.username,
			name : data.name,
			id : data.id,
			avatar : data.avatar,
			Coin : data.Coin,
			Levels : data.Levels,
			discount : data.discount,
			duihuan : data.duihuan
		}
		Store.set('loginInfo', state.loginInfo);
	},
	// 注销登录
	zhuxiao (state) {
		Store.remove('loginInfo');
		state.loginInfo = Store.get('loginInfo');
	},
	// 初始化购物车
	vuexInit (state) {
		state.cartList = Store.get("cartList") || [];
		state.cartNum = Store.get("cartNum") || 0;
		state.cartList.forEach(item => {
			item.flag = true;
		});
		Store.set('cartList', state.cartList);
		// isLogin
		state.loginInfo = Store.get('loginInfo');
	},
	// 添加购物车
	add (state, value){
		let flag = true;
		value.buyNumber = value.buyNumber ? value.buyNumber : 1;
		value.flag = true;
		if (state.cartList.length != 0) {
			state.cartList.forEach(item => {
				if (item.Name === value.Name && item.Size ==  value.Size) {
					item.buyNumber += value.buyNumber;
					flag = false;
					return;
				}
			});
		}
		if (flag) {
			state.cartList.push(value);
			state.cartNum++;
			Store.set('cartNum', state.cartNum);
		}
		Store.set('cartList', state.cartList);
		// console.log(state.cartList);
	},
	// 购物车的数量相加
	addnum (state, value) {
		state.cartList.forEach(item => {
			if (item.Name === value.Name && item.Size ==  value.Size) {
				item.buyNumber++;
				return;
			}
		});
		Store.set('cartList', state.cartList);
		// console.log(state.cartList);
	},
	// 购物车数量相减
	subnum (state, value) {
		state.cartList.forEach(item => {
			if (item.Name === value.Name && item.Size ==  value.Size) {
				item.buyNumber--;
				return;
			}
		});
		Store.set('cartList', state.cartList);
	},
	// 选中购物车
	changeState (state, value) {
		state.cartList.forEach(item => {
			if (item.Name === value.Name && item.Size ==  value.Size) {
				item.flag = !item.flag;
				// console.log(item.flag);
				return;
			}
		});
	},
	// 结算购物车
	delCarts (state) {
		state.cartList.forEach((item, index) => {
			if (item.flag) {
				state.cartList.splice(index, 1);
				state.cartNum--;
				Store.set("cartList", state.cartList);
				Store.set("cartNum", state.cartNum);
			}
		});
	},
	// 刷新购物车
	updateStore (state) {
		Store.set("cartList", state.cartList);
		Store.set("cartNum", state.cartNum);
	}

}
//定义 computed(属性计算)
const getters={
	count(state){
		return state.num*state.price;
	}
}

//定义异步方法,可以在这个里面做一些异步操作,比如调用通用数据接口
const actions={
	syFn(context){
		// context.state  可以取 state 属性
		// context.commit  可以调用 mutations 同步方法 属性
		// context.dispatch可以调用 actions 异步方法 属性
		// 在组件里面调用 也是一样,同上面的方法一直 
	},
	test(context,data){
		console.log(data)
	}	
}

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})
