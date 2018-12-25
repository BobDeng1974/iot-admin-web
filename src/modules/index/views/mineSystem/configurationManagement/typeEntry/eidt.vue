<template>
    <div class="eidt-type-enter-warp">
       <el-form label-width="120px" :model="eidtInfo" ref="form" :rules="rules">
          <el-row>
            <el-col :span="8">
              <el-form-item label="年份">
               <p>{{eidtInfo.year}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属事业部">
                <p>{{eidtInfo.departmentName}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="品类">
               <p>{{eidtInfo.typeCode}}</p>
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
                <p>{{eidtInfo.modelNumber}}</p>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 编辑部分 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="产品名称" prop="productName">
                <el-input v-model="eidtInfo.productName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="型号名称" prop="model">
                <el-input v-model="eidtInfo.model"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="物联云平台" prop="protos">
                  <el-radio-group v-model="eidtInfo.protos">
                  <el-radio :label="item.value" v-for="(item, index) in protosList" :key="index">{{item.label}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="物料编码" prop="materielCode">
                <el-input v-model="eidtInfo.materielCode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="上市时间" prop="marketTime">
                <!-- <el-input v-model="eidtInfo.marketTime"></el-input> -->
                <el-date-picker
                  v-model="eidtInfo.marketTime"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="销售渠道" prop="saleChannel">
                <el-select v-model="eidtInfo.saleChannel" placeholder="请选择">
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
                <el-select v-model="eidtInfo.saleStatus" placeholder="请选择">
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
        </el-form>
        <div class="dialog-footer">
            <el-button type="primary" @click="save">保 存</el-button>
            <el-button @click="cencle">取 消</el-button>
        </div>
    </div>
</template>

<script>
import API from '@/modules/index/api/system/system.js';
import { doSubmit, restData, format } from '@/modules/index/api/system/common.js';
import { typeEnter } from '@/modules/index/views/mineDataCenter/mixin';
export default {
  props: {
    eidtInfos: {
      type: Object,
      default: {}
    }
  },
  computed: {
    eidtInfo () {
      return this.eidtInfos;
    }
  },
  data () {
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
      rules: {
        productName: { required: false, validator: this.checkPoductName, trigger: 'change' },
        model: { required: true, validator: this.checkModel, trigger: 'change' },
        // protos: { required: false, message: '请选择', trigger: 'change' },
        materielCode: { required: true, validator: this.checkMaterielCode, trigger: 'change' }
        // saleChannel: { required: false, message: '请选择', trigger: 'change' },
        // saleStatus: { required: false, message: '请选择', trigger: 'change' }
      }
    };
  },
  mixins: [ typeEnter ],
  methods: {
    save () {
      if (!doSubmit('form', this)) return;
      this.addSubmit();
    },
    addSubmit () {
      const params = {
        id: this.eidtInfo.id,
        model: this.eidtInfo.model,
        marketTime: this.eidtInfo.marketTime ? format(this.eidtInfo.marketTime, 'yyyy-MM-dd') : '',
        productName: this.eidtInfo.productName,
        materielCode: this.eidtInfo.materielCode,
        saleChannel: this.eidtInfo.saleChannel,
        protos: this.eidtInfo.protos,
        saleStatus: this.eidtInfo.saleStatus
      };
      API.updateTypeEnterInfo(params)
         .then(res => {
            if (res.code === 0) {
              this.$emit('requestTable');
              this.$emit('close', false);
            }
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
      width: 230px;
    }
    .el-radio-group{
      label{
        line-height: 40px;
      }
    }
    .el-textarea{
      width: 90%;
    }
  .dialog-footer{
    text-align: right;
  }
}
</style>
