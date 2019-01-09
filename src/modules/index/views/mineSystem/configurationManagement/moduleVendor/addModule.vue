<template>
    <div class="add-module-warp">
       <el-form label-width="120px" :model="form" ref="form" :rules="rules">
            <el-form-item label="模组厂商名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="模组厂商编码" prop="code">
                <el-input v-model="form.code"></el-input>
            </el-form-item>
            <el-form-item label="机构地址" prop="address">
              <v-distpicker class="addModule-adderess" :province="select.province" :city="select.city" :area="select.area" @province='one' @city="two" @area="three"></v-distpicker>
              <el-input v-model="form.addressInput" class="addressInput" @input="addressInput"></el-input>
              <el-input style="display:none" v-model="form.address" type="hidden"></el-input>
            </el-form-item>
            <el-form-item label="企业邮箱" prop="email">
                <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="固定电话" prop="telephone">
                <el-input v-model="form.telephone"></el-input>
            </el-form-item>
            <el-form-item label="对接人" prop="contactId">
                <el-select v-model="form.contactId" filterable  placeholder="请选择" @change="contactChange">
                    <el-option
                    v-for="item in userList"
                    :key="item.uid"
                    :label="item.nickName"
                    :value="item.uid">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="联系方式" prop="mobile">
                <el-input v-model="form.mobile"></el-input>
            </el-form-item>
            <el-form-item label="公钥" prop="publicKey">
                <el-input v-model="form.publicKey" type="textarea"></el-input>
            </el-form-item>
        </el-form>
        <div class="dialog-footer">
            <el-button type="primary" @click="save">保 存</el-button>
            <el-button @click="cencle">取 消</el-button>
        </div>
    </div>
</template>

<script>
import { doSubmit, restData } from '@/modules/index/api/system/common.js';
import API from '@/modules/index/api/system/system.js';
import VDistpicker from 'v-distpicker';
import { moduleVendorMixin } from '@/modules/index/views/mineSystem/mixin';
export default {
  mixins: [ moduleVendorMixin ],
  components: { VDistpicker },
  props: {
    userList: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      form: {
        name: '',
        code: '',
        address: '',
        telephone: '',
        email: '',
        mobile: '',
        contactId: '',
        contactName: '',
        addressInput: ''
      },
      select: {
        province: '',
        city: '',
        area: ''
      },
      rules: {
        name: { required: true, validator: this.checkName, trigger: 'blur' },
        code: { required: true, validator: this.checkCode, trigger: 'blur' },
        telephone: { validator: this.checkTel, trigger: 'blur' },
        address: { required: true, message: '请选择地区', trigger: 'change' },
        email: { required: true, validator: this.checkEmail, trigger: 'blur' },
        mobile: { required: true, validator: this.checkMobile, trigger: 'change' },
        contactId: { required: true, message: '请选择对接人', trigger: 'change' },
        publicKey: { required: true, validator: this.checkPublicKey, trigger: 'change' }
      }
    };
  },
  methods: {
    addressInput (val) {
      if (!val || !this.select.province || !this.select.city || !this.select.area) {
        this.form.address = '';
      } else {
        this.form.address = this.select.province + this.select.city + this.select.area + this.form.addressInput;
      }
    },
    contactChange (val) {
      this.form.contactName = this.getName(val);
      this.form.mobile = this.getMobile(val);
    },
    one (val) {
      this.select.province = this.initAddres(val);
      if (!this.form.addressInput || !this.select.province || !this.select.city || !this.select.area) {
        this.form.address = '';
      } else {
        this.form.address = this.select.province + this.select.city + this.select.area + this.form.addressInput;
      }
    },
    two (val) {
      this.select.city = this.initAddres(val);
      if (!this.form.addressInput || !this.select.province || !this.select.city || !this.select.area) {
        this.form.address = '';
      } else {
        this.form.address = this.select.province + this.select.city + this.select.area + this.form.addressInput;
      }
    },
    three (val) {
      this.select.area = this.initAddres(val);
      if (!this.form.addressInput || !this.select.province || !this.select.city || !this.select.area) {
        this.form.address = '';
      } else {
        this.form.address = this.select.province + this.select.city + this.select.area + this.form.addressInput;
      }
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
    initAddres (val) {
      if (val.value === '省' || val.value === '市' || val.value === '区') {
        return '';
      } else {
        return val.value;
      }
    },
    save () {
      if (!doSubmit('form', this)) return;
      const params = {
        ...this.form
      };
      API.supplyAdd(params)
          .then(res => {
            if (res.code === 0) {
              this.$message({
                message: '创建模组厂商成功',
                type: 'success'
              });
              restData(this.form);
              restData(this.select);
              this.$emit('close', false);
              this.$emit('requestTable');
            }
          });
    },
    cencle () {
      restData(this.form);
      restData(this.select);
      this.$emit('close', false);
    }
  }
};
</script>
<style lang="less">
.add-module-warp{
    .el-input{
      width: 90%;
    }
    .addModule-adderess{
      display: flex;
    width: 90%;
    }
    .addModule-adderess select{
      width: 33.333%!important;
    }
    .addressInput{
      margin-top: 20px;
    }
    .el-textarea{
      width: 90%;
    }
    .el-select{
      width: 100%;
    }
  .dialog-footer{
    text-align: right;
  }
}
</style>
