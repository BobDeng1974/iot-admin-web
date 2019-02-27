import request from '@/utils/http';
const {
  APPLICATION_NAME,
  MJAPP_NAME
} = window.environment.iotserver;
const configurationManagementApi = {
  // 型号录入管理api
  getTypeEnterList: (query) => {
    return request({
      url: `${MJAPP_NAME}/applian/getSn8List`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  getTypeEnterInfo: (query) => {
    return request({
      url: `${MJAPP_NAME}/applian/finSn8`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  updateTypeEnterInfo: (query) => {
    return request({
      url: `${MJAPP_NAME}/applian/updateSn8`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  addTypeEnterInfo: (query) => {
    return request({
      url: `${MJAPP_NAME}/applian/addSn8`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  delTypeEnterInfo: (query) => {
    return request({
      url: `${MJAPP_NAME}/applian/delSn8`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  // 文档管理api
  getDocList: () => {
    return request({
      url: `${MJAPP_NAME}/doc/allMenu`,
      method: 'post'
    }).then(res => res);
  },
  // getDocList: (query) => {
  //   return request({
  //     url: `${APPLICATION_NAME}/doc/allMenu`,
  //     method: 'post',
  //     data: query
  //   }).then(res => res);
  // },
  // mac地址管理api
  validMacList: (query) => {
    return request({
      url: `${MJAPP_NAME}/mac/list`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  allocatedMacList: (query) => {
    return request({
      url: `${MJAPP_NAME}/macAllocated/list`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  getNumber: () => {
    return request({
      url: `${MJAPP_NAME}/mac/get`,
      method: 'post'
    }).then(res => res);
  },
  addValidMac: (query) => {
    return request({
      url: `${MJAPP_NAME}/mac/add`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  // 品类与事业部管理API
  applianList: (query) => {
    return request({
      url: `${MJAPP_NAME}/applian/list`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  deleteApplian: (query) => {
    return request({
      url: `${MJAPP_NAME}/applian/delete`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  updateApplian: (query) => {
    return request({
      url: `${MJAPP_NAME}/applian/update`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  addApplian: (query) => {
    return request({
      url: `${MJAPP_NAME}/applian/add`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  getDepartment: (query) => {
    return request({
      url: `${MJAPP_NAME}/department/all`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  // 模组厂商管理API
  getSupplyListIndex: (query) => {
    return request({
      url: `${MJAPP_NAME}/supply/list`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  getSupplyInfo: (query) => {
    return request({
      url: `${MJAPP_NAME}/supply/get`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  supplyAdd: (query) => {
    return request({
      url: `${MJAPP_NAME}/supply/add`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  updateContact: (query) => {
    return request({
      url: `${MJAPP_NAME}/supply/updateContact`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  getAllusers: () => {
    return request({
      url: `${MJAPP_NAME}/user/getContacts`,
      method: 'post'
    }).then(res => res);
  },
  // SN白名单管理
  getSnList: (query) => {
    return request({
      url: `${MJAPP_NAME}/sn/list`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  recoverSn: (query) => {
    return request({
      url: `${MJAPP_NAME}/sn/recover`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  forbidSn: (query) => {
    return request({
      url: `${MJAPP_NAME}/sn/forbid`,
      method: 'post',
      data: query
    }).then(res => res);
  }
};
export default configurationManagementApi;