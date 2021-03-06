const _import = require('./../_import_' + process.env.NODE_ENV);
import {auditsManagementRouter, systemManagementRouter, sconfigurationManagementRouter, developerRouter, backgroundAccountRouter} from './system';
import { dataCenterRouter } from './dataCenter';
const productRouter = {
  path: '/product',
  name: '开发者平台系统管理',
  component: _import('layout/index'),
  meta: { title: '开发者平台系统管理' },
  redirect: '/product/goHome',
  children: [
    // {
    //   path: 'adminHome',
    //   name: '管理首页',
    //   component: _import('myAgreement/index'),
    //   meta: { title: '管理首页' },
    //   redirect: '/product/adminHome/goHome',
    //   children: [
    //     {
    //       path: 'goHome',
    //       component: _import('myAgreement/elecManagement/index'),
    //       name: 'goHome',
    //       meta: { title: '首页' }
    //     }
    //   ]
    // },
    {
      path: 'goHome',
      name: 'goHome',
      component: _import('myAgreement/elecManagement/index'),
      meta: { title: '首页' }
    },
    auditsManagementRouter,
    developerRouter,
    backgroundAccountRouter,
    sconfigurationManagementRouter,
    dataCenterRouter,
    systemManagementRouter
  ]
};
export default productRouter;
