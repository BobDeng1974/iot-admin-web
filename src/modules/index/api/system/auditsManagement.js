import request from '@/utils/http';
const {
    APPLICATION_NAME,
    MJAPP_NAME
  } = window.environment.iotserver;
const auditsManagementApi = {
  getApplianSelect: (query) => {
    return request({
      url: `${MJAPP_NAME}/applian/getApplianSelect`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  getSn8Select: (query) => {
    return request({
      url: `${MJAPP_NAME}/applian/getSn8Select`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  getExamineList: (query) => {
    return request({
      url: `${MJAPP_NAME}/audit/ExamineList`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  getHardware: (query) => {
    return request({
      url: `${MJAPP_NAME}/hardware/getHardware`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  examineHard: (query) => {
    return request({
      url: `${MJAPP_NAME}/audit/ExamineHard`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  uploadSdkLib: (query) => {
    return request({
      url: `${MJAPP_NAME}/hardware/uploadSdkLib`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  uploadProFile: (query) => {
    return request({
      url: `${MJAPP_NAME}/hardware/uploadHardFile`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  distributionKey: (query) => {
    return request({
      url: `${MJAPP_NAME}/audit/distributionKey`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  getNetwork: (query) => {
    return request({
      url: `${MJAPP_NAME}/hardware/getNetwork`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  getProtos: (query) => {
    return request({
      url: `${MJAPP_NAME}/hardware/getProtos`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  // 芯片信息下载其它芯片资料
  downFileUp: (params) => {
    return request({
      url: `${MJAPP_NAME}/hardware/downFile`,
      params: params,
      method: 'get',
      responseType: 'blob'
    }).then(res => res);
  },
  // 下载lua文件
  downloadLuaFile: (params) => {
    return request({
      url: `${MJAPP_NAME}/Agreement/downloadLua`,
      method: 'get',
      params: params,
      responseType: 'blob'
    }).then(res => res);
  },
  // lua列表
  getLuaList: (query) => {
    return request({
      url: `${MJAPP_NAME}/lua/list`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  // 测试审核
  luaTestAudit: (query) => {
    return request({
      url: `${MJAPP_NAME}/lua/testAudit`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  // 发布审核
  luaPublishAudit: (query) => {
    return request({
      url: `${MJAPP_NAME}/lua/publishAudit`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  // 发布测试环境
  luaPublishTest: (query) => {
    return request({
      url: `${MJAPP_NAME}/lua/publishTest`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  // 发布正式环境
  luaPublishPro: (query) => {
    return request({
      url: `${MJAPP_NAME}/lua/publishPro`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  // 流程记录
  getLuaaudit: (query) => {
    return request({
      url: `${MJAPP_NAME}/luaaudit/get`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  // 获取发布记录
  getLuapub: (query) => {
    return request({
      url: `${MJAPP_NAME}/luapub/get`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  // 运维确认
  updateLuapub: (query) => {
    return request({
      url: `${MJAPP_NAME}/luapub/update`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  // 确认发布测试
  luaUpdateTest: (query) => {
    return request({
      url: `${MJAPP_NAME}/lua/updateTest`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  // 确认发布
  luaPdatePro: (query) => {
    return request({
      url: `${MJAPP_NAME}/lua/pdatePro`,
      method: 'post',
      data: query
    }).then(res => res);
  },
  // 下载lua文件(新)
  downloadLua: (params) => {
    return request({
      url: `${MJAPP_NAME}/Agreement/downloadLua`,
      method: 'get',
      params: params,
      responseType: 'blob'
    }).then(res => res);
  },
  // 下载自测文件(新)
  downloadTest: (params) => {
    return request({
      url: `${MJAPP_NAME}/Agreement/downloadTestFile`,
      method: 'get',
      params: params,
      responseType: 'blob'
    }).then(res => res);
  },
      // 下载测试报告(新)
  downloadTestReport: (params) => {
    return request({
      url: `${MJAPP_NAME}/Agreement/downloadTestReport`,
      method: 'get',
      params: params,
      responseType: 'blob'
    }).then(res => res);
  }
};
export default auditsManagementApi;