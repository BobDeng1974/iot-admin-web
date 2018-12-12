<template>
  <div class="property-dialog">
    <div class="dialog-body">
      <el-form
        ref="property-form"
        :disabled="isDetails"
        :model="editData"
        :rules="propertyRules"
        label-width="128px"
      >
        <el-form-item
          label="属性"
          prop="propertyKey"
        >
          <el-input v-model.trim="editData.propertyKey"></el-input>
        </el-form-item>
        <el-form-item
          label="属性名称"
          prop="propertyName"
        >
          <el-input v-model.trim="editData.propertyName"></el-input>
        </el-form-item>
        <el-form-item
          label="读取方式"
          prop="readwrite"
        >
          <el-radio-group v-model.trim="editData.readwrite">
            <el-radio :label="1">读写</el-radio>
            <el-radio :label="0">只读</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="取值类型"
          prop="propertyType"
        >
          <el-radio-group v-model.trim="editData.propertyType">
            <el-radio :label="1">枚举型</el-radio>
            <el-radio :label="2">布尔型</el-radio>
            <el-radio :label="3">数值型</el-radio>
            <el-radio :label="4">浮点型</el-radio>
            <el-radio :label="5">字符型</el-radio>
          </el-radio-group>
        </el-form-item>

        <div
          class="property-item"
          v-for="(item, index) in editData.propertyValues"
          :key="index"
        >
        <!-- :label="index === 0 ? '属性值' : ''" -->
            <!-- :rules="{required: true, message: '属性值不能为空', trigger: 'blur'}" -->
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
            :style="{transform: editData.propertyValues.length === 1 ? 'translateX(8px)' : 'translateX(30px)'}"
            v-if="index === editData.propertyValues.length - 1"
            @click="addProperty"
          ></i>

          <i
            class="el-icon-remove-outline icon-i icon-remove"
            v-if="editData.propertyValues.length > 1"
            @click="removeProperty(index)"
          ></i>
        </div>

        <!-- <div
          class="property-item"
          v-for="(item, index) in editData.propertyValues"
          :key="index"
          :label="index === 0 ? '属性值' : ''"
        >
          <el-row
            type="flex"
            :gutter="10"
          >
            <el-col :span="12">
              <el-form-item
                :prop="'propertyValues.' + index + '.valueCode'"
                :rules="{required: true, message: '属性值不能为空', trigger: 'blur'}"
              >
                <el-input v-model.trim="item.valueCode"></el-input>
              </el-form-item>

            </el-col>
            <el-col :span="12">
              <el-form-item
                :prop="'editData.propertyValues.' + index + '.valueDes'"
                :rules="{required: true, message: '属性值不能为空', trigger: 'blur'}"
              >
                <el-input v-model.trim="item.valueDes"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <i
            class="el-icon-circle-plus-outline icon-i icon-plus"
            :style="{transform: editData.propertyValues.length === 1 ? 'translateX(8px)' : 'translateX(30px)'}"
            v-show="!isDetails"
            v-if="index === editData.propertyValues.length - 1"
            @click="addProperty"
          ></i>
          <i
            class="el-icon-remove-outline icon-i icon-remove"
            v-if="editData.propertyValues.length  > 1"
            v-show="!isDetails"
            @click="removeProperty(index)"
          ></i>
        </div> -->
        <el-form-item label="说明">
          <el-input
            type="textarea"
            v-model.trim="editData.description"
            :autosize="{minRows: 2, maxRows: 4}"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div
      slot="footer"
      v-if="!isDetails"
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
import commonFun from '@/common/js/func';
export default {
  props: {
    isDetails: {
      type: Boolean,
      default: false
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
      propertyRules: {
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
      this.$emit('close', false);
      // commonFun.restData(this.editData);
    },
    // 点击保存
    handleSave() {
      if (!commonFun.doSubmit('property-form', this)) return;
      // this.index++;
      // this.propertyFormData.index = this.index;
      this.$emit('propertyHandleSave', this.editData);
      // commonFun.restData(this.editData);
      // this.$refs['property-form'] && this.$refs['property-form'].validate(valid => {
      //   if (!valid) {
      //     return;
      //   }
      //   this.$emit('propertyHandleSave', this.editData);
      // });
    },

    // 点加号添加属性值
    addProperty() {
      this.editData.propertyValues.push({ valueCode: '', valueDes: '' });
    },

    // 点击减号移除属性
    removeProperty(i) {
      this.editData.propertyValues.splice(i, 1);
    }
  },
  created() {},
  mounted() {
    this.editData;
    debugger;
  }
};
</script>

<style lang="less" scoped>
.dialog-footer {
      display: flex;
    justify-content: flex-end;
       margin-right: 28px;
}
@deep: ~'>>>';
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
