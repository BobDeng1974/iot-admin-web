import Mock from 'mockjs';

const allDatas = [
  {
    path: '/role/manage',
    type: 'post',
    data: {
      code: '0',
      success: true,
      message: 'success',
      result: {
        authenMethod: 'mip认证',
        enterpriseName: '厨房电器事业部',
        groupName: '厨房电器事业部',
        'developTeamMembers|1-6': [
          {
            imgUrl: '',
            'level': function () {
              let arr = ['组长', '组员'];
              let num = Math.floor(Math.random() * arr.length);
              return arr[num];
            },
            'userName': function () {
              let arr = ['江小鱼', '张牛牛', '刘大白'];
              let num = Math.floor(Math.random() * arr.length);
              return arr[num];
            }
          }
        ]
      }
    }
  }
];

const productDatas = (datas) => {
  datas.forEach(item => {
    Mock.mock(new RegExp(item.path), item.type, item.data);
  });
};
productDatas(allDatas);