<template>
  <div>
    <div class="dialog-body">
      <el-form ref="elec-form" :model="formData" :rules="elecFormRules" label-width="128px">
        <el-form-item label="品类" prop="applianceTypeId">
          <el-select @change="dialogLuaFormDataapplianceTypeChange" v-model="formData.applianceTypeId" style="width: 100%;">
            <el-option v-for="item in applianceTypeOpts" :key="item.id" :label="item.nameZh" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="型号码" prop="sn8">
          <el-select v-model.trim="formData.sn8" clearable style="width: 100%;">
            <el-option v-for="item  in sn8Opts" :key="item.id" :value="item.sn8" :label="item.sn8">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="型号码" prop="sn8">
          <el-input v-model.trim="formData.sn8"></el-input>
        </el-form-item> -->
        <el-form-item label="上传电控文件" prop="url">
          <div class="upload-wrapper elec-upload">
            <div class="upload-btn">
              <el-upload class="upload-demo" :accept="accept" :http-request="uploadImgApi" drag :action="'dddd'" multiple :limit="1" :file-list="fileList" :before-upload="beforeUpload" :on-success="uploadSuccess" :on-error="uploadError" :on-remove="uploadRemove">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">点击或将文件拖拽到这里上传或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">支持扩展名：xlsx、xls、doc、docx，且不超过5M</div>
              </el-upload>
              <!-- <el-upload accept=".rar, .zip ,.doc ,.docx, .exl" class="upload-demo" :http-request="uploadImgApi" :action="'dddd'" multiple :limit="1" :file-list="fileList" :before-upload="beforeUpload" :on-success="uploadSuccess" :on-error="uploadError" :on-remove="uploadRemove">
                <el-button class="icon-btn" size="small" type="primary"><i class="icon-upload"></i>上传</el-button>
                <span slot="tip" class="upload-tip">支持扩展名：.rar .zip .doc .docx .exl</span>
              </el-upload> -->
              <input type="hidden" v-model.trim="formData.url" />
            </div>
          </div>
        </el-form-item>

        <el-form-item label="版本" prop="version">
          <el-input v-model="formData.version"></el-input>
        </el-form-item>
        <el-form-item>
           <div  class="dialog-footer">
            <el-button type="primary" @click="handleSave">保存</el-button>
            <el-button @click="handleCancel">取消</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>
<script>
import { dropDownTranslation } from '@/common/js/dropDownTranslation';
import commonFun from '@/common/js/func';
import {
  getElecDoc,
  docUpdate,
  checkDoc
} from '../../../api/myAgreement/index';
export default {
  props: {
    editDataId: {
      type: Number
    },
    flag: {
      type: Boolean
    }
  },
  mixins: [dropDownTranslation],
  created() {
    this.getApplianSelect();
  },
  mounted() {
    this.getElDoc();
  },
  data() {
    return {
      fileList: [],
      accept: '.xlsx, .xls ,.doc ,.docx',
      formData: {
        departmentId:
          this.$store.getters.userInfo.departmentId ||
          JSON.parse(localStorage.getItem('userInfo')).departmentId,
        applianceType: '',
        applianceTypeId: '',
        sn8: '',
        url: '',
        version: '',
        cuid:
          this.$store.getters.userInfo.uid ||
          JSON.parse(localStorage.getItem('userInfo')).uid,
        fileOrginalName: ''
      },
      elecFormRules: {
        applianceTypeId: [
          { required: true, message: '请选择品类', trigger: 'change' }
        ],
        sn8: [{ required: true, message: '请输入型号', trigger: 'change' }],
        version: [{ required: true, message: '请输入版本', trigger: 'blur' }],
        url: [{ required: true, message: '请上传文件', trigger: 'blur' }]
      },
      oldSn8: '',
      oldApplianceTypeId: '',
      oldVersion: ''
    };
  },
  watch: {
    'formData.applianceTypeId': function(nval, oval) {
      this.getSn8Select({ id: nval });
    },
    flag: {
      handler(nowVal, oldVal) {
        if (nowVal === true) {
          this.getElDoc();
        }
      },
      deep: true,
      immediate: true
    }
  },

  methods: {
    async goCheckDoc() {
      let params = {
        applianceTypeId: this.formData.applianceTypeId,
        sn8: this.formData.sn8,
        version: this.formData.version
      };
      // let isGo = null;
      await checkDoc(params).then(res => {
        debugger;
        if (res.code === 0) {
          if (!res.result) {
            // if (!commonFun.doSubmit('elec-form', this)) return;
            // this.formData.applianceType = commonFun.fetchWord(
            //   this.formData.applianceTypeId,
            //   'id',
            //   this.applianceTypeOpts,
            //   'type'
            // );
            // this.agreementaddElec(this.formData);
            this.agreementDocUpdate();
            this.$emit('handleSave', false);
          } else {
            this.$message({
              message: '已存在相同文件，不需要重复上传',
              type: 'warning'
              // onClose: () => {
              //   this.$emit('handleSave', false);
              //   commonFun.restData(this.formData);
              //   this.fileList = [];
              // }
            });
          }
        }
      });
    },
    // 弹框的品类
    dialogLuaFormDataapplianceTypeChange(val) {
      this.formData.sn8 = '';
      if (val) {
        this.getSn8Select({ id: val });
      } else {
        this.sn8Opts = [];
      }
    },
    // 图片上传
    uploadImgApi(item) {
      // 传入参数uploadFile是后端需要的健
      let param = { uploadFile: item.file };
      this.getUpAddHardware(param);
    },
    // 上传的接口
    async getUpAddHardware(param) {
      try {
        await this.$store.dispatch('imgDoUpLoad', param).then(result => {
          if (result.code === 0) {
            // this.upImgSrc = result.result;
            this.formData.url = result.result.url;
            this.formData.fileOrginalName = result.result.originalFileName;
            this.$message({
              message: result.message,
              type: 'success'
            });
          }
        });
      } catch (e) {}
    },
    handleCancel() {
      this.$emit('close', false);
      commonFun.restData(this.formData);
      this.fileList = [];
    },
    // 编辑电控协议
    async agreementDocUpdate() {
      this.formData.applianceType = commonFun.fetchWord(
        this.formData.applianceTypeId,
        'id',
        this.applianceTypeOpts,
        'type'
      );
      let params = {
        ...this.formData,
        id: this.formData.id,
        departmentId:
          this.$store.getters.userInfo.departmentId ||
          JSON.parse(localStorage.getItem('userInfo')).departmentId,
        applianceType: this.formData.applianceType,
        applianceTypeId: this.formData.applianceTypeId,
        sn8: this.formData.sn8,
        fileOrginalName: this.formData.fileOrginalName,
        version: this.formData.version,
        muid:
          this.$store.getters.userInfo.uid ||
          JSON.parse(localStorage.getItem('userInfo')).uid,
        luaDocUrl: this.formData.url
      };
      docUpdate(params).then(res => {
        if (res.code === 0) {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'success',
            onClose: () => {}
          });
          console.log(res);
        }
      });
    },
    // 查询电控协议详情
    getElDoc() {
      let params = {
        id: this.editDataId
      };
      getElecDoc(params).then(res => {
        if (res.code === 0) {
          this.formData.id = res.result.id;
          this.formData.applianceType = res.result.applianceType;
          this.formData.applianceTypeId = res.result.applianceTypeId;
          this.formData.sn8 = res.result.sn8;
          this.formData.url = res.result.url;
          if (res.result.url) {
            this.fileList.splice(0, 1, {
              name: res.result.fileOrginalName,
              url: res.result.url
            });
          }
          this.formData.version = res.result.version;
          this.formData.fileOrginalName = res.result.fileOrginalName;

          //
          this.oldSn8 = res.result.sn8;
          this.oldApplianceTypeId = res.result.applianceTypeId;
          this.oldVersion = res.result.version;
        }
      });
    },
    handleSave() {
      if (!commonFun.doSubmit('elec-form', this)) return;
      if (
        this.oldApplianceTypeId === this.formData.applianceTypeId &&
        this.oldSn8 === this.formData.sn8 && this.oldVersion === this.formData.version
      ) {
        this.agreementDocUpdate();
        this.$emit('handleSave', false);
      } else {
        this.goCheckDoc();
      }

      // this.agreementDocUpdate();
      // this.$emit('handleSave', false);
      // commonFun.restData(this.formData);
    },
    // 文件img上传前
    beforeUpload(file) {
      return (
        commonFun.extMatch(file, this.accept, this) &&
        commonFun.extMatchSize(file, 5, this)
      );
    },
    // 上传成功
    uploadSuccess(res, file, fileList) {
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
      this.fileList = fileList;
    },
    // 其他文件上传前
    succBeforeUpload(file) {
      // .rar .zip .doc .docx .exl
      const isFile =
        file.type === '.rar' || '.zip' || '.doc' || '.docx' || '.exl';
      // const isLt1M = file.size / 1024 / 1024 < 1;
      debugger;
      if (!isFile) {
        this.$message.error('上传文件只能是文件!');
      }
      console.log(file);
      return isFile;
      // return true;
    },
    // 上传成功
    succUploadSuccess(res, file, fileList) {
      this.succfileList = fileList;
    },
    // 上传失败
    succUploadError(err, file, fileList) {
      if (err) {
        this.$message({
          showClose: true,
          message: '文件上传失败',
          type: 'error'
        });
      }
    },
    // 移除文件时
    succUploadRemove(file, fileList) {
      this.succfileList = fileList;
    }
  }
};
</script>
<style lang="less" scoped>
.dialog-footer{
  text-align: right;
}
@deep: ~'>>>';
.elec-upload{
  @{deep} .el-upload-dragger{
    width: 412px;
  }
}
</style>
