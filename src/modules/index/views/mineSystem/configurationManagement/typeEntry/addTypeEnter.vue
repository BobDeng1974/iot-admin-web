<template>
  <div class="add-type-enter-warp">
    <div class="title-userInfomation">
      <con-header :title-icon="addProductsIcon" title="产品型号信息录入" :hasBottomBorder="false"></con-header>
    </div>


    <div class="mine-r-table">
      <div class="tip-one">基本信息录入</div>
      <div class="mine-add">
        <el-form label-width="120px" :model="addInfo" ref="form" :rules="rules">
            <el-row>
              <el-col :span="12">
                <el-form-item label="型号年份" prop="year">
                  <el-date-picker
                    v-model="addInfo.year"
                    type="year"
                    placeholder="选择年">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="对应事业部" prop="departmentId">
                  <el-select v-model="addInfo.departmentId" placeholder="请选择" @change="departMentChange" clearable>
                    <el-option v-for="item in deparmentList" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="选择品类" prop="applianId">
                  <el-select filterable v-model="addInfo.applianId" placeholder="请选择" clearable>
                    <el-option v-for="item in applianList" :key="item.id" :label="item.nameZh" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="型号码" prop="sn8">
                  <el-input v-model="addInfo.sn8"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="model-number" prop="modelNumber">
                  <el-input v-model="addInfo.modelNumber"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="产品名称" prop="productName">
                  <el-input v-model="addInfo.productName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="型号名称" prop="model">
                  <el-input v-model="addInfo.model"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="物料编码" prop="materielCode">
                  <el-input v-model="addInfo.materielCode"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="物联云平台" prop="protos">
                  <el-radio-group v-model="addInfo.protos">
                    <el-radio :label="item.value" v-for="(item, index) in protosList" :key="index">{{item.label}}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="销售渠道" prop="saleChannel">
                  <el-select v-model="addInfo.saleChannel" placeholder="请选择">
                      <el-option
                      v-for="item in saleChannelList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="销售状态" prop="saleStatus">
                  <el-select v-model="addInfo.saleStatus" placeholder="请选择">
                      <el-option
                      v-for="item in saleStatusList"
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
                <el-form-item label="上市时间" prop="marketTime">
                  <el-date-picker
                    v-model="addInfo.marketTime"
                    type="datetime"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="dialog-footer">
              <el-button type="primary" @click="save">保 存</el-button>
              <el-button @click="cencle">取 消</el-button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import conHeader from '@/components/awesome/con-header/con-header';
import { typeEnter } from '@/modules/index/views/mineDataCenter/mixin';
import API from '@/modules/index/api/system/system.js';
import { doSubmit, restData, format } from '@/modules/index/api/system/common.js';
import { dictMixin } from '@/modules/index/views/mineSystem/dictMixin';
export default {
  components: {
    conHeader
  },
  mixins: [typeEnter, dictMixin],
  created () {
    this.getDict();
  },
  data() {
    return {
      protosList: [
        { value: 1, label: '其他' },
        { value: 2, label: '双云-京东' },
        { value: 3, label: '双云-阿里' },
        { value: 4, label: '美的' },
        { value: 5, label: '京东单云' },
        { value: 6, label: '单云-阿里' },
        { value: 7, label: '三网通' },
        { value: 8, label: '华为' },
        { value: 9, label: '苏宁-双云' }
      ],
      saleChannelList: [
        {
          value: 1,
          label: '线上'
        },
        {
          value: 2,
          label: '线下'
        },
        {
          value: 3,
          label: '全网通'
        },
        {
          value: 4,
          label: '其他'
        }
      ],
      saleStatusList: [
        {
          value: 1,
          label: '在售'
        },
        {
          value: 2,
          label: '退市'
        },
        {
          value: 3,
          label: '续销'
        },
        {
          value: 4,
          label: '未上市'
        },
        {
          value: 5,
          label: '停产'
        }
      ],
      addProductsIcon: '/static/img/title_05@2x.png',
      addInfo: {
        year: '',
        departmentId: '',
        applianId: '',
        sn8: '',
        modelNumber: '',
        productName: '',
        model: '',
        protos: '',
        materielCode: '',
        marketTime: '',
        saleChannel: '',
        saleStatus: ''
      },
      rules: {
        departmentId: { required: true, message: '请选择', trigger: 'change' },
        applianId: { required: true, message: '请选择', trigger: 'change' },
        sn8: { required: true, validator: this.checkSn8, trigger: 'change' },
        modelNumber: { required: false, validator: this.checkModelNumber, trigger: 'change' },
        productName: { required: false, validator: this.checkPoductName, trigger: 'change' },
        model: { required: true, validator: this.checkModel, trigger: 'change' },
        // protos: { required: false, message: '请选择', trigger: 'change' },
        materielCode: { required: true, validator: this.checkMaterielCode, trigger: 'change' }
        // saleChannel: { required: false, message: '请选择', trigger: 'change' },
        // saleStatus: { required: false, message: '请选择', trigger: 'change' }
      }
    };
  },
  methods: {
    departMentChange (val) {
      this.addInfo.applianId = '';
      this.applianList = [];
      if (val) {
        this.getApplianListAsDpartId(val);
      } else {
        // this.applianList = [];
      }
    },
    getDict() {
      this.getAlldeparment();
      // this.getApplianList();
    },
    save () {
      if (!doSubmit('form', this)) return;
      this.addSubmit();
    },
    addSubmit () {
      this.addInfo.marketTime = this.addInfo.marketTime ? format(this.addInfo.marketTime, 'yyyy-MM-dd') : '';
      this.addInfo.year = this.addInfo.year ? format(this.addInfo.year, 'yyyy') : '';
      const params = this.addInfo;
      API.addTypeEnterInfo(params)
         .then(res => {
            if (res.code === 0) {
              this.$router.push({name: '产品型号管理'});
            }
         });
    },
    cencle () {
      this.$router.push({name: '产品型号管理'});
    }
  }
};
</script>

<style lang="less">
.add-type-enter-warp {
  .userInfomation-check {
    margin-top: 24px;
    border-bottom: 1px solid #eeeeee;
  }
  .el-radio-group{
    label{
      line-height: 40px;
    }
  }
  .dialog-footer{
    text-align: center;
    margin-top: 20px;
  }
  // .is-required {
  //   .el-form-item__label:before {
  //     content: '' !important;
  //   }
  // }
  .mine-add{
    margin-top: 24px;
  }
  .el-input {
    width: 230px !important;
  }
  .btn-select {
    text-align: right;
    margin-bottom: 20px;
  }
  .tip-one {
    // margin-top: 24px;
    line-height: 50px;
    font-size: 20px;
    font-weight: 700;
    background-color:#eeeeee;
    text-align: center;
  }
  .hasBorder {
    border-bottom: 1px solid #333333;
  }
  .user-form {
    margin-bottom: 30px;
    .el-form-item {
      margin-bottom: 0px;
    }
    .el-form-item__content {
      p {
        width: 235px;
        word-wrap: break-word;
        line-height: 30px;
        padding-top: 5px;
      }
    }
  }
}
</style>

