<template>
    <div class="info-type-enter-warp">
       <el-form :model="info" ref="form">
          <el-row>
            <el-col :span="8">
              <el-form-item label="年份">
               <p>{{info.year}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属事业部">
                <p>{{info.departmentName}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="品类">
               <p>{{info.typeCode}}</p>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="型号码">
                <p>{{info.sn8}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="model-number">
                <p>{{info.modelNumber}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="产品名称">
                <p>{{info.productName}}</p>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="型号名称">
                <p>{{info.model}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="物料编码">
                <p>{{info.materielCode}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="物联云平台">
                <p>{{fetchWord(info.protos, this.protosList)}}</p>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="销售渠道">
                <p>{{fetchWord(info.saleChannel, this.saleChannelList)}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="销售状态">
                <p>{{fetchWord(info.saleStatus, this.saleStatusList)}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="创建人">
                <p>{{info.acount}}</p>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="创建时间">
                <p>{{info.cdate}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="上市时间">
                <p>{{info.marketTime}}</p>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
    </div>
</template>

<script>
import API from '@/modules/index/api/system/system.js';
export default {
  props: {
    info: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      protosList: [
        { value: 0, label: '其他' },
        { value: 1, label: '双云-京东' },
        { value: 2, label: '双云-阿里' },
        { value: 3, label: '美的' },
        { value: 4, label: '京东单云' },
        { value: 5, label: '单云-阿里' },
        { value: 6, label: '三网通' },
        { value: 7, label: '华为' },
        { value: 8, label: '苏宁-双云' }
      ],
      saleChannelList: [
        {
          value: 0,
          label: '线上'
        },
        {
          value: 1,
          label: '线下'
        },
        {
          value: 2,
          label: '全网通'
        },
        {
          value: 3,
          label: '其他'
        }
      ],
      saleStatusList: [
        {
          value: 0,
          label: '在售'
        },
        {
          value: 1,
          label: '退市'
        },
        {
          value: 2,
          label: '续销'
        },
        {
          value: 3,
          label: '未上市'
        },
        {
          value: 4,
          label: '停产'
        }
      ]
    };
  },
  methods: {
    // 翻译
    fetchWord (val, list) {
      let str = '';
      list.forEach(element => {
        if (val === element.value) {
          str = element['label'];
        }
      });
      return str;
    }
  }
};
</script>
<style lang="less">
.info-type-enter-warp{
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
