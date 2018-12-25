<template>
    <div class="eidt-menu-warp">
       <el-form label-width="200px" :model="info" ref="form" :rules="rules">
            <el-form-item label="上级菜单">
              <p>{{titleInfo.label}}</p>
            </el-form-item>
            <el-form-item label="分类" prop="permissionTag">
              <el-select v-model="typeShow" disabled placeholder="请选择">
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
              <el-input v-model="info.order" type="number" min="1" max="1000"></el-input>
            </el-form-item>
            <el-form-item label="是否显示" prop="show">
                <el-radio-group v-model="info.show" :disabled='info.type === 10'>
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
    eidtInfo: {
      type: Object,
      default: {}
    },
    titleInfo: {
      type: Object,
      default: {}
    }
  },
  computed: {
    checkFlag () {
      return this.eidtInfo.type;
    },
    info () {
      return this.eidtInfo;
    },
    typeShow () {
      return this.eidtInfo.type === 9 ? 1 : (this.eidtInfo.type === 10 ? 2 : 0);
    }
  },
  data () {
    return {
      options: [{label: '页面', value: 1}, {label: '菜单', value: 0}, {label: '按钮', value: 2}],
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
    save () {
      if (!doSubmit('form', this)) return;
      this.addSubmit();
    },
    addSubmit () {
      const params = {
        name: this.info.name,
        permissionTag: this.info.permissionTag,
        permissionUrl: this.info.permissionUrl,
        order: Number(this.info.order),
        permissionId: this.info.id,
        show: this.info.show
        // model: this.info.type === 10 ? 1 : 0
      }
      API.updatePermissionMenu(params)
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
      width: 250px;
    }
    .el-textarea{
      width: 90%;
    }
  .dialog-footer{
    text-align: right;
  }
}
</style>
