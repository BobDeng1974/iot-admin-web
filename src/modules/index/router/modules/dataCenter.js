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
      // {
      //   path: 'mineDataCenterCheck',
      //   name: '数据查询',
      //   component: _import('mineDataCenter/mineDataCenterCheck/index'),
      //   redirect: '/product/dataCenter/mineDataCenterCheck/userInfoCheck',
      //   meta: { title: '数据查询' },
      //   children: [
      //     {
      //       path: 'userInfoCheck',
      //       name: '用户信息查询',
      //       component: _import('mineDataCenter/mineDataCenterCheck/recordCheck/userInfomation'),
      //       meta: { title: '用户信息查询', icon: 'dots' }
      //     },
      //     {
      //       path: 'equipmentInfoCheck',
      //       component: _import('mineDataCenter/mineDataCenterCheck/recordCheck/equipmentInformation'),
      //       name: '设备信息查询',
      //       meta: { title: '设备信息查询', icon: 'dots' }
      //     },
      //     {
      //       path: 'equipmentStateCheck',
      //       component: _import('mineDataCenter/mineDataCenterCheck/recordCheck/equipmentState'),
      //       name: '设备状态查询',
      //       meta: { title: '设备状态查询', icon: 'dots' }
      //     }
      //   ]
      // },
      // 新增页面
      {
        path: 'liencesTotleList',
        name: 'liences申请列表',
        component: _import('mineDataCenter/liencesTotleList/index'),
        meta: { title: 'liences申请列表', icon: 'dots' }
      },
      {
        path: 'hardwareApplicationTotleList',
        name: '硬件申请列表',
        component: _import('mineDataCenter/hardwareApplicationTotleList/index'),
        meta: { title: '硬件申请列表', icon: 'dots' }
      },
      {
        path: 'meijuLuaList',
        component: _import('mineDataCenter/meijuLuaList/index'),
        name: '美居lua列表',
        meta: { title: '美居lua列表', icon: 'dots' }
      },
      {
        path: 'cloudLuaList',
        component: _import('mineDataCenter/cloudLuaList/index'),
        name: '云端lua列表',
        meta: { title: '云端lua列表', icon: 'dots' }
      },
      // 设备统计
      {
        path: 'deviceStatistics',
        name: '设备统计',
        component: _import('mineDataCenter/index'),
        meta: { title: '设备统计' },
        redirect: '/product/dataCenter/deviceStatistics/equipmentUserStatistics',
        children: [
          {
            path: 'equipmentUserStatistics',
            name: '设备用户统计',
            component: _import('mineDataCenter/equipmentUserStatistics/index'),
            meta: { title: '设备用户统计', icon: 'dots' }
          },
          {
            path: 'equipmentDetails',
            name: '设备明细',
            hidden: true,
            component: _import('mineDataCenter/equipmentUserStatistics/equipmentDetails'),
            meta: { title: '设备明细' }
          },
          {
            path: 'userDetails',
            name: '用户明细',
            hidden: true,
            component: _import('mineDataCenter/equipmentUserStatistics/userDetails'),
            meta: { title: '用户明细' }
          }
        ]
      }
    ]
  };