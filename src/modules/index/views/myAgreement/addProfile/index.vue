<template>
  <div class="page-container">
    <div class="page-main-con">
      <con-header :titleIcon="titleIcon1" title="新增profile文件"></con-header>
      <div class="page-main-wrapper">
        <h3 class="profile-title">基本信息</h3>
        <div class="profile-form-wrapper">
          <el-form class="profile-form" ref="profileForm" :model="profileFormData" :rules="rules" label-width="100px">
            <el-row class="p-form-flex" type="flex">
              <el-col :span="8">
                <el-form-item label="profile名称" prop="name">
                  <el-input v-model.trim="profileFormData.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="品类" prop="applianceType">
                  <el-select v-model.trim="profileFormData.applianceType" style="width: 100%" @change="applianceChange">
                    <el-option @click.native="applianceClick(profileFormData.applianceType)" v-for="item in applianceTypeOpts" :key="item.type" :label="item.nameZh" :value="item.type"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="型号码" prop="sn8">
                  <el-select v-model.trim="profileFormData.sn8" style="width: 100%">
                    <el-option v-for="(item ,index) in sn8Opts" :key="index" :label="item.sn8" :value="item.sn8"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <h3 class="profile-title">功能列表-基本属性</h3>
        <div class="table-wrapper">
          <el-table class="table" :data="dataList1" style="width: 100%">
            <!-- <el-table-column prop="id" label="编号" align="center" show-overflow-tooltip></el-table-column> -->
            <el-table-column prop="index" width="50" align="center" :render-header="baseRenderIndex"></el-table-column>
            <el-table-column prop="keyDesc" label="功能" show-overflow-tooltip></el-table-column>
            <el-table-column prop="keyCode" label="属性名称" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" label="取值类型" show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="scope.row.keyType==='ENUM'">枚举型</span>
                <span v-if="scope.row.keyType==='string'">字符型</span>
                <span v-if="scope.row.keyType==='double'">浮点型</span>
                <span v-if="scope.row.keyType==='int'">数值型</span>
                <span v-if="scope.row.keyType==='boolean'">布尔型</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="属性值" show-overflow-tooltip>
              <template slot-scope="scope">
                <div></div>
                <span v-for="(item, index) in scope.row.lists" :key="index">
                  <span v-if="index!==0&&item.valueCode!==''">,</span>
                  <!-- {{item.valueCode}}/{{item.valueEn}} -->
                  {{item.valueCode}}<span v-if="item.valueEn!==''">/</span>{{item.valueEn}}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="editBaseProperty(scope.row)">编辑</el-button>
                <el-button class="opt-btn" type="text" size="small" @click="baseDelete(scope.$index)">删除</el-button>
                <el-button class="opt-btn" type="text" size="small" @click="baseDetails(scope.row)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="custom clearfix">
          <h3 class="profile-title pull-left">功能列表-自定义属性</h3>
          <div class="add-button pull-right">
            <el-button class="icon-btn" type="primary" size="small" @click="addCustomProperty"><i class="icon-add"></i>新增属性</el-button>
          </div>
        </div>
        <div class="table-wrapper">
          <el-table class="table" :data="dataList2" style="width: 100%">
            <el-table-column prop="index" width="100" align="center" :render-header="renderIndex"></el-table-column>
            <el-table-column prop="propertyKey" label="属性" show-overflow-tooltip></el-table-column>
            <el-table-column prop="propertyName" label="属性名称" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" label="读取方式" show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="scope.row.readwrite===0">只读</span>
                <span v-if="scope.row.readwrite===1">读写</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="取值类型" show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="scope.row.propertyType===1">枚举型</span>
                <span v-if="scope.row.propertyType===2">布尔型</span>
                <span v-if="scope.row.propertyType===3">数值型</span>
                <span v-if="scope.row.propertyType===4">浮点型</span>
                <span v-if="scope.row.propertyType===5">字符型</span>

              </template>
            </el-table-column>
            <el-table-column align="center" label="属性值" show-overflow-tooltip>
              <template slot-scope="scope">
                <div></div>
                <span v-for="(item, index) in scope.row.propertyValues" :key="index">
                  <span v-if="index!==0&&item.valueCode!==''">,</span>
                  {{item.valueCode}}<span v-if="item.valueDes!==''">/</span>{{item.valueDes}}

                </span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="editCustomProperty(scope.row)">编辑</el-button>
                <el-button class="opt-btn" type="text" size="small" @click="deleteCustomProperty(scope.$index)">删除</el-button>
                <el-button class="opt-btn" type="text" size="small" @click="details(scope.row)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="last-opt">
          <el-button type="primary" @click="handleSaveAddProfile(0)" size="medium">保存</el-button>
          <el-button type="primary" size="medium" @click="handleSaveAddProfile(1)">发布</el-button>
        </div>
      </div>
      <!--新增/编辑profile属性 基本属性-->

      <mine-dialog :dialogFormVisible='flag' :width='"60%"' :modalFlag="modalFlag" @close="close" :title="title" :showClose="showClose">
        <div slot="option" v-if="isApplianceType">
          <features-dialog :flag="flag" :applianceTypeArr="applianceTypeOpts" :applianceType="profileFormData.applianceType" @close="close" @handleSave="handleSave"></features-dialog>
        </div>
        <div slot="option" v-else>
          <base-dialog :baseEditData="baseEditData" :isBaseDetails="isBaseDetails" :flag="flag" @close="close" @handleSave="baseHandleSaveEdit"></base-dialog>
        </div>
      </mine-dialog>
      <!--新增/编辑profile属性 自定义属性-->
      <mine-dialog :dialogFormVisible='propertyFlag' :width='"50%"' :modalFlag="propertyModalFlag" @close="propertyClose" :title="propertyTitle" :showClose="propertyShowClose">
        <div slot="option" v-if="isAdd">
          <property-dialog :addIndex="dataList2.length||0" :editData="editData" @close="propertyClose" @propertyHandleSave="propertyHandleSave"></property-dialog>
        </div>
        <div slot="option" v-else>
          <edit-dialog :isDetails="isDetails" :editData="editData" @close="propertyClose" @propertyHandleSave="propertyHandleSaveEdit"></edit-dialog>
        </div>
      </mine-dialog>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import conHeader from '@/components/awesome/con-header/con-header';
import mineDialog from '@/modules/index/components/mine-dialog';
import propertyDialog from '../../../components/propertyDialog/index';
import editDialog from './editDialog';
import baseDialog from './baseDialog';
import featuresDialog from '../../../components/featuresDialog/index';
import { addProfile } from '../../../api/myAgreement/index';
import { dropDownTranslation } from '@/common/js/dropDownTranslation';
import commonFun from '@/common/js/func';
export default {
  mixins: [dropDownTranslation],
  components: {
    'con-header': conHeader,
    'property-dialog': propertyDialog,
    'features-dialog': featuresDialog,
    mineDialog,
    editDialog,
    baseDialog
  },
  data() {
    return {
      // 基本属性
      isApplianceType: true,
      isBaseDetails: false,
      // baseEdit: false,
      isAdd: false,
      flag: false,
      // 是否显示按钮
      showClose: false,
      modalFlag: false,
      title: '',

      propertyFlag: false,
      // 是否显示按钮
      propertyShowClose: false,
      propertyModalFlag: false,
      propertyTitle: '',

      isDetails: false,

      titleIcon1: '/static/img/title_07@2x.png',
      getApplianceType: '',
      profileFormData: {
        profileId: '',
        type: '',
        applianceType: '',
        sn8: '',
        name: ''
      },
      rules: {
        applianceType: [
          { required: true, message: '请选择品类', trigger: 'change' }
        ],
        sn8: [{ required: true, message: '请选择子型号', trigger: 'change' }],
        name: [
          { required: true, message: '请输入profile名称', trigger: 'blur' }
        ]
      },
      dataList1: [],
      dataList2: [],
      editData: null,
      tempList: [],

      // 基础属性
      baseEditData: null
    };
  },
  methods: {
    // 基本属性开始
    // 编辑的保存
    baseHandleSaveEdit(data) {
      this.flag = false;
      debugger;
    },
    // 点击编辑基本属性
    editBaseProperty(row) {
      this.baseEditData = row;
      debugger;
      this.flag = true;
      this.isApplianceType = false;
      this.isBaseDetails = false;
      this.title = '编辑可选功能';
      this.$refs['propertyDialog'] &&
        (this.$refs['propertyDialog'].showDialog = true);
    },
    baseDetails(row) {
      this.baseEditData = row;
      debugger;
      this.flag = true;
      this.isApplianceType = false;
      this.isBaseDetails = true;
      this.title = '详细可选功能';
    },
    baseDelete(row) {
      this.dataList1.splice(row, 1);
    },

    renderIndex(h, { column, $index }) {
      return h('span', [h('span', '编号')]);
    },
    handleSaveAddProfile(buttonType) {
      if (!commonFun.doSubmit('profileForm', this)) return;
      // console.log(this.dataList1);
      let tempBasicAttributes = this.dataList1;
      let data1BaseArr = [];
      let tempObj = {};
      for (let index = 0; index < tempBasicAttributes.length; index++) {
        const object = tempBasicAttributes[index];
        for (const key in object) {
          tempObj.type = 0;
          tempObj.readwrite = 0;
          // key;
          if (object.hasOwnProperty('keyDesc') && key === 'keyDesc') {
            tempObj.propertyName = object[key];
          } else if (object.hasOwnProperty('keyCode') && key === 'keyCode') {
            tempObj.propertyKey = object[key];
          } else if (object.hasOwnProperty('keyType') && key === 'keyType') {
            if (object[key] === 'ENUM') {
              tempObj.propertyType = 1;
            } else if (object[key] === 'String') {
              tempObj.propertyType = 5;
            } else if (object[key] === 'double') {
              tempObj.propertyType = 4;
            } else if (object[key] === 'int') {
              tempObj.propertyType = 3;
            } else if (object[key] === 'boolean') {
              tempObj.propertyType = 2;
            }
            // tempObj.propertyType = object[key];
          } else if (key === 'lists' && object[key] instanceof Array) {
            // debugger;
            tempObj.propertyValues = [];
            for (let index = 0; index < object[key].length; index++) {
              const ele = object[key][index];
              let tempElement = {};
              for (const eleKey in ele) {
                if (ele.hasOwnProperty('valueCode') && eleKey === 'valueCode') {
                  tempElement.valueCode = ele[eleKey];
                }
                if (ele.hasOwnProperty('valueEn') && eleKey === 'valueEn') {
                  tempElement.valueDes = ele[eleKey];
                }
              }
              tempObj.propertyValues.push(tempElement);
            }
          }
        }
        data1BaseArr.push(tempObj);
      }
      this.tempList = data1BaseArr.concat(this.dataList2);
      this.addProfile(buttonType);
    },
    // release() {
    //   this
    //   this.submit(1);
    // },
    // addProfile 新增/发布
    addProfile(buttonType) {
      this.submit(buttonType);
    },
    submit(buttonType) {
      let params = {
        buttonType: buttonType,
        name: this.profileFormData.name,
        cuid:
          this.$store.getters.userInfo.uid ||
          JSON.parse(localStorage.getItem('userInfo')).uid,
        applianceType: this.profileFormData.applianceType,
        //   applianceType: commonFun.fetchWord(
        //   this.profileFormData.applianceType,
        //   'type',
        //   this.applianceTypeOpts,
        //   'nameZh'
        // ),
        applianceTypeId: commonFun.fetchWord(
          this.profileFormData.applianceType,
          'type',
          this.applianceTypeOpts,
          'id'
        ),
        sn8: this.profileFormData.sn8,
        list: this.tempList
      };
      console.log('params');
      console.log(params);
      debugger;
      addProfile(params).then(res => {
        // debugger;
        if (res.code === 0) {
          this.$router.push({ name: 'ProfileManagement' });
        }
        console.log(res);
      });
    },
    applianceClick(val) {
      if (val) {
        this.getApplianceType = val;
        this.showShuttleBox();
      }
    },
    // 弹出穿梭框
    showShuttleBox() {
      this.flag = true;
      // this.baseEdit = false;
      this.isApplianceType = true;
      this.showClose = true;
      this.title = '新增可选功能';
    },
    close(val) {
      this.flag = val;
    },
    initTableData(val) {
      if (!val && !val.length) return [];
      for (var i = 0; i < val.length; i++) {
        val[i].index = i + 1;
      }
      return val;
    },
    // 基础属性的编号
    baseRenderIndex(h, { column, $index }) {
      return h('span', [h('span', '编号')]);
    },
    handleSave(obj) {
      console.log(obj);
      debugger;
      // let tempArr = [];
      // this.dataList1 = _.cloneDeep(obj);
      // this.dataList1 = this.dataList1.concat(obj);
      this.dataList1 = this.initTableData(this.dataList1.concat(obj));
      this.flag = obj.isShow;
    },

    // 自定义属性开始
    // 点击新增属性
    addCustomProperty() {
      this.propertyFlag = true;
      this.propertyShowClose = true;
      this.isAdd = true;
      this.propertyTitle = '新增自定属性';
    },
    // 编辑可选功能
    editCustomProperty(row) {
      this.isAdd = false;
      this.propertyFlag = true;
      this.propertyShowClose = true;
      this.propertyTitle = '编辑自定属性';
      this.editData = row;
      this.isDetails = false;
    },
    // 点击详情
    details(row) {
      this.isAdd = false;
      this.propertyFlag = true;
      this.propertyShowClose = true;
      this.propertyTitle = '详细自定属性';
      this.editData = row;
      this.isDetails = true;
    },
    // 删除自定义属性
    deleteCustomProperty(index) {
      this.dataList2.splice(index, 1);
    },
    // 自定义属性结束
    propertyClose(val) {
      this.propertyFlag = val;
    },
    propertyHandleSave(obj) {
      console.log(obj);
      debugger;
      let tempObj = _.cloneDeep(obj);
      this.dataList2.push(tempObj);
      this.propertyFlag = false;
    },
    propertyHandleSaveEdit(obj) {
      this.propertyFlag = false;
    },
    applianceChange(value) {
      console.log(value);
      if (value) {
        this.getSn8Select({
          id: commonFun.fetchWord(
            this.profileFormData.applianceType,
            'type',
            this.applianceTypeOpts,
            'id'
          )
        });
        // debugger;
        this.profileFormData.sn8 = '';
      }
      // debugger;
    }
  },
  mounted() {},
  created() {
    // this.getSn8Select({ id: 0 });
    this.getApplianSelect({ id: 0 });
  }
};
</script>
<style lang="less" scoped>
@import '../agreement.less';
</style>
