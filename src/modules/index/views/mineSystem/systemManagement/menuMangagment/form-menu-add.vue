<template>
    <div class="add-menu-warp">
       <el-form label-width="120px" :model="form" ref="form" :rules="rules">
            <el-form-item label="上级菜单" prop="type">
              <el-select v-model="form.type" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="菜单名称" prop="menuName">
                <el-input v-model="form.menuName"></el-input>
            </el-form-item>
            <el-form-item label="菜单图标" prop="img">
                <el-input v-model="form.img"></el-input>
            </el-form-item>
            <el-form-item label="接口url" prop="url">
                <el-input v-model="form.url"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="order">
                <el-input v-model="form.order"></el-input>
            </el-form-item>
            <el-form-item label="是否显示" prop="isShow">
                <el-input v-model="form.isShow" type="textarea"></el-input>
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
        type: '',
        menuName: '',
        img: '',
        url: '',
        order: '',
        isShow: ''
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
      this.$emit('close', false);
    },
    addSubmit () {
      const params = this.form;
      API.addRole(params)
         .then(res => {
           restData(this.form);
           this.$emit('requestTable');
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
.add-menu-warp{
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
