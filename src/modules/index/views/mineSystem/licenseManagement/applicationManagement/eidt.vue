<template>
    <div class="add-liencesp-warp">
        <div class="title-mip">
            <con-header :title-icon="''" title="liences申请" :hasBottomBorder="true"></con-header>
        </div>
        <div class="form-liences-pre">
            <el-form label-width="260px" :model="form" ref="form" :rules="rules">
                <el-form-item label="申请单位" prop="supplyId">
                  <el-select v-model="form.supplyId" placeholder="请选择" clearable @change="supplyIdChange">
                    <el-option
                      v-for="item in applyList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="对应预测单" prop="preApplyId">
                  <!-- <el-input v-model="form.preApplyId"></el-input> -->
                  <el-select v-model="form.preApplyId" placeholder="请选择" @change="preApplyChange">
                    <el-option
                      v-for="item in preApplyIdList"
                      :key="item.id"
                      :label="item.supplyName + '-' + item.batchNo"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="选择事业部" prop="departId">
                   <el-select v-model="form.departId" placeholder="请选择">
                    <el-option
                      v-for="item in deparmentList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="型号码" prop="sn8">
                    <el-select v-model="form.sn8" placeholder="请选择" @change="applianChange">
                        <el-option
                          v-for="(item, index) in mineList"
                          :key="index"
                          :label="item.sn8"
                          :value="item.sn8">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                   <el-table :data="tableData" style="width: 100%"   class='table mine-table'>
                    <el-table-column prop="applianceType"  label="品类" align="center"></el-table-column>
                    <el-table-column prop="sn8"  label="型号码" align="center"></el-table-column>
                    <el-table-column prop="sdkName"  label="SDK名称" align="center"></el-table-column>
                    <el-table-column prop="sdkVersion"  label="SDK版本" align="center"></el-table-column>
                    <el-table-column prop="chipShow"  label="芯片厂商" align="center"></el-table-column>
                   </el-table>
                </el-form-item>
                <!-- <el-form-item label="选择品类" prop="applianceType">
                    <el-select v-model="form.applianceType" placeholder="请选择" @change="applianChange">
                        <el-option
                          v-for="item in applianList"
                          :key="item.id"
                          :label="item.nameZh + '(' + item.type + ')'"
                          :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="型号码" prop="sn8">
                    <el-select v-model="form.sn8" placeholder="请选择">
                        <el-option
                          v-for="item in sn8List"
                          :key="item.id"
                          :label="item.sn8"
                          :value="item.sn8">
                        </el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="申请类型" prop="type">
                     <el-radio-group v-model="form.type">
                        <el-radio :label="0">liences</el-radio>
                        <el-radio :label="1">mac地址</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="申请数量" prop="nums">
                    <el-input v-model="form.nums"></el-input>
                </el-form-item>
                <el-form-item label="美的物料编码" prop="mideaCode">
                    <el-input v-model="form.mideaCode"></el-input>
                </el-form-item>
                <el-form-item label="销售渠道" prop="sellChannels">
                    <el-radio-group v-model="form.sellChannels">
                        <el-radio :label="0">天猫</el-radio>
                        <el-radio :label="1">京东</el-radio>
                        <el-radio :label="2">苏宁</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="实际售价" prop="price">
                    <el-input v-model="form.price"></el-input>
                </el-form-item>
                <el-form-item label="上传事业部下单截图" prop="departOrderUrl">
                    <el-upload drag class="upload-demo" :on-remove="uploadRemove" :accept="accept" :before-upload="beforeUpload" :http-request="uploadImgApi" :action="'dddd'" multiple :limit="1" :file-list="fileList">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" >只能上传jpg/png文件，且不超过2M</div>
                    </el-upload>
                    <el-input style="display:none" v-model="form.departOrderUrl" type="hidden"></el-input>
                </el-form-item>
                <el-form-item label="总订单量" prop="totalOrders">
                    <el-input v-model="form.totalOrders"></el-input>
                </el-form-item>
                <el-form-item label="未结订单数" prop="unFinishedOrders">
                    <el-input v-model="form.unFinishedOrders"></el-input>
                </el-form-item>
                <el-form-item>
                <div class="dialog-footer">
                    <el-button type="primary" @click="save">提 交</el-button>
                    <el-button @click="cencle">取 消</el-button>
                </div>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
import API from '@/modules/index/api/system/system.js';
import { doSubmit } from '@/modules/index/api/system/common.js';
import conHeader from '@/components/awesome/con-header/con-header';
import { dictMixin } from '@/modules/index/views/mineSystem/dictMixin';
import { applicationManagementMixin } from '@/modules/index/views/mineSystem/mixin';
import commonFun from '@/common/js/func';
import { dropDownTranslation } from '@/common/js/dropDownTranslation';
export default {
  components: {
    conHeader
  },
  mixins: [ dictMixin, applicationManagementMixin, dropDownTranslation ],
  created () {
    this.getAlldeparment();
    // this.getApplianList();
    this.getApply();
    this.getHardInfoForLicApplyList();
    this.getChipBrandJson();
  },
  data () {
    return {
      largeNums: 2147483648,
      accept: '.png, .jpg',
      mineList: [],
      tableData: [],
      fileList: [],
      form: {
        supplyId: '',
        preApplyId: '',
        departId: '',
        sn8: '',
        type: '',
        nums: '',
        mideaCode: '',
        sellChannels: '',
        price: '',
        departOrderUrl: '',
        totalOrders: '',
        unFinishedOrders: ''
      },
      rules: {
        supplyId: { required: true, message: '请选择', trigger: 'change' },
        preApplyId: { required: true, message: '请输入', trigger: 'change' },
        departId: { required: true, message: '请选择', trigger: 'change' },
        // applianceType: { required: true, message: '请输入说明', trigger: 'blur' },
        type: { required: true, message: '请选择', trigger: 'blur' },
        nums: { required: true, validator: this.checkNums, trigger: 'blur' },
        mideaCode: { required: true, validator: this.checkMideaCode, trigger: 'blur' },
        price: { required: true, validator: this.checkPrice, trigger: 'blur' },
        departOrderUrl: { required: true, message: '请上传文件', trigger: 'change' },
        totalOrders: { required: true, validator: this.checktoTalOrders, trigger: 'blur' },
        unFinishedOrders: { required: true, validator: this.checkUnFinishedOrders, trigger: 'blur' },
        sellChannels: { required: true, message: '请选择', trigger: 'blur' },
        sn8: { required: true, message: '请选择', trigger: 'change' }
      }
    };
  },
  methods: {
    uploadRemove (file, fileList) {
      debugger;
      this.form.departOrderUrl = '';
    },
    // 这里是取出对应预测单的nums值用来做校验
    preApplyChange (val) {
      if (val) {
        for (var i = 0; i < this.preApplyIdList.length; i++) {
          if (this.preApplyIdList[i].id === val) {
            this.largeNums = this.preApplyIdList[i].nums;
          }
        }
        console.log(this.largeNums);
      }
    },
    supplyIdChange (val) {
      this.form.preApplyId = '';
      if (val) {
        this.getPreApplyIdList(val);
      } else {
        this.preApplyIdList = [];
      }
    },
    applianChange (val) {
      console.log(val);
      for (var i = 0; i < this.mineList.length; i++) {
        debugger;
        if (this.mineList[i].sn8 === val) {
          this.tableData = [this.mineList[i]];
          console.log(this.tableData);
        }
      }
    },
    // 翻译芯片厂商
    fetchChipBrand (val) {
      var str = '';
      for (var i = 0; i < this.chipBrandList.length; i++) {
        if (Number(val) === this.chipBrandList[i].id) {
          str = this.chipBrandList[i].name;
        }
      };
      return str;
    },
    getHardInfoForLicApplyList () {
      API.getHardInfoForLicApply({})
      .then((res) => {
        debugger;
        this.mineList = res.result;
        for (var i = 0; i < this.mineList.length; i++) {
          debugger;
          this.mineList[i].chipShow = this.fetchChipBrand(this.mineList[i].chip) || '未录入';
        }
      });
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
            // 上传成功后直接调用后端接口
            this.form.departOrderUrl = result.result.url;
          }
        });
      } catch (e) {}
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
    save () {
      if (!doSubmit('form', this)) return;
      this.addSubmit();
      this.$emit('close', false);
    },
    addSubmit () {
      this.form.price = parseFloat(this.form.price) * 100;
      const params = {
        ...this.form,
        sdkName: this.tableData[0].sdkName,
        sdkVersion: this.tableData[0].sdkVersion,
        applianceTypeId: this.tableData[0].applianceTypeId,
        chip: this.tableData[0].chip,
        applianceType: this.tableData[0].applianceType,
        supplyName: this.limitName(this.form.supplyId, this.applyList, 'id', 'name'),
        departName: this.limitName(this.form.departId, this.deparmentList, 'id', 'name'),
        supplyCode: this.limitName(this.form.supplyId, this.applyList, 'id', 'code')
      };
      API.addLicApply(params)
         .then(res => {
           if (res.code === 0) {
             this.$router.push({name: 'applicationManagement'});
             this.$message('新增成功');
           }
         });
    },
    cencle () {
      this.$router.push({name: 'applicationManagement'});
    }
  }
};
</script>
<style lang="less">
.add-liencesp-warp{
    .el-upload-dragger{
    width: 394px;
  }
    .el-input{
      width: 50%;
    }
    .mine-table{
      margin-left: -180px;
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
