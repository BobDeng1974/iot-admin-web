<template>
  <div class="page-container">
    <con-header
      :title-icon="addProductsIcon"
      title="产品基本信息"
      :hasBottomBorder="true"
    ></con-header>
    <div class="form-container">
      <el-form
        :label-position="labelPosition"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="140px"
        class="ruleForm"
      >
        <el-form-item
          class="form-electrical"
          label="产品分类"
          required
        >
          <el-col :span="8">
            <el-form-item
              prop="categoryId"
              style="padding-right:12px"
            >
              <el-select
                value-key="id"
                @change="getFirstChange"
                class="electrical-select"
                v-model.trim="ruleForm.categoryId"
                clearable
                placeholder="请选择家电"
              >
                <el-option
                  v-for="(item, index) in optionsFirst"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :span="8"
            style="padding-right:12px"
          >
            <el-form-item prop="subCategoryId">
              <el-select
                value-key="id"
                @change="getFirst1Change"
                class="electrical-select"
                v-model.trim="ruleForm.subCategoryId"
                clearable
                placeholder="请选择家电"
              >
                <el-option
                  v-for="(item, index) in optionsFirst1"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="applianceTypeId">
              <el-select
                value-key="id"
                @change="getFirst2Change"
                class="electrical-select"
                v-model.trim="ruleForm.applianceTypeId"
                clearable
                placeholder="请选择家电"
              >
                <el-option
                  v-for="(item, index)  in optionsFirst2"
                  :key="index"
                  :label="item.nameZh"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item
          class="form-electrical"
          label=" 产品名称"
          prop="name"
        >
          <el-input v-model.trim="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item
          class="form-electrical"
          label="产品型号码"
          prop="sn8"
        >
          <el-input v-model.trim="ruleForm.sn8"></el-input>
        </el-form-item>
        <el-form-item
          class="form-electrical modelNumber"
          label="model number"
          prop="modelNumber"
        >
          <el-input v-model.trim="ruleForm.modelNumber"></el-input>
        </el-form-item>
        <el-form-item
          class="form-electrical"
          label=" 产品描述"
          prop="discription"
        >
          <el-input
            type="textarea"
            v-model.trim="ruleForm.discription "
          ></el-input>
        </el-form-item>
        <el-form-item
          class="form-electrical"
          label="联网方式"
          required
        >
          <!-- <el-col> -->
          <el-form-item prop="network">
            <el-radio-group
              v-model.trim="ruleForm.network"
              class="network-container"
            >
              <div class="network">
                <el-radio :label='1'>仅WIFI</el-radio>
                <el-radio :label='2'>WIFI+蓝牙</el-radio>
              </div>
              <div class="network networMidle">
                <el-radio :label='3'>2G</el-radio>
                <el-radio :label='4'>3G</el-radio>
                <el-radio :label='5'>NB-IOT</el-radio>
              </div>
              <div>
                <el-radio :label='6'>zigebee</el-radio>
              </div>
            </el-radio-group>
          </el-form-item>
        </el-form-item>
        <el-form-item
          class="form-electrical"
          label="支持协议"
          prop="proto"
        >
          <el-radio-group v-model.trim="ruleForm.proto">
            <el-radio :label="1">msmart</el-radio>
            <el-radio :label="2">msmart+阿里</el-radio>
            <el-radio :label="3">msmart+华为</el-radio>
            <el-radio :label="4">msmart+京东</el-radio>
            <div class="notice-img"><img
                src="./../../../../img/notice@2x 2.png"
                alt="图片不存在"
              ></div>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          class="sdk-container"
          label="smart SDK"
          prop="sdkId"
        >
          <el-select
            class="electrical-select"
            v-model.trim="ruleForm.sdkId"
            clearable
            placeholder="请选择smart SDK"
          >
            <el-option
              v-for="item in sdkIdOptions"
              :key="item.value"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <el-form-item prop="sdkLib">
            <el-input
              type="hidden"
              v-model.trim="ruleForm.sdkLib"
            ></el-input>
            <el-button
              type="primary"
              icon="el-icon-setting"
              class="sdkBotton"
              @click="addHardWare"
            >补充芯片信息</el-button>
          </el-form-item>

          <mine-dialog
            :dialogFormVisible='flag'
            :width='"50%"'
            :modalFlag="modalFlag"
            @close="close"
            :title="title"
            :showClose="showClose"
          >
            <div slot="option">
              <add-dialog
                :flag="flag"
                @close="close"
                @handleSave="handleSave"
              ></add-dialog>
            </div>
          </mine-dialog>
        </el-form-item>
        <el-form-item
          class="form-electrical"
          label="其他要求"
          prop="other"
        >
          <el-input
            type="textarea"
            v-model.trim="ruleForm.other "
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            v-if="canSave"
            @click="submitForm('ruleForm')"
          >提交审核</el-button>
          <el-button
            type="primary"
            v-else
          >提交审核</el-button>
          <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import conHeader from '@/components/awesome/con-header/con-header';
import mineDialog from '@/modules/index/components/mine-dialog';
import addDialog from './adddialog';
import { dropDownTranslation } from '@/common/js/dropDownTranslation';
import commonFun from '@/common/js/func';
import { productsMixin } from '@/common/js/validation';
import API from '@/modules/index/api/myProductsData';
export default {
  components: { conHeader, mineDialog, addDialog },
  mixins: [dropDownTranslation, productsMixin],
  name: 'addHardware',
  created() {
    this.getSdkSelect();
    // 第一个下拉
    this.getcategorySelect({ pid: 0 });
    // this.electricalSelect({ pid: 0 });
  },
  data() {
    return {
      canSave: true,
      changeFlag: false,
      flag: false,
      // 是否显示按钮
      showClose: false,
      modalFlag: false,

      title: '',
      labelPosition: 'right',
      addProductsIcon: '/static/img/title_04@2x.png',
      optionsFirst: [],
      optionsFirst1: [],
      optionsFirst2: [],
      // sdkIdOptions: [
      //   {
      //     value: '选项1',
      //     label: 'sdk1',
      //     id: 0
      //   },
      //   {
      //     value: '选项2',
      //     label: 'sdk1',
      //     id: 1
      //   }
      // ],
      ruleForm: {
        departmentId: '1',
        electrical: '',
        categoryId: '',
        electrical1: '',
        subCategoryId: '',
        electrical2: '',
        applianceTypeId: '',
        applianceType: '',
        name: '',
        // productsNumber: '',
        sn8: '',
        discription: '',
        network: '',
        networkWay: '',
        proto: '',
        sdkId: '',
        sdkIdValue: '',
        sdkLib: '',
        other: '',
        cuid: '',
        modelNumber: ''
      },
      rules: {
        modelNumber: [
          { required: true, message: '请输入model number', trigger: 'blur' }
        ],
        categoryId: [
          { required: true, message: '请选择家电', trigger: 'change' }
        ],
        subCategoryId: [
          { required: true, message: '请选择家电1', trigger: 'change' }
        ],
        applianceTypeId: [
          { required: true, message: '请选择家电2', trigger: 'change' }
        ],
        name: [
          { required: true, validator: this.checkProductName, trigger: 'blur' }
        ],
        sn8: [{ required: true, validator: this.checkSn8, trigger: 'blur' }],
        discription: [
          { required: true, validator: this.checkDiscription, trigger: 'blur' }
        ],
        network: [
          { required: true, message: '请选择网络类型', trigger: 'change' }
        ],
        sdkLib: [
          {
            required: true,
            message: '请补充芯片信息',
            type: 'object',
            trigger: 'change'
          }
        ],
        // networkWay: [
        //   { required: true, message: '请选择网络类型', trigger: 'change' }
        // ],
        // networkType: [
        //   { required: true, message: '请选择网络zigebee', trigger: 'change' }
        // ],
        proto: [
          { required: true, message: '请选择支持协议', trigger: 'change' }
        ],
        sdkId: [
          { required: true, message: '请选择smart SDK', trigger: 'change' }
        ],
        other: [{ required: false, message: '请输入其他要求', trigger: 'blur' }]
      }
    };
  },
  methods: {
    // 效验sn8
    checkModelType() {
      let params = {
        sn8: this.ruleForm.sn8,
        applianceTypeId: this.ruleForm.applianceTypeId,
        modelNumber: this.ruleForm.modelNumber
      };
      API.checkModelType(params).then(res => {
        debugger;
        if (res.code === 0) {
          if (!res.result.result) {
            this.canSave = false;
            this.ruleForm.applianceType = commonFun.fetchWord(
              this.ruleForm.applianceTypeId,
              'id',
              this.optionsFirst2,
              'type'
            );
            this.getAddHardware(this.ruleForm);
          } else {
            if (res.result.type === 1) {
              this.$message({
                message: 'sn8与modelNumber重复',
                type: 'warning'
              });
            } else if (res.result.type === 2) {
              this.$message({
                message: '已有相同的型号码产品，暂不支持重复添加',
                type: 'warning'
              });
            } else {
              this.$message({
                message: '已有相同的modelNumber产品，暂不支持重复添加',
                type: 'warning'
              });
            }
          }
        }
      });
    },
    // getSdkIdChange(value) {
    //   this.ruleForm.sdkId = value.id;
    // },
    getFirstChange(value) {
      // debugger;
      if (value) {
        this.getcategorySelect1({ pid: value });
        debugger;
        this.ruleForm.subCategoryId = '';
        this.ruleForm.applianceTypeId = '';
      }

      // this.ruleForm.categoryId = value.id;
    },
    getFirst1Change(value) {
      if (value) {
        this.getApplianSelectAdd({ id: value });
        debugger;
        this.ruleForm.applianceTypeId = '';
      }
      // this.ruleForm.subCategoryId = value.id;
    },
    getFirst2Change(value) {
      this.ruleForm.applianceType = commonFun.fetchWord(
        this.ruleForm.applianceTypeId,
        'id',
        this.optionsFirst2,
        'nameZh'
      );
      debugger;
      // this.ruleForm.applianceTypeId = value.id;
      // this.ruleForm.applianceType = ;
    },
    // 提交审核
    submitForm(formName) {
      this.ruleForm.cuid =
        this.$store.getters.userInfo.uid ||
        JSON.parse(localStorage.getItem('userInfo')).uid;
      this.$refs['ruleForm'] &&
        this.$refs['ruleForm'].validate(valid => {
          if (!valid) {
            return;
          }
          if (!this.canSave) {
            return;
          }
          this.checkModelType();
          // this.canSave = false;
          // this.ruleForm.applianceType = commonFun.fetchWord(
          //   this.ruleForm.applianceTypeId,
          //   'id',
          //   this.optionsFirst2,
          //   'type'
          // );
          // this.getAddHardware(this.ruleForm);
          // this.canSave = false;
          // this.getAddHardware(this.ruleForm);
        });
    },
    //
    async getAddHardware(param) {
      console.log('提交数据');
      console.log(param);
      try {
        await this.$store.dispatch('addHardware', param).then(result => {
          if (result.code === 0) {
            this.$message({
              message:
                'HI，您提交的硬件件开发需求平台已收到，请等待审核' ||
                result.message,
              type: 'success',
              onClose: () => {
                this.$router.push({ name: '产品' });
                commonFun.restData(this.ruleForm);
                this.canSave = true;
              }
            });
          }
        });
      } catch (e) {}
    },
    // electricalSelect(objId) {
    //   // this.getcategorySelect(objId);
    // },
    handleChangeFlag: function(type) {
      this.changeFlag = type;
    },
    close(val) {
      this.flag = val;
    },
    handleSave(obj) {
      this.ruleForm.sdkLib = obj.data;
      this.flag = obj.isShow;
    },
    addHardWare() {
      this.flag = true;
      this.showClose = true;
      this.title = '补充芯片信息';
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
@deep: ~">>>";
.form-container {
  padding-top: 40px;
  padding-left: 60px;
  padding-right: 160px;
  .electrical-select {
    width: 100%;
    &:nth-child(n + 2) {
      padding-right: 12px;
    }
  }
}
.form-electrical {
  padding-right: 104px;
}
.network {
  position: relative;
  &::after {
    content: "";
    display: inline-block;
    width: 1px;
    height: 16px;
    background: #dedfe5;
    position: absolute;
    right: -30px;
    top: 0px;
  }
  &.networMidle {
    &::after {
      right: -30px;
    }
  }
}
.notice-img {
  display: inline-block;
  width: 12px;
  height: 12px;
  padding-left: 4px;
  img {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
}
.sdk-container {
  // display: flex;
  @{deep} .el-form-item__content {
    display: flex;
  }
}
.sdkBotton {
  margin-left: 10px;
  padding: 12px 10px;
  margin-right: -30px;
}
.network-container {
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: space-between;
}
.modelNumber {
  @{deep} .el-form-item__label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>

