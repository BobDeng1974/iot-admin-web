<template>
  <div>
    <div class="dialog-body">
      <el-form ref="form" :model="formData" :rules="luaFormRules" label-width="128px">
        <el-form-item label="状态" prop="status">
          <el-input v-model.trim="formData.status"></el-input>
        </el-form-item>
        <el-form-item label="SDK名称" prop="name">
          <el-input v-model.trim="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="版本号" prop="version">
          <el-input v-model.trim="formData.version"></el-input>
        </el-form-item>
        <el-form-item label="芯片信息" prop="chip">
          <el-select v-model.trim="formData.chip" clearable style="width:100%">
            <el-option v-for="(item, index) in useInfoList" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="编译工具链" prop="tool">
          <el-input v-model.trim="formData.tool"></el-input>
        </el-form-item>
        <el-form-item label="SDK文件" prop="fileSdkPackage">
          <el-input type="hidden" style="display:none" v-model="formData.fileSdkPackage"></el-input>
          <div class="upload-wrapper addlua-upload">
            <div class="upload-btn">
              <el-upload class="upload-demo"
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
        <el-form-item label="测试报告" prop="fileReport">
          <el-input type="hidden" style="display:none" v-model="formData.fileReport"></el-input>
          <div class="upload-wrapper addlua-upload">
            <div class="upload-btn">
              <el-upload class="upload-demo"
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
        <el-form-item label="功能说明" prop="desc">
          <el-input type="textarea" v-model.trim="formData.desc"></el-input>
        </el-form-item>
        <el-form-item label="发布周知人" prop="noticeMipAccounts">
          <el-input type="textarea" placeholder="请输入发布人的mip账号以;分割" v-model.trim="formData.noticeMipAccounts"></el-input>
        </el-form-item>
        <el-form-item label="提交人" prop="publisherName">
          <el-input  v-model.trim="formData.publisherName"></el-input>
        </el-form-item>
        <el-form-item label="生效时间" prop="activeTime">
          <el-input  v-model.trim="formData.activeTime"></el-input>
        </el-form-item>
        <el-form-item label="审核人" prop="auditorName">
          <el-input  v-model.trim="formData.auditorName"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="dialog-footer">
      <el-button type="primary" @click="handleSave">审核失败</el-button>
      <el-button @click="handleCancel">审核通过</el-button>
    </div>
  </div>


</template>
<script>
import commonFun from '@/common/js/func';
export default {
  data() {
    return {
      // 上传的参数开始
      accept: '.lua',
      fileList: [],
      reportAccept: '.xlsx, .xls ,.doc ,.docx',
      fileReportList: [],
      // 上传的参数结束
      formData: {
        status: '',
        name: '',
        version: '',
        chip: '',
        tool: '',
        fileSdkPackage: '',
        fileReport: '',
        desc: '',
        noticeMipAccounts: '',
        publisherName: '',
        activeTime: '',
        auditorName: ''
      },
      useInfoList: [
          {id: 1, name: '1'}
      ],
      luaFormRules: {
        status: {required: true, message: '请输入', trigger: 'blur'},
        name: {required: true, message: '请输入', trigger: 'blur'},
        version: {required: true, message: '请输入', trigger: 'blur'},
        chip: {required: true, message: '请选择', trigger: 'change'},
        tool: {required: true, message: '请输入', trigger: 'blur'},
        fileSdkPackage: {required: true, message: '请上传SDK文件', trigger: 'blur'},
        fileReport: {required: true, message: '请上传测试报告文件', trigger: 'blur'},
        desc: {required: true, message: '请输入', trigger: 'change'},
        noticeMipAccounts: {required: true, message: '请输入', trigger: 'blur'}
      }
    };
  },
  methods: {
    handleCancel() {
      this.$emit('close', false);
    },
    handleSave() {
      if (!commonFun.doSubmit('form', this)) return;
      this.$emit('close', false);
    },
    // sdk上传调用的接口开始
    uploadImgApi(item) {
      // let param = { uploadFile: item.file };
      // this.getUpAddHardware(param);
    },
    beforeUpload(file) {
      return (
        commonFun.extMatch(file, this.accept, this) &&
        commonFun.extMatchSize(file, 5, this)
      );
    },
    // 上传成功
    uploadSuccess(res, file, fileList) {
      this.fileSdkPackage = '';
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
    // sdk上传调用的接口
    // 测试报告上传调用的接口开始
    uploadImgReportApi(item) {
      // let param = { uploadFile: item.file };
      // this.getUpAddHardware(param);
    },
    reportBeforeUpload(file) {
      return (
        commonFun.extMatch(file, this.reportAccept, this) &&
        commonFun.extMatchSize(file, 5, this)
      );
    },
    // 上传成功
    reportUploadSuccess(res, file, fileList) {
      this.fileReport = '';
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
      this.fileReportList = fileList;
    }
    // 测试报告上传调用的接口
  }
};
</script>
<style lang="less" scoped>
@import "./moduleSDKManagement.less";

</style>

