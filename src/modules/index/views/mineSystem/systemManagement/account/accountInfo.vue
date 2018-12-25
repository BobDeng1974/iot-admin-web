<template>
    <div class="account-info-warp">
        <div v-if="isAdd" key="1">
            <el-form label-width="120px" :model="form" ref="addForm" :rules="rules" >
                <el-form-item label="用户mip账户" prop="mip">
                    <el-input v-model="form.mip"></el-input>
                </el-form-item>
                <el-form-item label="说明" prop="discription">
                    <el-input v-model="form.discription" type="textarea" ></el-input>
                </el-form-item>
                <el-form-item label="用户角色" prop="name">
                    <el-select v-model="form.name" multiple placeholder="请选择">
                        <el-option
                        v-for="item in roleList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <div v-else key="2">
            <el-form label-width="120px" :model="info" ref="eidtForm" :rules="rules" >
                <el-form-item label="用户mip账户">
                    <p>{{info.account}}</p>
                </el-form-item>
                <el-form-item label="说明" prop="discription">
                    <!-- <p>{{info.discription}}</p> -->
                    <el-input v-model="info.discription" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="用户角色" prop="name">
                    <el-select v-model="info.name" multiple placeholder="请选择">
                        <el-option
                        v-for="item in roleList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <div class="dialog-footer-account">
          <el-button type="primary" @click="save">保 存</el-button>
          <el-button @click="cencle">取 消</el-button>
        </div>
    </div>
</template>
<script>
import { doSubmit, restData } from '@/modules/index/api/system/common.js';
import API from '@/modules/index/api/system/system.js';
import { accountMixin } from '@/modules/index/views/mineSystem/mixin';
import { dictMixin } from '@/modules/index/views/mineSystem/dictMixin';
import ls from '@/utils/storage/local_storage';
export default {
  mixins: [ accountMixin, dictMixin ],
  props: {
    info: {
      type: Object,
      default: {}
    },
    isAdd: {
      type: Boolean,
      default: true
    }
  },
  created () {
    this.getAllrole();
  },
  data () {
    return {
      form: {
        mip: '',
        discription: '',
        name: []
      },
      rules: {
        mip: { required: true, validator: this.checkMip, trigger: 'blur' },
        discription: { required: true, message: '请输入说明', trigger: 'blur' },
        name: { required: true, message: '请选择角色', trigger: 'blur', type: 'array' }
      }
    };
  },
  methods: {
    save () {
      if (this.isAdd) {
        if (!doSubmit('addForm', this)) return;
        console.log(this.form, 'form');
        const ids = this.concantId(this.form.name);
        const params = {ids: ids, account: this.form.mip, discription: this.form.discription};
        API.addUser(params)
        .then(res => {
          if (res.code === 0) {
            this.$message({
              message: '新增角色成功',
              type: 'success'
            });
            this.$emit('close', false);
            restData(this.form);
            this.$emit('requesTab');
          }
        })
        .catch(() => {
          restData(this.form);
        });
      } else {
        if (!doSubmit('eidtForm', this)) return;
        console.log(this.info, 'info');
        const ids = this.concantId(this.info.name);
        const params = {ids: ids, account: this.info.account, discription: this.info.discription ? this.info.discription : ''};
        API.authChange(params)
        .then(res => {
          if (res.code === 0) {
            this.$message({
              message: '修改角色成功',
              type: 'success'
            });
            this.$emit('close', false);
            this.$store.dispatch('getUserInfo', '');
            this.$store.dispatch('getMeauAuthed', {uid: this.$store.getters.saveGetUserInfo.uid ||
            JSON.parse(ls.getItem('saveGetUserInfo')).uid});
            restData(this.info);
            this.$emit('requesTab');
          }
        });
      };
    },
    // 拼接选取的角色id
    concantId (val) {
      var ids = '';
      for (var i = 0; i < val.length; i++) {
        if (i === val.length - 1) {
          ids += val[i];
        } else {
          ids += val[i] + '_';
        }
      };
      return ids;
    },
    cencle () {
      this.$emit('close', false);
      if (this.isAdd) {
        restData(this.form);
        console.log(this.form, 'form');
      } else {
        restData(this.info);
        console.log(this.info, 'info');
      };
    }
  }
};
</script>
<style lang="less" scoped>
.account-info-warp{
    .dialog-footer-account{
      text-align: right;
    }
    .el-select{
      width: 100%;
    }
}
</style>
