import request from '@/utils/http';
const {
  APPLICATION_NAME,
  MJAPP_NAME
} = window.environment.iotserver;

// 手机获取验证码api
export const getSmsCode = (params) => {
  return request({
    url: `${APPLICATION_NAME}/user/getSmsCode`,
    method: 'post',
    data: params
  }).then(res => res);
};

// 重置密码接口api
export const resetPsw = (params) => {
  return request({
    url: `${MJAPP_NAME}/user/resetPassword`,
    method: 'post',
    data: params
  }).then(res => res);
};