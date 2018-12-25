<template>
  <div class="add-takeOver-warp">
    <el-form label-width="120px" :model="info" ref="form" :rules="rules">
      <el-form-item label="对接人" prop="contactId">
        <el-select v-model="info.contactId"  filterable placeholder="请选择" @change="contactChange">
            <el-option
            v-for="item in userList"
            :key="item.uid"
            :label="item.nickName"
            :value="item.uid">
            </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系方式" prop="mobile">
        <el-input v-model="info.mobile"></el-input>
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
import API from '@/modules/index/api/system/system.js';
import { moduleVendorMixin } from '@/modules/index/views/mineSystem/mixin';
export default {
  mixins: [ moduleVendorMixin ],
  props: {
    info: {
      type: Object,
      default: {}
    },
    userList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      // form: {
      //   empName: ''
      // },
      rules: {
        contactId: { required: true, message: '请选择对接人', trigger: 'blur' },
        mobile: { required: true, validator: this.checkMobile, trigger: 'blur' }
      }
    };
  },
  methods: {
    contactChange (val) {
      this.info.contactName = this.getName(val);
      this.info.mobile = this.getMobile(val);
    },
    // 找到id对应的联系方式
    getMobile (val) {
      let mobile = '';
      for (var i = 0; i < this.userList.length; i++) {
        if (val === this.userList[i].uid) {
          mobile = this.userList[i].account;
        }
      }
      return mobile;
    },
    // 找到id对应的名字
    getName (val) {
      let name = '';
      for (var i = 0; i < this.userList.length; i++) {
        if (val === this.userList[i].uid) {
          name = this.userList[i].nickName;
        }
      }
      return name;
    },
    save() {
      if (!doSubmit('form', this)) return;
      // this.contactChange(this.info.contactId);
      const params = {
        contactId: this.info.contactId,
        contactName: this.info.contactName,
        id: this.info.id,
        mobile: this.info.mobile
      };
      API.updateContact(params)
          .then(res => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: res.message
              });
              restData(this.info);
              this.$emit('requestTable');
              this.$emit('close', false);
            }
          });
    },
    cencle() {
      this.$emit('close', false);
      restData(this.info);
    }
  }
};
</script>
<style lang="less">
.add-takeOver-warp {
  .el-input {
    width: 90%;
  }
  .el-select{
    width: 100%;
  }
  .el-textarea {
    width: 90%;
  }
  .dialog-footer {
    text-align: right;
  }
}
</style>
