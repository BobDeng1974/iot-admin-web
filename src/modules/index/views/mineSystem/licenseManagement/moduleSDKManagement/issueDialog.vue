<template>
  <div>
    <div>确认发布，将公布到开发者平台官网，并邮件通知开发者</div>
    <div class="dialog-footer">
      <el-button type="primary" @click="handleSave">保存</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    handleSave() {
      this.$emit('close', false);
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

