<template>
  <div class="page-container">
    <con-header :title-icon="productsIcon" title="详情"></con-header>
    <div class="details-top">
      <h2>当前状态：
        <span>{{tempStatus}} <span v-if="failInfo">(</span> <span style="color:red">{{failInfo}} </span> <span v-if="failInfo">)</span></span>
      </h2>
      <!-- <el-button type="primary" icon="el-icon-download">下载SDK包</el-button> -->
    </div>
    <div class="details-table">
      <div class="" border="1" bordercolor="#ebeef5">
        <tr :class="['tr-row',key]" v-for="(val, key) in tableLabel" :key="key">
          <td class="column-th">
            <span>{{val}}</span>
          </td>
          <td class="column">
            <span v-if="typeof hardwareDetail[key] !== 'object'&&key!=='luaName'">
              <!-- <span v-if="key==='sdkLibName'&&hardwareDetail[key]!==''" class="tableclick">查看详情</span> -->
              {{hardwareDetail[key]}}
              <span v-if="key==='wifisdkName'" class="tableclick" @click="handleChipDetails(hardwareDetail)">芯片详细信息</span>
              <!-- <span v-if="key==='luaName'&&hardwareDetail[key]===''" class="tableclick"><span style="padding-right:5px">未关联</span><span @click="goAssociation(hardwareDetail)">去关联</span></span> -->

              <span v-if="key==='sdkLibName'&&hardwareDetail[key]===''" class="tableclick nocursor">待开发</span>
              <span v-if="key==='sdkLibName'&&hardwareDetail[key]!==''" class="tableclick" @click="download">下载</span>
              <span v-if="key==='testKey'&&hardwareDetail[key]===''" class="tableclick nocursor">待分配</span>
              <span v-if="key==='正式key'&&hardwareDetail[key]===''" class="tableclick">待授权</span>
              <!-- <span v-if="key==='files'" class="tableclick">
                <div class="upload-wrapper">
                  <div class="upload-btn">
                    <el-upload :accept="accept" class="upload-demo" :action="'succAction'" :http-request="uploadImgApi" multiple :limit="1" :file-list="fileList" :before-upload="beforeUpload" :on-success="uploadSuccess" :on-error="uploadError" :on-remove="uploadRemove">
                      <el-button class="icon-btn" size="small" type="primary"><i class="icon-upload"></i>上传</el-button>
                      <span slot="tip" class="upload-tip">支持扩展名：.rar .zip .doc .docx .exl</span>
                    </el-upload>
                  </div>
                </div>
              </span> -->
            </span>
            <span v-else-if="typeof hardwareDetail[key] !== 'object'&& key==='luaName'">
              <span v-if="key==='luaName'&&hardwareDetail[key]===''&&tempStatus!=='待审核'" ><span class="tableclick nocursor" style="padding-right:5px">未关联</span><span v-if="tempStatus==='开发中'|| tempStatus==='申请试产'" class="tableclick" @click="goAssociation(hardwareDetail)">去关联</span><span v-else class="tableclick nocursor">去关联</span></span>
              <span v-else-if="key==='luaName'&&hardwareDetail[key]===''&&tempStatus==='待审核'" ><span  class="tableclick nocursor"  style="padding-right:5px">未关联</span><span class="tableclick nocursor" >去关联</span></span>
              <span v-else>
                {{hardwareDetail[key]}}
                <i v-if="tempStatus ==='开发中'|| tempStatus=== '新建'" class="el-icon-delete" @click="deleteLuaFile"></i>
              </span>
            </span>
            <span v-else>
              <!-- <span v-if="hardwareDetail[key]!=='object' && (tempStatus==='待审核'||tempStatus==='待开发状态'||tempStatus==='开发中')">无</span> -->
              <span v-if="key==='files'&& hardwareDetail[key]!=='object'&& (hardwareDetail[key] instanceof Array)" class="">
                <div v-if="tempStatus==='试产中' || tempStatus==='申请上线中' || tempStatus==='项目终止' || tempStatus==='开发完成'" class="upload-wrapper">
                  <div class="upload-btn">
                    <!-- :file-list="'fileList'" -->
                    <el-upload :show-file-list="false" v-if="tempStatus==='试产中'" :accept="accept" class="upload-demo" :action="'succAction'" :http-request="uploadImgApi" multiple :before-upload="beforeUpload" :on-success="uploadSuccess" :on-error="uploadError" :on-remove="uploadRemove">
                      <el-button class="icon-btn" size="small" type="primary"><i class="icon-upload"></i>上传</el-button>
                      <span slot="tip" class="upload-tip">支持扩展名：.rar .zip .doc .docx .xls .xlsx</span>
                    </el-upload>
                    <ul style="margin-top:-10px;padding-bottom:20px;">
                      <li class="up-file-li" v-for="(item, key) in fileList" :key="key"><i class="el-icon-document"></i>{{item.fileName}}<i v-if="fileList.length>0 && tempStatus==='试产中'" class="el-icon-delete up-delete" @click="deleteFile(item)"></i></li>
                    </ul>
                  </div>
                </div>
                <div v-else>无</div>
              </span>
              <span v-else class="ineerSpan" v-for="(item,indexObj) in hardwareDetail[key]" :key="indexObj">{{item}}</span>
            </span>
          </td>
        </tr>
      </div>
    </div>
    <div class="details-button">
      <el-button type="primary" v-if="failInfo==='新建审核失败，请重新填写信息，再次提交审核'" @click="edit(hardwareDetail)">编辑</el-button>
      <span v-if="tempStatus==='开发中'">
        <el-button type="primary" @click="stopProject">终止项目</el-button>
        <el-button type="primary" @click="applicationTrialProduction(applicationTrialProductionFlag)">申请试产</el-button>
      </span>
      <!-- <el-button type="primary" v-if="tempStatus==='待开发状态'" @click="stopProject">终止项目</el-button> -->
      <span v-if="tempStatus==='试产中'">
        <el-button type="primary" @click="applyLine(applyLineFlag)">申请上线</el-button>
        <!-- <el-button type="primary" v-else >申请上线</el-button> -->
        <el-button type="primary" @click="stopProject">终止项目</el-button>
      </span>
    </div>
    <mine-dialog :dialogFormVisible='flag' :width='"50%"' :modalFlag="modalFlag" @close="close" :title="title" :showClose="showClose">
      <div slot="option">
        <details-dialog :dialogData="detailData" @close="close" @handleSave="handleSave"></details-dialog>
      </div>
    </mine-dialog>

    <mine-dialog :dialogFormVisible='tableFlag' :width='"55%"' :modalFlag="tableModalFlag" @close="tClose" :title="tableTitle" :showClose="tableShowClose">
      <div slot="option">
        <lua-table :dialogData="tableLua" @close="tClose" @handleSave="tHandleSave"></lua-table>
      </div>
    </mine-dialog>
  </div>
</template>
<script>
import conHeader from '@/components/awesome/con-header/con-header';
import mineDialog from '@/modules/index/components/mine-dialog';
// import addDialog from './sdkDialog';
import detailsDialog from './detailsDialog';
import luaTable from './luaTable';
import _ from 'lodash';
// import { dropDownTranslation } from '@/common/js/dropDownTranslation';
import commonFun from '@/common/js/func';
// './../../../components/detailsTable';
// import detailsTable from './../../../../components/detailsTable';
// import myTable from './myTable';
import API from '../../../../api/myProductsData/index';
import APISystem from '@/modules/index/api/system/system.js';
// import { mapGetters } from 'vuex';
export default {
  // mixins: [dropDownTranslation],
  components: { conHeader, mineDialog, detailsDialog, luaTable },
  data() {
    return {
      applicationTrialProductionFlag: true,
      applyLineFlag: true,
      accept: '.rar, .zip ,.doc ,.docx, .xls, .xlsx',
      fileList: [],
      title: '',
      flag: false,
      // 是否显示按钮
      showClose: false,
      modalFlag: false,

      tableTitle: '',
      tableFlag: false,
      // 是否显示按钮
      tableShowClose: false,
      tableModalFlag: false,

      detailData: '',
      productsIcon: '/static/img/title_05@2x.png',
      clickData: {
        wifisdkName: '查看SDK详细信息',
        name: '点击调',
        publicStatis: '下载'
      },
      tempStatus: '',
      failInfo: '',
      tableLabel: {
        // applianceType0: '', // 3
        // subCategoryName: '', // 2
        // cateGoryName: '',
        // verifyStatus: '状态',
        applianceType: '产品分类',
        sn8: '产品型号码',
        modelNumber: 'model number',
        name: '产品名称',
        // proto: '支持协议',
        webNetworkDiscription: '联网方式',
        webProtosDiscription: '支持协议',
        // network: '联网方式',
        wifisdkName: '接入SDK',
        testKey: '测试key',
        productKey: '正式key',
        // publicStatis: '', // 新建状态
        // 批产lisence
        luaName: '对应lua协议文件',
        sdkLibName: 'SDKlib库',
        other: '其他要求',
        files: '上传文件'
      },
      applianceTypeObj: {},
      hardwareDetail: {},
      tableLua: {},
      editData: ''
    };
  },
  methods: {
    // 删除上传的文件
    deleteFile(item) {
      let params = {
        id: item.id
      };
      API.delFile(params).then(result => {
        if (result.code === 0) {
          this.$message({
            message: result.message,
            type: 'success',
            onClose: () => {
              this.getHardware();
            }
          });
        }
      });
    },
    // 删除lua文件
    deleteLuaFile() {
      let params = {
        id: this.hardwareDetail.id
      };
      API.delHardRelationLua(params).then(result => {
        if (result.code === 0) {
          this.$message({
            message: result.message,
            type: 'success',
            onClose: () => {
              this.getHardware();
            }
          });
        }
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
      debugger;
      // this.fileList = fileList;
    },
    // uploadRemove(file, fileList) {
    //   debugger;
    // },
    // 文件上传前
    beforeUpload(file) {
      return (
        commonFun.extMatch(file, this.accept, this) &&
        commonFun.extMatchSize(file, 5, this)
      );
    },
    // 上传成功
    uploadSuccess(res, file, fileList) {
      this.fileList = fileList;
    },
    // 上传SDK包调用后段接口
    uploadSDK(res, param) {
      const params = {
        sdkLibId: this.hardwareDetail.sdkLibId,
        fileUrl: res.url,
        fileName: res.originalFileName
      };
      APISystem.uploadSdkLib(params).then(result => {
        if (res.url) {
          this.fileList.push({
            name: res.fileOrginalName,
            url: res.url
          });
        }
        // this.hardwareDetail.sdkLibName = res.originalFileName;
      });
    },
    // 上传SDK包调用后段接口
    uploadPro(res, param) {
      const params = {
        hardId: this.hardwareDetail.id,
        fileUrl: res.url,
        fileName: res.originalFileName
      };
      APISystem.uploadProFile(params).then(result => {
        console.log(result);
        // this.hardwareDetail.files.push({ fileName: res.originalFileName });
        if (result.code === 0) {
          // this.fileList.push({
          //   name: res.originalFileName,
          //   url: res.url
          // });
          this.$message({
            message: result.message,
            type: 'success',
            onClose: () => {
              this.getHardware();
            }
          });
        }
      });
    },
    // 上传文件公共方法
    uploadImgApi(item) {
      // 传入参数uploadFile是后端需要的健
      let param = { uploadFile: item.file };
      this.getUpElecManagement(param);
    },
    // 上传的接口
    async getUpElecManagement(param) {
      try {
        await this.$store.dispatch('imgDoUpLoad', param).then(result => {
          if (result.code === 0) {
            this.uploadPro(result.result, param);
          }
        });
      } catch (e) {}
    },
    // 下载
    download() {
      let params = {
        id: this.hardwareDetail.sdkLibId
      };
      API.downloadSdkLib(params).then(response => {
        console.log(response.headers['content-disposition']);
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
    edit(hardwareDetail) {
      // if (!hardwareDetail.luaName) {
      //   this.$message({
      //     type: 'warning',
      //     message: '请先关联对应lua协议文件'
      //   });
      //   return;
      // }
      // debugger;
      this.$router.push({
        name: '编辑硬件产品',
        params: { editData: this.editData }
      });
    },
    // 申请试产
    againExamine() {
      let params = {
        id: this.hardwareDetail.id
      };
      API.againExamine(params).then(result => {
        if (result.code === 0) {
          this.$message({
            message: result.message,
            type: 'success',
            onClose: () => {
              this.$router.push({ name: '产品' });
            }
          });
        }
      });
    },
    // 申请试产
    applicationTrialProduction(applicationTrialProductionFlag) {
      // debugger;
      if (!this.hardwareDetail.luaName) {
        this.$message({
          type: 'warning',
          message: '请先关联对应lua脚本'
        });
        return;
      }
      // debugger;
      if (applicationTrialProductionFlag) {
        this.againExamine();
        this.applicationTrialProductionFlag = !applicationTrialProductionFlag;
      } else {
          this.$message({
          type: 'warning',
          message: '已提交申请试产，请勿重复提交'
        });
        return;
      }
    },
    // 申请上线
    getApplyLine() {
      let params = {
        id: this.hardwareDetail.id
      };
      API.applyLine(params).then(result => {
        if (result.code === 0) {
          this.$message({
            message: result.message,
            type: 'success',
            onClose: () => {
              this.$router.push({ name: '产品' });
            }
          });
        }
      });
    },
    applyLine(applyLineFlag) {
      if (this.fileList.length === 0) {
        this.$message({
          type: 'warning',
          message: '请上传文件'
        });
        return;
      }
      if (applyLineFlag) {
        this.getApplyLine();
        this.applyLineFlag = !applyLineFlag;
      } else {
          this.$message({
          type: 'warning',
          message: '已提交申请上线，请勿重复提交'
        });
        return;
      }
      // this.againExamine();
    },
    goAssociation(hardwareDetail) {
      this.tableLua = { sn8: hardwareDetail.sn8, hardId: hardwareDetail.id };
      this.tableFlag = true;
      this.tableShowClose = true;
      this.tableTitle = '对应lua协议';
    },
    close(val) {
      this.flag = val;
    },
    tClose(val) {
      this.tableFlag = val;
    },
    tHandleSave(val) {
      this.tableFlag = val.isShow;
      this.getHardware();
    },
    handleSave() {
      this.getHardware();
    },
    handleChipDetails(hardwareDetail) {
      let sdkId = hardwareDetail.sdkLibId;
      this.detailData = { id: sdkId };
      this.flag = true;
      this.showClose = true;
      this.title = '芯片信息';
    },
    handlApplianceType(data) {
      this.editData = _.cloneDeep(data);
      for (const detailKey in data) {
        if (
          detailKey === 'subCategoryName' ||
          detailKey === 'cateGoryName' ||
          detailKey === 'nameZh'
        ) {
          this.applianceTypeObj.applianceType = data.cateGoryName + '\xa0\xa0\xa0\xa0\xa0' + data.subCategoryName + '\xa0\xa0\xa0\xa0\xa0' + data.nameZh;
          // this.applianceTypeObj[detailKey] = data[detailKey];
          data.applianceType = this.applianceTypeObj;
          console.log(data.applianceType);
        }
        if (detailKey === 'proto') {
             for (let index = 0; index < this.protoArr.length; index++) {
                const element = this.protoArr[index];
                  if (data[detailKey] === element['id']) {
                  data.webProtosDiscription = element['agreement'];
                  break;
                }
              }
          // data.webProtosDiscription = commonFun.fetchWord(
          //   data[detailKey],
          //   'id',
          //   this.protoArr,
          //   'agreement'
          // );
        }
        if (detailKey === 'network') {
          for (let index = 0; index < this.networkArr.length; index++) {
                const element = this.networkArr[index];
                  if (data[detailKey] === element['id']) {
                  data.webNetworkDiscription = element['discription'];
                  break;
                }
              }
          // data.webNetworkDiscription = commonFun.fetchWord(
          //   data[detailKey],
          //   'id',
          //   this.networkArr,
          //   'discription'
          // );
        }
        if (
          detailKey === 'files' &&
          data[detailKey] !== 'object' &&
          data[detailKey] !== []
        ) {
          this.fileList = data[detailKey];
          // for (let index = 0; index < data[detailKey].length; index++) {
          //   // const tempFiles = data[detailKey][index];
          //   // if (tempFiles.filrUrl && tempFiles.fileName) {
          //     // this.fileList.splice(0, 1, {
          //     //   name: tempFiles.fileName,
          //     //   url: tempFiles.filrUrl
          //     // });
          //     this.fileList = data[detailKey];
          //   // }
          // }
        }
      }
      this.hardwareDetail = data || {};
    },
    handleTempStatus(tempStatus) {
      this.failInfo = tempStatus.failInfo;
      // this.tempStatus = tempStatus.detail.publicStatus;
      switch (tempStatus.publicStatus) {
        case 10:
          this.tempStatus = '待审核';
          break;
        case 20:
          this.tempStatus = '待开发状态';
          break;
        case 30:
          this.tempStatus = '开发中';
          break;
        case 31:
          this.tempStatus = '申请试产中';
          break;
        case 40:
          this.tempStatus = '试产中';
          break;
        case 41:
          this.tempStatus = '申请上线中';
          break;
        case 50:
          this.tempStatus = '开发完成';
          break;
        case 60:
          this.tempStatus = '项目终止';
          break;
        case 11:
          this.tempStatus = '新建';
          break;
        default:
          break;
      }
    },
    stopProject() {
      this.$confirm('此操作将终止项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.toStopProject();
        })
        .catch(() => {});
    },
    async toStopProject() {
      debugger;

      let param = {
        id: this.$route.params.id,
        applianceType: this.hardwareDetail.type,
        modelNumber: this.hardwareDetail.modelNumber,
        sn8: this.hardwareDetail.sn8
      };
      debugger;
      try {
        await this.$store.dispatch('stopProject', param).then(result => {
          if (result.code === 0) {
            this.$message({
              type: 'success',
              message: result.message,
              onClose: () => {
                this.getHardware();
              }
            });
          }
        });
      } catch (e) {}
    },
    async getHardware() {
      let param = {
        id: this.$route.params.id
      };
      try {
        await this.$store.dispatch('getHardware', param).then(result => {
          console.log(result);
          if (result.code === 0) {
            this.$nextTick(() => {
            this.handleTempStatus(result.result);
            this.handlApplianceType(result.result);
            });
          }
        });
      } catch (e) {}
    }
  },
  created() {
    // this.getNetwork();
    // this.getProtos();
  },
  computed: {
    networkArr() {
      if (this.$store.getters.networkArr.length > 0) {
        return this.$store.getters.networkArr;
      } else {
        return JSON.parse(localStorage.getItem('network'));
      }
    },
    protoArr() {
      // this.$store.getters.protoArr;
      // debugger;
      if (this.$store.getters.protoArr.length > 0) {
        return this.$store.getters.protoArr;
      } else {
        return JSON.parse(localStorage.getItem('proto'));
      }
      // return this.$store.getters.protoArr || JSON.parse(localStorage.getItem('proto'));
    }
  },
  mounted() {
    this.getHardware();
  }
};
</script>
<style lang="less" scoped>
@deep: ~'>>>';
.up-file-li {
  color: #909399;
  height: 24px;
}
.up-delete {
  // position: relative;
  top: 46px;
  z-index: 1;
  color: #909399;
  padding-left: 10px;
}
.upload-demo {
  @{deep} .el-upload-list {
    width: 300px;
  }
}
.details-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 22px;
  h2 {
    font-size: 16px;
    color: #333333;
    font-weight: 700;
    span {
      font-size: 16px;
      color: #333333;
      font-weight: 700;
    }
  }
}
.details-button {
  padding-top: 32px;
  text-align: center;
}
// 可以通过样式修改组件样式
// .details-table {
//   @{deep} .wifisdkName {
//     border: 1px solid #000;
//   }
// }

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
  &:hover {
    background-color: #f5f7fa;
  }
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
      white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
.files {
  .el-icon-document {
    // &::before {
    //   display: inline-block;
    //   content: '';
    //   width: 14px;
    //   height: 14px;
    //   background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAC0UlEQ…TlZcyNQIOlISBmCKUTd2KVEbhn/OF/tyRrSDxm/+f/3gMyuTsXGqhRnQAAAABJRU5ErkJggg==)
    //     no-repeat center center;
    //   background-size: cover;
    //   vertical-align: middle;
    // }
  }
  min-height: 49px;
  height: auto;
  .column-th {
    border-right: none;
  }
  .column {
    border-left: 1px solid #eeeeee;
  }
}
.tableclick {
  font-size: 14px;
  color: #5667ff;
  cursor: pointer;
  // padding-left: 8px;
  &.nocursor{
  cursor: inherit;
}
}
.ineerSpan {
  padding: 0 10px;
  &:first-child {
    padding-left: 0px;
  }
}

</style>

