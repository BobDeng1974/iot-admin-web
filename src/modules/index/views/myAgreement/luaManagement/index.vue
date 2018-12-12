<template>
  <div class="page-container">
    <div class="page-main-con">
      <con-header :titleIcon="titleIcon1" title="LUA脚本"></con-header>
      <div class="page-main-wrapper">
        <!--条件查询容器-->
        <div class="query-wrapper clearfix">
          <el-form class="query-form" ref="query-form" :model="queryFormData" :inline="true">
            <el-row>
              <el-col :span="8">
                <el-form-item label="上传时间">
                  <el-date-picker type="date" v-model.trim="queryFormData.Cdate"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="品类">
                  <el-select @change="queryFormDataApplianceChange" v-model.trim="queryFormData.applianceTypeId" clearable style="width: 100%;">
                    <el-option v-for="item  in applianceTypeOpts" :key="item.id" :label="item.nameZh" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="型号码">
                  <el-select v-model.trim="queryFormData.sn8Value" clearable>
                    <el-option v-for="item  in sn8Opts" :key="item.id" :value="item.sn8" :label="item.sn8">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="更新时间">
                  <el-date-picker v-model="dateTimeRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="handleChangeRange">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                 <el-button v-authority="'b1_luaPageListTag'" class="pull-right query-btn" type="primary" size="medium" @click="handleQuery">查询</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <!--操作按钮容器-->
        <div class="operator-wrapper">
          <el-button class="icon-btn" type="primary" @click="handleDownloadDoc" size="small"><i class="icon-download"></i>批量下载lua文件</el-button>
          <el-button size="small" @click="luaManageCancel">取消</el-button>
          <el-button v-authority="'b1_uploadLuaTag'" class="icon-btn" type="primary" size="small" @click="addLua"><i class="icon-add"></i>上传Lua脚本</el-button>
          <el-button size="small" @click="checkMyUploads">查看我上传的</el-button>
          <el-button v-authority="'b1_downloadDemoTag'" class="icon-btn" type="primary" size="small">
            <i class="icon-download">
            </i>
            <a style="color:#fff" :href="demoDownLoad" download='luademo.lua'>demo下载</a>
          </el-button>
        </div>

        <!--Lua协议列表-->
        <div class="table-wrapper">
          <el-table @selection-change="handleSelectionChange" class="table" :data="dataList" style="width: 100%">
            <!-- <el-table-column prop="index" width="55"></el-table-column> -->
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="index" width="50" align="center" :render-header="renderIndex"></el-table-column>
            <!-- <el-table-column prop="id" label="编号" align="center" show-overflow-tooltip width="55"></el-table-column> -->
            <el-table-column prop="name" label="名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="nameZh" label="品类" show-overflow-tooltip></el-table-column>
            <!-- <el-table-column prop="applianceType" label="品类" show-overflow-tooltip></el-table-column> -->
            <el-table-column prop="sn8" label="型号码" show-overflow-tooltip></el-table-column>
            <el-table-column prop="profileName" label="profile名称" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="docName" label="电控协议名称" width="110" show-overflow-tooltip></el-table-column>
            <el-table-column label="状态" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.publicStatus===1?'开发中':'已发布'}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="cdate" label="上传时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="mdate" label="更新时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="cName" label="上传人" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button v-authority="'b1_luaDetailTag'" type="text" size="small" @click="luaDetail(scope.row)">详情</el-button>
                <el-button v-authority="'b1_luaUpdateTag'" v-if="scope.row.publicStatus===1" class="opt-btn" type="text" size="small" @click="editLua(scope.row)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!--分页查询-->
        <!-- <pagination :currentPage="pageObj.pageNo" :pageSize="pageObj.pageSize" :total="pageObj.total" @pageSize-change="handleSizeChange" @currentPage-change="handleCurrentChange">
        </pagination> -->
        <div class="myPagination">
          <el-pagination @current-change="handleCurrentChange" :page-size="pageSize" :current-page.sync="currentPage" layout="total, prev, pager, next" :total="total">
          </el-pagination>
        </div>
      </div>

      <!--上传Lua协议弹窗-->
      <!-- <el-dialog class="dialog" ref="lua-dialog" :title="title" top="10vh" width="596px" :visible.sync="showDialog" :close-on-click-modal="false" :before-close="handleClose">
        <div class="dialog-body">
          <el-form ref="lua-form" :disabled="isEidt" :model="luaFormData" :rules="luaFormRules" label-width="128px">
            <el-form-item label="名称" prop="name">
              <el-input v-model.trim="luaFormData.name"></el-input>
            </el-form-item>
            <el-form-item label="品类" prop="applianceTypeId">
              <el-select @change="dialogLuaFormDataapplianceTypeChange" v-model="luaFormData.applianceTypeId" clearable style="width: 100%;">
                <el-option v-for="item in applianceTypeOpts" :key="item.id" :label="item.nameZh" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="型号码" prop="sn8">
              <el-select v-model.trim="luaFormData.sn8" clearable style="width: 100%;">
                <el-option v-for="item  in sn8Opts" :key="item.id" :value="item.sn8" :label="item.sn8">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="对应profile文件" prop="profileName">
              <el-select v-model.trim="luaFormData.profileName" clearable style="width: 100%;">
                <el-option v-for="pro in profileNameOpts" :key="pro.id" :label="pro.name" :value="pro.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="对应电控协议" prop="docName">
              <el-select v-model.trim="luaFormData.docName" clearable style="width: 100%;">
                <el-option v-for="doc in  docNameOpts" :key="doc.id" :label="doc.name" :value="doc.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="上传lua文件" prop="luaFileName">
              <el-input type="hidden" v-model="luaFormData.luaFileName"></el-input>
              <div class="upload-wrapper">
                <div class="upload-btn">
                  <el-upload class="upload-demo" :accept="accept" :http-request="uploadImgApi" drag :action="'dddd'" multiple :limit="1" :file-list="fileList" :before-upload="beforeUpload" :on-success="uploadSuccess" :on-error="uploadError" :on-remove="uploadRemove">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">点击或将文件拖拽到这里上传或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">支持扩展名：.lua，且不超过5M</div>
                  </el-upload>
                </div>
              </div>
              <div class="file-upload" v-if="editLuaFileName">{{editLuaFileName}}</div>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" v-if="!isEidt" class="dialog-footer">
          <el-button v-if="showDialog" type="primary" @click="handleSave(eidtId)">保存</el-button>
          <el-button v-else type="primary">保存</el-button>
          <el-button v-if="showDialog" @click="handleRelease(eidtId)">发布</el-button>
          <el-button v-else>发布</el-button>
        </div>
      </el-dialog> -->
      <mine-dialog :dialogFormVisible='flag' :width='"45%"' :modalFlag="modalFlag" @close="close" :title="title" :showClose="showClose">
        <div slot="option" v-if="isAdd">
          <add-dialog @close="close" @handleSave="addHandleSave"></add-dialog>
        </div>
        <div slot="option" v-else>
          <edit-dialog :flag="flag" :isDetails="isDetails" @close="close" :editDataId="editDataId" @handleSave="handleSaveEdit"></edit-dialog>
        </div>
      </mine-dialog>
    </div>
  </div>
</template>

<script>
import conHeader from '@/components/awesome/con-header/con-header';
import pagination from '@/components/awesome/pagination/main';
import commonFun from '@/common/js/func';
import { format } from '@/modules/index/api/system/common.js';
import { dropDownTranslation } from '@/common/js/dropDownTranslation';
let demoDownLoad = require('./luademo.lua');
import addDialog from './addDialog';
import editDialog from './editDialog';
import mineDialog from '@/modules/index/components/mine-dialog';
import {
  getLuaList,
  // addLua,
  ProfileSelect,
  // getSn8Select,
  // DocSelect,
  // getLua,
  // luaUpdate,
  downloadLua
} from '../../../api/myAgreement/index';
export default {
  mixins: [dropDownTranslation],
  components: {
    'con-header': conHeader,
    pagination,
    addDialog,
    editDialog,
    mineDialog
  },
  data() {
    return {
      // 分页
      currentPage: 1,
      total: 0,
      pageSize: 5,

      isDetails: false,
      isAdd: false,
      editDataId: '',
      changeFlag: false,
      flag: false,
      // 是否显示按钮
      showClose: false,
      modalFlag: false,
      title: '',

      demoDownLoad: demoDownLoad,
      accept: '.lua',
      // title: '',
      titleIcon1: '/static/img/title_07@2x.png',
      // pageObj: {
      //   pageNo: 1,
      //   pageSize: 10,
      //   total: 0
      // },
      isPublicStatusSave: '',
      eidtId: '',
      queryFormData: {
        applianceTypeId: '',
        sn8Value: '',
        sn8Id: '',
        Cdate: '',
        applianceType: '',
        CuStart: '',
        Cuend: ''
      },
      dateTimeRange: [],
      applianceTypeOpts: [],
      sn8Opts: [],
      editLuaFileName: '',
      isEidt: false,
      dataList: [],
      showDialog: false,
      luaFormData: {
        name: '',
        applianceTypeValue: '',
        applianceTypeId: '',
        applianceType: '',
        sn8: '',
        profileName: '',
        docName: '',
        lua: '',
        luaFileName: ''
      },
      applianceTypeTemp: '',
      fileList: [],
      luaFormRules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        applianceTypeId: [
          { required: true, message: '请选择品类', trigger: 'change' }
        ],
        sn8: [{ required: true, message: '请输入型号码', trigger: 'change' }],
        profileName: [
          { required: true, message: '请选择profile文件', trigger: 'change' }
        ],
        docName: [
          { required: true, message: '请选择电控协议文件', trigger: 'change' }
        ],
        luaFileName: [
          { required: true, message: '请选择lua文件', trigger: 'change' }
        ]
      },
      profileNameOpts: [],
      docNameOpts: [],
      ids: '',
      myCuid: ''
    };
  },
  methods: {
    // 给请求回来的表格数据新增index属性（序号）
    initTableData(val) {
      if (!val && !val.length) return [];
      for (var i = 0; i < val.length; i++) {
        val[i].index = (this.currentPage - 1) * this.pageSize + i + 1;
      }
      return val;
    },
    renderIndex(h, { column, $index }) {
      return h('span', [h('span', '编号')]);
    },
    close(val) {
      this.flag = val;
    },
    addHandleSave(val) {
      this.flag = val;
      // this.getLuaDoc();
      this.getLuaListData();
    },

    handleSaveEdit(val) {
      this.flag = val;
      this.getLuaListData();
    },
    handleSelectionChange(val) {
      let idsArr = [];
      for (let index = 0; index < val.length; index++) {
        const item = val[index];
        if (item.id) {
          idsArr.push(item.id);
        }
      }
      this.ids = idsArr.join(',');
    },
    handleDownloadDoc() {
      let idArr = this.ids.split(',');

      if (!this.ids) {
        this.$message({
          message: '请勾选需要下载文件',
          type: 'warning'
        });
        return;
      }
      for (let index = 0; index < idArr.length; index++) {
        const id = idArr[index];
        this.getHandleDownloadDoc(id);
      }
    },
    // 批量下载 downloadDoc
    getHandleDownloadDoc(id) {
      let params = {
        id: Number(id)
      };

      console.log(params);
      downloadLua(params).then(response => {
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
        // console.log(res);
      });
    },
    applianceTypeChange(vId) {
      //
      this.applianceTypeTemp = this.applianceTypeOpts.find(item => {
        // 这里的userList就是上面遍历的数据源
        return item.id === vId; // 筛选出匹配数据
      });
    },

    // // 图片上传
    // uploadImgApi(item) {
    //   // 传入参数uploadFile是后端需要的健
    //   let param = { uploadFile: item.file };
    //   this.getUpAddHardware(param);
    // },
    // // 上传的接口
    // async getUpAddHardware(param) {
    //   try {
    //     await this.$store.dispatch('imgDoUpLoad', param).then(result => {
    //       if (result.code === 0) {
    //         debugger;
    //         // this.upImgSrc = result.result;
    //         // this.formData.url = result.result.url;
    //         // this.formData.fileOrginalName = result.result.originalFileName;

    //         this.luaFormData.luaFileName = result.result.originalFileName;
    //         this.luaFormData.lua = result.result.url;
    //         this.luaFormData.fileOrginalName = result.result.originalFileName;
    //         this.$message({
    //           message: result.message,
    //           type: 'success'
    //         });
    //       }
    //     });
    //   } catch (e) {}
    // },
    // uploadImgApi(item) {
    //   this.luaFormData.luaFileName = item.file.name;
    //   this.luaFormData.lua = item.file;
    //   this.luaFormData.fileOrginalName = item.file.name;

    //   // if (this.fileList !== []) {
    //   //   this.fileList = [];
    //   //   // this.fileList.splice(0, 1, {
    //   //   //   name: res.result.fileOrginalName,
    //   //   //   url: res.result.url
    //   //   // });
    //   // }
    //   this.editLuaFileName = '';
    // },
    // 选择更新时间
    handleChangeRange(val) {
      console.log(val);
      this.queryFormData.CuStart = val ? val[0] : '';
      this.queryFormData.Cuend = val ? val[1] : '';
      console.log(this.queryFormData);
    },

    // 点击查询
    handleQuery() {
      this.getLuaListData();
    },
    // 改变pageSize
    // handleSizeChange(val) {
    //   this.pageObj.pageSize = val;
    //   this.getLuaListData();
    // },
    // 改变currentPage
    handleCurrentChange(val) {
      // this.pageObj.pageNo = val;
      this.getLuaListData();
    },
    // 取消按钮
    luaManageCancel() {
      this.myCuid = '';
      this.getLuaListData();
    },
    // 查看我的上传
    checkMyUploads() {
      this.myCuid =
        this.$store.getters.userInfo.uid ||
        JSON.parse(localStorage.getItem('userInfo')).uid;
      this.getLuaListData();
    },
    // 查询Lua协议列表数据
    getLuaListData() {
      console.log(format(this.queryFormData.Cdate, 'yyyy-MM-dd'));

      let params = {
        pageNo: this.currentPage || 1,
        pageSize: this.pageSize || 5,
        departmentId:
          this.$store.getters.userInfo.departmentId ||
          JSON.parse(localStorage.getItem('userInfo')).departmentId,
        upDate: this.queryFormData.Cdate
          ? format(this.queryFormData.Cdate, 'yyyy-MM-dd')
          : '',
        sn8: this.queryFormData.sn8Value,
        // CuStart: this.queryFormData.CuStart,
        uDate: this.queryFormData.CuStart
          ? format(this.queryFormData.CuStart, 'yyyy-MM-dd')
          : '',
        // Cuend: this.queryFormData.Cuend
        uEndDate: this.queryFormData.Cuend
          ? format(this.queryFormData.Cuend, 'yyyy-MM-dd')
          : '',
        cuid: this.myCuid || '',
        applianceTypeId: this.queryFormData.applianceTypeId
      };
      //
      console.log(params);
      getLuaList(params).then(res => {
        //
        console.log(res);
        if (res.code === 0) {
          // this.dataList = res.result.data || [];
          // this.pageObj.total = res.result.total;
          this.total = res.result ? res.result.total : 0;
          this.dataList = res.result ? this.initTableData(res.result.data) : [];
        } else {
          this.dataList = [];
          this.total = 0;
        }
      });
    },
    getProfileSelect() {
      ProfileSelect().then(res => {
        if (res.code === 0) {
          this.profileNameOpts = res.result;
        }
      });
    },
    // 查询的品类联动applianceChange
    queryFormDataApplianceChange(val) {
      this.queryFormData.sn8Value = '';
      if (val) {
        this.getSn8Select({ id: val });
      } else {
        this.sn8Opts = [];
      }
    },
    // // 弹框的品类
    // dialogLuaFormDataapplianceTypeChange(val) {
    //   this.luaFormData.sn8 = '';
    //   if (val) {
    //     this.getSn8Select({ id: val });
    //   } else {
    //     this.sn8Opts = [];
    //   }
    // },
    // 对应电控协议 DocSelect
    // luaDocSelect() {
    //   let param = {
    //     id: 0
    //   };
    //   DocSelect(param).then(res => {
    //     //
    //     if (res.code === 0) {
    //       this.docNameOpts = res.result;
    //     }
    //   });
    // },
    // 新增上传Lua协议对话框
    addLua() {
      // this.getProfileSelect();
      // this.getApplianSelect();
      // this.luaDocSelect();
      // this.isEidt = false;
      // this.showDialog = true;
      // this.title = '上传LUA脚本';
      // this.sn8Opts = []; // 清除新增的sn8
      this.isAdd = true;
      this.flag = true;
      this.showClose = true;
      this.title = '上传LUA脚本';
    },
    // 点击编辑
    editLua(row) {
      // this.addLua();
      // this.isEidt = false;
      // let id = row.id;
      // this.eidtId = id;
      // this.title = '编辑脚本';
      // this.getLuaDetail(id);

      this.flag = true;
      this.showClose = true;
      this.title = '编辑脚本';
      this.isAdd = false;
      this.editDataId = row.id;
      this.isDetails = false;
    },
    luaDetail(row) {
      // this.addLua();
      // let id = row.id;
      // this.getLuaDetail(id);
      // this.isEidt = true;
      // this.title = 'lua脚本详情';

      this.flag = true;
      this.showClose = true;
      this.title = 'lua脚本详情';
      this.isAdd = false;
      this.editDataId = row.id;
      this.isDetails = true;
      // this.isDetails = false;
    },
    // // 详情
    // getLuaDetail(id) {
    //   let params = {
    //     id: id
    //   };
    //   getLua(params).then(res => {
    //     if (res.code === 0) {
    //       this.luaFormData.name = res.result.name;
    //       this.luaFormData.applianceTypeId = res.result.applianceTypeId;
    //       // this.luaFormData.applianceType = res.result.applianceType;
    //       // this.luaFormData.applianceTypeValue = res.result.applianceType;
    //       this.luaFormData.sn8 = res.result.sn8;
    //       this.luaFormData.profileName = res.result.profileId;
    //       this.luaFormData.docName = res.result.docId;
    //       this.lua = res.result.url;
    //       this.luaFormData.lua = res.result.url;
    //       this.luaFormData.fileOrginalName = res.result.fileOrginalName;
    //       this.luaFormData.luaFileName = res.result.fileOrginalName;
    //       this.editLuaFileName = res.result.fileOrginalName;
    //       // if (res.result.fileOrginalName) {
    //       //   this.fileList.splice(0, 1, {
    //       //     name: res.result.fileOrginalName,
    //       //     url: res.result.url
    //       //   });
    //       // }
    //     }
    //   });
    // },
    // // 编辑luaUpdate
    // luaUpdate(publicStatus) {
    //   let params = {
    //     id: this.eidtId,
    //     name: this.luaFormData.name,
    //     fileOrginalName: this.luaFormData.fileOrginalName,

    //     applianceTypeId: this.luaFormData.applianceTypeId,
    //     // applianceType: this.luaFormData.applianceType,
    //     applianceType: commonFun.fetchWord(
    //       this.luaFormData.applianceTypeId,
    //       'id',
    //       this.applianceTypeOpts,
    //       'type'
    //     ),
    //     sn8: this.luaFormData.sn8,
    //     profileId: this.luaFormData.profileName, //
    //     docId: this.luaFormData.docName, //
    //     // lua: this.luaFormData.lua,
    //     url: this.luaFormData.lua,
    //     muid:
    //       this.$store.getters.userInfo.uid ||
    //       JSON.parse(localStorage.getItem('userInfo')).uid,
    //     publicStatus: publicStatus
    //   };
    //   console.log(params);
    //   this.showDialog = false;
    //   // debugger;
    //   // let paramFormData = new FormData();
    //   // for (const key in params) {
    //   //   paramFormData.append(key, params[key]);
    //   // }
    //   luaUpdate(params).then(res => {
    //     console.log(res);
    //     if (res.code === 0) {
    //       this.$message({
    //         message: res.message,
    //         type: 'success',
    //         onClose: () => {
    //           commonFun.restData(this.luaFormData);
    //           this.fileList = [];
    //           this.lua = '';
    //           // this.showDialog = false;
    //           this.getLuaListData();
    //         }
    //       });
    //     }
    //   });
    // },
    // // addLua
    // // 新增Lua协议列表数据
    // getAddLua(publicStatus) {
    //   let params = {
    //     name: this.luaFormData.name,
    //     url: this.luaFormData.lua,
    //     // lua: this.luaFormData.lua,
    //     fileOrginalName: this.luaFormData.fileOrginalName,

    //     // applianceTypeId: this.applianceTypeTemp.id,
    //     applianceTypeId: this.luaFormData.applianceTypeId,
    //     // applianceType: this.applianceTypeTemp.nameZh,
    //     applianceType: commonFun.fetchWord(
    //       this.luaFormData.applianceTypeId,
    //       'id',
    //       this.applianceTypeOpts,
    //       'type'
    //     ),
    //     sn8: this.luaFormData.sn8,
    //     profileId: this.luaFormData.profileName, //
    //     docId: this.luaFormData.docName, //
    //     cuid:
    //       this.$store.getters.userInfo.uid ||
    //       JSON.parse(localStorage.getItem('userInfo')).uid,
    //     publicStatus: publicStatus
    //   };
    //   console.log(params);
    //   this.showDialog = false;
    //   // debugger;
    //   // let paramFormData = new FormData();
    //   // for (const key in params) {
    //   //   paramFormData.append(key, params[key]);
    //   // }
    //   addLua(params).then(res => {
    //     console.log(res);
    //     if (res.code === 0) {
    //       this.$message({
    //         message: res.message,
    //         type: 'success',
    //         onClose: () => {
    //           commonFun.restData(this.luaFormData);
    //           this.fileList = [];
    //           this.editLuaFileName = '';
    //           // this.showDialog = false;
    //           this.getLuaListData();
    //         }
    //       });
    //     }
    //   });
    // },
    // // 保存
    // handleSave() {
    //   this.isPublicStatusSave = 1;
    //   this.$refs['lua-form'] &&
    //     this.$refs['lua-form'].validate(valid => {
    //       if (!valid) {
    //         return;
    //       }
    //       if (this.eidtId) {
    //         this.luaUpdate(this.isPublicStatusSave);
    //       } else {
    //         this.getAddLua(this.isPublicStatusSave);
    //       }
    //     });
    // },

    // // 发布
    // handleRelease() {
    //   this.isPublicStatusSave = 2;
    //   this.$refs['lua-form'] &&
    //     this.$refs['lua-form'].validate(valid => {
    //       if (!valid) {
    //         return;
    //       }
    //       if (this.eidtId) {
    //         this.luaUpdate(this.isPublicStatusSave);
    //       } else {
    //         this.getAddLua(this.isPublicStatusSave);
    //       }
    //     });
    // },
    handleClose() {
      this.$refs['lua-form'].resetFields();
      commonFun.restData(this.luaFormData);
      Object.keys(this.luaFormData).forEach(key => {
        this.luaFormData[key] = '';
        this.editLuaFileName = '';
      });
      this.showDialog = false;
      this.fileList = [];
    }
    //   beforeUpload(file) {
    //     return (
    //       commonFun.extMatch(file, this.accept, this) &&
    //       commonFun.extMatchSize(file, 5, this)
    //     );
    //   },
    //   // 上传成功
    //   uploadSuccess(res, file, fileList) {
    //     this.editLuaFileName = '';
    //     this.fileList = fileList;
    //   },

    //   // 上传失败
    //   uploadError(err, file, fileList) {
    //     if (err) {
    //       this.$message({
    //         showClose: true,
    //         message: '文件上传失败',
    //         type: 'error'
    //       });
    //     }
    //   },

    //   // 移除文件时
    //   uploadRemove(file, fileList) {
    //     this.fileList = fileList;
    //   }
  },
  mounted() {
    this.getLuaListData();
    // this.luaGetSn8Select();
  },
  created() {
    this.getApplianSelect();
  },
  watch: {
    'luaFormData.applianceTypeId': function(nval, oval) {
      this.getSn8Select({ id: nval });
    }
  }
};
</script>

<style lang="less" scoped>
@import '../agreement.less';
.file-upload {
  overflow: hidden;
  padding-left: 4px;
  text-overflow: ellipsis;
  -webkit-transition: color 0.3s;
  transition: color 0.3s;
  white-space: nowrap;
}

</style>

