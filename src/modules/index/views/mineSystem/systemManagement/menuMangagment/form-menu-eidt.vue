<template>
    <div class="eidt-menu-warp">
       <el-form label-width="120px" :model="info" ref="form" :rules="rules">
            <el-form-item label="上级菜单" prop="pid">
              <el-select v-model="info.pid" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="菜单名称" prop="name">
                <el-input v-model="info.name"></el-input>
            </el-form-item>
            <el-form-item label="接口url" prop="path">
                <el-input v-model="info.path"></el-input>
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
    }
  },
  data () {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
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
    save () {
      if (!doSubmit('form', this)) return;
      this.addSubmit();
      this.$emit('close', false);
    },
    addSubmit () {
      const params = this.form;
      API.addRole(params)
         .then(res => {
           this.$emit('requestTable');
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
