<template>
    <div class="role-warp">
        <div class="title-role"> 
            <con-header :title-icon="addProductsIcon" title="角色管理" :hasBottomBorder="true"></con-header>
        </div>
        <div class="btn-role" v-authority="'b1_roleAddTag'">
          <el-button type="primary" icon="el-icon-plus" @click="creadRole">{{'新建角色'}}</el-button>
        </div>
        <div class="table-role">
            <el-table :data="tableData" style="width: 100%" class='table' v-loading="loading">
                <el-table-column prop="id" label="角色id" align="center"></el-table-column>
                <el-table-column prop="name" label="角色姓名" align="center"></el-table-column>
                <el-table-column prop="discription" label="角色说明" align="center"></el-table-column>
                <el-table-column label="创建时间" width="150" align="center">
                  <template slot-scope="scope">
                    <div>{{scope.row.cdate | fomatDate('yyyy-MM-dd HH:mm')}}</div>
                  </template>
                </el-table-column>
                <el-table-column prop="cuid" label="创建人" align="center"></el-table-column>
                <el-table-column label="详情" align="center">
                  <template slot-scope="scope">
                    <el-button @click="roleTip(scope.row)" type="text" size="small" v-authority="'b1_roleAllUsersTag'">对应用户</el-button>
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope" >
                    <el-button @click="deleteRole(scope.row)" type="text" size="small" v-authority="'b1_roleDelTag'">删除角色</el-button>
                  </template>
                </el-table-column>
            </el-table>
        </div>
        <mine-dialog :dialogFormVisible='flag' :width='"45%"' :modalFlag="modalFlag" @close="close"  :title="title" :showClose="showClose">
            <!-- <div slot="option" v-if="!showClose"> -->
              <cread-role  slot="option"  @close="close" v-if="!showClose" @requestTable="requestList"></cread-role>
            <!-- </div> -->
            <!-- <div slot="option" v-else> -->
              <role-details slot="option" :roleId='roleId' v-else></role-details>
            <!-- </div> -->
        </mine-dialog>
         <div>
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
           :pageSizes="[5, 10, 20, 50]" 
           :page-size="pageSize" 
           :current-page="currentPage" 
           :layout="'total, prev, pager, next'">
           </mine-pagination>
        </div>
    </div>
</template>
<script>
import conHeader from '@/components/awesome/con-header/con-header';
import mineDialog from '@/modules/index/components/mine-dialog';
import creadRole from './creadRole';
import roleDetails from './details';
import API from '@/modules/index/api/system/system.js';
import { format } from '@/modules/index/api/system/common.js';
import minePagination from '@/modules/index/components/mine-pagination';
export default {
  components: {
    conHeader,
    mineDialog,
    creadRole,
    roleDetails,
    minePagination
  },
  created () {
    this.requestList();
  },
  data () {
    return {
      addProductsIcon: '/static/img/title_01@2x.png',
      tableData: [],
      loading: false,
      // 控制弹框显影
      flag: false,
      // 是否显示按钮
      showClose: false,
      modalFlag: false,
      title: '',
      roleId: '',
      currentPage: 1,
      total: 35,
      pageSize: 5
    };
  },
  methods: {
    requestList () {
      this.loading = true;
      const params = {
        pageNo: this.currentPage,
        pageSize: this.pageSize
      };
      API.roleList(params)
          .then(res => {
            this.tableData = res.result.data;
            this.total = res.result.total;
            this.loading = false;
          });
    },
    numberChange (val) {
      switch (val.flag) {
        case 'pageSize':
          this.pageSize = val.pageSize;
          this.requestList();
          break;
        case 'currentPage':
          this.currentPage = val.currentPage;
          this.requestList();
          break;
        default:
          break;
      }
    },
    deleteRole (val) {
      this.$confirm('此操作将删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          roleId: val.id
        };
        API.delRole(params)
            .then(res => {
              this.currentPage = 1;
              this.requestList();
            });
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });    
      });
    },
    // handleCurrentChange(val) {
    //   this.requestList();
    // },
    // 创建角色
    creadRole () {
      this.flag = true;
      this.showClose = false;
      this.title = '新增角色';
      this.currentPage = 1;
    },
    roleTip (val) {
      this.flag = true;
      this.showClose = true;
      this.title = `${val.name}角色用户列表`;
      this.roleId = val.id;
      console.log(val);
    },
    close (val) {
      this.flag = val;
    }
  },
  filters: {
    fomatDate (val, type) {
      if (!val) return '';
      return format(val, type);
    }
  }
};
</script>

<style lang="less" scoped>
.role-warp{
  .btn-role{
    margin-top: 24px;
  }
  .table-role{
    margin-top: 16px;
  }
  .fenye{
    text-align: right;
    margin-top: 16px;
  }
}
</style>
