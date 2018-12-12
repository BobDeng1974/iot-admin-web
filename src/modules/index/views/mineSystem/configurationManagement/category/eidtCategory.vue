<template>
    <div class="account-info-warp">
            <el-form label-width="120px" :model="info" ref="eidtForm" :rules="rules" >
                <el-form-item label="企业码" >
                    <p>{{info.enterprise}}</p>
                </el-form-item>
                <el-form-item label="所属开发组" prop="departmentId">
                    <el-select v-model="info.departmentId" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="类型码" >
                    <p>{{info.type}}</p>
                </el-form-item>
                <el-form-item label="中文名称" prop="nameZh">
                    <p>{{info.nameZh}}</p>
                </el-form-item>
                <el-form-item label="英文名称" prop="nameEh">
                    <p>{{info.nameEn}}</p>
                </el-form-item>
                <el-form-item label="中文描述" prop="desZh">
                    <p>{{info.desZh}}</p>
                </el-form-item>
            </el-form>
            <div class="dialog-footer">
                <el-button type="primary" @click="save">保 存</el-button>
                <el-button @click="cencle">取 消</el-button>
            </div>
    </div>
</template>
<script>
import { restData, doSubmit } from '@/modules/index/api/system/common.js';
import API from '@/modules/index/api/system/system.js';
export default {
  props: {
    info: {
      type: Object,
      default: {}
    },
    options: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      rules: {
        departmentId: { required: true, message: '请选择所属开发组', trigger: 'blur' }
      }
    };
  },
  methods: {
    save () {
      if (!doSubmit('eidtForm', this)) return;
      const params = {
         id: this.info.id,
         departmentId: this.info.departmentId
       };
      API.updateApplian(params)
         .then((res) => {
           this.$message('更新成功');
           this.$emit('close', false);
           this.$emit('requestEnd');
           restData(this.info);
         })
         .catch(() => {});
    },
    cencle () {
      this.$emit('close', false);
    }
  }
};
</script>
<style lang="less" scoped>
.account-info-warp{
    .dialog-footer{
        text-align: right;
    }
    .el-select{
       width: 100%;
    }
}
</style>
