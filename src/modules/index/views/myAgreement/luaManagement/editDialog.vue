<template>
  <div>

    <div class="dialog-body">
      <el-form ref="lua-form" :disabled="isDetails" :model="luaFormData" :rules="luaFormRules" label-width="128px">
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
        <!-- <el-form-item label="型号码" prop="sn8">
              <el-input v-model.trim="luaFormData.sn8"></el-input>
            </el-form-item> -->
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
          <div class="upload-wrapper addlua-upload">
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
    <div slot="footer" v-if="!isDetails"  class="dialog-footer">
      <el-button type="primary" @click="handleSave()">保存</el-button>
      <el-button @click="handleRelease()">发布</el-button>

    </div>
  </div>
</template>
<script>
import commonFun from '@/common/js/func';
import {
  // getLuaList,
  // addLua,
  ProfileSelect,
  // getSn8Select,
  DocSelect,
  getLua,
  luaUpdate
  // downloadLua
} from '../../../api/myAgreement/index';
import { dropDownTranslation } from '@/common/js/dropDownTranslation';
export default {
  props: {
    isDetails: {
      type: Boolean
    },
    editDataId: {
      type: Number
    },
    flag: {
      type: Boolean
    }
  },
  mixins: [dropDownTranslation],
  data() {
    return {
      docNameOpts: [],
      profileNameOpts: [],
      accept: '.lua',
      editLuaFileName: '',
      fileList: [],
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
      }
    };
  },
  watch: {
    'luaFormData.applianceTypeId': function(nval, oval) {
      this.getSn8Select({ id: nval });
    },
    flag: {
      handler(nowVal, oldVal) {
        if (nowVal === true) {
          this.getLuaDetail();
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.getProfileSelect();
    this.getApplianSelect();
    this.luaDocSelect();
  },
  mounted() {
    this.getLuaDetail();
  },
  methods: {
    // 详情
    getLuaDetail() {
      let params = {
        id: this.editDataId
      };
      getLua(params).then(res => {
        if (res.code === 0) {
          this.luaFormData.name = res.result.name;
          this.luaFormData.applianceTypeId = res.result.applianceTypeId;
          // this.luaFormData.applianceType = res.result.applianceType;
          // this.luaFormData.applianceTypeValue = res.result.applianceType;
          this.luaFormData.sn8 = res.result.sn8;
          this.luaFormData.profileName = res.result.profileId;
          this.luaFormData.docName = res.result.docId;
          this.lua = res.result.url;
          this.luaFormData.lua = res.result.url;
          this.luaFormData.fileOrginalName = res.result.fileOrginalName;
          this.luaFormData.luaFileName = res.result.fileOrginalName;
          // this.editLuaFileName = res.result.fileOrginalName;
          if (res.result.url) {
            this.fileList.splice(0, 1, {
              name: res.result.fileOrginalName,
              url: res.result.url
            });
          }
          // if (res.result.fileOrginalName) {
          //   this.fileList.splice(0, 1, {
          //     name: res.result.fileOrginalName,
          //     url: res.result.url
          //   });
          // }
        }
      });
    },
    // 对应电控协议 DocSelect
    luaDocSelect() {
      let param = {
        id: 0
      };
      DocSelect(param).then(res => {
        //
        if (res.code === 0) {
          this.docNameOpts = res.result;
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
    // 图片上传
    uploadImgApi(item) {
      // 传入参数uploadFile是后端需要的健
      let param = { uploadFile: item.file };
      this.getUpAddHardware(param);
    },
    // 上传的接口
    async getUpAddHardware(param) {
      try {
        await this.$store.dispatch('imgDoUpLoad', param).then(result => {
          if (result.code === 0) {
            debugger;
            // this.upImgSrc = result.result;
            // this.formData.url = result.result.url;
            // this.formData.fileOrginalName = result.result.originalFileName;

            this.luaFormData.luaFileName = result.result.originalFileName;
            this.luaFormData.lua = result.result.url;
            this.luaFormData.fileOrginalName = result.result.originalFileName;
            this.$message({
              message: result.message,
              type: 'success'
            });
          }
        });
      } catch (e) {}
    },
    // 弹框的品类
    dialogLuaFormDataapplianceTypeChange(val) {
      this.luaFormData.sn8 = '';
      if (val) {
        this.getSn8Select({ id: val });
      } else {
        this.sn8Opts = [];
      }
    },
    // 编辑luaUpdate
    luaUpdate(publicStatus) {
      let params = {
        id: this.editDataId,
        name: this.luaFormData.name,
        fileOrginalName: this.luaFormData.fileOrginalName,

        applianceTypeId: this.luaFormData.applianceTypeId,
        // applianceType: this.luaFormData.applianceType,
        applianceType: commonFun.fetchWord(
          this.luaFormData.applianceTypeId,
          'id',
          this.applianceTypeOpts,
          'type'
        ),
        sn8: this.luaFormData.sn8,
        profileId: this.luaFormData.profileName, //
        docId: this.luaFormData.docName, //
        // lua: this.luaFormData.lua,
        url: this.luaFormData.lua,
        muid:
          this.$store.getters.userInfo.uid ||
          JSON.parse(localStorage.getItem('userInfo')).uid,
        publicStatus: publicStatus
      };
      console.log(params);
      // this.showDialog = false;
      // debugger;
      // let paramFormData = new FormData();
      // for (const key in params) {
      //   paramFormData.append(key, params[key]);
      // }
      luaUpdate(params).then(res => {
        console.log(res);
        if (res.code === 0) {
          this.$message({
            message: res.message,
            type: 'success',
            onClose: () => {
              this.$emit('handleSave', false);
              this.fileList = [];
              commonFun.restData(this.luaFormData);
              // commonFun.restData(this.luaFormData);
              // this.fileList = [];
              // this.lua = '';
              // this.showDialog = false;
              // this.getLuaListData();
            }
          });
        }
      });
    },
    // 保存
    handleSave() {
      this.isPublicStatusSave = 1;
      this.$refs['lua-form'] &&
        this.$refs['lua-form'].validate(valid => {
          if (!valid) {
            return;
          }
          // if (this.eidtId) {
          this.luaUpdate(this.isPublicStatusSave);
          // } else {
          // this.getAddLua(this.isPublicStatusSave);
          // }
        });
    },

    // 发布
    handleRelease() {
      this.isPublicStatusSave = 2;
      this.$refs['lua-form'] &&
        this.$refs['lua-form'].validate(valid => {
          if (!valid) {
            return;
          }
          // if (this.eidtId) {
          this.luaUpdate(this.isPublicStatusSave);
          // } else {
          // this.getAddLua(this.isPublicStatusSave);
          // }
        });
    },
    beforeUpload(file) {
      return (
        commonFun.extMatch(file, this.accept, this) &&
        commonFun.extMatchSize(file, 5, this)
      );
    },
    // 上传成功
    uploadSuccess(res, file, fileList) {
      this.editLuaFileName = '';
      this.fileList = fileList;
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
    }
  }
};
</script>
<style lang="less" scoped>
.dialog-footer {
  display: flex;
  -ms-flex-pack: center;
  justify-content: flex-end;
  margin-right: 30px;
}
@deep: ~">>>";
.addlua-upload {
  @{deep}.el-upload-dragger {
    width: 412px;
  }
}
</style>
