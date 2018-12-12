<template>
  <div class="page-container">
    <div class="page-main-con">
      <con-header :titleIcon="titleIcon1" title="profile编辑"></con-header>
      <div class="page-main-wrapper">
        <div class="details-table">
          <table class="table-detail" border="1" bordercolor="#ebeef5">
            <tbody>
              <tr v-for="(val, key) in tableLabel" :key="key">
                <td class="col-label">
                  <span>{{val}}</span>
                </td>
                <td class="col-content">
                  <span v-if="key==='name'" class="profile-edit">

                    <el-form class="" ref="profile-edit" :model="profileFormDataEdit" :rules="propertyEditRules" label-width="100px">
                      <el-col>
                        <el-form-item prop="name">
                          <el-input v-model.trim="profileFormDataEdit.name"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-form>
                    <el-button type="primary" @click="profileFormDataEditNameSave">立即提交</el-button>
                  </span>
                  <span v-else>{{tableData1[key]}}</span>
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
            <!-- <el-table-column prop="readwrite" label="读取方式" show-overflow-tooltip></el-table-column> -->
            <!-- <el-table-column prop="propertyType" label="取值类型" show-overflow-tooltip> </el-table-column> -->
            <el-table-column align="center" label="取值类型" show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="scope.row.propertyType===1">枚举型</span>
                <span v-if="scope.row.propertyType===5">字符型</span>
                <span v-if="scope.row.propertyType===4">浮点型</span>
                <span v-if="scope.row.propertyType===3">数值型</span>
                <span v-if="scope.row.propertyType===2">布尔型</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="属性值" show-overflow-tooltip>
              <template slot-scope="scope">
                <div></div>
                <span v-for="(item, index) in scope.row.propertyValues" :key="index">
                  <span v-if="index!==0&&item.valueCode!==''">,</span>
                  <!-- {{item.valueCode}}/{{item.valueDes}} -->
                   {{item.valueCode}}<span v-if="item.valueDes!==''">/</span>{{item.valueDes}}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="deletProfileName(scope.row)">删除</el-button>
                <el-button v-authority="'b1_profileEditPropertyTag'" v-if="scope.row.readwrite === 1" class="opt-btn" type="text" size="small" @click="editProperty(scope.row)">
                  编辑
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <mine-dialog :dialogFormVisible='propertyFlag' :width='"50%"' :modalFlag="propertyModalFlag" @close="propertyClose" :title="propertyTitle" :showClose="propertyShowClose">
        <div slot="option">
          <edit-dialog :editData="editData" @close="propertyClose" @propertyHandleSave="propertyHandleSave"></edit-dialog>
        </div>
      </mine-dialog>
      <!--编辑profile属性-->
      <!-- <property-dialog ref="propertyDialog" title="编辑属性" :editData="editData"></property-dialog> -->
    </div>

    <div class="last-opt">
      <el-button type="primary" @click="handleSaveAddProfile(0)" size="medium">保存</el-button>
      <el-button type="primary" size="medium" @click="handleSaveAddProfile(1)">发布</el-button>
    </div>
  </div>
</template>

<script>
import conHeader from '@/components/awesome/con-header/con-header';
// import propertyDialog from '../../../components/propertyDialog/index';
import mineDialog from '@/modules/index/components/mine-dialog';
import editDialog from './editDialog';
import {
  getProfile,
  delPropertys,
  updateProfile,
  updateProStatus
} from '../../../api/myAgreement/index';
export default {
  components: {
    'con-header': conHeader,
    mineDialog,
    editDialog
    // 'property-dialog': propertyDialog
  },
  data() {
    return {
      propertyFlag: false,
      // 是否显示按钮
      propertyShowClose: false,
      propertyModalFlag: false,
      propertyTitle: '',

      titleIcon1: '/static/img/title_05@2x.png',
      tableLabel: {
        name: 'profile名称',
        // applianceType: '品类',
        nameZh: '品类',
        sn8: '型号码'
      },
      tableData1: {},
      tableData2: [],
      status: '',
      editData: {},

      profileFormDataEdit: {
        name: ''
      },
      propertyEditRules: {
        name: [{ required: true, message: '请输入名字', trigger: 'blur' }]
      }
    };
  },
  methods: {
    handleSaveAddProfile(buttonType) {
      debugger;
      let params = {
        id: this.$route.params.id,
        buttonType: buttonType,
        name: this.profileFormDataEdit.name
      };
      updateProStatus(params).then(res => {
        console.log(res);

        if (res.code === 0) {
          this.$router.push({ name: 'ProfileManagement' });
          this.$message({
            type: 'success',
            message: res.message,
            onClose: () => {}
          });
        }
      });
    },
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
            this.profileFormDataEdit.name = this.tableData1.name;
          }
        });
      }
    },

    // 点击编辑属性
    editProperty(row) {
      // console.log(row);
      // for (const key in row) {
      //   if (key === 'values') {
      //     debugger;
      //     // const row = row[key];
      //     this.editData.propertyValues = row[key];
      //   }
      // }
      this.editData = row;
      debugger;
      // this.$refs['propertyDialog'] &&
      //   (this.$refs['propertyDialog'].showDialog = true);
      this.propertyFlag = true;
      this.propertyShowClose = true;
      this.propertyTitle = '编辑自定属性';
    },
    propertyClose(val) {
      this.propertyFlag = val;
    },
    propertyHandleSave(val) {
      this.getProfileDetail();
      this.propertyFlag = val;
    },
    deletProfileName(row) {
      this.delPropertys(row);
    },
    // delPropertys 删除
    delPropertys(row) {
      let id = row.id;
      if (typeof id !== 'undefined') {
        let params = {
          id: id
        };
        delPropertys(params).then(res => {
          console.log(res);
          if (res.code === 0) {
            this.getProfileDetail();
          }
        });
      }
    },
    profileFormDataEditNameSave() {
      // this.$refs['profile-edit'] &&
      //   this.$refs['profile-edit'].validate(valid => {
      //     if (!valid) {
      //       return;
      //     }
      this.updateProfile();
      // this.showDialog = false;
      // });
    },
    updateProfile() {
      // if (typeof id !== 'undefined') {
      let params = {
        name: this.profileFormDataEdit.name,
        id: this.tableData1.id
      };
      updateProfile(params).then(res => {
        console.log(res);
        if (res.code === 0) {
          this.$message({
            showClose: true,
            message: res.message || '成功',
            type: 'success',
            onClose: val => {
              this.getProfileDetail();
            }
          });
        }
      });
      // }
    }
    // updateProfile 更新profile名字
  },
  mounted() {
    this.getProfileDetail();
  }
};
</script>

<style lang="less" scoped>
@import '../agreement.less';
@deep: ~'>>>';
@{deep} .profile-edit {
  display: flex;
  align-items: center;
  .el-form-item {
    margin-bottom: 0px;
    margin-right: 10px;
  }
  .el-form-item__content {
    margin-left: 0 !important;
  }
}
</style>
