<template>
  <!--电控协议列表-->
  <div class="table-wrapper">
    <el-table class="table" ref="multipleTable" :data="dataList" @selection-change="handleSelectionChange" style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>

      <!-- <el-table-column prop="id" label="编号" align="center" show-overflow-tooltip width="55"></el-table-column> -->
      <el-table-column prop="index" width="50" align="center" :render-header="renderIndex"></el-table-column>
      <el-table-column prop="name" label="名称" width="100" show-overflow-tooltip></el-table-column>
      <!-- <el-table-column prop="applianceType" label="品类名称" width="100" show-overflow-tooltip></el-table-column> -->
      <el-table-column prop="nameZh" label="品类名称" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="sn8" label="型号码" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="cName" label="上传人" show-overflow-tooltip></el-table-column>
      <el-table-column prop="cdate" label="新建时间" show-overflow-tooltip></el-table-column>
      <el-table-column prop="publicStatus" label="开发状态" align="center">
        <template slot-scope="scope">
          <div>{{scope.row.publicStatus===1?'开发中':'已发布' }}</div>
        </template>
      </el-table-column>
    </el-table>
    <!--分页查询-->
    <pagination :pageSizes="[5, 10, 15, 20]" :currentPage="pageObj.pageNo" :pageSize="pageObj.pageSize" :total="pageObj.total" @pageSize-change="handleSizeChange" @currentPage-change="handleCurrentChange">
    </pagination>
    <div class="">
      <el-button type="primary" @click="luaHandleSave">保存</el-button>
    </div>
  </div>
</template>
<script>
import pagination from '@/components/awesome/pagination/main';
export default {
  components: { pagination },
  props: {
    dialogData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      dataList: [],
      pageObj: {
        pageNo: 1,
        pageSize: 5,
        total: 0
      },
      tempParam: {}
    };
  },
  mounted() {
    this.getLuaList();
  },
  methods: {
        // 给请求回来的表格数据新增index属性（序号）
    initTableData(val) {
      if (!val && !val.length) return [];
      for (var i = 0; i < val.length; i++) {
        val[i].index = (this.pageObj.pageNo - 1) * this.pageObj.pageSize + i + 1;
      }
      return val;
    },
    renderIndex(h, { column, $index }) {
      return h('span', [h('span', '编号')]);
    },
    handleSelectionChange(val) {
      debugger;
      if (val.length > 1) {
        this.$message({
          message: '只能单选',
          type: 'warning',
          onClose: () => {
            this.$refs.multipleTable.clearSelection();
          }
        });

        return;
      }
      if (val.length === 1) {
      console.log(val);
      this.tempParam = {
        'applianceType': val[0].applianceType,
        'sn8': val[0].sn8,
        'hardId': this.dialogData.hardId,
        'hardName': val[0].name,
        'luaId': val[0].id
      };
      }
    },
    luaHandleSave() {
      if (Object.keys(this.tempParam).length > 0) {
        debugger;
      this.hardRelationLua(this.tempParam);
      } else {
        this.$message({
          message: '请选择lua',
          type: 'warning'
        });
      }
    },
    async hardRelationLua(param) {
      try {
        await this.$store.dispatch('hardRelationLua', param).then(result => {
          debugger;
          if (result.code === 0) {
            // this.upImgSrc = result.result;
            // this.addSdkForm.succPic = result.result;
            debugger;
            this.$message({
              message: result.message,
              type: 'success'
            });
            this.$emit('handleSave', {isShow: false});
          }
        });
      } catch (e) {}
    },
    // 详情
    async getLuaList() {
      let param = {
        pageSize: this.pageObj.pageSize,
        pageNo: this.pageObj.pageNo,
        sn8: this.dialogData.sn8,
        hardId: this.dialogData.hardId
      };
      try {
        await this.$store.dispatch('getLuaList', param).then(res => {
          if (res.code === 0) {
          this.pageObj.total = res.result ? res.result.total : 0;
          this.dataList = res.result ? this.initTableData(res.result.data) : [];
        } else {
          this.dataList = [];
          this.total = 0;
        }
          //   this.dataList = result.result.data || [];
          //   this.pageObj.total = result.result.total;
          //   // this.upImgSrc = result.result;
          //   // this.addSdkForm.succPic = result.result;
          //   debugger;
          //   // this.$message({
          //   //   message: result.message,
          //   //   type: 'success'
          //   // });
          // }
        });
      } catch (e) {}
    },
    // 改变pageSize
    handleSizeChange(val) {
      this.pageObj.pageSize = val;
      this.getLuaList();
    },

    // 改变currentPage
    handleCurrentChange(val) {
      this.pageObj.pageNo = val;
      this.getLuaList();
    }
  }
};
</script>

