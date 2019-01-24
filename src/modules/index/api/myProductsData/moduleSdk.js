import request from '@/utils/http';
const {
  MJAPP_NAME
} = window.environment.iotserver;
const moduleSdkApi = {
  // 获取模块SDK列表信息
  sdkpackageinfoList: (query) => {
    return request({
      url: `${MJAPP_NAME}/moduleSDKManagement/list`,
      method: 'post',
      data: query
    });
  },
  moduleSDKManagementGet: (params) => {
    return request({
      url: `${MJAPP_NAME}/moduleSDKManagement/get`,
      method: 'get',
      params: params
    }).then(res => res);
  },
  // 创建模块SDK信息
  sdkpackageinfoCreate: (query) => {
    return request({
      url: `${MJAPP_NAME}/moduleSDKManagement/create`,
      method: 'post',
      data: query
    });
  },
  // 审批
  sdkpackageinfoAudit: (query) => {
    return request({
      url: `${MJAPP_NAME}/moduleSDKManagement/audit`,
      method: 'post',
      data: query
    });
  },
  // 发布
  sdkpackageinfoPublish: (query) => {
    return request({
      url: `${MJAPP_NAME}/moduleSDKManagement/publish`,
      method: 'post',
      data: query
    });
  },
  // 删除
  sdkpackageinfoDelete: (query) => {
    return request({
      url: `${MJAPP_NAME}/moduleSDKManagement/delete`,
      method: 'post',
      data: query
    });
  }
};
export default moduleSdkApi;
