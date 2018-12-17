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
      setToken(window.location.search.split('=')[1]);
      window.location.href = '/';
    }
  }
};
</script>

