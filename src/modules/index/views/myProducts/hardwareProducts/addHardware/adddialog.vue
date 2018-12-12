<template>
  <div>
    <div class="dialog-body">
      <el-form :model="addSdkForm" :rules="rules" ref="addSdk-form" label-width="190px">
        <el-form-item label="操作系统" prop="os">
          <el-select class="os-select" v-model.trim="addSdkForm.os" clearable placeholder="请选择操作系统">
            <el-option v-for="(item,index) in OperatingSystemList" :key="index" :label="item.name" :value="item.id">
            </el-option>

          </el-select>
        </el-form-item>
        <el-form-item label="芯片CPU架构" prop="cpuArch">
          <el-select class="os-select" v-model.trim="addSdkForm.cpuArch" clearable placeholder="请选择操作系统">
            <el-option v-for="(item,index) in cpuList" :key="index" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="芯片品牌" prop="brand">
          <el-select class="os-select" v-model.trim="addSdkForm.brand" clearable placeholder="请选择芯片品牌">
            <el-option v-for="(item,index) in chipBrandList" :key="index" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
          <!-- <el-input style="width:50%"></el-input> -->
        </el-form-item>
        <el-form-item label="芯片型号" prop="model">
          <el-select class="os-select" v-model.trim="addSdkForm.model" clearable placeholder="请选择芯片型号">
            <el-option v-for="(item,index) in chipModelList" :key="index" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="" class="tool" label="芯片交叉编译工具包地址" prop="tool">
          <el-input v-model.trim="addSdkForm.tool"></el-input>
        </el-form-item>
        <el-form-item label="定制化编译参数" prop="param">
          <el-input v-model.trim="addSdkForm.param"></el-input>
        </el-form-item>

        <el-form-item class="tool" style="display: block;" label="定制化成功示例截图">
          <div class="upload-wrapper">
            <div class="upload-btn">
              <el-upload :accept="accept" class="upload-demo" :action="'succPicAction'" :http-request="uploadImgApi" multiple :limit="1" :file-list="fileList" :before-upload="beforeUpload" :on-success="uploadSuccess" :on-error="uploadError" :on-remove="uploadRemove">
                <el-button class="icon-btn" size="small" type="primary"><i class="icon-upload"></i>上传</el-button>
                <span slot="tip" class="upload-tip">支持扩展名：.jpeg .gif .png</span>
              </el-upload>
            </div>
            <div v-if="addSdkForm.succPic" style="width:100%;height:180px"><img style="width:70%;height:180px" :src="addSdkForm.succPic" alt=""></div>
          </div>
        </el-form-item>
        <el-form-item class="tool" label="其他芯片资料">
          <div class="upload-wrapper">
            <div class="upload-btn">
              <el-upload :accept="succAccept" class="upload-demo" :action="'succAction'" :http-request="uploadFileApi" multiple :limit="1" :file-list="succfileList" :before-upload="succBeforeUpload" :on-success="succUploadSuccess" :on-error="succUploadError" :on-remove="succUploadRemove">
                <el-button class="icon-btn" size="small" type="primary"><i class="icon-upload"></i>上传</el-button>
                <span slot="tip" class="upload-tip">支持扩展名：.rar .zip .doc .docx .xls .xlsx</span>
              </el-upload>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="功能说明" prop="discription">
          <el-input type="textarea" v-model.trim="addSdkForm.discription"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleSave">确 定</el-button>
    </div>
  </div>
</template>
<script>
import { dropDownTranslation } from '@/common/js/dropDownTranslation';
import commonFun from '@/common/js/func';
import { productsMixin } from '@/common/js/validation';
export default {
  props: {
    flag: {
      type: Boolean
    }
  },
    watch: {
    flag: {
      handler(nowVal, oldVal) {
        if (nowVal === true) {
          // this.getElDoc();
          // commonFun.restData(this.addSdkForm);
        }
      },
      deep: true,
      immediate: true
    }
  },
  mixins: [dropDownTranslation, productsMixin],
  created() {
    this.getCpuJson();
    this.getChipBrandJson();
    this.getChipModelJson();
    this.getOperatingSystem();
  },
  data() {
    return {
      accept: '.jpeg,.gif,.png,.jpg',
      succAccept: '.rar, .zip ,.doc ,.docx, .xls, .xlsx',
      // upImgSrc: '',
      addSdkForm: {
        // name: '',
        os: '',
        osValue: '',
        cpuArch: '',
        cpuArchValue: '',
        brand: '',
        brandValue: '',
        modelValue: '',
        model: '',
        tool: '',
        param: '',
        succPic: '',
        doc: '',
        discription: ''
      },
      fileList: [],
      succfileList: [],
      rules: {
        os: [{ required: true, message: '请选择操作系统', trigger: 'change' }],
        cpuArch: [
          { required: true, message: '请选择芯片CPU架构', trigger: 'change' }
        ],
        brand: [
          { required: true, message: '请选择芯片品牌', trigger: 'change' }
        ],
        model: [
          { required: true, message: '请选择芯片型号', trigger: 'change' }
        ],
        tool: [
          {
            required: true,
            // message: '请输入芯片交叉编译工具包地址',
            validator: this.productTool,
            trigger: 'blur'
          }
        ],
        param: [
          {
            required: true,
            // message: '请输入定制化编译参数',
            validator: this.productParam,
            trigger: 'blur'
          }
        ],
        discription: [
          {
            required: true,
            // message: '请输入功能说明',
            validator: this.productDiscription,
            trigger: 'blur'
          }
        ]
      }
    };
  },
  methods: {
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
            this.addSdkForm.succPic = result.result.url;

            this.addSdkForm.picFileOrginalName = result.result.originalFileName;
            this.$message({
              message: result.message,
              type: 'success'
            });
          }
        });
      } catch (e) {}
    },
    // 文件上传
    uploadFileApi(item) {
      // 传入参数uploadFile是后端需要的健
      let param = { uploadFile: item.file };
      this.getUploadFileApi(param);
    },
    // 上传的接口
    async getUploadFileApi(param) {
      try {
        await this.$store.dispatch('imgDoUpLoad', param).then(result => {
          debugger;
          if (result.code === 0) {
            this.addSdkForm.doc = result.result.url;

            this.addSdkForm.docFileOrginalName = result.result.originalFileName;
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
      commonFun.restData(this.addSdkForm);
    },
    handleSave() {
      if (!commonFun.doSubmit('addSdk-form', this)) return;
      this.$emit('handleSave', { data: this.addSdkForm, isShow: false });
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
      this.addSdkForm.succPic = '';
    },
    // 其他文件上传前
    succBeforeUpload(file) {
      return (
        commonFun.extMatch(file, this.succAccept, this) &&
        commonFun.extMatchSize(file, 5, this)
      );
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
.upload-wrapper{
  width: 100%;
}
.upimg {
  width: 50px;
  height: 50px;
}
.os-select {
  width: 100%;
}
@deep: ~'>>>';
.tool {
  @{deep} .el-form-item__label {
    line-height: inherit;
  }
}
.upload-tip {
  margin-left: 16px;
  font-size: 14px;
  color: #999;
}
.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>
