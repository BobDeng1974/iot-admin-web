<template>
    <div class="details-role-warp">
        <el-table :data="tableData" style="width: 100%" max-height="250" class='table'>
            <el-table-column prop="account" label="用户mip账户" align="center"></el-table-column>
            <el-table-column prop="realName" label="用户姓名" align="center"></el-table-column>
            <el-table-column prop="departmentName" label="所在事业部" align="center"></el-table-column>
            <!-- <el-table-column prop="account" label="用户注册手机号" align="center"></el-table-column> -->
            <el-table-column prop="rpdate" label="创建时间" align="center">
              <template slot-scope="scope">
                <div>{{scope.row.rpdate | fomatDate('yyyy-MM-dd')}}</div>
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
           :pageSizes="[5, 10, 20, 50]" 
           :page-size="pageSize" 
           :current-page="currentPage" 
           :layout="'total, prev, pager, next'">
           </mine-pagination>
        </div>
    </div>
</template>
<script>
import API from '@/modules/index/api/system/system.js';
import { format } from '@/modules/index/api/system/common.js';
import minePagination from '@/modules/index/components/mine-pagination';
export default {
  props: {
    roleId: {
      type: [String, Number],
      default: ''
    }
  },
  components: {
    minePagination
  },
  created () {
    this.initData(this.roleId);
  },
  watch: {
    'roleId' (newVal) {
      this.currentPage = 1;
      this.initData(newVal);
    }
  },
  data () {
    return {
      tableData: [],
      currentPage: 1,
      total: 35,
      pageSize: 5
    };
  },
  methods: {
    // handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`);
    //   this.initData(this.roleId);
    // },
    numberChange (val) {
      switch (val.flag) {
        case 'pageSize':
          this.pageSize = val.pageSize;
          this.initData(this.roleId);
          break;
        case 'currentPage':
          this.currentPage = val.currentPage;
          this.initData(this.roleId);
          break;
        default:
          break;
      }
    },
    initData (roleId) {
      const params = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        roleId: roleId
      };
      API.roleInfoList(params)
         .then(res => {
           console.log(res, '角色信息请求');
           this.tableData = res.result.data;
           this.total = res.result.total;
         });
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
.details-role-warp{
 .fenye{
    text-align: right;
    margin-top: 16px;
 }
}
</style>
