<template>
    <div class="type-enter-warp">
        <div class="title-account">
            <con-header :title-icon="addProductsIcon" title="产品型号管理" :hasBottomBorder="true"></con-header>
        </div>
        <!-- 查询部分 -->
        <div class="account-check">
           <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="100px" :rules="rules">
              <el-row>
                <el-col :span="8">
                    <el-form-item label="事业部">
                      <el-select v-model="formInline.departmentId" placeholder="请选择" @change="departMentChange" clearable>
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
                  <el-form-item label="品类">
                    <el-select v-model="formInline.applianId" placeholder="请选择" clearable>
                      <el-option v-for="item in applianList" :key="item.id" :label="item.nameZh" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="型号码">
                    <el-input v-model="formInline.sn8" clearable></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="8">
                  <el-form-item label="model-numbe" label-width="105">
                      <el-input v-model="formInline.modelNumber" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="型号名称">
                    <el-input v-model="formInline.model" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="创建时间" label-width="90">
                    <el-date-picker v-model="formInline.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>

           </el-form>
           <div class="btn-select">
              <el-button type="primary" @click="selectSerch(true)">筛 选</el-button>
              <el-button @click="clear">清 除</el-button>
           </div>
        </div>
        <!-- 表格部分 -->
        <div class="table-account" v-loading="loading">
          <div style="margin-bottom: 10px;text-align: right;">
            <el-button type="primary" @click="addTypeEnter">新增型号</el-button>
          </div>
          <el-table :data="tableData" style="width: 100%"  class='table'>
            <el-table-column prop="index" width="50" align="center" :render-header="renderIndex"></el-table-column>
            <el-table-column prop="year" label="年份" align="center" show-overflow-tooltip>
              <!-- <template slot-scope="scope">
                <div>{{scope.row.year | fomatDate('yyyy')}}</div>
              </template> -->
            </el-table-column>
            <el-table-column prop="departmentName" label="所属事业部" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="typeCode" label="品类" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="sn8" label="型号码" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="modelNumber" label="model-number" align="center" width="150" show-overflow-tooltip></el-table-column>
            <el-table-column prop="model" label="型号名称" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="materielCode" label="物料编码" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="创建时间" align="center" show-overflow-tooltip width="150">
              <template slot-scope="scope">
                <div>{{scope.row.cdate | fomatDate('yyyy-MM-dd HH:mm')}}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" fixed="right" width="150">
              <template slot-scope="scope">
                <span @click="toInfo(scope.row)">详情</span>
                <span style="color: #DEDFE5;">|</span>
                <span @click="toEidtType(scope.row)">编辑</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div>
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
        <mine-dialog :dialogFormVisible='flag' :width='"60%"' :modalFlag="modalFlag" @close="close" :title="title" :showClose="showClose">
          <eidt-type slot="option"  @close="close" :eidtInfos='eidtInfos' v-if="eidtFlag" @requestTable="selectSerch(false)"></eidt-type>
          <type-info slot="option" @close="close" :info='info' v-else></type-info>
        </mine-dialog>
    </div>
</template>
<script>
import { restData, format } from '@/modules/index/api/system/common.js';
import mineDialog from '@/modules/index/components/mine-dialog';
import conHeader from '@/components/awesome/con-header/con-header';
// 详情
import typeInfo from './info';
import eidtType from './eidt';
import API from '@/modules/index/api/system/system.js';
import { dictMixin } from '@/modules/index/views/mineSystem/dictMixin';
import _ from 'lodash';
import minePagination from '@/modules/index/components/mine-pagination';
import { accountMixin } from '@/modules/index/views/mineSystem/mixin';
export default {
  components: {
    conHeader,
    mineDialog,
    eidtType,
    typeInfo,
    minePagination
  },
  mixins: [ dictMixin, accountMixin ],
  data () {
    return {
      rules: {
        // account: { required: true, validator: this.checkAccount, trigger: 'change' }
      },
      loading: false,
      eidtFlag: false,
      info: {},
      eidtInfos: {},
      // 控制弹框显影
      flag: false,
      // 是否显示按钮
      showClose: true,
      modalFlag: false,
      title: '',
      addProductsIcon: '/static/img/title_05@2x.png',
      formInline: {
        applianId: '',
        departmentId: '',
        sn8: '',
        modelNumber: '',
        modelName: '',
        sn8: '',
        time: [],
        mdateBegin: '',
        mdateEnd: ''
      },
      tableData: [],
      currentPage: 1,
      total: 0,
      pageSize: 5
    };
  },
  mounted () {
    this.getDict();
    this.selectSerch(true);
  },
  methods: {
    departMentChange (val) {
      this.formInline.applianId = '';
      if (val) {
        this.getApplianListAsDpartId(val);
      } else {
        this.applianList = [];
      }
    },
    getDict() {
      this.getAlldeparment();
    },
    renderIndex(h, { column, $index }) {
      return h('span', [h('span', '编号')]);
    },
    close (val) {
      this.flag = val;
    },
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
        this.formInline.mdateBegin = format(this.formInline.time[0], 'yyyy-MM-dd HH:mm:ss');
        this.formInline.mdateEnd = format(this.formInline.time[1], 'yyyy-MM-dd HH:mm:ss');
      } else {
        this.formInline.mdateBegin = '';
        this.formInline.mdateEnd = '';
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
      API.getTypeEnterList(params)
      .then(res => {
        console.log(res, '获取用户列表');
        this.loading = false;
        if (res.code === 0) {
          this.total = res.result ? res.result.total : 0;
          this.tableData = res.result ? this.initTable(res.result.data) : [];
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
    // 处理请求回来的表格数据
    initTable (val) {
      if (!val && !val.length) return [];
      for (var i = 0; i < val.length; i++) {
        val[i].index = (this.currentPage - 1) * this.pageSize + i + 1;
      }
      return val;
    },
    // 新增型号
    addTypeEnter () {
      this.$router.push({name: '产品型号信息录入'});
    },
    // 型号详情
    toInfo (val) {
      this.eidtFlag = false;
      this.info = val;
      this.flag = true;
      this.title = '详情';
    },
    // 型号编辑
    toEidtType (val) {
      this.eidtFlag = true;
      this.flag = true;
      this.title = '编辑';
      val.protos = val.protos === 0 ? '' : val.protos;
      val.saleChannel = val.saleChannel === 0 ? '' : val.saleChannel;
      val.saleStatus = val.saleStatus === 0 ? '' : val.saleStatus;
      this.eidtInfos = {...val};
    },
    clear () {
      restData(this.formInline);
      this.selectSerch(true);
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
.type-enter-warp{
  .account-check{
    margin-top: 24px;
    .is-required{
      .el-form-item__label:before{
        content: '' !important;
      }
    }
    .el-input{
      width: 230px;
    }
  }
  //  .fenye{
  //   text-align: right;
  //   margin-top: 16px;
  //  }
  .btn-select{
    text-align: right;
    // margin-top: 24px;
  }
  .table-account{
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


