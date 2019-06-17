import axios from 'axios'

import MockAdapter from 'axios-mock-adapter';
import {UsersData} from './data/userInfo' 

let mock = new MockAdapter(axios);

mock.onGet('/login').reply(config => {
//   console.log(config)
//   console.log(Users)
	// 获取用户输入的登录信息
	let loginInfo = config.params;
	// 做一个数据效验
	let result = {
		code: 200,
		msg: '',
		info: {}
	};

	for (let i = 0; i < UsersData.length; i++) {
		if (UsersData[i].username === loginInfo.username) {
			if (UsersData[i].password === loginInfo.password) {
				result.msg = "登录成功";
				result.info = UsersData[i];
				result.code = 1;
				return [200,result];
			} else {
				result.msg = "登录失败，密码错误！";
				result.code = 2;
				return [200,result];
			}
		}
	}
	result.msg = "登录失败，账号不存在！";
	result.code = 0;
	return [200,result]; 

});

mock.onPost('/login').reply(config => {
	console.log(JSON.parse(config.data));
	let result = {
		code: 200,
		msg: '',
	};

	for (let i = 0; i < UsersData.length; i++) {
		if (UsersData[i].username === config.data.username) {
			result.msg = '注册失败！用户名已存在！';
			return [200,result]; 
		}
	}

	let info = {
		username: JSON.parse(config.data).params.username,
		password: JSON.parse(config.data).params.password,
		name: JSON.parse(config.data).params.name,
		avatar: null,
		Coin: 0,
		Levels: 0,
		discount: 0,
		duihuan: 0
	}
	UsersData.push(info);
	result.msg = '注册成功';
	console.log(UsersData);
	

	return [200,result]; 
	
})

export default axios;	//注意暴露axios