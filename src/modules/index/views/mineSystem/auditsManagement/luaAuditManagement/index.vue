<template>
    <div class="lua-mangermen-mine-wap" >
        <div class="title-account">
          <con-header :title-icon="addProductsIcon" title="lua审核管理" :hasBottomBorder="true"></con-header>
        </div>
        <div class="table-moduleVendor" v-loading="loading">
          <el-table :data="tableData" style="width: 100%"  class='table'>
            <el-table-column prop="index" align="center" :render-header="renderIndex"></el-table-column>
            <el-table-column prop="name" label="名称" align="center"></el-table-column>
            <el-table-column prop="applianceType" label="品类" align="center"></el-table-column>
            <el-table-column prop="sn8" label="型号码" align="center"></el-table-column>
            <el-table-column prop="modelNumber" label="model-number" align="center"></el-table-column>
            <el-table-column prop="version" label="版本号" align="center"></el-table-column>
            <el-table-column prop="functionDescription" label="功能说明" align="center"></el-table-column>
            <el-table-column prop="publicStatus" label="状态" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.publicStatus === 0" class="other">编辑中</span>
                <span v-if="scope.row.publicStatus === 10" class="other">等待测试审核</span>
                <span v-if="scope.row.publicStatus === 20" class="other">测试审核成功</span>
                <span v-if="scope.row.publicStatus === 5" class="other">测试审核失败</span>
                <span v-if="scope.row.publicStatus === 30" class="other">等待发布审核</span>
                <span v-if="scope.row.publicStatus === 40" class="other">发布审核成功</span>
                <span v-if="scope.row.publicStatus === 25" class="other">发布审核失败</span>
                <span v-if="scope.row.publicStatus === 23" class="other">发布测试环境成功</span>
                <span v-if="scope.row.publicStatus === 50" class="other">发布成功</span>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="auditDate" label="审核时间" align="center"></el-table-column> -->
            <el-table-column prop="effectDate" label="生效时间" align="center"></el-table-column>
            <el-table-column prop="cuid" label="上传人" align="center"></el-table-column>
            <el-table-column label="操作" align="center" width='150' fixed="right">
              <template slot-scope="scope">
                <span @click="toTips(scope.row)">详情</span>
                <span @click="publishTest(scope.row)" v-if="scope.row.publicStatus === 20">发布测试环境</span>
                <span @click="publish(scope.row)" v-if="scope.row.publicStatus === 40">发布环境</span>
                <span @click="staticLua(scope.row)" v-if="scope.row.publicStatus === 23 || scope.row.publicStatus === 50">环境查看</span>
              </template>
            </el-table-column>
          </el-table>
          <div class="fenye">
            <mine-pagination
            @numberChange="numberChange"
            :total="total"
            :pageSizes="[10, 20, 30]"
            :page-size="pageSize"
            :current-page="currentPage"
            >
            </mine-pagination>
          </div>
        </div>
        <!-- 弹框 -->
        <mine-dialog :dialogFormVisible='flag' :width='"40%"' :modalFlag="modalFlag" @close="close" :title="title" :showClose="showClose">
          <publishing-testenvironment :flag="flag" slot="option" @close="close" :info="info" v-if="type === 'publishingTestEnvironment'" @requestTable="handleCurrentChange('creadModuleVendor')"></publishing-testenvironment>
          <publishing-environment :flag="flag" slot="option" @close="close" :info="info" v-if="type === 'publishingEnvironment'" @requestTable="handleCurrentChange('creadModuleVendor')"></publishing-environment>
          <lua-info slot="option" @close="close"  :info="info" v-if="type === 'info'" @requestTable="handleCurrentChange('info')"></lua-info>
          <lua-static slot="option" :flag="flag" @close="close"  :info="info" v-if="type === 'static'" @requestTable="handleCurrentChange('info')"></lua-static>
        </mine-dialog>
    </div>
</template>
<script>
import mineDialog from '@/modules/index/components/mine-dialog';
import conHeader from '@/components/awesome/con-header/con-header';
import publishingEnvironment from './publishingEnvironment';
import publishingTestenvironment from './publishingTestEnvironment';
import luaInfo from './info';
import luaStatic from './static';
import API from '@/modules/index/api/system/system.js';
import { dictMixin } from '@/modules/index/views/mineSystem/dictMixin';
import minePagination from '@/modules/index/components/mine-pagination';
export default {
  components: {
    conHeader,
    mineDialog,
    publishingEnvironment,
    publishingTestenvironment,
    luaInfo,
    minePagination,
    luaStatic
  },
  mixins: [ dictMixin ],
  created () {
    this.$route;
    this.$router.currentRoute.query;
    this.info;
    debugger;
    this.getList(true);
    // this.getAlluser();
  },
  data () {
    return {
      pageSize: 10,
      currentPage: 1,
      addProductsIcon: '',
      total: 0,
      tableData: [],
      // userList: [],
      // 控制弹框显影
      flag: false,
      // 是否显示按钮
      showClose: true,
      modalFlag: false,
      title: '',
      type: '',
      info: {},
      loading: false
    };
  },
  methods: {
    getList (flag) {
      this.loading = true;
      if (flag) {
        this.currentPage = 1;
      }
      const params = {
        pageNo: this.currentPage,
        pageSize: this.pageSize
      };
      API.getLuaList(params)
    //   API.getSupplyListIndex(params)
          .then(res => {
            this.loading = false;
            this.tableData = res.result ? this.initTab(res.result.data, this.currentPage, this.pageSize) : [];
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
    },
    initDialog (title, type, val) {
      this.title = title;
      this.flag = true;
      this.type = type;
      this.info = {...val};
      debugger;
    },
    toTips (val) {
      this.initDialog('详情', 'info', val);
    },
    publish (val) {
      console.log(val);
      this.initDialog('发布正式环境', 'publishingEnvironment', val);
    },
    staticLua (val) {
      this.initDialog('环境查看', 'static', val);
    },
    publishTest (val) {
      console.log(val);
      this.initDialog('发布测试环境', 'publishingTestEnvironment', val);
    },
    renderIndex (h, { column, $index }) {
      return h('span', [h('span', '编号')]);
    },
    close (val) {
      this.flag = val;
    },
    handleCurrentChange (val) {
      this.getList(true);
    //   switch (val) {
    //     case 'creadModuleVendor':
    //       this.getList(true);
    //       break;
    //     case 'takeOver':
    //       this.getList(false);
    //       break;
    //     case 'info':
    //       this.getList(false);
    //       break;
    //     default:
    //       break;
    //   }
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
    }
  }
};
</script>
<style lang="less" scoped>
.lua-mangermen-mine-wap{
  .add-moduleVendor{
    padding: 24px 0 16px 0;
  }
  .fenye{
    text-align: right;
    margin-top: 16px;
  }
  .table-moduleVendor{
      margin-top: 24px;
    td {
      .other {
        color: #606266;
      }
      span{
        padding: 0 2px;
        color: #5667FF;
      }
      span:hover{
        cursor: pointer;
      }
    }
  }
}
</style>
