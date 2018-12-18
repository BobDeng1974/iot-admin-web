import request from '@/utils/http';
const {
    APPLICATION_NAME,
    MJAPP_NAME
  } = window.environment.iotserver;
const licenseManagementApi = {
  /*
    申请（页面）
  */
  getLicApplyList: (query) => {
    return request({
      url: `${MJAPP_NAME}/licApply/list`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  addLicApply: (query) => {
    return request({
      url: `${MJAPP_NAME}/licApply/apply`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  getLicApplyInfo: (query) => {
    return request({
      url: `${MJAPP_NAME}/licApply/get`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  auditLicApplyInfo: (query) => {
    return request({
      url: `${MJAPP_NAME}/licApply/audit`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  // 预测单请求
  findListBySupplyId: (query) => {
    return request({
      url: `${MJAPP_NAME}/licPreApply/findListBySupplyId `,
      method: 'post',
      data: query
    }).then(res => res);
  },
  /*
    预申请（页面）
  */
  getLicPreApplyList: (query) => {
    return request({
      url: `${MJAPP_NAME}/licPreApply/list`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  addLicPreApply: (query) => {
    return request({
      url: `${MJAPP_NAME}/licPreApply/apply`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  getLicPreApplyInfo: (query) => {
    return request({
      url: `${MJAPP_NAME}/licPreApply/get`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  auditLicPreApplyInfo: (query) => {
    return request({
      url: `${MJAPP_NAME}/licPreApply/audit`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  // 获取模组厂商下拉
  getSupplyList: () => {
    return request({
      url: `${MJAPP_NAME}/supply/all`,
      method: 'post'
    }).then(res => res);
  },
  // 下载Lic
  downloadLic: (query) => {
    return request({
      url: `${MJAPP_NAME}/licApply/downloadLic`,
      method: 'post',
      data: query,
      responseType: 'blob'
    }).then(res => res);
  },
  getHardInfoForLicApply: (query) => {
    return request({
      url: `${MJAPP_NAME}/hardware/getHardInfoForLicApply`,
      method: 'post',
      data: query
    }).then(res => res);
  }
};
export default licenseManagementApi;