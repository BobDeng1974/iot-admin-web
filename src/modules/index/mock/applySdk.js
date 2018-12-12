import Mock from 'mockjs';
import { param2Obj } from '@/utils';

const List = [];
const count = 100;
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    'verifyStatus|0-1': 0,
    'type': ' sdk类型',
    'name': ' XXXXXSdk',
    'os|1': ['linux', 'windows'],
    'cpuArch|1': ['ARM', 'X86'],
    'brand|1': ['高通', 'Intel'],
    'model': ' S845',
    'tool': ' 芯片交叉编译工具包地址',
    'param': ' 定制化编译参数',
    'succPic': ' 定制化成功实例截图路径',
    'doc': ' 其他芯片资料(docx文档)',
    'discription': '功能说明',
    mdate: '@datetime()'
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
