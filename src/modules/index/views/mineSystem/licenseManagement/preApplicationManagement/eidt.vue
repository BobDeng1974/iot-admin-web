<template>
    <div class="add-liences-warp">
        <div class="title-mip">
            <con-header :title-icon="'/static/img/title_05@2x.png'" title="liences预申请" :hasBottomBorder="true"></con-header>
        </div>
        <div class="form-liences-pre">
            <el-form label-width="260px" :model="form" ref="form" :rules="rules">
                <el-form-item label="申请单位" prop="supplyId">
                  <el-select v-model="form.supplyId" placeholder="请选择" clearable>
                    <el-option
                      v-for="item in applyList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="对应事业部" prop="departId">
                   <el-select v-model="form.departId" placeholder="请选择" clearable>
                        <el-option
                          v-for="item in deparmentList"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="预申请数量" prop="nums">
                    <el-input v-model="form.nums"></el-input>
                </el-form-item>
                <el-form-item class="edit-time" label="预申请时间" prop="time">
                  <el-date-picker :picker-options="pickerOptions" v-model="form.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="上传事业部下单截图" prop="departOrderUrl">
                    <el-upload drag accept="image/jpeg,image/png" :on-remove="uploadRemove" :before-upload="beforeUpload" class="upload-demo" :http-request="uploadImgApi" :action="'dddd'" multiple :limit="1" :file-list="fileList">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" >只能上传jpg/png文件，且不超过2M</div>
                    </el-upload>
                    <el-input v-model="form.departOrderUrl" type="hidden"></el-input>
                </el-form-item>
                <el-form-item label="" style="margin-top:-42px;">
                  <div class="dialog-footer">
                    <el-button type="primary" @click="save">提 交</el-button>
                    <el-button @click="cencle">取 消</el-button>
                  </div>
                </el-form-item>

            </el-form>
        </div>
        <!-- <div class="dialog-footer">
          <el-button type="primary" @click="save">提 交</el-button>
          <el-button @click="cencle">取 消</el-button>
        </div> -->
    </div>
</template>

<script>
import API from '@/modules/index/api/system/system.js';
import { doSubmit, format } from '@/modules/index/api/system/common.js';
import conHeader from '@/components/awesome/con-header/con-header';
import { dictMixin } from '@/modules/index/views/mineSystem/dictMixin';
import { preApplicationManagementMixin } from '@/modules/index/views/mineSystem/mixin';
import commonFun from '@/common/js/func';
export default {
  components: {
    conHeader
  },
  mixins: [ dictMixin, preApplicationManagementMixin ],
  created () {
    this.getAlldeparment();
    this.getApply();
  },
  data () {
    return {
      accept: '.png, .jpg',
      form: {
        supplyId: '',
        departId: '',
        nums: '',
        time: [],
        departOrderUrl: ''
      },
      fileList: [],
      rules: {
        supplyId: { required: true, message: '请选择', trigger: 'change' },
        departId: { required: true, message: '请选择', trigger: 'blur' },
        nums: { required: true, validator: this.checkNums, trigger: 'blur' },
        time: { required: true, message: '请选择', trigger: 'blur', type: 'array' },
        departOrderUrl: { required: true, message: '请上传图片', trigger: 'change' }
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      }
    };
  },
  methods: {
    uploadRemove (file, fileList) {
      this.form.departOrderUrl = '';
    },
    beforeUpload(file) {
      return commonFun.extMatch(file, this.accept, this) && commonFun.extMatchSize(file, 2, this);
    },
    // 上传文件公共方法
    uploadImgApi (item) {
      // 传入参数uploadFile是后端需要的健
      let param = { uploadFile: item.file };
      this.getUpElecManagement(param);
    },
    // 上传的接口
    async getUpElecManagement(param) {
      try {
        await this.$store.dispatch('imgDoUpLoad', param).then(result => {
          if (result.code === 0) {
            this.$message({
              message: result.message,
              type: 'success'
            });
            this.form.departOrderUrl = result.result.url;
            // 上传成功后直接调用后端接口
          }
        });
      } catch (e) {}
    },
    save () {
      if (!doSubmit('form', this)) return;
      this.addSubmit();
    },
    limitName (val, list = [], id, name) {
      let fname = '';
      for (var i = 0; i < list.length; i++) {
        if (val === list[i][id]) {
          fname = list[i][name];
        }
      }
      return fname;
    },
    addSubmit () {
      debugger;
      this.form.nums = Number(this.form.nums);
      const params = {
        ...this.form,
        supplyName: this.limitName(this.form.supplyId, this.applyList, 'id', 'name'),
        departName: this.limitName(this.form.departId, this.deparmentList, 'id', 'name'),
        applyStartDate: format(this.form.time[0], 'yyyyMM'),
        applyEndDate: format(this.form.time[1], 'yyyyMM'),
        supplyCode: this.limitName(this.form.supplyId, this.applyList, 'id', 'code'),
        applyUserId: '',
        applyUserName: ''
      };
      API.addLicPreApply(params)
         .then(res => {
           if (res.code === 0) {
             this.$router.push({name: 'preApplicationManagement'});
             this.$message('新增成功');
           }
         });
    },
    cencle () {
      this.$router.push({name: 'preApplicationManagement'});
    }
  }
};
</script>
<style lang="less">
.add-liences-warp{
  .el-upload-dragger{
    width: 394px;
  }
    .el-input{
      width: 50%;
    }
   .edit-time .el-form-item__content .el-date-editor--daterange.el-input__inner{
      width: 50%!important;
    }
    .el-select{
      width: 50%;
      .el-input--suffix {
        width: 100%;
      }
    }
    // .el-upload{
    //   width: 50%;
    //   height: 190px;
    //   border: 1px dashed #DEDFE5;
    //   border-radius: 5px;
    // }
    // .el-upload:hover{
    //   border: 1px dashed #5667FF;
    // }
    .el-icon-upload{
        font-size: 70px;
    }
    .el-upload-list__item{
        width: 50%;
    }
    .el-upload__tip{
       line-height: 15px;
       margin-top: 0;
    }

    .form-liences-pre{
      margin-top: 25px;
    }
    .el-textarea{
      width: 90%;
    }
  .dialog-footer{
    text-align: left;
  }
}
</style>
