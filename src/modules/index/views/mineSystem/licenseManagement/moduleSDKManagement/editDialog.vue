<template>
  <div>
    <div class="dialog-body">
      <el-form ref="form" :model="formData" :disabled="disabled" :rules="luaFormRules" label-width="128px">
        <el-form-item label="状态">
          <el-input v-model.trim="status" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="SDK名称" prop="name">
          <el-input v-model.trim="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="版本号" prop="version">
          <el-input v-model.trim="formData.version"></el-input>
        </el-form-item>
        <el-form-item label="芯片信息" prop="chip">
          <el-select v-model.trim="formData.chip" filterable clearable @change="chipChange" style="width:100%">
            <el-option v-for="(item, index) in chipModelList" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="编译工具链">
          <el-input v-model.trim="formData.compileChain"></el-input>
        </el-form-item>
        <el-form-item label="SDK文件" prop="sdkUrl">
          <el-input type="hidden" style="display:none" v-model="formData.sdkUrl"></el-input>
          <div class="upload-wrapper addlua-upload">
            <div class="upload-btn">
              <el-upload
                :on-preview="sdkUrlDownLoad"
                :accept="accept"
                :http-request="uploadImgApi"
                :action="'dddd'"
                multiple
                :limit="1"
                :file-list="fileList"
                :before-upload="beforeUpload"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                :on-remove="uploadRemove">
                <div class="upload-liubtn">
                  <el-button class="icon-btn" size="small" type="primary"><i class="icon-upload"></i>上传</el-button>
                  <div class="el-upload__tip" slot="tip">支持扩展名：.lua，且不超过5M</div>
                </div>
              </el-upload>
            </div>
          </div>
          <!-- <div class="file-upload" v-if="editfileSdkPackage">{{editfileSdkPackage}}</div> -->
        </el-form-item>
        <el-form-item label="测试报告" prop="reportUrl" >
          <el-input type="hidden" style="display:none" v-model="formData.reportUrl"></el-input>
          <div class="upload-wrapper addlua-upload">
            <div class="upload-btn">
              <el-upload class="upload-demo"
                :on-preview="reportUrlDownLoad"
                :accept="reportAccept"
                :http-request="uploadImgReportApi"
                :action="'dddd'"
                multiple
                :limit="1"
                :file-list="fileReportList"
                :before-upload="reportBeforeUpload"
                :on-success="reportUploadSuccess"
                :on-error="reportUploadError"
                :on-remove="reportUploadRemove">
                <div class="upload-liubtn">
                  <el-button class="icon-btn" size="small" type="primary"><i class="icon-upload"></i>上传</el-button>
                  <div class="el-upload__tip" slot="tip">支持扩展名：.xlsx, .xls ,.doc ,.docx，且不超过5M</div>
                </div>
              </el-upload>
            </div>
          </div>
          <!-- <div class="file-upload" v-if="editLuaFileName">{{editLuaFileName}}</div> -->
        </el-form-item>
        <el-form-item label="功能说明" prop="description">
          <el-input type="textarea" v-model.trim="formData.description"></el-input>
        </el-form-item>
        <el-form-item label="发布周知人" class="mip-accounts" prop="tempNoticeMipAccounts">
          <el-select style="width:100%" :multiple-limit="100" filterable v-model.trim="formData.tempNoticeMipAccounts" @change="noticeMipAccountsChange" multiple placeholder="请选择">
            <el-option
              v-for="(item, index) in noticeMipAccountsList"
              :key="index"
              :label="item.MipName"
              :value="item.account"
              >
            </el-option>
          </el-select>
          <el-button type="primary" v-if="editDetailData.status===0||editDetailData.status===3"  @click="allSelect">{{isSelect}}</el-button>
          <!-- <el-input type="textarea"  placeholder="不超过100个mip" v-model.trim="formData.noticeMipAccounts"></el-input> -->
        </el-form-item>
        <el-form-item prop="noticeMipAccountsName">
          <el-input type="textarea" disabled  v-model.trim="formData.noticeMipAccountsName"></el-input>
        </el-form-item>
        <el-form-item v-if="isHidden" label="提交人" prop="creatorName">
          <el-input  v-model.trim="formData.creatorName"></el-input>
        </el-form-item>
        <el-form-item v-if="isHidden" label="生效时间" prop="activeTime">
          <el-input  v-model.trim="formData.activeTime"></el-input>
        </el-form-item>
        <el-form-item v-if="isHidden" label="审核人" prop="auditorName">
          <el-input  v-model.trim="formData.auditorName"></el-input>
        </el-form-item>
        <!-- <el-form-item label="发布周知人" prop="noticeMipAccounts">
          <el-input type="textarea" placeholder="请输入发布人的mip账号以;分割" v-model.trim="formData.noticeMipAccounts"></el-input>
        </el-form-item> -->
      </el-form>
    </div>
    <div class="dialog-footer" v-authority="'b1_moduleSDKManagement_create'" v-if="editDetailData.status===0||editDetailData.status===3">
      <el-button type="primary" @click="handleSave">保存</el-button>
      <el-button type="primary" @click="handleSubmitTestAudit">提交测试审核</el-button>
    </div>
  </div>
</template>
<script>
import commonFun from '@/common/js/func';
import { moduleSdkMixin } from '@/common/js/validation';
import moduleSdkApi from '@/modules/index/api/myProductsData/moduleSdk';
import { dropDownTranslation } from '@/common/js/dropDownTranslation';
export default {
    props: {
    sdkId: {
      type: Number
    },
    isDetails: {
      type: Boolean
    },
    editDetailData: {
      type: Object
    },
    noticeMipAccountsList: {
      type: Array,
      defualt: []
    },
    flag: {
      type: Boolean
    }
  },
  mixins: [moduleSdkMixin, dropDownTranslation],
  data() {
    return {
      isSelect: '取消全选',
      isHidden: true,
      disabled: true,
      // 上传的参数开始
      accept: '.lua',
      fileList: [],
      reportAccept: '.xlsx, .xls ,.doc ,.docx',
      fileReportList: [],
      // 上传的参数结束
      status: '',
      formData: {
        // status: '编辑',
        name: '',
        version: '',
        chip: '',
        chipName: '',
        compileChain: '',
        sdkUrl: '',
        sdkOriginFileName: '',
        reportUrl: '',
        reportOriginFileName: '',
        description: '',
        noticeMipAccounts: '',
        tempNoticeMipAccounts: [],
        noticeMipAccountsName: '',
        creatorName: '',
        activeTime: '',
        auditorName: '',
        id: ''
      },

      useInfoList: [
          {id: 1, name: '1'}
      ],
      luaFormRules: {
        name: {required: true, validagittor: this.checkName, trigger: 'blur'},
        version: {required: true, validator: this.checkVersion, trigger: 'blur'},
        chip: {required: true, message: '请选择', trigger: 'change'},
        // compileChain: {required: false, validator: this.checkTool, trigger: 'blur'},
        sdkUrl: {required: true, message: '请上传SDK文件', trigger: 'change'},
        reportUrl: {required: true, message: '请上传测试报告文件', trigger: 'change'},
        description: {required: true, validator: this.checkDesc, trigger: 'change'},
        noticeMipAccounts: {required: true, message: '请输入', trigger: 'blur'},
        noticeMipAccountsName: {required: true, message: '请选择', trigger: 'change'}
      }
    };
  },
  watch: {
    flag: {
      handler(nowVal, oldVal) {
        if (nowVal === true) {
        this.getChipModelJson();
        this.handleData();
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    allSelect() {
      this.formData.tempNoticeMipAccounts = [];
      this.formData.noticeMipAccountsName = '';
      let array = [];
      debugger;
      if (this.isSelect === '全选') {
        if (this.noticeMipAccountsList.length !== this.formData.tempNoticeMipAccounts.length) {
          for (let index = 0; index < this.noticeMipAccountsList.length; index++) {
            const element = this.noticeMipAccountsList[index];
            this.formData.tempNoticeMipAccounts.push(element.account);
            array.push(element.account);
          }
          this.noticeMipAccountsChange(array);
        }
        this.isSelect = '取消全选';
      } else {
      this.isSelect = '全选';
      }
    },
    sdkUrlDownLoad() {
      this.downLoadClickA(this.formData.sdkUrl);
    },
    reportUrlDownLoad() {
      this.downLoadClickA(this.formData.reportUrl);
    },
    downLoadClickA(urlArr) {
      let link = document.createElement('a');
      link.style.height = '0px';
      link.href = urlArr;
      link.target = '_blank';
      link.setAttribute('download', urlArr);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    },
    chipChange(val) {
      this.formData.chipName = commonFun.fetchWord(
              val,
              'id',
              this.chipModelList,
              'name'
            );
    },

    handleSatus(key) {
      if (key === 0) {
        return '编辑';
      } else if (key === 1) {
        return '待审核';
      } else if (key === 2) {
        return '审核通过';
      } else if (key === 3) {
        return '审核失败';
      } else if (key === 4) {
        return '已发布';
      }
    },
    handleData() {
      debugger;
      if ((this.isDetails && this.editDetailData.status === 0) || (this.isDetails && this.editDetailData.status === 3)) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
      if (this.editDetailData.status === 3 || this.editDetailData.status === 0 || this.editDetailData.status === 1) {
        this.isHidden = false;
      }

      this.status = this.handleSatus(this.editDetailData.status);
       this.formData.id = this.editDetailData.id;
      this.formData.name = this.editDetailData.name;
      this.formData.version = this.editDetailData.version;
      this.formData.chip = Number(this.editDetailData.chip);
      this.formData.chipName = this.editDetailData.chipName;
      this.formData.compileChain = this.editDetailData.compileChain;
      this.formData.sdkUrl = this.editDetailData.sdkUrl;
      this.formData.sdkOriginFileName = this.editDetailData.sdkOriginFileName;
      this.formData.reportUrl = this.editDetailData.reportUrl;
      this.formData.reportOriginFileName = this.editDetailData.reportOriginFileName;
      this.formData.description = this.editDetailData.description;
       this.formData.tempNoticeMipAccounts = [];
      // this.formData.noticeMipAccounts = this.editDetailData.noticeMipAccounts;
     this.handleNoticeMipAccountsChange(this.editDetailData.noticeMipAccounts.split(';'));

      this.formData.creatorName = commonFun.fetchWord(
              this.editDetailData.creatorName,
              'name',
              this.noticeMipAccountsList,
              'MipName'
            );
      this.formData.activeTime = this.editDetailData.activeTime;
           this.formData.auditorName = commonFun.fetchWord(
              this.editDetailData.auditorName,
              'name',
              this.noticeMipAccountsList,
              'MipName'
            );

      this.formData.publisherName = this.editDetailData.publisherName;
              this.fileList.splice(0, 1, {
              name: this.editDetailData.sdkOriginFileName,
              url: this.editDetailData.sdkUrl
            });
            this.fileReportList.splice(0, 1, {
              name: this.editDetailData.reportOriginFileName,
              url: this.editDetailData.reportUrl
            });
      if (this.formData.tempNoticeMipAccounts.length === this.noticeMipAccountsList.length) {
        this.isSelect = '取消全选';
      } else {
        this.isSelect = '全选';
      }
            debugger;
    },
    noticeMipAccountsChange(array) {
      let tempNoticeMipAccountsArr = [];
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
          tempNoticeMipAccountsArr.push(commonFun.fetchWord(
              element,
              'account',
              this.noticeMipAccountsList,
              'MipName'
            ));
      }
      this.formData.noticeMipAccountsName = tempNoticeMipAccountsArr.join(';');
      debugger;
      this.formData.noticeMipAccounts = array.join(';');
      if (this.formData.tempNoticeMipAccounts.length === this.noticeMipAccountsList.length) {
        this.isSelect = '取消全选';
      } else {
        this.isSelect = '全选';
      }
    },
    handleNoticeMipAccountsChange(array) {
      let tempNoticeMipAccountsArr = [];
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
          tempNoticeMipAccountsArr.push(commonFun.fetchWord(
              element,
              'account',
              this.noticeMipAccountsList,
              'MipName'
            ));
          this.formData.tempNoticeMipAccounts.push(element);
      }
      debugger;
      console.log(tempNoticeMipAccountsArr);
      // if (this.noticeMipAccountsList.length > 0) {
      //     this.formData.noticeMipAccountsName = tempNoticeMipAccountsArr.join(';');
      // } else {
      //   this.formData.noticeMipAccountsName = this.editDetailData.noticeMipAccounts;
      // }
      this.formData.noticeMipAccountsName = tempNoticeMipAccountsArr.join(';');
      this.formData.noticeMipAccounts = array.join(';');
    },
    handleSubmitTestAudit() {
      // this.$emit('close', false);
      if (!commonFun.doSubmit('form', this)) return;
      this.create(true);
    },
    handleSave() {
      console.log(this.formData);
      if (!commonFun.doSubmit('form', this)) return;
      this.create(false);
      // this.$emit('close', false);
    },
    // 创建模块SDK信息
    create(submit) {
      let params = {
        ...this.formData,
        submit: submit
      };
      console.log(params, '参数');
      moduleSdkApi.sdkpackageinfoCreate(params).then((res) => {
        if (res.code === 0) {
          this.$emit('handleSave', false);
          commonFun.restData(this.formData);
          this.fileList = [];
          this.fileReportList = [];
          this.$message({
            showClose: true,
            message: res.message,
            type: 'success'
            // onClose: () => {
            //   this.$emit('handleSave', false);
            //   commonFun.restData(this.formData);
            //   this.fileList = [];
            //   this.fileReportList = [];
            // }
          });
        }
      }).catch(() => {
        debugger;
      });
    },
    // sdk上传调用的接口开始
    uploadImgApi(item) {
      let param = { uploadFile: item.file };
      this.getUpFile(param, {fileSdkPackage: 'sdkUrl', fileOrginalName: 'sdkOriginFileName'});
    },
        // 上传的接口
    async getUpFile(param, parameter) {
      try {
        await this.$store.dispatch('imgDoUpLoad', param).then(result => {
          if (result.code === 0) {
             debugger;
            this.formData[parameter.fileSdkPackage] = result.result.url;
            console.log(this.formData[parameter.fileSdkPackage]);
            this.formData[parameter.fileOrginalName] = result.result.originalFileName;
            this.$message({
              message: result.message,
              type: 'success'
            });
          }
        });
      } catch (e) {}
    },
    beforeUpload(file) {
      return (
        commonFun.extMatch(file, this.accept, this) &&
        commonFun.extMatchSize(file, 5, this)
      );
    },
    // 上传成功
    uploadSuccess(res, file, fileList) {
      debugger;
      this.formData.sdkUrl = '';
      this.fileList = fileList;
    },
    // 上传失败
    uploadError(err, file, fileList) {
      if (err) {
        this.$message({
          showClose: true,
          message: '文件上传失败',
          type: 'error'
        });
      }
    },
    // 移除文件时
    uploadRemove(file, fileList) {
      this.formData.sdkUrl = '';
      this.fileList = fileList;
    },
    // sdk上传调用的接口
    // 测试报告上传调用的接口开始
    uploadImgReportApi(item) {
      let param = { uploadFile: item.file };
      this.getUpFile(param, {fileSdkPackage: 'reportUrl', fileOrginalName: 'reportOriginFileName'});
    },
    reportBeforeUpload(file) {
      return (
        commonFun.extMatch(file, this.reportAccept, this) &&
        commonFun.extMatchSize(file, 5, this)
      );
    },
    // 上传成功
    reportUploadSuccess(res, file, fileList) {
      this.formData.reportUrl = '';
      this.fileReportList = fileList;
    },
    // 上传失败
    reportUploadError(err, file, fileList) {
      if (err) {
        this.$message({
          showClose: true,
          message: '文件上传失败',
          type: 'error'
        });
      }
    },
    // 移除文件时
    reportUploadRemove(file, fileList) {
      this.formData.reportUrl = '';
      this.fileReportList = fileList;
    }
    // 测试报告上传调用的接口
  }
};
</script>
<style lang="less" scoped>
@import "./moduleSDKManagement.less";
</style>

