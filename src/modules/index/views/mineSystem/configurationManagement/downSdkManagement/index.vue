<template>
  <div>
    <el-button @click="addSdkDoc()" type="text">添加sdk文档</el-button>
    <el-table :data="sdkDocList" style="width: 100%">
      <el-table-column prop="title" label="标题">
      </el-table-column>
      <el-table-column prop="icon" label="图标">
      </el-table-column>
      <el-table-column prop="sdkUrl" label="sdk下载地址">
      </el-table-column>
      <el-table-column prop="docLink" label="文档地址">
      </el-table-column>
      <el-table-column prop="docLink" label="操作">
        <template slot-scope="scope">
          <el-button @click="editSdkDoc(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="delSdkDoc(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>
<script>
  import { getToken } from "@/utils/auth";
  import request from "@/utils/http";
  const { APPLICATION_NAME } = window.environment.iotserver;
  export default {
    data() {
      return {
        apiRootPath: `${APPLICATION_NAME}/sdkdown/`,
        sdkDocList: []
      };
    },
    mounted() {
      this.getAllSdk();
    },
    methods: {
      getAllSdk() {
        let that = this;
        request({
          url: that.apiRootPath + "getall",
          method: "POST"
        }).then(response => {
          that.sdkDocList = response.result;
        });
      },
      editSdkDoc(row) {
        sessionStorage.setItem("sdkDocId", row.id);
        this.$router.push({ path: "editSdkDoc" });
      },
      delSdkDoc(row) {
        let that = this;
        request({
          url: that.apiRootPath + "getall",
          method: "POST",
          data: {
            id: row.id
          }
        }).then(response => {
          that.sdkDocList = response.result;
        });
      },
      addSdkDoc() {
        this.$router.push({ path: "addSdkDoc" });
      }
    }
  };
</script>

