import Cookies from 'js-cookie';

const TokenKey = 'accessToken';

export function getToken() {
  return Cookies.get(TokenKey);
  // if (this.isExist(TokenKey)) {
    // return sessionStorage.getItem(TokenKey);
  // } else {
  //   return null;
  // }
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
  // sessionStorage.setItem(TokenKey, typeof val === 'object' ? JSON.stringify(token) : token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
  // if (this.isExist(TokenKey)) {
    // sessionStorage.removeItem(TokenKey);
  // }
}

// /**
//  * Created by CHENRC2 on 2017-7-17.
//  * sessionStorage h5 工具类
//  */

// var sessionStorageTool = {
//   /**
//    * [addItem 添加相应的sessionStorage键值对，已存在的key会被覆盖]
//    * @param {[type]} key [键]
//    * @param {[type]} val [值]
//    */
//   addItem: function (key, val) {
//     sessionStorage.setItem(key, typeof val === 'object' ? JSON.stringify(val) : val);
//   },
//   /**
//    * [removeItem 删除某个键的数据]
//    * @param  {[type]} key [key名称]
//    * @return {[type]}     [description]
//    */
//   removeItem: function (key) {
//     if (this.isExist(key)) {
//       sessionStorage.removeItem(key);
//     }
//   },
//   /**
//    * [removeItem 删除所有session storage数据]
//    * @return {[type]}     [description]
//    */
//   removeAll: function () {
//     sessionStorage.clear();
//   },
//   /**
//    * [getItem 获取相应的值]
//    * @param  {[type]} key [key名称]
//    * @return {[type]}     [堆在返回对应的值， 不存在返回null]
//    */
//   getItem: function (key) {
//     if (this.isExist(key)) {
//       return sessionStorage.getItem(key);
//     } else {
//       return null;
//     }
//   },
//   /**
//    * [getItem 获取相应的值]
//    * @param  {[type]} key [key名称]
//    * @return {[type]}     [堆在返回对应的值， 不存在返回null]
//    */
//   getObject: function (key) {
//     if (this.isExist(key)) {
//       try {
//         return JSON.parse(sessionStorage.getItem(key));
//       } catch (ex) {
//         return [];
//       }
//     } else {
//       return null;
//     }
//   },
//   /**
//    * [isExist 检查是否已存在对应的key值]
//    * @param  {[type]}  key [key名称]
//    * @return {Boolean}     [true false]
//    */
//   isExist: function (key) {
//     let isExist = false;
//     let hasKey;
//     if (key === '') {
//       alert('key不允许为空');
//     }
//     // 循环 sessionStorage 所有缓存数据
//     for (var i = 0; i < sessionStorage.length; i++) {
//       hasKey = sessionStorage.key(i);
//       if (hasKey === key) {
//         isExist = true;
//         continue;
//       }
//     }
//     return isExist;
//   },
//   /**
//    * [checkIsSupport 检查浏览器是否支持 sessionStorage]
//    * @return {[type]} [description]
//    */
//   checkIsSupport: function () {
//     if (!window.sessionStorage) {
//       alert('您的浏览器不支持session缓存');
//     }
//   }
// };

// export default sessionStorageTool;
