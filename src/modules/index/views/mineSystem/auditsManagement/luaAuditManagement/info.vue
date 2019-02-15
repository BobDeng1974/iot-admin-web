<template>
    <div class="info-lua-warp">
        <div class="title">
            <span>状态:</span>
            <span v-if="info.publicStatus === 0">编辑中</span>
            <span v-if="info.publicStatus === 10">等待测试审核</span>
            <span v-if="info.publicStatus === 20">测试审核成功</span>
            <span v-if="info.publicStatus === 5">测试审核失败</span>
            <span v-if="info.publicStatus === 30">等待发布审核</span>
            <span v-if="info.publicStatus === 40">发布审核成功</span>
            <span v-if="info.publicStatus === 25">发布审核失败</span>
            <span v-if="info.publicStatus === 23">发布测试环境成功</span>
            <span v-if="info.publicStatus === 50">发布成功</span>
            <i class="el-icon-tickets" @click="showList" v-authority="'b1_luaProcessRecord'"></i>
        </div>
       <el-form label-width="120px" :model="info" label-position="left">
            <el-form-item label="名称">
                <p> {{info.name}}</p>
            </el-form-item>
            <el-form-item label="品类">
                <p> {{info.applianceType}}</p>
            </el-form-item>
            <el-form-item label="型号码">
                <p> {{info.sn8}}</p>
            </el-form-item>
            <el-form-item label="model-number">
                <p> {{info.modelNumber}}</p>
            </el-form-item>
            <el-form-item label="对应profile文件">
                <p> {{info.fileName}}</p>
            </el-form-item>
            <el-form-item label="对应电控协议">
              <p> {{info.docName}}</p>
            </el-form-item>
            <el-form-item label="lua文件">
              <p class="click-download" @click="downLoadLuaFile(info.id)"> {{info.fileOrginalName}}</p>
            </el-form-item>
            <el-form-item label="自测文件">
              <p class="click-download" @click="downLoadTestFile(info.id)"> {{info.testFileName}}</p>
            </el-form-item>
            <!-- 这里需要判断状态显示不显示 -->
            <el-form-item label="测试报告" v-if="info.publicStatus === 30 || info.publicStatus === 40 || info.publicStatus === 50">
              <p class="click-download" @click="downLoadTestReportFile(info.id)"> {{info.testReportName}}</p>
            </el-form-item>

            <el-form-item label="功能说明">
              <p> {{info.functionDescription}}</p>
            </el-form-item>
        </el-form>

        <!-- 按钮 (也需要通过状态判断显示哪个)-->

        <div class="dialog-footer" v-if="info.publicStatus === 10" v-authority="'b1_luaTestSubmit'">
            <el-button type="primary" @click="testSubmit(0)">测试审核通过</el-button>
            <el-button type="primary" @click="auditFail(1)">测试审核失败</el-button>
        </div>
        <div class="dialog-footer" v-if="info.publicStatus === 30" v-authority="'b1_luaPublickSubmit'">
            <el-button type="primary" @click="publickSubmit(0)">发布审核通过</el-button>
            <el-button type="primary" @click="publickAuditFail(1)">发布审核失败</el-button>
        </div>

        <mine-dialog :dialogFormVisible='flag' :appendToBody="true" :center="true" :modal="true" :width='"40%"' :modalFlag="modalFlag" @close="close" :title="title" :showClose="showClose">
           <list-dialog slot="option" @close="close" :id="id" :flag="flag"></list-dialog>
        </mine-dialog>
    </div>
</template>

<script>
import mineDialog from '@/modules/index/components/mine-dialog';
import listDialog from './list';
import API from '@/modules/index/api/system/system.js';
import ls from '@/utils/storage/local_storage.js';
export default {
  props: {
    info: {
      type: Object,
      default: {}
    }
  },
  components: {
    mineDialog,
    listDialog
  },
  data () {
    return {
      // 控制弹框显影
      flag: false,
      // 是否显示按钮
      showClose: true,
      modalFlag: false,
      title: '',
      id: ''
    };
  },
  methods: {
    isDownload(value) {
      const buttonFlag = ls.getObject('buttonFlag');
      if (buttonFlag.length) {
        if (buttonFlag.indexOf(value) === -1) {
          return false;
        } else {
          return true;
        }
      }
      debugger;
    },
    showList () {
      this.id = this.info.id;
      this.title = '流程记录';
      this.flag = true;
      this.modalFlag = true;
    },
    close (val) {
      this.flag = val;
    },
    // 测试审核通过
    testSubmit (val) {
      this.$confirm(`测试审核成功，点击确认将发布到相应测试环境`, '确认测试审核成功', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        // this.$emit('close', false);
        const params = {
            luaId: this.info.id,
            type: val
        };
        API.luaTestAudit(params)
            .then(res => {
                if (res.code === 0) {
                    this.$message({
                        type: 'success',
                        message: res.message
                    });
                    this.$emit('requestTable');
                    this.$emit('close', false);
                }
            });
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },
    // 发布审核通过
    publickSubmit (val) {
      this.$confirm(`发布审核成功，点击确认将发布到，相应正式环境`, '发布审核成功', {
        confirmButtonText: '确定发布',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        // this.$emit('close', false);
        const params = {
            luaId: this.info.id,
            type: val
        };
        API.luaPublishAudit(params)
            .then(res => {
                if (res.code === 0) {
                    this.$message({
                        type: 'success',
                        message: res.message
                    });
                    this.$emit('requestTable');
                    this.$emit('close', false);
                }
            });
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },
    // 测试审核失败
    auditFail (val) {
      this.$confirm(`测试审核失败，将退回给开发者修改`, '审核失败', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        // this.$emit('close', false);
        const params = {
            luaId: this.info.id,
            type: val
        };
        API.luaTestAudit(params)
            .then(res => {
                if (res.code === 0) {
                    this.$message({
                        type: 'success',
                        message: res.message
                    });
                    this.$emit('requestTable');
                    this.$emit('close', false);
                }
            });
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },
    // 发布审核失败
    publickAuditFail (val) {
      this.$confirm(`发布审核失败，将退回给开发者修改`, '发布审核失败', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        // this.$emit('close', false);
        const params = {
            luaId: this.info.id,
            type: val
        };
        API.luaPublishAudit(params)
            .then(res => {
                if (res.code === 0) {
                    this.$message({
                        type: 'success',
                        message: res.message
                    });
                    this.$emit('requestTable');
                    this.$emit('close', false);
                }
            });
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },
    // lua文件下载
    downLoadLuaFile (file) {
      if (!this.isDownload('b1_downloadLua')) return false;

      API.downloadLua({id: file})
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
    // 自测文件下载
    downLoadTestFile (file) {
      if (!this.isDownload('b1_downloadTestFile')) return false;

      API.downloadTest({id: file})
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
    // 测试报告文件下载
    downLoadTestReportFile (file) {
      if (!this.isDownload('b1_downloadTestReport')) return false;

      API.downloadTestReport({id: file})
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
    }
  }
};
</script>
<style lang="less">
.info-lua-warp{
    .el-form-item {
        margin-bottom: 0;
    }
    .click-download{
      color: blue;
      cursor: pointer;
    }
    p{
        word-wrap: break-word;
    }
    .title {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 15px;
      color: black;
      i{
        cursor: pointer;
        color: blue;
        margin-left: 20px;
        font-size: 20px;
      }
    }
    .el-input{
      width: 90%;
    }
    .el-textarea{
      width: 90%;
    }
    .el-select{
      width: 100%;
    }
  .dialog-footer{
    text-align: center;
  }
}
</style>
