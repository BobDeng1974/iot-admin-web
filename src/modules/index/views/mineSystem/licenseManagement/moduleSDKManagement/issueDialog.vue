<template>
  <div>
    <div>确认发布，将公布到开发者平台官网，并邮件通知开发者</div>
    <div class="dialog-footer">
      <el-button type="primary" @click="handleSave">确认发布</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </div>
  </div>
</template>
<script>
import moduleSdkApi from '@/modules/index/api/myProductsData/moduleSdk';
export default {
  props: {
    sdkId: {
      type: Number
    }
  },
  methods: {
    handleSave() {
      let params = {
        id: this.sdkId
      };
      console.log(params, '参数');
      moduleSdkApi.sdkpackageinfoPublish(params).then((res) => {
          if (res.code === 0) {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'success',
            onClose: () => {
              this.$emit('handleSave', false);
            }
          });
        }
      });
    },
    handleCancel() {
      this.$emit('close', false);
    }
  }
};
</script>
<style lang="less" scoped>
@import './moduleSDKManagement.less';
</style>

