<template>
  <div class="cloud-lua-list-warp">
    <div class="title-mip">
      <con-header :title-icon="addProductsIcon" title="云端lua列表" :hasBottomBorder="true"></con-header>
    </div>
    <!-- 查询部分 -->
    <div class="mip-check">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="开发组">
              <el-select filterable v-model="formInline.deparId" placeholder="请选择" @change="departMentChange" clearable>
                <el-option v-for="item in deparmentList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="品类">
              <el-select filterable v-model="formInline.typeCode" placeholder="请选择" @change="applianChange" clearable>
                <el-option v-for="item in applianList" :key="item.id" :label="item.nameZh" :value="item.type">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item  label="型号码">
              <!-- <el-input v-model="formInline.sn8"></el-input> -->
              <el-select filterable v-model="formInline.sn8" placeholder="请选择" clearable>
                <el-option v-for="item in sn8List" :key="item.id" :label="item.sn8" :value="item.sn8">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
           <el-col :span="8" class="other-label">
            <el-form-item label="model-number">
              <el-input v-model="formInline.modelNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="生效时间">
              <el-date-picker v-model="formInline.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div v-authority="'b1_cloudLuaListTag'">
        <el-row class="applicationManagement-row" style="display: flex; justify-content: flex-end;">
          <span class="btn-select-right">
            <el-button type="primary" @click="getList(true)">查 找</el-button>
            <el-button @click="clear">清 除</el-button>
          </span>
        </el-row>
      </div>
    </div>
    <!-- 表格部分 -->
    <div class="table-breadcrumb" v-loading="loading">
      <el-table :data="tableData" style="width: 100%" class='table'>
        <el-table-column prop="index" width="50" align="center" :render-header="renderIndex"></el-table-column>
        <el-table-column prop="luaName" width="150" label="名称" align="center"></el-table-column>
        <el-table-column prop="departmentName" width="150" label="开发组" align="center"></el-table-column>
        <el-table-column prop="typeName" width="150" label="品类" align="center"></el-table-column>
        <el-table-column prop="sn8" width="150" label="型号码" align="center"></el-table-column>
        <el-table-column prop="modelNo" width="150" label="model-number" align="center"></el-table-column>
        <el-table-column prop="version" width="150" label="版本号" align="center"></el-table-column>
        <el-table-column prop="release" width="150" label="状态" align="center">
          <template slot-scope="scope">
              <span>{{scope.row.release === 0 ? '未发布' : '已发布'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="mdate" width="150" label="生效时间" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.mdate | fomatDate('yyyy-MM-dd HH:mm')}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="cName" width="150" label="上传人" align="center"></el-table-column>
        <el-table-column label="操作" align="center" fixed='right' width="130">
          <template slot-scope="scope">
            <span v-authority="'b1_cloudLuaDownTag'"  class="mine-down" @click="downLoad(scope.row)">下载</span>
             <span class="mine-down" @click="showInfo(scope.row)" v-authority="'b1_cloudCheckEnv'">查看环境</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="fenye">
      <!-- <el-pagination @current-change="handleCurrentChange" :page-size="pageSize" :current-page.sync="currentPage" layout="total, prev, pager, next" :total="total">
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

     <mine-dialog :dialogFormVisible='flag' :width='"40%"' :modalFlag="modalFlag" @close="close" :title="title" :showClose="showClose">
        <lua-static slot="option" :flag="flag" @close="close"  :info="info" @requestTable="handleCurrentChange('info')"></lua-static>
      </mine-dialog>
  </div>
</template>
<script>
import mineDialog from '@/modules/index/components/mine-dialog';
import { restData, format } from '@/modules/index/api/system/common.js';
import conHeader from '@/components/awesome/con-header/con-header';
import API from '@/modules/index/api/dataCenter/dataCenter.js';
import { dictMixin } from '@/modules/index/views/mineSystem/dictMixin';
import moment from 'moment';
import minePagination from '@/modules/index/components/mine-pagination';
import luaStatic from './static';
export default {
  components: {
    conHeader,
    minePagination,
    luaStatic,
    mineDialog
  },
  mixins: [dictMixin],
  data() {
    return {
      loading: false,
      addProductsIcon: '/static/img/title_05@2x.png',
      formInline: {
        sn8: '',
        modelNo: '',
        deparId: '',
        typeCode: '',
        time: [],
        endDate: '',
        beginDate: ''
      },
      tableData: [],
      currentPage: 1,
      total: 0,
      pageSize: 10,
      // applyInfoId: 1,
      flag: false,
      showClose: true,
      modalFlag: false,
      title: '查看环境',
      info: {}
    };
  },
  created() {
    this.getDict();
    this.getList(true);
  },
  methods: {
    showInfo (val) {
      this.flag = true;
      this.info = {...val};
    },
    handleCurrentChange (val) {
      this.getList(true);
    },
    // 下载功能
    downLoad(val) {
      let params = { id: val.luaId };
      API.downLoadCloudLua(params).then(response => {
        console.log(response.headers['content-disposition']);
        let tempNameStr = response.headers['content-disposition'].split(';')[1];
        let fileName = tempNameStr.split('=')[1];
        let blob = new Blob([response.data]);
        let objectUrl = URL.createObjectURL(blob);
        let link = document.createElement('a');
        link.style.display = 'none';
        link.href = objectUrl;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
      });
      // API.downLoadCloudLua(params).then(response => {
      //   let blob = new Blob([response]);
      //   let objectUrl = URL.createObjectURL(blob);
      //   let link = document.createElement('a');
      //   link.style.display = 'none';
      //   link.href = objectUrl;
      //   link.setAttribute('download', val.luaName+'.lua');
      //   document.body.appendChild(link);
      //   link.click();
      // });
    },
    // 获取所有下拉字典
    getDict() {
      this.getAlldeparment();
      // this.getApplianList();
      // this.getApply();
    },
    // 三级联动
    departMentChange (val) {
      this.formInline.sn8 = '';
      this.formInline.typeCode = '';
      this.applianList = [];
      this.sn8List = [];
      if (val) {
        this.getApplianListAsDpartId(val);
      } else {
        // this.applianList = [];
        // this.sn8List = [];
      }
    },
    applianChange(val) {
      this.formInline.sn8 = '';
      this.sn8List = [];
      if (val) {
        let id = this.getApplianId(val);
        this.getSn8List(id);
      } else {
        // this.sn8List = [];
      }
    },
    // 通过品类type属性找到对应的品类id
    getApplianId (val) {
      let str = '';
      for (var i = 0; i < this.applianList.length; i++) {
        if (val === this.applianList[i].type) {
          str = this.applianList[i].id;
        }
      }
      return str;
    },
    eidtApplication() {
      this.$router.push({ name: 'eidtApplication' });
    },
    // requestList() {
    //   this.getList(false);
    // },
    // handleCurrentChange(val) {
    //   this.getList(false);
    // },
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
    },
    // 给请求回来的表格数据新增index属性（序号）
    initTableData(val) {
      if (!val && !val.length) return [];
      for (var i = 0; i < val.length; i++) {
        val[i].index = (this.currentPage - 1) * this.pageSize + i + 1;
      }
      return val;
    },
    renderIndex(h, { column, $index }) {
      return h('span', [h('span', '编号')]);
    },
    // 弹框关闭
    close(val) {
      this.flag = val;
      // this.applyInfoId = '';
    },
    getList(flag) {
      if (this.formInline.time && this.formInline.time.length) {
        this.formInline.beginDate = format(
          this.formInline.time[0],
          'yyyy-MM-dd HH:mm:ss'
        );
        this.formInline.endDate = moment(this.formInline.time[1]).format(
          'YYYY-MM-DD 23:59:59'
        );
      } else {
        this.formInline.beginDate = '';
        this.formInline.endDate = '';
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
      API.getCloudLuaList(params)
        .then(res => {
          console.log(res, '获取列表');
          this.loading = false;
          if (res.code === 0) {
            if (res.result.total !== 0 && res.result.data.length === 0) {
              this.getList(true);
            }
            this.total = res.result ? res.result.total : 0;
            this.tableData = res.result
              ? this.initTableData(res.result.data)
              : [];
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
    clear() {
      restData(this.formInline);
      this.applianList = [];
      this.sn8List = [];
      this.getList(true);
    }
  },
  filters: {
    fomatDate(val, type) {
      if (!val) return '';
      return format(val, type);
    }
  }
};
</script>

<style lang="less" >
.cloud-lua-list-warp {
  .mip-check {
    margin-top: 24px;
        .el-input {
      width: 230px;
    }
  }
      .other-label{
        .el-form-item{
          .el-form-item__label{
            line-height: 20px !important;
          }
        }
      }
  .mine-down{
    color: blue;
  }
  .mine-down:hover{
    cursor: pointer;
  }
  .commerStyle {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-bottom: 2px;
  }
  .fenye {
    text-align: right;
    margin-top: 16px;
  }
  .green {
    background-color: green;
  }
  .darkgray {
    background-color: darkgray;
  }
  .blue {
    background-color: blue;
  }
  .yellow {
    background-color: yellow;
  }
  // .el-input {
  //   width: 230px;
  // }
  .btn-select {
    // text-align: right;
    margin-top: 24px;
  }
  .btn-select-right {
    // text-align: right;
    margin-left: 775px;
    // margin-top: 24px;
  }
  .table-breadcrumb {
    margin-top: 24px;
    td {
      .operate {
        padding: 0 2px;
      }
      .operate:hover {
        cursor: pointer;
        color: #5667ff;
      }
    }
  }
  .applicationManagement-row {
    .btn-select-right{

    }
    display: flex;
    justify-content: flex-end;
    /* border-bottom: 1px solid #eee; */
    border-bottom: 1px solid #dedfe5;
    align-items: center;
    padding-bottom: 10px;
    margin-bottom: 10px;
  }
}
</style>
