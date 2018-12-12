<template>
  <div>

    <div class="dialog-body">
      <el-form
        ref="lua-form"
        :model="luaFormData"
        :rules="luaFormRules"
        label-width="128px"
      >
        <el-form-item
          label="名称"
          prop="name"
        >
          <el-input v-model.trim="luaFormData.name"></el-input>
        </el-form-item>
        <el-form-item
          label="品类"
          prop="applianceTypeId"
        >
          <el-select
            @change="dialogLuaFormDataapplianceTypeChange"
            v-model="luaFormData.applianceTypeId"
            clearable
            style="width: 100%;"
          >
            <el-option
              v-for="item in applianceTypeOpts"
              :key="item.id"
              :label="item.nameZh"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="型号码"
          prop="sn8"
        >
          <el-select
            v-model.trim="luaFormData.sn8"
            clearable
            style="width: 100%;"
          >
            <el-option
              v-for="item  in sn8Opts"
              :key="item.id"
              :value="item.sn8"
              :label="item.sn8"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="型号码" prop="sn8">
              <el-input v-model.trim="luaFormData.sn8"></el-input>
            </el-form-item> -->
        <el-form-item
          label="对应profile文件"
          prop="profileName"
        >
          <el-select
            v-model.trim="luaFormData.profileName"
            clearable
            style="width: 100%;"
          >
            <el-option
              v-for="pro in profileNameOpts"
              :key="pro.id"
              :label="pro.name"
              :value="pro.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="对应电控协议"
          prop="docName"
        >
          <el-select
            v-model.trim="luaFormData.docName"
            clearable
            style="width: 100%;"
          >
            <el-option
              v-for="doc in  docNameOpts"
              :key="doc.id"
              :label="doc.name"
              :value="doc.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="上传lua文件"
          prop="luaFileName"
        >
          <el-input
            type="hidden"
            v-model="luaFormData.luaFileName"
          ></el-input>
          <div class="upload-wrapper addlua-upload">
            <div class="upload-btn">
              <el-upload
                class="upload-demo"
                :accept="accept"
                :http-request="uploadImgApi"
                drag
                :action="'dddd'"
                multiple
                :limit="1"
                :file-list="fileList"
                :before-upload="beforeUpload"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                :on-remove="uploadRemove"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">点击或将文件拖拽到这里上传或<em>点击上传</em></div>
                <div
                  class="el-upload__tip"
                  slot="tip"
                >支持扩展名：.lua，且不超过5M</div>
              </el-upload>
              <!-- <el-upload :accept="accept" class="upload-demo" :action="'action'" :http-request="uploadImgApi" multiple :limit="1" :file-list="fileList" :before-upload="beforeUpload" :on-success="uploadSuccess" :on-error="uploadError" :on-remove="uploadRemove">
                    <el-button class="icon-btn" size="small" type="primary"><i class="icon-upload"></i>上传</el-button>
                    <span slot="tip" class="upload-tip">支持扩展名：.lua</span>
                  </el-upload> -->
            </div>
          </div>
          <div
            class="file-upload"
            v-if="editLuaFileName"
          >{{editLuaFileName}}</div>
        </el-form-item>
      </el-form>
    </div>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <!-- <div slot="footer" v-if="!isEidt" class="dialog-footer"> -->
      <!-- <el-button @click="handleRelease()">发布</el-button>
      <el-button type="primary" @click="handleSave()">保存</el-button> -->
      <el-button
        v-if="showDialog"
        type="primary"
        @click="handleSave()"
      >保存</el-button>
      <el-button
        v-else
        type="primary"
      >保存</el-button>
      <el-button
        v-if="showDialog"
        @click="handleRelease()"
      >发布</el-button>
      <el-button v-else>发布</el-button>
    </div>
  </div>
</template>
<script>
import commonFun from '@/common/js/func';
import {
  // getLuaList,
  addLua,
  ProfileSelect,
  // getSn8Select,
  DocSelect
  // getLua,
  // luaUpdate
  // downloadLua
} from '../../../api/myAgreement/index';
import { dropDownTranslation } from '@/common/js/dropDownTranslation';
export default {
  mixins: [dropDownTranslation],
  data() {
    return {
      showDialog: true,
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
    }
  },
  created() {
    this.getProfileSelect();
    this.getApplianSelect();
    this.luaDocSelect();
  },
  methods: {
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
    // addLua
    // 新增Lua协议列表数据
    getAddLua(publicStatus) {
      let params = {
        name: this.luaFormData.name,
        url: this.luaFormData.lua,
        // lua: this.luaFormData.lua,
        fileOrginalName: this.luaFormData.fileOrginalName,

        // applianceTypeId: this.applianceTypeTemp.id,
        applianceTypeId: this.luaFormData.applianceTypeId,
        // applianceType: this.applianceTypeTemp.nameZh,
        applianceType: commonFun.fetchWord(
          this.luaFormData.applianceTypeId,
          'id',
          this.applianceTypeOpts,
          'type'
        ),
        sn8: this.luaFormData.sn8,
        profileId: this.luaFormData.profileName, //
        docId: this.luaFormData.docName, //
        cuid:
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
      addLua(params).then(res => {
        console.log(res);
        if (res.code === 0) {
          this.$message({
            message: res.message,
            type: 'success',
            onClose: () => {
              this.$emit('handleSave', false);
              this.fileList = [];
              commonFun.restData(this.luaFormData);
              this.editLuaFileName = '';
              this.showDialog = true;
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
          this.showDialog = false;
          // if (this.eidtId) {
          //   this.luaUpdate(this.isPublicStatusSave);
          // } else {
          this.getAddLua(this.isPublicStatusSave);
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
          this.showDialog = false;
          // if (this.eidtId) {
          //   this.luaUpdate(this.isPublicStatusSave);
          // } else {
          this.getAddLua(this.isPublicStatusSave);
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
 @{deep} .el-upload-dragger {
    width: 412px;
  }
}
</style>
