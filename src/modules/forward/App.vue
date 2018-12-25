<template>
  <div id="app">
  </div>
</template>

<script>
import { setToken } from '@/utils/auth';
export default {
  beforeCreate() {
    debugger;
    console.log(window.location.href);
    console.log(window.location.search);
    if (window.location.search) {
      window.location.search.split('=')[1];
      setToken(window.location.search.split('=')[1]);
      window.location.href = '/';
    }
  },
  methods: {
    getRequest() {
      let url = location.search; // 获取url中"?"符后的字串
      let theRequest = {};
      let strs = '';
      if (url.indexOf('?') !== -1) {
        let str = url.substr(1);
        strs = str.split('&');
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
        }
      }
      return theRequest;
    }
  }
};
</script>

<style lang="less" scoped>
#app {
  width: 100%;
}
</style>
