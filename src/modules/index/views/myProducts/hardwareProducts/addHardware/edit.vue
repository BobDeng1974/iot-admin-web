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
              prop="electrical"
              style="padding-right:12px"
            >
              <el-select
                value-key="id"
                @change="getFirstChange"
                class="electrical-select"
                v-model.trim="ruleForm.categoryId"
                clearable
                placeholder="请选择家电"
                disabled
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
            <el-form-item prop="electrical1">
              <el-select
                value-key="id"
                @change="getFirst1Change"
                class="electrical-select"
                v-model.trim="ruleForm.subCategoryId"
                clearable
                placeholder="请选择家电"
                disabled
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
            <el-form-item prop="electrical2">
              <el-select
                value-key="id"
                @change="getFirst2Change"
                class="electrical-select"
                v-model.trim="ruleForm.applianceTypeId"
                clearable
                placeholder="请选择家电"
                disabled
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
          <el-button
            type="primary"
            icon="el-icon-setting"
            class="sdkBotton"
            @click="addHardWare"
          >补充芯片信息</el-button>
          <mine-dialog
            :dialogFormVisible='flag'
            :width='"50%"'
            :modalFlag="modalFlag"
            @close="close"
            :title="title"
            :showClose="showClose"
          >
            <div slot="option">
              <edit-dialog
                :dialogData="ruleForm.sdkLib"
                @close="close"
                @handleSave="handleSave"
              ></edit-dialog>
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
// import addDialog from './adddialog';
import editDialog from './editDialog';
import { dropDownTranslation } from '@/common/js/dropDownTranslation';
import { productsMixin } from '@/common/js/validation';
import commonFun from '@/common/js/func';
import API from '@/modules/index/api/myProductsData';
export default {
  mixins: [dropDownTranslation, productsMixin],
  components: { conHeader, mineDialog, editDialog },
  name: 'addHardware',
  created() {
    this.getSdkSelect();
    // this.electricalSelect({ pid: 0 });
    // 第一个下拉
    this.getcategorySelect({ pid: 0 });
  },
  data() {
    return {
      canSave: true,
      // editData: '', // 弹框的数据

      changeFlag: false,
      flag: false,
      // 是否显示按钮
      showClose: false,
      modalFlag: false,

      title: '',
      labelPosition: 'right',
      addProductsIcon: '/static/img/title_04@2x.png',
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
        // newSn8: '', // 新的
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
      oldSn8: '',
      oldApplianceTypeId: '',
      oldModelNumber: '',
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
  watch: {
    'ruleForm.categoryId': function(nval, oval) {
      if (!oval) {
        this.getcategorySelect1({ pid: nval });
      }
    },
    'ruleForm.subCategoryId': function(nval, oval) {
      if (!oval) {
        this.getApplianSelectAdd({ id: nval });
      }
    }
  },
  methods: {
    handlEidet(data) {
      console.log(data);
      this.ruleForm = data;
      this.ruleForm.id = data.id;
      this.oldSn8 = data.sn8;
      this.oldApplianceTypeId = data.applianceTypeId;
      this.oldModelNumber = data.modelNumber;
    },
    getFirstChange(value) {
      if (value) {
        this.getcategorySelect1({ pid: value });

        this.ruleForm.subCategoryId = '';
        this.ruleForm.applianceTypeId = '';
      }

      // this.ruleForm.categoryId = value.id;
    },
    getFirst1Change(value) {
      if (value) {
        this.getApplianSelectAdd({ id: value });
        this.ruleForm.applianceTypeId = '';
      }
    },
    getFirst2Change(value) {
      this.ruleForm.applianceType = commonFun.fetchWord(
        this.ruleForm.applianceTypeId,
        'id',
        this.optionsFirst2,
        'nameZh'
      );
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
          this.canSave = false;
          let params = {
            id: this.ruleForm.id,
            departmentId: this.ruleForm.departmentId,
            categoryId: this.ruleForm.categoryId,
            subCategoryId: this.ruleForm.subCategoryId,
            applianceTypeId: this.ruleForm.applianceTypeId,
            // applianceType: this.ruleForm.applianceType,
            applianceType: commonFun.fetchWord(
              this.ruleForm.applianceTypeId,
              'id',
              this.optionsFirst2,
              'type'
            ),
            sn8: this.ruleForm.sn8,
            sn8Id: this.$route.params.editData.sn8Id,
            oldSn8: this.oldSn8, // 就的sn8
            // newSn8:thid.ruleForm
            name: this.ruleForm.name,
            network: this.ruleForm.network,
            proto: this.ruleForm.proto,
            other: this.ruleForm.other,
            sdkId: this.ruleForm.sdkId,
            cuid: this.ruleForm.cuid,
            sdkLib: this.ruleForm.sdkLib,
            modelNumber: this.ruleForm.modelNumber
          };
          if (
            this.oldApplianceTypeId === this.ruleForm.applianceTypeId &&
            this.oldSn8 === this.ruleForm.sn8 &&
            this.oldModelNumber === this.ruleForm.modelNumber
          ) {
            this.getUpdateHard(params);
          } else {
            this.checkModelType(params);
          }
          // this.checkModelType(params);
          // this.getUpdateHard(params);
        });
    },
    // 效验sn8
    checkModelType(submitFormParams) {
      let params = {
        sn8: this.ruleForm.sn8,
        applianceTypeId: this.ruleForm.applianceTypeId,
        modelNumber: this.ruleForm.modelNumber,
        buttonType: 1,
        id: this.ruleForm.id
      };
      API.checkModelType(params).then(res => {
        debugger;
        if (res.code === 0) {
          if (!res.result.result) {
            // this.canSave = false;
            //   this.ruleForm.applianceType = commonFun.fetchWord(
            //   this.ruleForm.applianceTypeId,
            //   'id',
            //   this.optionsFirst2,
            //   'type'
            // );
            this.getUpdateHard(submitFormParams);
            // this.getAddHardware(this.ruleForm);
          } else {
            // this.$message({
            //   message: '已存在相同产品型号码SN8，不需要重复上传',
            //   type: 'warning',
            //   onClose: () => {
            //     this.canSave = true;
            //   }
            // });
            if (res.result.type === 1) {
              this.$message({
                message: 'sn8与modelNumber重复',
                type: 'warning',
                onClose: () => {
                  this.canSave = true;
                }
              });
            } else if (res.result.type === 2) {
              this.$message({
                message: '已有相同的型号码产品，暂不支持重复添加',
                type: 'warning',
                onClose: () => {
                  this.canSave = true;
                }
              });
            } else {
              this.$message({
                message: '已有相同的modelNumber产品，暂不支持重复添加',
                type: 'warning',
                onClose: () => {
                  this.canSave = true;
                }
              });
            }
          }
        }
      });
    },
    // 1
    async getUpdateHard(param) {
      try {
        await this.$store.dispatch('updateHard', param).then(result => {
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
        });
      } catch (e) {}
    },
    electricalSelect(objId) {
      this.getcategorySelect(objId);
    },
    handleChangeFlag: function(type) {
      this.changeFlag = type;
    },
    close(val) {
      this.flag = val;
    },
    handleSave(obj) {
      this.ruleForm.sdkLib = obj.data;
      // this.ruleForm.sdkLib.mdate = '';
      this.flag = obj.isShow;
    },
    addHardWare() {
      this.flag = true;
      this.showClose = true;
      this.title = '补充芯片信息';
    },
    // 编辑
    async getSdkLib() {
      let param = {
        id: this.$route.params.editData.sdkLibId
      };
      console.log(param);
      debugger;
      try {
        await this.$store.dispatch('getWifiSdkLib', param).then(result => {
          this.ruleForm.sdkLib = result.result;
          // debugger;
        });
      } catch (e) {}
    }
  },
  mounted() {
    if (this.$route.params.editData) {
      this.handlEidet(this.$route.params.editData);
      this.getSdkLib();
    }
  }
};
</script>
<style lang="less" scoped>
.modelNumber {
  @{deep} .el-form-item__label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
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
</style>

