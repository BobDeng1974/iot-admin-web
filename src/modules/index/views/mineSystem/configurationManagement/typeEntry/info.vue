<template>
    <div class="info-type-enter-warp">
       <el-form :model="info" ref="form">
          <el-row>
            <el-col :span="8">
              <el-form-item label="年份">
               <p>{{info.sn8}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属事业部">
                <p>{{info.sn8}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="品类">
               <p>{{info.sn8}}</p>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="型号码">
                <p>{{info.sn8}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="model-number">
                <p>{{info.sn8}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="产品名称">
                <p>{{info.sn8}}</p>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="型号名称">
                <p>{{info.sn8}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="物料编码">
                <p>{{info.sn8}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="物联云平台">
                <p>{{info.sn8}}</p>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="销售渠道">
                <p>{{info.sn8}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="销售状态">
                <p>{{info.sn8}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="创建人">
                <p>{{info.sn8}}</p>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="创建时间">
            <p>{{info.sn8}}</p>
          </el-form-item>
        </el-form>
    </div>
</template>

<script>
import API from '@/modules/index/api/system/system.js';
export default {
  props: {
    info: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {};
  },
  methods: {}
};
</script>
<style lang="less">
.info-type-enter-warp{
    .el-input{
      width: 90%;
    }
    .el-textarea{
      width: 90%;
    }
  .dialog-footer{
    text-align: right;
  }
}
</style>
