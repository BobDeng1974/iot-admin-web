<template>
    <div class="info-module-warp">
       <el-form label-width="120px" :model="info">
            <el-form-item label="模组厂商名称">
                <p> {{info.name}}</p>
            </el-form-item>
            <el-form-item label="模组厂商编码">
                <p> {{info.code}}</p>
            </el-form-item>
            <el-form-item label="机构地址">
                <p> {{info.address}}</p>
            </el-form-item>
            <el-form-item label="企业邮箱">
                <p> {{info.email}}</p>
            </el-form-item>
            <el-form-item label="固定电话">
                <p> {{info.telephone}}</p>
            </el-form-item>
            <el-form-item label="对接人">
                <p> {{info.contactName}}</p>
            </el-form-item>
            <el-form-item label="联系方式">
              <p> {{info.mobile}}</p>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
    };
  },
  methods: {
  }
};
</script>
<style lang="less">
.info-module-warp{
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
    text-align: right;
  }
}
</style>
