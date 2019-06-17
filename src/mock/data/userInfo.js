import Mock from 'mockjs';
const UsersData = [
    {
      id: 1,
      username: 'admin',
      password: '123456',
      avatar: 'https://avatars0.githubusercontent.com/u/22588905?v=4&s=120',
      name: '达康书记',
      Coin: 100,
      Levels: 0,
      discount: 0,
      duihuan: 0
    },
    {
      id: 1,
      username: 'test',
      password: 'abc123',
      avatar: 'https://avatars0.githubusercontent.com/u/22588905?v=4&s=120',
      name: '测试用户',
      Coin: 1000,
      Levels: 0,
      discount: 0,
      duihuan: 0
    }
  ];

const Users = [];

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }));
}
//导出多个数据写法,注意取得时候,一定按照暴露的名称 去取
export { UsersData,Users };