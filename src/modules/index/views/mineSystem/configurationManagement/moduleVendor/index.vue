<template>
    <div class="moduleVendor-mine-wap" >
        <div class="title-account">
            <con-header :title-icon="addProductsIcon" title="模组厂商管理" :hasBottomBorder="true"></con-header>
        </div>
        <div class="add-moduleVendor" v-authority="'b1_supplyAddTag'">
          <el-button type="primary" icon="el-icon-plus" @click="creadModuleVendor">{{'新建'}}</el-button>
        </div>
        <div class="table-moduleVendor" v-loading="loading">
          <el-table :data="tableData" style="width: 100%"  class='table'>
            <el-table-column prop="index" width="100" align="center" :render-header="renderIndex"></el-table-column>
            <el-table-column prop="name" label="模组厂商名称" align="center"></el-table-column>
            <el-table-column prop="code" label="编码" align="center"></el-table-column>
            <el-table-column prop="address" label="机构地址" align="center"></el-table-column>
            <el-table-column prop="email" label="企业邮箱" align="center"></el-table-column>
            <el-table-column prop="telephone" label="固定电话" align="center"></el-table-column>
            <el-table-column prop="contactName" label="对接人" align="center"></el-table-column>
            <el-table-column prop="mobile" label="联系方式" align="center"></el-table-column>
            <el-table-column label="操作" align="center" width='180'>
              <template slot-scope="scope">
                <span @click="toTips(scope.row)" v-authority="'b1_supplyGetTag'">详情</span>
                <span style="color: #DEDFE5;">|</span>
                <span @click="changeEmp(scope.row)" v-authority="'b1_supplyEditContactTag'">修改对接人</span>
              </template>
            </el-table-column>
          </el-table>
          <div class="fenye">
            <!-- <el-pagination
            @current-change="handleCurrentChange"
            :page-size="pageSize"
            :current-page.sync="currentPage"
            layout="total, prev, pager, next"
            :total="total">
            </el-pagination> -->
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
          <add-module slot="option" @close="close" :userList="userList" v-if="type === 'creadModuleVendor'" @requestTable="handleCurrentChange('creadModuleVendor')"></add-module>
          <take-over slot="option" @close="close" :userList="userList"  :info="info" v-if="type === 'takeOver'" @requestTable="handleCurrentChange('takeOver')"></take-over>
          <module-info slot="option" @close="close"  :info="info" v-if="type === 'info'" @requestTable="handleCurrentChange('info')"></module-info>
        </mine-dialog>
    </div>
</template>
<script>
import mineDialog from '@/modules/index/components/mine-dialog';
import conHeader from '@/components/awesome/con-header/con-header';
import addModule from './addModule';
import takeOver from './takeOver';
import moduleInfo from './info';
import API from '@/modules/index/api/system/system.js';
import { dictMixin } from '@/modules/index/views/mineSystem/dictMixin';
import minePagination from '@/modules/index/components/mine-pagination';
export default {
  components: {
    conHeader,
    mineDialog,
    addModule,
    takeOver,
    moduleInfo,
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
      info: {},
      loading: false
    };
  },
  methods: {
    creadModuleVendor () {
      this.initDialog('新增模组厂商', 'creadModuleVendor', {});
    },
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
      console.log(val);
      this.initDialog('详情', 'info', val);
    },
    changeEmp (val) {
      console.log(val);
      this.initDialog('修改对接人', 'takeOver', val);
    },
    renderIndex (h, { column, $index }) {
      return h('span', [h('span', '编号')]);
    },
    close (val) {
      this.flag = val;
    },
    handleCurrentChange (val) {
      switch (val) {
        case 'creadModuleVendor':
          this.getList(true);
          break;
        case 'takeOver':
          this.getList(false);
          break;
        case 'info':
          this.getList(false);
          break;
        default:
          break;
      }
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
.moduleVendor-mine-wap{
  .add-moduleVendor{
    padding: 24px 0 16px 0;
  }
  .fenye{
    text-align: right;
    margin-top: 16px;
  }
  .table-moduleVendor{
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

