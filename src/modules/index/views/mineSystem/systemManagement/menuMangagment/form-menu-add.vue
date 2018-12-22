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
              <!-- 点击选择的节点是页面的话选用这个下拉 -->
              <!-- <el-select v-model="form.model" placeholder="请选择" @change="modelChange" v-if="this.checkFlag === 9">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select> -->
              <!-- 点击选择的节点是按钮的话选用这个下拉 -->
              <!-- <el-select v-model="form.model" placeholder="请选择" @change="modelChange" v-else-if="this.checkFlag === 10">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select> -->
              <!-- 点击选择的节点是标题的话选用这个下拉 -->
              <!-- <el-select v-model="form.model" placeholder="请选择" @change="modelChange" v-else>
                <el-option
                  v-for="item in options3"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select> -->
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
import { roleMixin } from '@/modules/index/views/mineSystem/mixin';
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
        permissionTag: { required: true, message: '请输入说明', trigger: 'blur' },
        name: { required: true, message: '请输入说明', trigger: 'blur' },
        permissionUrl: { required: true, message: '请输入说明', trigger: 'blur' },
        model: { required: true, message: '请输入说明', trigger: 'blur' },
        show: { required: true, message: '请输入说明', trigger: 'blur' },
        order: { required: true, message: '请输入说明', trigger: 'blur' }
      }
    };
  },
  mixins: [ roleMixin ],
  methods: {
    modelChange (val) {
      debugger;
      if (val === 2) {
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
        pid: this.addInfo.id
      }
      debugger;
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
