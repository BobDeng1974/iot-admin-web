<template>
  <div>首页</div>
</template>
<script>
export default {
  created() {
    this.$store.dispatch('getUserInfo', '');
  }
};
</script>

