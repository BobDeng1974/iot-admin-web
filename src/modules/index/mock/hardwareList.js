import Mock from 'mockjs';
import { param2Obj } from '@/utils';

const List = [];
const count = 100;
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    'verifyStatus|1': ['审核通过', '审核拒绝', '待审核'],
    applianceType: '',
    modeNumber: '0xAC',
    NAME: '0xAC0100',
    'network|1': ['仅wifi', 'wifi+蓝牙', '2G', '3G', 'NB-IOT', 'zgiebee'],
    'proto|1': ['msmart ', 'msmart+华为', 'msmart+华为', 'msmart+京东'],
    wifisdkName: 'SDK名称',
    'PublicStatis|0-1': 0,
    testKey: '96591835976-51839',
    productKey: '待授权',
    luaName: '型号码0xAC0100lua脚本',
    other: '',
    createDate: '@datetime(2018-06-30 12:30:30)',
    update: '@datetime()'
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

    return {
      reulst: pageList,
      message: '错误信息',
      PageNo: pageNo,
      PageSiz: pageSize,
      Pagetotal: mockList.length,
      code: 0
    };
  }
  // getPv: () => ({
  //   pvData: [{ key: 'PC', pv: 1024 }, { key: 'mobile', pv: 1024 }, { key: 'ios', pv: 1024 }, { key: 'android', pv: 1024 }]
  // }),
  // getArticle: (config) => {
  //   const { id } = param2Obj(config.url);
  //   for (const article of List) {
  //     if (article.id === +id) {
  //       return article;
  //     }
  //   }
  // },
  // createArticle: () => ({
  //   data: 'success'
  // }),
  // updateArticle: () => ({
  //   data: 'success'
  // })
};
