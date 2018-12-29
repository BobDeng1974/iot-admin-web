<template>
    <div class="add-valid-warp">
       <el-form label-width="120px" :model="form" ref="form" :rules="rules">
            <el-form-item label="开始mac/IMEI" prop="startMac">
                <el-input v-model="form.startMac"></el-input>
            </el-form-item>
            <el-form-item label="结束mac/IMEI" prop="endMac">
                <el-input v-model="form.endMac"></el-input>
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
import { macMixin } from '@/modules/index/views/mineSystem/mixin';
export default {
  mixins: [ macMixin ],
  data () {
    return {
      form: {
        startMac: '',
        endMac: ''
      },
      rules: {
        startMac: { required: true, validator: this.checkStartMac, trigger: 'blur' },
        endMac: { required: true, validator: this.checkEndMac, trigger: 'blur' }
      }
    };
  },
  methods: {
    save () {
      if (!doSubmit('form', this)) return;
      this.addSubmit();
    },
    addSubmit () {
      const params = {...this.form, account: 'me'};
      API.addValidMac(params)
         .then(res => {
           if (res.code === 0) {
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
.add-valid-warp{
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
