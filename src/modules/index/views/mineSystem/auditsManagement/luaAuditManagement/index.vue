<template>
    <div class="lua-mangermen-mine-wap" >
        <div class="title-account">
          <con-header :title-icon="addProductsIcon" title="lua审核管理" :hasBottomBorder="true"></con-header>
        </div>
        <div class="table-moduleVendor" v-loading="loading">
          <el-table :data="tableData" style="width: 100%"  class='table'>
            <el-table-column prop="index" align="center" :render-header="renderIndex"></el-table-column>
            <el-table-column prop="name" label="名称" align="center"></el-table-column>
            <el-table-column prop="code" label="品类" align="center"></el-table-column>
            <el-table-column prop="address" label="型号码" align="center"></el-table-column>
            <el-table-column prop="email" label="model-number" align="center"></el-table-column>
            <el-table-column prop="telephone" label="版本号" align="center"></el-table-column>
            <el-table-column prop="contactName" label="功能说明" align="center"></el-table-column>
            <el-table-column prop="mobile" label="状态" align="center"></el-table-column>
            <el-table-column prop="mobile" label="审核时间" align="center"></el-table-column>
            <el-table-column prop="mobile" label="生效时间" align="center"></el-table-column>
            <el-table-column prop="mobile" label="上传人" align="center"></el-table-column>
            <el-table-column label="操作" align="center" width='150' fixed="right">
              <template slot-scope="scope">
                <span @click="toTips(scope.row)">详情</span>
                <span style="color: #DEDFE5;">|</span>
                <span @click="publish(scope.row)">发布环境</span>
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
          <publishing-environment slot="option" @close="close" :info="info" v-if="type === 'publishingEnvironment'" @requestTable="handleCurrentChange('creadModuleVendor')"></publishing-environment>
          <lua-info slot="option" @close="close"  :info="info" v-if="type === 'info'" @requestTable="handleCurrentChange('info')"></lua-info>
        </mine-dialog>
    </div>
</template>
<script>
import mineDialog from '@/modules/index/components/mine-dialog';
import conHeader from '@/components/awesome/con-header/con-header';
import publishingEnvironment from './publishingEnvironment';
import luaInfo from './info';
import API from '@/modules/index/api/system/system.js';
import { dictMixin } from '@/modules/index/views/mineSystem/dictMixin';
import minePagination from '@/modules/index/components/mine-pagination';
export default {
  components: {
    conHeader,
    mineDialog,
    publishingEnvironment,
    luaInfo,
    minePagination
  },
  mixins: [ dictMixin ],
  created () {
    this.getList(true);
    this.getAlluser();
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
    //   info: {},
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
      API.getSupplyListIndex(params)
          .then(res => {
            console.log(res, '模组厂商管理列表');
            this.tableData = res.result ? this.initTab(res.result.data, this.currentPage, this.pageSize) : [];
            this.total = res.result.total;
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
    },
    initTab (val, currentPage, pageSize) {
      if (!val && !val.length) return [];
      for (var i = 0; i < val.length; i++) {
        val[i].index = ((currentPage - 1) * pageSize) + i + 1;
        // 这里是自己加的状态变量(测试用有接口后删除)
        if ( i%2 === 0) {
          val[i].mineType = 1;
        } else {
          val[i].mineType = 2;
        }
      }
      return val;
    },
    initDialog (title, type, val) {
      this.title = title;
      this.flag = true;
      this.type = type;
      val.contactId = String(val.contactId);
      this.info = {...val};
    },
    toTips (val) {
      this.initDialog('详情', 'info', val);
    },
    publish (val) {
      console.log(val);
      this.initDialog('发布环境', 'publishingEnvironment', val);
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
