<template>
  <div class="equipmentDetails-info-warp">

    <div class="mine-r-table">
      <div class="tip-one">
        联网设备明细
      </div>
      <div>
        <mine-table :info="info" :tabelParameter='userParameter'></mine-table>
      </div>
    </div>

    <div v-for="(item, index) in applianList" :key="index" v-if="applianList.length" class="mine-r-table">
      <div class="tip-one">
        {{'绑定设备' + (index + 1)}}
      </div>
      <div>
        <mine-table :info="item" :tabelParameter='appParameter'></mine-table>
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
import mineTable from './mine-table';
export default {
  components: {
    conHeader,
    mineTable
  },
  mixins: [checkInfo],
  data() {
    return {
      userParameter: [
        { head: '用户id', body: 'id' },
        { head: '用户手机号', body: 'mobile' },
        { head: '昵称', body: 'nickName' },
        { head: '注册时间', body: 'registerTime' },
        { head: '邮箱', body: 'email' }
      ],
      appParameter: [],
      addProductsIcon: '/static/img/title_05@2x.png',
      formInline: {
        userId: '',
        mobile: ''
      },
      info: {
        id: '',
        mobile: '',
        nickName: '',
        registerTime: '',
        email: ''
      },
      applianList: [],
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
  // created() {
  //   // 键盘enter事件
  //   var lett = this;
  //   document.onkeydown = function(e) {
  //     var key = window.event.keyCode;
  //     if (key == 13) {
  //       lett.getInformation();
  //     }
  //   }
  // },
  methods: {
    clear() {
      restData(this.formInline);
      this.applianList = [];
      this.info = {
        id: '',
        mobile: '',
        nickName: '',
        registerTime: '',
        email: ''
      };
    },
    getInformation() {
      console.log(this.formInline);
      if (!doSubmit('form', this)) {
        this.info = {
          id: '',
          mobile: '',
          nickName: '',
          registerTime: '',
          email: ''
        };
        this.applianList = [];
        return;
      }
      // 同时校验必须至少有一条查询条件才去请求
      if (!this.formInline.userId && !this.formInline.mobile) {
        this.$message('请至少输入一条查询条件查询');
        return;
      }
      this.getInfo();
    },
    // 查询方法
    getInfo() {
      const query = {
        ...this.formInline
      };
      API.getSmartUserInfo(query)
        .then(res => {
          if (res.code === 0) {
            this.info = res.result;
            this.applianList = this.info.applianList.length
              ? this.info.applianList
              : [];
            this.initParameter(this.applianList);
          } else {
            this.info = {
              id: '',
              mobile: '',
              nickName: '',
              registerTime: '',
              email: ''
            };
            this.applianList = [];
          }
        })
        .catch(() => {
          this.info = {
            id: '',
            mobile: '',
            nickName: '',
            registerTime: '',
            email: ''
          };
          this.applianList = [];
        });
    },
    // 初始化表格参数
    initParameter(val) {
      for (var i = 0; i < val.length; i++) {
        if (val[i].activeStatus === 0) {
          val[i].activeStatusShow = '未激活';
        } else {
          val[i].activeStatusShow = '已激活';
        }
      }
      this.appParameter = [
        { head: '设备ID', body: 'applianCode' },
        { head: '设备SN', body: 'applianSn' },
        { head: '设备条码', body: 'productCode' },
        { head: '品类', body: 'applianType' },
        { head: '型号码', body: 'modelNumber' },
        { head: '绑定状态', body: 'activeStatusShow' },
        { head: '注册时间', body: 'registerTime' },
        { head: '绑定时间', body: 'activeTime' },
        { head: '绑定地点', body: 'applianPos' },
        { head: 'wifi版本号', body: 'wifiVersion' }
      ];
    }
  }
};
</script>

<style lang="less">
.equipmentDetails-info-warp {
  .userInfomation-check {
    margin-top: 24px;
    border-bottom: 1px solid #eeeeee;
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
    line-height: 70px;
    font-size: 20px;
    font-weight: 700;
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
