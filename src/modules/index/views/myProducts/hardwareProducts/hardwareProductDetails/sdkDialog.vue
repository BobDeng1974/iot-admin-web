<template>
  <div>
    <div class="dialog-body">

      <div class="details-table">
        <div class="" border="1" bordercolor="#ebeef5">
          <tr class="tr-row" v-for="(val, key) in tableLabel" :key="key">
            <td class="column-th">
              <span>{{val}}</span>
            </td>
            <td class="column">
              <span v-if="typeof hardwareDetail[key] !== 'object'">
                <!-- <span v-if="hardwareDetail[key]===''"></span> -->
                {{hardwareDetail[key]}}
                <span v-if="key==='wifisdkName'" class="tableclick" @click="handleChipDetails(hardwareDetail)">芯片详细信息</span>
                <span v-if="key==='luaName'" class="tableclick"><span style="padding-right:5px">未关联</span><span>去关联</span></span>

                <span v-if="key==='sdkLibName'" class="tableclick">待开发</span>
                <span v-if="key==='testKey'" class="tableclick">待分配</span>
                <span v-if="key==='正式key'" class="tableclick">待授权</span>
              </span>
              <span v-else>
                <span class="ineerSpan" v-for="(item,indexObj) in hardwareDetail[key]" :key="indexObj">{{item}}</span>
              </span>
            </td>
          </tr>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    dialogData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      hardwareDetail: {},
      tableLabel: {
        brand: '芯片品牌',
        cpuArch: '芯片CPU架构',
        departmentId: '事业部id',
        departmentName: '事业部名称',
        doc: '其他芯片资料',
        hardId: '硬件id',
        id: 'id',
        mdate: '修改时间',
        model: '芯片型号',
        os: '操作系统',
        param: '定制化编译参数',
        sdklibSize: '文件大小',
        sdklibUrl: 'sdkUrl',
        succPic: '定制化成功实例截图',
        tool: '芯片交叉编译工具包地址'
      }
      // upImgSrc: '',
    };
  },
  mounted() {
    this.getWifiSdkLib(this.dialogData);
  },
  methods: {
    // 详情
    async getWifiSdkLib(param) {
      try {
        await this.$store.dispatch('getWifiSdkLib', param).then(result => {
          if (result.code === 0) {
            this.hardwareDetail = result.result;
            // this.upImgSrc = result.result;
            // this.addSdkForm.succPic = result.result;
            debugger;
            // this.$message({
            //   message: result.message,
            //   type: 'success'
            // });
          }
        });
      } catch (e) {}
    }
  }
};
</script>
<style lang="less" scoped>
.details-table {
  border: 1px solid #eeeeee;
  width: 100%;
  margin-top: 22px;
}
.tr-row {
  border-bottom: 1px solid #eeeeee;
  height: 49px;
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
  // border-right: 1px solid #eeeeee;
  display: inline-block;
  flex: 1;
  height: 100%;
  line-height: 49px;
  text-align: left;
  padding-left: 40px;
}
.column-th {
  border-right: 1px solid #eeeeee;
  width: 200px;
  height: 100%;
  display: inline-block;
  line-height: 49px;
  text-align: left;
  padding-left: 40px;
}
.tableclick {
  font-size: 14px;
  color: #5667ff;
  padding-left: 8px;
}
.ineerSpan {
  padding: 0 10px;
}
</style>
