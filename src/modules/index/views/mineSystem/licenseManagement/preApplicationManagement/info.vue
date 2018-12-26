<template>
  <div class="preApplicationManagement-warp" v-loading="loading">
    <div class="details-table">
      <div class="" border="1" bordercolor="#ebeef5">
        <tr class="tr-row" v-for="(val, key) in tableLabel" :key="key">
          <td class="column-th">
            <span>{{val}}</span>
          </td>
          <td class="column">
            <span class="ineerSpan" v-if="key !== 'departOrderUrl'"> {{hardwareDetail[key]}}</span>
            <div v-else>
              <img :src="hardwareDetail[key]" alt="">
              <!-- <span > -->
              <!-- <img :src="imgKey.url" alt="" v-for="(imgKey, index) in hardwareDetail[key]" :key="index"> -->
              <!-- </span> -->
            </div>
          </td>
        </tr>
      </div>
    </div>
    <div class="dialog-footer" v-if="hardwareDetail.status !== 1 && hardwareDetail.status !== 2">
      <el-button  v-authority="'b1_preApplyCheckTag'" type="primary" @click="save(1)">审核通过</el-button>
      <el-button  v-authority="'b1_preApplyCheckTag'" @click="save(2)">拒 绝</el-button>
    </div>
  </div>
</template>
<script>
import API from '@/modules/index/api/system/system.js';
export default {
  props: {
    preApplyInfoId: {
      type: [String, Number],
      default: ''
    }
  },
  created() {
    this.initData(this.preApplyInfoId);
  },
  watch: {
    preApplyInfoId(newVal) {
      if (newVal) {
        this.initData(newVal);
      }
    }
  },
  data() {
    return {
      loading: false,
      tableLabel: {
        supplyName: '申请厂商',
        departName: '所属事业部',
        nums: '数量',
        applyStartDateStr: '申请时间',
        departOrderUrl: '事业部截图'
      },
      hardwareDetail: {
        supplyName: '申请厂商',
        departName: '所属事业部',
        nums: '数量',
        applyStartDateStr: '开始时间',
        departOrderUrl: '/static/img/title_01@2x.png'

               // departOrderUrl: [
        //   { url: '/static/img/title_01@2x.png' },
        //   { url: '/static/img/title_01@2x.png' }
        // ]
      }
    };
  },
  methods: {
    initData(val) {
      this.loading = true;
      const params = {
        id: val
      };
      API.getLicPreApplyInfo(params)
        .then(res => {
          this.loading = false;
          if (res.code === 0) {
            this.hardwareDetail = res.result ? res.result : [];
          } else {
            this.hardwareDetail = {};
          }
        })
        .catch(() => {
          this.hardwareDetail = {};
          this.loading = false;
        });
    },
    // init (val) {
    //   for (var key in val) {
    //     if (key === 'departOrderUrl') {
    //       val['departOrderUrlList'] = [{url: val[key]}];
    //     }
    //   }
    //   return val;
    // },
    save(val) {
      var tip = '';
      if (val === 1) {
        tip = '审核通过';
      } else {
        tip = '审核拒绝';
      }
      this.$confirm(`此操作将${tip}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const params = {
            id: this.preApplyInfoId,
            status: val
          };
          API.auditLicPreApplyInfo(params).then(res => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: res.message
              });
            }
            this.$emit('close', false);
            this.$emit('requestTable');
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
    }
  }
};
</script>
<style lang="less" scoped>
.preApplicationManagement-warp {
  .details-table {
    border: 1px solid #eeeeee;
    width: 100%;
    margin-top: 22px;
  }
  .dialog-footer {
    margin-top: 24px;
    text-align: right;
  }
  img {
    width: 160px;
    height: 110px;
  }
  .tr-row {
    border-bottom: 1px solid #eeeeee;
    width: 100%;
    display: flex;
    align-items: center;
    &:hover > td,
    &:hover > th {
      background-color: #f5f7fa;
    }
    &:last-child {
      // border-bottom: none;
    }
  }
  .column {
    border-left: 1px solid #eeeeee;
    display: inline-block;
    flex: 1;
    height: 100%;
    line-height: 49px;
    text-align: left;
    padding-left: 40px;
  }
  .column-th {
    // border-right: 1px solid #eeeeee;
    width: 200px;
    height: 100%;
    display: inline-block;
    line-height: 49px;
    text-align: left;
    padding-left: 40px;
  }
}
</style>
