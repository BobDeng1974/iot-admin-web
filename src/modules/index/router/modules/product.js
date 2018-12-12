const _import = require('./../_import_' + process.env.NODE_ENV);
import {auditsManagementRouter, systemManagementRouter, sconfigurationManagementRouter, liencesRouter} from './system';
import { dataCenterRouter } from './dataCenter';
const productRouter = {
  path: '/product',
  name: '开发者平台系统管理',
  component: _import('layout/index'),
  meta: { title: '开发者平台系统管理' },
  redirect: '/product/adminHome',
  children: [
    {
      path: 'adminHome',
      name: '管理首页',
      component: _import('myAgreement/index'),
      meta: { title: '管理首页' },
      redirect: '/product/adminHome/goHome',
      children: [
        {
          path: 'goHome',
          component: _import('myAgreement/elecManagement/index'),
          name: 'goHome',
          meta: { title: '首页' }
        }
      ]
    },
    // auditsManagementRouter,
    // systemManagementRouter,
    // sconfigurationManagementRouter,
    liencesRouter,
    dataCenterRouter
  ]
};
export default productRouter;
