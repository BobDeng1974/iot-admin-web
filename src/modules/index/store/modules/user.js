// import { loginByUsername } from './../..//api/login/login';
// import API from '../../api/myProductsData';
import { meauAuthed, meauAuthedDel } from '@/modules/index/api/system/common';
import API from './../../api/user/user';
import { getToken, setToken, removeToken } from '@/utils/auth';
import ls from '@/utils/storage/local_storage';

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    buttonFlag: [],
    setting: {
      articlePlatform: []
    },
    userInfo: {},
    saveGetUserInfo: {}
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
      setToken(token);
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction;
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting;
    },
    SET_STATUS: (state, status) => {
      state.status = status;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
      ls.addItem('roles', roles);
    },
    SET_BUTTONFLAG: (state, buttonFlag) => {
      const list = [];
      for (var i = 0; i < buttonFlag.length; i++) {
        if (buttonFlag[i].authed) {
          list.push(buttonFlag[i].permissionTag);
        }
      }
      state.buttonFlag = list;
      ls.addItem('buttonFlag', list);
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo;
      ls.addItem('userInfo', userInfo);
    },
    saveGetUserInfo: (state, saveGetUserInfo) => {
      debugger;
      state.saveGetUserInfo = saveGetUserInfo;
      ls.addItem('saveGetUserInfo', saveGetUserInfo);
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      // debugger;
      // userInfo.account.trim();
      return new Promise((resolve, reject) => {
        API.loginByUsername(userInfo).then(response => {
          const data = response.result;
          commit('SET_TOKEN', data.accessToken);
          commit('SET_USERINFO', data.user);
          resolve(data);
        }).catch(error => {
          reject(error);
        });
      });
    },
    getMeauAuthed({ commit, state }, id) {
      return new Promise((resolve, reject) => {
        API.getAuthedList(id).then((res) => {
          const buttonFlag = [];
          const obj = meauAuthed(res.result, 10, buttonFlag);
          // 讲数组中为null的删除
          const roles = meauAuthedDel(obj.source);
          commit('SET_ROLES', roles);
          commit('SET_BUTTONFLAG', obj.json);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },
    // 获取登陆用户的权限数组
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        API.logout().then(() => {
          // commit('SET_TOKEN', '');
          // commit('SET_ROLES', []);
          commit('SET_USERINFO', '');
          removeToken();
          ls.removeItem('userInfo');
          ls.removeItem('roles');
          ls.removeItem('userInfoNickName');
          ls.removeItem('buttonFlag');
          commit('saveGetUserInfo', null);
          ls.removeItem('saveGetUserInfo');

          ls.removeItem('proto');
          ls.removeItem('network');
          resolve(resolve);
        }).catch(error => {
          reject(error);
        });
      });
    },
    // 用户更新update
    update({ commit, state }, param) {
      return new Promise((resolve, reject) => {
        API.update(param).then((res) => {
          resolve(res);
        }).catch(error => {
          reject(error);
        });
      });
    },
    departmentAll({ commit, state }, param) {
      return new Promise((resolve, reject) => {
        API.departmentAll(param).then((res) => {
          resolve(res);
        }).catch(error => {
          reject(error);
        });
      });
    },
    // mipAdd
    mipAdd({ commit, state }, param) {
      return new Promise((resolve, reject) => {
        API.mipAdd(param).then((res) => {
          resolve(res);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 获取用户信息
    getUserInfo({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        API.getUser(params).then(response => {
          this.commit('saveGetUserInfo', response.result);
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },
    // 4A 登录 获取用户信息
    get4AUserInfo({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        API.get4AUser(params).then(response => {
          this.commit('saveGetUserInfo', response.result);
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },
    // 4a 登出
    adminWeb4Alogout({ commit, state }) {
      return new Promise((resolve, reject) => {
        API.adminWeb4Alogout().then(() => {
          // commit('SET_TOKEN', '');
          // commit('SET_ROLES', []);
          commit('SET_USERINFO', '');
          removeToken();
          ls.removeItem('userInfo');
          ls.removeItem('roles');
          ls.removeItem('userInfoNickName');
          ls.removeItem('buttonFlag');
          commit('saveGetUserInfo', null);
          ls.removeItem('saveGetUserInfo');

          ls.removeItem('proto');
          ls.removeItem('network');
          resolve(resolve);
        }).catch(error => {
          reject(error);
        });
      });
    },
    adminWeb4Alogin2({ commit }, userInfo) {
      debugger;
      // userInfo.account.trim();
      return new Promise((resolve, reject) => {
        API.adminWeb4Alogin2(userInfo).then(response => {
          const data = response.result;
          commit('SET_TOKEN', data.accessToken);
          commit('SET_USERINFO', data.user);
          resolve(data);
        }).catch(error => {
          reject(error);
        });
      });
    },
    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    // LogOut({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     logout(state.token).then(() => {
    //       commit('SET_TOKEN', '');
    //       commit('SET_ROLES', []);
    //       removeToken();
    //       resolve();
    //     }).catch(error => {
    //       reject(error);
    //     });
    //   });
    // },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        // commit('SET_TOKEN', '');
        // commit('SET_USERINFO', '');
        // removeToken();
        // // ls.removeItem('iotInfo');
        // ls.removeItem('userInfo');
        // ls.removeItem('roles');

        commit('SET_USERINFO', '');
        removeToken();
        ls.removeItem('userInfo');
        ls.removeItem('roles');
        ls.removeItem('userInfoNickName');
        ls.removeItem('buttonFlag');
        commit('saveGetUserInfo', null);
        ls.removeItem('saveGetUserInfo');

        ls.removeItem('proto');
        ls.removeItem('network');
        resolve();
      });
    }

    // // 动态修改权限
    // ChangeRoles({ commit }, role) {
    //   return new Promise(resolve => {
    //     commit('SET_TOKEN', role);
    //     setToken(role);
    //     getUserInfo(role).then(response => {
    //       const data = response.data;
    //       commit('SET_ROLES', data.roles);
    //       commit('SET_NAME', data.name);
    //       commit('SET_AVATAR', data.avatar);
    //       commit('SET_INTRODUCTION', data.introduction);
    //       resolve();
    //     });
    //   });
    // }
  }
};

export default user;
