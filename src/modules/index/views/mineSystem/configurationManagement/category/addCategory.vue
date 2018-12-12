<template>
    <div class="addCategory-addForm-warp">
            <el-form label-width="120px" :model="addForm" ref="addForm" :rules="rules" >
                <el-form-item label="企业码" prop="">
                    <el-input v-model="addForm.enterprise"></el-input>
                </el-form-item>
                <el-form-item label="所属开发组" prop="departmentId">
                    <el-select v-model="addForm.departmentId" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="类型码" prop="type">
                    <el-input v-model="addForm.type"></el-input>
                </el-form-item>
                <el-form-item label="中文名称" prop="nameZh">
                    <el-input v-model="addForm.nameZh"></el-input>
                </el-form-item>
                <el-form-item label="英文名称" prop="nameEn">
                    <el-input v-model="addForm.nameEn"></el-input>
                </el-form-item>
                <el-form-item label="中文描述" prop="desZh">
                    <el-input v-model="addForm.desZh"></el-input>
                </el-form-item>
                <el-form-item label="英文描述" prop="desEn">
                    <el-input v-model="addForm.desEn"></el-input>
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
    options: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      addForm: {
        enterprise: '',
        departmentId: '',
        type: '',
        nameZh: '',
        nameEn: '',
        desZh: '',
        desEn: ''
      },
      rules: {
        departmentId: { required: true, message: '请选择所属开发组', trigger: 'blur' },
        type: { required: true, message: '请选择活动区域', trigger: 'blur' },
        nameZh: { required: true, message: '请选择活动区域', trigger: 'blur' },
        nameEn: { required: true, message: '请选择活动区域', trigger: 'blur' },
        desZh: { required: true, message: '请选择活动区域', trigger: 'blur' },
        desEn: { required: true, message: '请选择活动区域', trigger: 'blur' }
      }
    };
  },
  methods: {
    save () {
      if (!doSubmit('addForm', this)) return;
      const params = {
         type: this.addForm.type,
         departmentName: this.addForm.departmentId,
         nameZh: this.addForm.nameZh,
         nameEn: this.addForm.nameEn,
         desEn: this.addForm.desEn,
         desZh: this.addForm.desZh
       };
      API.addApplian(params)
         .then((res) => {
           this.$message('新增成功');
           this.$emit('close', false);
           this.$emit('requestEnd');
           restData(this.addForm);
         })
         .catch(() => {});
    },
    cencle () {
      this.$emit('close', false);
      restData(this.addForm);
    }
  }
};
</script>
<style lang="less" scoped>
.addCategory-addForm-warp{
    .dialog-footer{
        text-align: right;
    }
    .el-select{
       width: 100%;
    }
}
</style>
