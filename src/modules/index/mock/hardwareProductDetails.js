import Mock from 'mockjs';
import { param2Obj } from '@/utils';

const List = [];
const count = 100;
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    verifyStatus: '1',
    applianceType: '家居家电  厨房家电  烟机',
    name: '智能空调',
    sn8: '0XAC0100',
    'network|1': ['仅wifi', 'wifi+蓝牙', '2G', '3G', 'NB-IOT', 'zgiebee'],
    'proto|1': ['msmart ', 'msmart+华为', 'msmart+华为', 'msmart+京东'],
    wifisdkName: 'XXXXXXSDK',
    publicStatis: '已分配',
    testKey: '96591835976-5183',
    productKey: '待授权',
    luaName: '型号码0xAC0100lua脚本',
    other: '无'
  }));
}

export default {
  getList: config => {
    const { importance, type, title, pageNo = 1, pageSize = 20, sort } = param2Obj(config.url);
    console.log(config);
    // debugger;

    let mockList = List.filter(item => {
      if (importance && item.importance !== +importance) return false;
      if (type && item.type !== type) return false;
      if (title && item.title.indexOf(title) < 0) return false;
      return true;
    });

    if (sort === '-id') {
      mockList = mockList.reverse();
    }

    const pageList = mockList.filter((item, index) => index < pageSize * pageNo && index >= pageSize * (pageNo - 1));
    let randomNum = Math.floor(Math.random() * pageList.length);
    // return pageList[randomNum];
    return {
      reulst: pageList[randomNum],
      message: '错误信息',
      code: 0
    };
  },
  // getPv: () => ({
  //   pvData: [{ key: 'PC', pv: 1024 }, { key: 'mobile', pv: 1024 }, { key: 'ios', pv: 1024 }, { key: 'android', pv: 1024 }]
  // }),
  getArticle: (config) => {
    let { id } = param2Obj(config.url);
    id = id || List[Math.floor(Math.random() * List.length)].id;
    console.log(config);
    // debugger;
    let testCount = 0;
    for (const article of List) {
      testCount++;
      if (article.id === +id) {
        return {
          result: article,
          message: 'mock',
          code: 0
        };
      } else if (testCount === List.length) {
        return {
          result: List[Math.floor(Math.random() * List.length)],
          message: 'mock',
          code: 0
        };
      }
    }
    console.log(testCount);
  }
  // createArticle: () => ({
  //   data: 'success'
  // }),
  // updateArticle: () => ({
  //   data: 'success'
  // })
};
