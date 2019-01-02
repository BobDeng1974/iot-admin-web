<template>
    <div class="management-mine-warp" v-loading="loading" v-if="tableData.network">
        <div class="title-management">
            <con-header :title-icon="addProductsIcon" title="审核管理" :hasBottomBorder="true"></con-header>
        </div>
        <div class="tip-management">
          <p v-if="publicStatus === 10">当前状态：待审核</p>
          <p v-if="publicStatus === 20">当前状态：待开发</p>
          <p v-if="publicStatus === 31">当前状态：申请试产中</p>
          <p v-if="publicStatus === 41">当前状态：申请上线中</p>
          <!-- <p v-if="publicStatus === 42">当前状态：申请上线中</p> -->
        </div>
        <div style="position: relative;">
          <div>
            <mine-table :tableData="tableData" :ignoreDatas="ignoreDatas" :tableLabel="tableLabel" :clickData="clickData" @detailTableClick="detailTableClick"></mine-table>
          </div>
          <div class="one" v-if="publicStatus === 20">
            <el-upload :accept="accept" :show-file-list="false" class="upload-demo" :http-request="uploadImgApi" :action="'dddd'" multiple :limit="5" :file-list="fileList" :before-upload="beforeUpload" :on-success="uploadSuccess" :on-error="uploadError" :on-remove="uploadRemove">
              <el-button class="icon-btn" size="small" type="primary"><i class="icon-upload"></i>上传</el-button>
              <span slot="tip" class="upload-tip">支持扩展名：.rar .zip .doc .docx .xlsx .xls</span>
            </el-upload>
          </div>
          <!-- <div class="two" v-if="publicStatus === 4">
            <el-upload :accept="accept" :show-file-list="false" class="upload-demo" :http-request="uploadImgApi" :action="'dddd'" multiple :limit="5" :file-list="fileList" :before-upload="beforeUpload" :on-success="uploadSuccess" :on-error="uploadError" :on-remove="uploadRemove">
              <el-button class="icon-btn" size="small" type="primary"><i class="icon-upload"></i>上传</el-button>
              <span slot="tip" class="upload-tip">支持扩展名：.rar .zip .doc .docx .exl</span>
            </el-upload>
          </div> -->
        </div>
        <!-- 底部按钮 -->
        <div class="btn-select">
          <div v-if="publicStatus === 20">
            <el-button type="primary" @click="passClick(0)">保存进入开发中</el-button>
          </div>
          <div v-else>
            <el-button type="primary" @click="passClick(0)">{{publicStatus === 41 ? '完成审核' : '审核通过'}}</el-button>
            <el-button @click="cancelClick(1)">不通过</el-button>
          </div>
        </div>
        <mine-dialog :dialogFormVisible='flag' :width='width' :modalFlag="modalFlag" @close="close"  :title="title" :showClose="showClose">
          <div slot="option" v-if="btnType">
            <div class="tip-mine-info">请确认审核{{submitFlag === 0 ? '通过' : '不通过'}}</div>
            <div class="two-btn-warp">
              <el-button type="primary" @click="btnClick(submitFlag)" >确 定</el-button>
            </div>
          </div>
          <div slot="option" v-else>
            <details-dialog :dialogData="detailData" @close="close"></details-dialog>
          </div>
        </mine-dialog>
    </div>
</template>

<script>
import ls from '@/utils/storage/local_storage';
import mineDialog from '@/modules/index/components/mine-dialog';
import conHeader from '@/components/awesome/con-header/con-header';
import mineTable from '@/modules/index/components/mine-table';
import API from '@/modules/index/api/system/system.js';
import { dictMixin } from '@/modules/index/views/mineSystem/dictMixin';
import commonFun from '@/common/js/func';
import detailsDialog from '@/modules/index/views/myProducts/hardwareProducts/hardwareProductDetails/detailsDialog';
export default {
  components: {
    mineTable,
    conHeader,
    mineDialog,
    detailsDialog
  },
  mixins: [ dictMixin ],
  created () {
    this.initDataFrist();
    // this.$store.dispatch('getProtos', { id: 0 });
    // this.$store.dispatch('getNetwork', { id: 0 });
    // this.getInfo();
  },
  data () {
    return {
      width: '30%',
      detailData: '',
      accept: '.rar, .zip, .doc, .docx, .xlsx, .xls',
      loading: false,
      addProductsIcon: '',
      publicStatus: 0,
      id: '',
      tableLabel: {},
      ignoreDatas: {},
      tableData: {},
      clickData: {},
      fileList: [],
      // 控制弹框显影
      flag: false,
      // 是否显示按钮
      showClose: true,
      modalFlag: false,
      title: '提示',
      submitFlag: 0,
      btnType: true
    };
  },
 computed: {
    networkArr() {
      if (this.$store.getters.networkArr.length > 0) {
        return this.$store.getters.networkArr;
      } else {
        return JSON.parse(ls.getItem('network'));
      }
    },
    protoArr() {
      if (this.$store.getters.protoArr.length > 0) {
        return this.$store.getters.protoArr;
      } else {
        return JSON.parse(ls.getItem('proto'));
      }
    }
  },
  methods: {
    async initDataFrist () {
      await this.$store.dispatch('getProtos', { id: 0 });
      await this.$store.dispatch('getNetwork', { id: 0 });
      this.getInfo();
    },
    // 上线文件下载
    downLoadUpFile (file) {
      API.downFileUp({ids: file})
      .then(response => {
        let tempNameStr = response.headers['content-disposition'].split(';')[1];
        let fileName = tempNameStr.split('=')[1];
        let blob = new Blob([response.data]);
        let objectUrl = URL.createObjectURL(blob);
        let link = document.createElement('a');
        link.style.display = 'none';
        link.href = objectUrl;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
      });
    },
    // lua文件下载
    downloadLuaFile (file) {
      API.downloadLuaFile({id: file})
      .then(response => {
        let tempNameStr = response.headers['content-disposition'].split(';')[1];
        let fileName = tempNameStr.split('=')[1];
        let blob = new Blob([response.data]);
        let objectUrl = URL.createObjectURL(blob);
        let link = document.createElement('a');
        link.style.display = 'none';
        link.href = objectUrl;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
      });
    },
    // 表格发送出来的方法
    detailTableClick(val) {
      debugger;
      switch (val.state) {
        // 分配正式key
        case 'productKey':
          this.tableData.productKey = this.tableData.testKey;
          break;
        // 芯片详情弹框
        case 'wifisdkName':
          this.btnType = false;
          this.width = '60%';
          this.handleChipDetails(val);
          break;
        // 分配测试key调用后段接口
        case 'testKey':
          this.distributKey(val);
          break;
        // 上线文件下载
        case 'files':
          this.downLoadUpFile(val.ids);
          break;
        // lua文件下载
        case 'luaName':
          this.downloadLuaFile(val.ids);
          break;
      }
    },
    handleChipDetails(hardwareDetail) {
      let sdkId = hardwareDetail.sdkLibId;
      this.detailData = { id: sdkId };
      this.flag = true;
      this.showClose = true;
      this.title = '芯片信息';
    },
    close (val) {
      this.flag = val;
    },
    // 分配key调用接口
    distributKey (val) {
      console.log(val);
      debugger;
      const params = {
        applianceType: val.applianceType,
        sn8: val.sn8,
        hardId: val.id,
        modelNumber: val.modelNumber
      };
      API.distributionKey(params)
      .then(res => {
        this.tableData.testKey = res.result.key;
      });
    },
    // 文件上传前
    beforeUpload(file) {
      return commonFun.extMatch(file, this.accept, this) && commonFun.extMatchSize(file, 5, this);
    },
    // 上传成功
    uploadSuccess(res, file, fileList) {
      // this.fileList = fileList;
    },
    // 上传SDK包调用后段接口
    uploadSDK (url, param) {
      const params = {
        sdkLibId: this.tableData.sdkLibId,
        sdklibUrl: url,
        fileName: param.uploadFile.name
      };
      API.uploadSdkLib(params)
      .then(res => {
        this.tableData.sdkLibName = param.uploadFile.name;
      });
    },
    // 上传SDK包调用后段接口
    uploadPro (url, param) {
      const params = {
        hardId: this.tableData.id,
        fileUrl: url,
        fileName: param.uploadFile.name
      };
      API.uploadProFile(params)
      .then(res => {
        this.tableData.files.push({fileName: param.uploadFile.name});
      });
    },
    // 上传失败
    uploadError(err, file, fileList) {
      if (err) {
        this.$message({
          showClose: true,
          message: '文件上传失败',
          type: 'error'
        });
      }
    },
    // 移除文件时
    uploadRemove(file, fileList) {
      this.fileList = fileList;
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
            if (this.publicStatus === 20) {
              this.uploadSDK(result.result.url, param);
            } else {
              this.uploadPro(result.result.url, param);
            }
          }
        });
      } catch (e) {}
    },
    // 获取信息
    async getInfo () {
      this.loading = true;
      // await this.getNetworkList();
      // await this.getProtosList();
      this.id = this.$route.params.id;
      const params = {
        id: this.id
      };
      API.getHardware(params)
      .then(res => {
        this.$nextTick(() => {
          this.publicStatus = res.result.publicStatus;
          this.creadData(res.result);
        });
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
    },
    // 翻译
    fetchWord (val, list, c) {
      let str = '';
      list.forEach(element => {
        if (val === element.id) {
          str = element[c];
        }
      });
      return str;
    },
    // 处理请求回来的数据
    initData (clickData, ignoreDatas, val) {
      this.clickData = clickData;
      this.ignoreDatas = ignoreDatas;
      const arr = this.initMineTable(val);

      this.tableData = arr;
      // this.$nextTick(() => {
      //    this.tableData = arr;
      //   });
      this.tableData.applianceType = this.tableData.cateGoryName + '/' + this.tableData.subCategoryName + '/' + this.tableData.nameZh;
      // this.tableData.network = this.fetchWord(this.tableData.network, this.networkList, 'discription');
      // this.tableData.proto = this.fetchWord(this.tableData.proto, this.protosList, 'agreement');
    },
    initMineTable (val) {
      for (var key in val) {
        switch (key) {
          case 'sdkLibName':
            val[key] = val[key] ? val[key] : '待上传';
            break;
          case 'testKey':
            val[key] = val[key] ? val[key] : '待分配';
            break;
          case 'productKey':
            val[key] = val[key] ? val[key] : '待授权';
            break;
          case 'luaName':
            val[key] = val[key] ? val[key] : '未关联';
            break;
          case 'other':
            val[key] = val[key] ? val[key] : '无';
            break;
          case 'network':
            // this.$nextTick(() => {
            // val[key] = this.fetchWord(val[key], this.networkList, 'discription');

            // debugger;
            // });
            val[key] = this.fetchWord(val[key], this.networkArr, 'discription');
            break;
          case 'proto':
          // this.$nextTick(() => {
            //  val[key] = this.fetchWord(val[key], this.protosList, 'agreement');
          //    debugger;
          //   });
            val[key] = this.fetchWord(val[key], this.protoArr, 'agreement');
            break;
        }
      }
      return val;
    },
    // 初始化请求回来的信息
    creadData (val) {
      switch (this.publicStatus) {
        case 10:
          this.tableLabel = {
            applianceType: '产品分类',
            name: '产品名称',
            sn8: '产品型号码',
            'modelNumber': 'model number',
            network: '联网方式',
            proto: '支持协议',
            wifisdkName: '接入SDK包',
            sdkLibName: 'SDKlib库',
            testKey: '测试key',
            productKey: '正式key',
            luaName: '对应lua协议文件',
            other: '其他要求'
          };
          const clickData1 = {
            wifisdkName: '芯片详情',
            luaName: '下载'
          };
        // this.$nextTick(() => {
        //   this.initData(clickData1, {aaa: ''}, val);
        // });
          this.initData(clickData1, {aaa: ''}, val);
        break;
        case 20:
          this.tableLabel = {
            applianceType: '产品分类',
            name: '产品名称',
            sn8: '产品型号码',
            'modelNumber': 'model number',
            network: '联网方式',
            proto: '支持协议',
            wifisdkName: '接入SDK包',
            sdkLibName: 'SDKlib库',
            testKey: '测试key',
            productKey: '正式key',
            luaName: '对应lua协议文件',
            other: '其他要求'
          };
          const clickData2 = {
            sdkLibName: '上传',
            testKey: '分配',
            wifisdkName: '芯片详情',
            luaName: '下载'
          };
        // this.$nextTick(() => {
        //   this.initData(clickData2, {aaa: ''}, val);
        // });
          this.initData(clickData2, {aaa: ''}, val);
        break;
        case 31:
          this.tableLabel = {
            applianceType: '产品分类',
            name: '产品名称',
            sn8: '产品型号码',
            'modelNumber': 'model number',
            network: '联网方式',
            proto: '支持协议',
            wifisdkName: '接入SDK包',
            sdkLibName: 'SDKlib库',
            testKey: '测试key',
            productKey: '正式key',
            luaName: '对应lua协议文件',
            other: '其他要求'
          };
          const clickData3 = {
            productKey: '分配',
            wifisdkName: '芯片详情',
            luaName: '下载'
          };
        //   this.$nextTick(() => {
        //   this.initData(clickData3, {aaa: ''}, val);
        // });
          this.initData(clickData3, {aaa: ''}, val);
        break;
        case 41:
          this.tableLabel = {
            applianceType: '产品分类',
            name: '产品名称',
            sn8: '产品型号码',
            'modelNumber': 'model number',
            network: '联网方式',
            proto: '支持协议',
            wifisdkName: '接入SDK包',
            sdkLibName: 'SDKlib库',
            testKey: '测试key',
            productKey: '正式key',
            luaName: '对应lua协议文件',
            files: '上线文件'
          };
          const clickData4 = {
            wifisdkName: '芯片详情',
            luaName: '下载'
          };
        // this.$nextTick(() => {
        //   this.initData(clickData4, {files: []}, val);
        // });
          this.initData(clickData4, {files: []}, val);
        break;
      }
    },
    // 审核通过校验
    checkPass () {
      var flag = false;
      switch (this.publicStatus) {
        case 10: // 待审核
          // if (this.tableData.luaName === '' || this.tableData.luaName === '未关联') {
          //   flag = false;
          //   this.$message({
          //     message: '请等待关联完成再审核',
          //     type: 'warning'
          //   });
          // } else {
          //   flag = true;
          // }
          flag = true;
          break;
        case 20: // 待开发
          if (this.tableData.testKey === '待分配' || this.tableData.testKey === '') {
            flag = false;
            this.$message({
              message: '请分配测试key',
              type: 'warning'
            });
          } else if (this.tableData.sdkLibName === '待上传' || this.tableData.sdkLibName === '') {
            flag = false;
            this.$message({
              message: '请上传sdkLib文件',
              type: 'warning'
            });
          } else {
            flag = true;
          }
          break;
        case 31: // 开发中
          if (this.tableData.productKey === '待授权' || this.tableData.productKey === '') {
            flag = false;
            this.$message({
              message: '请分配正式key',
              type: 'warning'
            });
          } else {
            flag = true;
          }
          break;
        case 41: // 试产中
          // if (this.tableData.luaName === '' || this.tableData.luaName === '未关联') {
          //   flag = false;
          //   this.$message({
          //     message: '请等待关联lua协议文件完成再审核',
          //     type: 'warning'
          //   });
          // } else {
          flag = true;
          // }
          break;
      }
      return flag;
    },
    // 审核通过
    passClick (val) {
      if (!this.checkPass()) return;
      // this.btnClick(val);
      this.btnType = true;
      this.submitFlag = val;
      this.flag = true;
      this.width = '30%';
      this.title = '提示';
    },
    // 审核不通过
    cancelClick (val) {
      this.flag = true;
      this.btnType = true;
      this.submitFlag = val;
      this.width = '30%';
      this.title = '提示';
      // this.btnClick(val);
    },
    // 通过不通过公用接口
    btnClick (val) {
      const params = {
        hardId: this.tableData.id,
        publicStatus: this.tableData.publicStatus,
        buttonType: val,
        productKey: this.tableData.productKey,

        applianceType: this.tableData.type,
        sn8: this.tableData.sn8,
        modelNumber: this.tableData.modelNumber
      };
      console.log(params);
      debugger;
      API.examineHard(params)
      .then(res => {
        this.$router.push({name: '硬件审核'});
      });
    }
  }
};
</script>

<style lang="less" scoped>
.el-dialog__body{
  .tip-mine-info{
    margin: 0 20px 20px 20px;
  }
  .two-btn-warp{
    text-align: center;
  }
}
.management-mine-warp{
    .one{
      position: absolute;
      /* top: 58px; */
      bottom: 210px;
      right: 200px;
    }
    .two{
      position: absolute;
      /* top: 58px; */
      bottom: 10px;
      right: 200px;
    }
    .tip-management{
        padding: 16px 0 0 0;
       p{
         line-height: 44px;
         height: 44px;
         font-size: 16px;
         font-weight: 700;
         color: #333333;
       }
    }
    .btn-select{
      text-align: center;
      padding: 32px 0;
    }
}
</style>
