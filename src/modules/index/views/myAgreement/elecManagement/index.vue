<template>
  <div>首页</div>
</template>
<script>
export default {
  created() {
    // 获取4a登录信息
    this.$store.dispatch('get4AUserInfo');
  }
};
</script>

