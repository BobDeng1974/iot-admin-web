<template>
  <div>
    <el-form id="add-sdkdoc-form">
      <el-form-item>
        <select v-model="sdkType">
          <option v-for="item in options" :key="item.value" :value="item.value">{{item.label}}</option>
        </select>
      </el-form-item>
      <el-form-item>
        <el-input type="text" v-model="title" placeholder="sdk标题"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <form id="upload-icon" enctype="multipart/form-data" method="post" @submit.prevent="uploadIcon($event)">
          <span><input type="file" name="uploadFile" /></span>
          <span>
            <button class="up-button">上传</button>
          </span>
        </form>
      </el-form-item>
      <el-form-item label="sdk文件">
        <form id="upload-sdk" enctype="multipart/form-data" method="post" @submit.prevent="uploadSdk($event)">
          <span><input type="file" name="uploadFile" /></span>
          <span>
            <button class="up-button">上传</button>
          </span>
        </form>
      </el-form-item>
      <el-form-item>
        <el-input type="text" v-model="docLink" placeholder="文档地址"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.prevent="submitSdkDoc()">保存</el-button>
        <el-button @click.prevent="canelSdkDoc()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
  import { getToken } from "@/utils/auth";
  import "../documentManagement/static/js/zTree/jquery-3.3.1.min";
  import request from "@/utils/http";
  const { APPLICATION_NAME } = window.environment.iotserver;
  export default {
    data() {
      return {
        apiRootPath: `${APPLICATION_NAME}/sdkdown/`,
        accessToken: getToken(),
        options: [
          {
            value: "1",
            label: "硬件sdk"
          },
          {
            value: "2",
            label: "软件sdk"
          }
        ],
        uploadActionUrl: `${APPLICATION_NAME}/fileUpload/doUpload`,
        iconFileUrl: "",
        sdkFileUrl: "",
        docLink: "",
        sdkType: 1,
        title: ""
      };
    },
    methods: {
      uploadIcon(event) {
        var that = this;
        let formData = new FormData(event.target);
        var options = {
          url: this.uploadActionUrl + "?accessToken=" + this.accessToken,
          method: "POST",
          processData: false,
          contentType: false,
          crossDomain: true,
          data: formData,
          success: function(response) {
            if (response.code == 0) {
              that.iconFileUrl = response.result;
            }
          }
        };
        $.ajax(options);
      },
      uploadSdk(event) {
        var that = this;
        let formData = new FormData(event.target);
        var options = {
          url: this.uploadActionUrl + "?accessToken=" + this.accessToken,
          method: "POST",
          processData: false,
          contentType: false,
          crossDomain: true,
          data: formData,
          success: function(response) {
            if (response.code == 0) {
              that.sdkFileUrl = response.result;
            }
          }
        };
        $.ajax(options);
      },
      submitSdkDoc() {
        let that = this;
        request({
          url: that.apiRootPath + "addSdkDoc",
          method: "POST",
          data: {
            title: $.trim(that.title),
            docLink: $.trim(that.docLink),
            sdkType: that.sdkType,
            icon: that.iconFileUrl,
            sdkUrl: that.sdkFileUrl
          }
        }).then(response => {
          if (response.code == 0) {
            that.$router.push({ path: "downSdkManagement" });
          }
        });
      },
      canelSdkDoc() {
        this.$router.push({ path: "downSdkManagement" });
      }
    }
  };
</script>
<style scoped>
  .up-button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border-color: #dcdfe6;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    transition: 0.1s;
    font-weight: 500;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    font-size: 14px;
    border-radius: 20px;
    padding: 12px 23px;
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
  }
</style>


