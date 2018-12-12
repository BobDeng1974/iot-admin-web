<template>
  <div class="page-container">
    <div class="page-main-con">
      <con-header :titleIcon="titleIcon1" title="企业认证"></con-header>
      <div class="page-form-wrapper">
        <div>
          <h3 class="form-title">方式1&nbsp;&nbsp;&nbsp;&nbsp;美的内部用户mip账户认证</h3>
          <el-form class="page-form" ref="mipForm" :model="mipFormData" :rules="mipFormRules" label-width="150px">
            <el-form-item label="mip账户" prop="mip">
              <el-input v-model.trim="mipFormData.mip"></el-input>
            </el-form-item>

            <el-form-item label="真实名字" prop="realName">
              <el-input v-model.trim="mipFormData.realName"></el-input>
            </el-form-item>

            <el-form-item label="事业部" prop="departmentName">
              <el-select @focus="getDepartmentAll" @change="departmentNameChange" v-model="mipFormData.departmentName" clearable placeholder="请选择事业部">
                <el-option v-for="(item,index) in departmentNameOptions" :key="index" :label="item.name" :value="item">{{item.name}}
                </el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="mip密码" prop="password">
              <el-input v-model.trim="mipFormData.password" type="password"></el-input>
            </el-form-item> -->
            <el-form-item class="tool" ref="mipUpImg" prop="mipAuditUrl" label="上传mip用户截图">

              <div class="upload-wrapper">
                <div class="upload-btn">
                  <el-upload class="upload-demo" :accept="accept" :http-request="uploadImgApi" drag :action="'dddd'" multiple :limit="1" :file-list="fileList" :before-upload="beforeUpload" :on-success="uploadSuccess" :on-error="uploadError" :on-remove="uploadRemove">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">点击或将文件拖拽到这里上传或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">支持扩展名：.jpeg,.gif,.png,.jpg，且不超过5M</div>
                  </el-upload>
                  <!-- <el-upload :accept="accept" class="upload-demo" :action="'succPicAction'" :http-request="uploadImgApi" multiple :limit="1" :file-list="fileList" :before-upload="beforeUpload" :on-success="uploadSuccess" :on-error="uploadError" :on-remove="uploadRemove">
                    <el-button class="icon-btn" size="small" type="primary"><i class="icon-upload"></i>上传</el-button>
                    <span slot="tip" class="upload-tip">支持扩展名：.jpeg .gif .png</span>
                  </el-upload> -->
                </div>
              </div>
              <!-- <el-select v-if="false" v-model="mipFormData.mipAuditUrl">
              </el-select> -->
              <el-input v-if="false" v-model="mipFormData.mipAuditUrl"></el-input>
              <!-- <div class="upimg">
            <img :src="upImgSrc" alt="" v-if="upImgSrc">
          </div> -->
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" @click="submitMipAuth">提交认证</el-button>
            </el-form-item>
          </el-form>
        </div>

        <!-- <div>
          <h3 class="form-title">方式2&nbsp;&nbsp;&nbsp;&nbsp;非美的用户请填写以下信息</h3>
          <el-form class="page-form" ref="unMipForm" :model="unMipFormData" label-width="150px">
            <el-form-item label="企业名称">
              <el-input v-model.trim="unMipFormData.enterpriseName"></el-input>
            </el-form-item>

            <el-form-item label="企业官网">
              <el-input v-model.trim="unMipFormData.enterpriseUrl"></el-input>
            </el-form-item>

            <el-form-item label="主营业务描述">
              <el-input type="textarea" rows="4" v-model.trim="unMipFormData.mainBusinessDesc"></el-input>
            </el-form-item>

            <el-form-item label="业务对接人">
              <el-input v-model.trim="unMipFormData.businessPerson"></el-input>
            </el-form-item>

            <el-form-item label="电话号码">
              <el-input v-model.trim="unMipFormData.phoneNum"></el-input>
            </el-form-item>

            <el-form-item class="upload-item" label="上传营业执照">
              <el-row type="flex" :gutter="10">
                <el-col :span="8">
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess1"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
                    <div v-else class="upload-icon">
                      <i class="el-icon-plus avatar-uploader-icon"></i>
                      <p>上传营业执照</p>
                    </div>
                  </el-upload>
                </el-col>
                <el-col :span="8">
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess2"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
                    <div v-else class="upload-icon">
                      <i class="el-icon-plus avatar-uploader-icon"></i>
                      <p>企业法人身份证(正面)</p>
                    </div>
                  </el-upload>
                </el-col>
                <el-col :span="8">
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess3"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl3" :src="imageUrl3" class="avatar">
                    <div v-else class="upload-icon">
                      <i class="el-icon-plus avatar-uploader-icon"></i>
                      <p>企业法人身份证(反面)</p>
                    </div>
                  </el-upload>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item label="信用号码">
              <el-input v-model.trim="unMipFormData.creditNumber"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" size="medium">提交认证</el-button>
            </el-form-item>
          </el-form>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import conHeader from '@/components/awesome/con-header/con-header';
// import { mipAuth } from '../../../api/developInfo/index';
// import CryptoJS from 'crypto-js';
import commonFun from '@/common/js/func';
import { authMethodMixin } from '@/common/js/validation';
export default {
  mixins: [authMethodMixin],
  data() {
    return {
      accept: '.jpeg,.gif,.png,.jpg',
      fileList: [],
      succfileList: [],
      titleIcon1: '/static/img/title_03@2x.png',
      mipFormData: {
        mip: '',
        realName: '',
        departmentName: '',
        mipAuditUrl: '',
        departmentId: ''
      },
      // unMipFormData: {
      //   enterpriseName: '',
      //   enterpriseUrl: '',
      //   mainBusinessDesc: '',
      //   businessPerson: '',
      //   phoneNum: '',
      //   uploadBusineeeLicense: '',
      //   creditNumber: ''
      // },
      departmentNameOptions: [],
      imageUrl1: '',
      imageUrl2: '',
      imageUrl3: '',
      mipFormRules: {
        mip: { required: true, validator: this.checkMip, trigger: 'blur' },
        password: [
          { required: true, message: '请输入mip密码', trigger: 'blur' }
        ],
        mipAuditUrl: [
          {
            required: true,
            message: '上传mip用户截图',
            trigger: 'change'
          }
        ],
        realName: [
          { required: true, message: '请输入真实名字', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '请输入事业部', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    departmentNameChange(value) {
      this.mipFormData.departmentId = value.id;
      this.mipFormData.departmentName = value.name;
    },
    async getDepartmentAll(param) {
      try {
        await this.$store.dispatch('departmentAll', param).then(result => {
          this.departmentNameOptions = result.result;
          // debugger;
        });
      } catch (e) {}
    },
    // 提交mip认证
    submitMipAuth() {
      let param = this.mipFormData;
      // debugger;
      this.$refs['mipForm'] &&
        this.$refs['mipForm'].validate(valid => {
          if (!valid) return;
          this.handleMipAuth(param);
        });
    },
    // 上传的接口
    async handleMipAuth(param) {
      try {
        await this.$store.dispatch('mipAdd', param).then(result => {
          // debugger;
          if (result.code === 0) {
            this.$message({
              message: '提交认证成功，请等待平台审核' || result.message,
              type: 'success',
              onClose: () => {
                this.$router.push({ name: 'AuthenInfo' });
              }
            });
          }
        });
      } catch (e) {}
    },
    // mip认证接口
    // handleMipAuth() {

    //   // let md5Psw = CryptoJS.MD5(this.mipFormData.password).toString();
    //   // let params = {
    //   //   mip: this.mipFormData.mip,
    //   //   password: md5Psw
    //   // };
    //   // mipAuth(params).then(res => {
    //   //   console.log(res);
    //   // });
    // },
    handleAvatarSuccess1(res, file) {
      this.imageUrl1 = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess2(res, file) {
      this.imageUrl2 = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess3(res, file) {
      this.imageUrl3 = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      // debugger;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    // 图片上传
    uploadImgApi(item) {
      // 传入参数uploadFile是后端需要的健
      let param = { uploadFile: item.file };
      this.getUpMipImg(param);
    },
    // 上传的接口
    async getUpMipImg(param) {
      try {
        await this.$store.dispatch('imgDoUpLoad', param).then(result => {
          if (result.code === 0) {
            // debugger;
            // this.upImgSrc = result.result;
            this.mipFormData.mipAuditUrl = result.result.url;
            this.mipFormData.name = result.result.originalFileName;
            this.$refs.mipUpImg.clearValidate();
            this.$message({
              message: result.message,
              type: 'success'
            });
          }
        });
      } catch (e) {}
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
      debugger;
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
      this.mipFormData.mipAuditUrl = '';
    }
  },
  components: {
    'con-header': conHeader
  }
};
</script>

<style lang="less" scoped>
@import './authMethod.less';
</style>
