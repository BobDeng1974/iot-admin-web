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
              <el-input v-model="form.permissionUrl" type="textarea" class='mine-input'></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="order">
               <!-- <input type="number" v-model="form.order" min="1" max="1000"> -->
                <el-input v-model="form.order" type="number" min="1" max="1000"></el-input>
            </el-form-item>
            <el-form-item label="是否显示" prop="show">
                <el-radio-group v-model="form.show" :disabled='form.model === 2'>
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
import { menuCtor } from '@/modules/index/views/mineDataCenter/mixin';
export default {
  props: {
    addInfo: {
      type: Object,
      default: {}
    }
  },
  computed: {
    options () {
      return this.addInfo.type === 9 ? [{label: '按钮', value: 2}] : (this.addInfo.type === 10 ? [] : [{label: '页面', value: 1}, {label: '菜单', value: 0}])
    }
  },
  watch: {
    'addInfo' () {
      restData(this.form);
    }
  },
  data () {
    return {
      options1: [{label: '按钮', value: 2}],
      options2: [],
      options3: [{label: '页面', value: 1}, {label: '菜单', value: 0}],
      form: {
        name: '',
        permissionTag: '',
        permissionUrl: '',
        model: '',
        order: '',
        show: ''
      },
      rules: {
        permissionTag: { required: true, validator: this.checkPermissionTag, trigger: 'change' },
        name: { required: true, validator: this.checkName, trigger: 'change' },
        permissionUrl: { required: true, validator: this.checkPermissionUrl, trigger: 'change' },
        model: { required: true, message: '请选择', trigger: 'change' },
        show: { required: true, message: '请选择', trigger: 'change' },
        order: { required: true, validator: this.checkOrder, trigger: 'change' }
      }
    };
  },
  mixins: [ menuCtor ],
  methods: {
    modelChange (val) {
      if (val === 2) {
        this.form.show = 0;
      }
    },
    save () {
      if (!doSubmit('form', this)) return;
      this.addSubmit();
    },
    addSubmit () {
      this.form.order = Number(this.form.order);
      const params = {
        ...this.form,
        pid: this.addInfo.id
      }
      API.addPermissionMenu(params)
         .then(res => {
           if (res.code === 0) {
            this.$message({
              type: 'success',
              message: res.message
            });
            restData(this.form);
            this.$emit('requestTable');
            this.$emit('close', false);
           }
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
    .mine-input{
      .el-textarea__inner{
        height: 50px;
        width: 250px;
      }
    }
  .dialog-footer{
    text-align: right;
  }
}
</style>
