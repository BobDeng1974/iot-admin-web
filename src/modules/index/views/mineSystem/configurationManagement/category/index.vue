<template>
    <div class="category-mine-wap">
        <div class="title-account">
            <con-header :title-icon="addProductsIcon" title="品类与事业部管理" :hasBottomBorder="true"></con-header>
        </div>
        <!-- 查询部分 -->
        <div class="category-check">
           <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="87px">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="类型码">
                    <el-input v-model="formInline.type" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="所属开发组">
                      <el-select v-model="formInline.departmentId" placeholder="请选择" clearable>
                        <el-option
                          v-for="item in deparmentList"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="创建时间">
                    <el-date-picker v-model="formInline.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
           </el-form>
           <div class="btn-select" v-authority="'b1_applianceListTag'">
              <el-button type="primary" @click="getList(true)">筛 选</el-button>
              <el-button @click="clear">清 除</el-button>
           </div>
        </div>
        <!-- 表格部分 -->
        <div class="table-category">
            <div class="add-category">
              <!-- <el-button type="primary" icon="el-icon-plus" @click="creadCategory">{{'新建'}}</el-button> -->
            </div>
            <el-table :data="tableData" style="width: 100%"  class='table'>
              <el-table-column prop="index" width="100" align="center" :render-header="renderIndex"></el-table-column>
              <el-table-column prop="enterprise" label="企业码" align="center"></el-table-column>
              <el-table-column prop="departmentName" label="所属开发组" align="center"></el-table-column>
              <el-table-column prop="type" label="类型码" align="center"></el-table-column>
              <el-table-column prop="nameZh" label="中文名称" align="center"></el-table-column>
              <el-table-column prop="nameEn" label="英文名称" align="center"></el-table-column>
              <el-table-column prop="desZh" label="中文描述" align="center"></el-table-column>
              <el-table-column label="创建时间" width="150" align="center">
                <template slot-scope="scope">
                  <div>{{scope.row.createTime | fomatDate('yyyy-MM-dd HH:mm')}}</div>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width='150'>
                <template slot-scope="scope">
                   <!-- <span @click="clearCategory(scope.row)">删除</span>
                   <span style="color: #DEDFE5;">|</span> -->
                  <span @click="eidtCategory(scope.row)" v-authority="'b1_applianceEditTag'">编辑</span>
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
        <!-- 弹框 -->
        <mine-dialog :dialogFormVisible='flag' :width='"43%"' :modalFlag="modalFlag" @close="close" :title="title" :showClose="showClose">
          <add-category slot="option" :options="deparmentList" @close="close" v-if="isAdd" :info="info" @requestEnd="handleCurrentChange"></add-category>
          <eidt-category slot="option" :options="deparmentList" @close="close" v-else :info="info" @requestEnd="handleCurrentChange"></eidt-category>
        </mine-dialog>
    </div>
</template>
<script>
import { restData, format } from '@/modules/index/api/system/common.js';
import eidtCategory from './eidtCategory';
import addCategory from './addCategory';
import mineDialog from '@/modules/index/components/mine-dialog';
import conHeader from '@/components/awesome/con-header/con-header';
import API from '@/modules/index/api/system/system.js';
import { dictMixin } from '@/modules/index/views/mineSystem/dictMixin';
import minePagination from '@/modules/index/components/mine-pagination';
export default {
  components: {
    conHeader,
    mineDialog,
    eidtCategory,
    addCategory,
    minePagination
  },
  mixins: [ dictMixin ],
  created () {
    this.getList(true);
    this.getAlldeparment();
  },
  data () {
    return {
      isAdd: false,
      pageSize: 5,
      currentPage: 1,
      total: 0,
      // 控制弹框显影
      flag: false,
      // 是否显示按钮
      showClose: true,
      modalFlag: false,
      title: '编辑',
      addProductsIcon: '',
      formInline: {
        departmentId: '',
        type: '',
        time: [],
        startTime: '',
        endTime: ''
      },
      tableData: [
        {index: '1', nmber: '空调事业部自有', colunm: '选项1', typeNumber: '选项1', zhName: '0556-54872098', chName: '1234598324', tip: '2018-10-09', time: '2018-10-09'},
        {index: '1', nmber: '空调事业部自有', colunm: '选项2', typeNumber: '选项2', zhName: '0556-54872098', chName: '1234598324', tip: '2018-10-09', time: '2018-10-09'}
      ],
      info: {}
    };
  },
  methods: {
    handleCurrentChange () {
      this.getList(false);
    },
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
      const params = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        ...this.formInline
      };
      API.applianList(params)
        .then(res => {
          console.log(res, '查询列表');
          if (res.code === 0) {
            this.total = res.result ? res.result.total : 0;
            this.tableData = res.result ? this.initTableData(res.result.data) : [];
          } else {
            this.tableData = [];
            this.total = 0;
          }
        })
        .catch(() => {
          this.tableData = [];
          this.total = 0;
        });
    },
    // 给请求回来的表格数据新增index属性（序号）
    initTableData (val) {
      if (!val && !val.length) return [];
      for (var i = 0; i < val.length; i++) {
        val[i].index = ((this.currentPage - 1) * this.pageSize) + i + 1;
      }
      return val;
    },
    close (val) {
      this.flag = val;
    },
    clear () {
      restData(this.formInline);
      this.getList(true);
    },
    creadCategory () {
      this.flag = true;
      this.isAdd = true;
      this.title = '新建';
    },
    renderIndex (h, { column, $index }) {
      return h('span', [h('span', '编号')]);
    },
    eidtCategory (val) {
      this.flag = true;
      this.isAdd = false;
      this.info = {...val};
    },
    clearCategory (val) {
      const params = { type: val.type };
      API.deleteApplian(params)
         .then((res) => {
           this.$message('删除成功');
           this.clear();
         })
         .catch(() => {});
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
.category-mine-wap{
  .category-check{
    margin: 24px 0;
    .btn-select{
      text-align: right;
    }
  }
  .fenye{
    text-align: right;
    margin-top: 16px;
  }
  .table-category{
    border-top: 1px solid #DEDFE5;
    .add-category{
      padding: 22px 0 12px 0;
    }
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

