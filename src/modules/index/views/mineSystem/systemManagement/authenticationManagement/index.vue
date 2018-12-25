<template>
    <div class="mip-warp">
        <div class="title-mip">
            <con-header :title-icon="addProductsIcon" title="用户认证管理" :hasBottomBorder="true"></con-header>
        </div>
        <!-- 查询部分 -->
        <div class="mip-check">
           <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="180px" :rules="rules">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="用户手机号" prop="mobile">
                    <el-input v-model="formInline.mobile" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="申请时间">
                    <el-date-picker v-model="formInline.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
           </el-form>
           <div class="btn-select"  v-authority="'b1_userMipListTag'">
              <el-button type="primary" @click="getList(true)">筛 选</el-button>
              <el-button @click="clear">清 除</el-button>
           </div>
        </div>
        <!-- 表格部分 -->
        <div class="table-mip" v-loading="loading">
          <el-table :data="tableData" style="width: 100%"  class='table'>
            <el-table-column prop="id" label="用户id" align="center"></el-table-column>
            <el-table-column prop="mobile" label="用户手机号" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="departmentName" label="所在事业部" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="mip" label="mip账户" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="截图" align="center">
              <template slot-scope="scope">
                <el-popover
                    placement="top"
                    trigger="click">
                    <img :src="scope.row.mipAuditUrl" alt="暂无图片" class="img-minepopover">
                    <span slot="reference">详情</span>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="申请时间" align="center" width="150" show-overflow-tooltip>
              <template slot-scope="scope">
                <div>{{scope.row.createTime | fomatDate('yyyy-MM-dd HH:mm')}}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width='180'>
              <template slot-scope="scope">
               <div  v-authority="'b1_userMipAuditTag'">
                <span @click="enterBtton(scope.row.id, 0)">通过</span>
                  <span style="color: #DEDFE5;">|</span>
                  <span @click="enterBtton(scope.row.id, 1)">失败</span>
               </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
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
import { restData, format } from '@/modules/index/api/system/common.js';
import conHeader from '@/components/awesome/con-header/con-header';
import API from '@/modules/index/api/system/system.js';
import minePagination from '@/modules/index/components/mine-pagination';
import { authenticationManagementMixin } from '@/modules/index/views/mineSystem/mixin';
export default {
  components: {
    conHeader,
    minePagination
  },
  mixins: [ authenticationManagementMixin ],
  data () {
    return {
      rules: {
        mobile: { required: true, validator: this.checkMobile, trigger: 'change' }
      },
      loading: false,
      addProductsIcon: '/static/img/title_05@2x.png',
      formInline: {
        mobile: '',
        time: [],
        startTime: '',
        endTime: ''
      },
      tableData: [],
      currentPage: 1,
      total: 0,
      pageSize: 5
    };
  },
  created () {
    this.getList(true);
  },
  methods: {
    // handleCurrentChange(val) {
    //   this.getList(false);
    // },
    numberChange (val) {
      switch (val.flag) {
        case 'pageSize':
          this.pageSize = val.pageSize;
          this.getList(false);
          break;
        case 'currentPage':
          this.currentPage = val.currentPage;
          this.getList(false);
          break;
        default:
          break;
      }
    },
    getInfo (val) {
      console.log(val, '截图');
    },
    enterBtton (val, flag) {
      var tip = '';
      if (flag === 0) {
        tip = '审核通过';
      } else {
        tip = '审核拒绝';
      }
      this.$confirm(`此操作将${tip}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.save(val, flag);
        this.$message({
          type: 'success',
          message: '操作成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },
    save (val, flag) {
      const params = {
        id: val,
        type: flag
      };
      API.mipAudit(params)
      .then(res => {
        this.getList(false);
      });
    },
    getList (flag) {
      if (this.formInline.time && this.formInline.time.length) {
        this.formInline.startTime = format(this.formInline.time[0], 'yyyy-MM-dd');
        this.formInline.endTime = format(this.formInline.time[1], 'yyyy-MM-dd');
      } else {
        this.formInline.startTime = '';
        this.formInline.endTime = '';
      }
      if (flag) {
        this.currentPage = 1;
      }
      this.loading = true;
      const params = {
        ...this.formInline,
        pageNo: this.currentPage,
        pageSize: this.pageSize
      };
      API.mipList(params)
      .then(res => {
        console.log(res, '获取mip列表');
        this.loading = false;
        if (res.code === 0) {
          this.total = res.result ? res.result.total : 0;
          this.tableData = res.result ? res.result.data : [];
        } else {
          this.tableData = [];
          this.total = 0;
        }
      })
      .catch(() => {
          this.tableData = [];
          this.total = 0;
          this.loading = false;
      });
    },
    clear () {
      restData(this.formInline);
      this.getList(true);
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

<style lang="less">
  .img-minepopover{
    width: 300px;
    height: 300px;
  }
.mip-warp{
  .mip-check{
    margin-top: 24px;
    .is-required{
      .el-form-item__label:before{
        content: '' !important;
      }
    }
  }
   .fenye{
    text-align: right;
    margin-top: 16px;
   }
  .el-input{
    width: 230px;
  }
  .dialog-footer{
    text-align: right;
  }
  .btn-select{
    text-align: right;
  }
  .table-mip{
    margin-top: 24px;
    padding-top: 24px;
    border-top: 1px solid #DEDFE5;
    td {
      span{
        padding: 0 2px;
        color: #5667FF;
      }
      span:hover{
        cursor: pointer;
        // color: #5667FF;
      }
    }
  }
}
</style>
