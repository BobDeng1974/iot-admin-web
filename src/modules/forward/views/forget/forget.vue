<template>
  <div>
    test
  </div>
</template>
<script>
import { setToken } from '@/utils/auth';
export default {
  mounted() {
    console.log(window.location.href);
    console.log(window.location.search);
    if (window.location.search) {
      window.location.search.split('=')[1];
      // alert(window.location.search.split('=')[1]);
      setToken(window.location.search.split('=')[1]);
      window.location.hash = '/developGuideTop/developGuide/guide';
      // window.location.hash = '/product';
      // this.$store.commit('SET_TOKEN', window.location.search.split('=')[1]);
    }
    debugger;
    // console.log(this.$route);
    // if()
    // console.log(this.$route.query);
    // console.log(this.$route.query.accessToken);
    // console.log(this.$route.params.accessToken, 'this.$route.params.accessToken');
    // if (this.$route.params.accessToken) {
    //   this.$store.commit('SET_TOKEN', this.$route.params.accessToken);
    // }

    debugger;
    // 获取4a登录信息
    // this.$store.dispatch('get4AUserInfo');
  }
};
</script>

