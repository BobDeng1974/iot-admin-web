<template>
    <div class="info-lua-warp">
        <div class="title">
            状态：{{info.mineType === 1 ? '提交测试审核' : '提交发布审核'}}
            <i class="el-icon-d-arrow-right" @click="showList"></i>
        </div>
       <el-form label-width="120px" :model="info" label-position="left">
            <el-form-item label="名称">
                <p> {{info.name}}</p>
            </el-form-item>
            <el-form-item label="品类">
                <p> {{info.code}}</p>
            </el-form-item>
            <el-form-item label="型号码">
                <p> {{info.address}}</p>
            </el-form-item>
            <el-form-item label="model-number">
                <p> {{info.email}}</p>
            </el-form-item>
            <el-form-item label="对应profile文件">
                <p> {{info.telephone}}</p>
            </el-form-item>
            <el-form-item label="对应电控协议">
                <p> {{info.contactName}}</p>
            </el-form-item>
            <el-form-item label="lua文件">
              <p class="click-download"> {{info.mobile}}</p>
            </el-form-item>
            <el-form-item label="自测文件">
              <p class="click-download"> {{info.publicKey}}</p>
            </el-form-item>
            <!-- 这里需要判断状态显示不显示 -->
            <el-form-item label="测试报告" v-if="info.mineType === 2">
              <p class="click-download"> {{info.publicKey}}</p>
            </el-form-item>

            <el-form-item label="功能说明">
              <p> {{info.mobile}}</p>
            </el-form-item>
        </el-form>

        <!-- 按钮 (也需要通过状态判断显示哪个)-->

        <div class="dialog-footer" v-if="info.mineType === 1">
            <el-button type="primary" @click="testSubmit">测试审核通过</el-button>
            <el-button type="primary" @click="auditFail">审核失败</el-button>
        </div>
        <div class="dialog-footer" v-if="info.mineType === 2">
            <el-button type="primary" @click="publickSubmit">发布审核通过</el-button>
            <el-button type="primary" @click="publickAuditFail">审核失败</el-button>
        </div>

        <mine-dialog :dialogFormVisible='flag' :center="true" :modal="false" :width='"40%"' :modalFlag="modalFlag" @close="close" :title="title" :showClose="showClose">
           <list-dialog slot="option" @close="close" :id="id" :flag="flag"></list-dialog>
        </mine-dialog>
    </div>
</template>

<script>
import mineDialog from '@/modules/index/components/mine-dialog';
import listDialog from './list';
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
    showList () {
      this.title = '流程记录';
      this.flag = true;
      this.id = this.info.id;
    },
    close (val) {
      this.flag = val;
    },
    testSubmit () {
      this.$confirm(`测试审核成功，点击确认将发布到相应测试环境`, '确认测试审核成功', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        this.$emit('close', false);
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },
    publickSubmit () {
      this.$confirm(`发布审核成功，点击确认将发布到，相应正式环境`, '发布审核成功', {
        confirmButtonText: '确定发布',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        this.$emit('close', false);
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },
    auditFail () {
      this.$confirm(`测试审核失败，将退回给开发者修改`, '审核失败', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        this.$emit('close', false);
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },
    publickAuditFail () {
      this.$confirm(`发布审核失败，将退回给开发者修改`, '发布审核失败', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        this.$emit('close', false);
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    }
    // downLoadUpFile (file) {
    //   API.downFileUp({ids: file})
    //   .then(response => {
    //     let tempNameStr = response.headers['content-disposition'].split(';')[1];
    //     let fileName = tempNameStr.split('=')[1];
    //     let blob = new Blob([response.data]);
    //     let objectUrl = URL.createObjectURL(blob);
    //     let link = document.createElement('a');
    //     link.style.display = 'none';
    //     link.href = objectUrl;
    //     link.setAttribute('download', fileName);
    //     document.body.appendChild(link);
    //     link.click();
    //   });
    // }
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
