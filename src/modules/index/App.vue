<template>
  <div id="app" v-on:click="myClick">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oldEle: ''
    };
  },
  created() {


    // 在页面加载时读取localStorage里的状态信息
    // localStorage.getItem('iotInfo') &&
    //   this.$store.replaceState(
    //     Object.assign(
    //       this.$store.state,
    //       JSON.parse(localStorage.getItem('iotInfo'))
    //     )
    //   );
    // 在页面刷新时将vuex里的信息保存到localStorage里
    // window.addEventListener('beforeunload', () => {
    //   localStorage.setItem('iotInfo', JSON.stringify(this.$store.state));
    // });
  },
  methods: {
    myClick(e) {
      if (
        this.oldEle &&
        this.oldEle.children.length > 0 &&
        this.oldEle.children[0].innerHTML === e.target.innerHTML
      ) {
        this.oldEle.style.color = '#fff';
        this.oldEle.classList.add('is-active');
      }
      if (e.target.className === 'level-nav-item') {
        if (
          e.target.innerHTML === '我的产品' ||
          e.target.innerHTML === '开发指引' ||
          e.target.innerHTML === '下载中心'
        ) {
          this.findNodeChildren(
            document.querySelectorAll('.slide-menu .menu-wrapper')
          );
        }
      }
    },
    findNodeChildren(arr) {
      if (arr.length && arr.length > 0) {
        for (let index = 0; index < arr.length; index++) {
          const element = arr[index];
          if (element.children.length > 0) {
            this.findNodeChildren(element.children);
          }
          if (
            element.classList.contains('el-menu-item') &&
            element.classList.contains('is-active')
          ) {
            element.classList.remove('is-active');
            this.oldEle = element;
            element.style.color = '';
          }
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
#app {
  width: 100%;
}
</style>
