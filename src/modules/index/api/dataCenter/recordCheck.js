import request from '@/utils/http';
// import axios from 'axios';
// import { getToken } from '@/utils/auth';
const {
  APPLICATION_NAME,
  MJAPP_NAME
} = window.environment.iotserver;
const recordCheckApi = {
    // 用户信息查询API
    getSmartUserInfo: (query) => {
        return request({
          url: `${MJAPP_NAME}/smartUser/get`,
          data: query,
          method: 'post'
        }).then(res => res);
      },
    // 设备信息查询API
    getSmartApplianceInfo: (query) => {
      return request({
        url: `${MJAPP_NAME}/smartAppliance/get`,
        data: query,
        method: 'post'
      }).then(res => res);
    },
    // 设备状态查询API
    getSmartStateInfo: (query) => {
      // return axios.post(`${APPLICATION_NAME}/smartAppliance/getState`, query, {
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //     'accessToken': getToken()
      //   }
      //   }).then(response => response.data);
        return request({
          url: `${MJAPP_NAME}/smartAppliance/getState`,
          data: query,
          method: 'post'
        }).then(res => res);
    },
    // 产品数据统计api
    getStatisticsInfo: (query) => {
      return request({
        url: `${MJAPP_NAME}/statistics/overview`,
        data: query,
        method: 'post'
      }).then(res => res);
    },
    // 硬件申请列表
    getHardwareListInfo: (query) => {
      return request({
        url: `${MJAPP_NAME}/hardware/getHardwareList`,
        data: query,
        method: 'post'
      }).then(res => res);
    },
    // 美居lua列表
    getAppLuaList: (query) => {
      return request({
        url: `${MJAPP_NAME}/lua/getAppLuaList`,
        data: query,
        method: 'post'
      }).then(res => res);
    },
    downLoadAppLua: (params) => {
      return request({
        url: `${MJAPP_NAME}/lua/downloadAppLua`,
        params: params,
        method: 'get',
        responseType: 'blob'
      }).then(res => res);
    },
    // 环境查看接口（数据中心）
    luapubGetEnvironment: (query) => {
      return request({
        url: `${MJAPP_NAME}/luapub/getEnvironment`,
        data: query,
        method: 'post'
      }).then(res => res);
    },
    // 云端lua列表
    getCloudLuaList: (query) => {
      return request({
        url: `${MJAPP_NAME}/lua/getCloudLuaList`,
        data: query,
        method: 'post'
      }).then(res => res);
    },
    downLoadCloudLua: (params) => {
      return request({
        url: `${MJAPP_NAME}/lua/downloadCloudLua`,
        params: params,
        method: 'get',
        responseType: 'blob'
      }).then(res => res);
    }
};
export default recordCheckApi;