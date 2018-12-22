import request from '@/utils/http';
// import axios from 'axios';
// import { getToken } from '@/utils/auth';
const {
  MJAPP_NAME
} = window.environment.iotserver;
const dataStatistics = {
  // 产品数据统计概览 查询列表
  statistics: (query) => {
    return request({
      url: `${MJAPP_NAME}/statistics/overview`,
      data: query,
      method: 'post'
    }).then(res => res);
  },
  // 产品数据统计中的下拉列表框数据
  queryinfo: (query) => {
    return request({
      url: `${MJAPP_NAME}/statistics/queryinfo`,
      data: query,
      method: 'post'
    }).then(res => res);
  },
  // 根据省数据获取城市信息
  querycity: (query) => {
    return request({
      url: `${MJAPP_NAME}/statistics/querycity`,
      data: query,
      method: 'post'
    }).then(res => res);
  },
  // 设备明细
  devicelist: (query) => {
    return request({
      url: `${MJAPP_NAME}/statistics/devicelist`,
      data: query,
      method: 'post'
    }).then(res => res);
  },
  // 设备明细导出
  devicesexport: (params) => {
    return request({
      url: `${MJAPP_NAME}/statistics/devicesexport`,
      params: params,
      method: 'get',
      responseType: 'blob'
    }).then(res => res);
  },
  // 用户明细
  userlist: (query) => {
    return request({
      url: `${MJAPP_NAME}/statistics/userlist`,
      data: query,
      method: 'post'
    }).then(res => res);
  }

};
export default dataStatistics;
