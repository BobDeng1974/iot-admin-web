<template>
    <div class="add-menu-warp">
       <el-form label-width="200px" :model="form" ref="form" :rules="rules">
            <el-form-item label="上级菜单">
              <p>{{addInfo.name}}</p>
            </el-form-item>
            <el-form-item label="分类" prop="model">
              <el-select v-model="form.model" placeholder="请选择" @change="modelChange">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="权限标识" prop="permissionTag">
                <el-input v-model="form.permissionTag"></el-input>
            </el-form-item>
            <el-form-item label="菜单名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="接口url" prop="permissionUrl">
              <el-input v-model="form.permissionUrl"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="order">
                <el-input v-model="form.order"></el-input>
            </el-form-item>
            <el-form-item label="是否显示" prop="show">
                <el-radio-group v-model="form.show" :disabled='form.model === 1'>
                    <el-radio :label="0">是</el-radio>
                    <el-radio :label="1">否</el-radio>
                </el-radio-group>
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
  props: {
    addInfo: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      options: [{label: '非按钮', value: 0}, {label: '按钮', value: 1}],
      form: {
        name: '',
        permissionTag: '',
        permissionUrl: '',
        model: 0,
        order: '',
        show: ''
      },
      rules: {
        pid: { required: true, validator: this.checkRoleName, trigger: 'blur' },
        name: { required: true, message: '请输入说明', trigger: 'blur' },
        path: { required: true, message: '请输入说明', trigger: 'blur' },
        order: { required: true, message: '请输入说明', trigger: 'blur' },
        hidden: { required: true, message: '请输入说明', trigger: 'blur' }
      }
    };
  },
  mixins: [ roleMixin ],
  methods: {
    modelChange (val) {
      if (val === 1) {
        this.form.show = 0;
      }
    },
    save () {
      if (!doSubmit('form', this)) return;
      this.addSubmit();
      this.$emit('close', false);
    },
    addSubmit () {
      this.form.order = Number(this.form.order);
      const params = {
        ...this.form,
        pid: this.addInfo.pid
      }
      API.addPermissionMenu(params)
         .then(res => {
           restData(this.form);
           this.$emit('requestTable');
         });
    },
    cencle () {
      this.$emit('close', false);
      restData(this.form);
    }
  }
};
</script>
<style lang="less">
.add-menu-warp{
    .el-input{
      width: 250px;
    }
  .dialog-footer{
    text-align: right;
  }
}
</style>
