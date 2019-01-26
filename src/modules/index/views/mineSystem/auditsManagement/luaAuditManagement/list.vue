<template>
 <div class="lua-list-mine-warp" v-loading="loading">
     <div>
        <el-table :data="tableData" style="width: 100%"  class='table' :max-height="300">
            <el-table-column prop="index" align="center" width="50" :render-header="renderIndex"></el-table-column>
            <el-table-column prop="publicStatus" label="状态" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.publicStatus === 0">编辑中</span>
                    <span v-if="scope.row.publicStatus === 10">等待测试审核</span>
                    <span v-if="scope.row.publicStatus === 20">测试审核成功</span>
                    <span v-if="scope.row.publicStatus === 5">测试审核失败</span>
                    <span v-if="scope.row.publicStatus === 30">等待发布审核</span>
                    <span v-if="scope.row.publicStatus === 40">发布审核成功</span>
                    <span v-if="scope.row.publicStatus === 25">发布审核失败</span>
                    <span v-if="scope.row.publicStatus === 23">发布测试环境成功</span>
                    <span v-if="scope.row.publicStatus === 50">发布成功</span>
                </template>
            </el-table-column>
            <el-table-column prop="auditor" label="处理人" align="center"></el-table-column>
            <el-table-column prop="auditTime" width="170" label="时间" align="center"></el-table-column>
        </el-table>
    </div>
    <!-- <div class="fenye">
        <mine-pagination
        @numberChange="numberChange"
        :total="total"
        :pageSizes="[10, 20, 30]"
        :page-size="pageSize"
        :current-page="currentPage"
        >
        </mine-pagination>
    </div> -->
 </div>
</template>
<script>
import API from '@/modules/index/api/system/system.js';
import minePagination from '@/modules/index/components/mine-pagination';
export default {
  props: {
    id: {
      type: [String, Number]
    },
    flag: {
      type: Boolean
    }
  },
  components: {
    minePagination
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
          this.pageSize = 10;
          this.getList(true);
        //   this.initTab(this.tableData, this.currentPage, this.pageSize);
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
    numberChange (val) {
      switch (val.flag) {
        case 'pageSize':
          this.pageSize = val.pageSize;
          this.getList(true);
          break;
        case 'currentPage':
          this.currentPage = val.currentPage;
          this.getList(false);
          break;
        default:
          break;
      }
    },
    getList (flag) {
      this.loading = true;
      if (flag) {
        this.currentPage = 1;
      }
      const params = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        luaId: this.id
      };
      API.getLuaaudit(params)
          .then(res => {
            this.loading = false;
            this.tableData = res.result ? this.initTab(res.result, this.currentPage, this.pageSize) : [];
            this.total = res.result.total;
          })
          .catch(() => {
            this.loading = false;
          });
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
.lua-list-mine-warp{
}
</style>

