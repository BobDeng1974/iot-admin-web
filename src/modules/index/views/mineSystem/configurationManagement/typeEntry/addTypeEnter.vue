<template>
  <div class="add-type-enter-warp">
    <div class="title-userInfomation">
      <con-header :title-icon="addProductsIcon" title="产品型号信息录入" :hasBottomBorder="false"></con-header>
    </div>
    

    <div class="mine-r-table">
      <div class="tip-one">基本信息录入</div>
      <div class="eidt-type-enter-warp">
        <el-form label-width="120px" :model="addInfo" ref="form" :rules="rules">
            <el-row>
              <el-col :span="8">
                <el-form-item label="年份">
                <p>{{addInfo.year}}</p>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所属事业部">
                  <p>{{addInfo.departmentName}}</p>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="品类">
                <p>{{addInfo.typeCode}}</p>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="型号码">
                  <p>{{addInfo.sn8}}</p>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="model-number">
                  <p>{{addInfo.modelNumber}}</p>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 编辑部分 -->
            <el-row>
              <el-col :span="12">
                <el-form-item label="产品名称">
                  <el-input v-model="addInfo.productName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="型号名称">
                  <el-input v-model="addInfo.model"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="物联云平台">
                    <el-radio-group v-model="addInfo.protos">
                    <el-radio :label="item.value" v-for="(item, index) in protosList" :key="index">{{item.label}}</el-radio>
                    <el-radio :label="6">备选项</el-radio>
                    <el-radio :label="9">备选项</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="物料编码">
                  <el-input v-model="addInfo.materielCode"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="上市时间">
                  <el-input v-model="addInfo.marketTime"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="销售渠道">
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
                <el-form-item label="销售状态">
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
import { checkInfo } from '@/modules/index/views/mineDataCenter/mixin';
import { doSubmit } from '@/modules/index/api/system/common.js';
import API from '@/modules/index/api/dataCenter/dataCenter.js';
import { restData } from '@/modules/index/api/system/common.js';
export default {
  components: {
    conHeader
  },
  mixins: [checkInfo],
  data() {
    return {
      addProductsIcon: '/static/img/title_05@2x.png',
      addInfo: {},
      rules: {
        userId: {
          required: true,
          validator: this.checkUserId,
          trigger: 'blur'
        },
        mobile: { required: true, validator: this.checkMobile, trigger: 'blur' }
      }
    };
  },
  methods: {
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
  .dialog-footer{
    text-align: center;
    margin-top: 20px;
  }
  .is-required {
    .el-form-item__label:before {
      content: '' !important;
    }
  }
  .el-input {
    width: 230px;
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


