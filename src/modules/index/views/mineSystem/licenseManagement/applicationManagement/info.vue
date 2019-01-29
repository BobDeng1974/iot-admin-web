<template>
  <div class="applicationManagement-warp">
    <div class="details-table">
      <div class="" border="1" bordercolor="#ebeef5">
        <tr :class="['tr-row',key]" v-for="(val, key) in tableLabel" :key="key">
          <div v-if="key !== 'tabelList'">
            <td class="column-th">
              <span>{{val}}</span>
            </td>
            <td class="column">
              <span class="ineerSpan" v-if="key !== 'departOrderUrl' && key !== 'licDownloadName'"> {{hardwareDetail[key]}}</span>
              <div v-if="key === 'departOrderUrl'">
                <img :src="hardwareDetail[key]?hardwareDetail[key]:defaultImage" alt="">
                <!-- <img :src="imgKey.url" alt="" v-for="(imgKey, index) in hardwareDetail[key]" :key="index"> -->
              </div>
              <div v-if="key === 'licDownloadName'">
                <!-- <span v-if="hardwareDetail[key]==='文件包正在生成中，请在提交时间半个小时后打开本页面下载'" v-authority="'b1_licDownloadTag'" > {{hardwareDetail[key]}}</span> -->
                <!-- <span v-else> -->
                  <span :class="[hardwareDetail[key]==='文件包正在生成中，请在提交时间半个小时后打开本页面下载' ?'liceseLoadName':'']">{{hardwareDetail[key]}}</span>
                  <!-- <span v-show="hardwareDetail[key]!=='文件包正在生成中，请在提交时间半个小时后打开本页面下载'" @click="downLoad(hardwareDetail['id'])" class="clickBtn" v-if="hardwareDetail[key]"> 下载 </span> -->

                  <!-- <span v-show="hardwareDetail[key]!=='文件包正在生成中，请在提交时间半个小时后打开本页面下载'" @click="downLoad(hardwareDetail['id'])" class="clickBtn" v-if="hardwareDetail[key]"> 下载 </span> -->
                  <!-- <span v-show="hardwareDetail[key]!=='文件包正在生成中，请在提交时间半个小时后打开本页面下载'" class="clickTime" v-if="hardwareDetail[key]"> {{'(' + hardwareDetail['licDownloadTimes'] + ')'}} </span> -->
                <!-- </span> -->
                <!-- <span :class="[hardwareDetail[key]==='文件包正在生成中，请在提交时间半个小时后打开本页面下载' ?'liceseLoadName':'']">{{hardwareDetail[key]}}</span>
                <span v-show="hardwareDetail[key]!=='文件包正在生成中，请在提交时间半个小时后打开本页面下载'" @click="downLoad(hardwareDetail['id'])" class="clickBtn" v-if="hardwareDetail[key]"> 下载 </span>
                <span v-show="hardwareDetail[key]!=='文件包正在生成中，请在提交时间半个小时后打开本页面下载'" class="clickTime" v-if="hardwareDetail[key]"> {{'(' + hardwareDetail['licDownloadTimes'] + ')'}} </span> -->
                <!-- <div v-for="(downItem, index1) in hardwareDetail[key]" :key="index1">
                        <span>{{downItem.name}}</span> <span @click="downLoad(downItem.downUrl)" class="clickBtn"> 下载 </span>
                      </div> -->
              </div>
            </td>
          </div>
          <div v-else style="width: 100%">
            <el-table :data="hardwareDetail[key]" style="width: 100%">
              <el-table-column prop="mideaCode" label="美的物料编码" align="center"></el-table-column>
              <el-table-column prop="sellChannels" label="销售渠道" align="center"></el-table-column>
              <el-table-column prop="price" label="实际售价" align="center"></el-table-column>
              <el-table-column prop="totalOrders" label="总订单量" align="center"></el-table-column>
              <el-table-column prop="unFinishedOrders" label="未结订单数" align="center"></el-table-column>
            </el-table>
          </div>
        </tr>
      </div>
    </div>
    <div class="dialog-footer"  v-if="hardwareDetail.status !== '拒绝' && hardwareDetail.status !== '审核通过'">
      <el-button v-authority="'b1_applyCheckTag'" type="primary" @click="save(1)">审核通过</el-button>
      <el-button v-authority="'b1_applyCheckTag'" @click="save(2)">拒 绝</el-button>
    </div>
  </div>
</template>
<script>
import API from '@/modules/index/api/system/system.js';
import ls from '@/utils/storage/local_storage.js';
import { getToken } from '@/utils/auth';
import defaultImage from './../../../../../../../static/img/default.png';
// const { APPLICATION_NAME } = window.environment.iotserver;
// import '@/modules/index/views/mineSystem/configurationManagement/documentManagement/static/js/zTree/jquery-3.3.1.min';
export default {
  props: {
    applyInfoId: {
      type: [String, Number],
      default: ''
    }
  },
  created() {
    this.initData(this.applyInfoId);
  },
  watch: {
    applyInfoId(newVal) {
      if (newVal) {
        this.initData(newVal);
      }
    }
  },
  data() {
    return {
      defaultImage: defaultImage,
      loading: false,
      tableLabel: {
        status: '状态',
        supplyName: '申请厂商',
        type: '申请类型',
        nums: '申请数量',
        departName: '事业部',
        applianceTypeSn8: '品类及型号码',
        // licDownloadUrl: 'license文件包',
        licDownloadName: 'license文件包',
        applyUserNameAcount: '申请人及联系方式',
        tabelList: '',
        applyTime: '提交时间',
        departOrderUrl: '事业部截图 '
      },
      hardwareDetail: {
        status: '状态',
        supplyName: '申请厂商',
        type: '申请类型',
        nums: '申请数量',
        departName: '事业部',
        applianceTypeSn8: '品类及型号码',
        licDownloadUrl: [
          { downUrl: '/static/img/title_01@2x.png', name: '附件1' },
          { downUrl: '/static/img/title_01@2x.png', name: '附件2' }
        ],
        applyUserNameAcount: '申请人及联系方式',
        applyTime: '提交时间',
        // departOrderUrl: [
        //   { url: '/static/img/title_01@2x.png' },
        //   { url: '/static/img/title_01@2x.png' }
        // ],
        departOrderUrl: '/static/img/title_01@2x.png',
        tabelList: [
          { a: '1', b: '1', c: '1', d: '1', e: '1' },
          { a: '2', b: '2', c: '2', d: '2', e: '2' }
        ]
      }
    };
  },
  methods: {
    downLoad(val) {
      let params = { id: val, accessToken: getToken() };
      let paramFormData = new FormData();
      for (const key in params) {
        paramFormData.append(key, params[key]);
      }
      API.downloadLic(paramFormData).then(response => {
        console.log(response, 'responseresponseresponseresponse');
        if (response.headers && response.headers['content-disposition']) {
          let tempNameStr = response.headers['content-disposition'].split(
            ';'
          )[1];
          let fileName = tempNameStr.split('=')[1];
          let blob = new Blob([response.data]);
          let objectUrl = URL.createObjectURL(blob);
          let link = document.createElement('a');
          link.style.display = 'none';
          link.href = objectUrl;
          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();
          this.hardwareDetail.licDownloadTimes++;
        } else {
          this.$message('license非法下载异常');
        }
      });
    },
    initData(val) {
      this.loading = true;
      const params = {
        id: val
      };
      API.getLicApplyInfo(params)
        .then(res => {
          console.log(res, '获取详情信息');
          let licDownloadUrlFlay = true;
          const buttonFlag = ls.getObject('buttonFlag');
            if (buttonFlag) {
                if (buttonFlag.indexOf('b1_licDownloadTag') > -1) {
                        licDownloadUrlFlay = true;
                      } else {
                        licDownloadUrlFlay = false;
              }
              }

          this.loading = false;
          if (res.code === 0) {
            if (!res.result.licDownloadUrl && res.result.status === 1 && licDownloadUrlFlay) {
              res.result.licDownloadUrl = '文件包正在生成中，请在提交时间半个小时后打开本页面下载';
            }
            this.hardwareDetail = res.result ? this.initTabel(res.result) : [];
            console.log(this.hardwareDetail);
            debugger;
          } else {
            this.hardwareDetail = {};
          }
        })
        .catch(() => {
          this.hardwareDetail = {};
          this.loading = false;
        });
    },
    initTabel(val) {
      let obj = {};
      for (var key in val) {
        switch (key) {
          // 将获取回来的数据组装成数组
          case 'mideaCode':
            obj[key] = val[key];
            break;
          case 'sellChannels':
            // obj[key] = val[key];
            if (val[key] === 0) {
              obj[key] = '天猫';
            } else if (val[key] === 1) {
              obj[key] = '京东';
            } else {
              obj[key] = '苏宁';
            }
            break;
          case 'price':
            obj[key] = parseFloat(val[key]) / 100;
            break;
          case 'totalOrders':
            obj[key] = val[key];
            break;
          case 'unFinishedOrders':
            obj[key] = val[key];
            break;
          // 翻译状态
          case 'status':
            if (val[key] === 0) {
              val[key] = '待审核';
            } else if (val[key] === 1) {
              val[key] = '审核通过';
            } else {
              val[key] = '拒绝';
            }
            break;
          // 翻译申请类型
          case 'type':
            if (val[key] === 0) {
              val[key] = 'license';
            } else if (val[key] === 1) {
              val[key] = 'mac';
            }
            break;
          // 截取url获取附件名
          case 'licDownloadUrl':
            const arr = val[key].split('/');
            val['licDownloadName'] = arr[arr.length - 1];
            break;
          // 品类及型号码拼接
          case 'applianceType':
            val['applianceTypeSn8'] =
              val['applianceType'] + '_' + String(val['sn8']);
            break;
          // 联系人以及联系方式拼接
          case 'applyUserName':
            val['applyUserNameAcount'] =
              val['applyUserName'] +
              '-(' +
              (val['applyUserAccount'] ? val['applyUserAccount'] : '无') +
              ')';
            break;
        }
      }
      val.tabelList = [obj];
      return val;
    },
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
            id: this.applyInfoId,
            status: val
          };
          API.auditLicApplyInfo(params).then(res => {
            debugger;
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
.applicationManagement-warp {
  .liceseLoadName{
    color: red;
  }
  .details-table {
    border: 1px solid #eeeeee;
    width: 100%;
    // margin-top: 22px;
  }
  .clickBtn {
    color: blue;
    margin-left: 10px;
    cursor: pointer;
  }
  .clickTime {
    margin-left: 10px;
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
    // height: 49px;
    width: 100%;
    display: flex;
    align-items: center;
    &:hover > td,
    &:hover > th {
      background-color: #f5f7fa;
    }
    &:hover >div{
      background-color: #f5f7fa;
      width: 100%;
    }
    &:last-child {
      // border-bottom: none;
    }
    &.tabelList{
      border-bottom: none;
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
