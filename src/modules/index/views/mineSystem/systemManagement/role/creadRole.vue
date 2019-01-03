<template>
    <div class="add-role-warp">
       <el-form label-width="120px" :model="form" ref="form" :rules="rules">
            <el-form-item label="角色名称" prop="roleName">
                <el-input v-model="form.roleName"></el-input>
            </el-form-item>
            <el-form-item label="角色说明" prop="discription">
                <el-input v-model="form.discription" type="textarea"></el-input>
            </el-form-item>
        </el-form>
        <div class="dialog-footer">
            <el-button type="primary" @click="save">保 存</el-button>
            <el-button @click="cencle">取 消</el-button>
        </div>
    </div>
</template>

<script>
import API from '@/modules/index/api/system/system.js';
import { doSubmit, restData } from '@/modules/index/api/system/common.js';
import { roleMixin } from '@/modules/index/views/mineSystem/mixin';
export default {
  data () {
    return {
      form: {
        roleName: '',
        discription: ''
      },
      rules: {
        roleName: { required: true, validator: this.checkRoleName, trigger: 'blur' },
        discription: { required: true, message: '请输入说明', trigger: 'blur' }
      }
    };
  },
  mixins: [ roleMixin ],
  methods: {
    save () {
      if (!doSubmit('form', this)) return;
      this.addSubmit();
    },
    addSubmit () {
      const params = this.form;
      API.addRole(params)
         .then(res => {
           if (res.code === 0) {
            this.$message({
              message: '创建角色成功',
              type: 'success'
            });
            restData(this.form);
            this.$emit('close', false);
            this.$emit('requestTable');
           }
         });
    },
    cencle () {
      this.$emit('close', false);
      restData(this.form);
      console.log(this.form);
    }
  }
};
</script>
<style lang="less">
.add-role-warp{
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
