<template>
    <div class="auditsManagement-warp">
        <div class="title-account">
            <con-header :title-icon="addProductsIcon" title="待处理事项" :hasBottomBorder="true"></con-header>
        </div>
        <!-- 查询部分 -->
        <div class="auditsManagement-check">
           <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="80px">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="品类">
                    <el-select v-model="formInline.applianTypeId" clearable placeholder="请选择" @change="applianChange">
                        <el-option
                          v-for="item in applianList"
                          :key="item.id"
                          :label="item.nameZh"
                          :value="item.id">
                        </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="型号码">
                    <el-select v-model="formInline.sn8" clearable placeholder="请选择">
                        <el-option
                          v-for="item in sn8List"
                          :key="item.id"
                          :label="item.sn8"
                          :value="item.sn8">
                        </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="申请时间">
                    <el-date-picker v-model="formInline.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
           </el-form>
           <div class="btn-select" v-authority="'b1_hardwareAuditListTag'">
              <el-button type="primary" @click="selectSerch(true)">筛 选</el-button>
              <el-button @click="clear">清 除</el-button>
           </div>
        </div>
        <!-- 面包屑 -->
        <!-- <div class="breadcrumb-mine" v-loading="loading">
          <span  @click="allClick">全部</span>
          <span>|</span>
          <span @click="checkClick">待审核</span>
        </div> -->
        <!-- 表格部分 -->
        <div class="table-breadcrumb" v-loading="loading">
          <el-table :data="tableData" style="width: 100%"  class='table'>
            <el-table-column prop="index" width="50" align="center" :render-header="renderIndex"></el-table-column>
            <el-table-column prop="departmentName" label="开发组" align="center"></el-table-column>
            <el-table-column prop="applianceType" label="品类" align="center">
              <!-- <template slot-scope="scope">
                <div>{{scope.row.applianceType | fecthNameZh()}}</div>
              </template> -->
            </el-table-column>
            <el-table-column prop="sn8" label="型号码" align="center"></el-table-column>
            <el-table-column  label="状态" align="left">
              <template slot-scope="scope">
                <div>
                    <span :class="[{green: scope.row.publicStatus === 10},{darkgray: scope.row.publicStatus === 20},{blue: scope.row.publicStatus === 31},{yellow: scope.row.publicStatus === 41}, 'commerStyle']">
                    </span>
                    <span style="margin-left: 3px;" v-if="scope.row.publicStatus === 10">{{'待审核'}}</span>
                    <span style="margin-left: 3px;" v-if="scope.row.publicStatus === 20">{{'待开发'}}</span>
                    <span style="margin-left: 3px;" v-if="scope.row.publicStatus === 31">{{'申请试产中'}}</span>
                    <span style="margin-left: 3px;" v-if="scope.row.publicStatus === 41">{{'申请上线中'}}</span>
                    <!-- <span style="margin-left: 3px;" v-if="scope.row.publicStatus === 5">{{'开发完成'}}</span> -->
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="applyTime" label="申请时间" align="center" width="150">
              <template slot-scope="scope">
                <div>{{scope.row.applyTime | fomatDate('yyyy-MM-dd HH:mm')}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="cName" label="提交人" align="center"></el-table-column>
            <el-table-column label="操作" align="center" width='180'>
              <template slot-scope="scope">
                <span class="operate" @click="operateClick(scope.row)" v-authority="'b1_hardwareAuditTag'">审核</span>
              </template>
            </el-table-column>
          </el-table>
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
    </div>
</template>

<script>
import { restData, format } from '@/modules/index/api/system/common.js';
import conHeader from '@/components/awesome/con-header/con-header';
import API from '@/modules/index/api/system/system.js';
// import ls from '@/utils/storage/local_storage';
import { dictMixin } from '@/modules/index/views/mineSystem/dictMixin';
import minePagination from '@/modules/index/components/mine-pagination';
export default {
  components: {
    conHeader,
    minePagination
  },
  mixins: [ dictMixin ],
  data () {
    return {
      // departmentId: '',
      loading: false,
      addProductsIcon: '',
      formInline: {
        applianTypeId: '',
        sn8: '',
        time: [],
        uEndDate: '',
        uDate: ''
      },
      tableData: [],
      pageSize: 5,
      currentPage: 1,
      total: 0
    };
  },
  created () {
    this.getApplianList();
    this.getAlldeparment();
    this.selectSerch(true);
    // this.getUserInfo();
  },
  methods: {
    // getUserInfo () {
    //   const userInfo = ls.getObject('userInfo');
    //   debugger;
    //   this.departmentId = userInfo.departmentId ? userInfo.departmentId : 1;
    // },
    applianChange (val) {
      this.formInline.sn8 = '';
      if (val) {
        this.getSn8List(val);
      } else {
        this.sn8List = [];
      }
    },
    // handleCurrentChange () {
    //   this.selectSerch(false);
    // },
    numberChange (val) {
      switch (val.flag) {
        case 'pageSize':
          this.pageSize = val.pageSize;
          this.selectSerch(false);
          break;
        case 'currentPage':
          this.currentPage = val.currentPage;
          this.selectSerch(false);
          break;
        default:
          break;
      }
    },
    selectSerch (flag) {
      if (this.formInline.time && this.formInline.time.length) {
        this.formInline.uDate = format(this.formInline.time[0], 'yyyy-MM-dd');
        this.formInline.uEndDate = format(this.formInline.time[1], 'yyyy-MM-dd');
      } else {
        this.formInline.uDate = '';
        this.formInline.uEndDate = '';
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
      API.getExamineList(params)
      .then(res => {
        console.log(res, '获取硬件审核列表');
        this.loading = false;
        if (res.code === 0) {
          this.total = res.result ? res.result.total : 0;
          this.tableData = res.result ? this.initTab(res.result.data, this.currentPage, this.pageSize) : [];
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
      this.sn8List = [];
      this.selectSerch(true);
    },
    operateClick (val) {
      console.log(val);
      this.$router.push({name: '审核管理', params: {id: val.id}});
    },
    initTab (val, currentPage, pageSize) {
      if (!val && !val.length) return [];
      for (var i = 0; i < val.length; i++) {
        val[i].index = ((currentPage - 1) * pageSize) + i + 1;
        // 翻译品类
        for (var j = 0; j < this.applianList.length; j++) {
          if (val[i].applianceType === this.applianList[j].type) {
            val[i].applianceType = this.applianList[j].nameZh;
          }
        }
      }
      return val;
    },
    renderIndex (h, { column, $index }) {
      return h('span', [h('span', '序号')]);
    }
  },
  filters: {
    fomatDate (val, type) {
      if (!val) return '';
      return format(val, type);
    }
    // fecthNameZh (val) {
    //   if (!val) return '';
    //   let str = '';
    //   for (var i = 0; i < this.applianList.length; i++) {
    //     if (val === this.applianList[i].type) {
    //       str = this.applianList[i].nameZh;
    //     }
    //   }
    //   return str;
    // }
  }
};
</script>

<style lang="less" scoped>
.auditsManagement-warp{
    .commerStyle{
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-bottom: 2px;
    }
    .fenye{
      text-align: right;
      margin-top: 16px;
    }
    .green{
      background-color:green;
    }
    .red{
       background-color:red;
    }
    .darkgray{
      background-color:darkgray;
    }
    .blue{
      background-color:blue;
    }
    .yellow{
      background-color:yellow;
    }
  .auditsManagement-check{
    margin-top: 24px;
  }
  .btn-select{
    text-align: right;
  }
  .breadcrumb-mine{
    padding: 24px 0 8px 955px;
    span:hover{
      color: blue;
      cursor: pointer;
    }
  }
  .table-breadcrumb{
    margin-top: 24px;
    // padding-top: 24px;
    // border-top: 1px solid #DEDFE5;
    td {
      .operate{
        padding: 0 2px;
      }
      .operate:hover{
        cursor: pointer;
        color: #5667FF;
      }
    }
  }
}
</style>
