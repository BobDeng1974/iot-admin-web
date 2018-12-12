<template>
  <div>
    <div class="dialog-body">
      <el-form :model="addSdkForm" :disabled="true" :rules="rules" ref="addSdk-form" label-width="128px">
        <el-form-item label="操作系统" prop="os">
          <el-select class="os-select" v-model="addSdkForm.os" clearable placeholder="请选择操作系统">
            <el-option v-for="(item,index) in OperatingSystemList" :key="index" :label="item.name" :value="item.id">
            </el-option>

          </el-select>
        </el-form-item>
        <el-form-item label="芯片CPU架构" prop="cpuArch">
          <el-select class="os-select" v-model="addSdkForm.cpuArch" clearable placeholder="请选择操作系统">
            <el-option v-for="(item,index) in cpuList" :key="index" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="芯片品牌" prop="brand">
          <el-select class="os-select" v-model="addSdkForm.brand" clearable placeholder="请选择芯片品牌">
            <el-option v-for="(item,index) in chipBrandList" :key="index" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="芯片型号" prop="model">
          <el-select class="os-select" v-model="addSdkForm.model" clearable placeholder="请选择芯片型号">
            <el-option v-for="(item,index) in chipModelList" :key="index" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="" class="tool" label="芯片交叉编译工具包地址" prop="tool">
          <el-input v-model="addSdkForm.tool"></el-input>
        </el-form-item>
        <el-form-item label="定制化编译参数" prop="param">
          <el-input v-model="addSdkForm.param"></el-input>
        </el-form-item>

        <el-form-item class="tool" label="定制化成功示例截图">
          <div class="upload-wrapper">
            <div class="upload-btn">
              <el-upload accept="image/jpeg,image/gif,image/png" class="upload-demo" :action="'succPicAction'" :http-request="uploadImgApi" multiple :limit="1" :file-list="fileList" :before-upload="beforeUpload" :on-success="uploadSuccess" :on-error="uploadError" :on-remove="uploadRemove">
                <el-button class="icon-btn" size="small" type="primary"><i class="icon-upload"></i>上传</el-button>
                <span slot="tip" class="upload-tip">支持扩展名：.jpeg .gif .png</span>
              </el-upload>
            </div>
          </div>
          <div v-if="addSdkForm.succPic" style="width:100%;height:180px"><img style="width:70%;height:180px" :src="addSdkForm.succPic" alt=""></div>
        </el-form-item>
        <el-form-item class="tool" label="其他芯片资料">
          <div class="upload-wrapper">
            <div class="upload-btn">
              <el-upload accept=".rar, .zip ,.doc ,.docx, .exl" class="upload-demo" :action="'succAction'" :http-request="uploadFileApi" multiple :limit="1" :file-list="succfileList" :before-upload="succBeforeUpload" :on-success="succUploadSuccess" :on-error="succUploadError" :on-remove="succUploadRemove" :on-preview="downLoad">
                <el-button class="icon-btn" size="small" type="primary"><i class="icon-upload"></i>上传</el-button>
                <span slot="tip" class="upload-tip">支持扩展名：.rar .zip .doc .docx .xls .xlsx</span>
              </el-upload>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="功能说明" prop="discription">
          <el-input type="textarea" v-model="addSdkForm.discription"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <!-- <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleSave">确 定</el-button>
    </div> -->
  </div>
</template>
<script>
import { dropDownTranslation } from '@/common/js/dropDownTranslation';
import commonFun from '@/common/js/func';
import { downloadOtherInfo } from '@/modules/index/api/myAgreement/index';
export default {
  props: {
    dialogData: {
      type: Object,
      default: () => ({})
    }
  },
  mixins: [dropDownTranslation],
  created() {
    this.getCpuJson();
    this.getChipBrandJson();
    this.getChipModelJson();
    this.getOperatingSystem();
  },
  data() {
    return {
      addSdkForm: {
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
            message: '请选择芯片交叉编译工具包地址',
            trigger: 'blur'
          }
        ],
        param: [
          {
            required: true,
            message: '定制化编译参数',
            trigger: 'blur'
          }
        ],
        discription: [
          {
            required: true,
            message: '功能说明',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  mounted() {
    this.getWifiSdkLib(this.dialogData);
  },
  methods: {
    // 下载
    downLoad (file) {
      downloadOtherInfo({ids: this.dialogData.id})
      .then(response => {
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
    },
    // 详情
    async getWifiSdkLib(param) {
      try {
        await this.$store.dispatch('getWifiSdkLib', param).then(result => {
          console.log('回显数据');
          console.log(result.result);
          if (result.code === 0) {
            this.addSdkForm = result.result;
            this.addSdkForm.cpuArch = result.result.cpuArch;
            this.addSdkForm.brand = result.result.brand;
            this.addSdkForm.succPic = result.result.succPic;
            // debugger;
            if (result.result.succPic) {
              this.fileList.splice(0, 1, {
                name: result.result.picFileOrginalName,
                url: result.result.succPic
              });
            }
            this.addSdkForm.doc = result.result.doc;
            if (result.result.doc) {
              this.succfileList.splice(0, 1, {
                name: result.result.docFileOrginalName,
                url: result.result.doc
              });
            }
            console.log(result.result);
          }
        });
      } catch (e) {}
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
            this.addSdkForm.succPic = result.result;
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
            this.addSdkForm.doc = result.result;

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
      // commonFun.restData(this.addSdkForm);
    },
    handleSave() {
      if (!commonFun.doSubmit('addSdk-form', this)) return;
      // this.$emit('handleSave', { data: this.addSdkForm, isShow: false });
    },
    // 文件img上传前
    beforeUpload(file) {
      const isIMAGE =
        file.type === 'image/jpeg' || 'image/gif' || 'image/png' || '';
      debugger;
      if (!isIMAGE) {
        this.$message.error('上传文件只能是图片格式!');
      }
      return isIMAGE;
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
.padding0 {
  padding-left: 0px;
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
