import router from './router';
import store from './store';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条样式
import { MessageBox } from 'element-ui';
import { getToken } from '@/utils/auth'; // 验权
import commonFun from '@/common/js/func';
const {
  APPLICATION_NAME
} = window.environment.iotserver;
const whiteList = ['/login', '/platformIntroduction', '/register', '/forget', '/developGuideTop']; // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start();
  // console.log(from.path, 'from');
  // console.log(to.path, 'pesstest');
  // window.location;
  // console.log(location);
  // let myPath = location.hash;
  // debugger;
  // 4a
  // if (myPath.split('/')[2] === 'developGuide') {
  //   if (myPath.split('/')[3]) {
  //     let devPath = myPath.split('/')[3];
  //     let tempPath = '';
  //     for (let i = 0; i < devPath.length; i++) {
  //       tempPath += devPath[i];
  //       if (i === 4) {
  //         tempPath += '-';
  //       }
  //     }
  //     let token = tempPath.split('-')[1];
  //     // tempPath
  //     // next(`/login?redirect=${to.path}`); // 否则全部重定向到登录页
  //     // NProgress.done();
  //     // next({path: `/developGuideTop/developGuide`});
  //     // store.commit('SET_TOKEN', token);
  //     // location.hash = '/developGuideTop/developGuide';
  //     NProgress.done();
  //     console.log(devPath);
  //   }
  // }
  console.log(getToken(), 'token');
  if (getToken() === '10063004') {
    MessageBox.confirm('账号已被禁用，请换账号重新登录', '确定登出', {
      confirmButtonText: '重新登录',
      showCancelButton: false,
      // cancelButtonText: '取消',
      type: 'warning',
      showClose: false
    }).then(() => {
      store.dispatch('noTokenGet').then((res) => {
        if (res.code === 0) {
          sessionStorage.clear();
          let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
          if (keys) {
              for (var i = keys.length; i--;) { document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString(); };
          }
          location.href = res.result;
        }
        // debugger;
        // location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
      // location.href = `${APPLICATION_NAME}/login`;
      NProgress.done();
      // store.dispatch('FedLogOut').then(() => {
      //   // debugger;
      //   location.reload(); // 为了重新实例化vue-router对象 避免bug
      // });
    });
    // location.href = `${APPLICATION_NAME}/login`;
    // next(`/login?redirect=${to.path}`); // 否则全部重定向到登录页
    // NProgress.done();
  } else {
  if (getToken()) {
    // debugger;
    if (to.path === '/login') {
      // debugger;
      next({ path: '/product' });
      NProgress.done(); // if current page is dashboard will not trigger afterEach hook, so manually handle it
    } else {
      // debugger;
      // if (store.getters.roles.length === 0) {
      // store.dispatch('GetInfo').then(res => { // 拉取用户信息
      // console.log(store.getters.roles, 'store.getters.rolesstore.getters.roles');
      next();
      // }).catch((err) => {
      // store.dispatch('FedLogOut').then(() => {
      //   Message.error(err || 'Verification failed, please login again');
      //   next({ path: '/' });
      // });
      // });
      // } else {
      // next();
      // }
    }
  } else {
    let rootPath = commonFun.getRootPath(to.path);
    // debugger;
    // if (to.path.split('/')[1] === 'developGuideTop') {
    //   if (to.path.split('/')[3]) {
    //     let devPath = to.path.split('/')[3];
    //     let tempPath = '';
    //     for (let i = 0; i < devPath.length; i++) {
    //       tempPath += devPath[i];
    //       if (i === 4) {
    //         tempPath += '-';
    //       }
    //     }
    //     let token = tempPath.split('-')[1];
    //     // tempPath
    //     // next(`/login?redirect=${to.path}`); // 否则全部重定向到登录页
    //     // NProgress.done();
    //     next({path: `/developGuideTop/developGuide`});
    //     // store.commit('SET_TOKEN', token);
    //     // location.hash = '/developGuideTop/developGuide';
    //     NProgress.done();
    //     console.log(devPath);
    //   }
    // }

    console.log(rootPath);
    if (whiteList.indexOf(rootPath) !== -1) {
      next();
    } else {
      // 4a 登录
      location.href = `${APPLICATION_NAME}/login`;
      // next(`/login?redirect=${to.path}`); // 否则全部重定向到登录页
      NProgress.done();
    }
  }
}
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});
