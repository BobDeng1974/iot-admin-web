<template>
  <div class="property-dialog">
    <div class="dialog-body">
      <el-form
        ref="property-form"
        :model="propertyFormData"
        :rules="propertyRules"
        label-width="128px"
      >
        <el-form-item
          label="属性"
          prop="propertyKey"
        >
          <el-input v-model.trim="propertyFormData.propertyKey"></el-input>
        </el-form-item>
        <el-form-item
          label="属性名称"
          prop="propertyName"
        >
          <el-input v-model.trim="propertyFormData.propertyName"></el-input>
        </el-form-item>
        <!-- <el-form-item label="型号" prop="sn8">
            <el-input v-model.trim="propertyFormData.sn8"></el-input>
          </el-form-item> -->
        <el-form-item
          label="读取方式"
          prop="readwrite"
        >
          <el-radio-group v-model.trim="propertyFormData.readwrite">
            <el-radio :label="1">读写</el-radio>
            <el-radio :label="0">只读</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="取值类型"
          prop="propertyType"
        >
          <el-radio-group v-model.trim="propertyFormData.propertyType">
            <el-radio :label="1">枚举型</el-radio>
            <el-radio :label="2">布尔型</el-radio>
            <el-radio :label="3">数值型</el-radio>
            <el-radio :label="4">浮点型</el-radio>
            <el-radio :label="5">字符型</el-radio>
          </el-radio-group>
        </el-form-item>
        <div
          class="property-item"
          v-for="(item, index) in propertyFormData.propertyValues"
          :key="index"

        >
          <el-row
            type="flex"
            :gutter="10"
          >
            <el-col :span="15">
              <el-form-item

                :label="index === 0 ? '属性值' : ''"
                :prop="'propertyValues.' + index + '.valueCode'"
                :rules="{required: true, message: '属性值不能为空', trigger: 'blur'}"
              >
                <el-input v-model.trim="item.valueCode"></el-input>
              </el-form-item>

            </el-col>
            <el-col :span="9">
              <el-form-item
               class="inner-form"
                :prop="'propertyValues.' + index + '.valueDes'"
                :rules="{required: true, message: '属性值不能为空', trigger: 'blur'}"
              >
                <el-input v-model.trim="item.valueDes"></el-input>
              </el-form-item>

            </el-col>
          </el-row>
          <i
            class="el-icon-circle-plus-outline icon-i icon-plus"
            :style="{transform: propertyFormData.propertyValues.length === 1 ? 'translateX(8px)' : 'translateX(30px)'}"
            v-if="index === propertyFormData.propertyValues.length - 1"
            @click="addProperty"
          ></i>

          <i
            class="el-icon-remove-outline icon-i icon-remove"
            v-if="propertyFormData.propertyValues.length > 1"
            @click="removeProperty(index)"
          ></i>
        </div>
        <el-form-item label="说明">
          <el-input
            type="textarea"
            v-model.trim="propertyFormData.description"
            :autosize="{minRows: 2, maxRows: 4}"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div
      class="dialog-footer"
    >
      <el-button
        type="primary"
        @click="handleSave"
      >保存</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </div>
  </div>
</template>

<script>
import { updateProperty } from '../../../api/myAgreement/index';
export default {
  props: {
    applianceType: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    editData: {
      type: Object,
      default: () => {
        return null;
      }
    }
  },
  data() {
    return {
      showDialog: false,
      propertyFormData: {
        propertyKey: '',
        propertyName: '',
        readwrite: '',
        propertyType: '',
        description: '',
        // propertyValue: '',
        propertyValues: [{ valueCode: '', valueDes: '' }],
        type: 1,
        valueInput: '1'
      },
      propertyRules: {
        valueInput: [
          { required: true, message: '请输入属性', trigger: 'blur' }
        ],
        propertyKey: [
          { required: true, message: '请输入属性', trigger: 'blur' }
        ],
        propertyName: [
          { required: true, message: '请输入属性名称', trigger: 'blur' }
        ],
        sn8: [{ required: true, message: '请输入型号', trigger: 'blur' }],
        readwrite: [
          { required: true, message: '请选择读取方式', trigger: 'change' }
        ],
        propertyType: [
          { required: true, message: '请选择取值类型', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    // 点击取消
    handleCancel() {
      this.showDialog = false;
      // this.$refs['property-form'].resetFields();
      this.$emit('close', false);
    },

    // 点击保存
    handleSave() {
      this.$refs['property-form'] &&
        this.$refs['property-form'].validate(valid => {
          if (!valid) {
            return;
          }
          this.updateProperty();
          // this.showDialog = false;
        });
    },

    // 点加号添加属性值
    addProperty() {
      this.propertyFormData.propertyValues.push({
        valueCode: '',
        valueDes: ''
      });
    },

    // 点击减号移除属性
    removeProperty(i) {
      this.propertyFormData.propertyValues.splice(i, 1);
    },
    updateProperty() {
      let params = {
        id: this.editData.id,
        // propertyKey: this.editData.propertyKey,
        propertyKey: this.propertyFormData.propertyKey,
        propertyName: this.propertyFormData.propertyName,
        readwrite: this.propertyFormData.readwrite,
        propertyType: this.propertyFormData.propertyType,
        discription: this.propertyFormData.description,
        muid:
          this.$store.getters.userInfo.uid ||
          JSON.parse(localStorage.getItem('userInfo')).uid,
        values: this.propertyFormData.propertyValues
        // applianceType: this.applianceType
      };
      updateProperty(params).then(res => {
        if (res.code === 0) {
          debugger;
          this.$emit('propertyHandleSave', false);
        }
      });
    },
    innData() {
      this.propertyFormData = this.editData;
      if (this.propertyFormData.propertyValues.length === 0) {
        debugger;
        this.propertyFormData.propertyValues.push({
          valueCode: '',
          valueDes: ''
        });
      }
    }
  },
  created() {
    // this.getProfeilInfoList();
  },
  mounted() {
    // this.propertyFormData = this.editData;
    // console.log(this.editData);
    // debugger;
    // this.propertyFormData.values = this.editData.propertyValues;
  },
  watch: {
    editData: {
      handler(nowVal, oldVal) {
        this.innData();
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style lang="less" scoped>
@deep: ~'>>>';
.dialog-footer {
  display: flex;
  -ms-flex-pack: center;
  justify-content: flex-end;
  margin-right: 30px;
}
  .inner-form {
    margin-bottom: 0;
    @{deep} .el-form-item__content{
      margin-left: 0px!important;
    }
  }
.property-item {
  position: relative;
  .icon-i {
    position: absolute;
    top: 50%;
    left: 100%;
    margin-top: -9px;
    font-size: 18px;
    cursor: pointer;
  }
  .icon-plus {
    color: #409eff;
    transform: translateX(8px);
  }
  .icon-remove {
    color: #f56c6c;
    transform: translateX(8px) rotate(0);
  }
}
</style>
