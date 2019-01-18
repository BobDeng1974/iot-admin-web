<template>
 <div class="lua-list-mine-warp" v-loading="loading">
    <el-table :data="tableData" style="width: 100%"  class='table'>
        <el-table-column prop="index" align="center" :render-header="renderIndex"></el-table-column>
        <el-table-column prop="type" label="状态" align="center"></el-table-column>
        <el-table-column prop="name" label="处理人" align="center"></el-table-column>
        <el-table-column prop="time" label="时间" align="center"></el-table-column>
    </el-table>
 </div>
</template>
<script>
export default {
  props: {
    id: {
      type: Number,
      default: ''
    },
    flag: {
      type: Boolean
    }
  },
  data () {
    return {
      tableData: [
        {type: 1, name: 1, time: 1}
      ],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      loading: false
    }
  },
  watch: {
    flag: {
      handler(nowVal, oldVal) {
        if (nowVal === true) {
          this.initTab(this.tableData, this.currentPage, this.pageSize);
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    renderIndex (h, { column, $index }) {
      return h('span', [h('span', '编号')]);
    },
    initTab (val, currentPage, pageSize) {
      if (!val && !val.length) return [];
      for (var i = 0; i < val.length; i++) {
        val[i].index = ((currentPage - 1) * pageSize) + i + 1;
      }
      return val;
    }
  }
}
</script>
<style lang="less">
.lua-list-mine-warp{}
</style>

