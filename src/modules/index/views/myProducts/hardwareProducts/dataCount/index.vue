<template>
  <div class="page-container">
    暂时未开发
    <!-- {{hardwareList}} -->
    <!-- <ul class="card-list">
      <Card @cardBtnHandle="cardBtnHandle" v-for="(item, index) in filteredTodos" :key="index" :card="item" />
      <Card @addCard="addCard"></Card>
    </ul> -->
  </div>
</template>
<script>
// ./../../../components/cardList/Card.vue
// import Card from './../../../../components/cardList/Card';
// import { mapGetters } from 'vuex';
export default {
  // components: {Card},
  // data() {
  //   return {
  //     pageObj: {
  //       pageNo: 1,
  //       pageSize: 10
  //     }
  //     // filteredTodos: null
  //   };
  // },
  // methods: {
  //   async getHardwareList() {
  //     try {
  //       await this.$store.dispatch('getHardwareList', {
  //         pageNo: this.pageObj.pageNo,
  //         pageSize: this.pageObj.pageSize
  //       });
  //     } catch (e) {}
  //   },
  //   addCard() {},
  //   cardBtnHandle() {}
  // },
  // computed: {
  //   ...mapGetters(['hardwareList']),
  //   filteredTodos() {
  //     // this.$store.getters.funllName
  //     console.log(this.$store.getters.hardwareList);
  //     return this.$store.getters.hardwareList;
  //   }
  // },
  // mounted() {
  //   this.getHardwareList();
  // }
};
</script>

