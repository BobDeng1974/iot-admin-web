<template>
    <div class="eidt-menu-warp">
       <el-form label-width="120px" :model="info" ref="form" :rules="rules">
            <el-form-item label="上级菜单">
              <p>{{titleInfo.label}}</p>
            </el-form-item>
            <el-form-item label="分类" prop="type" >
              <el-select v-model="info.type" disabled placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="权限标识" prop="permissionTag">
                <el-input v-model="info.permissionTag"></el-input>
            </el-form-item>
            <el-form-item label="菜单名称" prop="name">
                <el-input v-model="info.name"></el-input>
            </el-form-item>
            <el-form-item label="接口url" prop="permissionUrl">
                <el-input v-model="info.permissionUrl"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="order">
              <el-input v-model="info.order"></el-input>
            </el-form-item>
            <el-form-item label="是否显示" prop="hidden">
                <el-radio-group v-model="info.hidden">
                    <el-radio :label="false">是</el-radio>
                    <el-radio :label="true">否</el-radio>
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
    info: {
      type: Object,
      default: {}
    },
    titleInfo: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      options: [{label: '非按钮', value: 0}, {label: '按钮', value: 10}, {label: '非按钮', value: 1}, {label: '非按钮', value: 2}, {label: '非按钮', value: 3}],
      rules: {
        // permissionTag: { required: true, validator: this.checkRoleName, trigger: 'blur' },
        permissionTag: { required: true, message: '请输入说明', trigger: 'blur' },
        name: { required: true, message: '请输入说明', trigger: 'blur' },
        permissionUrl: { required: true, message: '请输入说明', trigger: 'blur' },
        order: { required: true, message: '请输入说明', trigger: 'blur' },
        show: { required: true, message: '请输入说明', trigger: 'blur' },
        type: { required: true, message: '请输入说明', trigger: 'blur' }
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
      const params = {
        name: this.info.name,
        permissionTag: this.info.permissionTag,
        permissionUrl: this.info.permissionUrl,
        order: this.info.order,
        permissionId: this.info.id,
        show: this.info.hidden ? 1 : 0,
        model: this.info.type === 10 ? 1 : 0
      }
      API.addRole(params)
         .then(res => {
           this.$emit('requestTable');
           this.$emit('close', false);
         });
    },
    cencle () {
      this.$emit('close', false);
    }
  }
};
</script>
<style lang="less">
.eidt-menu-warp{
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
