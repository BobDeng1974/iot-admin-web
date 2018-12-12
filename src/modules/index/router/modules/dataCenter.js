const _import = require('./../_import_' + process.env.NODE_ENV);
export const dataCenterRouter =
// 数据中心
{
    path: 'dataCenter',
    name: '数据中心',
    component: _import('mineDataCenter/index'),
    meta: { title: '数据中心' },
    redirect: '/product/dataCenter/mineDataCenterCheck',
    children: [
      {
        path: 'mineDataCenterCheck',
        name: '数据查询',
        component: _import('mineDataCenter/mineDataCenterCheck/index'),
        redirect: '/product/dataCenter/mineDataCenterCheck/userInfoCheck',
        meta: { title: '数据查询' },
        children: [
          {
            path: 'userInfoCheck',
            name: '用户信息查询',
            component: _import('mineDataCenter/mineDataCenterCheck/recordCheck/userInfomation'),
            meta: { title: '用户信息查询' }
          },
          {
            path: 'equipmentInfoCheck',
            component: _import('mineDataCenter/mineDataCenterCheck/recordCheck/equipmentInformation'),
            name: '设备信息查询',
            meta: { title: '设备信息查询', icon: 'dots' }
          },
          {
            path: 'equipmentStateCheck',
            component: _import('mineDataCenter/mineDataCenterCheck/recordCheck/equipmentState'),
            name: '设备状态查询',
            meta: { title: '设备状态查询', icon: 'dots' }
          }
        ]
      }
    ]
  };