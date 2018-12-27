const _import = require('./../_import_' + process.env.NODE_ENV);

// const systemRouter =
//   {
//     path: '/system',
//     name: '系统',
//     component: _import('layout/index'),
//     meta: { title: '系统' },
//     redirect: '/system/auditsManagement',
//     children: [
//       // 审核管理
//       {
//         path: 'auditsManagement',
//         component: _import('mineSystem/auditsManagement/index'),
//         name: '审核管理',
//         meta: {title: '审核管理'},
//         redirect: '/system/auditsManagement/information',
//         children: [
//           {
//             path: 'information',
//             component: _import('mineSystem/auditsManagement/information/index'),
//             name: '审核者消息',
//             meta: {title: '审核者消息'}
//           },
//           {
//             path: 'management',
//             component: _import('mineSystem/auditsManagement/information/management'),
//             name: '审核管理1',
//             meta: {title: '审核管理1'},
//             hidden: true
//           }
//         ]
//       },
//       // 系统管理
//       {
//         path: 'systemManagement',
//         component: _import('mineSystem/systemManagement/index'),
//         redirect: '/system/systemManagement/account',
//         name: '系统管理',
//         meta: {title: '系统管理'},
//         // redirect: '/system/auditsManagement/information',
//         children: [
//           {
//             path: 'account',
//             component: _import('mineSystem/systemManagement/account/index'),
//             name: '账户管理',
//             meta: {title: '账户管理'}
//           },
//           {
//             path: 'menu',
//             component: _import('mineSystem/systemManagement/menu/index'),
//             name: '菜单管理',
//             meta: {title: '菜单管理'}
//           },
//           {
//             path: 'role',
//             component: _import('mineSystem/systemManagement/role/index'),
//             name: '角色管理',
//             meta: {title: '角色管理'}
//           }
//         ]
//       },
//       // 配置管理
//       {
//         path: 'configurationManagement',
//         component: _import('mineSystem/configurationManagement/index'),
//         redirect: '/system/configurationManagement/category',
//         name: '配置管理',
//         meta: {title: '配置管理'},
//         children: [
//           {
//             path: 'category',
//             component: _import('mineSystem/configurationManagement/category/index'),
//             name: '品类与事业部管理',
//             meta: {title: '品类与事业部管理'}
//           },
//           {
//             path: 'moduleVendor',
//             component: _import('mineSystem/configurationManagement/moduleVendor/index'),
//             name: '模组厂商管理',
//             meta: {title: '模组厂商管理'}
//           },
//           {
//             path: 'macManagement',
//             component: _import('mineSystem/configurationManagement/macManagement/index'),
//             name: 'mac地址管理',
//             meta: {title: 'mac地址管理'}
//           }
//         ]
//       }
//     ]
//   };
export const auditsManagementRouter =
// 审核管理
{
  path: 'auditsManagement',
  component: _import('mineSystem/auditsManagement/index'),
  name: '审核管理',
  meta: { title: '审核管理' },
  redirect: '/product/auditsManagement/information',
  children: [
    {
      path: 'information',
      component: _import('mineSystem/auditsManagement/information/index'),
      name: '硬件审核',
      meta: { title: '硬件审核', icon: 'dots' }
    },
    {
      path: 'management/:id',
      component: _import('mineSystem/auditsManagement/information/management'),
      name: '审核管理',
      meta: { title: '审核管理' },
      hidden: true
    },
    // licesce移动过来
    {
      path: 'applicationManagement',
      component: _import('mineSystem/licenseManagement/applicationManagement/index'),
      name: 'applicationManagement',
      meta: { title: 'license审核', icon: 'dots' }
    },
    {
      path: 'eidtApplication',
      component: _import('mineSystem/licenseManagement/applicationManagement/eidt'),
      name: 'eidtApplication',
      meta: { title: 'license申请' },
      hidden: true
    },
    {
      path: 'preApplicationManagement',
      component: _import('mineSystem/licenseManagement/preApplicationManagement/index'),
      name: 'preApplicationManagement',
      meta: { title: 'license预审核', icon: 'dots' }
    },
    {
      path: 'eidtPreApplication',
      component: _import('mineSystem/licenseManagement/preApplicationManagement/eidt'),
      name: 'eidtPreApplication',
      meta: { title: 'license预申请' },
      hidden: true
    }
  ]
};
// 系统设置
export const systemManagementRouter =
{
  path: 'systemManagement',
  component: _import('mineSystem/systemManagement/index'),
  redirect: '/product/systemManagement/account',
  name: '系统设置',
  meta: { title: '系统设置' },
  // redirect: '/system/auditsManagement/information',
  children: [
    // {
    //   path: 'userAdministration',
    //   name: '用户管理',
    //   component: _import('mineSystem/systemManagement/userAdministration/index'),
    //   meta: { title: '用户管理', icon: 'dots' }
    // },
    // {
    //   path: 'account',
    //   component: _import('mineSystem/systemManagement/account/index'),
    //   name: '账户管理',
    //   meta: { title: '账户管理', icon: 'dots' }
    // },
    {
      path: 'systemMenu',
      component: _import('mineSystem/systemManagement/menuMangagment/index'),
      name: '菜单管理',
      meta: { title: '菜单管理', icon: 'dots' }
    }
    // {
    //   path: 'role',
    //   component: _import('mineSystem/systemManagement/role/index'),
    //   name: '角色管理',
    //   meta: { title: '角色管理', icon: 'dots' }
    // }
    // {
    //   path: 'userAuthenticationManagement',
    //   component: _import('mineSystem/systemManagement/authenticationManagement/index'),
    //   name: '用户认证管理',
    //   meta: { title: '用户认证管理', icon: 'dots' }
    // }
  ]
};
// 配置管理
export const sconfigurationManagementRouter =
{
  path: 'configurationManagement',
  component: _import('mineSystem/configurationManagement/index'),
  redirect: '/product/configurationManagement/category',
  name: '配置管理',
  meta: { title: '配置管理' },
  children: [
    {
      path: 'category',
      component: _import('mineSystem/configurationManagement/category/index'),
      name: '品类与事业部管理',
      meta: { title: '品类与事业部管理', icon: 'dots' }
    },
    {
      path: 'moduleVendor',
      component: _import('mineSystem/configurationManagement/moduleVendor/index'),
      name: '模组厂商管理',
      meta: { title: '模组厂商管理', icon: 'dots' }
    },
    {
      path: 'macManagement',
      component: _import('mineSystem/configurationManagement/macManagement/index'),
      name: 'mac地址管理',
      meta: { title: 'mac地址管理', icon: 'dots' }
    },
    {
      path: 'documentManagement',
      component: _import('mineSystem/configurationManagement/documentManagement/index'),
      name: '文档管理',
      meta: { title: '文档管理', icon: 'dots' }
    },
    {
      path: 'addDevDoc',
      component: _import('mineSystem/configurationManagement/documentManagement/addDoc'),
      name: 'addDevDoc',
      meta: { title: '文档管理' },
      hidden: true
    },
    {
      path: 'editDevDoc',
      component: _import('mineSystem/configurationManagement/documentManagement/editDoc'),
      name: 'editDevDoc',
      meta: { title: '文档管理' },
      hidden: true
    },
    {
      path: 'downSdkManagement',
      component: _import('mineSystem/configurationManagement/downSdkManagement/index'),
      name: 'downSdkManagement',
      meta: { title: 'sdk文档管理', icon: 'dots' }
    },
    {
      path: 'addSdkDoc',
      component: _import('mineSystem/configurationManagement/downSdkManagement/addSdk'),
      name: 'addSdkDoc',
      meta: { title: 'sdk文档管理' },
      hidden: true
    },
    {
      path: 'editSdkDoc',
      component: _import('mineSystem/configurationManagement/downSdkManagement/editSdk'),
      name: 'editSdkDoc',
      meta: { title: 'sdk文档管理' },
      hidden: true
    },
    // 新增型号录入路由
    {
      path: 'typeEntry',
      component: _import('mineSystem/configurationManagement/typeEntry/index'),
      name: '产品型号管理',
      meta: { title: '产品型号管理', icon: 'dots' }
    },
    {
      path: 'addTypeEnter',
      component: _import('mineSystem/configurationManagement/typeEntry/addTypeEnter'),
      name: '产品型号信息录入',
      meta: { title: '产品型号信息录入', icon: 'dots' }
    }
  ]
};
// liences管理(这里移动到审核管理模块)
// export const liencesRouter =
// {
//   path: 'licenseManagement',
//   name: 'license管理',
//   component: _import('mineSystem/licenseManagement/index'),
//   meta: { title: 'license管理' },
//   redirect: '/product/licenseManagement/applicationManagement',
//   children: [
//     {
//       path: 'applicationManagement',
//       component: _import('mineSystem/licenseManagement/applicationManagement/index'),
//       name: 'applicationManagement',
//       meta: { title: '申请管理', icon: 'dots' }
//     },
//     {
//       path: 'eidtApplication',
//       component: _import('mineSystem/licenseManagement/applicationManagement/eidt'),
//       name: 'eidtApplication',
//       meta: { title: 'license申请' }
//     },
//     {
//       path: 'preApplicationManagement',
//       component: _import('mineSystem/licenseManagement/preApplicationManagement/index'),
//       name: 'preApplicationManagement',
//       meta: { title: '预申请管理', icon: 'dots' }
//     },
//     {
//       path: 'eidtPreApplication',
//       component: _import('mineSystem/licenseManagement/preApplicationManagement/eidt'),
//       name: 'eidtPreApplication',
//       meta: { title: 'license预申请' }
//     }
//   ]
// };
// 开发者管理(新模块)Developer management
export const developerRouter =
{
  path: 'developerManagement',
  name: '开发者管理',
  component: _import('mineSystem/licenseManagement/index'),
  meta: { title: '开发者管理' },
  redirect: '/product/developerManagement/userAuthenticationManagement',
  children: [
    {
      path: 'userAuthenticationManagement',
      component: _import('mineSystem/systemManagement/authenticationManagement/index'),
      name: '开发者认证管理',
      meta: { title: '开发者认证管理', icon: 'dots' }
    },
    {
      path: 'userAdministration',
      name: '开发者账户管理',
      component: _import('mineSystem/systemManagement/userAdministration/index'),
      meta: { title: '开发者账户管理', icon: 'dots' }
    }
  ]
};
// 后台账户管理（新模块）Background account management
export const backgroundAccountRouter =
{
  path: 'backgroundAccountManagement',
  name: '后台账户管理',
  component: _import('mineSystem/licenseManagement/index'),
  meta: { title: '后台账户管理' },
  redirect: '/product/backgroundAccountManagement/userAuthenticationManagement',
  children: [
    {
      path: 'account',
      component: _import('mineSystem/systemManagement/account/index'),
      name: '账户管理',
      meta: { title: '账户管理', icon: 'dots' }
    },
    {
      path: 'role',
      component: _import('mineSystem/systemManagement/role/index'),
      name: '角色管理',
      meta: { title: '角色管理', icon: 'dots' }
    },
    {
      path: 'menu',
      component: _import('mineSystem/systemManagement/menu/index'),
      name: '角色授权',
      meta: { title: '角色授权', icon: 'dots' }
    }
  ]
};
// export default systemRouter;
