<template>
  <div>
    <div class="dialog-body">
      <el-form
        ref="elec-form"
        :model="formData"
        :rules="elecFormRules"
        label-width="128px"
      >
        <el-form-item
          label="品类"
          prop="applianceTypeId"
        >
          <el-select
            @change="dialogLuaFormDataapplianceTypeChange"
            v-model="formData.applianceTypeId"
            style="width: 100%;"
          >
            <el-option
              v-for="item in applianceTypeOpts"
              :key="item.id"
              :label="item.nameZh"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="型号码" prop="sn8">
          <el-input v-model.trim="formData.sn8"></el-input>
        </el-form-item> -->
        <el-form-item
          label="型号码"
          prop="sn8"
        >
          <el-select
            v-model.trim="formData.sn8"
            clearable
            style="width: 100%;"
          >
            <el-option
              v-for="item  in sn8Opts"
              :key="item.id"
              :value="item.sn8"
              :label="item.sn8"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="上传电控文件"
          prop="url"
        >
          <div class="upload-wrapper elec-upload">
            <div class="upload-btn">
              <el-upload
                class="upload-demo"
                :accept="accept"
                :http-request="uploadImgApi"
                drag
                :action="'dddd'"
                multiple
                :limit="1"
                :file-list="fileList"
                :before-upload="beforeUpload"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                :on-remove="uploadRemove"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">点击或将文件拖拽到这里上传或<em>点击上传</em></div>
                <div
                  class="el-upload__tip"
                  slot="tip"
                >支持扩展名：xlsx、xls、doc、docx，且不超过5M</div>
              </el-upload>
              <!-- <el-upload drag :accept="accept" class="upload-demo" :http-request="uploadImgApi" :action="'dddd'" multiple :limit="1" :file-list="fileList" :before-upload="beforeUpload" :on-success="uploadSuccess" :on-error="uploadError" :on-remove="uploadRemove">
                <el-button class="icon-btn" size="small" type="primary"><i class="icon-upload"></i>上传</el-button>
                <span slot="tip" class="upload-tip">支持扩展名：.rar .zip .doc .docx .exl</span>
              </el-upload> -->
              <input
                type="hidden"
                v-model.trim="formData.url"
              />
            </div>
          </div>
        </el-form-item>

        <el-form-item
          label="版本"
          prop="version"
        >
          <el-input v-model="formData.version"></el-input>
        </el-form-item>
        <el-form-item>
          <div
            class="dialog-footer"
          >
            <el-button
              type="primary"
              @click="handleSave"
            >保存</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <!-- <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleSave">保存</el-button>
    </div> -->
  </div>
</template>
<script>
import { dropDownTranslation } from '@/common/js/dropDownTranslation';
import commonFun from '@/common/js/func';
import { checkDoc } from '../../../api/myAgreement/index';
export default {
  mixins: [dropDownTranslation],
  created() {
    this.getApplianSelect();
  },
  data() {
    return {
      accept: '.xlsx, .xls ,.doc ,.docx',
      fileList: [],
      formData: {
        departmentId:
          this.$store.getters.userInfo.departmentId ||
          JSON.parse(localStorage.getItem('userInfo')).departmentId,
        // groupName: '',
        applianceType: '',
        applianceTypeId: '',
        // childType: '',
        // name: '',
        sn8: '',
        url: '',
        // docSize: '',
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
      }
    };
  },
  methods: {
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
            debugger;
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
    // 新增电控协议
    async agreementaddElec(params) {
      debugger;
      await this.$store.dispatch('addDoc', params).then(result => {
        if (result.code === 0) {
          this.$message({
            showClose: true,
            message: '新增成功',
            type: 'success',
            onClose: () => {
              this.$emit('handleSave', false);
              commonFun.restData(this.formData);
              this.fileList = [];
            }
          });
        }
      });
    },
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
            this.formData.applianceType = commonFun.fetchWord(
              this.formData.applianceTypeId,
              'id',
              this.applianceTypeOpts,
              'type'
            );
            this.agreementaddElec(this.formData);
          } else {
            this.$message({
              message: '已存在相同文件，不需要重复上传',
              type: 'warning',
              onClose: () => {
                this.$emit('handleSave', false);
                commonFun.restData(this.formData);
                this.fileList = [];
              }
            });
          }
        }
      });
    },
    handleSave() {
      if (!commonFun.doSubmit('elec-form', this)) return;
      this.goCheckDoc();
      debugger;
      // if (!commonFun.doSubmit('elec-form', this)) return;
      // this.formData.applianceType = commonFun.fetchWord(
      //   this.formData.applianceTypeId,
      //   'id',
      //   this.applianceTypeOpts,
      //   'type'
      // );
      // this.agreementaddElec(this.formData);
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
    }
  }
};
</script>
<style lang="less" scoped>
.dialog-footer {
  text-align: right;
}
@deep: ~'>>>';
.elec-upload{
  @{deep} .el-upload-dragger{
    width: 412px;
  }
}
</style>
