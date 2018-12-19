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
  }
};
</script>

<style lang="less" scoped>
  #app {
    width: 100%;
  }
</style>
