<template>
    <div class="add-allocated-warp">
       <el-form label-width="120px" :model="form" ref="form" :rules="rules">
            <el-form-item label="开始mac/IMEI" prop="startMacLong">
                <el-input v-model="form.startMacLong"></el-input>
            </el-form-item>
            <el-form-item label="结束mac/IMEI" prop="endMacLong">
                <el-input v-model="form.endMacLong"></el-input>
            </el-form-item>
            <el-form-item label="数量" prop="nums">
                <el-input v-model="form.nums"></el-input>
            </el-form-item>
             <el-form-item label="分配厂商" prop="supplyName">
                <el-select v-model="form.supplyName" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div class="dialog-footer">
            <el-button type="primary" @click="save">保 存</el-button>
            <el-button @click="cencle">取 消</el-button>
        </div>
    </div>
</template>

<script>
// import API from '@/modules/index/api/system/system.js';
import { doSubmit, restData } from '@/modules/index/api/system/common.js';
export default {
  data () {
    return {
      form: {
        startMacLong: '',
        endMacLong: '',
        nums: '',
        supplyName: ''
      },
      rules: {
        startMacLong: { required: true, message: '请选择活动区域', trigger: 'blur' },
        nums: { required: true, message: '请选择活动区域', trigger: 'blur' },
        supplyName: { required: true, message: '请选择活动区域', trigger: 'blur' },
        endMacLong: { required: true, message: '请选择活动区域', trigger: 'blur' }
      },
      options: [{
        value: '0',
        label: '黄金糕'
      }, {
        value: '1',
        label: '双皮奶'
      }, {
        value: '2',
        label: '蚵仔煎'
      }, {
        value: '3',
        label: '龙须面'
      }, {
        value: '4',
        label: '北京烤鸭'
      }]
    };
  },
  methods: {
    save () {
      if (!doSubmit('form', this)) return;
      this.addSubmit();
      this.$emit('close', false);
    },
    addSubmit () {
    //   const params = this.form;
    //   API.addRole(params)
    //      .then(res => {
    //        restData(this.form);
    //        this.$emit('requestTable');
    //      });
    },
    cencle () {
      this.$emit('close', false);
      restData(this.form);
    }
  }
};
</script>
<style lang="less">
.add-allocated-warp{
    .el-input{
      width: 90%;
    }
    .el-select{
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
