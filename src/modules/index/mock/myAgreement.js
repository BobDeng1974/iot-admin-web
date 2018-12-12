import Mock from 'mockjs';

const allDatas = [
  {
    path: '/Agreement/getLuaDocList',
    type: 'post',
    data: {
      code: 0,
      success: true,
      message: 'success',
      'list|1-10': [
        {
          'id|+1': 1,
          applianceType: '空调',
          sn8: 'X7-321B',
          childType: '12334',
          docSize: '12.5KB',
          name: 'X&-321B电控协议',
          version: 'V1.2',
          mdate: '@datetime(2018-06-30 12:30:30)',
          cuid: '邓贺剑'
        }
      ],
      'count|50-100': 50
    }
  },
  {
    path: '/Agreement/getDoc',
    type: 'post',
    data: {
      code: 0,
      success: true,
      message: 'success',
      data: {
        'id|+1': 1,
        applianceType: '空调',
        sn8: 'X7-321B',
        docSize: '12.5KB',
        name: 'X&-321B电控协议',
        version: 'V1.2'
      }
    }
  },
  {
    path: '/Agreement/getLuaList',
    type: 'post',
    data: {
      code: 0,
      success: true,
      message: 'success',
      'list|1-10': [
        {
          'id|+1': 1,
          applianceType: '微波炉(0xAQ)',
          childType: '12334',
          name: '微波炉lua脚本',
          profileName: '微波炉Profile文件',
          luaName: '微波炉Lua文件',
          status: '未发布',
          cdate: '@datetime(2018-06-30 12:30:30)',
          mdate: '@datetime(2018-06-30 12:30:30)',
          cuid: '邓贺剑'
        }
      ],
      'count|50-100': 50
    }
  },
  {
    path: '/Agreement/getProfilelist',
    type: 'post',
    data: {
      code: 0,
      success: true,
      message: 'success',
      'list|1-10': [
        {
          'id|+1': 1,
          applianceType: '微波炉',
          sn8: '12334',
          profileName: '微波炉Profile文件',
          'status': function () {
            let arr = ['已发布', '未发布'];
            let num = Math.floor(Math.random() * arr.length);
            return arr[num];
          },
          cdate: '@datetime(2018-06-30 12:30:30)',
          mdate: '@datetime(2018-06-30 12:30:30)',
          cuid: '邓贺剑'
        }
      ],
      'count|50-100': 50
    }
  },
  {
    path: '/Agreement/getProfile',
    type: 'post',
    data: {
      code: 0,
      success: true,
      message: 'success',
      result: {
        applianceType: '0xAC',
        sn8: '12345',
        docName: '微波炉doc',
        profileName: '微波炉Profile文件',
        'status': function () {
          let arr = ['已发布', '未发布'];
          let num = Math.floor(Math.random() * arr.length);
          return arr[num];
        },
        cdate: '@datetime(2018-06-30 12:30:30)',
        mdate: '@datetime(2018-06-30 12:30:30)',
        muid: '邓贺剑',
        'properts|1-10': [
          {
            'profileId|+1': 1,
            propertyName: 'mode',
            'propertyKey': function () {
              let arr = ['模式', '状态'];
              let num = Math.floor(Math.random() * arr.length);
              return arr[num];
            },
            'propertyValue|0-1': 0,
            'readwrite': function () {
              let arr = ['只读', '读写'];
              let num = Math.floor(Math.random() * arr.length);
              return arr[num];
            },
            'propertyType': function () {
              let arr = ['枚举行', '布尔', '整形', '浮点型'];
              let num = Math.floor(Math.random() * arr.length);
              return arr[num];
            },
            description: '属性描述',
            'type': function () {
              let arr = ['通用', '新增'];
              let num = Math.floor(Math.random() * arr.length);
              return arr[num];
            }
          }
        ]
      }
    }
  },
  {
    path: '/Agreement/currencyProperty',
    type: 'post',
    data: {
      code: 0,
      success: true,
      message: 'success',
      'list|1-5': [
        {
          'id|+1': 1,
          propertyName: 'mode',
          'propertyKey': function () {
            let arr = ['模式', '状态'];
            let num = Math.floor(Math.random() * arr.length);
            return arr[num];
          },
          'propertyValue|2000-20000': 2000,
          'readwrite': function () {
            let arr = ['只读', '读写'];
            let num = Math.floor(Math.random() * arr.length);
            return arr[num];
          },
          'propertyType': function () {
            let arr = ['枚举行', '布尔', '整形', '浮点型'];
            let num = Math.floor(Math.random() * arr.length);
            return arr[num];
          },
          description: '属性描述',
          'type': function () {
            let arr = ['通用', '新增'];
            let num = Math.floor(Math.random() * arr.length);
            return arr[num];
          }
        }
      ]
    }
  },
  // 此接口为新增profile文件页面中新增可选功能对话框前端界面自定义模拟的接口,后台暂时未提供真实接口
  {
    path: '/Agreement/optionalFeatures',
    type: 'post',
    data: {
      code: 0,
      success: true,
      message: 'success',
      'list|1-10': [
        {
          'id|+1': 1,
          'featureName': function () {
            let arr = ['冷冻门状态', '变温室目标温度', '冷冻室温度', '负离子开关', '冷冻室目标温度'];
            let num = Math.floor(Math.random() * arr.length);
            return arr[num];
          },
          identifier: 'FreezerDoorstatus',
          applianceType: '冰箱',
          propertyName: 'mode',
          'propertyKey': function () {
            let arr = ['模式', '状态'];
            let num = Math.floor(Math.random() * arr.length);
            return arr[num];
          },
          'propertyValue|2000-20000': 2000,
          'readwrite': function () {
            let arr = ['只读', '读写'];
            let num = Math.floor(Math.random() * arr.length);
            return arr[num];
          },
          'propertyType': function () {
            let arr = ['枚举行', '布尔', '整形', '浮点型'];
            let num = Math.floor(Math.random() * arr.length);
            return arr[num];
          }
        }
      ]
    }
  }
];

const productDatas = (datas) => {
  datas.forEach(item => {
    Mock.mock(new RegExp(item.path), item.type, item.data);
  });
};
productDatas(allDatas);
