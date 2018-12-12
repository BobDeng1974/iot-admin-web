<template>
  <div class="page-container">
    <div class="page-main-con">
      <con-header :titleIcon="titleIcon1" title="profile详情"></con-header>
      <div class="page-main-wrapper">
        <div class="details-table">
          <table class="table-detail" border="1" bordercolor="#ebeef5">
            <tbody>
              <tr v-for="(val, key) in tableLabel" :key="key">
                <td class="col-label">
                  <span>{{val}}</span>
                </td>
                <td class="col-content">
                  <span>{{tableData1[key]}}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!--profile属性列表-->
        <div class="table-wrapper">
          <el-table class="table" :data="tableData2" style="width: 100%">
            <el-table-column prop="id" label="编号" align="center" show-overflow-tooltip width="55"></el-table-column>
            <el-table-column label="分类" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.type===0?'通用':'自定义' }}</template>
            </el-table-column>
            <el-table-column prop="propertyKey" label="属性" show-overflow-tooltip></el-table-column>
            <el-table-column prop="propertyName" label="属性名称" show-overflow-tooltip></el-table-column>
            <el-table-column label="读取方式" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.readwrite===0?'只读':'读写' }}</template>
            </el-table-column>
            <!-- <el-table-column  label="取值类型" show-overflow-tooltip> -->
            <el-table-column align="center" label="取值类型" show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="scope.row.propertyType===1">枚举</span>
                <span v-if="scope.row.propertyType===5">字符型</span>
                <span v-if="scope.row.propertyType===4">浮点型</span>
                <span v-if="scope.row.propertyType===3">数值型</span>
                <span v-if="scope.row.propertyType===2">布尔型</span>
              </template>
            </el-table-column>
            <!-- </el-table-column> -->
            <el-table-column align="center" label="属性值" show-overflow-tooltip>
              <template slot-scope="scope">
                <div></div>
                <span v-for="(item, index) in scope.row.propertyValues" :key="index">
                  <span v-if="index!==0">,</span>
                  <!-- {{item.valueCode}} -->
                  {{item.valueCode}}/{{item.valueDes}}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="操作" v-if="status === '未发布'">
              <template slot-scope="scope">
                <el-button type="text" size="small">删除</el-button>
                <el-button v-if="scope.row.readwrite === '读写'" class="opt-btn" type="text" size="small" @click="editProperty(scope.row)">
                  编辑
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <!--编辑profile属性-->
      <!-- <property-dialog ref="propertyDialog" title="编辑属性" :editData="editData"></property-dialog> -->
    </div>
  </div>
</template>

<script>
import conHeader from '@/components/awesome/con-header/con-header';
// import propertyDialog from '../../../components/propertyDialog/index';
import { getProfile } from '../../../api/myAgreement/index';
export default {
  components: {
    'con-header': conHeader
    // 'property-dialog': propertyDialog
  },
  data() {
    return {
      titleIcon1: '/static/img/title_05@2x.png',
      tableLabel: {
        name: 'profile名称',
        applianceType: '品类',
        sn8: '型号码'
      },
      tableData1: {},
      tableData2: [],
      status: '',
      editData: null
    };
  },
  methods: {
    // 获取详情数据
    getProfileDetail() {
      let id = this.$route.params.id;
      if (typeof id !== 'undefined') {
        let params = {
          id: id
        };
        getProfile(params).then(res => {
          console.log(res);
          if (res.code === 0 && res.result) {
            this.status = res.result.status;
            this.tableData2 = res.result.property || [];
            this.tableData1 = res.result;
          }
        });
      }
    },

    // 点击编辑属性
    editProperty(row) {
      console.log(row);
      this.editData = row;
      this.$refs['propertyDialog'] &&
        (this.$refs['propertyDialog'].showDialog = true);
    }
  },
  mounted() {
    this.getProfileDetail();
  }
};
</script>

<style lang="less" scoped>
@import '../agreement.less';
</style>
