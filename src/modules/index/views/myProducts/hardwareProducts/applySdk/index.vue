<template>
  <div class="page-container">
    <con-header :titleIcon="applySdkIcon" title="申请SDK"></con-header>
    <div class="page-Sdk-container">
      <el-button type="primary" icon="el-icon-setting" @click="addSdk">定制SDK</el-button>
    </div>
    <div class="sdk-table">
      <el-table class="table" :data="sdkList" style="width: 100%">
        <el-table-column prop="id" label="编号" align="center" show-overflow-tooltip width="55"></el-table-column>
        <el-table-column prop="name" label="Sdk 名称" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="os" label="操作系统" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="cpuArch" label="CPU 架构" show-overflow-tooltip></el-table-column>
        <el-table-column prop="brand" label="芯片品牌" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="model" label="芯片型号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="mdate" label="更新时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="discription" label="功能简介" show-overflow-tooltip></el-table-column>
        <el-table-column label="状态" width="100" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.verifyStatus ===1?'开发中':'已发布'}}
          </template>
        </el-table-column>
        <el-table-column prop="verifyStatus" label="所属小组" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="download(scope.row)">下载</el-button>
            <el-button class="opt-btn" type="text" size="small" @click="details(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页查询-->
      <pagination :currentPage="pageObj.pageNo" :pageSize="pageObj.pageSize" :total="sdkListTotal" @pageSize-change="handleSizeChange" @currentPage-change="handleCurrentChange">
      </pagination>
    </div>

    <el-dialog title="新增M-smart SDK" :visible.sync="addSdkFormVisible" class="dialog" ref="applySdk-dialog" :close-on-click-modal="false" :before-close="handleCancel">
      <div class="dialog-body">
        <el-form :model="addSdkForm" :rules="rules" ref="addSdk-form" label-width="128px">
          <el-form-item label="SDK名称" prop="name">
            <el-input v-model="addSdkForm.name"></el-input>
          </el-form-item>
          <el-form-item label="操作系统" prop="os">
            <el-select class="os-select" v-model="addSdkForm.os" clearable placeholder="请选择操作系统">
              <el-option v-for="item in osOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="芯片CPU架构" prop="cpuAch">
            <el-select class="os-select" v-model="addSdkForm.cpuAch" clearable placeholder="请选择操作系统">
              <el-option v-for="item in cpuAchOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="芯片品牌" prop="brand">
            <el-select class="os-select" v-model="addSdkForm.brand" clearable placeholder="请选择芯片品牌">
              <el-option v-for="item in brandOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="芯片型号" prop="model">
            <el-select class="os-select" v-model="addSdkForm.model" clearable placeholder="请选择芯片型号">
              <el-option v-for="item in modelOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="" class="tool" label="芯片交叉编译工具包地址" prop="tool">
            <el-input v-model="addSdkForm.tool"></el-input>
          </el-form-item>
          <el-form-item label="定制化编译参数" prop="param">
            <el-input v-model="addSdkForm.param"></el-input>
          </el-form-item>

          <el-form-item class="tool" label="定制化成功示例截图">
            <div class="upload-wrapper">
              <div class="upload-btn">
                <el-upload class="upload-demo" :action="succPicAction" multiple :limit="5" :file-list="fileList" :before-upload="beforeUpload" :on-success="uploadSuccess" :on-error="uploadError" :on-remove="uploadRemove">
                  <el-button class="icon-btn" size="small" type="primary"><i class="icon-upload"></i>上传</el-button>
                  <!-- <span slot="tip" class="upload-tip">支持扩展名：.rar .zip .doc .docx .exl</span> -->
                </el-upload>
              </div>
            </div>
          </el-form-item>
          <el-form-item class="tool" label="其他芯片资料">
            <div class="upload-wrapper">
              <div class="upload-btn">
                <el-upload class="upload-demo" :action="succAction" multiple :limit="5" :file-list="succfileList" :before-upload="succBeforeUpload" :on-success="succUploadSuccess" :on-error="succUploadError" :on-remove="succUploadRemove">
                  <el-button class="icon-btn" size="small" type="primary"><i class="icon-upload"></i>上传</el-button>
                  <span slot="tip" class="upload-tip">支持扩展名：.rar .zip .doc .docx .exl</span>
                </el-upload>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="功能说明" prop="discription">
            <el-input type="textarea" v-model="addSdkForm.discription"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import conHeader from '@/components/awesome/con-header/con-header';
import pagination from '@/components/awesome/pagination/main';
import { mapGetters } from 'vuex';
export default {
  components: {
    conHeader,
    pagination
  },
  data() {
    return {
      applySdkIcon: '/static/img/title_05@2x.png',
      groupId: '123456789',
      PublicStatus: 1,
      dataList: [],
      listLoading: true,
      pageObj: {
        pageNo: 1,
        pageSize: 10,
        total: null
      },
      addSdkFormVisible: false,
      addSdkForm: {
        name: '',
        os: '',
        cpuAch: '',
        brand: '',
        model: '',
        tool: '',
        param: '',
        discription: ''
      },
      fileList: [],
      succfileList: [],
      succPicAction: 'https://jsonplaceholder.typicode.com/posts/',
      succAction: 'https://jsonplaceholder.typicode.com/posts/',
      osOptions: [
        {
          value: '选项1',
          label: 'wd'
        },
        {
          value: '选项2',
          label: 'l'
        }
      ],
      cpuAchOptions: [
        {
          value: '选项1',
          label: 'ARM'
        },
        {
          value: '选项2',
          label: 'ARMl'
        }
      ],
      brandOptions: [
        {
          value: '选项1',
          label: '美的'
        },
        {
          value: '选项2',
          label: '美创'
        }
      ],
      modelOptions: [
        {
          value: '选项1',
          label: '美的'
        },
        {
          value: '选项2',
          label: '美创'
        }
      ],
      rules: {
        name: [{ required: true, message: '请输入SDK名称', trigger: 'blur' }],
        os: [{ required: true, message: '请选择操作系统', trigger: 'change' }],
        cpuAch: [
          { required: true, message: '请选择芯片CPU架构', trigger: 'change' }
        ],
        brand: [
          { required: true, message: '请选择芯片品牌', trigger: 'change' }
        ],
        model: [
          { required: true, message: '请选择芯片型号', trigger: 'change' }
        ],
        tool: [
          {
            required: true,
            message: '请选择芯片交叉编译工具包地址',
            trigger: 'blur'
          }
        ],
        param: [
          {
            required: true,
            message: '定制化编译参数',
            trigger: 'blur'
          }
        ],
        discription: [
          {
            required: true,
            message: '功能说明',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(['sdkList', 'sdkListTotal'])
  },
  methods: {
    // vuex
    async getSdkList() {
      this.loading = true;
      try {
        await this.$store.dispatch('getSdkList', {
          pageNo: this.pageObj.pageNo,
          pageSize: this.pageObj.pageSize
        });
        this.loading = false;
      } catch (e) {
        this.loading = false;
      }
    },

    handleSizeChange(val) {
      this.pageObj.pageSize = val;
      this.getSdkList();
    },
    handleCurrentChange(val) {
      this.pageObj.pageNo = val;
      this.getSdkList();
    },
    download(data) {
      // console.log(data);
      // debugger;
    },
    details(data) {
    // console.log(data);
    this.$router.push({name: '详情', params: data});
      // this.$router.push({ name: '详情', params: {id: Obj.id} });
      // debugger;
    },
    handleSave() {
      this.$refs['addSdk-form'] &&
        this.$refs['addSdk-form'].validate(valid => {
          if (!valid) {
            return;
          }
          this.addSdkFormVisible = false;
        });
    },
    handleCancel() {
      this.addSdkFormVisible = false;
      this.$refs['addSdk-form'].resetFields();
      Object.keys(this.addSdkForm).forEach(key => {
        this.addSdkForm[key] = '';
      });
      this.fileList = [];
      this.succfileList = [];
    },
    addSdk() {
      this.addSdkFormVisible = true;
    },

    // 文件上传前
    beforeUpload(file) {
      console.log(file);
      return true;
    },
    // 上传成功
    uploadSuccess(res, file, fileList) {
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
    },
    // 其他文件上传前
    succBeforeUpload(file) {
      console.log(file);
      return true;
    },
    // 上传成功
    succUploadSuccess(res, file, fileList) {
      this.succfileList = fileList;
    },
    // 上传失败
    succUploadError(err, file, fileList) {
      if (err) {
        this.$message({
          showClose: true,
          message: '文件上传失败',
          type: 'error'
        });
      }
    },
    // 移除文件时
    succUploadRemove(file, fileList) {
      this.succfileList = fileList;
    }
  },
  created() {
  },
  mounted() {
    this.getSdkList();
  }
};
</script>
<style lang="less" scoped>
.page-Sdk-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 22px;
}
.opt-btn {
  margin-left: 0;

  &:before {
    display: inline-block;
    content: '|';
    margin-right: 6px;
    vertical-align: baseline;
  }
}
.sdk-table {
  padding-top: 16px;
}
.os-select {
  width: 100%;
}
@deep: ~'>>>';
.tool {
  @{deep} .el-form-item__label {
    line-height: inherit;
  }
}
.upload-tip {
  margin-left: 16px;
  font-size: 14px;
  color: #999;
}
</style>
