<template>
    <div class="eidt-type-enter-warp">
       <el-form label-width="120px" :model="eidtInfo" ref="form" :rules="rules">
            <el-row>
            <el-col :span="8">
              <el-form-item label="年份">
               <p>{{eidtInfo.sn8}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属事业部">
                <p>{{eidtInfo.sn8}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="品类">
               <p>{{eidtInfo.sn8}}</p>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="型号码">
                <p>{{eidtInfo.sn8}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="model-number">
                <p>{{eidtInfo.sn8}}</p>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 编辑部分 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="产品名称">
                <el-input v-model="eidtInfo.sn8"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="型号名称">
                <el-input v-model="eidtInfo.sn8"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="物料编码">
                <el-radio-group v-model="eidtInfo.sn8">
                    <el-radio label="选项1">美的</el-radio>
                    <el-radio label="选项2">华为</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="物联云平台">
                <el-input v-model="eidtInfo.sn8"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="销售渠道">
                <el-select v-model="eidtInfo.sn8" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="销售状态">
                <el-select v-model="eidtInfo.sn8" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="创建人">
                <el-input v-model="eidtInfo.sn8"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="创建时间">
                <el-input v-model="eidtInfo.sn8"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
            <!-- <el-form-item label="上级菜单" prop="pid">
              <el-select v-model="eidtInfo.pid" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item> -->
            <!-- <el-form-item label="是否显示" prop="hidden">
                <el-radio-group v-model="eidtInfo.hidden">
                    <el-radio :label="false">是</el-radio>
                    <el-radio :label="true">否</el-radio>
                </el-radio-group>
            </el-form-item> -->
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
    eidtInfo: {
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
.eidt-type-enter-warp{
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
