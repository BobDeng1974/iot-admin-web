<template>
  <div class="documentManagement-warp">
    <el-form method="POST">
      <el-form-item label="文档类型">
        <select v-if="pid>0" disabled name="sdkType" v-model="docType">
          <option v-for="item in options" :key="item.value" :value="item.value">{{item.label}}</option>
        </select>
        <select v-else name="sdkType" v-model="docType">
          <option v-for="item in options" :key="item.value" :value="item.value">{{item.label}}</option>
        </select>
      </el-form-item>
      <el-form-item>
        <el-input type="text" v-model="menuTitle" placeholder="文档标题" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <textarea id="content" name="content" autocomplete="off"></textarea>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="submitDisabled" @click.prevent="addDoc()">提交</el-button>
        <el-button @click.prevent="canelDoc()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { getToken } from "@/utils/auth";
  import "./static/js/zTree/jquery-3.3.1.min";
  import "./static/js/kindeditor/kindeditor-all";
  import "./static/js/kindeditor/themes/default/default.css";
  import request from "@/utils/http";
  const { APPLICATION_NAME, MJAPP_NAME } = window.environment.iotserver;
  export default {
    data() {
      return {
        apiRootPth: `${MJAPP_NAME}/`,
        menuTitle: "",
        docType: 1,
        editor: null,
        pid: 0,
        options: [
          {
            value: "1",
            label: "普通文档"
          },
          {
            value: "2",
            label: "sdk"
          }
        ],
        submitDisabled: false
      };
    },
    mounted() {
      this.getDocType();
      this.loadEditor();
    },
    methods: {
      loadEditor() {
        let that = this;
        let uploadUrl = that.apiRootPth + "fileUpload/editUpload";
        let options = {
          basePath: "./static/js/kindeditor/",
          uploadJson: uploadUrl,
          allowFileManager: false,
          width: "700px",
          height: "500px",
          extraFileUploadParams: {
            accessToken: getToken()
          },
          filePostName: "uploadFile"
        };
        //$.getScript("./static/js/kindeditor/kindeditor-all.js", function() {
        that.editor = KindEditor.create("#content", options);
        //});
      },
      addDoc() {
        this.submitDisabled = true;
        this.editor.sync();
        let that = this;
        request({
          url: that.apiRootPth + "doc/addOrUpdate",
          method: "POST",
          data: {
            menuTitle: $.trim(that.menuTitle),
            content: that.editor.html(),
            mid: sessionStorage.getItem("mid"),
            pid: sessionStorage.getItem("pid"),
            docType: that.docType
          }
        }).then(response => {
          if (response.code == 0) {
            that.$router.push({ path: "documentManagement" });
          } else {
            that.submitDisabled = false;
          }
        });
      },
      canelDoc() {
        this.$router.push({ path: "documentManagement" });
      },
      getDocType() {
        this.pid = sessionStorage.getItem("pid");
        if (sessionStorage.getItem("pid") > 0) {
          let that = this;
          request({
            url: that.apiRootPth + "doc/getDocByPid",
            method: "POST",
            data: {
              pid: sessionStorage.getItem("pid")
            }
          }).then(response => {
            if (response.code == 0) {
              that.docType = response.result.docType;
            }
          });
        }
      }
    }
  };
</script>
<style scoped>
</style>

