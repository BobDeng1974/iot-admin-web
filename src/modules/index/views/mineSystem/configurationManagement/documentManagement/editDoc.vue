<template>
  <div class="documentManagement-warp">
    <el-form method="POST">
      <el-form-item label="文档类型">
        <select v-model="docType">
          <option
            disabled
            v-for="item in options"
            :key="item.value"
            :value="item.value"
          >{{item.label}}</option>
        </select>
      </el-form-item>
      <el-form-item>
        <el-input type="text" v-model="menuTitle" placeholder="文档标题" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="textarea" id="content" name="content" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click.prevent="updateDoc()">提交</el-button>
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
  const { APPLICATION_NAME } = window.environment.iotserver.MJAPP_NAME;
  export default {
    data() {
      return {
        apiRootPath: `${APPLICATION_NAME}/`,
        menuTitle: "",
        docType: 1,
        editor: null,
        pid: 0,
        docDetail: null,
        options: [
          {
            value: "1",
            label: "普通文档"
          },
          {
            value: "2",
            label: "sdk"
          }
        ]
      };
    },
    mounted() {
      this.loadEditor();
    },
    methods: {
      loadEditor() {
        let that = this;
        let uploadUrl = this.apiRootPath + "fileUpload/editUpload";
        let options = {
          basePath: "./static/js/kindeditor/",
          uploadJson: uploadUrl,
          extraFileUploadParams: {
            accessToken: getToken()
          },
          allowFileManager: false,
          width: "700px",
          height: "500px",
          filePostName: "uploadFile"
        };
        //$.getScript("./static/js/kindeditor/kindeditor-all.js", function() {
        that.fetchDoc();
        that.editor = KindEditor.create("#content", options);
        //});
      },
      updateDoc() {
        this.editor.sync();
        var that = this;
        request({
          url: that.apiRootPath + "doc/addOrUpdate",
          method: "POST",
          data: {
            menuTitle: $.trim(that.menuTitle),
            content: that.editor.html(),
            docType: that.docType,
            id: that.docDetail.id,
            pid: that.pid
          }
        }).then(response => {
          if (response.code == 0) {
            that.$router.push({ path: "documentManagement" });
          }
        });
      },
      fetchDoc() {
        var that = this;
        request({
          url: that.apiRootPath + "doc/detail",
          method: "POST",
          data: {
            mid: sessionStorage.getItem("mid")
          }
        }).then(response => {
          that.docDetail = response.result;
          that.menuTitle = that.docDetail.menuTitle;
          that.pid = that.docDetail.pid;
          that.docType = that.docDetail.docType;
          if (that.docDetail.pid > 0 || that.docDetail.docType == 1) {
            that.editor.html(that.docDetail.content);
          }
        });
      },
      canelDoc() {
        this.$router.push({ path: "documentManagement" });
      }
    }
  };
</script>
<style scoped>
</style>
